import React, { useState } from 'react';
import './TextField.css';

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'password' | 'email' | 'number';
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  maxLength?: number;
  showClear?: boolean;
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  disabled = false,
  error = '',
  helperText = '',
  maxLength,
  showClear = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClear = () => {
    onChange('');
  };

  return (
    <div className={`text-field ${error ? 'error' : ''} ${disabled ? 'disabled' : ''}`}>
      <label className="text-field-label gotham-book-12">{label}</label>
      <div className="text-field-input-wrapper">
        <input
          type={type === 'password' && showPassword ? 'text' : type}
          className="text-field-input gotham-medium-15"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
        />
        {showClear && value && !disabled && (
          <button className="text-field-clear" onClick={handleClear} type="button">
            ✕
          </button>
        )}
        {type === 'password' && (
          <button
            className="text-field-toggle"
            onClick={() => setShowPassword(!showPassword)}
            type="button"
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        )}
      </div>
      {helperText && !error && (
        <div className="text-field-helper gotham-book-12">{helperText}</div>
      )}
      {error && <div className="text-field-error gotham-book-12">{error}</div>}
      {maxLength && (
        <div className="text-field-counter gotham-book-12">
          {value.length}/{maxLength}
        </div>
      )}
    </div>
  );
};
