
import React from 'react';
import { Shield, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  withText?: boolean;
  className?: string;
  animated?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  withText = true,
  className,
  animated = false
}) => {
  // Size mappings for the logo container
  const sizeClasses = {
    sm: 'h-7 w-7',
    md: 'h-8 w-8',
    lg: 'h-10 w-10'
  };

  // Size mappings for the icon
  const iconSizes = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  // Size mappings for the text
  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl'
  };

  const LogoIcon = () => (
    <div className={cn(
      sizeClasses[size],
      "rounded-md bg-primary flex items-center justify-center relative overflow-hidden"
    )}>
      {animated ? (
        <>
          <motion.div 
            className="absolute inset-0 bg-primary-foreground/10"
            initial={{ y: '100%' }}
            animate={{ y: '-100%' }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5, 
              ease: "linear",
              repeatType: "loop"
            }}
          />
          <ShieldCheck className={cn(iconSizes[size], "text-white relative z-10")} />
        </>
      ) : (
        <Shield className={cn(iconSizes[size], "text-white")} />
      )}
    </div>
  );

  const LogoText = () => (
    <span className={cn(textSizes[size], "font-medium")}>
      Guard
    </span>
  );

  if (animated) {
    return (
      <motion.div 
        className={cn("flex items-center gap-2", className)}
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <LogoIcon />
        {withText && (
          <motion.div
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <LogoText />
          </motion.div>
        )}
      </motion.div>
    );
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <LogoIcon />
      {withText && <LogoText />}
    </div>
  );
};

export default Logo;
