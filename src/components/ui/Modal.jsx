import React, { useEffect } from 'react';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  className = '',
  closeOnOutsideClick = true,
  ...props 
}) => {
  // Handle escape key press
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      // Prevent scrolling of the body when modal is open
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Size classes
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4'
  };
  
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && closeOnOutsideClick) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={handleBackdropClick}
    >
      <div 
        className={`
          bg-white rounded-lg shadow-xl w-full relative
          ${sizeClasses[size] || sizeClasses.md}
          transform transition-all duration-300 scale-100
          ${className}
        `}
        {...props}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h3 className="text-lg font-medium text-gray-800">{title}</h3>
          <button 
            className="text-gray-400 hover:text-gray-500 bg-gray-100 hover:bg-gray-200 p-1.5 rounded-md focus:outline-none"
            onClick={onClose}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Content */}
        <div className="px-6 py-4">
          {children}
        </div>
      </div>
    </div>
  );
};

// Confirmation Modal variation
Modal.Confirm = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'Confirm Action', 
  message = 'Are you sure you want to perform this action?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  isLoading = false,
  ...props 
}) => {
  // Variant classes for the confirm button
  const variantClasses = {
    primary: 'bg-blue-100 hover:bg-blue-200 text-blue-700 border border-blue-200',
    danger: 'bg-red-100 hover:bg-red-200 text-red-700 border border-red-200',
    success: 'bg-green-100 hover:bg-green-200 text-green-700 border border-green-200'
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      {...props}
    >
      <div className="text-gray-700 mb-6">{message}</div>
      
      <div className="flex justify-end gap-3">
        <button
          className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200"
          onClick={onClose}
          disabled={isLoading}
        >
          {cancelText}
        </button>
        
        <button
          className={`
            px-4 py-2 rounded-lg ${variantClasses[variant] || variantClasses.danger}
            flex items-center justify-center min-w-[100px]
          `}
          onClick={onConfirm}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            confirmText
          )}
        </button>
      </div>
    </Modal>
  );
};

// Form Modal for adding/editing
Modal.Form = ({ 
  isOpen, 
  onClose, 
  onSubmit,
  title,
  submitText = 'Save',
  cancelText = 'Cancel',
  isLoading = false,
  children,
  ...props 
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      {...props}
    >
      <form onSubmit={handleSubmit}>
        {children}
        
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
          <button
            type="button"
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelText}
          </button>
          
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700 border border-blue-200 flex items-center justify-center min-w-[100px]"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              submitText
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default Modal; 