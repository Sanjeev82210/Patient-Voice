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
    <div className={`bg-red-900/30 border-2 border-red-500/50 rounded-lg p-4 backdrop-blur-sm ${className}`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
            <Icon name={getErrorIcon()} size={16} color="white" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold text-white mb-1">
            {getErrorTitle()}
          </h4>
          <p className="text-sm text-white/90 font-medium">
            {error}
          </p>

          {error?.includes('credentials') && (
            <div className="mt-2 text-xs text-gray-300">
              <p>Demo credentials:</p>
              <p>Email: admin@hospital.com | Password: admin123</p>
              <p>Email: doctor@hospital.com | Password: doctor123</p>
            </div>
          )}
        </div>

        {onDismiss && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 text-white hover:text-gray-300 clinical-transition focus-clinical rounded p-1"
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