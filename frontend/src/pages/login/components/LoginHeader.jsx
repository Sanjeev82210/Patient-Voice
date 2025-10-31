import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = ({ className = '', isDarkMode = false }) => {
  return (
    <div className={`text-center space-y-4 ${className}`}>
      {/* Logo */}
      <div className="flex justify-center">
        <div className="flex items-center space-x-3">
          <div className={`flex items-center justify-center w-12 h-12 rounded-xl shadow-lg transition-all duration-300 ${isDarkMode
              ? 'bg-gradient-to-br from-blue-500 to-cyan-500'
              : 'bg-primary'
            }`}>
            <Icon name="Heart" size={28} color="white" className="animate-pulse" />
          </div>
          <div className="text-left">
            <h1 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-foreground'
              }`}>PatientVoice</h1>
            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-muted-foreground'
              }`}>Healthcare Feedback Management</p>
          </div>
        </div>
      </div>
      {/* Welcome Message */}
      <div className="space-y-2">
        <h2 className={`text-xl font-medium ${isDarkMode ? 'text-white' : 'text-foreground'
          }`}>
          Welcome Back
        </h2>
        <p className={`text-sm max-w-md mx-auto ${isDarkMode ? 'text-gray-300' : 'text-muted-foreground'
          }`}>
          Sign in to access your healthcare feedback dashboard and manage patient experience data securely.
        </p>
      </div>
      {/* Current Date/Time for Healthcare Context */}
      <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs ${isDarkMode
          ? 'bg-gray-700 text-gray-300'
          : 'bg-muted text-muted-foreground'
        }`}>
        <Icon name="Clock" size={14} />
        <span>{new Date()?.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}</span>
      </div>
    </div>
  );
};

export default LoginHeader;