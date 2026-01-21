export interface CloudProvider {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  metaphor: string;
  description: string;
  signupUrl: string;
  colorClass: string;
  gradientClass: string;
  glowClass: string;
  brandColor: string;
  freeCredits: string;
  creditDuration: string;
  
  requirements: {
    email: boolean;
    creditCard: boolean;
    phone: boolean;
    governmentId?: boolean;
    billingProfile?: boolean;
    notes: string;
  };
  
  freeTier: {
    compute: {
      name: string;
      specs: string;
      duration: string;
      notes: string;
    };
    serverless?: {
      name: string;
      specs: string;
      notes: string;
    };
    storage: {
      object: string;
      disk: string;
      notes: string;
    };
    database: {
      offerings: string[];
      notes: string;
    };
    networking: {
      egress: string;
      notes: string;
    };
  };
  
  strengths: string[];
  limitations: string[];
  bestFor: string[];
  notIdealFor: string[];
  engineerTake: string;
}

export const cloudProviders: CloudProvider[] = [
  {
    id: 'aws',
    name: 'Amazon Web Services',
    shortName: 'AWS',
    tagline: 'The Programmable Data Center',
    metaphor: 'If cloud providers were cities, AWS would be a global metropolis—vast, complex, and endlessly capable.',
    description: 'The industry titan that pioneered cloud computing. AWS offers unmatched breadth with 200+ services, global infrastructure spanning 30+ regions, and the deepest ecosystem for enterprise workloads. Perfect for teams who need infinite scalability and don\'t mind complexity.',
    signupUrl: 'https://aws.amazon.com/free/',
    colorClass: 'text-aws',
    gradientClass: 'gradient-aws',
    glowClass: 'glow-aws',
    brandColor: '#FF9900',
    freeCredits: 'No direct credits',
    creditDuration: '12-month free tier',
    
    requirements: {
      email: true,
      creditCard: true,
      phone: true,
      billingProfile: true,
      notes: 'AWS does not block you from making expensive mistakes. You are responsible for setting safeguards.'
    },
    
    freeTier: {
      compute: {
        name: 'EC2 t2.micro/t3.micro',
        specs: '1 vCPU, 1 GB RAM',
        duration: '750 hours/month for 12 months',
        notes: 'Equals 1 server running all month. Burstable CPU slows under load.'
      },
      serverless: {
        name: 'AWS Lambda',
        specs: '1M executions/month, 400,000 GB-seconds',
        notes: 'Ideal for APIs, cron jobs, automation. Zero idle cost.'
      },
      storage: {
        object: '5 GB S3',
        disk: '30 GB EBS SSD',
        notes: 'Charges per request beyond free tier. Data transfer costs apply.'
      },
      database: {
        offerings: ['RDS MySQL/PostgreSQL (750 hours db.t2.micro)', 'DynamoDB (25 GB, always free)'],
        notes: 'DynamoDB is best for key-value data, not complex queries.'
      },
      networking: {
        egress: '1 GB/month outbound',
        notes: 'This is where AWS quietly becomes expensive. NAT Gateways are not free.'
      }
    },
    
    strengths: [
      'Scalability: grows instantly with demand',
      'Reliability: multiple data centers per region',
      'Security controls: granular permissions, encryption',
      'Automation: infrastructure as code, CI/CD ready',
      'Service depth: databases, AI, analytics, messaging'
    ],
    
    limitations: [
      'Billing complexity can surprise new users',
      'Steep learning curve',
      'Many services require networking knowledge',
      'Over-engineering is common',
      'Free tier ends quietly after 12 months'
    ],
    
    bestFor: [
      'Planning to scale',
      'Need enterprise reliability',
      'Want automation and control',
      'Building APIs, SaaS, or data pipelines'
    ],
    
    notIdealFor: [
      'Simple blog or brochure sites',
      'Predictable flat pricing needs',
      'Avoiding infrastructure responsibility'
    ],
    
    engineerTake: 'AWS is not hosting in the traditional sense. It is a programmable data center. The free tier is a training ground, not a gift. Used correctly, it gives you skills that transfer to any serious infrastructure role.'
  },
  
  {
    id: 'gcp',
    name: 'Google Cloud Platform',
    shortName: 'GCP',
    tagline: 'The Developer Campus',
    metaphor: 'AWS gives you a city. GCP gives you a campus. Both can scale, but one is easier to navigate when you\'re starting out.',
    description: 'Google\'s cloud runs on the same infrastructure powering Search, YouTube, and Gmail. It excels at data analytics, machine learning, and Kubernetes—originally developed at Google. Clean interfaces and transparent billing make it ideal for developer-focused teams.',
    signupUrl: 'https://cloud.google.com/free',
    colorClass: 'text-gcp',
    gradientClass: 'gradient-gcp',
    glowClass: 'glow-gcp',
    brandColor: '#4285F4',
    freeCredits: '$300',
    creditDuration: '90 days',
    
    requirements: {
      email: true,
      creditCard: true,
      phone: true,
      billingProfile: true,
      notes: 'Google is strict about identity, but transparent about billing. No auto-charge until explicit upgrade.'
    },
    
    freeTier: {
      compute: {
        name: 'Compute Engine e2-micro',
        specs: 'Shared CPU, limited RAM',
        duration: 'Always free (region-restricted)',
        notes: 'No SLA (uptime guarantee). Performance fluctuates on shared CPU.'
      },
      serverless: {
        name: 'Cloud Functions + Cloud Run',
        specs: '2M invocations/month, 360,000 CPU-seconds',
        notes: 'Deploy containers; Google handles scaling automatically.'
      },
      storage: {
        object: '5 GB Cloud Storage',
        disk: '30 GB Persistent Disk',
        notes: 'Comparable to Amazon S3.'
      },
      database: {
        offerings: ['Firestore NoSQL (always free tier)', 'Cloud SQL (NOT free - requires paid billing)'],
        notes: 'Cloud SQL not being free is a common surprise for new users.'
      },
      networking: {
        egress: '1 GB/month outbound',
        notes: 'Network egress is the most common scaling cost.'
      }
    },
    
    strengths: [
      'Simple, readable UI',
      'Strong defaults',
      'Clean IAM model',
      'Deep Kubernetes integration',
      'Excellent networking backbone',
      'Modern developer workflows'
    ],
    
    limitations: [
      'Region restrictions on free tier',
      'Smaller ecosystem than AWS',
      'Fewer managed services',
      'Paid support costs escalate',
      'Less documentation volume than AWS'
    ],
    
    bestFor: [
      'Always-free compute needs',
      'Building containerized apps',
      'Using Kubernetes',
      'Value clean interfaces',
      'Prefer modern tooling'
    ],
    
    notIdealFor: [
      'Needing many managed services',
      'Large global region choices',
      'Free SQL databases'
    ],
    
    engineerTake: 'GCP\'s philosophy is "guardrails by default." You are less likely to accidentally rack up a bill compared to AWS. Its free tier is smaller in breadth but calmer to live with. Think of it as well-lit infrastructure.'
  },
  
  {
    id: 'azure',
    name: 'Microsoft Azure',
    shortName: 'Azure',
    tagline: 'The Corporate District',
    metaphor: 'If AWS is a global city and GCP is a modern campus, Azure is a well-regulated corporate district—powerful, structured, and sometimes exhausting.',
    description: 'Microsoft\'s enterprise cloud seamlessly integrates with Windows Server, Active Directory, and the entire Microsoft 365 ecosystem. The go-to choice for organizations already invested in Microsoft technologies. Strong hybrid capabilities bridge on-premises infrastructure.',
    signupUrl: 'https://azure.microsoft.com/en-us/free/',
    colorClass: 'text-azure',
    gradientClass: 'gradient-azure',
    glowClass: 'glow-azure',
    brandColor: '#0078D4',
    freeCredits: '$200',
    creditDuration: '30 days',
    
    requirements: {
      email: true,
      creditCard: true,
      phone: true,
      billingProfile: true,
      notes: 'Azure strongly assumes you are building something business-related. Tightly linked to Microsoft identity.'
    },
    
    freeTier: {
      compute: {
        name: 'Azure VM B1s',
        specs: '1 vCPU, 1 GB RAM',
        duration: '750 hours/month for 12 months',
        notes: 'Burstable CPU (slows under load). Region-restricted.'
      },
      serverless: {
        name: 'Azure Functions',
        specs: '1M executions/month',
        notes: 'Excellent integration with Microsoft services.'
      },
      storage: {
        object: '5 GB Blob Storage',
        disk: '64 GB Managed SSD',
        notes: 'Azure\'s equivalent of S3 or Google Cloud Storage.'
      },
      database: {
        offerings: ['Azure SQL (limited DTUs)', 'Cosmos DB (always free tier, NoSQL)'],
        notes: 'DTUs are a blended measure of CPU, memory, and IO.'
      },
      networking: {
        egress: '15 GB/month outbound (time-limited)',
        notes: 'Bandwidth costs are less aggressive initially than AWS.'
      }
    },
    
    strengths: [
      'Best Windows & .NET support',
      'Active Directory integration',
      'Hybrid cloud support',
      'Enterprise compliance',
      'Strong DevOps tooling (Azure DevOps, GitHub)'
    ],
    
    limitations: [
      'Portal UI is resource-heavy and complex',
      'Many services have overlapping options',
      'Documentation can be fragmented',
      'Costs increase sharply with databases',
      'Networking requires Azure-specific terminology'
    ],
    
    bestFor: [
      'Windows-based applications',
      'Using .NET / C#',
      'Enterprise identity integration',
      'Hybrid (on-prem + cloud) environments'
    ],
    
    notIdealFor: [
      'Minimal setup preferences',
      'Linux-only stacks',
      'Predictable flat pricing',
      'Small hobby projects'
    ],
    
    engineerTake: 'Azure is not just cloud hosting—it\'s a corporate IT platform exposed to developers. It shines where identity, compliance, and hybrid infrastructure matter. Its free tier is functional but not generous, designed for evaluation.'
  },
  
  {
    id: 'oracle',
    name: 'Oracle Cloud Infrastructure',
    shortName: 'OCI',
    tagline: 'The Industrial Warehouse',
    metaphor: 'Oracle Cloud is the quiet giant of free tiers. If AWS is a city and GCP is a campus, OCI is a warehouse full of industrial machinery—not pretty, but astonishingly capable.',
    description: 'The hidden gem for budget-conscious engineers. OCI offers the most generous always-free tier in the industry—including 24GB ARM compute and 10TB monthly bandwidth. Built for serious workloads, not just trials. Perfect for self-managed production infrastructure.',
    signupUrl: 'https://www.oracle.com/cloud/free/',
    colorClass: 'text-oracle',
    gradientClass: 'gradient-oracle',
    glowClass: 'glow-oracle',
    brandColor: '#C74634',
    freeCredits: '$300',
    creditDuration: '30 days trial',
    
    requirements: {
      email: true,
      creditCard: true,
      phone: true,
      governmentId: true,
      notes: 'Oracle prioritizes fraud prevention over signup convenience. Some signups are rejected without explanation.'
    },
    
    freeTier: {
      compute: {
        name: 'AMD + ARM Ampere A1',
        specs: '2× AMD (1 vCPU, 1GB each) OR up to 4 vCPUs, 24 GB RAM (ARM)',
        duration: 'Always free',
        notes: 'ARM instances are modern, efficient, and shockingly powerful for free. You allocate resources as needed.'
      },
      storage: {
        object: 'Very limited Object Storage',
        disk: '200 GB Block Volume',
        notes: 'Dramatically more than AWS or GCP offer for free.'
      },
      database: {
        offerings: ['Autonomous Database (always free tier)'],
        notes: 'Oracle runs and tunes the database for you automatically.'
      },
      networking: {
        egress: '10 TB/month outbound',
        notes: 'This is where OCI quietly crushes competitors. Insanely generous.'
      }
    },
    
    strengths: [
      'Massive always-free resources',
      'Extremely generous bandwidth (10TB!)',
      'ARM compute efficiency',
      'Enterprise-grade infrastructure',
      'No forced upgrade timeline'
    ],
    
    limitations: [
      'Smaller ecosystem than AWS/GCP',
      'Fewer managed services',
      'UI feels dated',
      'IAM policy syntax has learning curve',
      'Some signups are rejected without explanation'
    ],
    
    bestFor: [
      'Long-term free hosting',
      'Cost-sensitive projects',
      'Linux workloads',
      'Self-managed infrastructure'
    ],
    
    notIdealFor: [
      'Large service ecosystems',
      'Polished UX requirements',
      'Instant global scaling',
      'Heavy third-party integrations'
    ],
    
    engineerTake: 'OCI rewards engineers who value raw resources over polish. Used correctly, it can host real workloads indefinitely with zero cost—something no other major cloud offers at this scale. The best "free production-capable" cloud.'
  },
  
  {
    id: 'ibm',
    name: 'IBM Cloud',
    shortName: 'IBM',
    tagline: 'The Research Lab',
    metaphor: 'IBM Cloud is not trying to be AWS. It is a service platform, not a raw infrastructure playground. Purpose-built, carefully controlled, and powerful in the right context.',
    description: 'IBM focuses on managed services rather than raw infrastructure. Exceptional for enterprise databases, API management, and AI/Watson capabilities. The Lite tier never expires and never auto-upgrades. Best suited for regulated industries and research workloads.',
    signupUrl: 'https://cloud.ibm.com/registration',
    colorClass: 'text-ibm',
    gradientClass: 'gradient-ibm',
    glowClass: 'glow-ibm',
    brandColor: '#0530AD',
    freeCredits: 'No direct credits',
    creditDuration: 'Lite plans (no expiry)',
    
    requirements: {
      email: true,
      creditCard: true,
      phone: true,
      notes: 'IBM assumes business and research usage. Does not auto-convert Lite plans into paid plans.'
    },
    
    freeTier: {
      compute: {
        name: 'Cloud Foundry (PaaS)',
        specs: 'Memory-limited runtime',
        duration: 'Lite tier (no expiry)',
        notes: 'You push code; IBM runs it. No SSH access, no VM control. Apps sleep when idle.'
      },
      serverless: {
        name: 'IBM Cloud Functions',
        specs: 'Limited invocations, limited execution time',
        notes: 'Based on Apache OpenWhisk. Similar to AWS Lambda.'
      },
      storage: {
        object: 'Very limited Object Storage',
        disk: 'Not available on Lite',
        notes: 'Suitable for testing, not production.'
      },
      database: {
        offerings: ['PostgreSQL (Lite)', 'MongoDB (Lite)', 'Redis (Lite)', 'Cloudant NoSQL (Lite)'],
        notes: 'IBM\'s strongest area. Databases are managed—no server maintenance. Storage caps and throttling apply.'
      },
      networking: {
        egress: 'No free outbound guarantees',
        notes: 'IBM is not optimized for bandwidth-heavy apps.'
      }
    },
    
    strengths: [
      'Excellent managed databases',
      'Strong API tooling',
      'AI and Watson services',
      'Enterprise compliance',
      'No forced upgrades'
    ],
    
    limitations: [
      'Not VM-first',
      'Smaller ecosystem',
      'Fewer tutorials',
      'UI can feel fragmented',
      'Scaling requires paid plans'
    ],
    
    bestFor: [
      'Managed database needs',
      'Building API-centric applications',
      'PaaS simplicity',
      'Regulated industries',
      'Experimenting with AI services'
    ],
    
    notIdealFor: [
      'Full infrastructure control',
      'Cheap always-on servers',
      'High-traffic public content',
      'Large developer ecosystem needs'
    ],
    
    engineerTake: 'The real strength of IBM Cloud appears when you treat it as a backend brain, not a frontend host. Used that way, its Lite tier can carry surprisingly serious workloads—quietly, and for a long time.'
  }
];

export type ProviderId = 'aws' | 'gcp' | 'azure' | 'oracle' | 'ibm';
