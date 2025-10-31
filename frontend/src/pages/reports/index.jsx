import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import QuickActionToolbar from '../../components/ui/QuickActionToolbar';
import ReportBuilder from './components/ReportBuilder';
import ReportTemplates from './components/ReportTemplates';
import ReportPreview from './components/ReportPreview';
import ReportScheduler from './components/ReportScheduler';
import ReportArchive from './components/ReportArchive';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const Reports = () => {
  const [activeTab, setActiveTab] = useState('builder');
  const [showPreview, setShowPreview] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);
  const [previewConfig, setPreviewConfig] = useState(null);

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/feedback-dashboard', icon: 'LayoutDashboard' },
    { label: 'Reports', icon: 'FileText' }
  ];

  const tabs = [
    { id: 'builder', label: 'Report Builder', icon: 'Settings', count: null },
    { id: 'templates', label: 'Templates', icon: 'FileText', count: 6 },
    { id: 'archive', label: 'Archive', icon: 'Archive', count: 12 },
    { id: 'scheduled', label: 'Scheduled', icon: 'Calendar', count: 3 }
  ];

  const quickActions = [
    {
      id: 'new-report',
      label: 'Quick Report',
      icon: 'Plus',
      variant: 'default',
      onClick: () => setActiveTab('builder')
    },
    {
      id: 'schedule-report',
      label: 'Schedule Report',
      icon: 'Calendar',
      variant: 'outline',
      onClick: () => setShowScheduler(true)
    },
    {
      id: 'export-archive',
      label: 'Export Archive',
      icon: 'Download',
      variant: 'secondary',
      onClick: () => console.log('Export archive')
    }
  ];

  // Mock scheduled reports data
  const scheduledReports = [
    {
      id: 'SCH-001',
      name: 'Monthly Satisfaction Summary',
      type: 'satisfaction-summary',
      frequency: 'monthly',
      nextRun: '2025-11-01T09:00:00',
      recipients: ['sarah.johnson@hospital.com', 'admin@hospital.com'],
      isActive: true,
      lastRun: '2025-10-01T09:00:00',
      status: 'active'
    },
    {
      id: 'SCH-002',
      name: 'Weekly Department Performance',
      type: 'department-performance',
      frequency: 'weekly',
      nextRun: '2025-11-04T08:30:00',
      recipients: ['lisa.rodriguez@hospital.com', 'michael.chen@hospital.com'],
      isActive: true,
      lastRun: '2025-10-28T08:30:00',
      status: 'active'
    },
    {
      id: 'SCH-003',
      name: 'Quarterly Compliance Report',
      type: 'compliance-report',
      frequency: 'quarterly',
      nextRun: '2026-01-01T10:00:00',
      recipients: ['admin@hospital.com'],
      isActive: false,
      lastRun: '2025-10-01T10:00:00',
      status: 'paused'
    }
  ];

  const handleGenerateReport = (config) => {
    console.log('Generating report with config:', config);
    // Simulate report generation
    setTimeout(() => {
      alert('Report generated successfully! Check your downloads folder.');
    }, 1000);
  };

  const handlePreviewReport = (config) => {
    setPreviewConfig(config);
    setShowPreview(true);
  };

  const handleSelectTemplate = (template) => {
    console.log('Selected template:', template);
    setActiveTab('builder');
  };

  const handleScheduleReport = (scheduleConfig) => {
    console.log('Scheduling report:', scheduleConfig);
    setShowScheduler(false);
    alert('Report scheduled successfully!');
  };

  const handleDownloadReport = (report) => {
    console.log('Downloading report:', report?.id);
    alert(`Downloading ${report?.name}...`);
  };

  const handleShareReport = (report) => {
    console.log('Sharing report:', report?.id);
    alert(`Sharing ${report?.name}...`);
  };

  const formatNextRun = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatLastRun = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-400 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute w-96 h-96 bg-blue-400/30 rounded-full blur-3xl top-1/4 left-0 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-cyan-400/30 rounded-full blur-3xl bottom-1/4 right-0 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <Header />

      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 animate-fade-in">
            <div className="mb-4 lg:mb-0">
              <BreadcrumbNavigation items={breadcrumbItems} className="mb-2" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Reports
              </h1>
              <p className="text-gray-600 mt-1">
                Generate, schedule, and manage comprehensive patient satisfaction reports
              </p>
            </div>

            <QuickActionToolbar
              actions={quickActions}
              variant="horizontal"
              showLabels={true}
              className="flex-shrink-0"
            />
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center space-x-1 mb-8 border-b border-border">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium rounded-t-md clinical-transition ${activeTab === tab?.id
                  ? 'bg-card text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
                {tab?.count && (
                  <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                    {tab?.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            {activeTab === 'builder' && (
              <ReportBuilder
                onGenerateReport={handleGenerateReport}
                onPreviewReport={handlePreviewReport}
              />
            )}

            {activeTab === 'templates' && (
              <ReportTemplates
                onSelectTemplate={handleSelectTemplate}
                onCreateCustom={() => setActiveTab('builder')}
              />
            )}

            {activeTab === 'archive' && (
              <ReportArchive
                onDownloadReport={handleDownloadReport}
                onShareReport={handleShareReport}
              />
            )}

            {activeTab === 'scheduled' && (
              <div className="card-clinical">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">Scheduled Reports</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Manage automated report generation and delivery schedules
                    </p>
                  </div>
                  <Button
                    variant="default"
                    iconName="Plus"
                    iconPosition="left"
                    onClick={() => setShowScheduler(true)}
                  >
                    New Schedule
                  </Button>
                </div>

                <div className="space-y-4">
                  {scheduledReports?.map((schedule) => (
                    <div
                      key={schedule?.id}
                      className="border border-border rounded-lg p-4 clinical-hover clinical-transition"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Icon name="Calendar" size={20} className="text-primary" />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-medium text-foreground">{schedule?.name}</h3>
                              <span className={`inline-flex items-center space-x-1 text-xs px-2 py-0.5 rounded ${schedule?.isActive
                                ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
                                }`}>
                                <Icon name={schedule?.isActive ? 'Play' : 'Pause'} size={10} />
                                <span>{schedule?.status}</span>
                              </span>
                            </div>

                            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                              <span className="flex items-center space-x-1">
                                <Icon name="Clock" size={12} />
                                <span className="capitalize">{schedule?.frequency}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Icon name="Calendar" size={12} />
                                <span>Next: {formatNextRun(schedule?.nextRun)}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Icon name="History" size={12} />
                                <span>Last: {formatLastRun(schedule?.lastRun)}</span>
                              </span>
                            </div>

                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-muted-foreground">
                                {schedule?.recipients?.length} recipient{schedule?.recipients?.length !== 1 ? 's' : ''}
                              </span>
                              <span className="text-xs text-muted-foreground">•</span>
                              <span className="text-xs text-muted-foreground">
                                ID: {schedule?.id}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            iconName={schedule?.isActive ? 'Pause' : 'Play'}
                            title={schedule?.isActive ? 'Pause Schedule' : 'Resume Schedule'}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            iconName="Edit"
                            title="Edit Schedule"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            iconName="Trash2"
                            title="Delete Schedule"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {scheduledReports?.length === 0 && (
                  <div className="text-center py-12">
                    <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No Scheduled Reports</h3>
                    <p className="text-muted-foreground mb-4">
                      Set up automated report generation to save time and ensure consistent delivery.
                    </p>
                    <Button
                      variant="outline"
                      iconName="Plus"
                      iconPosition="left"
                      onClick={() => setShowScheduler(true)}
                    >
                      Schedule Your First Report
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      {/* Modals */}
      {showPreview && previewConfig && (
        <ReportPreview
          reportConfig={previewConfig}
          onClose={() => setShowPreview(false)}
          onGenerate={() => {
            handleGenerateReport(previewConfig);
            setShowPreview(false);
          }}
        />
      )}
      {showScheduler && (
        <ReportScheduler
          onScheduleReport={handleScheduleReport}
          onClose={() => setShowScheduler(false)}
        />
      )}
    </div>
  );
};

export default Reports;