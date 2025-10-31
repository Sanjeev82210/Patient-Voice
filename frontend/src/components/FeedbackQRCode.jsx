import React, { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import Icon from './AppIcon';
import Button from './ui/Button';

const FeedbackQRCode = ({
    url = 'http://localhost:3001/patient-feedback-form',
    size = 256,
    showDownload = true,
    showPrint = true,
    title = 'Share Your Feedback',
    description = 'Scan this QR code with your phone to provide feedback about your healthcare experience'
}) => {
    const qrRef = useRef(null);

    // Download QR code as PNG
    const handleDownload = () => {
        const canvas = qrRef.current?.querySelector('canvas');
        if (!canvas) return;

        const url = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = url;
        link.download = 'patient-feedback-qr-code.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Print QR code
    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        if (!printWindow) return;

        const canvas = qrRef.current?.querySelector('canvas');
        if (!canvas) return;

        const dataUrl = canvas.toDataURL('image/png');

        printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Patient Feedback QR Code</title>
          <style>
            body {
              margin: 0;
              padding: 40px;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .header h1 {
              font-size: 32px;
              color: #1e40af;
              margin: 0 0 10px 0;
            }
            .header h2 {
              font-size: 24px;
              color: #334155;
              margin: 0 0 20px 0;
              font-weight: 500;
            }
            .qr-container {
              border: 4px solid #e2e8f0;
              border-radius: 16px;
              padding: 30px;
              background: white;
              box-shadow: 0 10px 40px rgba(0,0,0,0.1);
            }
            .instructions {
              margin-top: 30px;
              text-align: center;
              max-width: 500px;
            }
            .instructions h3 {
              font-size: 20px;
              color: #334155;
              margin: 0 0 15px 0;
            }
            .instructions ol {
              text-align: left;
              font-size: 16px;
              color: #64748b;
              line-height: 1.8;
            }
            .footer {
              margin-top: 40px;
              text-align: center;
              color: #94a3b8;
              font-size: 14px;
            }
            @media print {
              body { padding: 20px; }
              .header h1 { font-size: 28px; }
              .header h2 { font-size: 20px; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>PatientVoice</h1>
            <h2>${title}</h2>
          </div>
          <div class="qr-container">
            <img src="${dataUrl}" alt="QR Code" style="display: block;" />
          </div>
          <div class="instructions">
            <h3>How to Use This QR Code:</h3>
            <ol>
              <li>Open your phone's camera app</li>
              <li>Point the camera at this QR code</li>
              <li>Tap the notification that appears</li>
              <li>Complete the feedback form</li>
            </ol>
            <p style="margin-top: 20px; font-size: 14px; color: #64748b;">
              ${description}
            </p>
          </div>
          <div class="footer">
            <p>Healthcare Feedback Management System</p>
            <p>${url}</p>
          </div>
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
              }, 250);
            };
          </script>
        </body>
      </html>
    `);
        printWindow.document.close();
    };

    // Copy URL to clipboard
    const handleCopyUrl = async () => {
        try {
            await navigator.clipboard.writeText(url);
            alert('URL copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy URL:', err);
        }
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            {/* Header */}
            <div className="text-center mb-6">
                <div className="flex items-center justify-center mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Icon name="QrCode" size={20} className="text-blue-600" />
                    </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
                <p className="text-sm text-gray-600">{description}</p>
            </div>

            {/* QR Code */}
            <div ref={qrRef} className="flex justify-center mb-6">
                <div className="bg-white p-4 rounded-lg border-4 border-gray-200">
                    <QRCodeCanvas
                        value={url}
                        size={size}
                        level="H"
                        includeMargin={true}
                        imageSettings={{
                            width: size * 0.2,
                            height: size * 0.2,
                            excavate: true,
                        }}
                    />
                </div>
            </div>

            {/* URL Display */}
            <div className="mb-4">
                <label className="block text-xs font-medium text-gray-700 mb-2">
                    Feedback Form URL:
                </label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={url}
                        readOnly
                        className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md bg-gray-50 text-gray-700"
                    />
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopyUrl}
                        iconName="Copy"
                    >
                        Copy
                    </Button>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
                {showDownload && (
                    <Button
                        variant="default"
                        size="sm"
                        onClick={handleDownload}
                        iconName="Download"
                        iconPosition="left"
                        className="flex-1"
                    >
                        Download QR
                    </Button>
                )}
                {showPrint && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handlePrint}
                        iconName="Printer"
                        iconPosition="left"
                        className="flex-1"
                    >
                        Print
                    </Button>
                )}
            </div>

            {/* Instructions */}
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-2">
                    <Icon name="Info" size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-blue-700">
                        <strong>Tip:</strong> Print and display this QR code in your waiting room, reception area,
                        or patient rooms for easy feedback collection.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FeedbackQRCode;
