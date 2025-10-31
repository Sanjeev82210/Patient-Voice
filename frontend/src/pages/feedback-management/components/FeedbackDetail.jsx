import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FeedbackDetail = ({ feedback, onClose, onStatusUpdate, onResponse }) => {
  const [activeTab, setActiveTab] = useState('details');
  const [responseText, setResponseText] = useState('');
  const [newStatus, setNewStatus] = useState(feedback?.status || 'new');

  if (!feedback) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <Icon name="MessageSquare" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">Select Feedback to View</h3>
        <p className="text-muted-foreground">
          Choose a feedback submission from the list to view detailed information and take actions.
        </p>
      </div>
    );
  }

  const statusOptions = [
    { value: 'new', label: 'New' },
    { value: 'in-review', label: 'In Review' },
    { value: 'responded', label: 'Responded' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'escalated', label: 'Escalated' }
  ];

  const tabs = [
    { id: 'details', label: 'Details', icon: 'FileText' },
    { id: 'response', label: 'Response', icon: 'MessageSquare' },
    { id: 'history', label: 'History', icon: 'Clock' },
    { id: 'actions', label: 'Actions', icon: 'Settings' }
  ];

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={16}
        className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleStatusUpdate = () => {
    onStatusUpdate(feedback?.id, newStatus);
  };

  const handleSendResponse = () => {
    if (responseText?.trim()) {
      onResponse(feedback?.id, responseText);
      setResponseText('');
    }
  };

  const mockHistory = [
    {
      id: 1,
      action: 'Feedback Submitted',
      user: 'System',
      timestamp: feedback?.submissionDate,
      details: 'Patient submitted feedback via online form'
    },
    {
      id: 2,
      action: 'Assigned to Department',
      user: 'Dr. Sarah Johnson',
      timestamp: '2024-10-30T07:30:00Z',
      details: `Assigned to ${feedback?.department} for review`
    },
    {
      id: 3,
      action: 'Status Updated',
      user: 'Dr. Sarah Johnson',
      timestamp: '2024-10-30T08:15:00Z',
      details: 'Status changed to In Review'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
              <img
                src={feedback?.avatar}
                alt={feedback?.avatarAlt}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/assets/images/no_image.png';
                }}
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">{feedback?.patientName}</h2>
              <p className="text-sm text-muted-foreground">
                {feedback?.patientId} • {feedback?.department} • {formatDate(feedback?.submissionDate)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Select
              options={statusOptions}
              value={newStatus}
              onChange={setNewStatus}
              className="w-40"
            />
            <Button
              variant="outline"
              size="sm"
              iconName="Save"
              onClick={handleStatusUpdate}
            >
              Update
            </Button>
            <Button
              variant="ghost"
              size="icon"
              iconName="X"
              onClick={onClose}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mt-4">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium clinical-transition ${
                activeTab === tab?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {activeTab === 'details' && (
          <div className="space-y-6">
            {/* Overall Rating */}
            <div className="bg-muted rounded-lg p-4">
              <h3 className="text-lg font-semibold text-foreground mb-3">Overall Rating</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {getRatingStars(feedback?.overallRating)}
                </div>
                <span className="text-2xl font-bold text-foreground">{feedback?.overallRating}.0</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  feedback?.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
                  feedback?.sentiment === 'negative'? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {feedback?.sentiment}
                </span>
              </div>
            </div>

            {/* Category Ratings */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Category Ratings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(feedback?.categories)?.map(([category, rating]) => (
                  <div key={category} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="text-sm font-medium text-foreground capitalize">
                      {category?.replace(/([A-Z])/g, ' $1')?.trim()}
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        {getRatingStars(rating)}
                      </div>
                      <span className="text-sm font-medium text-foreground">{rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Feedback Content */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Patient Comments</h3>
              <div className="bg-muted rounded-lg p-4">
                <p className="text-foreground leading-relaxed">{feedback?.summary}</p>
              </div>
            </div>

            {/* Patient Information */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Patient Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Patient ID:</span>
                    <span className="text-sm font-medium text-foreground">{feedback?.patientId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Department:</span>
                    <span className="text-sm font-medium text-foreground">{feedback?.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Visit Date:</span>
                    <span className="text-sm font-medium text-foreground">Oct 29, 2024</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Priority:</span>
                    <span className={`text-sm font-medium ${
                      feedback?.priority === 'high' ? 'text-red-600' :
                      feedback?.priority === 'urgent'? 'text-red-700' : 'text-foreground'
                    }`}>
                      {feedback?.priority}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Response Required:</span>
                    <span className="text-sm font-medium text-foreground">
                      {feedback?.responseRequired ? 'Yes' : 'No'}
                    </span>
                  </div>
                  {feedback?.responseDeadline && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Response Deadline:</span>
                      <span className="text-sm font-medium text-orange-600">
                        {formatDate(feedback?.responseDeadline)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'response' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Compose Response</h3>
              <div className="space-y-4">
                <Input
                  label="Response Message"
                  type="textarea"
                  placeholder="Type your response to the patient..."
                  value={responseText}
                  onChange={(e) => setResponseText(e?.target?.value)}
                  className="min-h-32"
                />
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="default"
                    iconName="Send"
                    onClick={handleSendResponse}
                    disabled={!responseText?.trim()}
                  >
                    Send Response
                  </Button>
                  <Button variant="outline" iconName="Save">
                    Save Draft
                  </Button>
                  <Button variant="outline" iconName="Template">
                    Use Template
                  </Button>
                </div>
              </div>
            </div>

            {/* Previous Responses */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Previous Responses</h3>
              <div className="space-y-4">
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Dr. Sarah Johnson</span>
                    <span className="text-sm text-muted-foreground">Oct 30, 2024 at 8:30 AM</span>
                  </div>
                  <p className="text-sm text-foreground">
                    Thank you for your feedback. We're glad to hear about your positive experience with our cardiology team.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">Activity History</h3>
            <div className="space-y-4">
              {mockHistory?.map((item) => (
                <div key={item?.id} className="flex items-start space-x-4 p-4 bg-muted rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-foreground">{item?.action}</span>
                      <span className="text-sm text-muted-foreground">{formatDate(item?.timestamp)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{item?.details}</p>
                    <span className="text-xs text-muted-foreground">by {item?.user}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'actions' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                variant="outline"
                iconName="ArrowRight"
                className="justify-start h-auto p-4"
              >
                <div className="text-left">
                  <div className="font-medium">Assign to Department</div>
                  <div className="text-sm text-muted-foreground">Route to specific team</div>
                </div>
              </Button>
              
              <Button
                variant="outline"
                iconName="AlertTriangle"
                className="justify-start h-auto p-4"
              >
                <div className="text-left">
                  <div className="font-medium">Escalate Issue</div>
                  <div className="text-sm text-muted-foreground">Flag for urgent attention</div>
                </div>
              </Button>
              
              <Button
                variant="outline"
                iconName="Calendar"
                className="justify-start h-auto p-4"
              >
                <div className="text-left">
                  <div className="font-medium">Schedule Follow-up</div>
                  <div className="text-sm text-muted-foreground">Set reminder for later</div>
                </div>
              </Button>
              
              <Button
                variant="outline"
                iconName="FileText"
                className="justify-start h-auto p-4"
              >
                <div className="text-left">
                  <div className="font-medium">Generate Report</div>
                  <div className="text-sm text-muted-foreground">Create incident report</div>
                </div>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackDetail;