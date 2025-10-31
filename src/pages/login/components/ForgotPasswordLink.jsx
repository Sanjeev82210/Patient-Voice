import React from 'react';
import Icon from '../../../components/AppIcon';

const ForgotPasswordLink = ({ onClick, className = '' }) => {
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
        className="inline-flex items-center space-x-2 text-sm text-primary hover:text-primary/80 clinical-transition focus-clinical rounded px-2 py-1"
      >
        <Icon name="HelpCircle" size={16} />
        <span>Forgot your password?</span>
      </button>
      
      <div className="mt-2 text-xs text-muted-foreground">
        Contact your system administrator or IT support for password recovery
      </div>
    </div>
  );
};

export default ForgotPasswordLink;