import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const ReportPreview = ({ reportConfig, onClose, onGenerate }) => {
  const [previewMode, setPreviewMode] = useState('summary');

  // Mock data for preview
  const satisfactionData = [
    { department: 'Emergency', score: 4.2, responses: 156 },
    { department: 'Cardiology', score: 4.6, responses: 89 },
    { department: 'Orthopedics', score: 4.4, responses: 112 },
    { department: 'Pediatrics', score: 4.8, responses: 67 },
    { department: 'Surgery', score: 4.3, responses: 134 }
  ];

  const trendData = [
    { month: 'Jun', score: 4.1 },
    { month: 'Jul', score: 4.3 },
    { month: 'Aug', score: 4.2 },
    { month: 'Sep', score: 4.5 },
    { month: 'Oct', score: 4.4 }
  ];

  const categoryData = [
    { name: 'Staff Communication', value: 4.5, color: '#2563EB' },
    { name: 'Wait Times', value: 3.8, color: '#059669' },
    { name: 'Facility Cleanliness', value: 4.7, color: '#DC2626' },
    { name: 'Pain Management', value: 4.2, color: '#F59E0B' }
  ];

  const getReportTitle = () => {
    const typeLabels = {
      'satisfaction-summary': 'Patient Satisfaction Summary',
      'department-performance': 'Department Performance Report',
      'trend-analysis': 'Satisfaction Trend Analysis',
      'compliance-report': 'Compliance & Quality Report',
      'staff-performance': 'Staff Performance Insights',
      'custom-analytics': 'Custom Analytics Report'
    };
    return typeLabels?.[reportConfig?.type] || 'Report Preview';
  };

  const getDateRangeText = () => {
    const rangeLabels = {
      'last-7-days': 'Last 7 Days',
      'last-30-days': 'Last 30 Days',
      'last-quarter': 'Last Quarter',
      'last-6-months': 'Last 6 Months',
      'last-year': 'Last Year',
      'custom': `${reportConfig?.customStartDate} to ${reportConfig?.customEndDate}`
    };
    return rangeLabels?.[reportConfig?.dateRange] || 'Date Range';
  };

  const previewModes = [
    { id: 'summary', label: 'Executive Summary', icon: 'FileText' },
    { id: 'charts', label: 'Charts & Graphs', icon: 'BarChart3' },
    { id: 'data', label: 'Data Tables', icon: 'Table' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white border border-amber-100 rounded-lg shadow-clinical-modal w-full max-w-6xl h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-amber-100">
          <div>
            <h2 className="text-xl font-semibold text-foreground">{getReportTitle()}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Preview for {getDateRangeText()} • {reportConfig?.departments?.length || 0} departments
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="default"
              iconName="Download"
              iconPosition="left"
              onClick={onGenerate}
            >
              Generate Report
            </Button>
            <Button
              variant="ghost"
              size="icon"
              iconName="X"
              onClick={onClose}
            />
          </div>
        </div>

        {/* Preview Mode Tabs */}
        <div className="flex items-center space-x-1 px-6 pt-4 border-b border-amber-100">
          {previewModes?.map((mode) => (
            <button
              key={mode?.id}
              onClick={() => setPreviewMode(mode?.id)}
              className={`flex items-center space-x-2 px-4 py-2 text-sm rounded-t-md clinical-transition ${previewMode === mode?.id
                ? 'bg-amber-50 text-amber-700 border-b-2 border-amber-500'
                : 'text-gray-500 hover:text-amber-700 hover:bg-amber-50/60'
                }`}
            >
              <Icon name={mode?.icon} size={16} />
              <span>{mode?.label}</span>
            </button>
          ))}
        </div>

        {/* Preview Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {previewMode === 'summary' && (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-foreground">4.4</div>
                  <div className="text-sm text-muted-foreground">Overall Satisfaction</div>
                  <div className="flex items-center space-x-1 mt-1">
                    <Icon name="TrendingUp" size={12} className="text-success" />
                    <span className="text-xs text-success">+0.2 from last period</span>
                  </div>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-foreground">558</div>
                  <div className="text-sm text-muted-foreground">Total Responses</div>
                  <div className="flex items-center space-x-1 mt-1">
                    <Icon name="TrendingUp" size={12} className="text-success" />
                    <span className="text-xs text-success">+12% response rate</span>
                  </div>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-foreground">87%</div>
                  <div className="text-sm text-muted-foreground">Recommend Rate</div>
                  <div className="flex items-center space-x-1 mt-1">
                    <Icon name="TrendingUp" size={12} className="text-success" />
                    <span className="text-xs text-success">+3% improvement</span>
                  </div>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-foreground">2.1</div>
                  <div className="text-sm text-muted-foreground">Avg Response Time (days)</div>
                  <div className="flex items-center space-x-1 mt-1">
                    <Icon name="TrendingDown" size={12} className="text-success" />
                    <span className="text-xs text-success">-0.3 days faster</span>
                  </div>
                </div>
              </div>

              {/* Executive Summary Text */}
              <div className="bg-muted/30 rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-3">Executive Summary</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    Patient satisfaction scores for the reporting period show continued improvement across most departments,
                    with an overall satisfaction rating of 4.4 out of 5.0, representing a 0.2-point increase from the previous period.
                  </p>
                  <p>
                    <strong className="text-foreground">Key Highlights:</strong> Pediatrics department achieved the highest
                    satisfaction score (4.8), while Emergency department shows the most significant improvement (+0.4 points).
                    Response rates increased by 12%, indicating improved patient engagement.
                  </p>
                  <p>
                    <strong className="text-foreground">Areas for Improvement:</strong> Wait times remain a concern in the
                    Emergency department, with 23% of patients rating wait times as unsatisfactory. Targeted interventions
                    are recommended to address staffing during peak hours.
                  </p>
                </div>
              </div>

              {/* Top Performers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Top Performing Areas</h3>
                  <div className="space-y-2">
                    {[
                      { area: 'Facility Cleanliness', score: 4.7, trend: '+0.1' },
                      { area: 'Staff Courtesy', score: 4.6, trend: '+0.3' },
                      { area: 'Pain Management', score: 4.5, trend: '+0.2' }
                    ]?.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded">
                        <span className="text-sm text-foreground">{item?.area}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-foreground">{item?.score}</span>
                          <span className="text-xs text-success">{item?.trend}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-3">Improvement Opportunities</h3>
                  <div className="space-y-2">
                    {[
                      { area: 'Wait Times', score: 3.8, trend: '-0.1' },
                      { area: 'Parking Availability', score: 3.9, trend: '0.0' },
                      { area: 'Food Quality', score: 4.0, trend: '+0.1' }
                    ]?.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded">
                        <span className="text-sm text-foreground">{item?.area}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-foreground">{item?.score}</span>
                          <span className={`text-xs ${item?.trend?.startsWith('-') ? 'text-error' : item?.trend === '0.0' ? 'text-muted-foreground' : 'text-success'}`}>
                            {item?.trend}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {previewMode === 'charts' && (
            <div className="space-y-8">
              {/* Department Satisfaction Chart */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">Department Satisfaction Scores</h3>
                <div className="h-64 bg-muted/30 rounded-lg p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={satisfactionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="department" />
                      <YAxis domain={[0, 5]} />
                      <Tooltip />
                      <Bar dataKey="score" fill="#2563EB" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Trend Analysis Chart */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">Satisfaction Trend Over Time</h3>
                <div className="h-64 bg-muted/30 rounded-lg p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[3.5, 5]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="score" stroke="#059669" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Category Breakdown */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">Satisfaction by Category</h3>
                <div className="h-64 bg-muted/30 rounded-lg p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {categoryData?.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry?.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {previewMode === 'data' && (
            <div className="space-y-6">
              {/* Department Data Table */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">Department Performance Data</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border border-border rounded-lg">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-3 text-sm font-medium text-foreground">Department</th>
                        <th className="text-left p-3 text-sm font-medium text-foreground">Satisfaction Score</th>
                        <th className="text-left p-3 text-sm font-medium text-foreground">Total Responses</th>
                        <th className="text-left p-3 text-sm font-medium text-foreground">Response Rate</th>
                        <th className="text-left p-3 text-sm font-medium text-foreground">Trend</th>
                      </tr>
                    </thead>
                    <tbody>
                      {satisfactionData?.map((dept, index) => (
                        <tr key={index} className="border-t border-border">
                          <td className="p-3 text-sm text-foreground">{dept?.department}</td>
                          <td className="p-3 text-sm text-foreground font-medium">{dept?.score}</td>
                          <td className="p-3 text-sm text-muted-foreground">{dept?.responses}</td>
                          <td className="p-3 text-sm text-muted-foreground">
                            {Math.round((dept?.responses / 600) * 100)}%
                          </td>
                          <td className="p-3">
                            <span className="flex items-center space-x-1 text-success">
                              <Icon name="TrendingUp" size={12} />
                              <span className="text-xs">+{(Math.random() * 0.5)?.toFixed(1)}</span>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Detailed Metrics Table */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">Detailed Satisfaction Metrics</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border border-border rounded-lg">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-3 text-sm font-medium text-foreground">Metric Category</th>
                        <th className="text-left p-3 text-sm font-medium text-foreground">Current Score</th>
                        <th className="text-left p-3 text-sm font-medium text-foreground">Previous Score</th>
                        <th className="text-left p-3 text-sm font-medium text-foreground">Change</th>
                        <th className="text-left p-3 text-sm font-medium text-foreground">Target</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categoryData?.map((category, index) => (
                        <tr key={index} className="border-t border-border">
                          <td className="p-3 text-sm text-foreground">{category?.name}</td>
                          <td className="p-3 text-sm text-foreground font-medium">{category?.value}</td>
                          <td className="p-3 text-sm text-muted-foreground">
                            {(category?.value - 0.1 - Math.random() * 0.2)?.toFixed(1)}
                          </td>
                          <td className="p-3">
                            <span className="flex items-center space-x-1 text-success">
                              <Icon name="TrendingUp" size={12} />
                              <span className="text-xs">+{(Math.random() * 0.3)?.toFixed(1)}</span>
                            </span>
                          </td>
                          <td className="p-3 text-sm text-muted-foreground">4.5</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-amber-100 bg-amber-50/40">
          <div className="text-sm text-muted-foreground">
            Report generated on {new Date()?.toLocaleDateString()} • {reportConfig?.format?.toUpperCase()} format
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={onClose}>
              Close Preview
            </Button>
            <Button
              variant="default"
              iconName="Download"
              iconPosition="left"
              onClick={onGenerate}
            >
              Generate & Download
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPreview;