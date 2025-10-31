import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Icon from '../components/AppIcon';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 via-pink-50 to-purple-50 p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        <div className="absolute w-96 h-96 bg-red-200/20 rounded-full blur-3xl top-1/4 right-1/4 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-purple-200/20 rounded-full blur-3xl bottom-1/4 left-1/4 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="text-center max-w-md relative" style={{ zIndex: 1 }}>
        <div className="flex justify-center mb-6 animate-bounce-subtle">
          <div className="relative">
            <h1 className="text-9xl font-bold bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent opacity-50">
              404
            </h1>
          </div>
        </div>

        <div className="animate-fade-in">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist. Let's get you back!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              icon={<Icon name="ArrowLeft" />}
              iconPosition="left"
              onClick={() => window.history?.back()}
            >
              Go Back
            </Button>

            <Button
              variant="outline"
              icon={<Icon name="Home" />}
              iconPosition="left"
              onClick={handleGoHome}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
