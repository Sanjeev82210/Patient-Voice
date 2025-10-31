import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentFeedbackAlerts = ({ className = '', onFilterClick }) => {
  const alerts = [
    {
      id: 1,
      type: 'urgent',
      patient: 'Anonymous Patient',
      department: 'Emergency Department',
      issue: 'Long wait time complaint - 4+ hours',
      timestamp: '2 minutes ago',
      priority: 'high',
      rating: 1
    },
    {
      id: 2,
      type: 'complaint',
      patient: 'Sarah M.',
      department: 'Cardiology',
      issue: 'Staff communication concerns during consultation',
      timestamp: '15 minutes ago',
      priority: 'medium',
      rating: 2
    },
    {
      id: 3,
      type: 'praise',
      patient: 'John D.',
      department: 'Pediatrics',
      issue: 'Excellent care from nursing staff',
      timestamp: '32 minutes ago',
      priority: 'low',
      rating: 5
    },
    {
      id: 4,
      type: 'suggestion',
      patient: 'Anonymous Patient',
      department: 'Outpatient Surgery',
      issue: 'Suggestion for improved pre-op instructions',
      timestamp: '1 hour ago',
      priority: 'medium',
      rating: 4
    },
    {
      id: 5,
      type: 'urgent',
      patient: 'Maria L.',
      department: 'Maternity Ward',
      issue: 'Cleanliness concerns in patient room',
      timestamp: '2 hours ago',
      priority: 'high',
      rating: 2
    }
  ];

  const handleView = (alert) => {
    // Navigate to feedback management with specific feedback ID
    window.location.href = `/feedback-management?id=${alert.id}`;
  };

  const handleRespond = (alert) => {
    // Navigate to feedback management to respond
    window.location.href = `/feedback-management?id=${alert.id}&action=respond`;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'urgent': return 'AlertTriangle';
      case 'complaint': return 'MessageSquareX';
      case 'praise': return 'Heart';
      case 'suggestion': return 'Lightbulb';
      default: return 'MessageSquare';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'urgent': return 'text-error';
      case 'complaint': return 'text-warning';
      case 'praise': return 'text-success';
      case 'suggestion': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={12}
        className={i < rating ? 'text-warning fill-current' : 'text-muted-foreground'}
      />
    ));
  };

  return (
    <div className={`bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-blue-100 shadow-lg ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            Recent Feedback Alerts
          </h3>
          <p className="text-sm text-gray-600">
            Latest patient feedback requiring attention
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="Filter"
          onClick={() => {
            if (typeof onFilterClick === 'function') {
              onFilterClick();
            } else {
              const el = document.getElementById('dashboard-filters');
              if (el?.scrollIntoView) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }
          }}
        >
          Filter
        </Button>
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {alerts?.map((alert) => (
          <div
            key={alert?.id}
            className="flex items-start space-x-4 p-4 border border-border rounded-lg hover:bg-muted/50 clinical-transition"
          >
            <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-muted ${getTypeColor(alert?.type)}`}>
              <Icon name={getTypeIcon(alert?.type)} size={16} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-foreground">
                    {alert?.patient}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    • {alert?.department}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    {getRatingStars(alert?.rating)}
                  </div>
                  <span className={`text-xs font-medium ${getPriorityColor(alert?.priority)}`}>
                    {alert?.priority?.toUpperCase()}
                  </span>
                </div>
              </div>

              <p className="text-sm text-foreground mb-2 line-clamp-2">
                {alert?.issue}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {alert?.timestamp}
                </span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Eye"
                    onClick={() => handleView(alert)}
                  >
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="MessageSquare"
                    onClick={() => handleRespond(alert)}
                  >
                    Respond
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <Button
          variant="outline"
          fullWidth
          iconName="ArrowRight"
          iconPosition="right"
          onClick={() => window.location.href = '/feedback-management'}
        >
          View All Feedback
        </Button>
      </div>
    </div>
  );
};

export default RecentFeedbackAlerts;