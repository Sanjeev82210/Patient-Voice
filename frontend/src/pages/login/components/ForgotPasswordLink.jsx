import React from 'react';
import Icon from '../../../components/AppIcon';

const ForgotPasswordLink = ({ onClick, className = '', isDarkMode = false }) => {
  const handleClick = (e) => {
    e?.preventDefault();
    if (onClick) {
      onClick();
    } else {
      // Default behavior - could navigate to forgot password page
      console.log('Forgot password clicked');
    }
  };

  return (
    <div className={`text-center ${className}`}>
      <button
        onClick={handleClick}
        className={`inline-flex items-center space-x-2 text-sm rounded px-2 py-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode
            ? 'text-blue-400 hover:text-blue-300'
            : 'text-primary hover:text-primary/80'
          }`}
      >
        <Icon name="HelpCircle" size={16} />
        <span>Forgot your password?</span>
      </button>

      <div className={`mt-2 text-xs ${isDarkMode ? 'text-gray-400' : 'text-muted-foreground'
        }`}>
        Contact your system administrator or IT support for password recovery
      </div>
    </div>
  );
};

export default ForgotPasswordLink;