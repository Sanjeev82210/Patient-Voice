import React from 'react';

const NavigationAlertBadge = ({ 
  count = 0, 
  variant = 'default',
  size = 'default',
  className = '',
  animate = true 
}) => {
  if (!count || count === 0) return null;

  const getVariantClasses = () => {
    switch (variant) {
      case 'urgent':
        return 'bg-error text-error-foreground';
      case 'warning':
        return 'bg-warning text-warning-foreground';
      case 'success':
        return 'bg-success text-success-foreground';
      case 'info':
        return 'bg-primary text-primary-foreground';
      default:
        return 'bg-error text-error-foreground';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-4 h-4 text-xs';
      case 'lg':
        return 'w-6 h-6 text-sm';
      default:
        return 'w-5 h-5 text-xs';
    }
  };

  const displayCount = count > 99 ? '99+' : count?.toString();

  return (
    <span 
      className={`
        inline-flex items-center justify-center
        ${getSizeClasses()}
        ${getVariantClasses()}
        rounded-full font-medium
        ${animate ? 'pulse-ambient' : ''}
        ${className}
      `}
      aria-label={`${count} new notifications`}
    >
      {displayCount}
    </span>
  );
};

export default NavigationAlertBadge;