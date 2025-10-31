import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const ReportScheduler = ({ onScheduleReport, onClose }) => {
  const [scheduleConfig, setScheduleConfig] = useState({
    reportType: '',
    frequency: '',
    dayOfWeek: '',
    dayOfMonth: '',
    time: '09:00',
    recipients: [],
    customRecipient: '',
    format: 'pdf',
    includeCharts: true,
    autoArchive: true,
    isActive: true
  });

  const [recipientInput, setRecipientInput] = useState('');

  const frequencyOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' }
  ];

  const dayOfWeekOptions = [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' },
    { value: 'sunday', label: 'Sunday' }
  ];

  const dayOfMonthOptions = Array.from({ length: 28 }, (_, i) => ({
    value: (i + 1)?.toString(),
    label: `${i + 1}${getOrdinalSuffix(i + 1)}`
  }));

  const reportTypeOptions = [
    { value: 'satisfaction-summary', label: 'Patient Satisfaction Summary' },
    { value: 'department-performance', label: 'Department Performance Report' },
    { value: 'trend-analysis', label: 'Satisfaction Trend Analysis' },
    { value: 'compliance-report', label: 'Compliance & Quality Report' }
  ];

  const formatOptions = [
    { value: 'pdf', label: 'PDF Document' },
    { value: 'excel', label: 'Excel Spreadsheet' },
    { value: 'csv', label: 'CSV Data File' }
  ];

  const predefinedRecipients = [
    { email: 'sarah.johnson@hospital.com', name: 'Dr. Sarah Johnson', role: 'Quality Manager' },
    { email: 'michael.chen@hospital.com', name: 'Dr. Michael Chen', role: 'Chief Medical Officer' },
    { email: 'lisa.rodriguez@hospital.com', name: 'Lisa Rodriguez', role: 'Patient Experience Director' },
    { email: 'admin@hospital.com', name: 'Hospital Administration', role: 'Administration' }
  ];

  function getOrdinalSuffix(num) {
    const j = num % 10;
    const k = num % 100;
    if (j === 1 && k !== 11) return 'st';
    if (j === 2 && k !== 12) return 'nd';
    if (j === 3 && k !== 13) return 'rd';
    return 'th';
  }

  const handleConfigChange = (field, value) => {
    setScheduleConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddRecipient = () => {
    if (recipientInput?.trim() && !scheduleConfig?.recipients?.includes(recipientInput?.trim())) {
      setScheduleConfig(prev => ({
        ...prev,
        recipients: [...prev?.recipients, recipientInput?.trim()]
      }));
      setRecipientInput('');
    }
  };

  const handleRemoveRecipient = (email) => {
    setScheduleConfig(prev => ({
      ...prev,
      recipients: prev?.recipients?.filter(r => r !== email)
    }));
  };

  const handleAddPredefinedRecipient = (email) => {
    if (!scheduleConfig?.recipients?.includes(email)) {
      setScheduleConfig(prev => ({
        ...prev,
        recipients: [...prev?.recipients, email]
      }));
    }
  };

  const handleScheduleReport = () => {
    if (onScheduleReport) {
      onScheduleReport(scheduleConfig);
    }
  };

  const isConfigValid = scheduleConfig?.reportType && scheduleConfig?.frequency && 
                       scheduleConfig?.recipients?.length > 0;

  const getNextRunDate = () => {
    const now = new Date();
    const [hours, minutes] = scheduleConfig?.time?.split(':')?.map(Number);
    
    let nextRun = new Date();
    nextRun?.setHours(hours, minutes, 0, 0);
    
    if (scheduleConfig?.frequency === 'daily') {
      if (nextRun <= now) {
        nextRun?.setDate(nextRun?.getDate() + 1);
      }
    } else if (scheduleConfig?.frequency === 'weekly' && scheduleConfig?.dayOfWeek) {
      const targetDay = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']?.indexOf(scheduleConfig?.dayOfWeek);
      const currentDay = nextRun?.getDay();
      const daysUntilTarget = (targetDay - currentDay + 7) % 7;
      nextRun?.setDate(nextRun?.getDate() + (daysUntilTarget || 7));
    } else if (scheduleConfig?.frequency === 'monthly' && scheduleConfig?.dayOfMonth) {
      nextRun?.setDate(parseInt(scheduleConfig?.dayOfMonth));
      if (nextRun <= now) {
        nextRun?.setMonth(nextRun?.getMonth() + 1);
      }
    }
    
    return nextRun?.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg shadow-clinical-modal w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Schedule Automated Report</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Set up automatic report generation and delivery
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            iconName="X"
            onClick={onClose}
          />
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="space-y-6">
            {/* Report Configuration */}
            <div className="space-y-4">
              <h3 className="font-medium text-foreground">Report Configuration</h3>
              
              <Select
                label="Report Type"
                description="Choose the type of report to generate automatically"
                options={reportTypeOptions}
                value={scheduleConfig?.reportType}
                onChange={(value) => handleConfigChange('reportType', value)}
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Frequency"
                  description="How often to generate the report"
                  options={frequencyOptions}
                  value={scheduleConfig?.frequency}
                  onChange={(value) => handleConfigChange('frequency', value)}
                  required
                />

                <Input
                  label="Time"
                  type="time"
                  description="What time to generate the report"
                  value={scheduleConfig?.time}
                  onChange={(e) => handleConfigChange('time', e?.target?.value)}
                  required
                />
              </div>

              {scheduleConfig?.frequency === 'weekly' && (
                <Select
                  label="Day of Week"
                  description="Which day of the week to generate the report"
                  options={dayOfWeekOptions}
                  value={scheduleConfig?.dayOfWeek}
                  onChange={(value) => handleConfigChange('dayOfWeek', value)}
                  required
                />
              )}

              {scheduleConfig?.frequency === 'monthly' && (
                <Select
                  label="Day of Month"
                  description="Which day of the month to generate the report"
                  options={dayOfMonthOptions}
                  value={scheduleConfig?.dayOfMonth}
                  onChange={(value) => handleConfigChange('dayOfMonth', value)}
                  required
                />
              )}

              <Select
                label="Output Format"
                description="Format for the generated report"
                options={formatOptions}
                value={scheduleConfig?.format}
                onChange={(value) => handleConfigChange('format', value)}
              />
            </div>

            {/* Recipients */}
            <div className="space-y-4">
              <h3 className="font-medium text-foreground">Recipients</h3>
              
              {/* Add Custom Recipient */}
              <div className="flex space-x-2">
                <Input
                  label="Add Recipient Email"
                  type="email"
                  placeholder="Enter email address"
                  value={recipientInput}
                  onChange={(e) => setRecipientInput(e?.target?.value)}
                  onKeyPress={(e) => e?.key === 'Enter' && handleAddRecipient()}
                  className="flex-1"
                />
                <div className="flex items-end">
                  <Button
                    variant="outline"
                    iconName="Plus"
                    onClick={handleAddRecipient}
                    disabled={!recipientInput?.trim()}
                  >
                    Add
                  </Button>
                </div>
              </div>

              {/* Predefined Recipients */}
              <div>
                <div className="text-sm font-medium text-foreground mb-2">Quick Add Recipients:</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {predefinedRecipients?.map((recipient) => (
                    <button
                      key={recipient?.email}
                      onClick={() => handleAddPredefinedRecipient(recipient?.email)}
                      disabled={scheduleConfig?.recipients?.includes(recipient?.email)}
                      className={`text-left p-3 rounded-md border clinical-transition ${
                        scheduleConfig?.recipients?.includes(recipient?.email)
                          ? 'border-primary bg-primary/5 text-muted-foreground cursor-not-allowed'
                          : 'border-border hover:border-primary hover:bg-muted'
                      }`}
                    >
                      <div className="text-sm font-medium text-foreground">{recipient?.name}</div>
                      <div className="text-xs text-muted-foreground">{recipient?.role}</div>
                      <div className="text-xs text-muted-foreground">{recipient?.email}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Recipients */}
              {scheduleConfig?.recipients?.length > 0 && (
                <div>
                  <div className="text-sm font-medium text-foreground mb-2">
                    Selected Recipients ({scheduleConfig?.recipients?.length}):
                  </div>
                  <div className="space-y-2">
                    {scheduleConfig?.recipients?.map((email) => (
                      <div
                        key={email}
                        className="flex items-center justify-between p-2 bg-muted rounded-md"
                      >
                        <span className="text-sm text-foreground">{email}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          iconName="X"
                          onClick={() => handleRemoveRecipient(email)}
                          className="h-6 w-6"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Options */}
            <div className="space-y-3">
              <h3 className="font-medium text-foreground">Options</h3>
              
              <Checkbox
                label="Include Charts and Visualizations"
                description="Add graphs and charts to the automated report"
                checked={scheduleConfig?.includeCharts}
                onChange={(e) => handleConfigChange('includeCharts', e?.target?.checked)}
              />

              <Checkbox
                label="Auto-archive Generated Reports"
                description="Automatically save reports to the archive for future reference"
                checked={scheduleConfig?.autoArchive}
                onChange={(e) => handleConfigChange('autoArchive', e?.target?.checked)}
              />

              <Checkbox
                label="Schedule is Active"
                description="Enable or disable this scheduled report"
                checked={scheduleConfig?.isActive}
                onChange={(e) => handleConfigChange('isActive', e?.target?.checked)}
              />
            </div>

            {/* Schedule Preview */}
            {isConfigValid && (
              <div className="bg-muted/30 rounded-lg p-4">
                <h3 className="font-medium text-foreground mb-2">Schedule Preview</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>
                    <strong>Report:</strong> {reportTypeOptions?.find(r => r?.value === scheduleConfig?.reportType)?.label}
                  </div>
                  <div>
                    <strong>Frequency:</strong> {scheduleConfig?.frequency} at {scheduleConfig?.time}
                  </div>
                  <div>
                    <strong>Next Run:</strong> {getNextRunDate()}
                  </div>
                  <div>
                    <strong>Recipients:</strong> {scheduleConfig?.recipients?.length} people
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="text-sm text-muted-foreground">
            {isConfigValid ? (
              <span className="flex items-center space-x-2 text-success">
                <Icon name="CheckCircle" size={16} />
                <span>Schedule configuration complete</span>
              </span>
            ) : (
              <span className="flex items-center space-x-2 text-warning">
                <Icon name="AlertCircle" size={16} />
                <span>Please complete all required fields</span>
              </span>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="default"
              iconName="Calendar"
              iconPosition="left"
              onClick={handleScheduleReport}
              disabled={!isConfigValid}
            >
              Schedule Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportScheduler;