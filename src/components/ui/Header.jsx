import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ className = '' }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
  };

  const handleLogout = () => {
    window.location.href = '/login';
  };

  return (
    <header className={`nav-healthcare fixed top-0 left-0 right-0 z-50 h-16 ${className}`}>
      <div className="flex items-center justify-between h-full px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-8">
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => handleNavigation('/feedback-dashboard')}
          >
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <Icon name="Heart" size={24} color="white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-foreground">PatientVoice</span>
              <span className="text-xs text-muted-foreground hidden sm:block">Healthcare Feedback</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`nav-item-healthcare relative ${
                  currentPath === item?.path ? 'nav-item-active' : ''
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.label}</span>
                  {item?.badge && (
                    <span className="alert-badge pulse-ambient">
                      {item?.badge}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </nav>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* More Menu - Desktop */}
          <div className="hidden lg:block relative">
            <Button
              variant="ghost"
              size="sm"
              iconName="MoreHorizontal"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              More
            </Button>
            
            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-md shadow-clinical-modal z-60 animate-fade-in">
                <div className="py-1">
                  {moreItems?.map((item) => (
                    <button
                      key={item?.path}
                      onClick={() => handleNavigation(item?.path)}
                      className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted flex items-center space-x-2 clinical-transition"
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.label}</span>
                    </button>
                  ))}
                </div>
              </div>
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
          <div className="relative">
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
              <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-md shadow-clinical-modal z-60 animate-fade-in">
                <div className="px-4 py-3 border-b border-border">
                  <div className="text-sm font-medium text-foreground">Dr. Sarah Johnson</div>
                  <div className="text-xs text-muted-foreground">sarah.johnson@hospital.com</div>
                  <div className="text-xs text-muted-foreground mt-1">Quality Manager • Cardiology</div>
                </div>
                <div className="py-1">
                  <button className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted flex items-center space-x-2 clinical-transition">
                    <Icon name="User" size={16} />
                    <span>Profile Settings</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted flex items-center space-x-2 clinical-transition">
                    <Icon name="Settings" size={16} />
                    <span>Preferences</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted flex items-center space-x-2 clinical-transition">
                    <Icon name="HelpCircle" size={16} />
                    <span>Help & Support</span>
                  </button>
                  <div className="border-t border-border my-1"></div>
                  <button 
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-error hover:bg-muted flex items-center space-x-2 clinical-transition"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
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
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border shadow-clinical-modal animate-slide-in">
          <div className="px-4 py-3 space-y-1">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`w-full flex items-center justify-between p-3 rounded-md text-left clinical-transition ${
                  currentPath === item?.path 
                    ? 'bg-muted text-primary' :'text-foreground hover:bg-muted'
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
      )}
    </header>
  );
};

export default Header;