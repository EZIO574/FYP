import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false, 
  icon, 
  fullWidth = false, 
  className = '', 
  disabled,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-bold transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg";
  
  const variants = {
    primary: "bg-slate-900 text-white hover:bg-slate-800 shadow-sm focus:ring-slate-900",
    secondary: "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-100 focus:ring-indigo-500",
    outline: "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 shadow-sm focus:ring-slate-200",
    ghost: "bg-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100 focus:ring-slate-200",
    danger: "bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-100 focus:ring-rose-500"
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5 gap-1.5",
    md: "text-sm px-4 py-2.5 gap-2",
    lg: "text-base px-6 py-3 gap-2.5"
  };

  return (
    <button 
      className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${sizes[size]} 
        ${fullWidth ? 'w-full' : ''} 
        ${className}
      `}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && <Loader2 className="animate-spin" size={size === 'sm' ? 14 : 18} />}
      {!isLoading && icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
};