import { ChevronDown, Check } from "lucide-react";
import React, { SelectHTMLAttributes, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

type SelectProps = {
  icon?: React.ReactNode;
  label?: string;
  containerClassName?: string;
  children: React.ReactNode;
} & SelectHTMLAttributes<HTMLSelectElement>;

export default function Select({ icon, label, containerClassName = "", className = "", children, ...props }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Parse options from children
  const options = React.Children.toArray(children)
    .filter(React.isValidElement)
    .map((child: any) => ({
      value: child.props.value,
      label: child.props.children,
    }));

  const selectedOption = options.find((opt) => String(opt.value) === String(props.value));

  const handleSelect = (value: string | number | readonly string[] | undefined) => {
    if (props.onChange) {
      // Simulate an event object for the existing onChange handlers that expect e.target.value
      const event = {
        target: { value },
      } as React.ChangeEvent<HTMLSelectElement>;
      props.onChange(event);
    }
    setIsOpen(false);
  };

  return (
    <div className={containerClassName} ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
          {icon}
          {label}
          {props.required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative group">
        {/* Hidden native select for form compatibility if needed */}
        <select {...props} className="hidden">
          {children}
        </select>

        {/* Custom trigger button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          disabled={props.disabled}
          className={`
            w-full flex items-center justify-between
            bg-white border-2 focus:outline-none
            ${isOpen ? "border-blue-500 ring-4 ring-blue-500/10" : "border-slate-200 hover:border-blue-300"}
            px-4 py-3 
            rounded-xl
            text-sm font-medium ${selectedOption && selectedOption.value !== "" ? "text-slate-900" : "text-slate-500"}
            transition-all duration-200
            shadow-sm hover:shadow-md
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-slate-200 disabled:hover:shadow-sm
            cursor-pointer
            ${className}
          `}
        >
          <span className="truncate pr-4">
            {selectedOption ? selectedOption.label : "Select an option..."}
          </span>
          
          <div className={`
            bg-slate-50 border border-slate-200 rounded-lg p-1.5 transition-all duration-200 shrink-0
            ${isOpen ? "bg-blue-50 border-blue-300" : "group-hover:bg-blue-50 group-hover:border-blue-200"}
          `}>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-all duration-200 ${isOpen ? "text-blue-600 rotate-180" : "group-hover:text-blue-500"}`} />
          </div>
        </button>

        {/* Custom dropdown list */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute z-50 w-full mt-2 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-xl shadow-xl overflow-hidden"
            >
              <ul className="max-h-60 overflow-y-auto p-1.5 space-y-0.5" style={{ scrollbarWidth: 'thin' }}>
                {options.map((option, index) => {
                  const isSelected = String(option.value) === String(props.value);
                  const isPlaceholder = option.value === "";

                  return (
                    <li
                      key={index}
                      onClick={() => handleSelect(option.value)}
                      className={`
                        relative px-3 py-2.5 rounded-lg text-sm cursor-pointer transition-colors flex items-center justify-between
                        ${isPlaceholder ? "text-slate-400 font-medium italic hover:bg-slate-50" : "text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900"}
                        ${isSelected && !isPlaceholder ? "bg-blue-50 text-blue-700" : ""}
                      `}
                    >
                      <span className="block truncate">{option.label}</span>
                      {isSelected && !isPlaceholder && (
                        <Check className="w-4 h-4 text-blue-600 shrink-0" />
                      )}
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
