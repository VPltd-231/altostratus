import { useMemo, useState } from 'react';
import { 
  Server, Database, Shield, Globe, Zap, 
  Cloud, HardDrive, GitBranch, BarChart3,
  CreditCard, Truck, TrendingUp, Users,
  Lock, RefreshCw, Layers, Activity
} from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';

interface ArchitectureNode {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  category: 'compute' | 'storage' | 'database' | 'network' | 'security' | 'devops' | 'integration';
  position: { x: number; y: number };
  connections: string[];
}

const architectureNodes: ArchitectureNode[] = [
  // Entry Layer (Top)
  { 
    id: 'cdn', 
    icon: <Globe className="w-6 h-6" />, 
    title: 'Global CDN', 
    description: 'Content delivery network for fast worldwide load times 🌍',
    category: 'network',
    position: { x: 50, y: 8 },
    connections: ['loadbalancer']
  },
  // Load Balancing Layer
  { 
    id: 'loadbalancer', 
    icon: <RefreshCw className="w-6 h-6" />, 
    title: 'Load Balancer', 
    description: 'Distributes traffic across instances for high availability',
    category: 'network',
    position: { x: 50, y: 22 },
    connections: ['compute']
  },
  // Compute Layer
  { 
    id: 'compute', 
    icon: <Server className="w-6 h-6" />, 
    title: 'Auto-Scaling Compute', 
    description: 'Virtual servers & containers that scale with demand during sales events',
    category: 'compute',
    position: { x: 50, y: 38 },
    connections: ['cache', 'database', 'security']
  },
  // Caching Layer (beside compute)
  { 
    id: 'cache', 
    icon: <Zap className="w-6 h-6" />, 
    title: 'NoSQL Cache', 
    description: 'Fast session data & product recommendations',
    category: 'database',
    position: { x: 25, y: 38 },
    connections: []
  },
  // Database Layer
  { 
    id: 'database', 
    icon: <Database className="w-6 h-6" />, 
    title: 'Managed Database', 
    description: 'Customer data, orders & inventory with automated backups',
    category: 'database',
    position: { x: 50, y: 55 },
    connections: ['backup']
  },
  // Storage Layer
  { 
    id: 'storage', 
    icon: <HardDrive className="w-6 h-6" />, 
    title: 'Object Storage', 
    description: 'Product images, videos, and static assets stored globally',
    category: 'storage',
    position: { x: 75, y: 38 },
    connections: ['cdn']
  },
  { 
    id: 'backup', 
    icon: <Layers className="w-6 h-6" />, 
    title: 'Cross-Region Replication', 
    description: 'Automated backups protect against data loss 🛡️',
    category: 'storage',
    position: { x: 75, y: 55 },
    connections: []
  },
  // Security Layer
  { 
    id: 'security', 
    icon: <Shield className="w-6 h-6" />, 
    title: 'Security Layer', 
    description: 'IAM, encryption & firewall rules for data protection',
    category: 'security',
    position: { x: 25, y: 55 },
    connections: ['encryption']
  },
  { 
    id: 'encryption', 
    icon: <Lock className="w-6 h-6" />, 
    title: 'Data Encryption', 
    description: 'Payment & personal data encrypted at rest and in transit',
    category: 'security',
    position: { x: 25, y: 72 },
    connections: []
  },
  // DevOps Layer (Bottom)
  { 
    id: 'cicd', 
    icon: <GitBranch className="w-6 h-6" />, 
    title: 'CI/CD Pipeline', 
    description: 'Automated deployments, multiple releases per week 🚀',
    category: 'devops',
    position: { x: 40, y: 85 },
    connections: ['compute']
  },
  { 
    id: 'monitoring', 
    icon: <Activity className="w-6 h-6" />, 
    title: 'Monitoring & Logging', 
    description: 'Real-time performance tracking & cost optimization',
    category: 'devops',
    position: { x: 60, y: 85 },
    connections: ['analytics']
  },
  { 
    id: 'analytics', 
    icon: <BarChart3 className="w-6 h-6" />, 
    title: 'Cloud Analytics', 
    description: 'Track spending, errors & performance metrics',
    category: 'devops',
    position: { x: 75, y: 72 },
    connections: []
  },
  // Integrations (Sides)
  { 
    id: 'payments', 
    icon: <CreditCard className="w-6 h-6" />, 
    title: 'Payment Gateway', 
    description: 'Secure integration with payment processors 💳',
    category: 'integration',
    position: { x: 12, y: 22 },
    connections: ['security']
  },
  { 
    id: 'logistics', 
    icon: <Truck className="w-6 h-6" />, 
    title: 'Logistics API', 
    description: 'Third-party shipping & fulfillment services',
    category: 'integration',
    position: { x: 88, y: 22 },
    connections: ['compute']
  },
  { 
    id: 'marketing', 
    icon: <TrendingUp className="w-6 h-6" />, 
    title: 'Marketing Tools', 
    description: 'Email, analytics & CRM integrations',
    category: 'integration',
    position: { x: 88, y: 8 },
    connections: ['database']
  },
];

