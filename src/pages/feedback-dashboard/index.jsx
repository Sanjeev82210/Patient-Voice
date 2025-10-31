import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import KPICard from './components/KPICard';
import SatisfactionChart from './components/SatisfactionChart';
import RecentFeedbackAlerts from './components/RecentFeedbackAlerts';
import DepartmentComparison from './components/DepartmentComparison';
import SentimentAnalysis from './components/SentimentAnalysis';
import DashboardFilters from './components/DashboardFilters';
import QuickActions from './components/QuickActions';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const FeedbackDashboard = () => {
  const [filters, setFilters] = useState({
    dateRange: 'last30days',
    department: 'all',
    feedbackType: 'all',
    priority: 'all'
  });
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isLiveMode, setIsLiveMode] = useState(true);

  // Simulate WebSocket connection for live updates
  useEffect(() => {
    if (isLiveMode) {
      const interval = setInterval(() => {
        setLastUpdated(new Date());
      }, 30000); // Update every 30 seconds

      return () => clearInterval(interval);
    }
  }, [isLiveMode]);

  const breadcrumbItems = [
    {
      label: 'Dashboard',
      path: '/feedback-dashboard',
      icon: 'LayoutDashboard'
    },
    {
      label: 'Feedback Overview',
      icon: 'BarChart3'
    }
  ];

  const kpiData = [
    {
      title: 'Overall Satisfaction',
      value: '4.6/5.0',
      change: '+0.2',
      changeType: 'positive',
      trend: 'up',
      icon: 'Star'
    },
    {
      title: 'Total Feedback',
      value: '1,247',
      change: '+12%',
      changeType: 'positive',
      trend: 'up',
      icon: 'MessageSquare'
    },
    {
      title: 'Response Rate',
      value: '89%',
      change: '+5%',
      changeType: 'positive',
      trend: 'up',
      icon: 'TrendingUp'
    },
    {
      title: 'Urgent Issues',
      value: '8',
      change: '-3',
      changeType: 'positive',
      trend: 'down',
      icon: 'AlertTriangle'
    }
  ];

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    // In a real app, this would trigger data refetch
    console.log('Filters updated:', newFilters);
  };

  const handleRefreshData = () => {
    setLastUpdated(new Date());
    // In a real app, this would trigger data refetch
    console.log('Data refreshed');
  };

  const toggleLiveMode = () => {
    setIsLiveMode(!isLiveMode);
  };

  return (
    <div className="min-h-screen bg-clinical-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <BreadcrumbNavigation items={breadcrumbItems} className="mb-4" />
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Feedback Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Real-time overview of patient feedback and satisfaction metrics
                </p>
              </div>

              <div className="flex items-center space-x-4">
                {/* Live Mode Toggle */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={toggleLiveMode}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm clinical-transition ${
                      isLiveMode 
                        ? 'bg-success/10 text-success border border-success/20' :'bg-muted text-muted-foreground border border-border'
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${isLiveMode ? 'bg-success pulse-ambient' : 'bg-muted-foreground'}`} />
                    <span>{isLiveMode ? 'Live' : 'Paused'}</span>
                  </button>
                </div>

                {/* Last Updated */}
                <div className="text-xs text-muted-foreground">
                  Last updated: {lastUpdated?.toLocaleTimeString()}
                </div>

                {/* Refresh Button */}
                <Button
                  variant="outline"
                  size="sm"
                  iconName="RefreshCw"
                  onClick={handleRefreshData}
                >
                  Refresh
                </Button>
              </div>
            </div>
          </div>

          {/* Dashboard Filters */}
          <DashboardFilters 
            onFiltersChange={handleFiltersChange}
            className="mb-8"
          />

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpiData?.map((kpi, index) => (
              <KPICard
                key={index}
                title={kpi?.title}
                value={kpi?.value}
                change={kpi?.change}
                changeType={kpi?.changeType}
                trend={kpi?.trend}
                icon={kpi?.icon}
              />
            ))}
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            {/* Left Column - Charts */}
            <div className="xl:col-span-2 space-y-8">
              <SatisfactionChart />
              <DepartmentComparison />
            </div>

            {/* Right Column - Alerts & Actions */}
            <div className="space-y-8">
              <RecentFeedbackAlerts />
              <QuickActions />
            </div>
          </div>

          {/* Bottom Section - Sentiment Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SentimentAnalysis />
            
            {/* Additional Insights Panel */}
            <div className="card-clinical">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Key Performance Insights
                </h3>
                <p className="text-sm text-muted-foreground">
                  AI-powered insights from patient feedback analysis
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 bg-success/10 rounded-lg">
                  <Icon name="TrendingUp" size={20} className="text-success mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">
                      Satisfaction Improvement
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Pediatrics department shows 15% improvement in patient satisfaction scores over the past month, primarily due to enhanced staff communication training.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-warning/10 rounded-lg">
                  <Icon name="AlertCircle" size={20} className="text-warning mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">
                      Attention Required
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Emergency Department wait times are the primary concern in 67% of negative feedback. Consider implementing triage optimization strategies.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-primary/10 rounded-lg">
                  <Icon name="Lightbulb" size={20} className="text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">
                      Recommendation
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Implement automated follow-up system for patients rating below 3 stars to improve response rates and patient retention.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-accent/10 rounded-lg">
                  <Icon name="Award" size={20} className="text-accent mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">
                      Top Performer
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Dr. Sarah Chen in Cardiology received the highest patient satisfaction ratings this month with an average score of 4.9/5.0.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <Button variant="outline" fullWidth iconName="BarChart3" iconPosition="left">
                  View Detailed Analytics
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FeedbackDashboard;