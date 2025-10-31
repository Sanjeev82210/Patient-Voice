import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const RatingSection = ({ 
  title, 
  description, 
  rating, 
  onRatingChange, 
  comment, 
  onCommentChange,
  required = false,
  error = null 
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const ratingLabels = {
    1: 'Poor',
    2: 'Fair', 
    3: 'Good',
    4: 'Very Good',
    5: 'Excellent'
  };

  const handleStarClick = (starRating) => {
    onRatingChange(starRating);
  };

  const handleStarHover = (starRating) => {
    setHoverRating(starRating);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  const displayRating = hoverRating || rating;

  return (
    <div className="border border-border rounded-lg p-6 bg-card clinical-hover">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-foreground flex items-center">
          {title}
          {required && <span className="text-error ml-1">*</span>}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
      {/* Star Rating */}
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          {[1, 2, 3, 4, 5]?.map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => handleStarClick(star)}
              onMouseEnter={() => handleStarHover(star)}
              onMouseLeave={handleStarLeave}
              className="p-1 clinical-transition focus-clinical rounded"
              aria-label={`Rate ${star} out of 5 stars`}
            >
              <Icon
                name="Star"
                size={32}
                className={`clinical-transition ${
                  star <= displayRating
                    ? 'text-warning fill-current' :'text-muted-foreground'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Rating Label */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">
            {displayRating > 0 ? ratingLabels?.[displayRating] : 'No rating selected'}
          </span>
          {displayRating > 0 && (
            <span className="text-sm text-muted-foreground">
              {displayRating} out of 5 stars
            </span>
          )}
        </div>
      </div>
      {/* Comment Section */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Additional Comments (Optional)
        </label>
        <textarea
          value={comment || ''}
          onChange={(e) => onCommentChange(e?.target?.value)}
          placeholder={`Share specific details about your ${title?.toLowerCase()} experience...`}
          rows={3}
          className="input-clinical resize-none"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Your detailed feedback helps us improve our services
        </p>
      </div>
      {/* Error Message */}
      {error && (
        <div className="mt-2 text-sm text-error flex items-center space-x-1">
          <Icon name="AlertCircle" size={16} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default RatingSection;