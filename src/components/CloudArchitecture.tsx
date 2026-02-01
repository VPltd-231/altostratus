import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState, useMemo } from 'react';
import { 
  Server, Database, Shield, Globe, Zap, 
  Cloud, HardDrive, GitBranch, BarChart3,
  CreditCard, Truck, TrendingUp, Users,
  Lock, RefreshCw, Layers, Activity
} from 'lucide-react';

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
  // Core Compute Layer
  { 
    id: 'compute', 
    icon: <Server className="w-6 h-6" />, 
    title: 'Auto-Scaling Compute', 
    description: 'Virtual servers & containers that scale with demand during sales events',
    category: 'compute',
    position: { x: 50, y: 30 },
    connections: ['loadbalancer', 'database', 'cache']
  },
  { 
    id: 'loadbalancer', 
    icon: <RefreshCw className="w-6 h-6" />, 
    title: 'Load Balancer', 
    description: 'Distributes traffic across instances for high availability',
    category: 'network',
    position: { x: 50, y: 10 },
    connections: ['cdn', 'compute']
  },
  // Storage & CDN
  { 
    id: 'storage', 
    icon: <HardDrive className="w-6 h-6" />, 
    title: 'Object Storage', 
    description: 'Product images, videos, and static assets stored globally',
    category: 'storage',
    position: { x: 20, y: 50 },
    connections: ['cdn']
  },
  { 
    id: 'cdn', 
    icon: <Globe className="w-6 h-6" />, 
    title: 'Global CDN', 
    description: 'Content delivery network for fast worldwide load times 🌍',
    category: 'network',
    position: { x: 20, y: 20 },
    connections: ['loadbalancer']
  },
  // Database Layer
  { 
    id: 'database', 
    icon: <Database className="w-6 h-6" />, 
    title: 'Managed Database', 
    description: 'Customer data, orders & inventory with automated backups',
    category: 'database',
    position: { x: 80, y: 50 },
    connections: ['backup']
  },
  { 
    id: 'cache', 
    icon: <Zap className="w-6 h-6" />, 
    title: 'NoSQL Cache', 
    description: 'Fast session data & product recommendations',
    category: 'database',
    position: { x: 65, y: 45 },
    connections: ['compute']
  },
  { 
    id: 'backup', 
    icon: <Layers className="w-6 h-6" />, 
    title: 'Cross-Region Replication', 
    description: 'Automated backups protect against data loss 🛡️',
    category: 'storage',
    position: { x: 80, y: 70 },
    connections: []
  },
  // Security
  { 
    id: 'security', 
    icon: <Shield className="w-6 h-6" />, 
    title: 'Security Layer', 
    description: 'IAM, encryption & firewall rules for data protection',
    category: 'security',
    position: { x: 50, y: 55 },
    connections: ['compute', 'database']
  },
  { 
    id: 'encryption', 
    icon: <Lock className="w-6 h-6" />, 
    title: 'Data Encryption', 
    description: 'Payment & personal data encrypted at rest and in transit',
    category: 'security',
    position: { x: 35, y: 65 },
    connections: ['security']
  },
  // DevOps
  { 
    id: 'cicd', 
    icon: <GitBranch className="w-6 h-6" />, 
    title: 'CI/CD Pipeline', 
    description: 'Automated deployments, multiple releases per week 🚀',
    category: 'devops',
    position: { x: 15, y: 80 },
    connections: ['compute']
  },
  { 
    id: 'monitoring', 
    icon: <Activity className="w-6 h-6" />, 
    title: 'Monitoring & Logging', 
    description: 'Real-time performance tracking & cost optimization',
    category: 'devops',
    position: { x: 50, y: 85 },
    connections: ['compute', 'database']
  },
  { 
    id: 'analytics', 
    icon: <BarChart3 className="w-6 h-6" />, 
    title: 'Cloud Analytics', 
    description: 'Track spending, errors & performance metrics',
    category: 'devops',
    position: { x: 85, y: 85 },
    connections: ['monitoring']
  },
  // Integrations
  { 
    id: 'payments', 
    icon: <CreditCard className="w-6 h-6" />, 
    title: 'Payment Gateway', 
    description: 'Secure integration with payment processors 💳',
    category: 'integration',
    position: { x: 10, y: 35 },
    connections: ['compute', 'security']
  },
  { 
    id: 'logistics', 
    icon: <Truck className="w-6 h-6" />, 
    title: 'Logistics API', 
    description: 'Third-party shipping & fulfillment services',
    category: 'integration',
    position: { x: 90, y: 25 },
    connections: ['compute']
  },
  { 
    id: 'marketing', 
    icon: <TrendingUp className="w-6 h-6" />, 
    title: 'Marketing Tools', 
    description: 'Email, analytics & CRM integrations',
    category: 'integration',
    position: { x: 90, y: 10 },
    connections: ['database']
  },
];

const categoryColors: Record<string, { bg: string; border: string; glow: string }> = {
  compute: { bg: 'from-aws via-orange-400 to-yellow-400', border: 'border-aws/30', glow: 'shadow-aws/30' },
  storage: { bg: 'from-gcp via-blue-400 to-cyan-400', border: 'border-gcp/30', glow: 'shadow-gcp/30' },
  database: { bg: 'from-azure via-blue-500 to-indigo-400', border: 'border-azure/30', glow: 'shadow-azure/30' },
  network: { bg: 'from-emerald-500 via-green-400 to-teal-400', border: 'border-emerald-500/30', glow: 'shadow-emerald-500/30' },
  security: { bg: 'from-oracle via-red-500 to-rose-400', border: 'border-oracle/30', glow: 'shadow-oracle/30' },
  devops: { bg: 'from-purple-500 via-violet-400 to-fuchsia-400', border: 'border-purple-500/30', glow: 'shadow-purple-500/30' },
  integration: { bg: 'from-ibm via-indigo-500 to-blue-400', border: 'border-ibm/30', glow: 'shadow-ibm/30' },
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

// Get all connected nodes (both directions)
const getConnectedNodes = (nodeId: string): Set<string> => {
  const connected = new Set<string>();
  connected.add(nodeId);
  
  architectureNodes.forEach(node => {
    // Direct connections from this node
    if (node.id === nodeId) {
      node.connections.forEach(c => connected.add(c));
    }
    // Nodes that connect TO this node
    if (node.connections.includes(nodeId)) {
      connected.add(node.id);
    }
  });
  
  return connected;
};

interface NodeCardProps {
  node: ArchitectureNode;
  index: number;
  selectedNode: string | null;
  connectedNodes: Set<string>;
  onSelect: (id: string | null) => void;
}

const NodeCard = ({ node, index, selectedNode, connectedNodes, onSelect }: NodeCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-50, 50], [10, -10]);
  const rotateY = useTransform(x, [-50, 50], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleClick = () => {
    onSelect(selectedNode === node.id ? null : node.id);
  };

  const colors = categoryColors[node.category];
  const isSelected = selectedNode === node.id;
  const isConnected = connectedNodes.has(node.id);
  const isDimmed = selectedNode !== null && !isConnected;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, type: 'spring', stiffness: 100 }}
      className="absolute"
      style={{ 
        left: `${node.position.x}%`, 
        top: `${node.position.y}%`,
        transform: 'translate(-50%, -50%)'
      }}
      animate={{
        opacity: isDimmed ? 0.3 : 1,
        scale: isSelected ? 1.1 : 1,
      }}
    >
      <motion.div
        className="relative perspective-1000 cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        whileHover={{ scale: 1.15, z: 50 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {/* Selection ring */}
        {isSelected && (
          <motion.div
            className={`absolute -inset-2 rounded-2xl bg-gradient-to-br ${colors.bg}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.4, scale: 1 }}
            layoutId="selection-ring"
          />
        )}
        
        {/* Connected highlight */}
        {isConnected && !isSelected && selectedNode !== null && (
          <motion.div
            className={`absolute -inset-1 rounded-xl border-2 ${colors.border}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ borderColor: 'hsl(var(--primary))' }}
          />
        )}
        
        {/* Glow effect */}
        <motion.div
          className={`absolute inset-0 rounded-xl bg-gradient-to-br ${colors.bg} blur-xl`}
          animate={{ 
            opacity: isHovered || isSelected ? 0.6 : 0.2, 
            scale: isHovered || isSelected ? 1.3 : 1 
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Card */}
        <div className={`relative glass-card rounded-xl p-3 ${colors.border} border-2 ${isHovered || isSelected ? `shadow-xl ${colors.glow}` : ''}`}>
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colors.bg} flex items-center justify-center text-white mb-2`}>
            {node.icon}
          </div>
          <h4 className="text-xs font-semibold text-foreground whitespace-nowrap">{node.title}</h4>
          
          {/* Expanded content on hover or select */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: isHovered || isSelected ? 1 : 0, height: isHovered || isSelected ? 'auto' : 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="text-[10px] text-muted-foreground mt-1 max-w-[140px]">{node.description}</p>
            <span className={`inline-block mt-2 text-[9px] font-medium px-2 py-0.5 rounded-full bg-gradient-to-r ${colors.bg} text-white`}>
              {categoryLabels[node.category]}
            </span>
          </motion.div>
        </div>

        {/* Floating particles on hover */}
        {(isHovered || isSelected) && (
          <>
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-1.5 h-1.5 rounded-full bg-gradient-to-r ${colors.bg}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: [0, (i % 2 === 0 ? 1 : -1) * (30 + i * 10)],
                  y: [0, (i < 2 ? -1 : 1) * (30 + i * 10)],
                }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              />
            ))}
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export const CloudArchitecture = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  
  const connectedNodes = useMemo(() => {
    if (!selectedNode) return new Set<string>();
    return getConnectedNodes(selectedNode);
  }, [selectedNode]);

  // Generate connection paths between selected node and its connections
  const connectionPaths = useMemo(() => {
    if (!selectedNode) return [];
    
    const selectedNodeData = architectureNodes.find(n => n.id === selectedNode);
    if (!selectedNodeData) return [];
    
    const paths: { from: ArchitectureNode; to: ArchitectureNode; key: string }[] = [];
    
    // Outgoing connections
    selectedNodeData.connections.forEach(targetId => {
      const target = architectureNodes.find(n => n.id === targetId);
      if (target) {
        paths.push({ from: selectedNodeData, to: target, key: `${selectedNode}-${targetId}` });
      }
    });
    
    // Incoming connections
    architectureNodes.forEach(node => {
      if (node.connections.includes(selectedNode)) {
        paths.push({ from: node, to: selectedNodeData, key: `${node.id}-${selectedNode}` });
      }
    });
    
    return paths;
  }, [selectedNode]);

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-azure/10 rounded-full blur-[100px]"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-aws/10 rounded-full blur-[80px]"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/20 mb-6"
          >
            <Cloud className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Architecture Overview
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">E-Commerce</span> Cloud Stack
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Interactive visualization of a scalable cloud infrastructure. <span className="text-primary font-medium">Click on components</span> to explore connections.
          </p>
        </motion.div>

        {/* Use Case Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-6 mb-12 border border-border/60"
        >
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">Seasonal Traffic Spikes</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-aws" />
              <span className="text-muted-foreground">Global Expansion</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-oracle" />
              <span className="text-muted-foreground">Data Protection</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-gcp" />
              <span className="text-muted-foreground">Auto-Scaling</span>
            </div>
          </div>
        </motion.div>

        {/* Architecture Diagram */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="relative h-[600px] sm:h-[700px] glass-card rounded-3xl border border-border/60 overflow-hidden"
          onClick={(e) => {
            // Clear selection when clicking on background
            if (e.target === e.currentTarget) {
              setSelectedNode(null);
            }
          }}
        >
          {/* Grid background */}
          <div className="absolute inset-0 opacity-30">
            <svg className="w-full h-full">
              <defs>
                <pattern id="archGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#archGrid)" />
            </svg>
          </div>

          {/* Connection lines SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="activeLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            
            {/* Default flow lines (dimmed when selection active) */}
            <g style={{ opacity: selectedNode ? 0.1 : 1 }}>
              <motion.path
                d="M 10% 35% Q 30% 30% 50% 30%"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 0.5 }}
              />
              <motion.path
                d="M 50% 30% Q 70% 30% 90% 25%"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 0.7 }}
              />
              <motion.path
                d="M 50% 30% L 50% 55%"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.9 }}
              />
              <motion.path
                d="M 50% 55% Q 60% 50% 80% 50%"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 1.1 }}
              />
              <motion.path
                d="M 50% 55% L 50% 85%"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 1.3 }}
              />
            </g>
            
            {/* Active connection lines with animated flow */}
            {connectionPaths.map((path, i) => {
              const x1 = path.from.position.x;
              const y1 = path.from.position.y;
              const x2 = path.to.position.x;
              const y2 = path.to.position.y;
              const midX = (x1 + x2) / 2;
              const midY = (y1 + y2) / 2;
              const controlOffset = Math.abs(x2 - x1) > Math.abs(y2 - y1) ? 10 : 0;
              
              return (
                <g key={path.key}>
                  {/* Main path */}
                  <motion.path
                    d={`M ${x1}% ${y1}% Q ${midX}% ${midY + controlOffset}% ${x2}% ${y2}%`}
                    stroke="url(#activeLineGradient)"
                    strokeWidth="3"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  />
                  
                  {/* Animated flow particle */}
                  <motion.circle
                    r="4"
                    fill="hsl(var(--primary))"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 1, 1, 0],
                      offsetDistance: ['0%', '100%'],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: 'linear',
                    }}
                    style={{
                      offsetPath: `path("M ${x1}% ${y1}% Q ${midX}% ${midY + controlOffset}% ${x2}% ${y2}%")`,
                    }}
                  />
                  
                  {/* Glow effect */}
                  <motion.circle
                    r="8"
                    fill="hsl(var(--primary))"
                    opacity="0.3"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 0.3, 0.3, 0],
                      offsetDistance: ['0%', '100%'],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: 'linear',
                    }}
                    style={{
                      offsetPath: `path("M ${x1}% ${y1}% Q ${midX}% ${midY + controlOffset}% ${x2}% ${y2}%")`,
                      filter: 'blur(4px)',
                    }}
                  />
                </g>
              );
            })}
          </svg>

          {/* Architecture nodes */}
          {architectureNodes.map((node, index) => (
            <NodeCard 
              key={node.id} 
              node={node} 
              index={index}
              selectedNode={selectedNode}
              connectedNodes={connectedNodes}
              onSelect={setSelectedNode}
            />
          ))}

          {/* Selection info panel */}
          {selectedNode && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute top-4 left-4 glass-card rounded-xl p-4 border border-primary/30 max-w-xs"
            >
              <h4 className="text-sm font-semibold text-foreground mb-2">
                🔗 Connected Components
              </h4>
              <p className="text-xs text-muted-foreground mb-3">
                Showing data flow paths for the selected component
              </p>
              <div className="flex flex-wrap gap-1">
                {Array.from(connectedNodes).map(nodeId => {
                  const node = architectureNodes.find(n => n.id === nodeId);
                  const colors = categoryColors[node?.category || 'compute'];
                  return (
                    <span 
                      key={nodeId}
                      className={`text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r ${colors.bg} text-white`}
                    >
                      {node?.title}
                    </span>
                  );
                })}
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="mt-3 text-xs text-primary hover:text-primary/80 underline"
              >
                Clear selection
              </button>
            </motion.div>
          )}

          {/* Legend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="absolute bottom-4 left-4 right-4 flex flex-wrap justify-center gap-2"
          >
            {Object.entries(categoryLabels).map(([key, label]) => (
              <div 
                key={key}
                className={`flex items-center gap-1.5 px-2 py-1 rounded-full glass-card text-[10px] font-medium ${categoryColors[key].border} border`}
              >
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${categoryColors[key].bg}`} />
                {label}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[
            { icon: <Zap className="w-6 h-6" />, title: 'Auto-Scaling', desc: 'Compute scales automatically during peak sales events, then reduces to control costs 💸', gradient: 'from-aws to-yellow-400' },
            { icon: <Globe className="w-6 h-6" />, title: 'Global Reach', desc: 'CDN delivers content worldwide with fast load times, supporting international expansion 🌍', gradient: 'from-gcp to-emerald-400' },
            { icon: <Shield className="w-6 h-6" />, title: 'Enterprise Security', desc: 'IAM, encryption, and firewall rules protect customer data and payment info 🛡️', gradient: 'from-oracle to-rose-400' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-card rounded-2xl p-6 border border-border/60"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white mb-4`}>
                {item.icon}
              </div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
