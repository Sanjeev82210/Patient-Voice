import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import QuickActionToolbar from '../../components/ui/QuickActionToolbar';
import AnalyticsFilters from './components/AnalyticsFilters';
import SatisfactionTrendsChart from './components/SatisfactionTrendsChart';
import DepartmentComparisonChart from './components/DepartmentComparisonChart';
import SentimentAnalysisChart from './components/SentimentAnalysisChart';
import KeyInsightsPanel from './components/KeyInsightsPanel';
import StaffPerformanceMetrics from './components/StaffPerformanceMetrics';
import ExportReportModal from './components/ExportReportModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const FeedbackAnalytics = () => {
  const [filters, setFilters] = useState({});
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    document.title = 'Feedback Analytics - PatientVoice';
  }, []);

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/feedback-dashboard', icon: 'LayoutDashboard' },
    { label: 'Analytics', icon: 'BarChart3' }
  ];

  const quickActions = [
    {
      id: 'export-report',
      label: 'Export Report',
      icon: 'Download',
      variant: 'default',
      onClick: () => setIsExportModalOpen(true)
    },
    {
      id: 'schedule-report',
      label: 'Schedule Report',
      icon: 'Calendar',
      variant: 'outline',
      onClick: () => window.location.href = '/reports?action=schedule'
    },
    {
      id: 'create-alert',
      label: 'Create Alert',
      icon: 'Bell',
      variant: 'outline',
      onClick: () => alert('Configure Alerts: Set up automated alerts for specific feedback thresholds or patterns.')
    },
    {
      id: 'refresh-data',
      label: 'Refresh Data',
      icon: 'RefreshCw',
      variant: 'secondary',
      onClick: () => setRefreshKey(prev => prev + 1)
    }
  ];

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    // In a real app, this would trigger data refetch
    console.log('Filters updated:', newFilters);
  };

  const summaryStats = [
    {
      label: 'Total Feedback',
      value: '4,287',
      change: '+12%',
      trend: 'up',
      icon: 'MessageSquare',
      color: 'text-blue-600'
    },
    {
      label: 'Avg Satisfaction',
      value: '4.5/5',
      change: '+0.3',
      trend: 'up',
      icon: 'Star',
      color: 'text-amber-600'
    },
    {
      label: 'Response Rate',
      value: '87%',
      change: '+5%',
      trend: 'up',
      icon: 'MessageCircle',
      color: 'text-emerald-600'
    },
    {
      label: 'Resolution Time',
      value: '2.1 days',
      change: '-0.4',
      trend: 'down',
      icon: 'Clock',
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-600 via-emerald-500 to-green-400 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute w-96 h-96 bg-teal-400/30 rounded-full blur-3xl top-0 right-0 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-emerald-400/30 rounded-full blur-3xl bottom-0 left-0 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <Header />

      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
          {/* Page Header */}
          <div className="animate-fade-in">
            <BreadcrumbNavigation items={breadcrumbItems} className="mb-4" />

            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-teal-100 shadow-lg">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl shadow-lg">
                    <Icon name="BarChart3" size={32} className="text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                      Feedback Analytics
                    </h1>
                    <p className="text-gray-600 mt-1">
                      Advanced insights and reporting for patient satisfaction data
                    </p>
                  </div>
                </div>
                <QuickActionToolbar
                  actions={quickActions}
                  variant="horizontal"
                  showLabels={true}
                />
              </div>
            </div>
          </div>

          {/* Summary Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {summaryStats?.map((stat, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-blue-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat?.label}</p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">{stat?.value}</p>
                    <div className="flex items-center space-x-1 mt-2">
                      <Icon
                        name={stat?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'}
                        size={14}
                        className={stat?.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}
                      />
                      <span className={`text-sm font-medium ${stat?.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                        {stat?.change}
                      </span>
                      <span className="text-sm text-gray-500">vs last period</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center shadow-sm`}>
                    <Icon name={stat?.icon} size={24} className={stat?.color} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Analytics Filters */}
          <AnalyticsFilters onFiltersChange={handleFiltersChange} />

          {/* Main Analytics Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Satisfaction Trends */}
            <div className="xl:col-span-2">
              <SatisfactionTrendsChart key={`trends-${refreshKey}`} />
            </div>

            {/* Department Comparison */}
            <DepartmentComparisonChart key={`departments-${refreshKey}`} />

            {/* Sentiment Analysis */}
            <SentimentAnalysisChart key={`sentiment-${refreshKey}`} />
          </div>

          {/* Key Insights */}
          <KeyInsightsPanel key={`insights-${refreshKey}`} />

          {/* Staff Performance */}
          <StaffPerformanceMetrics key={`staff-${refreshKey}`} />

          {/* Additional Analytics Actions */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between p-6 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg border border-cyan-200">
            <div className="flex items-center space-x-3 mb-4 lg:mb-0">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <Icon name="Lightbulb" size={24} className="text-amber-600" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">Need More Insights?</h3>
                <p className="text-sm text-muted-foreground">Explore advanced analytics features and custom reporting options</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                iconName="Settings"
                onClick={() => alert('Configure Alerts:\n\nSet up automated alerts for:\n• Low satisfaction scores\n• Urgent feedback\n• Specific keywords\n• Department thresholds\n• Response time delays')}
              >
                Configure Alerts
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Calendar"
                onClick={() => window.location.href = '/reports?action=schedule'}
              >
                Schedule Reports
              </Button>
              <Button
                variant="default"
                size="sm"
                iconName="Zap"
                onClick={() => alert('Advanced Analytics Features:\n\n• Predictive analytics\n• Custom dashboards\n• AI-powered insights\n• Trend forecasting\n• Comparative analysis\n\nComing soon!')}
              >
                Advanced Analytics
              </Button>
            </div>
          </div>
        </div>
      </main>
      {/* Export Modal */}
      <ExportReportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
};

export default FeedbackAnalytics;