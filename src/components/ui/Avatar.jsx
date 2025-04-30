import React from 'react';

const Avatar = ({ 
  src = null, 
  alt = '', 
  initials = '', 
  size = 'md', 
  color = 'blue',
  className = '', 
  ...props 
}) => {
  // Size classes
  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base'
  };

  // Color classes for initials avatar
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    gray: 'bg-gray-100 text-gray-600',
    green: 'bg-green-100 text-green-600',
    red: 'bg-red-100 text-red-600',
    amber: 'bg-amber-100 text-amber-600'
  };

  // If there's an image source, render img tag
  if (src) {
    return (
      <div 
        className={`${sizeClasses[size] || sizeClasses.md} rounded-full overflow-hidden flex-shrink-0 ${className}`}
        {...props}
      >
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover" 
        />
      </div>
    );
  }

  // Else render initials
  return (
    <div 
      className={`
        ${sizeClasses[size] || sizeClasses.md} 
        ${colorClasses[color] || colorClasses.blue} 
        rounded-full flex items-center justify-center font-medium flex-shrink-0
        ${className}
      `} 
      {...props}
    >
      {initials.slice(0, 2)}
    </div>
  );
};

export default Avatar; 