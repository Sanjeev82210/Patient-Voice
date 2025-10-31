import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const BulkActionModal = ({ isOpen, onClose, selectedItems = [], actionType, onConfirm }) => {
    const [formData, setFormData] = useState({
        status: '',
        department: '',
        assignee: '',
        message: '',
        tags: '',
        priority: ''
    });

    if (!isOpen) return null;

    const departmentOptions = [
        { value: 'cardiology', label: 'Cardiology' },
        { value: 'emergency', label: 'Emergency' },
        { value: 'orthopedics', label: 'Orthopedics' },
        { value: 'pediatrics', label: 'Pediatrics' },
        { value: 'radiology', label: 'Radiology' },
        { value: 'surgery', label: 'Surgery' }
    ];

    const statusOptions = [
        { value: 'in-review', label: 'In Review' },
        { value: 'responded', label: 'Responded' },
        { value: 'resolved', label: 'Resolved' },
        { value: 'escalated', label: 'Escalated' }
    ];

    const assigneeOptions = [
        { value: 'dr-johnson', label: 'Dr. Sarah Johnson' },
        { value: 'dr-martinez', label: 'Dr. Carlos Martinez' },
        { value: 'dr-williams', label: 'Dr. Emily Williams' },
        { value: 'nurse-manager', label: 'Nurse Manager' }
    ];

    const priorityOptions = [
        { value: 'normal', label: 'Normal' },
        { value: 'high', label: 'High' },
        { value: 'urgent', label: 'Urgent' }
    ];

    const getActionTitle = () => {
        switch (actionType) {
            case 'respond': return 'Bulk Response';
            case 'assign': return 'Bulk Assignment';
            case 'tag': return 'Bulk Tagging';
            case 'status': return 'Bulk Status Update';
            case 'priority': return 'Bulk Priority Update';
            default: return 'Bulk Action';
        }
    };

    const getActionIcon = () => {
        switch (actionType) {
            case 'respond': return 'MessageSquare';
            case 'assign': return 'ArrowRight';
            case 'tag': return 'Tag';
            case 'status': return 'CheckCircle';
            case 'priority': return 'AlertTriangle';
            default: return 'Settings';
        }
    };

    const handleSubmit = () => {
        onConfirm(actionType, selectedItems, formData);
        onClose();
        setFormData({
            status: '',
            department: '',
            assignee: '',
            message: '',
            tags: '',
            priority: ''
        });
    };

    const renderActionForm = () => {
        switch (actionType) {
            case 'respond':
                return (
                    <div className="space-y-4">
                        <Input
                            label="Response Message"
                            type="textarea"
                            placeholder="Enter your response message..."
                            value={formData?.message}
                            onChange={(e) => setFormData({ ...formData, message: e?.target?.value })}
                            required
                            className="min-h-32"
                        />
                        <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" iconName="Template">
                                Use Template
                            </Button>
                            <Button variant="outline" size="sm" iconName="Save">
                                Save as Template
                            </Button>
                        </div>
                    </div>
                );

            case 'assign':
                return (
                    <div className="space-y-4">
                        <Select
                            label="Assign to Department"
                            options={departmentOptions}
                            value={formData?.department}
                            onChange={(value) => setFormData({ ...formData, department: value })}
                            required
                        />
                        <Select
                            label="Assign to Staff Member"
                            options={assigneeOptions}
                            value={formData?.assignee}
                            onChange={(value) => setFormData({ ...formData, assignee: value })}
                        />
                        <Input
                            label="Assignment Notes"
                            type="textarea"
                            placeholder="Add any notes for the assignee..."
                            value={formData?.message}
                            onChange={(e) => setFormData({ ...formData, message: e?.target?.value })}
                            className="min-h-24"
                        />
                    </div>
                );

            case 'tag':
                return (
                    <div className="space-y-4">
                        <Input
                            label="Tags"
                            type="text"
                            placeholder="Enter tags separated by commas (e.g., urgent, follow-up, billing)"
                            value={formData?.tags}
                            onChange={(e) => setFormData({ ...formData, tags: e?.target?.value })}
                            description="Use tags to categorize and organize feedback"
                            required
                        />
                        <div className="flex flex-wrap gap-2">
                            <span className="text-sm text-muted-foreground">Suggested tags:</span>
                            {['urgent', 'follow-up', 'billing', 'staff-training', 'facility']?.map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => {
                                        const currentTags = formData?.tags ? formData?.tags?.split(',')?.map(t => t?.trim()) : [];
                                        if (!currentTags?.includes(tag)) {
                                            setFormData({ ...formData, tags: [...currentTags, tag]?.join(', ') });
                                        }
                                    }}
                                    className="px-2 py-1 bg-muted text-foreground rounded text-xs hover:bg-muted/80 clinical-transition"
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                );

            case 'status':
                return (
                    <div className="space-y-4">
                        <Select
                            label="New Status"
                            options={statusOptions}
                            value={formData?.status}
                            onChange={(value) => setFormData({ ...formData, status: value })}
                            required
                        />
                        <Input
                            label="Status Change Notes"
                            type="textarea"
                            placeholder="Add notes about this status change..."
                            value={formData?.message}
                            onChange={(e) => setFormData({ ...formData, message: e?.target?.value })}
                            className="min-h-24"
                        />
                    </div>
                );

            case 'priority':
                return (
                    <div className="space-y-4">
                        <Select
                            label="Priority Level"
                            options={priorityOptions}
                            value={formData?.priority}
                            onChange={(value) => setFormData({ ...formData, priority: value })}
                            required
                        />
                        <Input
                            label="Priority Change Reason"
                            type="textarea"
                            placeholder="Explain why the priority is being changed..."
                            value={formData?.message}
                            onChange={(e) => setFormData({ ...formData, message: e?.target?.value })}
                            className="min-h-24"
                        />
                    </div>
                );

            default:
                return (
                    <div className="text-center py-8">
                        <Icon name="AlertCircle" size={48} className="text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">Unknown action type</p>
                    </div>
                );
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-card border border-border rounded-lg shadow-clinical-modal w-full max-w-2xl max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 border-b border-border">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                                <Icon name={getActionIcon()} size={20} color="white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-foreground">{getActionTitle()}</h2>
                                <p className="text-sm text-muted-foreground">
                                    {selectedItems?.length} feedback item{selectedItems?.length !== 1 ? 's' : ''} selected
                                </p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            iconName="X"
                            onClick={onClose}
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[60vh]">
                    {/* Selected Items Preview */}
                    <div className="mb-6">
                        <h3 className="text-sm font-medium text-foreground mb-3">Selected Feedback Items:</h3>
                        <div className="bg-muted rounded-lg p-3 max-h-32 overflow-y-auto">
                            <div className="space-y-1">
                                {selectedItems?.slice(0, 5)?.map((itemId) => (
                                    <div key={itemId} className="text-sm text-muted-foreground">
                                        • {itemId}
                                    </div>
                                ))}
                                {selectedItems?.length > 5 && (
                                    <div className="text-sm text-muted-foreground">
                                        • ... and {selectedItems?.length - 5} more items
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Action Form */}
                    {renderActionForm()}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-border">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                            This action will be applied to all {selectedItems?.length} selected items
                        </div>
                        <div className="flex items-center space-x-3">
                            <Button
                                variant="outline"
                                onClick={onClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="default"
                                iconName="Check"
                                onClick={handleSubmit}
                                disabled={
                                    (actionType === 'respond' && !formData?.message) ||
                                    (actionType === 'assign' && !formData?.department) ||
                                    (actionType === 'tag' && !formData?.tags) ||
                                    (actionType === 'status' && !formData?.status) ||
                                    (actionType === 'priority' && !formData?.priority)
                                }
                            >
                                Apply {getActionTitle()}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BulkActionModal;