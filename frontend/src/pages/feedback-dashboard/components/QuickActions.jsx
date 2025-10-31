import React from 'react';

import Icon from '../../../components/AppIcon';

const QuickActions = ({ className = '' }) => {
  const quickActions = [
    {
      id: 'new-report',
      label: 'Generate Report',
      description: 'Create comprehensive feedback report',
      icon: 'FileText',
      variant: 'default',
      onClick: () => window.location.href = '/reports'
    },
    {
      id: 'urgent-alerts',
      label: 'Urgent Alerts',
      description: 'View high-priority feedback',
      icon: 'AlertTriangle',
      variant: 'destructive',
      badge: 3,
      onClick: () => console.log('View urgent alerts')
    },
    {
      id: 'export-data',
      label: 'Export Data',
      description: 'Download feedback analytics',
      icon: 'Download',
      variant: 'outline',
      onClick: () => console.log('Export data')
    },
    {
      id: 'patient-form',
      label: 'Patient Form',
      description: 'Access feedback collection form',
      icon: 'ClipboardList',
      variant: 'secondary',
      onClick: () => window.location.href = '/patient-feedback-form'
    }
  ];

  const handleActionClick = (action) => {
    if (action?.onClick) {
      action?.onClick();
    }
  };

  return (
    <div className={`card-clinical ${className}`}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Quick Actions
        </h3>
        <p className="text-sm text-muted-foreground">
          Frequently used tools and shortcuts
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quickActions?.map((action) => (
          <button
            key={action?.id}
            onClick={() => handleActionClick(action)}
            className="flex items-start space-x-4 p-4 border border-border rounded-lg hover:bg-muted/50 clinical-transition text-left focus-clinical"
          >
            <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${
              action?.variant === 'destructive' ? 'bg-error/10 text-error' :
              action?.variant === 'outline' ? 'bg-muted text-muted-foreground' :
              action?.variant === 'secondary'? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'
            }`}>
              <Icon name={action?.icon} size={20} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-medium text-foreground">
                  {action?.label}
                </h4>
                {action?.badge && (
                  <span className="alert-badge pulse-ambient">
                    {action?.badge}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {action?.description}
              </p>
            </div>

            <Icon name="ChevronRight" size={16} className="text-muted-foreground mt-2" />
          </button>
        ))}
      </div>
      {/* Additional Quick Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-lg font-bold text-foreground">24</p>
            <p className="text-xs text-muted-foreground">Pending Reviews</p>
          </div>
          <div>
            <p className="text-lg font-bold text-foreground">156</p>
            <p className="text-xs text-muted-foreground">This Week</p>
          </div>
          <div>
            <p className="text-lg font-bold text-foreground">4.6</p>
            <p className="text-xs text-muted-foreground">Avg Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;