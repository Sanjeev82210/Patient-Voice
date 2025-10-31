import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import PatientFeedbackForm from './pages/patient-feedback-form';
import LoginPage from './pages/login';
import FeedbackAnalytics from './pages/feedback-analytics';
import FeedbackManagement from './pages/feedback-management';
import FeedbackDashboard from './pages/feedback-dashboard';
import Reports from './pages/reports';
import AnalyticsOverview from './pages/analytics-overview';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Define your route here */}
          <Route path="/" element={<FeedbackDashboard />} />
          <Route path="/patient-feedback-form" element={<PatientFeedbackForm />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/feedback-analytics" element={<FeedbackAnalytics />} />
          <Route path="/analytics-overview" element={<AnalyticsOverview />} />
          <Route path="/feedback-management" element={<FeedbackManagement />} />
          <Route path="/feedback-dashboard" element={<FeedbackDashboard />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
