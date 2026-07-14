import { FC } from 'react';
import { motion } from 'framer-motion';
import { 
  Cloud, Shield, Zap, Globe, BookOpen, Mail, 
  TrendingUp, Server, Lock, Cpu, Database, 
  BarChart3, ArrowUpRight, Heart, Sparkles
} from 'lucide-react';

const footerFeatures = [
  {
    icon: Shield,
    title: 'Security First',
    desc: 'Enterprise-grade security comparisons across all providers',
  },
  {
    icon: Globe,
    title: 'Global Coverage',
    desc: 'Region availability and latency data for 60+ locations',
  },
  {
    icon: BarChart3,
    title: 'Live Pricing',
    desc: 'Real-time cost calculators updated with latest rates',
  },
  {
    icon: Cpu,
    title: 'Performance Benchmarks',
    desc: 'Side-by-side compute, storage, and network benchmarks',
  },
];

const quickLinks = [
  { label: 'Provider Comparison', href: '#providers' },
  { label: 'Pricing Calculator', href: '#pricing' },
  { label: 'Cloud Credits Guide', href: '#credits' },
  { label: 'Pro Tips', href: '#recommendations' },
];

const resourceLinks = [
  { label: 'AWS Documentation', href: 'https://docs.aws.amazon.com', external: true },
  { label: 'Google Cloud Docs', href: 'https://cloud.google.com/docs', external: true },
  { label: 'Azure Learn', href: 'https://learn.microsoft.com/azure', external: true },
  { label: 'Oracle Cloud Docs', href: 'https://docs.oracle.com/en-us/iaas', external: true },
];

const stats = [
  { value: '5+', label: 'Cloud Providers' },
  { value: '100+', label: 'Services Compared' },
  { value: '60+', label: 'Global Regions' },
  { value: '10K+', label: 'Users Helped' },
];

export const Footer: FC = () => {
  return (
    <footer className="relative overflow-hidden border-t border-border">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-[20%] w-80 h-80 bg-primary/10 rounded-full blur-[120px]"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 right-[15%] w-64 h-64 bg-gcp/10 rounded-full blur-[100px]"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.15, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Features Strip */}
      <div className="relative z-10 py-16 px-4 bg-secondary/20">
        <div className="max-w-6xl mx-auto">
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
              <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Why RunRateHost
              </span>
            </motion.div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Everything You Need to{' '}
              <span className="bg-gradient-to-r from-primary via-gcp to-azure bg-clip-text text-transparent">
                Choose Wisely
              </span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto text-sm">
              Data-driven insights to help you pick the right cloud infrastructure
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {footerFeatures.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group glass-card rounded-xl p-5 border border-border/40 bg-card/80 backdrop-blur-xl hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors duration-300">
                  <feat.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="font-semibold text-sm mb-1.5 text-foreground">{feat.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="relative z-10 py-10 px-4 border-t border-border/30">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 150 }}
                className="text-center"
              >
                <motion.p
                  className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-primary to-gcp bg-clip-text text-transparent"
                  whileInView={{ scale: [0.9, 1.05, 1] }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                >
                  {stat.value}
                </motion.p>
                <p className="text-xs text-muted-foreground mt-1 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 py-14 px-4 border-t border-border/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Brand Column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-gcp flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold">CloudCompare</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                The most comprehensive cloud provider comparison platform. Make informed decisions 
                with real-time data, detailed benchmarks, and expert recommendations.
              </p>
              <div className="flex items-center gap-4">
                {[
                  { icon: Server, label: 'Infrastructure' },
                  { icon: Lock, label: 'Security' },
                  { icon: Database, label: 'Data' },
                  { icon: TrendingUp, label: 'Analytics' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    className="w-8 h-8 rounded-md bg-secondary/80 flex items-center justify-center cursor-default hover:bg-primary/10 transition-colors"
                    title={item.label}
                  >
                    <item.icon className="w-4 h-4 text-muted-foreground" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              <h3 className="font-semibold text-sm mb-4 uppercase tracking-wider text-muted-foreground">
                Quick Links
              </h3>
              <ul className="space-y-2.5">
                {quickLinks.map((link, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                  >
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1.5 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h3 className="font-semibold text-sm mb-4 uppercase tracking-wider text-muted-foreground">
                Official Resources
              </h3>
              <ul className="space-y-2.5">
                {resourceLinks.map((link, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.35 + i * 0.08 }}
                  >
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1.5 group"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-primary/50 group-hover:text-primary transition-colors" />
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 py-6 px-4 border-t border-border/30 bg-secondary/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground text-center sm:text-left">
              Information is based on publicly available data and may change. Always verify with official provider documentation.
            </p>
            <motion.p
              className="text-xs text-muted-foreground flex items-center gap-1"
              whileHover={{ scale: 1.05 }}
            >
              Built with <Heart className="w-3 h-3 text-red-500 fill-red-500 inline" /> for the cloud community
            </motion.p>
          </div>
          <p className="text-[10px] text-muted-foreground/60 text-center mt-3">
            AWS, Google Cloud, Microsoft Azure, Oracle Cloud, and IBM Cloud are trademarks of their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
};