const categoryColors: Record<string, { bg: string; border: string }> = {
  compute: { bg: 'from-aws via-orange-400 to-yellow-400', border: 'border-aws/30' },
  storage: { bg: 'from-gcp via-blue-400 to-cyan-400', border: 'border-gcp/30' },
  database: { bg: 'from-azure via-blue-500 to-indigo-400', border: 'border-azure/30' },
  network: { bg: 'from-emerald-500 via-green-400 to-teal-400', border: 'border-emerald-500/30' },
  security: { bg: 'from-oracle via-red-500 to-rose-400', border: 'border-oracle/30' },
  devops: { bg: 'from-purple-500 via-violet-400 to-fuchsia-400', border: 'border-purple-500/30' },
  integration: { bg: 'from-ibm via-indigo-500 to-blue-400', border: 'border-ibm/30' },
};

const categoryLabels: Record<string, string> = {
  compute: 'Compute',
  storage: 'Storage',
  database: 'Database',
  network: 'Network',
  security: 'Security',
  devops: 'DevOps',
  integration: 'Integrations',
};

const nodeById = new Map(architectureNodes.map((n) => [n.id, n]));

const CONNECTION_LABELS: Record<string, string> = {
  'cdn-loadbalancer': 'HTTP/S',
  'loadbalancer-compute': 'TCP/IP',
  'compute-database': 'SQL',
  'compute-cache': 'Redis',
  'compute-security': 'Auth',
  'database-backup': 'Sync',
  'storage-cdn': 'Assets',
  'security-encryption': 'TLS',
  'cicd-compute': 'Deploy',
  'monitoring-analytics': 'Metrics',
  'payments-security': 'PCI',
  'logistics-compute': 'REST',
  'marketing-database': 'API',
};

const connectionLabel = (a: string, b: string) =>
  CONNECTION_LABELS[`${a}-${b}`] ?? CONNECTION_LABELS[`${b}-${a}`] ?? 'Data';

/** Every edge touching `nodeId`, in either direction. */
const edgesFor = (nodeId: string) => {
  const edges: { from: ArchitectureNode; to: ArchitectureNode; key: string }[] = [];
  architectureNodes.forEach((node) => {
    node.connections.forEach((targetId) => {
      const target = nodeById.get(targetId);
      if (target && (node.id === nodeId || targetId === nodeId)) {
        edges.push({ from: node, to: target, key: `${node.id}-${targetId}` });
      }
    });
  });
  return edges;
};

