"use client";

import React, { useState, useEffect } from 'react';

interface OdometerProps {
  value: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export const Odometer: React.FC<OdometerProps> = ({ 
  value, 
  duration = 1000, 
  className = "", 
  prefix = "", 
  suffix = "",
  decimals = 2
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const startValue = displayValue;
    
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Power-out easing
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      
      const current = startValue + (value - startValue) * easedProgress;
      setDisplayValue(current);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [value, duration]);

  const formattedValue = displayValue.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span className={`font-mono transition-all duration-300 ${className}`}>
      {prefix}{formattedValue}{suffix}
    </span>
  );
};
