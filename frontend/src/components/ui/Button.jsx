import React from 'react';
import { cn } from '../../utils/cn';
import Icon from '../AppIcon';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  className = '',
  disabled = false,
  type = 'button',
  onClick,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md';

  // Theme-aware colors based on current route
  const path = typeof window !== 'undefined' ? window.location?.pathname : '';
  const theme = (() => {
    if (path?.startsWith('/feedback-management')) return 'purple';
    if (path?.startsWith('/feedback-analytics')) return 'teal';
    if (path?.startsWith('/analytics-overview')) return 'rose';
    if (path?.startsWith('/reports')) return 'amber';
    // default dashboard
    return 'blue';
  })();

  const themedSolid = {
    blue: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    purple: 'bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500',
    teal: 'bg-teal-600 text-white hover:bg-teal-700 focus:ring-teal-500',
    rose: 'bg-rose-500 text-white hover:bg-rose-600 focus:ring-rose-500',
    amber: 'bg-amber-500 text-white hover:bg-amber-600 focus:ring-amber-500',
  }[theme];

  const themedOutline = {
    blue: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500 bg-white',
    purple: 'border-2 border-purple-600 text-purple-600 hover:bg-purple-50 focus:ring-purple-500 bg-white',
    teal: 'border-2 border-teal-600 text-teal-600 hover:bg-teal-50 focus:ring-teal-500 bg-white',
    rose: 'border-2 border-rose-500 text-rose-600 hover:bg-rose-50 focus:ring-rose-500 bg-white',
    amber: 'border-2 border-amber-500 text-amber-600 hover:bg-amber-50 focus:ring-amber-500 bg-white',
  }[theme];

  const variants = {
    primary: themedSolid,
    default: themedSolid,
    outline: themedOutline,
    // Keep explicit variants available when needed
    secondary: 'bg-teal-600 text-white hover:bg-teal-700 focus:ring-teal-500',
    success: 'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500',
    warning: 'bg-amber-500 text-white hover:bg-amber-600 focus:ring-amber-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    purple: 'bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500',
    indigo: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
    'outline-teal': 'border-2 border-teal-600 text-teal-600 hover:bg-teal-50 focus:ring-teal-500 bg-white',
    'outline-purple': 'border-2 border-purple-600 text-purple-600 hover:bg-purple-50 focus:ring-purple-500 bg-white',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseStyles,
        variants[variant] || variants.primary,
        sizes[size] || sizes.md,
        className
      )}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <Icon name={icon} className="mr-2" size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <Icon name={icon} className="ml-2" size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />
      )}
    </button>
  );
};

export default Button;
