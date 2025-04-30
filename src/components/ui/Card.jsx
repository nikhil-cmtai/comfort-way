import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  shadow = 'sm',
  padding = true,
  hover = false,
  ...props 
}) => {
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg'
  };

  return (
    <div 
      className={`
        bg-white rounded-xl overflow-hidden 
        ${padding ? 'p-4' : ''}
        ${shadowClasses[shadow] || shadowClasses.sm} 
        ${hover ? 'hover:shadow-md transition-shadow' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

// Card Header component
Card.Header = ({ children, className = '', ...props }) => (
  <div className={`mb-4 ${className}`} {...props}>
    {children}
  </div>
);

// Card Body component
Card.Body = ({ children, className = '', ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);

// Card Footer component
Card.Footer = ({ children, className = '', ...props }) => (
  <div className={`mt-4 pt-3 border-t border-gray-100 ${className}`} {...props}>
    {children}
  </div>
);

export default Card; 