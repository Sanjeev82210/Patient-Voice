import React from 'react';
import Icon from '../../../components/AppIcon';

const SentimentPreview = ({ 
  ratings = {}, 
  comments = {},
  overallSentiment = 'neutral' 
}) => {
  const calculateOverallRating = () => {
    const ratingValues = Object.values(ratings)?.filter(rating => rating > 0);
    if (ratingValues?.length === 0) return 0;
    return (ratingValues?.reduce((sum, rating) => sum + rating, 0) / ratingValues?.length)?.toFixed(1);
  };

  const getSentimentData = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return {
          label: 'Positive Experience',
          icon: 'Smile',
          color: 'text-success',
          bgColor: 'bg-success/10',
          borderColor: 'border-success/20',
          description: 'Your feedback indicates a positive healthcare experience'
        };
      case 'negative':
        return {
          label: 'Areas for Improvement',
          icon: 'Frown',
          color: 'text-error',
          bgColor: 'bg-error/10',
          borderColor: 'border-error/20',
          description: 'Your feedback highlights areas where we can improve'
        };
      case 'mixed':
        return {
          label: 'Mixed Experience',
          icon: 'Meh',
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/20',
          description: 'Your feedback shows both positive aspects and areas for improvement'
        };
      default:
        return {
          label: 'Neutral Feedback',
          icon: 'MessageSquare',
          color: 'text-muted-foreground',
          bgColor: 'bg-muted/50',
          borderColor: 'border-border',
          description: 'Continue rating to see your feedback analysis'
        };
    }
  };

  const sentimentData = getSentimentData(overallSentiment);
  const overallRating = calculateOverallRating();
  const totalComments = Object.values(comments)?.filter(comment => comment && comment?.trim())?.length;

  const categoryLabels = {
    medicalCare: 'Medical Care',
    staffBehavior: 'Staff Behavior',
    facilityCleanliness: 'Facility Cleanliness',
    waitTimes: 'Wait Times',
    communication: 'Communication'
  };

  return (
    <div className="card-clinical">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center">
          <Icon name="BarChart3" size={20} className="mr-2" />
          Feedback Preview
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          See how your feedback will be categorized before submission
        </p>
      </div>
      {/* Overall Sentiment */}
      <div className={`p-4 rounded-lg border ${sentimentData?.bgColor} ${sentimentData?.borderColor} mb-4`}>
        <div className="flex items-center space-x-3">
          <Icon name={sentimentData?.icon} size={24} className={sentimentData?.color} />
          <div className="flex-1">
            <h4 className={`font-medium ${sentimentData?.color}`}>
              {sentimentData?.label}
            </h4>
            <p className="text-sm text-muted-foreground mt-1">
              {sentimentData?.description}
            </p>
          </div>
          {overallRating > 0 && (
            <div className="text-right">
              <div className="text-2xl font-bold text-foreground">{overallRating}</div>
              <div className="text-xs text-muted-foreground">Overall Rating</div>
            </div>
          )}
        </div>
      </div>
      {/* Rating Breakdown */}
      {Object.keys(ratings)?.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-foreground mb-3">Rating Breakdown</h4>
          <div className="space-y-2">
            {Object.entries(ratings)?.map(([category, rating]) => (
              <div key={category} className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {categoryLabels?.[category] || category}
                </span>
                <div className="flex items-center space-x-2">
                  {rating > 0 ? (
                    <>
                      <div className="flex">
                        {[1, 2, 3, 4, 5]?.map((star) => (
                          <Icon
                            key={star}
                            name="Star"
                            size={14}
                            className={star <= rating ? 'text-warning fill-current' : 'text-muted-foreground'}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-foreground">{rating}</span>
                    </>
                  ) : (
                    <span className="text-xs text-muted-foreground">Not rated</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Feedback Summary */}
      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="p-3 bg-muted rounded-lg">
          <div className="text-lg font-semibold text-foreground">
            {Object.keys(ratings)?.filter(key => ratings?.[key] > 0)?.length}
          </div>
          <div className="text-xs text-muted-foreground">Categories Rated</div>
        </div>
        <div className="p-3 bg-muted rounded-lg">
          <div className="text-lg font-semibold text-foreground">{totalComments}</div>
          <div className="text-xs text-muted-foreground">Written Comments</div>
        </div>
      </div>
      {/* Privacy Notice */}
      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Shield" size={16} className="text-primary mt-0.5" />
          <div>
            <p className="text-xs text-muted-foreground">
              <strong>Privacy Protected:</strong> Your feedback is processed securely and used only for quality improvement purposes. Personal information is handled according to HIPAA guidelines.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentimentPreview;