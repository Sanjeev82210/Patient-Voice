import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = ({ className = '', isDarkMode = false }) => {
  const securityFeatures = [
    {
      id: 'hipaa',
      icon: 'Shield',
      label: 'HIPAA Compliant',
      description: 'Healthcare data protection standards'
    },
    {
      id: 'encryption',
      icon: 'Lock',
      label: '256-bit Encryption',
      description: 'End-to-end data security'
    },
    {
      id: 'audit',
      icon: 'FileCheck',
      label: 'Audit Trail',
      description: 'Complete access logging'
    }
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="text-center">
        <h3 className="text-sm font-semibold text-white mb-3 drop-shadow-lg">
          Healthcare Security Standards
        </h3>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {securityFeatures?.map((feature) => (
          <div
            key={feature?.id}
            className="flex items-center space-x-3 p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300"
          >
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                <Icon name={feature?.icon} size={18} color="white" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-white drop-shadow">
                {feature?.label}
              </div>
              <div className="text-xs text-white/80">
                {feature?.description}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center pt-2">
        <p className="text-xs text-white/70 font-medium">
          Trusted by 500+ healthcare facilities nationwide
        </p>
      </div>
    </div>
  );
};

export default SecurityBadges;