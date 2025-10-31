import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginErrorAlert = ({ error, onDismiss, className = '' }) => {
  if (!error) return null;

  const getErrorIcon = () => {
    if (error?.includes('network') || error?.includes('connection')) {
      return 'Wifi';
    }
    if (error?.includes('credentials') || error?.includes('password')) {
      return 'AlertCircle';
    }
    return 'AlertTriangle';
  };

  const getErrorTitle = () => {
    if (error?.includes('network') || error?.includes('connection')) {
      return 'Connection Error';
    }
    if (error?.includes('credentials') || error?.includes('password')) {
      return 'Invalid Credentials';
    }
    return 'Authentication Error';
  };

  return (
    <div className={`bg-error/10 border border-error/20 rounded-lg p-4 ${className}`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-error rounded-full flex items-center justify-center">
            <Icon name={getErrorIcon()} size={16} color="white" />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-error mb-1">
            {getErrorTitle()}
          </h4>
          <p className="text-sm text-error/80">
            {error}
          </p>
          
          {error?.includes('credentials') && (
            <div className="mt-2 text-xs text-muted-foreground">
              <p>Demo credentials:</p>
              <p>Email: admin@hospital.com | Password: admin123</p>
              <p>Email: doctor@hospital.com | Password: doctor123</p>
            </div>
          )}
        </div>
        
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 text-error hover:text-error/80 clinical-transition focus-clinical rounded p-1"
            aria-label="Dismiss error"
          >
            <Icon name="X" size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default LoginErrorAlert;