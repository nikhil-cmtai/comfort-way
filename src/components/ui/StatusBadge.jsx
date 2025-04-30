import React from 'react';

const StatusBadge = ({ 
  status, 
  type = 'default', 
  className = '', 
  ...props 
}) => {
  // Predefined status types
  const statusTypes = {
    // Default status styling
    default: {
      'new': 'bg-blue-100 text-blue-800',
      'contacted': 'bg-yellow-100 text-yellow-800',
      'qualified': 'bg-green-100 text-green-800',
      'pending': 'bg-amber-100 text-amber-700',
      'in progress': 'bg-blue-100 text-blue-700',
      'completed': 'bg-green-100 text-green-700',
      'cancelled': 'bg-gray-100 text-gray-700',
    },
    // Priority styling
    priority: {
      'high': 'bg-red-100 text-red-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'low': 'bg-green-100 text-green-800',
    },
    // Stock status styling
    stock: {
      'low stock': 'bg-red-100 text-red-800',
      'medium stock': 'bg-yellow-100 text-yellow-800',
      'in stock': 'bg-green-100 text-green-800',
    }
  };

  // Normalize status for lookup
  const normalizedStatus = status.toLowerCase();
  
  // Get styling based on type and status
  const styleClass = statusTypes[type]?.[normalizedStatus] || 'bg-gray-100 text-gray-800';

  return (
    <span 
      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${styleClass} ${className}`}
      {...props}
    >
      {status}
    </span>
  );
};

export default StatusBadge; 