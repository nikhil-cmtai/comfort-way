import React from 'react';

const PageHeader = ({ 
  title, 
  description = '', 
  actions = null, 
  className = '',
  ...props 
}) => {
  return (
    <div className={`mb-6 ${className}`} {...props}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">{title}</h1>
          {description && <p className="text-gray-500">{description}</p>}
        </div>

        {actions && (
          <div className="flex flex-wrap gap-2">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader; 