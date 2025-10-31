import React, { useState, useEffect } from 'react';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import PatientDemographics from './components/PatientDemographics';
import RatingSection from './components/RatingSection';
import ProgressIndicator from './components/ProgressIndicator';
import SentimentPreview from './components/SentimentPreview';
import SubmissionConfirmation from './components/SubmissionConfirmation';

const PatientFeedbackForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [formData, setFormData] = useState({
    // Demographics
    fullName: '',
    email: '',
    phone: '',
    patientId: '',
    ageRange: '',
    gender: '',
    visitType: '',
    department: '',
    visitDate: '',
    attendingPhysician: '',
    visitReason: ''
  });

  const [ratings, setRatings] = useState({
    medicalCare: 0,
    staffBehavior: 0,
    facilityCleanliness: 0,
    waitTimes: 0,
    communication: 0
  });

  const [comments, setComments] = useState({
    medicalCare: '',
    staffBehavior: '',
    facilityCleanliness: '',
    waitTimes: '',
    communication: '',
    overall: ''
  });

  const [errors, setErrors] = useState({});
  const [completedSections, setCompletedSections] = useState([]);

  // Rating categories configuration
  const ratingCategories = [
    {
      key: 'medicalCare',
      title: 'Medical Care Quality',
      description: 'Rate the quality of medical treatment, diagnosis accuracy, and clinical expertise you received',
      required: true
    },
    {
      key: 'staffBehavior',
      title: 'Staff Behavior & Attitude',
      description: 'Evaluate the professionalism, courtesy, and helpfulness of our medical and support staff',
      required: true
    },
    {
      key: 'facilityCleanliness',
      title: 'Facility Cleanliness',
      description: 'Assess the cleanliness and hygiene standards of patient rooms, waiting areas, and facilities',
      required: false
    },
    {
      key: 'waitTimes',
      title: 'Wait Times & Scheduling',
      description: 'Rate your experience with appointment scheduling, wait times, and overall efficiency',
      required: false
    },
    {
      key: 'communication',
      title: 'Communication Quality',
      description: 'Evaluate how well staff explained procedures, answered questions, and kept you informed',
      required: true
    }
  ];

  // Calculate overall sentiment based on ratings and comments
  const calculateSentiment = () => {
    const ratingValues = Object.values(ratings)?.filter(rating => rating > 0);
    if (ratingValues?.length === 0) return 'neutral';

    const averageRating = ratingValues?.reduce((sum, rating) => sum + rating, 0) / ratingValues?.length;

    // Analyze comment sentiment (simplified)
    const commentText = Object.values(comments)?.join(' ')?.toLowerCase();
    const positiveWords = ['excellent', 'great', 'good', 'amazing', 'wonderful', 'helpful', 'professional'];
    const negativeWords = ['poor', 'bad', 'terrible', 'awful', 'rude', 'slow', 'dirty'];

    const positiveCount = positiveWords?.filter(word => commentText?.includes(word))?.length;
    const negativeCount = negativeWords?.filter(word => commentText?.includes(word))?.length;

    if (averageRating >= 4 && positiveCount > negativeCount) return 'positive';
    if (averageRating <= 2 || negativeCount > positiveCount) return 'negative';
    if (averageRating === 3 || (positiveCount > 0 && negativeCount > 0)) return 'mixed';

    return averageRating > 3 ? 'positive' : averageRating < 3 ? 'negative' : 'neutral';
  };

  // Validation functions
  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!isAnonymous) {
        if (!formData?.fullName?.trim()) newErrors.fullName = 'Full name is required for identified submissions';
        if (!formData?.email?.trim()) newErrors.email = 'Email is required for identified submissions';
        else if (!/\S+@\S+\.\S+/?.test(formData?.email)) newErrors.email = 'Please enter a valid email address';
      }
      if (!formData?.ageRange) newErrors.ageRange = 'Please select your age range';
      if (!formData?.visitType) newErrors.visitType = 'Please select your visit type';
      if (!formData?.department) newErrors.department = 'Please select the department';
      if (!formData?.visitDate) newErrors.visitDate = 'Please select your visit date';
    }

    if (step === 2) {
      const requiredCategories = ratingCategories?.filter(cat => cat?.required);
      requiredCategories?.forEach(category => {
        if (!ratings?.[category?.key] || ratings?.[category?.key] === 0) {
          newErrors[category.key] = `Please rate ${category?.title?.toLowerCase()}`;
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  // Update completed sections
  useEffect(() => {
    const completed = [];

    // Step 1: Demographics
    if (formData?.ageRange && formData?.visitType && formData?.department && formData?.visitDate) {
      if (isAnonymous || (formData?.fullName && formData?.email)) {
        completed?.push(1);
      }
    }

    // Step 2: Ratings
    const requiredRatings = ratingCategories?.filter(cat => cat?.required);
    const hasRequiredRatings = requiredRatings?.every(cat => ratings?.[cat?.key] > 0);
    if (hasRequiredRatings) {
      completed?.push(2);
    }

    // Step 3: Additional feedback (always considered complete)
    completed?.push(3);

    // Step 4: Review (complete when on this step)
    if (currentStep >= 4) {
      completed?.push(4);
    }

    setCompletedSections(completed);
  }, [formData, ratings, isAnonymous, currentStep]);

  // Navigation handlers
  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleStepClick = (step) => {
    if (completedSections?.includes(step) || step <= currentStep) {
      setCurrentStep(step);
    }
  };

  // Form handlers
  const handleRatingChange = (category, rating) => {
    setRatings(prev => ({
      ...prev,
      [category]: rating
    }));
  };

  const handleCommentChange = (category, comment) => {
    setComments(prev => ({
      ...prev,
      [category]: comment
    }));
  };

  const handleSubmit = async (submissionData) => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('Feedback submitted:', submissionData);
      setShowSuccessMessage(true);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success message component
  if (showSuccessMessage) {
    return (
      <div className="min-h-screen bg-clinical-background pt-20 pb-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="card-clinical text-center">
            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="CheckCircle" size={40} className="text-success" />
            </div>

            <h1 className="text-3xl font-bold text-foreground mb-4">
              Thank You for Your Feedback!
            </h1>

            <p className="text-lg text-muted-foreground mb-6">
              Your feedback has been successfully submitted and will help us improve our healthcare services.
            </p>

            <div className="bg-success/10 border border-success/20 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-success mb-2">Confirmation Details</h3>
              <p className="text-sm text-success/80">
                Reference ID: FB-{new Date()?.getTime()}<br />
                Submitted: {new Date()?.toLocaleDateString()} at {new Date()?.toLocaleTimeString()}
              </p>
            </div>

            <div className="space-y-3">
              <Button
                variant="default"
                onClick={() => window.location.href = '/patient-feedback-form'}
                iconName="Plus"
                iconPosition="left"
              >
                Submit Another Feedback
              </Button>

              <Button
                variant="outline"
                onClick={() => window.location.href = '/feedback-dashboard'}
                iconName="BarChart3"
                iconPosition="left"
              >
                View Feedback Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 pt-20 pb-8 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        <div className="absolute w-96 h-96 bg-orange-200/20 rounded-full blur-3xl top-0 left-1/4 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-amber-200/20 rounded-full blur-3xl bottom-0 right-1/4 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative" style={{ zIndex: 1 }}>
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-2">
            Patient Feedback Form
          </h1>
          <p className="text-lg text-gray-600">
            Your voice matters. Help us improve your healthcare experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Progress Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ProgressIndicator
                currentStep={currentStep}
                totalSteps={4}
                completedSections={completedSections}
                estimatedTimeRemaining={Math.max(1, 8 - (completedSections?.length * 2))}
              />

              {/* Sentiment Preview - Show after step 2 */}
              {currentStep >= 2 && (
                <div className="mt-6">
                  <SentimentPreview
                    ratings={ratings}
                    comments={comments}
                    overallSentiment={calculateSentiment()}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Step 1: Patient Demographics */}
            {currentStep === 1 && (
              <PatientDemographics
                formData={formData}
                onUpdate={setFormData}
                isAnonymous={isAnonymous}
                onAnonymousToggle={setIsAnonymous}
                errors={errors}
              />
            )}

            {/* Step 2: Experience Ratings */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="card-clinical">
                  <h2 className="text-xl font-semibold text-foreground mb-2">
                    Rate Your Experience
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Please rate different aspects of your healthcare experience. Your honest feedback helps us improve.
                  </p>
                </div>

                {ratingCategories?.map((category) => (
                  <RatingSection
                    key={category?.key}
                    title={category?.title}
                    description={category?.description}
                    rating={ratings?.[category?.key]}
                    onRatingChange={(rating) => handleRatingChange(category?.key, rating)}
                    comment={comments?.[category?.key]}
                    onCommentChange={(comment) => handleCommentChange(category?.key, comment)}
                    required={category?.required}
                    error={errors?.[category?.key]}
                  />
                ))}
              </div>
            )}

            {/* Step 3: Additional Feedback */}
            {currentStep === 3 && (
              <div className="card-clinical">
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  Additional Feedback
                </h2>
                <p className="text-muted-foreground mb-6">
                  Share any additional thoughts, suggestions, or concerns about your healthcare experience.
                </p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Overall Experience Comments
                    </label>
                    <textarea
                      value={comments?.overall || ''}
                      onChange={(e) => handleCommentChange('overall', e?.target?.value)}
                      placeholder="Please share your overall thoughts about your visit, any suggestions for improvement, or highlight exceptional service you received..."
                      rows={6}
                      className="input-clinical resize-none"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Your detailed feedback is valuable for our continuous improvement efforts
                    </p>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h3 className="font-medium text-foreground mb-2">Feedback Guidelines</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Be specific about your experience to help us understand better</li>
                      <li>• Mention staff names if you received exceptional service</li>
                      <li>• Include suggestions for improvement where applicable</li>
                      <li>• Keep feedback constructive and professional</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review & Submit */}
            {currentStep === 4 && (
              <SubmissionConfirmation
                onSubmit={handleSubmit}
                onBack={handleBack}
                isSubmitting={isSubmitting}
                formData={formData}
                isAnonymous={isAnonymous}
              />
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1 || isSubmitting}
                iconName="ArrowLeft"
                iconPosition="left"
              >
                Previous
              </Button>

              {currentStep < 4 ? (
                <Button
                  variant="default"
                  onClick={handleNext}
                  disabled={isSubmitting}
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  {currentStep === 3 ? 'Review & Submit' : 'Next'}
                </Button>
              ) : (
                (<div className="w-24" />) // Spacer for layout
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientFeedbackForm;