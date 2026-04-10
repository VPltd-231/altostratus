import { FC } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Server, Database, Globe, ArrowRight, CheckCircle2, Quote } from 'lucide-react';

const benefits = [
  {
    icon: Shield,
    title: 'End-to-End Encryption',
    description: 'Every byte of your data is encrypted in transit and at rest. Industry-standard TLS 1.3 and AES-256 protect your business assets across all connected platforms.',
  },
  {
    icon: Lock,
    title: 'Access Control & Compliance',
    description: 'Role-based access, MFA enforcement, and SOC 2 / ISO 27001 compliance frameworks ensure only authorized personnel interact with sensitive workloads.',
  },
  {
    icon: Eye,
    title: 'Audit Trails & Transparency',
    description: 'Immutable logging across every data touchpoint. Know who accessed what, when, and from where — a non-negotiable for proper data hygiene.',
  },
  {
    icon: Database,
    title: 'Data Residency & Sovereignty',
    description: 'Choose where your data lives. Multi-region deployment ensures regulatory compliance while maintaining low-latency access for your global teams.',
  },
];

const testimonials = [
  {
    quote: "Migrating to a multi-cloud setup cut our infrastructure costs by 40% while improving our disaster recovery posture. The data hygiene practices we adopted changed everything.",
    author: "Sarah Chen",
    role: "CTO, FinScale Solutions",
    rating: 5,
  },
  {
    quote: "As a business owner, I needed to understand where my customer data lived and who could access it. This guide gave me the vocabulary to hold my engineering team accountable.",
    author: "Marcus Rivera",
    role: "Founder, ShopStream",
    rating: 5,
  },
  {
    quote: "The comparison tools helped us choose the right provider mix. We now run production on AWS with Oracle's free tier handling our staging environments — zero additional cost.",
    author: "Aisha Patel",
    role: "VP Engineering, DataBridge",
    rating: 5,
  },
];

// Platform nodes for the animated connection scheme
const platformNodes = [
  { id: 'aws', label: 'AWS', x: 15, y: 25, color: 'hsl(var(--aws))' },
  { id: 'gcp', label: 'GCP', x: 85, y: 20, color: 'hsl(var(--gcp))' },
  { id: 'azure', label: 'Azure', x: 50, y: 10, color: 'hsl(var(--azure))' },
  { id: 'oracle', label: 'Oracle', x: 20, y: 75, color: 'hsl(var(--oracle))' },
  { id: 'hub', label: 'Your Data', x: 50, y: 50, color: 'hsl(var(--primary))' },
  { id: 'ibm', label: 'IBM', x: 80, y: 70, color: 'hsl(var(--ibm, 210 100% 50%))' },
];

const connections = [
  { from: 'hub', to: 'aws', protocol: 'TLS 1.3' },
  { from: 'hub', to: 'gcp', protocol: 'mTLS' },
  { from: 'hub', to: 'azure', protocol: 'IPsec' },
  { from: 'hub', to: 'oracle', protocol: 'TLS 1.3' },
  { from: 'hub', to: 'ibm', protocol: 'SSL/TLS' },
  { from: 'aws', to: 'gcp', protocol: 'VPN' },
  { from: 'azure', to: 'oracle', protocol: 'Peering' },
];

