import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const KeyInsightsPanel = ({ className = '' }) => {
  const insights = [
    {
      id: 1,
      type: 'improvement',
      priority: 'high',
      title: 'Wait Times Showing Significant Improvement',
      description: `Emergency department wait times have improved by 23% over the last 3 months, with average satisfaction scores increasing from 3.2 to 3.8. This improvement correlates with the new triage system implementation.`,
      impact: 'High',
      department: 'Emergency',
      trend: 'positive',
      actionItems: [
        'Continue monitoring triage system effectiveness',
        'Expand similar processes to other high-volume departments'
      ],
      metrics: {
        change: '+23%',
        timeframe: '3 months',
        affected: '1,250 patients'
      }
    },
    {
      id: 2,
      type: 'concern',
      priority: 'urgent',
      title: 'Communication Issues in Radiology Department',
      description: `Radiology department showing declining communication scores (4.1 → 3.6) with increased complaints about unclear procedure explanations and delayed result notifications.`,
      impact: 'Medium',
      department: 'Radiology',
      trend: 'negative',
      actionItems: [
        'Implement communication training for radiology staff',
        'Review and improve result notification processes',
        'Create patient education materials for common procedures'
      ],
      metrics: {
        change: '-12%',
        timeframe: '2 months',
        affected: '920 patients'
      }
    },
    {
      id: 3,
      type: 'opportunity',
      priority: 'medium',
      title: 'Pediatrics Excellence Can Be Replicated',
      description: `Pediatrics maintains highest satisfaction scores (4.6/5) with exceptional staff behavior ratings. Their patient-centered approach and family communication model could benefit other departments.`,
      impact: 'High',
      department: 'Pediatrics',
      trend: 'stable',
      actionItems: [
        'Document pediatrics best practices',
        'Organize cross-department training sessions',
        'Implement family communication protocols hospital-wide'
      ],
      metrics: {
        change: '+5%',
        timeframe: '6 months',
        affected: '720 patients'
      }
    },
    {
      id: 4,
      type: 'alert',
      priority: 'high',
      title: 'Pharmacy Wait Time Complaints Increasing',
      description: `Pharmacy department experiencing 35% increase in wait time complaints, particularly during peak hours (11 AM - 2 PM). Patient satisfaction dropping to 4.0 from 4.3.`,
      impact: 'Medium',
      department: 'Pharmacy',
      trend: 'negative',
      actionItems: [
        'Analyze peak hour staffing levels',
        'Implement prescription pre-filling system',
        'Consider extended pharmacy hours'
      ],
      metrics: {
        change: '+35%',
        timeframe: '1 month',
        affected: '1,350 patients'
      }
    }
  ];

  const getInsightIcon = (type) => {
    switch (type) {
      case 'improvement':
        return { name: 'TrendingUp', color: 'text-emerald-600', bg: 'bg-emerald-50' };
      case 'concern':
        return { name: 'AlertTriangle', color: 'text-amber-600', bg: 'bg-amber-50' };
      case 'opportunity':
        return { name: 'Lightbulb', color: 'text-blue-600', bg: 'bg-blue-50' };
      case 'alert':
        return { name: 'AlertCircle', color: 'text-red-600', bg: 'bg-red-50' };
      default:
        return { name: 'Info', color: 'text-gray-600', bg: 'bg-gray-50' };
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'high':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'medium':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'low':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'positive':
        return { name: 'ArrowUp', color: 'text-emerald-600' };
      case 'negative':
        return { name: 'ArrowDown', color: 'text-red-600' };
      case 'stable':
        return { name: 'Minus', color: 'text-gray-600' };
      default:
        return { name: 'Minus', color: 'text-gray-600' };
    }
  };

  return (
    <div className={`card-clinical ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
            <Icon name="Brain" size={20} className="text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Key Insights & Recommendations</h3>
            <p className="text-sm text-muted-foreground">AI-powered analysis of feedback patterns</p>
          </div>
        </div>
        <Button variant="outline" size="sm" iconName="Download">
          Export Report
        </Button>
      </div>
      <div className="space-y-4">
        {insights?.map((insight) => {
          const iconConfig = getInsightIcon(insight?.type);
          const trendIcon = getTrendIcon(insight?.trend);
          
          return (
            <div key={insight?.id} className="border border-border rounded-lg p-4 hover:shadow-clinical clinical-transition">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 ${iconConfig?.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon name={iconConfig?.name} size={18} className={iconConfig?.color} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="text-sm font-semibold text-foreground">{insight?.title}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityBadge(insight?.priority)}`}>
                        {insight?.priority?.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>{insight?.department} Department</span>
                      <span>•</span>
                      <span>Impact: {insight?.impact}</span>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <Icon name={trendIcon?.name} size={12} className={trendIcon?.color} />
                        <span className={trendIcon?.color}>{insight?.metrics?.change}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Description */}
              <p className="text-sm text-foreground mb-4 leading-relaxed">
                {insight?.description}
              </p>
              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-muted/50 rounded-lg">
                <div className="text-center">
                  <div className="text-lg font-semibold text-foreground">{insight?.metrics?.change}</div>
                  <div className="text-xs text-muted-foreground">Change</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-foreground">{insight?.metrics?.timeframe}</div>
                  <div className="text-xs text-muted-foreground">Timeframe</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-foreground">{insight?.metrics?.affected}</div>
                  <div className="text-xs text-muted-foreground">Affected</div>
                </div>
              </div>
              {/* Action Items */}
              <div className="mb-4">
                <h5 className="text-xs font-medium text-foreground mb-2 flex items-center space-x-1">
                  <Icon name="CheckSquare" size={14} />
                  <span>Recommended Actions</span>
                </h5>
                <ul className="space-y-1">
                  {insight?.actionItems?.map((action, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start space-x-2">
                      <Icon name="ArrowRight" size={14} className="mt-0.5 flex-shrink-0" />
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" iconName="Eye">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" iconName="Plus">
                    Create Action Item
                  </Button>
                </div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Icon name="Clock" size={12} />
                  <span>Updated 2 hours ago</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600">2</div>
            <div className="text-xs text-muted-foreground">Improvements</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600">1</div>
            <div className="text-xs text-muted-foreground">Opportunities</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">1</div>
            <div className="text-xs text-muted-foreground">Urgent Issues</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">87%</div>
            <div className="text-xs text-muted-foreground">Action Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyInsightsPanel;