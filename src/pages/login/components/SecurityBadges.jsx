import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = ({ className = '' }) => {
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
        <h3 className="text-sm font-medium text-foreground mb-3">
          Healthcare Security Standards
        </h3>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {securityFeatures?.map((feature) => (
          <div
            key={feature?.id}
            className="flex items-center space-x-3 p-3 bg-muted rounded-lg border border-border"
          >
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                <Icon name={feature?.icon} size={16} color="white" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-foreground">
                {feature?.label}
              </div>
              <div className="text-xs text-muted-foreground">
                {feature?.description}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center pt-2">
        <p className="text-xs text-muted-foreground">
          Trusted by 500+ healthcare facilities nationwide
        </p>
      </div>
    </div>
  );
};

export default SecurityBadges;