const NodeButton = ({
  node,
  selected,
  dimmed,
  onSelect,
}: {
  node: ArchitectureNode;
  selected: boolean;
  dimmed: boolean;
  onSelect: (id: string | null) => void;
}) => {
  const colors = categoryColors[node.category];
  return (
    <button
      type="button"
      onClick={() => onSelect(selected ? null : node.id)}
      aria-pressed={selected}
      className={`group absolute -translate-x-1/2 -translate-y-1/2 text-left transition-opacity duration-200 hover:z-20 focus-visible:z-20 focus-visible:outline-none ${
        selected ? 'z-20' : ''
      } ${dimmed ? 'opacity-30' : 'opacity-100'}`}
      style={{ left: `${node.position.x}%`, top: `${node.position.y}%` }}
    >
      <div
        className={`glass-card rounded-xl border-2 p-3 transition-transform duration-200 group-hover:scale-110 group-focus-visible:ring-2 group-focus-visible:ring-ring ${colors.border} ${
          selected ? 'scale-110 ring-2 ring-primary' : ''
        }`}
      >
        <div className={`mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br text-white ${colors.bg}`}>
          {node.icon}
        </div>
        <h4 className="whitespace-nowrap text-xs font-semibold text-foreground">{node.title}</h4>
        <div className={`${selected ? 'block' : 'hidden group-hover:block group-focus-visible:block'}`}>
          <p className="mt-1 max-w-[140px] text-[11px] text-muted-foreground">{node.description}</p>
          <span className={`mt-2 inline-block rounded-full bg-gradient-to-r px-2 py-0.5 text-[10px] font-medium text-white ${colors.bg}`}>
            {categoryLabels[node.category]}
          </span>
        </div>
      </div>
    </button>
  );
};

/** Phones: the absolute-positioned diagram can't fit, so list components by category. */
const MobileList = () => (
  <div className="space-y-4 md:hidden">
    {Object.entries(categoryLabels).map(([category, label]) => (
      <div key={category} className="glass-card rounded-2xl p-4">
        <div className="mb-3 flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full bg-gradient-to-r ${categoryColors[category].bg}`} aria-hidden />
          <h3 className="text-sm font-bold">{label}</h3>
        </div>
        <ul className="space-y-3">
          {architectureNodes
            .filter((n) => n.category === category)
            .map((node) => (
              <li key={node.id} className="flex items-start gap-3">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-white ${categoryColors[category].bg}`}>
                  {node.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{node.title}</p>
                  <p className="text-xs text-muted-foreground">{node.description}</p>
                  {node.connections.length > 0 && (
                    <p className="mt-1 text-[11px] text-primary">
                      → {node.connections.map((id) => nodeById.get(id)?.title).filter(Boolean).join(', ')}
                    </p>
                  )}
                </div>
              </li>
            ))}
        </ul>
      </div>
    ))}
  </div>
);

const SUMMARY_CARDS = [
  { icon: <Zap className="h-6 w-6" />, title: 'Auto-Scaling', desc: 'Compute scales automatically during peak sales events, then reduces to control costs 💸', gradient: 'from-aws to-yellow-400' },
  { icon: <Globe className="h-6 w-6" />, title: 'Global Reach', desc: 'CDN delivers content worldwide with fast load times, supporting international expansion 🌍', gradient: 'from-gcp to-emerald-400' },
  { icon: <Shield className="h-6 w-6" />, title: 'Enterprise Security', desc: 'IAM, encryption, and firewall rules protect customer data and payment info 🛡️', gradient: 'from-oracle to-rose-400' },
];

export const CloudArchitecture = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const edges = useMemo(() => (selectedNode ? edgesFor(selectedNode) : []), [selectedNode]);

  const connectedNodes = useMemo(() => {
    const ids = new Set<string>();
    if (selectedNode) ids.add(selectedNode);
    edges.forEach((e) => {
      ids.add(e.from.id);
      ids.add(e.to.id);
    });
    return ids;
  }, [selectedNode, edges]);

  return (
    <section className="relative px-4 py-24">
      <div className="relative z-10 mx-auto max-w-7xl">
        <Reveal className="mb-12 text-center">
          <div className="glass-card mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 px-4 py-2">
            <Cloud className="h-4 w-4 text-primary" aria-hidden />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Architecture Overview</span>
          </div>
          <h2 className="mb-4 text-3xl font-bold sm:text-5xl">
            <span className="gradient-text">Cloud Hosting</span> Tech Stack
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            A scalable cloud infrastructure at a glance.{' '}
            <span className="hidden font-medium text-primary md:inline">Select a component</span>
            <span className="hidden md:inline"> to explore its connections.</span>
          </p>
        </Reveal>

        <div className="glass-card mb-12 rounded-2xl border border-border/60 p-6">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            {[
              { icon: Users, color: 'text-primary', text: 'Seasonal Traffic Spikes' },
              { icon: TrendingUp, color: 'text-aws', text: 'Global Expansion' },
              { icon: Shield, color: 'text-oracle', text: 'Data Protection' },
              { icon: Zap, color: 'text-gcp', text: 'Auto-Scaling' },
            ].map(({ icon: Icon, color, text }) => (
              <div key={text} className="flex items-center gap-2">
                <Icon className={`h-5 w-5 ${color}`} aria-hidden />
                <span className="text-muted-foreground">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <MobileList />

        {/* Desktop diagram. Unitless viewBox so SVG paths are valid (percent units are not). */}
        <div
          className="glass-card relative hidden h-[700px] overflow-hidden rounded-3xl border border-border/60 md:block"
          onClick={(e) => e.target === e.currentTarget && setSelectedNode(null)}
        >
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            <g className="text-border" opacity={selectedNode ? 0.15 : 0.7}>
              {architectureNodes.flatMap((node) =>
                node.connections.map((targetId) => {
                  const t = nodeById.get(targetId);
                  if (!t) return null;
                  return (
                    <line
                      key={`${node.id}-${targetId}`}
                      x1={node.position.x}
                      y1={node.position.y}
                      x2={t.position.x}
                      y2={t.position.y}
                      stroke="currentColor"
                      strokeWidth="2"
                      vectorEffect="non-scaling-stroke"
                    />
                  );
                }),
              )}
            </g>
            {edges.map((edge) => {
              const { x: x1, y: y1 } = edge.from.position;
              const { x: x2, y: y2 } = edge.to.position;
              const mx = (x1 + x2) / 2;
              const my = (y1 + y2) / 2 + (Math.abs(x2 - x1) > Math.abs(y2 - y1) ? 6 : 0);
              return (
                <path
                  key={edge.key}
                  d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`}
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="3"
                  vectorEffect="non-scaling-stroke"
                  className="flow-dash"
                />
              );
            })}
          </svg>

          {edges.map((edge) => (
            <span
              key={`${edge.key}-label`}
              className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary bg-card px-2 py-0.5 text-[10px] font-semibold text-primary"
              style={{
                left: `${(edge.from.position.x + edge.to.position.x) / 2}%`,
                top: `${(edge.from.position.y + edge.to.position.y) / 2}%`,
              }}
            >
              {connectionLabel(edge.from.id, edge.to.id)}
            </span>
          ))}

          {architectureNodes.map((node) => (
            <NodeButton
              key={node.id}
              node={node}
              selected={selectedNode === node.id}
              dimmed={selectedNode !== null && !connectedNodes.has(node.id)}
              onSelect={setSelectedNode}
            />
          ))}

          {selectedNode && (
            <div className="glass-card absolute left-4 top-4 z-30 max-w-xs rounded-xl border border-primary/30 p-4">
              <h4 className="mb-2 text-sm font-semibold text-foreground">🔗 Connected Components</h4>
              <p className="mb-3 text-xs text-muted-foreground">Showing data flow paths for the selected component</p>
              <div className="flex flex-wrap gap-1">
                {Array.from(connectedNodes).map((id) => {
                  const node = nodeById.get(id);
                  const colors = categoryColors[node?.category ?? 'compute'];
                  return (
                    <span key={id} className={`rounded-full bg-gradient-to-r px-2 py-0.5 text-[10px] text-white ${colors.bg}`}>
                      {node?.title}
                    </span>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={() => setSelectedNode(null)}
                className="mt-3 text-xs text-primary underline hover:text-primary/80"
              >
                Clear selection
              </button>
            </div>
          )}

          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap justify-center gap-2">
            {Object.entries(categoryLabels).map(([key, label]) => (
              <div
                key={key}
                className={`glass-card flex items-center gap-1.5 rounded-full border px-2 py-1 text-[11px] font-medium ${categoryColors[key].border}`}
              >
                <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${categoryColors[key].bg}`} />
                {label}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {SUMMARY_CARDS.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08} className="glass-card rounded-2xl border border-border/60 p-6">
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white ${item.gradient}`}>
                {item.icon}
              </div>
              <h3 className="mb-2 text-lg font-bold">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
