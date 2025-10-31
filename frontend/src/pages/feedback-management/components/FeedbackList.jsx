import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/CheckBox';

const FeedbackList = ({ feedbackItems = [], onSelectFeedback, selectedFeedback, onBulkAction }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

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
      summary: 'Excellent care from Dr. Martinez. Very thorough examination and clear explanation of treatment options.',
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
      summary: 'Waited 4 hours in emergency. Staff seemed overwhelmed and communication was poor.',
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
      summary: 'Outstanding pediatric care. Dr. Williams was amazing with my 5-year-old daughter.',
      avatar: "https://images.unsplash.com/photo-1507532459814-b32f63cf4497",
      avatarAlt: 'Professional headshot of Hispanic woman with long dark hair and warm smile'
    },
    {
      id: 'FB-2024-004',
      patientName: 'Robert Thompson',
      patientId: 'PT-45895',
      department: 'Orthopedics',
      submissionDate: '2024-10-29T11:20:00Z',
      overallRating: 3,
      status: 'in-review',
      priority: 'normal',
      sentiment: 'neutral',
      responseRequired: true,
      responseDeadline: '2024-11-01T17:00:00Z',
      categories: {
        medicalCare: 4,
        staffBehavior: 3,
        cleanliness: 4,
        waitTime: 2,
        communication: 3
      },
      summary: 'Good medical care but appointment scheduling could be improved. Long wait times.',
      avatar: "https://images.unsplash.com/photo-1585066047759-3438c34cf676",
      avatarAlt: 'Professional headshot of middle-aged Caucasian man with gray beard in suit'
    },
    {
      id: 'FB-2024-005',
      patientName: 'Lisa Park',
      patientId: 'PT-45896',
      department: 'Radiology',
      submissionDate: '2024-10-28T14:10:00Z',
      overallRating: 4,
      status: 'resolved',
      priority: 'normal',
      sentiment: 'positive',
      responseRequired: false,
      responseDeadline: null,
      categories: {
        medicalCare: 4,
        staffBehavior: 5,
        cleanliness: 4,
        waitTime: 4,
        communication: 4
      },
      summary: 'Efficient MRI process. Technician was very professional and made me feel comfortable.',
      avatar: "https://images.unsplash.com/photo-1668049221607-1f2df20621cc",
      avatarAlt: 'Professional headshot of young Asian woman with short black hair and professional attire'
    }];


  const dataToUse = feedbackItems?.length > 0 ? feedbackItems : mockFeedbackData;

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'in-review': return 'bg-yellow-100 text-yellow-800';
      case 'responded': return 'bg-green-100 text-green-800';
      case 'resolved': return 'bg-gray-100 text-gray-800';
      case 'escalated': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return { name: 'AlertTriangle', color: 'text-red-500' };
      case 'urgent': return { name: 'AlertCircle', color: 'text-red-600' };
      default: return null;
    }
  };

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) =>
      <Icon
        key={i}
        name="Star"
        size={16}
        className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} />

    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffHours < 48) return 'Yesterday';
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleSelectItem = (itemId) => {
    setSelectedItems((prev) =>
      prev?.includes(itemId) ?
        prev?.filter((id) => id !== itemId) :
        [...prev, itemId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems?.length === dataToUse?.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(dataToUse?.map((item) => item?.id));
    }
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="bg-gradient-to-br from-violet-400 to-purple-500 rounded-xl border-2 border-white/20 shadow-2xl overflow-hidden">
      {/* List Header */}
      <div className="px-6 py-4 bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Checkbox
              checked={selectedItems?.length === dataToUse?.length && dataToUse?.length > 0}
              indeterminate={selectedItems?.length > 0 && selectedItems?.length < dataToUse?.length}
              onChange={handleSelectAll} />

            <span className="text-sm text-white/90 font-medium">
              {selectedItems?.length > 0 ? `${selectedItems?.length} selected` : 'Select all'}
            </span>
          </div>

          {selectedItems?.length > 0 &&
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="MessageSquare"
                onClick={() => onBulkAction('respond', selectedItems)}>

                Bulk Response
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="ArrowRight"
                onClick={() => onBulkAction('assign', selectedItems)}>

                Assign
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Tag"
                onClick={() => onBulkAction('tag', selectedItems)}>

                Tag
              </Button>
            </div>
          }

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="ArrowUpDown"
              onClick={() => handleSort('date')}
            >
              Sort by Date
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="Settings"
            >
              View Options
            </Button>
          </div>
        </div>
      </div>
      {/* Feedback Items */}
      <div className="divide-y divide-white/10 bg-gradient-to-b from-white/5 to-transparent">
        {dataToUse?.map((feedback) => {
          const priorityIcon = getPriorityIcon(feedback?.priority);
          const isSelected = selectedItems?.includes(feedback?.id);
          const isActive = selectedFeedback?.id === feedback?.id;

          return (
            <div
              key={feedback?.id}
              className={`p-6 cursor-pointer transition-all duration-200 ${isActive ? 'bg-white/20 backdrop-blur-sm border-l-4 border-l-white' : 'hover:bg-white/10'}`
              }
              onClick={() => onSelectFeedback(feedback)}>

              <div className="flex items-start space-x-4">
                {/* Selection Checkbox */}
                <div className="pt-1">
                  <Checkbox
                    checked={isSelected}
                    onChange={() => handleSelectItem(feedback?.id)}
                    onClick={(e) => e?.stopPropagation()} />

                </div>

                {/* Patient Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-white/20 border-2 border-white/30">
                    <img
                      src={feedback?.avatar}
                      alt={feedback?.avatarAlt}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/assets/images/no_image.png';
                      }} />

                  </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {/* Header Row */}
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-base font-bold text-white">
                          {feedback?.patientName}
                        </h4>
                        <span className="text-sm text-white/80 font-medium">
                          {feedback?.patientId}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(feedback?.status)}`}>
                          {feedback?.status?.replace('-', ' ')}
                        </span>
                        {priorityIcon &&
                          <Icon
                            name={priorityIcon?.name}
                            size={16}
                            className={priorityIcon?.color} />

                        }
                      </div>

                      {/* Department and Date */}
                      <div className="flex items-center space-x-4 mb-2">
                        <span className="text-sm text-white/80">
                          <Icon name="Building2" size={14} className="inline mr-1" />
                          {feedback?.department}
                        </span>
                        <span className="text-sm text-white/80">
                          <Icon name="Clock" size={14} className="inline mr-1" />
                          {formatDate(feedback?.submissionDate)}
                        </span>
                        {feedback?.responseRequired &&
                          <span className="text-sm text-orange-300 font-semibold">
                            <Icon name="MessageCircle" size={14} className="inline mr-1" />
                            Response needed
                          </span>
                        }
                      </div>

                      {/* Rating */}
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="flex items-center space-x-1">
                          {getRatingStars(feedback?.overallRating)}
                        </div>
                        <span className="text-sm font-bold text-white">
                          {feedback?.overallRating}.0
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full font-bold ${feedback?.sentiment === 'positive' ? 'bg-green-500/90 text-white' :
                          feedback?.sentiment === 'negative' ? 'bg-red-500/90 text-white' : 'bg-gray-500/90 text-white'}`
                        }>
                          {feedback?.sentiment}
                        </span>
                      </div>

                      {/* Summary */}
                      <p className="text-sm text-white/80 line-clamp-2">
                        {feedback?.summary}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                        onClick={(e) => {
                          e?.stopPropagation();
                          onSelectFeedback(feedback);
                        }}
                        title="View details">
                        <Icon name="Eye" size={18} />
                      </button>

                      <button
                        className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                        onClick={(e) => {
                          e?.stopPropagation();
                          onSelectFeedback(feedback);
                        }}
                        title="Respond">
                        <Icon name="MessageSquare" size={18} />
                      </button>

                      <button
                        className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                        onClick={(e) => {
                          e?.stopPropagation();
                          onSelectFeedback(feedback);
                        }}
                        title="View more">
                        <Icon name="ArrowRight" size={18} />
                      </button>

                      <button
                        className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                        onClick={(e) => {
                          e?.stopPropagation();
                          // Handle more actions
                        }}>
                        <Icon name="MoreVertical" size={18} />
                      </button>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Load More */}
      <div className="px-6 py-4 bg-white/5 border-t border-white/10 text-center">
        <Button
          variant="default"
          size="md"
          iconName="ChevronDown"
          onClick={() => {
            console.log('Loading more feedback...');
            alert('Load More feature: This would fetch additional feedback entries from the database.');
          }}
        >
          Load More Feedback
        </Button>
      </div>
    </div>
  );

};

export default FeedbackList;