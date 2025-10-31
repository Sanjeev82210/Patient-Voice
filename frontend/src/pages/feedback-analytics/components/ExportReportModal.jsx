import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/CheckBox';

const ExportReportModal = ({ isOpen, onClose, className = '' }) => {
  const [exportConfig, setExportConfig] = useState({
    format: 'pdf',
    dateRange: 'last-30-days',
    includeCharts: true,
    includeRawData: false,
    includeSentiment: true,
    includeStaffMetrics: true,
    includeInsights: true,
    departments: [],
    categories: []
  });

  const [isExporting, setIsExporting] = useState(false);

  const formatOptions = [
    { value: 'pdf', label: 'PDF Report' },
    { value: 'excel', label: 'Excel Spreadsheet' },
    { value: 'csv', label: 'CSV Data' },
    { value: 'powerpoint', label: 'PowerPoint Presentation' }
  ];

  const dateRangeOptions = [
    { value: 'last-7-days', label: 'Last 7 Days' },
    { value: 'last-30-days', label: 'Last 30 Days' },
    { value: 'last-90-days', label: 'Last 90 Days' },
    { value: 'last-6-months', label: 'Last 6 Months' },
    { value: 'last-year', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const departmentOptions = [
    { value: 'emergency', label: 'Emergency Department' },
    { value: 'cardiology', label: 'Cardiology' },
    { value: 'orthopedics', label: 'Orthopedics' },
    { value: 'pediatrics', label: 'Pediatrics' },
    { value: 'surgery', label: 'Surgery' },
    { value: 'radiology', label: 'Radiology' },
    { value: 'laboratory', label: 'Laboratory' },
    { value: 'pharmacy', label: 'Pharmacy' }
  ];

  const categoryOptions = [
    { value: 'medical-care', label: 'Medical Care Quality' },
    { value: 'staff-behavior', label: 'Staff Behavior' },
    { value: 'facility-cleanliness', label: 'Facility Cleanliness' },
    { value: 'wait-times', label: 'Wait Times' },
    { value: 'communication', label: 'Communication' },
    { value: 'billing', label: 'Billing & Insurance' }
  ];

  const handleConfigChange = (key, value) => {
    setExportConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleExport = async () => {
    setIsExporting(true);

    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create mock download
    const fileName = `feedback-analytics-report-${new Date()?.toISOString()?.split('T')?.[0]}.${exportConfig?.format}`;
    console.log(`Exporting report: ${fileName}`, exportConfig);

    setIsExporting(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-70 p-4">
      <div className={`bg-card border border-border rounded-lg shadow-clinical-modal w-full max-w-2xl max-h-[90vh] overflow-y-auto ${className}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Icon name="Download" size={20} className="text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Export Analytics Report</h3>
              <p className="text-sm text-muted-foreground">Configure and download your feedback analytics report</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            iconName="X"
            onClick={onClose}
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Export Format & Date Range */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Select
              label="Export Format"
              options={formatOptions}
              value={exportConfig?.format}
              onChange={(value) => handleConfigChange('format', value)}
            />
            <Select
              label="Date Range"
              options={dateRangeOptions}
              value={exportConfig?.dateRange}
              onChange={(value) => handleConfigChange('dateRange', value)}
            />
          </div>

          {/* Content Options */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Report Content</h4>
            <div className="space-y-3">
              <Checkbox
                label="Include Charts and Visualizations"
                description="Add all charts, graphs, and visual analytics"
                checked={exportConfig?.includeCharts}
                onChange={(e) => handleConfigChange('includeCharts', e?.target?.checked)}
              />
              <Checkbox
                label="Include Raw Data Tables"
                description="Export detailed data tables and statistics"
                checked={exportConfig?.includeRawData}
                onChange={(e) => handleConfigChange('includeRawData', e?.target?.checked)}
              />
              <Checkbox
                label="Include Sentiment Analysis"
                description="Add sentiment analysis results and insights"
                checked={exportConfig?.includeSentiment}
                onChange={(e) => handleConfigChange('includeSentiment', e?.target?.checked)}
              />
              <Checkbox
                label="Include Staff Performance Metrics"
                description="Add individual staff performance data"
                checked={exportConfig?.includeStaffMetrics}
                onChange={(e) => handleConfigChange('includeStaffMetrics', e?.target?.checked)}
              />
              <Checkbox
                label="Include Key Insights & Recommendations"
                description="Add AI-generated insights and action recommendations"
                checked={exportConfig?.includeInsights}
                onChange={(e) => handleConfigChange('includeInsights', e?.target?.checked)}
              />
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Select
              label="Departments (Optional)"
              description="Leave empty to include all departments"
              options={departmentOptions}
              value={exportConfig?.departments}
              onChange={(value) => handleConfigChange('departments', value)}
              multiple
              searchable
              placeholder="Select departments..."
            />
            <Select
              label="Categories (Optional)"
              description="Leave empty to include all categories"
              options={categoryOptions}
              value={exportConfig?.categories}
              onChange={(value) => handleConfigChange('categories', value)}
              multiple
              searchable
              placeholder="Select categories..."
            />
          </div>

          {/* Report Preview */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-foreground mb-3 flex items-center space-x-2">
              <Icon name="Eye" size={16} />
              <span>Report Preview</span>
            </h4>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Format:</div>
                <div className="font-medium text-foreground">{formatOptions?.find(f => f?.value === exportConfig?.format)?.label}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Date Range:</div>
                <div className="font-medium text-foreground">{dateRangeOptions?.find(d => d?.value === exportConfig?.dateRange)?.label}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Departments:</div>
                <div className="font-medium text-foreground">
                  {exportConfig?.departments?.length === 0 ? 'All' : exportConfig?.departments?.length}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Estimated Size:</div>
                <div className="font-medium text-foreground">
                  {exportConfig?.includeCharts && exportConfig?.includeRawData ? '15-20 MB' :
                    exportConfig?.includeCharts ? '8-12 MB' : '2-5 MB'}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Templates */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Quick Templates</h4>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setExportConfig({
                  ...exportConfig,
                  format: 'pdf',
                  includeCharts: true,
                  includeRawData: false,
                  includeSentiment: true,
                  includeStaffMetrics: false,
                  includeInsights: true
                })}
              >
                Executive Summary
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setExportConfig({
                  ...exportConfig,
                  format: 'excel',
                  includeCharts: false,
                  includeRawData: true,
                  includeSentiment: true,
                  includeStaffMetrics: true,
                  includeInsights: false
                })}
              >
                Detailed Analysis
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setExportConfig({
                  ...exportConfig,
                  format: 'powerpoint',
                  includeCharts: true,
                  includeRawData: false,
                  includeSentiment: true,
                  includeStaffMetrics: true,
                  includeInsights: true
                })}
              >
                Presentation
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="text-sm text-muted-foreground">
            Report will be generated and downloaded automatically
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isExporting}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleExport}
              loading={isExporting}
              iconName="Download"
            >
              {isExporting ? 'Generating...' : 'Export Report'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportReportModal;