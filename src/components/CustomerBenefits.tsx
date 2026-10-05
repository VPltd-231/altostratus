import { FC } from 'react';
import { m } from 'framer-motion';
import { Shield, Lock, Eye, Database, Globe, ArrowRight, CheckCircle2 } from 'lucide-react';

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

export const CustomerBenefits: FC = () => {
  return (
    <section className="py-24 px-4" id="benefits">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/20 mb-6">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Security & Data Hygiene
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">Trusted</span> Infrastructure
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Your data is your most valuable business asset. Here's how multi-cloud architecture
            enforces proper data hygiene across every touchpoint.
          </p>
        </m.div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {benefits.map((benefit, i) => (
            <m.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.08, 0.24), ease: [0.22, 1, 0.36, 1] }}
              className="group glass-card rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-colors duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <benefit.icon className="w-6 h-6 text-primary" aria-hidden />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 text-foreground">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-primary/70 opacity-0 group-hover:opacity-100 transition-opacity">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Enterprise-grade protection</span>
              </div>
            </m.div>
          ))}
        </div>

        {/* Data hygiene CTA */}
        <m.div
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
        </m.div>
      </div>
    </section>
  );
};
