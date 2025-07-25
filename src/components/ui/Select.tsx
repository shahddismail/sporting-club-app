import React from 'react';
import { AlertCircle } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  error?: string;
  required?: boolean;
}

const Select: React.FC<SelectProps> = ({ 
  label, 
  value, 
  onChange, 
  options, 
  error, 
  required = false 
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-3 py-2 border rounded-lg text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        error ? 'border-red-500' : 'border-gray-300'
      }`}
    >
      <option value="">Select {label.toLowerCase()}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && (
      <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
        <AlertCircle size={14} />
        {error}
      </div>
    )}
  </div>
);

export default Select;