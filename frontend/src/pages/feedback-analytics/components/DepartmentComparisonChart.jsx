import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DepartmentComparisonChart = ({ className = '' }) => {
  const [viewMode, setViewMode] = useState('satisfaction'); // satisfaction, volume, response-time

  const departmentData = [
    {
      department: 'Emergency',
      satisfaction: 4.2,
      volume: 1250,
      responseTime: 2.5,
      medicalCare: 4.3,
      staffBehavior: 4.1,
      waitTimes: 3.8,
      communication: 4.0
    },
    {
      department: 'Cardiology',
      satisfaction: 4.7,
      volume: 890,
      responseTime: 1.8,
      medicalCare: 4.8,
      staffBehavior: 4.6,
      waitTimes: 4.2,
      communication: 4.7
    },
    {
      department: 'Orthopedics',
      satisfaction: 4.4,
      volume: 650,
      responseTime: 2.1,
      medicalCare: 4.5,
      staffBehavior: 4.3,
      waitTimes: 4.0,
      communication: 4.4
    },
    {
      department: 'Pediatrics',
      satisfaction: 4.6,
      volume: 720,
      responseTime: 1.5,
      medicalCare: 4.7,
      staffBehavior: 4.8,
      waitTimes: 4.1,
      communication: 4.5
    },
    {
      department: 'Surgery',
      satisfaction: 4.5,
      volume: 480,
      responseTime: 2.0,
      medicalCare: 4.6,
      staffBehavior: 4.4,
      waitTimes: 4.3,
      communication: 4.6
    },
    {
      department: 'Radiology',
      satisfaction: 4.1,
      volume: 920,
      responseTime: 3.2,
      medicalCare: 4.2,
      staffBehavior: 4.0,
      waitTimes: 3.5,
      communication: 4.1
    },
    {
      department: 'Laboratory',
      satisfaction: 4.3,
      volume: 1100,
      responseTime: 2.8,
      medicalCare: 4.4,
      staffBehavior: 4.2,
      waitTimes: 3.9,
      communication: 4.3
    },
    {
      department: 'Pharmacy',
      satisfaction: 4.0,
      volume: 1350,
      responseTime: 3.5,
      medicalCare: 4.1,
      staffBehavior: 3.9,
      waitTimes: 3.2,
      communication: 4.0
    }
  ];

  const getChartConfig = () => {
    switch (viewMode) {
      case 'satisfaction':
        return {
          title: 'Department Satisfaction Comparison',
          subtitle: 'Average satisfaction scores by department',
          dataKey: 'satisfaction',
          color: 'var(--color-primary)',
          yAxisDomain: [1, 5],
          formatter: (value) => `${value?.toFixed(1)}/5`
        };
      case 'volume':
        return {
          title: 'Feedback Volume by Department',
          subtitle: 'Total feedback submissions received',
          dataKey: 'volume',
          color: '#10B981',
          yAxisDomain: [0, 'dataMax'],
          formatter: (value) => `${value?.toLocaleString()}`
        };
      case 'response-time':
        return {
          title: 'Average Response Time by Department',
          subtitle: 'Days to respond to feedback',
          dataKey: 'responseTime',
          color: '#F59E0B',
          yAxisDomain: [0, 'dataMax'],
          formatter: (value) => `${value} days`
        };
      default:
        return {};
    }
  };

  const config = getChartConfig();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg shadow-clinical-modal p-4">
          <p className="text-sm font-medium text-foreground mb-3">{label} Department</p>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Satisfaction:</span>
              <span className="text-sm font-medium text-foreground">{data?.satisfaction?.toFixed(1)}/5</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Feedback Volume:</span>
              <span className="text-sm font-medium text-foreground">{data?.volume?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Response Time:</span>
              <span className="text-sm font-medium text-foreground">{data?.responseTime} days</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-blue-100 shadow-lg ${className}`}>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
            <Icon name="BarChart3" size={20} className="text-emerald-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{config?.title}</h3>
            <p className="text-sm text-gray-600">{config?.subtitle}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'satisfaction' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('satisfaction')}
          >
            Satisfaction
          </Button>
          <Button
            variant={viewMode === 'volume' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('volume')}
          >
            Volume
          </Button>
          <Button
            variant={viewMode === 'response-time' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('response-time')}
          >
            Response Time
          </Button>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={departmentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis
              dataKey="department"
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis
              domain={config?.yAxisDomain}
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey={config?.dataKey}
              fill={config?.color}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* Department Rankings */}
      <div className="mt-6 pt-4 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-3">Department Rankings</h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Top Performers */}
          <div>
            <h5 className="text-xs font-medium text-emerald-600 mb-2 flex items-center space-x-1">
              <Icon name="TrendingUp" size={14} />
              <span>Top Performers</span>
            </h5>
            <div className="space-y-2">
              {departmentData?.sort((a, b) => b?.satisfaction - a?.satisfaction)?.slice(0, 3)?.map((dept, index) => (
                <div key={dept?.department} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xs font-medium">
                      {index + 1}
                    </span>
                    <span className="text-foreground">{dept?.department}</span>
                  </div>
                  <span className="font-medium text-emerald-600">{dept?.satisfaction?.toFixed(1)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Needs Attention */}
          <div>
            <h5 className="text-xs font-medium text-amber-600 mb-2 flex items-center space-x-1">
              <Icon name="AlertTriangle" size={14} />
              <span>Needs Attention</span>
            </h5>
            <div className="space-y-2">
              {departmentData?.sort((a, b) => a?.satisfaction - b?.satisfaction)?.slice(0, 3)?.map((dept, index) => (
                <div key={dept?.department} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-xs font-medium">
                      {departmentData?.length - index}
                    </span>
                    <span className="text-foreground">{dept?.department}</span>
                  </div>
                  <span className="font-medium text-amber-600">{dept?.satisfaction?.toFixed(1)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentComparisonChart;