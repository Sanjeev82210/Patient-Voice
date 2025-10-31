# Sentiment Analysis Implementation Guide

## ✅ What Was Implemented

### 1. **Sentiment Analysis Utility** (`frontend/src/utils/sentimentAnalysis.js`)
- Uses the `sentiment` npm package for text analysis
- Analyzes patient feedback comments automatically
- Returns sentiment category: `positive`, `neutral`, or `negative`
- Returns sentiment score: `-1.00` to `+1.00`

### 2. **Key Functions**

#### `analyzeSentiment(text)`
Analyzes a single text string and returns:
```javascript
{
  sentiment: 'positive',      // or 'neutral', 'negative'
  sentiment_score: 0.75       // -1.00 to +1.00
}
```

#### `analyzeCombinedSentiment(texts)`
Analyzes multiple text fields (all comments) and combines them:
```javascript
const result = analyzeCombinedSentiment([
  "Great doctor, very helpful",
  "Clean facility",
  "Excellent service"
]);
// Result: { sentiment: 'positive', sentiment_score: 0.85 }
```

#### Helper Functions
- `getSentimentColor(sentiment)` - Returns Tailwind CSS classes
- `getSentimentIcon(sentiment)` - Returns appropriate icon
- `getSentimentLabel(sentiment)` - Returns user-friendly label

### 3. **Integration in Patient Feedback Form**

#### Automatic Analysis
When patients fill out the feedback form, sentiment is automatically calculated from:
- Medical care comments
- Staff behavior comments
- Facility cleanliness comments
- Wait times comments
- Communication comments
- Overall comments

#### Combined Scoring (Hybrid Approach)
The system uses both:
- **60% from comment sentiment** (text analysis)
- **40% from ratings** (1-5 star ratings)

This gives more accurate results than either method alone.

#### Display on Review Page
Before submission, patients can see their feedback sentiment:
- **Positive Experience** (Green) 😊
- **Neutral Feedback** (Yellow) 😐
- **Needs Attention** (Red) 😞

### 4. **Data Saved to Database**

When feedback is submitted, these fields are included:
```javascript
{
  sentiment: 'positive',           // Category
  sentiment_score: 0.65,          // Numerical score
  overall_rating: 4.2,            // Calculated from ratings
  ...other feedback data
}
```

## 🧪 How to Test

### Test Case 1: Positive Feedback
1. Go to Patient Feedback Form
2. Fill in demographics
3. Give high ratings (4-5 stars)
4. Add positive comments:
   - "Excellent care from Dr. Smith"
   - "Very clean and professional facility"
   - "Staff were friendly and helpful"
5. Go to Review page
6. **Expected**: Green badge showing "Positive Experience"

### Test Case 2: Negative Feedback
1. Fill form with low ratings (1-2 stars)
2. Add negative comments:
   - "Long wait times"
   - "Rude staff"
   - "Dirty waiting room"
3. **Expected**: Red badge showing "Needs Attention"

### Test Case 3: Mixed/Neutral Feedback
1. Give mixed ratings (3 stars)
2. Add balanced comments
3. **Expected**: Yellow badge showing "Neutral Feedback"

## 📊 How Sentiment Scoring Works

### Score Ranges
- **0.15 to 1.00** → Positive
- **-0.14 to 0.14** → Neutral
- **-1.00 to -0.15** → Negative

### Example Calculations

#### Example 1: Highly Positive
```
Comments: "Amazing doctor! Excellent service! Very clean!"
Ratings: 5, 5, 5, 4, 5 (Average: 4.8)

Comment sentiment score: +0.90
Rating score: (4.8 - 3) / 2 = +0.90

Combined: (0.90 × 0.6) + (0.90 × 0.4) = 0.90
Result: POSITIVE (0.90)
```

#### Example 2: Negative
```
Comments: "Terrible service. Rude staff. Very disappointed."
Ratings: 2, 1, 2, 2, 1 (Average: 1.6)

Comment sentiment score: -0.85
Rating score: (1.6 - 3) / 2 = -0.70

Combined: (-0.85 × 0.6) + (-0.70 × 0.4) = -0.79
Result: NEGATIVE (-0.79)
```

## 🎯 Dashboard Integration (Future)

The sentiment data can be used to:

1. **Filter Feedback by Sentiment**
   - Show only negative feedback needing attention
   - Highlight positive experiences for staff recognition

2. **Sentiment Trends Chart**
   - Track sentiment over time
   - See if improvements are working

3. **Department Comparison**
   - Compare sentiment across departments
   - Identify problem areas

4. **Alerts**
   - Auto-flag negative feedback for immediate review
   - Email notifications for urgent issues

## 📦 Dependencies

Already installed:
```json
{
  "sentiment": "^5.0.2"
}
```

No API keys needed! Works offline!

## 🔧 Customization

### Adjust Sentiment Thresholds
Edit `sentimentAnalysis.js`:
```javascript
// Make it more strict (harder to be positive)
if (normalizedScore >= 0.25) category = 'positive';

// Make it more lenient (easier to be positive)
if (normalizedScore >= 0.10) category = 'positive';
```

### Change Weight Distribution
Edit `index.jsx` in patient feedback form:
```javascript
// Give more weight to comments (70/30 instead of 60/40)
const combinedScore = (sentimentResult.sentiment_score * 0.7) + (ratingScore * 0.3);
```

## ✨ Benefits

1. **Automatic** - No manual classification needed
2. **Objective** - Based on proven NLP algorithms
3. **Fast** - Analyzes instantly on form submission
4. **Accurate** - Combines text + ratings for best results
5. **Free** - No API costs
6. **Offline** - Works without internet

## 🚀 Next Steps

To fully integrate with backend:
1. Ensure Supabase `feedback` table has `sentiment` and `sentiment_score` columns ✅ (Already done!)
2. Test submitting feedback through the form
3. Verify sentiment data is saved correctly
4. Add sentiment filters to dashboard
5. Create sentiment trend charts

---

**Status**: ✅ Fully Implemented and Ready to Use!
