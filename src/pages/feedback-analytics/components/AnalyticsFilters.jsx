import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const AnalyticsFilters = ({ onFiltersChange, className = '' }) => {
  const [filters, setFilters] = useState({
    dateRange: 'last-30-days',
    customStartDate: '',
    customEndDate: '',
    departments: [],
    categories: [],
    ratingRange: { min: 1, max: 5 },
    patientType: 'all',
    staffMembers: [],
    sentimentFilter: 'all'
  });

  const [isExpanded, setIsExpanded] = useState(false);

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
    { value: 'billing', label: 'Billing & Insurance' },
    { value: 'accessibility', label: 'Accessibility' },
    { value: 'overall-experience', label: 'Overall Experience' }
  ];

  const patientTypeOptions = [
    { value: 'all', label: 'All Patients' },
    { value: 'inpatient', label: 'Inpatients' },
    { value: 'outpatient', label: 'Outpatients' },
    { value: 'emergency', label: 'Emergency Visits' },
    { value: 'surgery', label: 'Surgical Patients' }
  ];

  const staffOptions = [
    { value: 'dr-johnson', label: 'Dr. Sarah Johnson' },
    { value: 'dr-smith', label: 'Dr. Michael Smith' },
    { value: 'nurse-williams', label: 'Nurse Jennifer Williams' },
    { value: 'nurse-brown', label: 'Nurse David Brown' },
    { value: 'tech-davis', label: 'Tech Lisa Davis' }
  ];

  const sentimentOptions = [
    { value: 'all', label: 'All Sentiments' },
    { value: 'positive', label: 'Positive' },
    { value: 'neutral', label: 'Neutral' },
    { value: 'negative', label: 'Negative' }
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      dateRange: 'last-30-days',
      customStartDate: '',
      customEndDate: '',
      departments: [],
      categories: [],
      ratingRange: { min: 1, max: 5 },
      patientType: 'all',
      staffMembers: [],
      sentimentFilter: 'all'
    };
    setFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters?.departments?.length > 0) count++;
    if (filters?.categories?.length > 0) count++;
    if (filters?.ratingRange?.min > 1 || filters?.ratingRange?.max < 5) count++;
    if (filters?.patientType !== 'all') count++;
    if (filters?.staffMembers?.length > 0) count++;
    if (filters?.sentimentFilter !== 'all') count++;
    return count;
  };

  return (
    <div className={`bg-card border border-border rounded-lg shadow-clinical ${className}`}>
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} className="text-muted-foreground" />
          <h3 className="text-lg font-semibold text-foreground">Analytics Filters</h3>
          {getActiveFilterCount() > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              {getActiveFilterCount()} active
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="RotateCcw"
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button
            variant="ghost"
            size="icon"
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            onClick={() => setIsExpanded(!isExpanded)}
          />
        </div>
      </div>
      {/* Filter Content */}
      <div className={`p-4 space-y-4 ${isExpanded ? 'block' : 'hidden lg:block'}`}>
        {/* Date Range */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Select
            label="Date Range"
            options={dateRangeOptions}
            value={filters?.dateRange}
            onChange={(value) => handleFilterChange('dateRange', value)}
          />
          
          {filters?.dateRange === 'custom' && (
            <>
              <Input
                label="Start Date"
                type="date"
                value={filters?.customStartDate}
                onChange={(e) => handleFilterChange('customStartDate', e?.target?.value)}
              />
              <Input
                label="End Date"
                type="date"
                value={filters?.customEndDate}
                onChange={(e) => handleFilterChange('customEndDate', e?.target?.value)}
              />
            </>
          )}
        </div>

        {/* Department and Category Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Select
            label="Departments"
            options={departmentOptions}
            value={filters?.departments}
            onChange={(value) => handleFilterChange('departments', value)}
            multiple
            searchable
            placeholder="Select departments..."
          />
          
          <Select
            label="Feedback Categories"
            options={categoryOptions}
            value={filters?.categories}
            onChange={(value) => handleFilterChange('categories', value)}
            multiple
            searchable
            placeholder="Select categories..."
          />
        </div>

        {/* Rating Range */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Rating Range</label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Min:</span>
                <Input
                  type="number"
                  min="1"
                  max="5"
                  value={filters?.ratingRange?.min}
                  onChange={(e) => handleFilterChange('ratingRange', {
                    ...filters?.ratingRange,
                    min: parseInt(e?.target?.value)
                  })}
                  className="w-20"
                />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Max:</span>
                <Input
                  type="number"
                  min="1"
                  max="5"
                  value={filters?.ratingRange?.max}
                  onChange={(e) => handleFilterChange('ratingRange', {
                    ...filters?.ratingRange,
                    max: parseInt(e?.target?.value)
                  })}
                  className="w-20"
                />
              </div>
            </div>
          </div>

          <Select
            label="Patient Type"
            options={patientTypeOptions}
            value={filters?.patientType}
            onChange={(value) => handleFilterChange('patientType', value)}
          />
        </div>

        {/* Staff and Sentiment */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Select
            label="Staff Members"
            options={staffOptions}
            value={filters?.staffMembers}
            onChange={(value) => handleFilterChange('staffMembers', value)}
            multiple
            searchable
            placeholder="Select staff members..."
          />
          
          <Select
            label="Sentiment Filter"
            options={sentimentOptions}
            value={filters?.sentimentFilter}
            onChange={(value) => handleFilterChange('sentimentFilter', value)}
          />
        </div>

        {/* Quick Filter Buttons */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
          <span className="text-sm font-medium text-muted-foreground">Quick Filters:</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              handleFilterChange('ratingRange', { min: 1, max: 2 });
              handleFilterChange('sentimentFilter', 'negative');
            }}
          >
            Low Ratings
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              handleFilterChange('ratingRange', { min: 4, max: 5 });
              handleFilterChange('sentimentFilter', 'positive');
            }}
          >
            High Ratings
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              handleFilterChange('dateRange', 'last-7-days');
              handleFilterChange('categories', ['wait-times']);
            }}
          >
            Recent Wait Time Issues
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsFilters;