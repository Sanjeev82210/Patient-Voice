import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import RecentFeedbackAlerts from '../feedback-dashboard/components/RecentFeedbackAlerts';
import SatisfactionChart from '../feedback-dashboard/components/SatisfactionChart';
import QuickActions from '../feedback-dashboard/components/QuickActions';
import DepartmentComparison from '../feedback-dashboard/components/DepartmentComparison';
import SentimentAnalysis from '../feedback-dashboard/components/SentimentAnalysis';
import KeyInsightsPanel from '../feedback-analytics/components/KeyInsightsPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AnalyticsOverview = () => {
    const [activeTab, setActiveTab] = useState('alerts');
    const [lastUpdated, setLastUpdated] = useState(new Date());
    const [isLiveMode, setIsLiveMode] = useState(true);

    // Simulate live updates
    useEffect(() => {
        if (isLiveMode) {
            const interval = setInterval(() => {
                setLastUpdated(new Date());
            }, 30000); // Update every 30 seconds

            return () => clearInterval(interval);
        }
    }, [isLiveMode]);

    const tabs = [
        { id: 'alerts', label: 'Recent Feedback Alerts', icon: 'Bell' },
        { id: 'satisfaction', label: 'Patient Satisfaction Trend', icon: 'TrendingUp' },
        { id: 'actions', label: 'Quick Actions', icon: 'Zap' },
        { id: 'departments', label: 'Department Comparison', icon: 'Building2' },
        { id: 'sentiment', label: 'Sentiment Analysis', icon: 'Smile' },
        { id: 'insights', label: 'Key Performance Insights', icon: 'Target' }
    ];

    const breadcrumbItems = [
        { label: 'Home', href: '/feedback-dashboard' },
        { label: 'Analytics Overview', href: '/analytics-overview' }
    ];

    // Animated particles background
    const particles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        size: Math.random() * 4 + 2,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5
    }));

    const renderTabContent = () => {
        switch (activeTab) {
            case 'alerts':
                return (
                    <div className="space-y-6">
                        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-rose-100 shadow-lg">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-red-100 rounded-lg">
                                    <Icon name="Bell" size={24} className="text-red-600" />
                                </div>
                                <h2 className="text-xl font-semibold text-gray-800">Recent Feedback Alerts</h2>
                            </div>
                            <RecentFeedbackAlerts />
                        </div>
                    </div>
                );

            case 'satisfaction':
                return (
                    <div className="space-y-6">
                        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-rose-100 shadow-lg">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Icon name="TrendingUp" size={24} className="text-blue-600" />
                                </div>
                                <h2 className="text-xl font-semibold text-gray-800">Patient Satisfaction Trend</h2>
                            </div>
                            <SatisfactionChart />
                        </div>
                    </div>
                );

            case 'actions':
                return (
                    <div className="space-y-6">
                        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-rose-100 shadow-lg">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <Icon name="Zap" size={24} className="text-purple-600" />
                                </div>
                                <h2 className="text-xl font-semibold text-gray-800">Quick Actions</h2>
                            </div>
                            <QuickActions />
                        </div>
                    </div>
                );

            case 'departments':
                return (
                    <div className="space-y-6">
                        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-rose-100 shadow-lg">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-teal-100 rounded-lg">
                                    <Icon name="Building2" size={24} className="text-teal-600" />
                                </div>
                                <h2 className="text-xl font-semibold text-gray-800">Department Satisfaction Comparison</h2>
                            </div>
                            <DepartmentComparison />
                        </div>
                    </div>
                );

            case 'sentiment':
                return (
                    <div className="space-y-6">
                        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-rose-100 shadow-lg">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <Icon name="Smile" size={24} className="text-green-600" />
                                </div>
                                <h2 className="text-xl font-semibold text-gray-800">Sentiment Analysis</h2>
                            </div>
                            <SentimentAnalysis />
                        </div>
                    </div>
                );

            case 'insights':
                return (
                    <div className="space-y-6">
                        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-rose-100 shadow-lg">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-orange-100 rounded-lg">
                                    <Icon name="Target" size={24} className="text-orange-600" />
                                </div>
                                <h2 className="text-xl font-semibold text-gray-800">Key Performance Insights</h2>
                            </div>
                            <KeyInsightsPanel />
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Animated gradient background */}
            <div className="fixed inset-0 bg-gradient-to-br from-rose-600 via-pink-500 to-fuchsia-400 -z-10">
                <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/40 via-transparent to-pink-500/40 animate-gradient-shift"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(244,63,94,0.3),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.3),transparent_50%)]"></div>
            </div>

            {/* Floating particles */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
                {particles.map((particle) => (
                    <div
                        key={particle.id}
                        className="absolute rounded-full bg-gradient-to-br from-rose-300/40 to-pink-300/40 animate-float"
                        style={{
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            animationDuration: `${particle.duration}s`,
                            animationDelay: `${particle.delay}s`,
                        }}
                    />
                ))}
            </div>

            <Header />

            <div className="p-6 space-y-6">
                <BreadcrumbNavigation items={breadcrumbItems} />

                {/* Page Header */}
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-rose-100 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl shadow-lg">
                                <Icon name="BarChart3" size={32} className="text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                                    Analytics Overview
                                </h1>
                                <p className="text-gray-600 mt-1">
                                    Comprehensive analytics and insights dashboard
                                </p>
                            </div>
                        </div>

                        {/* Live Mode Toggle */}
                        <div className="flex items-center gap-4">
                            <div className="text-sm text-gray-600">
                                Last updated: {lastUpdated.toLocaleTimeString()}
                            </div>
                            <button
                                onClick={() => setIsLiveMode(!isLiveMode)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${isLiveMode
                                    ? 'bg-green-100 text-green-700 border border-green-300'
                                    : 'bg-gray-100 text-gray-600 border border-gray-300'
                                    }`}
                            >
                                <div
                                    className={`w-2 h-2 rounded-full ${isLiveMode ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                                        }`}
                                />
                                {isLiveMode ? 'Live' : 'Paused'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tabs Navigation */}
                <div className="bg-white/80 backdrop-blur-sm rounded-lg border border-rose-100 shadow-lg overflow-hidden">
                    <div className="flex overflow-x-auto scrollbar-hide">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-6 py-4 font-medium transition-all duration-300 whitespace-nowrap border-b-2 ${activeTab === tab.id
                                    ? 'border-rose-600 text-rose-600 bg-rose-50'
                                    : 'border-transparent text-gray-600 hover:text-rose-600 hover:bg-rose-50/50'
                                    }`}
                            >
                                <Icon name={tab.icon} size={20} />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                <div className="animate-fade-in">
                    {renderTabContent()}
                </div>
            </div>

            <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(10px, 10px) scale(1.1); }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.6;
          }
        }

        .animate-gradient-shift {
          animation: gradient-shift 15s ease-in-out infinite;
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </div>
    );
};

export default AnalyticsOverview;
