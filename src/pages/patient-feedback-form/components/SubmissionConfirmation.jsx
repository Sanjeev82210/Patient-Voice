import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/CheckBox';

const SubmissionConfirmation = ({
  onSubmit,
  onBack,
  isSubmitting = false,
  formData = {},
  isAnonymous = false
}) => {
  const [followUpPreferences, setFollowUpPreferences] = useState({
    emailUpdates: false,
    phoneContact: false,
    surveyParticipation: false
  });

  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = () => {
    if (!agreedToTerms) return;

    const submissionData = {
      ...formData,
      followUpPreferences: isAnonymous ? {} : followUpPreferences,
      submittedAt: new Date()?.toISOString(),
      isAnonymous
    };

    onSubmit(submissionData);
  };

  const handlePreferenceChange = (preference, checked) => {
    setFollowUpPreferences(prev => ({
      ...prev,
      [preference]: checked
    }));
  };

  return (
    <div className="card-clinical">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Send" size={32} className="text-primary" />
        </div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Ready to Submit Your Feedback
        </h2>
        <p className="text-muted-foreground">
          Thank you for taking the time to share your healthcare experience with us
        </p>
      </div>
      {/* Submission Summary */}
      <div className="bg-muted/50 rounded-lg p-4 mb-6">
        <h3 className="font-medium text-foreground mb-3">Feedback Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Submission Type:</span>
            <div className="font-medium text-foreground">
              {isAnonymous ? 'Anonymous' : 'Identified'}
            </div>
          </div>
          <div>
            <span className="text-muted-foreground">Visit Date:</span>
            <div className="font-medium text-foreground">
              {formData?.visitDate || 'Not specified'}
            </div>
          </div>
          <div>
            <span className="text-muted-foreground">Department:</span>
            <div className="font-medium text-foreground">
              {formData?.department || 'Not specified'}
            </div>
          </div>
          <div>
            <span className="text-muted-foreground">Visit Type:</span>
            <div className="font-medium text-foreground">
              {formData?.visitType || 'Not specified'}
            </div>
          </div>
        </div>
      </div>
      {/* Follow-up Preferences - Only for identified submissions */}
      {!isAnonymous && (
        <div className="mb-6">
          <h3 className="font-medium text-foreground mb-3">Follow-up Preferences (Optional)</h3>
          <div className="space-y-3">
            <Checkbox
              label="Email me updates about improvements made based on feedback"
              description="Receive quarterly updates about quality improvements"
              checked={followUpPreferences?.emailUpdates}
              onChange={(e) => handlePreferenceChange('emailUpdates', e?.target?.checked)}
            />

            <Checkbox
              label="Allow phone contact for clarification if needed"
              description="Our quality team may contact you for additional details"
              checked={followUpPreferences?.phoneContact}
              onChange={(e) => handlePreferenceChange('phoneContact', e?.target?.checked)}
            />

            <Checkbox
              label="Participate in future patient experience surveys"
              description="Help us continue improving by participating in follow-up surveys"
              checked={followUpPreferences?.surveyParticipation}
              onChange={(e) => handlePreferenceChange('surveyParticipation', e?.target?.checked)}
            />
          </div>
        </div>
      )}
      {/* Terms Agreement */}
      <div className="mb-6">
        <Checkbox
          label="I agree to the terms and conditions"
          description="I understand that my feedback will be used for quality improvement purposes and handled according to privacy policies"
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e?.target?.checked)}
          required
        />
      </div>
      {/* Privacy Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 mb-1">Your Privacy is Protected</h4>
            <p className="text-sm text-blue-800">
              Your feedback is processed securely and used solely for healthcare quality improvement.
              We comply with HIPAA regulations and will never share your personal information without consent.
            </p>
          </div>
        </div>
      </div>
      {/* What Happens Next */}
      <div className="mb-6">
        <h3 className="font-medium text-foreground mb-3">What Happens Next?</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span>Your feedback will be reviewed by our quality improvement team</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span>Issues requiring immediate attention will be addressed within 24 hours</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span>Your input helps us improve care for all patients</span>
          </div>
          {!isAnonymous && (
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span>You may receive a follow-up within 3-5 business days if needed</span>
            </div>
          )}
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="outline"
          onClick={onBack}
          disabled={isSubmitting}
          iconName="ArrowLeft"
          iconPosition="left"
          className="flex-1"
        >
          Back to Review
        </Button>

        <Button
          variant="default"
          onClick={handleSubmit}
          disabled={!agreedToTerms || isSubmitting}
          loading={isSubmitting}
          iconName="Send"
          iconPosition="right"
          className="flex-1"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </Button>
      </div>
      {/* Submission Note */}
      <p className="text-xs text-muted-foreground text-center mt-4">
        By submitting this feedback, you acknowledge that the information provided is accurate to the best of your knowledge.
      </p>
    </div>
  );
};

export default SubmissionConfirmation;