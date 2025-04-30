import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  icon = null,
  ...props 
}) => {
  // Button style variants with lighter colors
  const variants = {
    primary: 'bg-blue-100 hover:bg-blue-200 text-blue-700 border border-blue-200',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200',
    danger: 'bg-red-50 hover:bg-red-100 text-red-600 border border-red-200',
    success: 'bg-green-50 hover:bg-green-100 text-green-600 border border-green-200',
    outline: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300',
    link: 'text-blue-600 hover:text-blue-800 bg-transparent'
  };

  // Button sizes
  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  return (
    <button
      className={`
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        rounded-lg transition-colors
        flex items-center justify-center gap-2
        ${className}
      `}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;