import React, { useState, useEffect } from 'react';
import { Sun, Moon, Github, Twitter, Linkedin } from 'lucide-react';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import SecurityBadges from './components/SecurityBadges';
import ForgotPasswordLink from './components/ForgotPasswordLink';
import LoginErrorAlert from './components/LoginErrorAlert';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

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

    // Initialize theme based on user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
  }, []);

  // Create animated particles background
  useEffect(() => {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = isDarkMode
          ? `rgba(255, 255, 255, ${Math.random() * 0.3})`
          : `rgba(255, 255, 255, ${Math.random() * 0.5})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particles = [];
    const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 15000));

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const particle of particles) {
        particle.update();
        particle.draw();
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, [isDarkMode]);

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

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Handle social login
  const handleSocialLogin = (provider) => {
    alert(`${provider} login integration would be implemented here`);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-500 ${isDarkMode
      ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800'
      : 'bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-400'
      }`}>
      {/* Animated Particles Canvas */}
      <canvas
        id="particles-canvas"
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      ></canvas>

      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 group"
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? (
          <Sun size={20} className="text-yellow-300 group-hover:rotate-180 transition-transform duration-500" />
        ) : (
          <Moon size={20} className="text-white group-hover:rotate-12 transition-transform duration-300" />
        )}
      </button>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
        <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-blue-300/20 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse"></div>
      </div>

      <div className="w-full max-w-md relative" style={{ zIndex: 10 }}>
        {/* Main Login Card with Glassmorphism */}
        <div className={`backdrop-blur-xl rounded-3xl shadow-2xl border p-8 space-y-6 transform hover:scale-[1.01] transition-all duration-300 ${isDarkMode
          ? 'bg-gray-800/90 border-gray-700/50'
          : 'bg-white/95 border-white/20'
          }`}>
          {/* Header */}
          <LoginHeader isDarkMode={isDarkMode} />

          {/* Error Alert */}
          {error && (
            <div className="animate-shake">
              <LoginErrorAlert
                error={error}
                onDismiss={handleErrorDismiss}
              />
            </div>
          )}

          {/* Login Form */}
          <LoginForm
            onSubmit={handleLogin}
            loading={loading}
            isDarkMode={isDarkMode}
          />

          {/* Forgot Password Link */}
          <ForgotPasswordLink
            onClick={handleForgotPassword}
            isDarkMode={isDarkMode}
          />

          {/* Separator */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className={`w-full border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className={`px-2 ${isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'}`}>
                or continue with
              </span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => handleSocialLogin('GitHub')}
              className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-110 ${isDarkMode
                ? 'bg-gray-700 hover:bg-gray-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              aria-label="Sign in with GitHub"
            >
              <Github size={20} />
            </button>
            <button
              onClick={() => handleSocialLogin('Twitter')}
              className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-110 ${isDarkMode
                ? 'bg-blue-600 hover:bg-blue-500 text-white'
                : 'bg-blue-100 hover:bg-blue-200 text-blue-600'
                }`}
              aria-label="Sign in with Twitter"
            >
              <Twitter size={20} />
            </button>
            <button
              onClick={() => handleSocialLogin('LinkedIn')}
              className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-110 ${isDarkMode
                ? 'bg-blue-700 hover:bg-blue-600 text-white'
                : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
                }`}
              aria-label="Sign in with LinkedIn"
            >
              <Linkedin size={20} />
            </button>
          </div>

          {/* Sign Up Prompt */}
          <p className={`text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Don't have an account?{' '}
            <a href="#" className={`font-semibold hover:underline ${isDarkMode ? 'text-blue-400' : 'text-blue-600'
              }`}>
              Sign up
            </a>
          </p>

          {/* Demo Credentials with gradient */}
          <div className={`p-4 rounded-xl border shadow-sm ${isDarkMode
            ? 'bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-blue-800'
            : 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200'
            }`}>
            <p className={`text-xs text-center mb-3 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-text-secondary'
              }`}>🔑 Demo Login Credentials:</p>
            <div className="text-xs space-y-2">
              <div className={`flex justify-between p-2 rounded-lg transition-colors ${isDarkMode
                ? 'bg-gray-700/60 hover:bg-gray-700/80'
                : 'bg-white/60 hover:bg-white/80'
                }`}>
                <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  admin@hospital.com
                </span>
                <span className={`font-mono font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  admin123
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Security Information */}
        <div className="mt-8">
          <SecurityBadges isDarkMode={isDarkMode} />
        </div>

        {/* Footer Information */}
        <div className="mt-6 text-center">
          <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-white/90'}`}>
            © {new Date()?.getFullYear()} PatientVoice Healthcare Solutions. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4 mt-2">
            <button className="text-xs text-white/80 hover:text-white transition-colors">
              Privacy Policy
            </button>
            <span className="text-xs text-white/60">•</span>
            <button className="text-xs text-white/80 hover:text-white transition-colors">
              Terms of Service
            </button>
            <span className="text-xs text-white/60">•</span>
            <button className="text-xs text-white/80 hover:text-white transition-colors">
              Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;