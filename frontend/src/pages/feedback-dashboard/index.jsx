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
  const [activeTab, setActiveTab] = useState('overview');

  // Tab configuration
  const tabs = [
    { id: 'alerts', label: 'Recent Alerts', icon: 'Bell' },
    { id: 'satisfaction', label: 'Satisfaction Trend', icon: 'TrendingUp' },
    { id: 'departments', label: 'Department Comparison', icon: 'Building2' },
    { id: 'sentiment', label: 'Sentiment Analysis', icon: 'Smile' },
    { id: 'insights', label: 'Key Insights', icon: 'Target' },
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' }
  ];

  // Simulate WebSocket connection for live updates
  useEffect(() => {
    if (isLiveMode) {
      const interval = setInterval(() => {
        setLastUpdated(new Date());
      }, 30000); // Update every 30 seconds

      return () => clearInterval(interval);
    }
  }, [isLiveMode]);

  // Create animated particles background
  useEffect(() => {
    const canvas = document.getElementById('dashboard-particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.color = `rgba(59, 130, 246, ${Math.random() * 0.1})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particles = [];
    const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 20000));

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const particle of particles) {
        particle.update();
        particle.draw();
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

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
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-400 relative overflow-hidden">
      {/* Animated Particles Canvas */}
      <canvas
        id="dashboard-particles-canvas"
        className="fixed inset-0 pointer-events-none -z-10"
      />

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute w-96 h-96 bg-blue-400/30 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-indigo-400/30 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse"></div>
        <div className="absolute w-64 h-64 bg-blue-300/30 rounded-full blur-3xl top-1/2 left-1/2 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <Header />

      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <BreadcrumbNavigation items={breadcrumbItems} className="mb-4" />

            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-blue-100 shadow-lg">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex items-center gap-4 animate-fade-in">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                    <Icon name="LayoutDashboard" size={32} className="text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      Feedback Dashboard
                    </h1>
                    <p className="text-gray-600 mt-1">
                      Real-time overview of patient feedback and satisfaction metrics
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Live Mode Toggle */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={toggleLiveMode}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${isLiveMode
                        ? 'bg-green-100 text-green-700 border border-green-300'
                        : 'bg-gray-100 text-gray-600 border border-gray-300'
                        }`}
                    >
                      <div className={`w-2 h-2 rounded-full ${isLiveMode ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                      <span>{isLiveMode ? 'Live' : 'Paused'}</span>
                    </button>
                  </div>

                  {/* Last Updated */}
                  <div className="text-sm text-gray-600">
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
          </div>

          {/* Dashboard Filters */}
          <div id="dashboard-filters">
            <DashboardFilters
              onFiltersChange={handleFiltersChange}
              className="mb-8"
            />
          </div>

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

          {/* Quick Actions Section - Always Visible */}
          <div className="mb-8">
            <QuickActions />
          </div>

          {/* Tabs Navigation */}
          <div className="bg-white/80 backdrop-blur-sm rounded-lg border border-blue-100 shadow-lg overflow-hidden mb-8">
            <div className="flex overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-all duration-300 whitespace-nowrap border-b-2 ${activeTab === tab.id
                    ? 'border-blue-600 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-600 hover:text-blue-600 hover:bg-blue-50/50'
                    }`}
                >
                  <Icon name={tab.icon} size={20} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <>
              {/* Main Dashboard Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
                {/* Left Column - Charts */}
                <div className="xl:col-span-2 space-y-8">
                  <SatisfactionChart />
                  <DepartmentComparison />
                </div>

                {/* Right Column - Alerts & Actions */}
                <div className="space-y-8">
                  <RecentFeedbackAlerts onFilterClick={() => {
                    const el = document.getElementById('dashboard-filters');
                    if (el?.scrollIntoView) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }} />
                  <QuickActions />
                </div>
              </div>

              {/* Bottom Section - Sentiment Analysis */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <SentimentAnalysis />

                {/* Additional Insights Panel */}
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-blue-100 shadow-lg">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Key Performance Insights
                    </h3>
                    <p className="text-sm text-gray-600">
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
                    <Button
                      variant="outline"
                      fullWidth
                      iconName="BarChart3"
                      iconPosition="left"
                      onClick={() => window.location.href = '/feedback-analytics'}
                    >
                      View Detailed Analytics
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'alerts' && (
            <div className="animate-fade-in">
              <RecentFeedbackAlerts />
            </div>
          )}

          {activeTab === 'satisfaction' && (
            <div className="animate-fade-in">
              <SatisfactionChart />
            </div>
          )}

          {activeTab === 'departments' && (
            <div className="animate-fade-in">
              <DepartmentComparison />
            </div>
          )}

          {activeTab === 'sentiment' && (
            <div className="animate-fade-in">
              <SentimentAnalysis />
            </div>
          )}

          {activeTab === 'insights' && (
            <div className="animate-fade-in">
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
          )}
        </div>
      </main>
    </div>
  );
};

export default FeedbackDashboard;