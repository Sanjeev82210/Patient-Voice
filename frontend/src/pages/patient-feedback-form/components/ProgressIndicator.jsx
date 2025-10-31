import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ 
  currentStep = 1, 
  totalSteps = 4, 
  completedSections = [],
  estimatedTimeRemaining = 5 
}) => {
  const steps = [
    { id: 1, label: 'Patient Info', icon: 'User' },
    { id: 2, label: 'Experience Rating', icon: 'Star' },
    { id: 3, label: 'Additional Feedback', icon: 'MessageSquare' },
    { id: 4, label: 'Review & Submit', icon: 'CheckCircle' }
  ];

  const progressPercentage = (completedSections?.length / totalSteps) * 100;

  const getStepStatus = (stepId) => {
    if (completedSections?.includes(stepId)) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'upcoming';
  };

  const getStepClasses = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground border-success';
      case 'current':
        return 'bg-primary text-primary-foreground border-primary';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="card-clinical">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Feedback Progress</h2>
        <div className="text-sm text-muted-foreground">
          <Icon name="Clock" size={16} className="inline mr-1" />
          ~{estimatedTimeRemaining} min remaining
        </div>
      </div>
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Progress</span>
          <span>{Math.round(progressPercentage)}% complete</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full clinical-transition"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
      {/* Step Indicators */}
      <div className="space-y-3">
        {steps?.map((step, index) => {
          const status = getStepStatus(step?.id);
          const isLast = index === steps?.length - 1;

          return (
            <div key={step?.id} className="flex items-center">
              {/* Step Circle */}
              <div className={`
                flex items-center justify-center w-8 h-8 rounded-full border-2 clinical-transition
                ${getStepClasses(status)}
              `}>
                {status === 'completed' ? (
                  <Icon name="Check" size={16} />
                ) : (
                  <Icon name={step?.icon} size={16} />
                )}
              </div>
              {/* Step Label */}
              <div className="ml-3 flex-1">
                <div className={`text-sm font-medium ${
                  status === 'current' ? 'text-primary' : 
                  status === 'completed' ? 'text-success' : 'text-muted-foreground'
                }`}>
                  {step?.label}
                </div>
                {status === 'current' && (
                  <div className="text-xs text-muted-foreground">
                    Currently active
                  </div>
                )}
              </div>
              {/* Status Icon */}
              <div className="ml-2">
                {status === 'completed' && (
                  <Icon name="CheckCircle2" size={16} className="text-success" />
                )}
                {status === 'current' && (
                  <Icon name="ArrowRight" size={16} className="text-primary" />
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* Completion Message */}
      {progressPercentage === 100 && (
        <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-md">
          <div className="flex items-center space-x-2 text-success">
            <Icon name="CheckCircle" size={16} />
            <span className="text-sm font-medium">Ready to submit!</span>
          </div>
          <p className="text-xs text-success/80 mt-1">
            All sections completed. Please review and submit your feedback.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProgressIndicator;