/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Clinical Healthcare Theme
                'clinical-primary': '#0052CC',
                'clinical-secondary': '#00A3BF',
                'clinical-accent': '#4C9AFF',
                'clinical-background': '#F4F5F7',
                'clinical-surface': '#FFFFFF',
                'clinical-error': '#DE350B',
                'clinical-warning': '#FFAB00',
                'clinical-success': '#36B37E',
                'clinical-info': '#00B8D9',

                // Text colors
                'text-primary': '#172B4D',
                'text-secondary': '#5E6C84',
                'text-disabled': '#A5ADBA',

                // Border colors
                'border-light': '#DFE1E6',
                'border-medium': '#C1C7D0',

                // Status colors
                'status-urgent': '#DE350B',
                'status-high': '#FF8B00',
                'status-medium': '#FFAB00',
                'status-low': '#36B37E',

                // Sentiment colors
                'sentiment-positive': '#36B37E',
                'sentiment-neutral': '#5E6C84',
                'sentiment-negative': '#DE350B',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
            },
            boxShadow: {
                'clinical': '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
                'clinical-lg': '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
            },
        },
    },
    plugins: [],
}
