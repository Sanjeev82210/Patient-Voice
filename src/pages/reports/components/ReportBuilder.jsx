import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const ReportBuilder = ({ onGenerateReport, onPreviewReport }) => {
  const [reportConfig, setReportConfig] = useState({
    type: '',
    dateRange: '',
    customStartDate: '',
    customEndDate: '',
    departments: [],
    metrics: [],
    format: 'pdf',
    includeCharts: true,
    includeRawData: false,
    groupBy: 'department'
  });

  const reportTypes = [
    { value: 'satisfaction-summary', label: 'Patient Satisfaction Summary' },
    { value: 'department-performance', label: 'Department Performance Report' },
    { value: 'trend-analysis', label: 'Satisfaction Trend Analysis' },
    { value: 'compliance-report', label: 'Compliance & Quality Report' },
    { value: 'staff-performance', label: 'Staff Performance Insights' },
    { value: 'custom-analytics', label: 'Custom Analytics Report' }
  ];

  const dateRangeOptions = [
    { value: 'last-7-days', label: 'Last 7 Days' },
    { value: 'last-30-days', label: 'Last 30 Days' },
    { value: 'last-quarter', label: 'Last Quarter' },
    { value: 'last-6-months', label: 'Last 6 Months' },
    { value: 'last-year', label: 'Last Year' },
    { value: 'custom', label: 'Custom Date Range' }
  ];

  const departmentOptions = [
    { value: 'emergency', label: 'Emergency Department' },
    { value: 'cardiology', label: 'Cardiology' },
    { value: 'orthopedics', label: 'Orthopedics' },
    { value: 'pediatrics', label: 'Pediatrics' },
    { value: 'surgery', label: 'Surgery' },
    { value: 'radiology', label: 'Radiology' },
    { value: 'pharmacy', label: 'Pharmacy' },
    { value: 'laboratory', label: 'Laboratory' }
  ];

  const metricsOptions = [
    { value: 'overall-satisfaction', label: 'Overall Satisfaction Score' },
    { value: 'wait-times', label: 'Wait Time Ratings' },
    { value: 'staff-communication', label: 'Staff Communication' },
    { value: 'facility-cleanliness', label: 'Facility Cleanliness' },
    { value: 'pain-management', label: 'Pain Management' },
    { value: 'discharge-process', label: 'Discharge Process' },
    { value: 'recommendation-likelihood', label: 'Likelihood to Recommend' },
    { value: 'response-rate', label: 'Response Rate' }
  ];

  const formatOptions = [
    { value: 'pdf', label: 'PDF Document' },
    { value: 'excel', label: 'Excel Spreadsheet' },
    { value: 'csv', label: 'CSV Data File' },
    { value: 'powerpoint', label: 'PowerPoint Presentation' }
  ];

  const groupByOptions = [
    { value: 'department', label: 'By Department' },
    { value: 'date', label: 'By Date' },
    { value: 'patient-type', label: 'By Patient Type' },
    { value: 'staff-member', label: 'By Staff Member' },
    { value: 'feedback-category', label: 'By Feedback Category' }
  ];

  const handleConfigChange = (field, value) => {
    setReportConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMultiSelectChange = (field, selectedValues) => {
    setReportConfig(prev => ({
      ...prev,
      [field]: selectedValues
    }));
  };

  const handleGenerateReport = () => {
    if (onGenerateReport) {
      onGenerateReport(reportConfig);
    }
  };

  const handlePreviewReport = () => {
    if (onPreviewReport) {
      onPreviewReport(reportConfig);
    }
  };

  const isConfigValid = reportConfig?.type && reportConfig?.dateRange && 
                       reportConfig?.departments?.length > 0 && reportConfig?.metrics?.length > 0;

  return (
    <div className="card-clinical">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Report Builder</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Configure and generate comprehensive patient satisfaction reports
          </p>
        </div>
        <Icon name="FileText" size={24} className="text-primary" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Basic Configuration */}
        <div className="space-y-4">
          <Select
            label="Report Type"
            description="Choose the type of report to generate"
            options={reportTypes}
            value={reportConfig?.type}
            onChange={(value) => handleConfigChange('type', value)}
            required
            className="mb-4"
          />

          <Select
            label="Date Range"
            description="Select the time period for the report"
            options={dateRangeOptions}
            value={reportConfig?.dateRange}
            onChange={(value) => handleConfigChange('dateRange', value)}
            required
            className="mb-4"
          />

          {reportConfig?.dateRange === 'custom' && (
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Start Date"
                type="date"
                value={reportConfig?.customStartDate}
                onChange={(e) => handleConfigChange('customStartDate', e?.target?.value)}
                required
              />
              <Input
                label="End Date"
                type="date"
                value={reportConfig?.customEndDate}
                onChange={(e) => handleConfigChange('customEndDate', e?.target?.value)}
                required
              />
            </div>
          )}

          <Select
            label="Departments"
            description="Select departments to include in the report"
            options={departmentOptions}
            value={reportConfig?.departments}
            onChange={(values) => handleMultiSelectChange('departments', values)}
            multiple
            searchable
            required
            className="mb-4"
          />
        </div>

        {/* Right Column - Advanced Configuration */}
        <div className="space-y-4">
          <Select
            label="Metrics to Include"
            description="Choose which satisfaction metrics to analyze"
            options={metricsOptions}
            value={reportConfig?.metrics}
            onChange={(values) => handleMultiSelectChange('metrics', values)}
            multiple
            searchable
            required
            className="mb-4"
          />

          <Select
            label="Output Format"
            description="Select the format for the generated report"
            options={formatOptions}
            value={reportConfig?.format}
            onChange={(value) => handleConfigChange('format', value)}
            className="mb-4"
          />

          <Select
            label="Group Data By"
            description="Choose how to organize the report data"
            options={groupByOptions}
            value={reportConfig?.groupBy}
            onChange={(value) => handleConfigChange('groupBy', value)}
            className="mb-4"
          />

          <div className="space-y-3 pt-2">
            <Checkbox
              label="Include Charts and Visualizations"
              description="Add graphs and charts to the report"
              checked={reportConfig?.includeCharts}
              onChange={(e) => handleConfigChange('includeCharts', e?.target?.checked)}
            />

            <Checkbox
              label="Include Raw Data Tables"
              description="Add detailed data tables for analysis"
              checked={reportConfig?.includeRawData}
              onChange={(e) => handleConfigChange('includeRawData', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-border mt-6">
        <div className="text-sm text-muted-foreground">
          {isConfigValid ? (
            <span className="flex items-center space-x-2 text-success">
              <Icon name="CheckCircle" size={16} />
              <span>Configuration complete</span>
            </span>
          ) : (
            <span className="flex items-center space-x-2 text-warning">
              <Icon name="AlertCircle" size={16} />
              <span>Please complete all required fields</span>
            </span>
          )}
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            iconName="Eye"
            iconPosition="left"
            onClick={handlePreviewReport}
            disabled={!isConfigValid}
          >
            Preview Report
          </Button>
          <Button
            variant="default"
            iconName="Download"
            iconPosition="left"
            onClick={handleGenerateReport}
            disabled={!isConfigValid}
          >
            Generate Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportBuilder;