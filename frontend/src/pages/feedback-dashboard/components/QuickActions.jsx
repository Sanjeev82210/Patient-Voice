import React from 'react';

import Icon from '../../../components/AppIcon';

const QuickActions = ({ className = '' }) => {
  const handleExportData = () => {
    // Create sample export data
    const exportData = {
      exportDate: new Date().toISOString(),
      totalFeedback: 1247,
      satisfactionScore: 4.6,
      responseRate: 89,
      urgentIssues: 8
    };

    // Convert to JSON and download
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `feedback-export-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

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
      id: 'qr-code',
      label: 'QR Code',
      description: 'Generate QR code for feedback form',
      icon: 'QrCode',
      variant: 'secondary',
      onClick: () => window.location.href = '/qr-code'
    },
    {
      id: 'urgent-alerts',
      label: 'Urgent Alerts',
      description: 'View high-priority feedback',
      icon: 'AlertTriangle',
      variant: 'destructive',
      badge: 3,
      onClick: () => window.location.href = '/feedback-management?priority=urgent'
    },
    {
      id: 'export-data',
      label: 'Export Data',
      description: 'Download feedback analytics',
      icon: 'Download',
      variant: 'outline',
      onClick: handleExportData
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
    <div className={`bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-blue-100 shadow-lg ${className}`}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          Quick Actions
        </h3>
        <p className="text-sm text-gray-600">
          Frequently used actions and shortcuts
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quickActions?.map((action) => {
          const colorClasses = {
            default: 'bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200',
            secondary: 'bg-teal-100 text-teal-700 border-teal-200 hover:bg-teal-200',
            destructive: 'bg-red-100 text-red-700 border-red-200 hover:bg-red-200',
            outline: 'bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200',
            warning: 'bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200',
          };

          return (
            <button
              key={action?.id}
              onClick={() => handleActionClick(action)}
              className="flex items-start space-x-4 p-4 border-2 rounded-xl hover:shadow-md transition-all duration-200 text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 bg-white"
            >
              <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${colorClasses[action?.variant] || colorClasses.default}`}>
                <Icon name={action?.icon} size={20} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-semibold text-gray-800">
                    {action?.label}
                  </h4>
                  {action?.badge && (
                    <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full animate-pulse">
                      {action?.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-600">
                  {action?.description}
                </p>
              </div>

              <Icon name="ChevronRight" size={16} className="text-gray-400 mt-2" />
            </button>
          );
        })}
      </div>
      {/* Additional Quick Stats */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-lg font-bold text-gray-800">24</p>
            <p className="text-xs text-gray-600">Pending Reviews</p>
          </div>
          <div>
            <p className="text-lg font-bold text-gray-800">156</p>
            <p className="text-xs text-gray-600">This Week</p>
          </div>
          <div>
            <p className="text-lg font-bold text-gray-800">4.6</p>
            <p className="text-xs text-gray-600">Avg Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;