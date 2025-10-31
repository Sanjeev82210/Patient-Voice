import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ReportArchive = ({ onDownloadReport, onShareReport }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');

  // Mock archived reports data
  const archivedReports = [
    {
      id: 'RPT-2025-001',
      name: 'Monthly Satisfaction Summary - October 2025',
      type: 'satisfaction-summary',
      generatedDate: '2025-10-30',
      generatedBy: 'Dr. Sarah Johnson',
      format: 'pdf',
      size: '2.4 MB',
      downloads: 12,
      departments: ['Emergency', 'Cardiology', 'Surgery'],
      status: 'completed',
      isScheduled: true
    },
    {
      id: 'RPT-2025-002',
      name: 'Department Performance Comparison - Q3 2025',
      type: 'department-performance',
      generatedDate: '2025-10-15',
      generatedBy: 'Lisa Rodriguez',
      format: 'excel',
      size: '5.1 MB',
      downloads: 8,
      departments: ['All Departments'],
      status: 'completed',
      isScheduled: false
    },
    {
      id: 'RPT-2025-003',
      name: 'Compliance & Quality Report - September 2025',
      type: 'compliance-report',
      generatedDate: '2025-10-01',
      generatedBy: 'Dr. Michael Chen',
      format: 'pdf',
      size: '3.7 MB',
      downloads: 15,
      departments: ['Emergency', 'Surgery', 'ICU'],
      status: 'completed',
      isScheduled: true
    },
    {
      id: 'RPT-2025-004',
      name: 'Staff Performance Insights - Q3 2025',
      type: 'staff-performance',
      generatedDate: '2025-09-30',
      generatedBy: 'Dr. Sarah Johnson',
      format: 'powerpoint',
      size: '8.2 MB',
      downloads: 6,
      departments: ['Cardiology', 'Orthopedics'],
      status: 'completed',
      isScheduled: false
    },
    {
      id: 'RPT-2025-005',
      name: 'Patient Experience Journey Analysis - September 2025',
      type: 'custom-analytics',
      generatedDate: '2025-09-25',
      generatedBy: 'Lisa Rodriguez',
      format: 'pdf',
      size: '4.3 MB',
      downloads: 9,
      departments: ['Emergency', 'Pediatrics'],
      status: 'completed',
      isScheduled: false
    },
    {
      id: 'RPT-2025-006',
      name: 'Trend Analysis Report - August 2025',
      type: 'trend-analysis',
      generatedDate: '2025-08-31',
      generatedBy: 'Dr. Michael Chen',
      format: 'excel',
      size: '6.8 MB',
      downloads: 11,
      departments: ['All Departments'],
      status: 'completed',
      isScheduled: true
    }
  ];

  const reportTypeOptions = [
    { value: 'all', label: 'All Report Types' },
    { value: 'satisfaction-summary', label: 'Satisfaction Summary' },
    { value: 'department-performance', label: 'Department Performance' },
    { value: 'trend-analysis', label: 'Trend Analysis' },
    { value: 'compliance-report', label: 'Compliance Report' },
    { value: 'staff-performance', label: 'Staff Performance' },
    { value: 'custom-analytics', label: 'Custom Analytics' }
  ];

  const sortOptions = [
    { value: 'date-desc', label: 'Newest First' },
    { value: 'date-asc', label: 'Oldest First' },
    { value: 'name-asc', label: 'Name A-Z' },
    { value: 'name-desc', label: 'Name Z-A' },
    { value: 'downloads-desc', label: 'Most Downloaded' }
  ];

  const getReportTypeIcon = (type) => {
    const icons = {
      'satisfaction-summary': 'FileText',
      'department-performance': 'BarChart3',
      'trend-analysis': 'TrendingUp',
      'compliance-report': 'Shield',
      'staff-performance': 'Users',
      'custom-analytics': 'PieChart'
    };
    return icons?.[type] || 'FileText';
  };

  const getFormatIcon = (format) => {
    const icons = {
      'pdf': 'FileText',
      'excel': 'FileSpreadsheet',
      'csv': 'Database',
      'powerpoint': 'Presentation'
    };
    return icons?.[format] || 'File';
  };

  const getFormatColor = (format) => {
    const colors = {
      'pdf': 'text-error',
      'excel': 'text-success',
      'csv': 'text-primary',
      'powerpoint': 'text-warning'
    };
    return colors?.[format] || 'text-muted-foreground';
  };

  const filteredReports = archivedReports?.filter(report => {
      const matchesSearch = report?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                           report?.id?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                           report?.generatedBy?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      const matchesType = filterType === 'all' || report?.type === filterType;
      return matchesSearch && matchesType;
    })?.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.generatedDate) - new Date(a.generatedDate);
        case 'date-asc':
          return new Date(a.generatedDate) - new Date(b.generatedDate);
        case 'name-asc':
          return a?.name?.localeCompare(b?.name);
        case 'name-desc':
          return b?.name?.localeCompare(a?.name);
        case 'downloads-desc':
          return b?.downloads - a?.downloads;
        default:
          return 0;
      }
    });

  const handleDownload = (report) => {
    if (onDownloadReport) {
      onDownloadReport(report);
    }
  };

  const handleShare = (report) => {
    if (onShareReport) {
      onShareReport(report);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="card-clinical">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Report Archive</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Access and manage previously generated reports
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {filteredReports?.length} of {archivedReports?.length} reports
          </span>
        </div>
      </div>
      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Input
          label="Search Reports"
          type="search"
          placeholder="Search by name, ID, or creator..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)}
        />

        <Select
          label="Filter by Type"
          options={reportTypeOptions}
          value={filterType}
          onChange={setFilterType}
        />

        <Select
          label="Sort by"
          options={sortOptions}
          value={sortBy}
          onChange={setSortBy}
        />
      </div>
      {/* Reports List */}
      <div className="space-y-3">
        {filteredReports?.map((report) => (
          <div
            key={report?.id}
            className="border border-border rounded-lg p-4 clinical-hover clinical-transition"
          >
            <div className="flex items-start justify-between">
              {/* Report Info */}
              <div className="flex items-start space-x-4 flex-1 min-w-0">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon 
                    name={getReportTypeIcon(report?.type)} 
                    size={20} 
                    className="text-primary" 
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-medium text-foreground truncate">
                      {report?.name}
                    </h3>
                    {report?.isScheduled && (
                      <span className="inline-flex items-center space-x-1 text-xs px-2 py-0.5 bg-accent/10 text-accent rounded">
                        <Icon name="Calendar" size={12} />
                        <span>Scheduled</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                    <span className="flex items-center space-x-1">
                      <Icon name="Calendar" size={12} />
                      <span>{formatDate(report?.generatedDate)}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="User" size={12} />
                      <span>{report?.generatedBy}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="HardDrive" size={12} />
                      <span>{report?.size}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="Download" size={12} />
                      <span>{report?.downloads} downloads</span>
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className={`flex items-center space-x-1 ${getFormatColor(report?.format)}`}>
                      <Icon name={getFormatIcon(report?.format)} size={14} />
                      <span className="text-xs font-medium uppercase">{report?.format}</span>
                    </span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">
                      {report?.departments?.join(', ')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 flex-shrink-0 ml-4">
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="Eye"
                  title="Preview Report"
                  onClick={() => console.log('Preview', report?.id)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="Share2"
                  title="Share Report"
                  onClick={() => handleShare(report)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="Download"
                  title="Download Report"
                  onClick={() => handleDownload(report)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="MoreVertical"
                  title="More Options"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredReports?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FileX" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No Reports Found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm || filterType !== 'all' ?'No reports match your current search and filter criteria.' :'No reports have been generated yet. Create your first report to get started.'
            }
          </p>
          {(searchTerm || filterType !== 'all') && (
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setFilterType('all');
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>
      )}
      {/* Archive Stats */}
      {filteredReports?.length > 0 && (
        <div className="mt-6 pt-6 border-t border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-foreground">{archivedReports?.length}</div>
              <div className="text-sm text-muted-foreground">Total Reports</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">
                {archivedReports?.reduce((sum, report) => sum + report?.downloads, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Downloads</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">
                {archivedReports?.filter(report => report?.isScheduled)?.length}
              </div>
              <div className="text-sm text-muted-foreground">Scheduled Reports</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">
                {(archivedReports?.reduce((sum, report) => sum + parseFloat(report?.size), 0))?.toFixed(1)} MB
              </div>
              <div className="text-sm text-muted-foreground">Total Size</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportArchive;