import Sentiment from 'sentiment';

const sentiment = new Sentiment();

/**
 * Analyze text sentiment and return category and score
 * @param {string} text - Text to analyze
 * @returns {object} - { sentiment: 'positive'|'neutral'|'negative', score: number }
 */
export function analyzeSentiment(text) {
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
        return {
            sentiment: 'neutral',
            sentiment_score: 0
        };
    }

    try {
        // Analyze the text
        const result = sentiment.analyze(text);

        // result.score typically ranges from -10 to +10
        // result.comparative is score/words (better for normalization)

        // Normalize to -1.00 to +1.00 range
        // Using comparative score for better accuracy
        let normalizedScore = result.comparative;

        // Clamp between -1 and 1
        normalizedScore = Math.max(-1, Math.min(1, normalizedScore));

        // Round to 2 decimal places
        normalizedScore = Math.round(normalizedScore * 100) / 100;

        // Determine sentiment category
        let category = 'neutral';
        if (normalizedScore >= 0.15) {
            category = 'positive';
        } else if (normalizedScore <= -0.15) {
            category = 'negative';
        }

        return {
            sentiment: category,
            sentiment_score: normalizedScore
        };
    } catch (error) {
        console.error('Error analyzing sentiment:', error);
        return {
            sentiment: 'neutral',
            sentiment_score: 0
        };
    }
}

/**
 * Analyze multiple text fields and combine their sentiment
 * @param {array} texts - Array of text strings to analyze
 * @returns {object} - Combined sentiment analysis
 */
export function analyzeCombinedSentiment(texts) {
    // Filter out empty texts
    const validTexts = texts.filter(text => text && text.trim().length > 0);

    if (validTexts.length === 0) {
        return {
            sentiment: 'neutral',
            sentiment_score: 0
        };
    }

    // Combine all texts
    const combinedText = validTexts.join(' ');

    return analyzeSentiment(combinedText);
}

/**
 * Get sentiment color for UI display
 * @param {string} sentiment - 'positive', 'neutral', or 'negative'
 * @returns {string} - Tailwind color class
 */
export function getSentimentColor(sentiment) {
    switch (sentiment) {
        case 'positive':
            return 'text-green-600 bg-green-50';
        case 'negative':
            return 'text-red-600 bg-red-50';
        case 'neutral':
        default:
            return 'text-yellow-600 bg-yellow-50';
    }
}

/**
 * Get sentiment icon
 * @param {string} sentiment - 'positive', 'neutral', or 'negative'
 * @returns {string} - Icon name
 */
export function getSentimentIcon(sentiment) {
    switch (sentiment) {
        case 'positive':
            return 'SmilePlus';
        case 'negative':
            return 'Frown';
        case 'neutral':
        default:
            return 'Meh';
    }
}

/**
 * Get sentiment label
 * @param {string} sentiment - 'positive', 'neutral', or 'negative'
 * @returns {string} - Human-readable label
 */
export function getSentimentLabel(sentiment) {
    switch (sentiment) {
        case 'positive':
            return 'Positive Experience';
        case 'negative':
            return 'Needs Attention';
        case 'neutral':
        default:
            return 'Neutral Feedback';
    }
}
