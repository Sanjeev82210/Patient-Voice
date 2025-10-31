import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const SatisfactionTrendsChart = ({ className = '' }) => {
  const trendData = [
    {
      month: 'Jan 2024',
      overallSatisfaction: 4.2,
      medicalCare: 4.5,
      staffBehavior: 4.1,
      facilityClean: 3.8,
      waitTimes: 3.2,
      communication: 4.3
    },
    {
      month: 'Feb 2024',
      overallSatisfaction: 4.3,
      medicalCare: 4.4,
      staffBehavior: 4.2,
      facilityClean: 4.0,
      waitTimes: 3.4,
      communication: 4.4
    },
    {
      month: 'Mar 2024',
      overallSatisfaction: 4.1,
      medicalCare: 4.3,
      staffBehavior: 4.0,
      facilityClean: 3.9,
      waitTimes: 3.1,
      communication: 4.2
    },
    {
      month: 'Apr 2024',
      overallSatisfaction: 4.4,
      medicalCare: 4.6,
      staffBehavior: 4.3,
      facilityClean: 4.1,
      waitTimes: 3.5,
      communication: 4.5
    },
    {
      month: 'May 2024',
      overallSatisfaction: 4.5,
      medicalCare: 4.7,
      staffBehavior: 4.4,
      facilityClean: 4.2,
      waitTimes: 3.7,
      communication: 4.6
    },
    {
      month: 'Jun 2024',
      overallSatisfaction: 4.3,
      medicalCare: 4.5,
      staffBehavior: 4.2,
      facilityClean: 4.0,
      waitTimes: 3.3,
      communication: 4.4
    },
    {
      month: 'Jul 2024',
      overallSatisfaction: 4.6,
      medicalCare: 4.8,
      staffBehavior: 4.5,
      facilityClean: 4.3,
      waitTimes: 3.8,
      communication: 4.7
    },
    {
      month: 'Aug 2024',
      overallSatisfaction: 4.4,
      medicalCare: 4.6,
      staffBehavior: 4.3,
      facilityClean: 4.1,
      waitTimes: 3.6,
      communication: 4.5
    },
    {
      month: 'Sep 2024',
      overallSatisfaction: 4.7,
      medicalCare: 4.9,
      staffBehavior: 4.6,
      facilityClean: 4.4,
      waitTimes: 4.0,
      communication: 4.8
    },
    {
      month: 'Oct 2024',
      overallSatisfaction: 4.5,
      medicalCare: 4.7,
      staffBehavior: 4.4,
      facilityClean: 4.2,
      waitTimes: 3.8,
      communication: 4.6
    }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg shadow-clinical-modal p-3">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-muted-foreground">{entry?.name}:</span>
              <span className="font-medium text-foreground">{entry?.value?.toFixed(1)}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`card-clinical ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="TrendingUp" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Satisfaction Trends</h3>
            <p className="text-sm text-muted-foreground">Monthly satisfaction scores by category</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
            <span className="text-xs text-muted-foreground">Improving</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
            <span className="text-xs text-muted-foreground">Stable</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-xs text-muted-foreground">Declining</span>
          </div>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="month" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              domain={[1, 5]}
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="overallSatisfaction" 
              stroke="var(--color-primary)" 
              strokeWidth={3}
              name="Overall Satisfaction"
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="medicalCare" 
              stroke="#10B981" 
              strokeWidth={2}
              name="Medical Care"
              dot={{ fill: '#10B981', strokeWidth: 2, r: 3 }}
            />
            <Line 
              type="monotone" 
              dataKey="staffBehavior" 
              stroke="#8B5CF6" 
              strokeWidth={2}
              name="Staff Behavior"
              dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 3 }}
            />
            <Line 
              type="monotone" 
              dataKey="facilityClean" 
              stroke="#F59E0B" 
              strokeWidth={2}
              name="Facility Cleanliness"
              dot={{ fill: '#F59E0B', strokeWidth: 2, r: 3 }}
            />
            <Line 
              type="monotone" 
              dataKey="waitTimes" 
              stroke="#EF4444" 
              strokeWidth={2}
              name="Wait Times"
              dot={{ fill: '#EF4444', strokeWidth: 2, r: 3 }}
            />
            <Line 
              type="monotone" 
              dataKey="communication" 
              stroke="#06B6D4" 
              strokeWidth={2}
              name="Communication"
              dot={{ fill: '#06B6D4', strokeWidth: 2, r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-2 lg:grid-cols-6 gap-4">
        {[
          { key: 'overallSatisfaction', label: 'Overall', value: 4.5, change: '+0.2', color: 'text-primary' },
          { key: 'medicalCare', label: 'Medical Care', value: 4.7, change: '+0.1', color: 'text-emerald-600' },
          { key: 'staffBehavior', label: 'Staff', value: 4.4, change: '+0.1', color: 'text-purple-600' },
          { key: 'facilityClean', label: 'Cleanliness', value: 4.2, change: '+0.2', color: 'text-amber-600' },
          { key: 'waitTimes', label: 'Wait Times', value: 3.8, change: '+0.2', color: 'text-red-600' },
          { key: 'communication', label: 'Communication', value: 4.6, change: '+0.2', color: 'text-cyan-600' }
        ]?.map((metric) => (
          <div key={metric?.key} className="text-center">
            <div className={`text-lg font-semibold ${metric?.color}`}>
              {metric?.value}
            </div>
            <div className="text-xs text-muted-foreground">{metric?.label}</div>
            <div className="text-xs text-emerald-600 flex items-center justify-center space-x-1">
              <Icon name="TrendingUp" size={12} />
              <span>{metric?.change}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SatisfactionTrendsChart;