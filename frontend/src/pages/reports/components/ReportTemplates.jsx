import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReportTemplates = ({ onSelectTemplate, onCreateCustom }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const templates = [
    {
      id: 'monthly-satisfaction',
      name: 'Monthly Satisfaction Summary',
      description: 'Comprehensive monthly overview of patient satisfaction scores across all departments',
      icon: 'Calendar',
      category: 'Standard',
      frequency: 'Monthly',
      metrics: ['Overall Satisfaction', 'Wait Times', 'Staff Communication', 'Facility Rating'],
      lastGenerated: '2025-10-01',
      popularity: 95
    },
    {
      id: 'department-comparison',
      name: 'Department Performance Comparison',
      description: 'Side-by-side analysis of satisfaction metrics across different hospital departments',
      icon: 'BarChart3',
      category: 'Performance',
      frequency: 'Quarterly',
      metrics: ['Department Scores', 'Trend Analysis', 'Improvement Areas', 'Best Practices'],
      lastGenerated: '2025-09-15',
      popularity: 88
    },
    {
      id: 'trend-analysis',
      name: 'Satisfaction Trend Analysis',
      description: 'Long-term trend analysis showing satisfaction patterns over time with predictive insights',
      icon: 'TrendingUp',
      category: 'Analytics',
      frequency: 'Bi-annual',
      metrics: ['Historical Trends', 'Seasonal Patterns', 'Predictive Analysis', 'Benchmarking'],
      lastGenerated: '2025-08-30',
      popularity: 76
    },
    {
      id: 'compliance-quality',
      name: 'Compliance & Quality Report',
      description: 'Regulatory compliance report with quality metrics and improvement recommendations',
      icon: 'Shield',
      category: 'Compliance',
      frequency: 'Monthly',
      metrics: ['Compliance Scores', 'Quality Indicators', 'Risk Assessment', 'Action Items'],
      lastGenerated: '2025-10-15',
      popularity: 92
    },
    {
      id: 'staff-performance',
      name: 'Staff Performance Insights',
      description: 'Individual and team performance analysis based on patient feedback and ratings',
      icon: 'Users',
      category: 'HR Analytics',
      frequency: 'Quarterly',
      metrics: ['Individual Ratings', 'Team Performance', 'Training Needs', 'Recognition Areas'],
      lastGenerated: '2025-09-30',
      popularity: 71
    },
    {
      id: 'patient-experience',
      name: 'Patient Experience Journey',
      description: 'End-to-end patient experience analysis from admission to discharge',
      icon: 'Route',
      category: 'Experience',
      frequency: 'Monthly',
      metrics: ['Journey Mapping', 'Touchpoint Analysis', 'Pain Points', 'Satisfaction Flow'],
      lastGenerated: '2025-10-10',
      popularity: 83
    }
  ];

  const categories = ['All', 'Standard', 'Performance', 'Analytics', 'Compliance', 'HR Analytics', 'Experience'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredTemplates = activeCategory === 'All'
    ? templates
    : templates?.filter(template => template?.category === activeCategory);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template?.id);
    if (onSelectTemplate) {
      onSelectTemplate(template);
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Standard': 'FileText',
      'Performance': 'BarChart3',
      'Analytics': 'TrendingUp',
      'Compliance': 'Shield',
      'HR Analytics': 'Users',
      'Experience': 'Route'
    };
    return icons?.[category] || 'FileText';
  };

  const getPopularityColor = (popularity) => {
    if (popularity >= 90) return 'text-success';
    if (popularity >= 75) return 'text-warning';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-amber-100 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Report Templates</h2>
          <p className="text-sm text-gray-600 mt-1">
            Choose from pre-configured templates or create a custom report
          </p>
        </div>
        <Button
          variant="outline"
          iconName="Plus"
          iconPosition="left"
          onClick={onCreateCustom}
        >
          Create Custom
        </Button>
      </div>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-border">
        {categories?.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-3 py-1.5 text-sm rounded-md clinical-transition ${activeCategory === category
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
          >
            {category}
          </button>
        ))}
      </div>
      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredTemplates?.map((template) => (
          <div
            key={template?.id}
            className={`bg-white border border-gray-200 rounded-lg p-4 hover:border-amber-300 hover:shadow-md cursor-pointer clinical-transition relative ${selectedTemplate === template?.id ? 'ring-2 ring-amber-500 border-amber-500' : ''
              }`}
            onClick={() => handleTemplateSelect(template)}
          >
            {/* Template Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                  <Icon name={template?.icon} size={20} className="text-amber-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground text-sm leading-tight">
                    {template?.name}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs px-2 py-0.5 bg-muted rounded text-muted-foreground">
                      {template?.category}
                    </span>
                    <span className={`text-xs ${getPopularityColor(template?.popularity)}`}>
                      {template?.popularity}% usage
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Template Description */}
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {template?.description}
            </p>

            {/* Template Metrics */}
            <div className="mb-4">
              <div className="text-xs font-medium text-foreground mb-2">Included Metrics:</div>
              <div className="flex flex-wrap gap-1">
                {template?.metrics?.slice(0, 3)?.map((metric, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 bg-accent/10 text-accent rounded"
                  >
                    {metric}
                  </span>
                ))}
                {template?.metrics?.length > 3 && (
                  <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded">
                    +{template?.metrics?.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* Template Footer */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={12} />
                <span>{template?.frequency}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Calendar" size={12} />
                <span>Last: {template?.lastGenerated}</span>
              </div>
            </div>

            {/* Selection Indicator */}
            {selectedTemplate === template?.id && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                <Icon name="Check" size={14} color="white" />
              </div>
            )}
          </div>
        ))}
      </div>
      {filteredTemplates?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FileX" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No Templates Found</h3>
          <p className="text-muted-foreground mb-4">
            No templates match the selected category. Try a different filter or create a custom report.
          </p>
          <Button
            variant="outline"
            iconName="Plus"
            iconPosition="left"
            onClick={onCreateCustom}
          >
            Create Custom Report
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReportTemplates;