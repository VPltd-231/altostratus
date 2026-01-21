import { motion } from 'framer-motion';
import { Cloud, Database, Server, Shield, Zap, Code, Globe, Cpu, HardDrive, Wifi } from 'lucide-react';

const floatingIcons = [
  { Icon: Cloud, x: '5%', y: '15%', size: 24, delay: 0, duration: 18 },
  { Icon: Database, x: '92%', y: '25%', size: 20, delay: 2, duration: 22 },
  { Icon: Server, x: '15%', y: '70%', size: 22, delay: 1, duration: 20 },
  { Icon: Shield, x: '88%', y: '75%', size: 18, delay: 3, duration: 25 },
  { Icon: Zap, x: '50%', y: '10%', size: 16, delay: 4, duration: 19 },
  { Icon: Code, x: '75%', y: '45%', size: 20, delay: 2.5, duration: 21 },
  { Icon: Globe, x: '25%', y: '40%', size: 18, delay: 1.5, duration: 23 },
  { Icon: Cpu, x: '60%', y: '80%', size: 22, delay: 3.5, duration: 17 },
  { Icon: HardDrive, x: '35%', y: '85%', size: 16, delay: 0.5, duration: 24 },
  { Icon: Wifi, x: '80%', y: '12%', size: 20, delay: 4.5, duration: 20 },
];

const shapes = [
  { type: 'circle', x: '10%', y: '20%', size: 80, delay: 0, duration: 25 },
  { type: 'circle', x: '85%', y: '60%', size: 120, delay: 3, duration: 30 },
  { type: 'square', x: '70%', y: '15%', size: 60, delay: 1, duration: 28 },
  { type: 'square', x: '20%', y: '75%', size: 90, delay: 2, duration: 22 },
  { type: 'triangle', x: '45%', y: '30%', size: 50, delay: 4, duration: 26 },
  { type: 'triangle', x: '90%', y: '85%', size: 70, delay: 1.5, duration: 24 },
  { type: 'hexagon', x: '5%', y: '50%', size: 100, delay: 2.5, duration: 32 },
  { type: 'hexagon', x: '55%', y: '90%', size: 60, delay: 0.5, duration: 27 },
];

const Triangle = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <polygon 
      points="50,10 90,90 10,90" 
      stroke="currentColor" 
      strokeWidth="1" 
      fill="none"
    />
  </svg>
);

const Hexagon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <polygon 
      points="50,5 93,25 93,75 50,95 7,75 7,25" 
      stroke="currentColor" 
      strokeWidth="1" 
      fill="none"
    />
  </svg>
);

export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Gradient orbs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px]"
        style={{ left: '-10%', top: '10%' }}
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-gcp/5 blur-[120px]"
        style={{ right: '-5%', top: '40%' }}
        animate={{
          x: [0, -80, 0],
          y: [0, 100, 0],
          scale: [1.1, 0.9, 1.1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-oracle/5 blur-[100px]"
        style={{ left: '30%', bottom: '-10%' }}
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -80, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating shapes */}
      {shapes.map((shape, i) => (
        <motion.div
          key={`shape-${i}`}
          className="absolute text-primary/10"
          style={{ left: shape.x, top: shape.y }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, -15, 0],
            rotate: [0, 180, 360],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {shape.type === 'circle' && (
            <div 
              className="rounded-full border border-current" 
              style={{ width: shape.size, height: shape.size }}
            />
          )}
          {shape.type === 'square' && (
            <div 
              className="border border-current rotate-45" 
              style={{ width: shape.size, height: shape.size }}
            />
          )}
          {shape.type === 'triangle' && <Triangle size={shape.size} />}
          {shape.type === 'hexagon' && <Hexagon size={shape.size} />}
        </motion.div>
      ))}

      {/* Floating icons */}
      {floatingIcons.map((item, i) => (
        <motion.div
          key={`icon-${i}`}
          className="absolute text-muted-foreground/15"
          style={{ left: item.x, top: item.y }}
          animate={{
            y: [0, -40, 0],
            x: [0, 20, -20, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <item.Icon size={item.size} />
        </motion.div>
      ))}

      {/* Animated grid lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.02]">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" className="text-foreground" />
      </svg>

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full bg-primary/20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 10,
            delay: Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};
