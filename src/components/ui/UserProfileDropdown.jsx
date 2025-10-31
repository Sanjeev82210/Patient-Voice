import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const UserProfileDropdown = ({ 
  user = {
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@hospital.com',
    role: 'Quality Manager',
    department: 'Cardiology',
    avatar: null
  },
  onLogout,
  className = '' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = (action) => {
    setIsOpen(false);
    if (action === 'logout' && onLogout) {
      onLogout();
    }
  };

  const menuItems = [
    {
      id: 'profile',
      label: 'Profile Settings',
      icon: 'User',
      action: 'profile'
    },
    {
      id: 'preferences',
      label: 'Preferences',
      icon: 'Settings',
      action: 'preferences'
    },
    {
      id: 'help',
      label: 'Help & Support',
      icon: 'HelpCircle',
      action: 'help'
    }
  ];

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Profile Trigger Button */}
      <button
        onClick={handleToggle}
        className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted clinical-transition focus-clinical"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {/* Avatar */}
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
          {user?.avatar ? (
            <img 
              src={user?.avatar} 
              alt={user?.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <Icon name="User" size={18} color="white" />
          )}
        </div>

        {/* User Info - Hidden on mobile */}
        <div className="hidden md:block text-left min-w-0 flex-1">
          <div className="text-sm font-medium text-foreground truncate">
            {user?.name}
          </div>
          <div className="text-xs text-muted-foreground truncate">
            {user?.role}
          </div>
        </div>

        {/* Chevron - Hidden on mobile */}
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`hidden md:block clinical-transition ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-popover border border-border rounded-md shadow-clinical-modal z-70 animate-fade-in">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-border">
            <div className="text-sm font-medium text-foreground">
              {user?.name}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {user?.email}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {user?.role} • {user?.department}
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            {menuItems?.map((item) => (
              <button
                key={item?.id}
                onClick={() => handleMenuClick(item?.action)}
                className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted flex items-center space-x-2 clinical-transition"
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </button>
            ))}

            {/* Divider */}
            <div className="border-t border-border my-1"></div>

            {/* Logout Button */}
            <button
              onClick={() => handleMenuClick('logout')}
              className="w-full px-4 py-2 text-left text-sm text-error hover:bg-muted flex items-center space-x-2 clinical-transition"
            >
              <Icon name="LogOut" size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;