import { ChevronDown } from "lucide-react";
import React, { SelectHTMLAttributes } from "react";

type SelectProps = {
  icon?: React.ReactNode;
  label?: string;
  containerClassName?: string;
  children: React.ReactNode;
} & SelectHTMLAttributes<HTMLSelectElement>;

export default function Select({ icon, label, containerClassName = "", className = "", children, ...props }: SelectProps) {
  return (
    <div className={containerClassName}>
      {label && (
        <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
          {icon}
          {label}
          {props.required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative group">
        <select
          {...props}
          className={`
            w-full appearance-none
            bg-white border-2 border-slate-200
            hover:border-blue-300
            focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10
            px-4 py-3 pr-12
            rounded-xl
            text-sm font-medium text-slate-900
            outline-none
            transition-all duration-200
            shadow-sm hover:shadow-md
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-slate-200 disabled:hover:shadow-sm
            cursor-pointer
            ${className}
          `}
        >
          {children}
        </select>
        {/* Custom Arrow Icon */}
        <div className="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none bg-slate-50 group-hover:bg-blue-50 group-focus-within:bg-blue-50 border border-slate-200 group-hover:border-blue-200 group-focus-within:border-blue-300 rounded-lg p-1.5 transition-all duration-200">
          <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-blue-500 group-focus-within:text-blue-600 transition-colors" />
        </div>
      </div>
    </div>
  );
}
