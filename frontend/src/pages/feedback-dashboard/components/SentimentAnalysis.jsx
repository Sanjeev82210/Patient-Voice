import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';

const SentimentAnalysis = ({ className = '' }) => {
  const sentimentData = [
    { name: 'Positive', value: 68, count: 456, color: 'var(--color-success)' },
    { name: 'Neutral', value: 22, count: 148, color: 'var(--color-secondary)' },
    { name: 'Negative', value: 10, count: 67, color: 'var(--color-error)' }
  ];

  const totalFeedback = sentimentData?.reduce((sum, item) => sum + item?.count, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-clinical-modal">
          <p className="text-sm font-medium text-foreground mb-1">{data?.name} Sentiment</p>
          <p className="text-sm text-primary mb-1">
            {`${data?.value}% (${data?.count} responses)`}
          </p>
        </div>
      );
    }
    return null;
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'Positive': return 'ThumbsUp';
      case 'Neutral': return 'Minus';
      case 'Negative': return 'ThumbsDown';
      default: return 'MessageSquare';
    }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'Positive': return 'text-success';
      case 'Neutral': return 'text-secondary';
      case 'Negative': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className={`bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-blue-100 shadow-lg ${className}`}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Sentiment Analysis
        </h3>
        <p className="text-sm text-gray-600">
          Patient feedback sentiment distribution this month
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="w-full h-64" aria-label="Sentiment Analysis Pie Chart">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sentimentData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {sentimentData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Sentiment Breakdown */}
        <div className="space-y-4">
          {sentimentData?.map((item) => (
            <div key={item?.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-muted ${getSentimentColor(item?.name)}`}>
                  <Icon name={getSentimentIcon(item?.name)} size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {item?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item?.count} responses
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-foreground">
                  {item?.value}%
                </p>
              </div>
            </div>
          ))}

          <div className="mt-4 p-3 bg-primary/10 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                Total Feedback
              </span>
              <span className="text-lg font-bold text-primary">
                {totalFeedback?.toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Analyzed responses this month
            </p>
          </div>
        </div>
      </div>
      {/* Key Insights */}
      <div className="mt-6 pt-4 border-t border-border">
        <h4 className="text-sm font-semibold text-foreground mb-3">Key Insights</h4>
        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <Icon name="TrendingUp" size={14} className="text-success mt-0.5" />
            <p className="text-xs text-muted-foreground">
              Positive sentiment increased by 5% compared to last month
            </p>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="AlertCircle" size={14} className="text-warning mt-0.5" />
            <p className="text-xs text-muted-foreground">
              Most negative feedback relates to wait times in Emergency Department
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentimentAnalysis;