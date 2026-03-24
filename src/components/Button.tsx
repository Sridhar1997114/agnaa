import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'white' | 'outline';
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick, 
  href, 
  type = 'button' 
}: ButtonProps) => {
  const base = "px-6 py-3 rounded-full font-bold transition-all duration-500 flex items-center justify-center gap-2 relative overflow-hidden text-center";
  
  const variants = {
    primary: "bg-[#1C1C72] text-white border border-[#1C1C72] hover:border-[#7B2DBF] hover:shadow-[0_0_20px_rgba(123,45,191,0.5)] shadow-sm",
    white: "bg-white text-[#1C1C72] hover:bg-gray-50 border border-gray-200",
    outline: "bg-white text-[#1C1C72] border-2 border-[#1C1C72] hover:border-[#7B2DBF] hover:text-[#7B2DBF] hover:shadow-[0_0_15px_rgba(123,45,191,0.2)]"
  };
  
  const combinedClasses = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedClasses}>
      {children}
    </button>
  );
};
