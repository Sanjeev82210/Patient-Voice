import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/CheckBox';

const PatientDemographics = ({
  formData,
  onUpdate,
  isAnonymous,
  onAnonymousToggle,
  errors = {}
}) => {
  const ageRangeOptions = [
    { value: '18-25', label: '18-25 years' },
    { value: '26-35', label: '26-35 years' },
    { value: '36-45', label: '36-45 years' },
    { value: '46-55', label: '46-55 years' },
    { value: '56-65', label: '56-65 years' },
    { value: '66-75', label: '66-75 years' },
    { value: '76+', label: '76+ years' }
  ];

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say' }
  ];

  const visitTypeOptions = [
    { value: 'emergency', label: 'Emergency Visit' },
    { value: 'outpatient', label: 'Outpatient Appointment' },
    { value: 'inpatient', label: 'Inpatient Stay' },
    { value: 'surgery', label: 'Surgery/Procedure' },
    { value: 'consultation', label: 'Consultation' },
    { value: 'follow-up', label: 'Follow-up Visit' },
    { value: 'diagnostic', label: 'Diagnostic Testing' }
  ];

  const departmentOptions = [
    { value: 'cardiology', label: 'Cardiology' },
    { value: 'emergency', label: 'Emergency Department' },
    { value: 'orthopedics', label: 'Orthopedics' },
    { value: 'pediatrics', label: 'Pediatrics' },
    { value: 'oncology', label: 'Oncology' },
    { value: 'neurology', label: 'Neurology' },
    { value: 'surgery', label: 'Surgery' },
    { value: 'radiology', label: 'Radiology' },
    { value: 'laboratory', label: 'Laboratory' },
    { value: 'pharmacy', label: 'Pharmacy' },
    { value: 'other', label: 'Other' }
  ];

  const handleInputChange = (field, value) => {
    onUpdate({
      ...formData,
      [field]: value
    });
  };

  return (
    <div className="card-clinical">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Patient Information</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Help us understand your visit better (optional for anonymous feedback)
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Checkbox
            label="Submit anonymously"
            description="Your identity will not be recorded"
            checked={isAnonymous}
            onChange={(e) => onAnonymousToggle(e?.target?.checked)}
            className="text-sm"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information - Only show if not anonymous */}
        {!isAnonymous && (
          <>
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              value={formData?.fullName || ''}
              onChange={(e) => handleInputChange('fullName', e?.target?.value)}
              error={errors?.fullName}
              required
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="your.email@example.com"
              value={formData?.email || ''}
              onChange={(e) => handleInputChange('email', e?.target?.value)}
              error={errors?.email}
              description="For follow-up communication if needed"
            />

            <Input
              label="Phone Number"
              type="tel"
              placeholder="(555) 123-4567"
              value={formData?.phone || ''}
              onChange={(e) => handleInputChange('phone', e?.target?.value)}
              error={errors?.phone}
            />

            <Input
              label="Patient ID (Optional)"
              type="text"
              placeholder="Enter patient ID if available"
              value={formData?.patientId || ''}
              onChange={(e) => handleInputChange('patientId', e?.target?.value)}
              description="Found on your hospital bracelet or documents"
            />
          </>
        )}

        {/* Demographics - Always show */}
        <Select
          label="Age Range"
          options={ageRangeOptions}
          value={formData?.ageRange || ''}
          onChange={(value) => handleInputChange('ageRange', value)}
          placeholder="Select your age range"
          error={errors?.ageRange}
          required
        />

        <Select
          label="Gender"
          options={genderOptions}
          value={formData?.gender || ''}
          onChange={(value) => handleInputChange('gender', value)}
          placeholder="Select gender"
          error={errors?.gender}
        />

        {/* Visit Information */}
        <Select
          label="Type of Visit"
          options={visitTypeOptions}
          value={formData?.visitType || ''}
          onChange={(value) => handleInputChange('visitType', value)}
          placeholder="Select visit type"
          error={errors?.visitType}
          required
        />

        <Select
          label="Department/Service"
          options={departmentOptions}
          value={formData?.department || ''}
          onChange={(value) => handleInputChange('department', value)}
          placeholder="Select department"
          error={errors?.department}
          required
          searchable
        />

        <Input
          label="Visit Date"
          type="date"
          value={formData?.visitDate || ''}
          onChange={(e) => handleInputChange('visitDate', e?.target?.value)}
          error={errors?.visitDate}
          required
          max={new Date()?.toISOString()?.split('T')?.[0]}
        />

        <Input
          label="Attending Physician (Optional)"
          type="text"
          placeholder="Dr. Smith, Dr. Johnson, etc."
          value={formData?.attendingPhysician || ''}
          onChange={(e) => handleInputChange('attendingPhysician', e?.target?.value)}
          description="Name of your primary doctor during this visit"
        />
      </div>
      {/* Additional Visit Details */}
      <div className="mt-6">
        <Input
          label="Reason for Visit (Optional)"
          type="text"
          placeholder="Brief description of your visit purpose"
          value={formData?.visitReason || ''}
          onChange={(e) => handleInputChange('visitReason', e?.target?.value)}
          description="Help us understand the context of your experience"
        />
      </div>
    </div>
  );
};

export default PatientDemographics;