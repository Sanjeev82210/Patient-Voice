import React, { useState, useEffect, useRef } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ className = '' }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const profileRef = useRef(null);
  const moreRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (moreRef.current && !moreRef.current.contains(event.target)) {
        setIsMoreOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/feedback-dashboard',
      icon: 'LayoutDashboard',
      badge: 3
    },
    {
      label: 'Feedback',
      path: '/feedback-management',
      icon: 'MessageSquare',
      badge: 12
    },
    {
      label: 'Analytics',
      path: '/feedback-analytics',
      icon: 'BarChart3',
      badge: null
    },
    {
      label: 'Overview',
      path: '/analytics-overview',
      icon: 'PieChart',
      badge: null
    },
    {
      label: 'Reports',
      path: '/reports',
      icon: 'FileText',
      badge: null
    }
  ];

  const moreItems = [
    {
      label: 'Patient Form',
      path: '/patient-feedback-form',
      icon: 'ClipboardList'
    }
  ];

  const currentPath = window.location?.pathname;

  const handleNavigation = (path) => {
    window.location.href = path;
    setIsMobileMenuOpen(false);
  };

  const handleProfileToggle = () => {
    setIsProfileOpen(!isProfileOpen);
    if (!isProfileOpen) {
      setIsMoreOpen(false); // Close More menu when opening Profile
    }
  };

  const handleMoreToggle = () => {
    setIsMoreOpen(!isMoreOpen);
    if (!isMoreOpen) {
      setIsProfileOpen(false); // Close Profile menu when opening More
    }
  };

  const handleLogout = () => {
    window.location.href = '/login';
  };

  return (
    <header className={`backdrop-blur-lg bg-white/80 border-b border-gray-200/50 sticky top-0 z-[100] h-16 shadow-lg ${className}`}>
      <div className="flex items-center justify-between h-full px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-8">
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => handleNavigation('/feedback-dashboard')}
          >
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Icon name="Heart" size={24} color="white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">PatientVoice</span>
              <span className="text-xs text-gray-500 hidden sm:block font-medium">Healthcare Feedback</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 ${currentPath === item?.path
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
                {item?.badge && (
                  <span className="alert-badge pulse-ambient">
                    {item?.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* More Menu - Desktop */}
          <div className="hidden lg:block relative" ref={moreRef}>
            <Button
              variant="ghost"
              size="sm"
              iconName="MoreHorizontal"
              onClick={handleMoreToggle}
            >
              More
            </Button>

            {isMoreOpen && (
              <>
                {/* Backdrop overlay */}
                <div
                  className="fixed inset-0 z-[10000]"
                  onClick={() => setIsMoreOpen(false)}
                />
                {/* Dropdown menu */}
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-2xl z-[10001] animate-fade-in">
                  <div className="py-1">
                    {moreItems?.map((item) => (
                      <button
                        key={item?.path}
                        onClick={() => handleNavigation(item?.path)}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 flex items-center space-x-2 transition-colors duration-200 rounded-lg mx-1"
                      >
                        <Icon name={item?.icon} size={16} />
                        <span>{item?.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            iconName="Bell"
            className="relative"
          >
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-white text-xs rounded-full flex items-center justify-center pulse-ambient">
              5
            </span>
          </Button>

          {/* User Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={handleProfileToggle}
              className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted clinical-transition focus-clinical"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={18} color="white" />
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium text-foreground">Dr. Sarah Johnson</div>
                <div className="text-xs text-muted-foreground">Quality Manager</div>
              </div>
              <Icon name="ChevronDown" size={16} className="hidden md:block" />
            </button>

            {isProfileOpen && (
              <>
                {/* Backdrop overlay */}
                <div
                  className="fixed inset-0 z-[10000]"
                  onClick={() => setIsProfileOpen(false)}
                />
                {/* Dropdown menu */}
                <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-2xl z-[10001] animate-fade-in">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <div className="text-sm font-medium text-gray-900">Dr. Sarah Johnson</div>
                    <div className="text-xs text-gray-500">sarah.johnson@hospital.com</div>
                    <div className="text-xs text-gray-500 mt-1">Quality Manager • Cardiology</div>
                  </div>
                  <div className="py-1">
                    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 flex items-center space-x-2 transition-colors duration-200 rounded-lg mx-1">
                      <Icon name="User" size={16} />
                      <span>Profile Settings</span>
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 flex items-center space-x-2 transition-colors duration-200 rounded-lg mx-1">
                      <Icon name="Settings" size={16} />
                      <span>Preferences</span>
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 flex items-center space-x-2 transition-colors duration-200 rounded-lg mx-1">
                      <Icon name="HelpCircle" size={16} />
                      <span>Help & Support</span>
                    </button>
                    <div className="border-t border-gray-200 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2 transition-colors duration-200 rounded-lg mx-1"
                    >
                      <Icon name="LogOut" size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            iconName="Menu"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {
        isMobileMenuOpen && (
          <div className="lg:hidden bg-card border-t border-border shadow-clinical-modal animate-slide-in">
            <div className="px-4 py-3 space-y-1">
              {navigationItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`w-full flex items-center justify-between p-3 rounded-md text-left clinical-transition ${currentPath === item?.path
                    ? 'bg-muted text-primary' : 'text-foreground hover:bg-muted'
                    }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon name={item?.icon} size={20} />
                    <span className="font-medium">{item?.label}</span>
                  </div>
                  {item?.badge && (
                    <span className="alert-badge">
                      {item?.badge}
                    </span>
                  )}
                </button>
              ))}

              <div className="border-t border-border my-2"></div>

              {moreItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className="w-full flex items-center space-x-3 p-3 rounded-md text-left text-foreground hover:bg-muted clinical-transition"
                >
                  <Icon name={item?.icon} size={20} />
                  <span className="font-medium">{item?.label}</span>
                </button>
              ))}
            </div>
          </div>
        )
      }
    </header >
  );
};

export default Header;