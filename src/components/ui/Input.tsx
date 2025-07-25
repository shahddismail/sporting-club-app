import React from 'react';
import { AlertCircle } from 'lucide-react';

interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  error?: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({ 
  label, 
  value, 
  onChange, 
  type = 'text', 
  error, 
  required = false 
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        error ? 'border-red-500' : 'border-gray-300'
      }`}
    />
    {error && (
      <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
        <AlertCircle size={14} />
        {error}
      </div>
    )}
  </div>
);

export default Input;