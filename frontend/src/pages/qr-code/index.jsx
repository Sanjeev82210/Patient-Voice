import React, { useState } from 'react';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import FeedbackQRCode from '../../components/FeedbackQRCode';

const QRCodePage = () => {
    const [customUrl, setCustomUrl] = useState('');
    const [useCustomUrl, setUseCustomUrl] = useState(false);

    // Get the current origin for production URLs
    const defaultUrl = `${window.location.origin}/patient-feedback-form`;
    const qrUrl = useCustomUrl && customUrl ? customUrl : defaultUrl;

    return (
        <div className="min-h-screen bg-clinical-background pt-20 pb-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Icon name="QrCode" size={24} className="text-blue-600" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">
                                Patient Feedback QR Code
                            </h1>
                            <p className="text-muted-foreground">
                                Generate and print QR codes for easy feedback collection
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left Column - QR Code Display */}
                    <div>
                        <FeedbackQRCode
                            url={qrUrl}
                            size={280}
                            title="Share Your Feedback"
                            description="Scan this QR code with your phone to provide feedback about your healthcare experience"
                        />
                    </div>

                    {/* Right Column - Information & Settings */}
                    <div className="space-y-6">
                        {/* URL Customization */}
                        <div className="card-clinical">
                            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                                <Icon name="Settings" size={20} />
                                QR Code Settings
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                        <input
                                            type="checkbox"
                                            checked={useCustomUrl}
                                            onChange={(e) => setUseCustomUrl(e.target.checked)}
                                            className="rounded border-gray-300"
                                        />
                                        Use Custom URL
                                    </label>
                                    {useCustomUrl && (
                                        <input
                                            type="url"
                                            value={customUrl}
                                            onChange={(e) => setCustomUrl(e.target.value)}
                                            placeholder="https://your-domain.com/patient-feedback-form"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                        />
                                    )}
                                </div>

                                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                                    <p className="text-xs text-gray-600">
                                        <strong>Current URL:</strong><br />
                                        <code className="text-blue-600">{qrUrl}</code>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Usage Instructions */}
                        <div className="card-clinical">
                            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                                <Icon name="Info" size={20} />
                                How to Use
                            </h3>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-blue-600 font-semibold text-sm">1</span>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900 mb-1">Download or Print</h4>
                                        <p className="text-sm text-gray-600">
                                            Click "Download QR" to save as an image, or "Print" for instant printing
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-blue-600 font-semibold text-sm">2</span>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900 mb-1">Display in Your Facility</h4>
                                        <p className="text-sm text-gray-600">
                                            Place QR codes in waiting rooms, reception desks, patient rooms, or exit areas
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-blue-600 font-semibold text-sm">3</span>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900 mb-1">Patients Scan & Submit</h4>
                                        <p className="text-sm text-gray-600">
                                            Patients scan with their phone camera and complete the feedback form
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Best Practices */}
                        <div className="card-clinical bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                            <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
                                <Icon name="Lightbulb" size={20} />
                                Best Practices
                            </h3>

                            <ul className="space-y-2 text-sm text-blue-800">
                                <li className="flex items-start gap-2">
                                    <Icon name="Check" size={16} className="mt-0.5 flex-shrink-0" />
                                    <span>Print in high quality (at least 300 DPI) for best scanning results</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Icon name="Check" size={16} className="mt-0.5 flex-shrink-0" />
                                    <span>Place QR codes at eye level in well-lit areas</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Icon name="Check" size={16} className="mt-0.5 flex-shrink-0" />
                                    <span>Add text like "Scan to share feedback" near the QR code</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Icon name="Check" size={16} className="mt-0.5 flex-shrink-0" />
                                    <span>Replace printed QR codes every 6-12 months to prevent wear</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Icon name="Check" size={16} className="mt-0.5 flex-shrink-0" />
                                    <span>Consider multiple sizes for different locations</span>
                                </li>
                            </ul>
                        </div>

                        {/* Stats Preview */}
                        <div className="card-clinical">
                            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                                <Icon name="TrendingUp" size={20} />
                                QR Code Analytics
                            </h3>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                    <p className="text-2xl font-bold text-gray-900">0</p>
                                    <p className="text-xs text-gray-600">QR Scans Today</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                    <p className="text-2xl font-bold text-gray-900">0</p>
                                    <p className="text-xs text-gray-600">Forms Submitted</p>
                                </div>
                            </div>

                            <p className="text-xs text-gray-500 mt-3 flex items-center gap-1">
                                <Icon name="Info" size={12} />
                                Analytics will be available after deploying to production
                            </p>
                        </div>
                    </div>
                </div>

                {/* Back Button */}
                <div className="mt-8">
                    <Button
                        variant="outline"
                        onClick={() => window.history.back()}
                        iconName="ArrowLeft"
                        iconPosition="left"
                    >
                        Back to Dashboard
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default QRCodePage;
