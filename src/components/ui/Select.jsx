import React from 'react';

const Select = ({ 
  options = [],
  className = '',
  placeholder,
  value,
  onChange,
  ...props 
}) => {
  return (
    <div className="relative">
      <select
        className={`
          appearance-none
          bg-white text-gray-700
          px-3 py-2 pr-12 rounded-lg 
          border border-gray-300
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          ${className}
        `}
        value={value}
        onChange={onChange}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        
        {options.map((option) => {
          const optionValue = typeof option === 'object' ? option.value : option;
          const optionLabel = typeof option === 'object' ? option.label : option;
          
          return (
            <option key={optionValue} value={optionValue}>
              {optionLabel}
            </option>
          );
        })}
      </select>
      
      {/* Custom dropdown arrow, centered vertically and shifted slightly left */}
      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center justify-center" style={{ width: '1.5rem' }}>
        <svg
          className="h-5 w-5 mb-2"
          style={{ marginLeft: '-2px' }} // shift arrow a bit to the left
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

export default Select; 