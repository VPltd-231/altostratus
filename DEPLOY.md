# Fork, push and deploy

Two parts: (A) get this change set into your own fork on GitHub, (B) serve the static build from the Ubuntu server in `us-east-1` with Nginx.

---

## A. Fork the original repo and push the changes

Original repo: `https://github.com/VPltd-231/cloudhostingchoices`

### 1. Fork

Web: open the repo on GitHub, click **Fork**. Or with the GitHub CLI:

```bash
gh auth login
gh repo fork VPltd-231/cloudhostingchoices --clone=false
```

### 2. Clone your fork and bring in the changes

The changes were delivered as a git bundle (`runratehost-perf.bundle`) and a patch. Use either one.

```bash
git clone https://github.com/<your-username>/cloudhostingchoices.git
cd cloudhostingchoices
git remote add upstream https://github.com/VPltd-231/cloudhostingchoices.git
git checkout -b perf/scroll-render-overhaul

# Option 1: bundle (keeps the commit exactly as made)
git fetch /path/to/runratehost-perf.bundle perf/scroll-render-overhaul
git merge --ff-only FETCH_HEAD

# Option 2: patch
# git am /path/to/0001-*.patch
```

### 3. Refresh the lockfile, then verify

Dependencies were removed and one was added (`@fontsource-variable/inter`), so `package-lock.json` is out of date. Regenerate it once:

```bash
npm install
npm run lint
npm test
npm run build
git add package-lock.json
git commit -m "Refresh package-lock.json"
```

### 4. Push and open a pull request

```bash
git push -u origin perf/scroll-render-overhaul

gh pr create --repo VPltd-231/cloudhostingchoices \
  --base main --head <your-username>:perf/scroll-render-overhaul \
  --title "Performance overhaul: smoother scroll, faster first paint" \
  --body "See README performance notes."
```

---

## B. Deploy to Ubuntu on AWS (us-east-1)

The site is static, so the server only needs Nginx. Build on your machine (or CI) and upload `dist/`. No Node is needed on the server.

Assumptions: Ubuntu 22.04/24.04 EC2 instance, default user `ubuntu`, a domain you control, and the AWS CLI configured locally (`aws configure`).

### 1. Network: security group and a fixed IP

```bash
export AWS_REGION=us-east-1
export SG_ID=sg-xxxxxxxxxxxxxxxxx          # the instance's security group
export MY_IP=$(curl -s https://checkip.amazonaws.com)/32

# Web traffic from anywhere
aws ec2 authorize-security-group-ingress --region $AWS_REGION --group-id $SG_ID --protocol tcp --port 80  --cidr 0.0.0.0/0
aws ec2 authorize-security-group-ingress --region $AWS_REGION --group-id $SG_ID --protocol tcp --port 443 --cidr 0.0.0.0/0
# SSH only from your IP (skip if already restricted by your custom networking)
aws ec2 authorize-security-group-ingress --region $AWS_REGION --group-id $SG_ID --protocol tcp --port 22  --cidr $MY_IP

# Elastic IP so DNS survives stop/start
ALLOC=$(aws ec2 allocate-address --region $AWS_REGION --domain vpc --query AllocationId --output text)
aws ec2 associate-address --region $AWS_REGION --instance-id i-xxxxxxxxxxxxxxxxx --allocation-id $ALLOC
```

### 2. DNS

Point an `A` record for your domain (and `www`) at the Elastic IP. With Route 53:

```bash
cat > /tmp/dns.json <<JSON
{ "Changes": [{ "Action": "UPSERT", "ResourceRecordSet": {
  "Name": "example.com.", "Type": "A", "TTL": 300,
  "ResourceRecords": [{ "Value": "ELASTIC_IP" }] } }] }
JSON
aws route53 change-resource-record-sets --hosted-zone-id ZXXXXXXXXXXXXX --change-batch file:///tmp/dns.json
```

### 3. One-time server setup

