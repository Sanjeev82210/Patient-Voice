import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({
  title,
  value,
  change,
  changeType,
  icon,
  trend = 'up',
  className = ''
}) => {
  const getTrendColor = () => {
    if (changeType === 'positive') {
      return trend === 'up' ? 'text-success' : 'text-error';
    } else if (changeType === 'negative') {
      return trend === 'up' ? 'text-error' : 'text-success';
    }
    return 'text-muted-foreground';
  };

  const getTrendIcon = () => {
    if (trend === 'up') return 'TrendingUp';
    if (trend === 'down') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className={`group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden ${className}`}>
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative z-10 flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">
            {title}
          </p>
          <p className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-3 animate-fade-in">
            {value}
          </p>
          {change && (
            <div className="flex items-center space-x-1 animate-fade-in-up">
              <Icon
                name={getTrendIcon()}
                size={16}
                className={getTrendColor()}
              />
              <span className={`text-sm font-bold ${getTrendColor()}`}>
                {change}
              </span>
              <span className="text-xs text-gray-500">
                vs last month
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300 animate-bounce-subtle">
          <Icon name={icon} size={28} className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default KPICard;