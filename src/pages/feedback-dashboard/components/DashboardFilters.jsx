import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const DashboardFilters = ({ onFiltersChange, className = '' }) => {
  const [filters, setFilters] = useState({
    dateRange: 'last30days',
    department: 'all',
    feedbackType: 'all',
    priority: 'all'
  });

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'last7days', label: 'Last 7 Days' },
    { value: 'last30days', label: 'Last 30 Days' },
    { value: 'last90days', label: 'Last 90 Days' },
    { value: 'lastyear', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    { value: 'emergency', label: 'Emergency Department' },
    { value: 'cardiology', label: 'Cardiology' },
    { value: 'pediatrics', label: 'Pediatrics' },
    { value: 'surgery', label: 'Surgery' },
    { value: 'maternity', label: 'Maternity Ward' },
    { value: 'radiology', label: 'Radiology' },
    { value: 'oncology', label: 'Oncology' },
    { value: 'orthopedics', label: 'Orthopedics' }
  ];

  const feedbackTypeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'complaint', label: 'Complaints' },
    { value: 'praise', label: 'Praise' },
    { value: 'suggestion', label: 'Suggestions' },
    { value: 'urgent', label: 'Urgent Issues' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    if (onFiltersChange) {
      onFiltersChange(newFilters);
    }
  };

  const handleReset = () => {
    const resetFilters = {
      dateRange: 'last30days',
      department: 'all',
      feedbackType: 'all',
      priority: 'all'
    };
    setFilters(resetFilters);
    if (onFiltersChange) {
      onFiltersChange(resetFilters);
    }
  };

  const hasActiveFilters = Object.values(filters)?.some(value => value !== 'all' && value !== 'last30days');

  return (
    <div className={`card-clinical ${className}`}>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
          <Select
            label="Date Range"
            options={dateRangeOptions}
            value={filters?.dateRange}
            onChange={(value) => handleFilterChange('dateRange', value)}
            className="w-full"
          />

          <Select
            label="Department"
            options={departmentOptions}
            value={filters?.department}
            onChange={(value) => handleFilterChange('department', value)}
            searchable
            className="w-full"
          />

          <Select
            label="Feedback Type"
            options={feedbackTypeOptions}
            value={filters?.feedbackType}
            onChange={(value) => handleFilterChange('feedbackType', value)}
            className="w-full"
          />

          <Select
            label="Priority Level"
            options={priorityOptions}
            value={filters?.priority}
            onChange={(value) => handleFilterChange('priority', value)}
            className="w-full"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 lg:ml-4">
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              iconName="RotateCcw"
              onClick={handleReset}
            >
              Reset
            </Button>
          )}
          
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
          >
            Export
          </Button>

          <Button
            variant="default"
            size="sm"
            iconName="RefreshCw"
          >
            Refresh
          </Button>
        </div>
      </div>
      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2 flex-wrap gap-2">
            <span className="text-sm font-medium text-muted-foreground">
              Active Filters:
            </span>
            
            {filters?.department !== 'all' && (
              <div className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-xs">
                <span>Department: {departmentOptions?.find(opt => opt?.value === filters?.department)?.label}</span>
                <button
                  onClick={() => handleFilterChange('department', 'all')}
                  className="hover:bg-primary/20 rounded p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            )}

            {filters?.feedbackType !== 'all' && (
              <div className="flex items-center space-x-1 bg-secondary/10 text-secondary px-2 py-1 rounded-md text-xs">
                <span>Type: {feedbackTypeOptions?.find(opt => opt?.value === filters?.feedbackType)?.label}</span>
                <button
                  onClick={() => handleFilterChange('feedbackType', 'all')}
                  className="hover:bg-secondary/20 rounded p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            )}

            {filters?.priority !== 'all' && (
              <div className="flex items-center space-x-1 bg-warning/10 text-warning px-2 py-1 rounded-md text-xs">
                <span>Priority: {priorityOptions?.find(opt => opt?.value === filters?.priority)?.label}</span>
                <button
                  onClick={() => handleFilterChange('priority', 'all')}
                  className="hover:bg-warning/20 rounded p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardFilters;