import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";

// Route-based code splitting
const NotFound = lazy(() => import("./pages/NotFound"));
const PatientFeedbackForm = lazy(() => import("./pages/patient-feedback-form"));
const LoginPage = lazy(() => import("./pages/login"));
const FeedbackAnalytics = lazy(() => import("./pages/feedback-analytics"));
const FeedbackManagement = lazy(() => import("./pages/feedback-management"));
const FeedbackDashboard = lazy(() => import("./pages/feedback-dashboard"));
const Reports = lazy(() => import("./pages/reports"));
const AnalyticsOverview = lazy(() => import("./pages/analytics-overview"));
const QRCodePage = lazy(() => import("./pages/qr-code"));

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <Suspense fallback={<div className="p-6 text-sm text-muted-foreground">Loading…</div>}>
          <RouterRoutes>
            <Route path="/" element={<FeedbackDashboard />} />
            <Route path="/patient-feedback-form" element={<PatientFeedbackForm />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/feedback-analytics" element={<FeedbackAnalytics />} />
            <Route path="/analytics-overview" element={<AnalyticsOverview />} />
            <Route path="/feedback-management" element={<FeedbackManagement />} />
            <Route path="/feedback-dashboard" element={<FeedbackDashboard />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/qr-code" element={<QRCodePage />} />
            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
