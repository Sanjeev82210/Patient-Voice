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
    <div className={`card-clinical ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">
            {title}
          </p>
          <p className="text-2xl font-bold text-foreground mb-2">
            {value}
          </p>
          {change && (
            <div className="flex items-center space-x-1">
              <Icon 
                name={getTrendIcon()} 
                size={16} 
                className={getTrendColor()}
              />
              <span className={`text-sm font-medium ${getTrendColor()}`}>
                {change}
              </span>
              <span className="text-xs text-muted-foreground">
                vs last month
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
          <Icon name={icon} size={24} className="text-primary" />
        </div>
      </div>
    </div>
  );
};

export default KPICard;