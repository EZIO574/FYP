import React from "react";

interface InputProps extends React.InputHTMLAttributes<
  HTMLInputElement | HTMLTextAreaElement
> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  multiline?: boolean;
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  multiline = false,
  fullWidth = true,
  className = "",
  ...props
}) => {
  const baseInputStyles = `
    enterprise-input 
    ${fullWidth ? "w-full" : ""} 
    rounded-lg 
    text-sm 
    transition-all
    focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
    placeholder:text-slate-400
    ${icon ? "pl-10 pr-4" : "px-4"}
    ${error ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500" : ""}
  `;

  return (
    <div className={`${fullWidth ? "w-full" : "inline-block"} ${className}`}>
      {label && (
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            {icon}
          </div>
        )}

        {multiline ? (
          <textarea
            className={`${baseInputStyles} py-3 resize-none`}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            className={`${baseInputStyles} py-3`}
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
      </div>

      {error && (
        <p className="mt-1 text-xs text-rose-500 font-medium">{error}</p>
      )}
    </div>
  );
};
