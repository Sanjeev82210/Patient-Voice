import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const StaffPerformanceMetrics = ({ className = '' }) => {
  const [viewMode, setViewMode] = useState('ratings'); // ratings, mentions, correlation

  const staffData = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    department: 'Cardiology',
    role: 'Cardiologist',
    avatar: "https://images.unsplash.com/photo-1592041828835-4216e6af4a78",
    avatarAlt: 'Professional headshot of middle-aged woman with brown hair in white medical coat',
    avgRating: 4.8,
    totalMentions: 156,
    positiveMentions: 142,
    negativeMentions: 14,
    responseRate: 95,
    patientCount: 89,
    categories: {
      medicalCare: 4.9,
      communication: 4.7,
      professionalism: 4.8,
      empathy: 4.6
    }
  },
  {
    id: 2,
    name: 'Dr. Michael Smith',
    department: 'Emergency',
    role: 'Emergency Physician',
    avatar: "https://images.unsplash.com/photo-1729162128021-f37dca3ff30d",
    avatarAlt: 'Professional headshot of middle-aged man with gray hair in blue scrubs',
    avgRating: 4.3,
    totalMentions: 203,
    positiveMentions: 167,
    negativeMentions: 36,
    responseRate: 78,
    patientCount: 145,
    categories: {
      medicalCare: 4.5,
      communication: 4.1,
      professionalism: 4.4,
      empathy: 4.0
    }
  },
  {
    id: 3,
    name: 'Nurse Jennifer Williams',
    department: 'Pediatrics',
    role: 'Registered Nurse',
    avatar: "https://images.unsplash.com/photo-1612944095914-33fd0a85fcfc",
    avatarAlt: 'Professional headshot of young woman with blonde hair in colorful scrubs',
    avgRating: 4.7,
    totalMentions: 134,
    positiveMentions: 125,
    negativeMentions: 9,
    responseRate: 92,
    patientCount: 78,
    categories: {
      medicalCare: 4.6,
      communication: 4.8,
      professionalism: 4.7,
      empathy: 4.9
    }
  },
  {
    id: 4,
    name: 'Dr. Lisa Chen',
    department: 'Surgery',
    role: 'Surgeon',
    avatar: "https://images.unsplash.com/photo-1646041805292-fd77781436f9",
    avatarAlt: 'Professional headshot of Asian woman with black hair in surgical scrubs',
    avgRating: 4.6,
    totalMentions: 98,
    positiveMentions: 89,
    negativeMentions: 9,
    responseRate: 88,
    patientCount: 52,
    categories: {
      medicalCare: 4.8,
      communication: 4.4,
      professionalism: 4.7,
      empathy: 4.3
    }
  },
  {
    id: 5,
    name: 'Nurse David Brown',
    department: 'Orthopedics',
    role: 'Registered Nurse',
    avatar: "https://images.unsplash.com/photo-1616458201204-7f0108120213",
    avatarAlt: 'Professional headshot of young man with brown hair in navy scrubs',
    avgRating: 4.2,
    totalMentions: 87,
    positiveMentions: 71,
    negativeMentions: 16,
    responseRate: 85,
    patientCount: 64,
    categories: {
      medicalCare: 4.3,
      communication: 4.0,
      professionalism: 4.2,
      empathy: 4.1
    }
  },
  {
    id: 6,
    name: 'Tech Lisa Davis',
    department: 'Radiology',
    role: 'Radiology Technician',
    avatar: "https://images.unsplash.com/photo-1735220984824-e615aa68c2aa",
    avatarAlt: 'Professional headshot of young woman with red hair in medical uniform',
    avgRating: 4.1,
    totalMentions: 76,
    positiveMentions: 58,
    negativeMentions: 18,
    responseRate: 72,
    patientCount: 112,
    categories: {
      medicalCare: 4.2,
      communication: 3.9,
      professionalism: 4.1,
      empathy: 3.8
    }
  }];


  const performanceCorrelation = staffData?.map((staff) => ({
    name: staff?.name,
    rating: staff?.avgRating,
    mentions: staff?.totalMentions,
    responseRate: staff?.responseRate,
    patientCount: staff?.patientCount
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg shadow-clinical-modal p-3">
          <p className="text-sm font-medium text-foreground mb-2">{data?.name}</p>
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Rating:</span>
              <span className="text-sm font-medium text-foreground">{data?.avgRating}/5</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Mentions:</span>
              <span className="text-sm font-medium text-foreground">{data?.totalMentions}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Department:</span>
              <span className="text-sm font-medium text-foreground">{data?.department}</span>
            </div>
          </div>
        </div>);

    }
    return null;
  };

  const renderRatingsChart = () =>
  <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={staffData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis
          dataKey="name"
          stroke="var(--color-muted-foreground)"
          fontSize={12}
          angle={-45}
          textAnchor="end"
          height={100} />

          <YAxis
          domain={[3.5, 5]}
          stroke="var(--color-muted-foreground)"
          fontSize={12} />

          <Tooltip content={<CustomTooltip />} />
          <Bar
          dataKey="avgRating"
          fill="var(--color-primary)"
          radius={[4, 4, 0, 0]} />

        </BarChart>
      </ResponsiveContainer>
    </div>;


  const renderMentionsChart = () =>
  <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={staffData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis
          dataKey="name"
          stroke="var(--color-muted-foreground)"
          fontSize={12}
          angle={-45}
          textAnchor="end"
          height={100} />

          <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
          <Tooltip />
          <Bar dataKey="positiveMentions" stackId="a" fill="#10B981" name="Positive" />
          <Bar dataKey="negativeMentions" stackId="a" fill="#EF4444" name="Negative" />
        </BarChart>
      </ResponsiveContainer>
    </div>;


  const renderCorrelationChart = () =>
  <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart data={performanceCorrelation} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis
          dataKey="mentions"
          stroke="var(--color-muted-foreground)"
          fontSize={12}
          name="Total Mentions" />

          <YAxis
          dataKey="rating"
          domain={[3.5, 5]}
          stroke="var(--color-muted-foreground)"
          fontSize={12}
          name="Average Rating" />

          <Tooltip />
          <Scatter dataKey="rating" fill="var(--color-primary)" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>;


  return (
    <div className={`card-clinical ${className}`}>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center">
            <Icon name="Users" size={20} className="text-indigo-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Staff Performance Metrics</h3>
            <p className="text-sm text-muted-foreground">Individual staff feedback analysis</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'ratings' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('ratings')}>

            Ratings
          </Button>
          <Button
            variant={viewMode === 'mentions' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('mentions')}>

            Mentions
          </Button>
          <Button
            variant={viewMode === 'correlation' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('correlation')}>

            Correlation
          </Button>
        </div>
      </div>
      {/* Chart Display */}
      {viewMode === 'ratings' && renderRatingsChart()}
      {viewMode === 'mentions' && renderMentionsChart()}
      {viewMode === 'correlation' && renderCorrelationChart()}
      {/* Staff Performance Table */}
      <div className="mt-6 pt-4 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-4">Individual Performance Details</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 text-muted-foreground font-medium">Staff Member</th>
                <th className="text-center py-2 text-muted-foreground font-medium">Rating</th>
                <th className="text-center py-2 text-muted-foreground font-medium">Mentions</th>
                <th className="text-center py-2 text-muted-foreground font-medium">Response Rate</th>
                <th className="text-center py-2 text-muted-foreground font-medium">Patients</th>
                <th className="text-center py-2 text-muted-foreground font-medium">Trend</th>
              </tr>
            </thead>
            <tbody>
              {staffData?.map((staff) =>
              <tr key={staff?.id} className="border-b border-border hover:bg-muted/50 clinical-transition">
                  <td className="py-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                        src={staff?.avatar}
                        alt={staff?.avatarAlt}
                        className="w-full h-full object-cover" />

                      </div>
                      <div>
                        <div className="font-medium text-foreground">{staff?.name}</div>
                        <div className="text-xs text-muted-foreground">{staff?.role} • {staff?.department}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-center py-3">
                    <div className="flex items-center justify-center space-x-1">
                      <span className="font-medium text-foreground">{staff?.avgRating}</span>
                      <Icon name="Star" size={14} className="text-amber-500 fill-current" />
                    </div>
                  </td>
                  <td className="text-center py-3">
                    <div className="text-foreground">
                      <div className="font-medium">{staff?.totalMentions}</div>
                      <div className="text-xs text-muted-foreground">
                        {staff?.positiveMentions}+ / {staff?.negativeMentions}-
                      </div>
                    </div>
                  </td>
                  <td className="text-center py-3">
                    <div className="flex items-center justify-center space-x-1">
                      <span className="font-medium text-foreground">{staff?.responseRate}%</span>
                      {staff?.responseRate >= 90 ?
                    <Icon name="CheckCircle" size={14} className="text-emerald-600" /> :
                    staff?.responseRate >= 80 ?
                    <Icon name="AlertCircle" size={14} className="text-amber-600" /> :

                    <Icon name="XCircle" size={14} className="text-red-600" />
                    }
                    </div>
                  </td>
                  <td className="text-center py-3 font-medium text-foreground">
                    {staff?.patientCount}
                  </td>
                  <td className="text-center py-3">
                    <div className="flex items-center justify-center">
                      <Icon name="TrendingUp" size={14} className="text-emerald-600" />
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Performance Categories */}
      <div className="mt-6 pt-4 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-4">Performance by Category</h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Performers */}
          <div>
            <h5 className="text-xs font-medium text-emerald-600 mb-3 flex items-center space-x-1">
              <Icon name="Award" size={14} />
              <span>Top Performers</span>
            </h5>
            <div className="space-y-3">
              {staffData?.sort((a, b) => b?.avgRating - a?.avgRating)?.slice(0, 3)?.map((staff, index) =>
              <div key={staff?.id} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xs font-medium">
                      {index + 1}
                    </div>
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                    src={staff?.avatar}
                    alt={staff?.avatarAlt}
                    className="w-full h-full object-cover" />

                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground">{staff?.name}</div>
                      <div className="text-xs text-muted-foreground">{staff?.department}</div>
                    </div>
                    <div className="text-sm font-medium text-emerald-600">{staff?.avgRating}</div>
                  </div>
              )}
            </div>
          </div>

          {/* Most Mentioned */}
          <div>
            <h5 className="text-xs font-medium text-blue-600 mb-3 flex items-center space-x-1">
              <Icon name="MessageSquare" size={14} />
              <span>Most Mentioned</span>
            </h5>
            <div className="space-y-3">
              {staffData?.sort((a, b) => b?.totalMentions - a?.totalMentions)?.slice(0, 3)?.map((staff, index) =>
              <div key={staff?.id} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">
                      {index + 1}
                    </div>
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                    src={staff?.avatar}
                    alt={staff?.avatarAlt}
                    className="w-full h-full object-cover" />

                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground">{staff?.name}</div>
                      <div className="text-xs text-muted-foreground">{staff?.department}</div>
                    </div>
                    <div className="text-sm font-medium text-blue-600">{staff?.totalMentions}</div>
                  </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>);

};

export default StaffPerformanceMetrics;