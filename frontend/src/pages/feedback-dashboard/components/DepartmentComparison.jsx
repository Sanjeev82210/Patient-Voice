import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DepartmentComparison = ({ className = '' }) => {
  const departmentData = [
    {
      department: 'Emergency',
      satisfaction: 4.1,
      responses: 89,
      avgRating: 4.1
    },
    {
      department: 'Cardiology',
      satisfaction: 4.7,
      responses: 156,
      avgRating: 4.7
    },
    {
      department: 'Pediatrics',
      satisfaction: 4.8,
      responses: 134,
      avgRating: 4.8
    },
    {
      department: 'Surgery',
      satisfaction: 4.5,
      responses: 98,
      avgRating: 4.5
    },
    {
      department: 'Maternity',
      satisfaction: 4.6,
      responses: 112,
      avgRating: 4.6
    },
    {
      department: 'Radiology',
      satisfaction: 4.3,
      responses: 76,
      avgRating: 4.3
    }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-clinical-modal">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          <p className="text-sm text-primary mb-1">
            {`Satisfaction: ${data?.satisfaction}/5.0`}
          </p>
          <p className="text-sm text-muted-foreground">
            {`Total Responses: ${data?.responses}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-blue-100 shadow-lg ${className}`}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Department Satisfaction Comparison
        </h3>
        <p className="text-sm text-gray-600">
          Average satisfaction scores by department this month
        </p>
      </div>
      <div className="w-full h-80" aria-label="Department Satisfaction Comparison Bar Chart">
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
              domain={[3.5, 5.0]}
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="satisfaction"
              fill="var(--color-primary)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-2 lg:grid-cols-3 gap-4">
        {departmentData?.map((dept) => (
          <div key={dept?.department} className="text-center p-3 bg-muted/30 rounded-lg">
            <p className="text-xs font-medium text-muted-foreground mb-1">
              {dept?.department}
            </p>
            <p className="text-lg font-bold text-foreground">
              {dept?.satisfaction}
            </p>
            <p className="text-xs text-muted-foreground">
              {dept?.responses} responses
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentComparison;