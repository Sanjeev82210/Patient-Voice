import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FeedbackFilters = ({ onFiltersChange, totalCount = 0 }) => {
  const [filters, setFilters] = useState({
    search: '',
    department: '',
    status: '',
    rating: '',
    dateRange: '',
    sentiment: ''
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const departmentOptions = [
    { value: '', label: 'All Departments' },
    { value: 'cardiology', label: 'Cardiology' },
    { value: 'emergency', label: 'Emergency' },
    { value: 'orthopedics', label: 'Orthopedics' },
    { value: 'pediatrics', label: 'Pediatrics' },
    { value: 'radiology', label: 'Radiology' },
    { value: 'surgery', label: 'Surgery' },
    { value: 'oncology', label: 'Oncology' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'new', label: 'New' },
    { value: 'in-review', label: 'In Review' },
    { value: 'responded', label: 'Responded' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'escalated', label: 'Escalated' }
  ];

  const ratingOptions = [
    { value: '', label: 'All Ratings' },
    { value: '5', label: '5 Stars' },
    { value: '4', label: '4 Stars' },
    { value: '3', label: '3 Stars' },
    { value: '2', label: '2 Stars' },
    { value: '1', label: '1 Star' }
  ];

  const dateRangeOptions = [
    { value: '', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const sentimentOptions = [
    { value: '', label: 'All Sentiment' },
    { value: 'positive', label: 'Positive' },
    { value: 'neutral', label: 'Neutral' },
    { value: 'negative', label: 'Negative' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      search: '',
      department: '',
      status: '',
      rating: '',
      dateRange: '',
      sentiment: ''
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '');

  return (
    <div className="bg-white/80 backdrop-blur-sm border border-blue-100 rounded-lg p-4 mb-6 shadow-lg">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-gray-800">Filter Feedback</h3>
          <span className="text-sm text-gray-600">
            {totalCount} submissions found
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              iconName="X"
              onClick={handleClearFilters}
            >
              Clear All
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Less' : 'More'} Filters
          </Button>
        </div>
      </div>
      {/* Search Bar - Always Visible */}
      <div className="mb-4">
        <Input
          type="search"
          placeholder="Search by patient name, feedback content, or ID..."
          value={filters?.search}
          onChange={(e) => handleFilterChange('search', e?.target?.value)}
          className="w-full"
        />
      </div>
      {/* Quick Filters - Always Visible */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Select
          label="Department"
          options={departmentOptions}
          value={filters?.department}
          onChange={(value) => handleFilterChange('department', value)}
        />

        <Select
          label="Status"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => handleFilterChange('status', value)}
        />

        <Select
          label="Rating"
          options={ratingOptions}
          value={filters?.rating}
          onChange={(value) => handleFilterChange('rating', value)}
        />

        <Select
          label="Date Range"
          options={dateRangeOptions}
          value={filters?.dateRange}
          onChange={(value) => handleFilterChange('dateRange', value)}
        />
      </div>
      {/* Advanced Filters - Expandable */}
      {isExpanded && (
        <div className="border-t border-border pt-4 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Select
              label="Sentiment Analysis"
              options={sentimentOptions}
              value={filters?.sentiment}
              onChange={(value) => handleFilterChange('sentiment', value)}
            />

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-foreground">Priority Level</label>
              <div className="flex space-x-2">
                <Button
                  variant={filters?.priority === 'high' ? 'destructive' : 'outline'}
                  size="sm"
                  onClick={() => handleFilterChange('priority', filters?.priority === 'high' ? '' : 'high')}
                >
                  High Priority
                </Button>
                <Button
                  variant={filters?.priority === 'urgent' ? 'warning' : 'outline'}
                  size="sm"
                  onClick={() => handleFilterChange('priority', filters?.priority === 'urgent' ? '' : 'urgent')}
                >
                  Urgent
                </Button>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-foreground">Response Required</label>
              <div className="flex space-x-2">
                <Button
                  variant={filters?.responseRequired === 'yes' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleFilterChange('responseRequired', filters?.responseRequired === 'yes' ? '' : 'yes')}
                >
                  Needs Response
                </Button>
                <Button
                  variant={filters?.responseRequired === 'overdue' ? 'destructive' : 'outline'}
                  size="sm"
                  onClick={() => handleFilterChange('responseRequired', filters?.responseRequired === 'overdue' ? '' : 'overdue')}
                >
                  Overdue
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {Object.entries(filters)?.map(([key, value]) => {
            if (!value) return null;
            return (
              <div
                key={key}
                className="flex items-center space-x-1 bg-muted px-2 py-1 rounded text-sm"
              >
                <span className="text-foreground">{key}: {value}</span>
                <button
                  onClick={() => handleFilterChange(key, '')}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Icon name="X" size={14} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FeedbackFilters;