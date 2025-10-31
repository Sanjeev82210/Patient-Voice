import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SentimentAnalysisChart = ({ className = '' }) => {
  const [viewType, setViewType] = useState('pie'); // pie, bar, trend

  const sentimentData = [
    { name: 'Positive', value: 68, count: 2720, color: '#10B981' },
    { name: 'Neutral', value: 22, count: 880, color: '#F59E0B' },
    { name: 'Negative', value: 10, count: 400, color: '#EF4444' }
  ];

  const sentimentByCategory = [
    {
      category: 'Medical Care',
      positive: 75,
      neutral: 18,
      negative: 7,
      total: 850
    },
    {
      category: 'Staff Behavior',
      positive: 72,
      neutral: 20,
      negative: 8,
      total: 920
    },
    {
      category: 'Wait Times',
      positive: 45,
      neutral: 35,
      negative: 20,
      total: 1100
    },
    {
      category: 'Communication',
      positive: 70,
      neutral: 22,
      negative: 8,
      total: 780
    },
    {
      category: 'Facility',
      positive: 65,
      neutral: 25,
      negative: 10,
      total: 650
    },
    {
      category: 'Billing',
      positive: 55,
      neutral: 30,
      negative: 15,
      total: 700
    }
  ];

  const sentimentTrend = [
    { month: 'May', positive: 65, neutral: 25, negative: 10 },
    { month: 'Jun', positive: 67, neutral: 23, negative: 10 },
    { month: 'Jul', positive: 70, neutral: 22, negative: 8 },
    { month: 'Aug', positive: 66, neutral: 24, negative: 10 },
    { month: 'Sep', positive: 72, neutral: 20, negative: 8 },
    { month: 'Oct', positive: 68, neutral: 22, negative: 10 }
  ];

  const keyPhrases = {
    positive: [
      { phrase: "excellent care", count: 245 },
      { phrase: "professional staff", count: 198 },
      { phrase: "clean facility", count: 167 },
      { phrase: "quick service", count: 134 },
      { phrase: "helpful nurses", count: 112 }
    ],
    negative: [
      { phrase: "long wait", count: 89 },
      { phrase: "rude staff", count: 67 },
      { phrase: "poor communication", count: 54 },
      { phrase: "billing issues", count: 43 },
      { phrase: "uncomfortable", count: 38 }
    ]
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg shadow-clinical-modal p-3">
          <p className="text-sm font-medium text-foreground mb-2">{data?.name}</p>
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Percentage:</span>
              <span className="text-sm font-medium text-foreground">{data?.value}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Count:</span>
              <span className="text-sm font-medium text-foreground">{data?.count?.toLocaleString()}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderPieChart = () => (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={sentimentData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}%`}
            outerRadius={100}
            fill="#8884d8"
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
  );

  const renderBarChart = () => (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={sentimentByCategory} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis 
            dataKey="category" 
            stroke="var(--color-muted-foreground)"
            fontSize={12}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
          <Tooltip />
          <Bar dataKey="positive" stackId="a" fill="#10B981" name="Positive" />
          <Bar dataKey="neutral" stackId="a" fill="#F59E0B" name="Neutral" />
          <Bar dataKey="negative" stackId="a" fill="#EF4444" name="Negative" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  const renderTrendChart = () => (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={sentimentTrend} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
          <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
          <Tooltip />
          <Bar dataKey="positive" fill="#10B981" name="Positive %" />
          <Bar dataKey="neutral" fill="#F59E0B" name="Neutral %" />
          <Bar dataKey="negative" fill="#EF4444" name="Negative %" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className={`card-clinical ${className}`}>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
            <Icon name="MessageCircle" size={20} className="text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Sentiment Analysis</h3>
            <p className="text-sm text-muted-foreground">Patient feedback sentiment distribution</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant={viewType === 'pie' ? 'default' : 'outline'}
            size="sm"
            iconName="PieChart"
            onClick={() => setViewType('pie')}
          >
            Overview
          </Button>
          <Button
            variant={viewType === 'bar' ? 'default' : 'outline'}
            size="sm"
            iconName="BarChart3"
            onClick={() => setViewType('bar')}
          >
            By Category
          </Button>
          <Button
            variant={viewType === 'trend' ? 'default' : 'outline'}
            size="sm"
            iconName="TrendingUp"
            onClick={() => setViewType('trend')}
          >
            Trend
          </Button>
        </div>
      </div>
      {/* Chart Display */}
      {viewType === 'pie' && renderPieChart()}
      {viewType === 'bar' && renderBarChart()}
      {viewType === 'trend' && renderTrendChart()}
      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sentiment Summary */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Sentiment Summary</h4>
            <div className="space-y-2">
              {sentimentData?.map((item) => (
                <div key={item?.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item?.color }}
                    />
                    <span className="text-sm text-foreground">{item?.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">{item?.value}%</div>
                    <div className="text-xs text-muted-foreground">{item?.count?.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Positive Phrases */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3 flex items-center space-x-1">
              <Icon name="ThumbsUp" size={14} className="text-emerald-600" />
              <span>Top Positive Phrases</span>
            </h4>
            <div className="space-y-2">
              {keyPhrases?.positive?.slice(0, 5)?.map((phrase, index) => (
                <div key={phrase?.phrase} className="flex items-center justify-between">
                  <span className="text-sm text-foreground">"{phrase?.phrase}"</span>
                  <span className="text-xs text-muted-foreground">{phrase?.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Negative Phrases */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3 flex items-center space-x-1">
              <Icon name="ThumbsDown" size={14} className="text-red-600" />
              <span>Top Negative Phrases</span>
            </h4>
            <div className="space-y-2">
              {keyPhrases?.negative?.slice(0, 5)?.map((phrase, index) => (
                <div key={phrase?.phrase} className="flex items-center justify-between">
                  <span className="text-sm text-foreground">"{phrase?.phrase}"</span>
                  <span className="text-xs text-muted-foreground">{phrase?.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentimentAnalysisChart;