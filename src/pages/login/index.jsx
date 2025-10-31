import React, { useState, useEffect } from 'react';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import SecurityBadges from './components/SecurityBadges';
import ForgotPasswordLink from './components/ForgotPasswordLink';
import LoginErrorAlert from './components/LoginErrorAlert';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock credentials for demo
  const mockCredentials = [
    { email: 'admin@hospital.com', password: 'admin123', role: 'Administrator' },
    { email: 'doctor@hospital.com', password: 'doctor123', role: 'Doctor' },
    { email: 'manager@hospital.com', password: 'manager123', role: 'Quality Manager' },
    { email: 'staff@hospital.com', password: 'staff123', role: 'Healthcare Staff' }
  ];

  useEffect(() => {
    // Clear any existing session data
    localStorage.removeItem('userSession');
    document.title = 'PatientVoice - Healthcare Login';
  }, []);

  const handleLogin = async (formData) => {
    setLoading(true);
    setError('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Validate credentials
      const user = mockCredentials?.find(
        cred => cred?.email === formData?.email && cred?.password === formData?.password
      );

      if (!user) {
        throw new Error('Invalid email or password. Please check your credentials and try again.');
      }

      // Create session
      const sessionData = {
        user: {
          email: user?.email,
          role: user?.role,
          name: user?.role === 'Administrator' ? 'Dr. Sarah Johnson' : 
                user?.role === 'Doctor' ? 'Dr. Michael Chen' :
                user?.role === 'Quality Manager' ? 'Lisa Rodriguez' : 'John Smith',
          loginTime: new Date()?.toISOString()
        },
        token: 'mock-jwt-token-' + Date.now()
      };

      localStorage.setItem('userSession', JSON.stringify(sessionData));

      // Redirect to dashboard
      window.location.href = '/feedback-dashboard';

    } catch (err) {
      setError(err?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setError('');
    alert('Please contact your system administrator at support@hospital.com or call (555) 123-4567 for password recovery assistance.');
  };

  const handleErrorDismiss = () => {
    setError('');
  };

  return (
    <div className="min-h-screen bg-healthcare-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Main Login Card */}
        <div className="card-clinical space-y-8">
          {/* Header */}
          <LoginHeader />

          {/* Error Alert */}
          {error && (
            <LoginErrorAlert 
              error={error} 
              onDismiss={handleErrorDismiss}
            />
          )}

          {/* Login Form */}
          <LoginForm 
            onSubmit={handleLogin}
            loading={loading}
          />

          {/* Forgot Password Link */}
          <ForgotPasswordLink 
            onClick={handleForgotPassword}
          />
        </div>

        {/* Security Information */}
        <div className="mt-8">
          <SecurityBadges />
        </div>

        {/* Footer Information */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date()?.getFullYear()} PatientVoice Healthcare Solutions. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4 mt-2">
            <button className="text-xs text-muted-foreground hover:text-foreground clinical-transition">
              Privacy Policy
            </button>
            <span className="text-xs text-muted-foreground">•</span>
            <button className="text-xs text-muted-foreground hover:text-foreground clinical-transition">
              Terms of Service
            </button>
            <span className="text-xs text-muted-foreground">•</span>
            <button className="text-xs text-muted-foreground hover:text-foreground clinical-transition">
              Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;