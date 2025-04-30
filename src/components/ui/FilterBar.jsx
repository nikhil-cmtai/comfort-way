import React from 'react';
import Card from './Card';

const FilterBar = ({ 
  children,
  className = '',
  ...props 
}) => {
  return (
    <Card className={`p-4 mb-6 ${className}`} {...props}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {children}
      </div>
    </Card>
  );
};

// Filter group component for grouping related filters
FilterBar.Group = ({ children, className = '', ...props }) => (
  <div className={`flex flex-wrap gap-2 ${className}`} {...props}>
    {children}
  </div>
);

export default FilterBar; 