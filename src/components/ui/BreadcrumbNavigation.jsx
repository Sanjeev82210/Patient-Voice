import React from 'react';
import Icon from '../AppIcon';

const BreadcrumbNavigation = ({ 
  items = [],
  separator = 'ChevronRight',
  className = '' 
}) => {
  if (!items || items?.length === 0) return null;

  const handleNavigation = (path) => {
    if (path) {
      window.location.href = path;
    }
  };

  return (
    <nav 
      className={`flex items-center space-x-2 text-sm ${className}`}
      aria-label="Breadcrumb navigation"
    >
      <ol className="flex items-center space-x-2">
        {items?.map((item, index) => {
          const isLast = index === items?.length - 1;
          const isClickable = item?.path && !isLast;

          return (
            <li key={index} className="flex items-center space-x-2">
              {/* Breadcrumb Item */}
              {isClickable ? (
                <button
                  onClick={() => handleNavigation(item?.path)}
                  className="text-muted-foreground hover:text-foreground clinical-transition focus-clinical rounded px-1 py-0.5"
                  aria-current={isLast ? 'page' : undefined}
                >
                  <span className="flex items-center space-x-1">
                    {item?.icon && (
                      <Icon name={item?.icon} size={14} />
                    )}
                    <span>{item?.label}</span>
                  </span>
                </button>
              ) : (
                <span 
                  className={`flex items-center space-x-1 ${
                    isLast 
                      ? 'text-foreground font-medium' 
                      : 'text-muted-foreground'
                  }`}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item?.icon && (
                    <Icon name={item?.icon} size={14} />
                  )}
                  <span>{item?.label}</span>
                </span>
              )}
              {/* Separator */}
              {!isLast && (
                <Icon 
                  name={separator} 
                  size={14} 
                  className="text-muted-foreground flex-shrink-0"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadcrumbNavigation;