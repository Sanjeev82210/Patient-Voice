import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const QuickActionToolbar = ({ 
  actions = [],
  variant = 'horizontal',
  position = 'top-right',
  className = '',
  showLabels = true 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const defaultActions = [
    {
      id: 'new-report',
      label: 'New Report',
      icon: 'FileText',
      shortcut: 'Ctrl+N',
      variant: 'default',
      onClick: () => console.log('New report')
    },
    {
      id: 'export-data',
      label: 'Export Data',
      icon: 'Download',
      shortcut: 'Ctrl+E',
      variant: 'outline',
      onClick: () => console.log('Export data')
    },
    {
      id: 'urgent-response',
      label: 'Urgent Response',
      icon: 'AlertTriangle',
      shortcut: 'Ctrl+U',
      variant: 'destructive',
      onClick: () => console.log('Urgent response')
    },
    {
      id: 'quick-filter',
      label: 'Quick Filter',
      icon: 'Filter',
      shortcut: 'Ctrl+F',
      variant: 'secondary',
      onClick: () => console.log('Quick filter')
    }
  ];

  const actionItems = actions?.length > 0 ? actions : defaultActions;

  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      case 'center':
        return 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
      default:
        return 'top-4 right-4';
    }
  };

  const handleActionClick = (action) => {
    if (action?.onClick) {
      action?.onClick();
    }
    if (variant === 'floating') {
      setIsExpanded(false);
    }
  };

  // Horizontal Toolbar
  if (variant === 'horizontal') {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        {actionItems?.map((action) => (
          <Button
            key={action?.id}
            variant={action?.variant || 'default'}
            size="sm"
            iconName={action?.icon}
            iconPosition="left"
            onClick={() => handleActionClick(action)}
            title={action?.shortcut ? `${action?.label} (${action?.shortcut})` : action?.label}
            className="clinical-transition"
          >
            {showLabels ? action?.label : ''}
          </Button>
        ))}
      </div>
    );
  }

  // Vertical Toolbar
  if (variant === 'vertical') {
    return (
      <div className={`flex flex-col space-y-2 ${className}`}>
        {actionItems?.map((action) => (
          <Button
            key={action?.id}
            variant={action?.variant || 'default'}
            size="sm"
            iconName={action?.icon}
            iconPosition={showLabels ? 'left' : undefined}
            onClick={() => handleActionClick(action)}
            title={action?.shortcut ? `${action?.label} (${action?.shortcut})` : action?.label}
            className="clinical-transition justify-start"
          >
            {showLabels ? action?.label : ''}
          </Button>
        ))}
      </div>
    );
  }

  // Floating Action Button (Mobile-friendly)
  if (variant === 'floating') {
    return (
      <div className={`fixed ${getPositionClasses()} z-60 ${className}`}>
        {/* Main FAB */}
        <div className="relative">
          <Button
            variant="default"
            size="lg"
            iconName={isExpanded ? 'X' : 'Plus'}
            onClick={() => setIsExpanded(!isExpanded)}
            className="rounded-full shadow-clinical-modal clinical-transition"
          />

          {/* Expanded Actions */}
          {isExpanded && (
            <div className="absolute bottom-full mb-2 right-0 flex flex-col space-y-2 animate-fade-in">
              {actionItems?.map((action, index) => (
                <div
                  key={action?.id}
                  className="flex items-center space-x-2"
                  style={{ 
                    animationDelay: `${index * 50}ms`,
                    animation: 'slide-in 0.2s ease-out forwards'
                  }}
                >
                  {showLabels && (
                    <span className="bg-popover text-foreground px-2 py-1 rounded text-sm shadow-clinical whitespace-nowrap">
                      {action?.label}
                    </span>
                  )}
                  <Button
                    variant={action?.variant || 'default'}
                    size="icon"
                    iconName={action?.icon}
                    onClick={() => handleActionClick(action)}
                    title={action?.shortcut ? `${action?.label} (${action?.shortcut})` : action?.label}
                    className="rounded-full shadow-clinical clinical-transition"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Compact Toolbar (Icon only)
  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      {actionItems?.map((action) => (
        <Button
          key={action?.id}
          variant="ghost"
          size="icon"
          iconName={action?.icon}
          onClick={() => handleActionClick(action)}
          title={action?.shortcut ? `${action?.label} (${action?.shortcut})` : action?.label}
          className="clinical-transition"
        />
      ))}
    </div>
  );
};

export default QuickActionToolbar;