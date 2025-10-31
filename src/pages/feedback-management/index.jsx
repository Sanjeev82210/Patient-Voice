import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import FeedbackFilters from './components/FeedbackFilters';
import FeedbackList from './components/FeedbackList';
import FeedbackDetail from './components/FeedbackDetail';
import BulkActionModal from './components/BulkActionModal';

const FeedbackManagement = () => {
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [filters, setFilters] = useState({});
    const [feedbackData, setFeedbackData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showBulkModal, setShowBulkModal] = useState(false);
    const [bulkActionType, setBulkActionType] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    const [viewMode, setViewMode] = useState('split'); // 'split', 'list', 'detail'

    // Mock feedback data
    const mockFeedbackData = [
        {
            id: 'FB-2024-001',
            patientName: 'Sarah Johnson',
            patientId: 'PT-45892',
            department: 'Cardiology',
            submissionDate: '2024-10-30T06:15:00Z',
            overallRating: 4,
            status: 'new',
            priority: 'normal',
            sentiment: 'positive',
            responseRequired: true,
            responseDeadline: '2024-11-02T17:00:00Z',
            categories: {
                medicalCare: 5,
                staffBehavior: 4,
                cleanliness: 4,
                waitTime: 3,
                communication: 4
            },
            summary: 'Excellent care from Dr. Martinez. Very thorough examination and clear explanation of treatment options. The staff was professional and courteous throughout my visit.',
            avatar: "https://images.unsplash.com/photo-1507532459814-b32f63cf4497",
            avatarAlt: 'Professional headshot of middle-aged woman with brown hair smiling warmly'
        },
        {
            id: 'FB-2024-002',
            patientName: 'Michael Chen',
            patientId: 'PT-45893',
            department: 'Emergency',
            submissionDate: '2024-10-30T04:30:00Z',
            overallRating: 2,
            status: 'escalated',
            priority: 'high',
            sentiment: 'negative',
            responseRequired: true,
            responseDeadline: '2024-10-31T12:00:00Z',
            categories: {
                medicalCare: 3,
                staffBehavior: 2,
                cleanliness: 3,
                waitTime: 1,
                communication: 2
            },
            summary: 'Waited 4 hours in emergency department. Staff seemed overwhelmed and communication was poor. Need better triage system and more staff during peak hours.',
            avatar: "https://images.unsplash.com/photo-1645817095143-01b4feb70470",
            avatarAlt: 'Professional headshot of Asian man in business attire with confident expression'
        },
        {
            id: 'FB-2024-003',
            patientName: 'Emily Rodriguez',
            patientId: 'PT-45894',
            department: 'Pediatrics',
            submissionDate: '2024-10-29T16:45:00Z',
            overallRating: 5,
            status: 'responded',
            priority: 'normal',
            sentiment: 'positive',
            responseRequired: false,
            responseDeadline: null,
            categories: {
                medicalCare: 5,
                staffBehavior: 5,
                cleanliness: 5,
                waitTime: 4,
                communication: 5
            },
            summary: 'Outstanding pediatric care. Dr. Williams was amazing with my 5-year-old daughter. The child-friendly environment and patient approach made the visit stress-free.',
            avatar: "https://images.unsplash.com/photo-1507532459814-b32f63cf4497",
            avatarAlt: 'Professional headshot of Hispanic woman with long dark hair and warm smile'
        }];


    useEffect(() => {
        // Simulate loading feedback data
        setIsLoading(true);
        setTimeout(() => {
            setFeedbackData(mockFeedbackData);
            setIsLoading(false);
        }, 1000);
    }, []);

    const handleFiltersChange = (newFilters) => {
        setFilters(newFilters);
        // In a real app, this would trigger an API call to filter data
        console.log('Filters updated:', newFilters);
    };

    const handleSelectFeedback = (feedback) => {
        setSelectedFeedback(feedback);
        if (window.innerWidth < 1024) {
            setViewMode('detail');
        }
    };

    const handleStatusUpdate = (feedbackId, newStatus) => {
        setFeedbackData((prev) =>
            prev?.map((item) =>
                item?.id === feedbackId ?
                    { ...item, status: newStatus } :
                    item
            )
        );

        if (selectedFeedback?.id === feedbackId) {
            setSelectedFeedback((prev) => ({ ...prev, status: newStatus }));
        }
    };

    const handleResponse = (feedbackId, responseText) => {
        console.log('Sending response:', { feedbackId, responseText });
        // In a real app, this would send the response via API
        handleStatusUpdate(feedbackId, 'responded');
    };

    const handleBulkAction = (actionType, items) => {
        setBulkActionType(actionType);
        setSelectedItems(items);
        setShowBulkModal(true);
    };

    const handleBulkActionConfirm = (actionType, items, formData) => {
        console.log('Bulk action confirmed:', { actionType, items, formData });
        // In a real app, this would process the bulk action via API
        setShowBulkModal(false);
    };

    const getViewModeIcon = () => {
        switch (viewMode) {
            case 'list': return 'List';
            case 'detail': return 'Maximize2';
            default: return 'Columns';
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <div className="pt-16">
                    <div className="flex items-center justify-center h-96">
                        <div className="text-center">
                            <Icon name="Loader2" size={48} className="text-primary animate-spin mx-auto mb-4" />
                            <p className="text-muted-foreground">Loading feedback data...</p>
                        </div>
                    </div>
                </div>
            </div>);

    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 relative overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
                <div className="absolute w-96 h-96 bg-purple-200/20 rounded-full blur-3xl -top-48 -right-48 animate-pulse"></div>
                <div className="absolute w-96 h-96 bg-pink-200/20 rounded-full blur-3xl -bottom-48 -left-48 animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="relative" style={{ zIndex: 1 }}>
                <Header />
            </div>

            <div className="pt-16 relative" style={{ zIndex: 1 }}>
                <div className="px-6 py-8">
                    {/* Page Header */}
                    <div className="mb-8 animate-fade-in">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                                    Feedback Management
                                </h1>
                                <p className="text-gray-600">
                                    Review, categorize, and respond to patient feedback submissions
                                </p>
                            </div>

                            <div className="flex items-center space-x-3">
                                {/* View Mode Toggle */}
                                <div className="hidden lg:flex items-center space-x-1 bg-muted rounded-lg p-1">
                                    <Button
                                        variant={viewMode === 'split' ? 'default' : 'ghost'}
                                        size="sm"
                                        iconName="Columns"
                                        onClick={() => setViewMode('split')} />

                                    <Button
                                        variant={viewMode === 'list' ? 'default' : 'ghost'}
                                        size="sm"
                                        iconName="List"
                                        onClick={() => setViewMode('list')} />

                                </div>

                                <Button
                                    variant="outline"
                                    iconName="Download">

                                    Export Data
                                </Button>

                                <Button
                                    variant="default"
                                    iconName="Plus"
                                    onClick={() => window.location.href = '/patient-feedback-form'}>

                                    New Feedback
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Filters */}
                    <FeedbackFilters
                        onFiltersChange={handleFiltersChange}
                        totalCount={feedbackData?.length} />


                    {/* Main Content Area */}
                    <div className={`grid gap-6 ${viewMode === 'split' ? 'lg:grid-cols-2' : 'grid-cols-1'}`
                    }>
                        {/* Feedback List */}
                        <div className={viewMode === 'detail' ? 'hidden lg:block' : ''}>
                            <FeedbackList
                                feedbackItems={feedbackData}
                                onSelectFeedback={handleSelectFeedback}
                                selectedFeedback={selectedFeedback}
                                onBulkAction={handleBulkAction} />

                        </div>

                        {/* Feedback Detail */}
                        <div className={`${viewMode === 'list' ? 'hidden' : ''} ${viewMode === 'detail' ? 'lg:hidden' : ''}`
                        }>
                            <div className="sticky top-24">
                                <FeedbackDetail
                                    feedback={selectedFeedback}
                                    onClose={() => {
                                        setSelectedFeedback(null);
                                        if (window.innerWidth < 1024) {
                                            setViewMode('split');
                                        }
                                    }}
                                    onStatusUpdate={handleStatusUpdate}
                                    onResponse={handleResponse} />

                            </div>
                        </div>
                    </div>

                    {/* Mobile Back Button */}
                    {viewMode === 'detail' &&
                        <div className="lg:hidden fixed bottom-6 left-6 z-40">
                            <Button
                                variant="default"
                                iconName="ArrowLeft"
                                onClick={() => {
                                    setViewMode('split');
                                    setSelectedFeedback(null);
                                }}
                                className="rounded-full shadow-clinical-modal">

                                Back to List
                            </Button>
                        </div>
                    }
                </div>
            </div>
            {/* Bulk Action Modal */}
            <BulkActionModal
                isOpen={showBulkModal}
                onClose={() => setShowBulkModal(false)}
                selectedItems={selectedItems}
                actionType={bulkActionType}
                onConfirm={handleBulkActionConfirm} />

        </div>);

};

export default FeedbackManagement;