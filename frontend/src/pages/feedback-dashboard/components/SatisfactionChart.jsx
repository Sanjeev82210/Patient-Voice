import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SatisfactionChart = ({ className = '' }) => {
  const chartData = [
    { month: 'Jan', satisfaction: 4.2, responses: 156 },
    { month: 'Feb', satisfaction: 4.1, responses: 142 },
    { month: 'Mar', satisfaction: 4.4, responses: 178 },
    { month: 'Apr', satisfaction: 4.3, responses: 165 },
    { month: 'May', satisfaction: 4.6, responses: 189 },
    { month: 'Jun', satisfaction: 4.5, responses: 201 },
    { month: 'Jul', satisfaction: 4.7, responses: 223 },
    { month: 'Aug', satisfaction: 4.4, responses: 198 },
    { month: 'Sep', satisfaction: 4.8, responses: 234 },
    { month: 'Oct', satisfaction: 4.6, responses: 212 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-clinical-modal">
          <p className="text-sm font-medium text-foreground mb-1">{`${label} 2024`}</p>
          <p className="text-sm text-primary">
            {`Satisfaction: ${payload?.[0]?.value}/5.0`}
          </p>
          <p className="text-sm text-muted-foreground">
            {`Responses: ${payload?.[0]?.payload?.responses}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`card-clinical ${className}`}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Patient Satisfaction Trend
        </h3>
        <p className="text-sm text-muted-foreground">
          Monthly satisfaction scores over the past 10 months
        </p>
      </div>
      
      <div className="w-full h-80" aria-label="Patient Satisfaction Trend Line Chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="month" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              domain={[3.5, 5.0]}
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="satisfaction" 
              stroke="var(--color-primary)" 
              strokeWidth={3}
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SatisfactionChart;