import React from "react";
import { ChevronDown } from "lucide-react";

interface Option {
  label: string;
  value: string | number;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options?: Option[];
  error?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options = [],
  error,
  fullWidth = true,
  className = "",
  children,
  icon,
  ...props
}) => {
  return (
    <div className={`${fullWidth ? "w-full" : "inline-block"} ${className}`}>
      {label && (
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10">
            {icon}
          </div>
        )}
        <select
          className={`
            enterprise-input 
            ${fullWidth ? "w-full" : ""} 
            rounded-lg 
            text-sm 
            py-3 
            ${icon ? "pl-10" : "pl-4"}
            pr-10 
            appearance-none 
            cursor-pointer
            focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
            ${error ? "border-rose-500" : ""}
          `}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
          {children}
        </select>

        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          <ChevronDown size={16} />
        </div>
      </div>

      {error && (
        <p className="mt-1 text-xs text-rose-500 font-medium">{error}</p>
      )}
    </div>
  );
};
