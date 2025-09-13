import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass';
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '',
  variant = 'default'
}) => {
  const baseClasses = 'rounded-xl p-6 shadow-lg';
  const variantClasses = {
    default: 'bg-white',
    glass: 'glass', // Uses the existing glass class from index.css
  };
  
  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
};