```bash
ssh -i ~/.ssh/my-key.pem ubuntu@ELASTIC_IP

sudo apt update && sudo apt -y upgrade
sudo apt -y install nginx ufw certbot python3-certbot-nginx rsync

# Host firewall (the security group is still the outer layer)
sudo ufw allow OpenSSH && sudo ufw allow 'Nginx Full' && sudo ufw --force enable

# Web root owned by the deploy user
sudo mkdir -p /var/www/runratehost/releases
sudo chown -R ubuntu:ubuntu /var/www/runratehost
exit
```

Copy the Nginx files from this repo and enable the site (run from your machine, in the repo):

```bash
scp -i ~/.ssh/my-key.pem deploy/security-headers.conf ubuntu@ELASTIC_IP:/tmp/runratehost-security-headers.conf
scp -i ~/.ssh/my-key.pem deploy/nginx.conf            ubuntu@ELASTIC_IP:/tmp/runratehost.conf

ssh -i ~/.ssh/my-key.pem ubuntu@ELASTIC_IP '
  sudo mv /tmp/runratehost-security-headers.conf /etc/nginx/snippets/runratehost-security-headers.conf &&
  sudo mv /tmp/runratehost.conf /etc/nginx/sites-available/runratehost &&
  sudo sed -i "s/example.com/YOUR_DOMAIN/g" /etc/nginx/sites-available/runratehost &&
  sudo ln -sf /etc/nginx/sites-available/runratehost /etc/nginx/sites-enabled/runratehost &&
  sudo rm -f /etc/nginx/sites-enabled/default &&
  sudo nginx -t && sudo systemctl reload nginx'
```

### 4. First deploy

```bash
DEPLOY_HOST=ubuntu@ELASTIC_IP \
SSH_KEY=~/.ssh/my-key.pem \
VITE_SITE_URL=https://YOUR_DOMAIN \
./deploy/deploy.sh
```

The script runs `npm ci`, lint, tests and the build, uploads to `/var/www/runratehost/releases/<timestamp>/`, then flips the `current` symlink. Each deploy is atomic, and the last 5 releases are kept.

### 5. HTTPS

Once DNS resolves to the server:

```bash
ssh -i ~/.ssh/my-key.pem ubuntu@ELASTIC_IP \
  'sudo certbot --nginx -d YOUR_DOMAIN -d www.YOUR_DOMAIN --redirect -m you@example.com --agree-tos -n'
```

Certbot installs a renewal timer. Check it with `sudo systemctl status certbot.timer`. After HTTPS works, uncomment the `Strict-Transport-Security` line in `/etc/nginx/snippets/runratehost-security-headers.conf` and run `sudo nginx -t && sudo systemctl reload nginx`.

### 6. Verify

```bash
curl -sI https://YOUR_DOMAIN/                      # 200, Cache-Control: no-cache
curl -sI https://YOUR_DOMAIN/assets/<any-hashed-file>.js   # Cache-Control: public, immutable
curl -s  https://YOUR_DOMAIN/sitemap.xml | head    # URLs use YOUR_DOMAIN

npx lighthouse https://YOUR_DOMAIN --only-categories=performance --preset=desktop --view
```

### Rollback

```bash
ssh -i ~/.ssh/my-key.pem ubuntu@ELASTIC_IP '
  ls -1dt /var/www/runratehost/releases/* | head -3          # pick the previous release
  ln -sfn /var/www/runratehost/releases/<previous> /var/www/runratehost/current'
```

### Notes

- Unknown URLs return the app shell with HTTP 200 (the React 404 page renders client-side). For real 404 status codes you would need prerendering; that is a separate piece of work.
- `VITE_GUIDE_SIGNUP_URL` is optional. Without it the email-guide form is disabled instead of pretending to send anything.
- Later improvement: put CloudFront in front of the instance (or move `dist/` to S3 + CloudFront) for edge caching. It needs no code changes.