const DataTransferScheme: FC = () => {
  const getNode = (id: string) => platformNodes.find(n => n.id === id)!;

  return (
    <div className="relative w-full h-80 sm:h-96 rounded-2xl glass-card border border-border/50 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Animated connection lines */}
        {connections.map((conn, i) => {
          const from = getNode(conn.from);
          const to = getNode(conn.to);
          return (
            <g key={i}>
              <motion.line
                x1={from.x} y1={from.y}
                x2={to.x} y2={to.y}
                stroke="hsl(var(--primary))"
                strokeWidth="0.3"
                strokeOpacity={0.3}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: i * 0.15 }}
              />
              {/* Animated data packet */}
              <motion.circle
                r="0.8"
                fill="hsl(var(--primary))"
                initial={{ opacity: 0 }}
                animate={{
                  cx: [from.x, to.x],
                  cy: [from.y, to.y],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 2 + i * 0.3,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: 'easeInOut',
                }}
              />
              {/* Protocol label */}
              <text
                x={(from.x + to.x) / 2}
                y={(from.y + to.y) / 2 - 2}
                textAnchor="middle"
                fill="hsl(var(--muted-foreground))"
                fontSize="2.2"
                fontFamily="monospace"
                opacity={0.6}
              >
                {conn.protocol}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Platform nodes */}
      {platformNodes.map((node, i) => (
        <motion.div
          key={node.id}
          className="absolute flex flex-col items-center"
          style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.3 + i * 0.1 }}
        >
          <motion.div
            className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-lg ${
              node.id === 'hub' ? 'ring-2 ring-primary/50' : ''
            }`}
            style={{ backgroundColor: node.color }}
            whileHover={{ scale: 1.15 }}
            animate={node.id === 'hub' ? {
              boxShadow: [
                '0 0 0 0 hsla(var(--primary), 0.4)',
                '0 0 0 10px hsla(var(--primary), 0)',
              ],
            } : {}}
            transition={node.id === 'hub' ? { duration: 2, repeat: Infinity } : {}}
          >
            {node.id === 'hub' ? <Database className="w-5 h-5 sm:w-6 sm:h-6" /> : 
             <Server className="w-4 h-4 sm:w-5 sm:h-5" />}
          </motion.div>
          <span className="mt-1 text-[10px] sm:text-xs font-semibold text-foreground whitespace-nowrap">
            {node.label}
          </span>
        </motion.div>
      ))}

      {/* Legend */}
      <div className="absolute bottom-3 left-3 flex items-center gap-3 text-[10px] text-muted-foreground">
        <div className="flex items-center gap-1">
          <div className="w-6 h-px bg-primary/50" />
          <span>Encrypted Channel</span>
        </div>
        <div className="flex items-center gap-1">
          <motion.div
            className="w-2 h-2 rounded-full bg-primary"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span>Data in Transit</span>
        </div>
      </div>
    </div>
  );
};

export const CustomerBenefits: FC = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden" id="benefits">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-[10%] w-72 h-72 bg-primary/5 rounded-full blur-[120px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-[10%] w-64 h-64 bg-azure/5 rounded-full blur-[100px]"
          animate={{ scale: [1.1, 0.9, 1.1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/20 mb-6"
          >
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Security & Data Hygiene
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">Trusted</span> Infrastructure
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Your data is your most valuable business asset. Here's how multi-cloud architecture 
            enforces proper data hygiene across every touchpoint.
          </p>
        </motion.div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group glass-card rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <motion.div
                  className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  <benefit.icon className="w-6 h-6 text-primary" />
                </motion.div>
                <div>
                  <h3 className="text-lg font-bold mb-2 text-foreground">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-primary/70 opacity-0 group-hover:opacity-100 transition-opacity">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Enterprise-grade protection</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Data Transfer Connection Scheme */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold mb-2">
              <span className="gradient-text">Multi-Platform</span> Data Flow
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm">
              Secure, encrypted channels connect your infrastructure across providers — 
              shared technical standards ensure data integrity at every hop.
            </p>
          </div>
          <DataTransferScheme />
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold mb-2">
              What <span className="gradient-text">Buyers</span> Say
            </h3>
            <p className="text-muted-foreground text-sm">
              Real feedback from business owners who prioritized data hygiene
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="glass-card rounded-2xl p-6 border border-border/50 flex flex-col justify-between hover:border-primary/20 transition-colors"
              >
                <div>
                  <Quote className="w-8 h-8 text-primary/20 mb-3" />
                  <p className="text-sm text-muted-foreground leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {t.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.author}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
                <div className="mt-3 flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j} className="text-amber-400 text-sm">★</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Data hygiene CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-6 py-3 border border-primary/20 text-sm text-muted-foreground">
            <Globe className="w-4 h-4 text-primary" />
            <span>Proper data hygiene starts with understanding your infrastructure</span>
            <ArrowRight className="w-4 h-4 text-primary" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
