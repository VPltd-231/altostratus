import { FC } from 'react';
import { motion } from 'framer-motion';
import { Cloud } from 'lucide-react';

export const Logo3D: FC = () => {
  return (
    <a href="#" className="flex items-center gap-3 group">
      {/* 3D Rotating Cloud Container */}
      <div className="relative w-10 h-10 perspective-1000">
        {/* Orbiting mini clouds */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotateY: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {[0, 120, 240].map((rotation, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-3 h-3"
              style={{
                transform: `rotateY(${rotation}deg) translateZ(18px) translateX(-50%) translateY(-50%)`,
                transformStyle: "preserve-3d",
              }}
            >
              <Cloud className="w-3 h-3 text-primary/60" />
            </motion.div>
          ))}
        </motion.div>

        {/* Main rotating cloud */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ 
            rotateY: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            rotateY: { duration: 6, repeat: Infinity, ease: "linear" },
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <Cloud className="w-7 h-7 text-primary drop-shadow-lg" />
        </motion.div>

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/20 blur-xl"
          animate={{ 
            scale: [0.8, 1.2, 0.8],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* 3D Rotating Text */}
      <div className="relative overflow-hidden h-7">
        <motion.div
          className="flex flex-col"
          animate={{ y: [0, -28, -28, 0] }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut",
            times: [0, 0.25, 0.75, 1]
          }}
        >
          <span className="text-xl font-bold h-7 flex items-center">
            <span className="gradient-text">RunRate</span>
            <span className="text-foreground">Host</span>
          </span>
          <span className="text-xl font-bold h-7 flex items-center">
            <span className="text-primary">☁️</span>
            <span className="text-foreground ml-1">Save More</span>
          </span>
        </motion.div>
      </div>
    </a>
  );
};
