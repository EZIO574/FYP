import React, { Suspense, lazy } from "react";
import { HashRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Layout } from "@/components/layout/Layout";
import { Loader2 } from "lucide-react";

// Lazy Load Components
const Login = lazy(() =>
  import("@/features/auth/Login").then((m) => ({ default: m.Login })),
);
const Register = lazy(() =>
  import("@/features/auth/Register").then((m) => ({ default: m.Register })),
);
const Dashboard = lazy(() =>
  import("@/features/dashboard/Dashboard").then((m) => ({
    default: m.Dashboard,
  })),
);
const CampaignManager = lazy(() =>
  import("@/features/campaigns/CampaignManager").then((m) => ({
    default: m.CampaignManager,
  })),
);
const ContentGenerator = lazy(() =>
  import("@/features/content-studio/ContentGenerator").then((m) => ({
    default: m.ContentGenerator,
  })),
);
const AudienceBuilder = lazy(() =>
  import("@/features/audience/AudienceBuilder").then((m) => ({
    default: m.AudienceBuilder,
  })),
);
const CompetitorAnalysis = lazy(() =>
  import("@/features/competitors/CompetitorAnalysis").then((m) => ({
    default: m.CompetitorAnalysis,
  })),
);
const EmailMarketing = lazy(() =>
  import("@/features/email/EmailMarketing").then((m) => ({
    default: m.EmailMarketing,
  })),
);
const LeadsManager = lazy(() =>
  import("@/features/leads/LeadsManager").then((m) => ({
    default: m.LeadsManager,
  })),
);
const Scheduler = lazy(() =>
  import("@/features/scheduler/Scheduler").then((m) => ({
    default: m.Scheduler,
  })),
);
const AutomationHub = lazy(() =>
  import("@/features/automation/AutomationHub").then((m) => ({
    default: m.AutomationHub,
  })),
);
const Analytics = lazy(() =>
  import("@/features/analytics/Analytics").then((m) => ({
    default: m.Analytics,
  })),
);
const Settings = lazy(() =>
  import("@/features/settings/Settings").then((m) => ({ default: m.Settings })),
);
const Reports = lazy(() =>
  import("@/features/reports/Reports").then((m) => ({ default: m.Reports })),
);
const Notifications = lazy(() =>
  import("@/features/notifications/Notifications").then((m) => ({
    default: m.Notifications,
  })),
);
const ActivityLog = lazy(() =>
  import("@/features/activity-log/ActivityLog").then((m) => ({
    default: m.ActivityLog,
  })),
);

const PageLoader = () => (
  <div className="h-full w-full flex items-center justify-center text-slate-400 min-h-[400px]">
    <Loader2 size={40} className="animate-spin text-blue-600" />
  </div>
);

const ProtectedLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Layout />;
};

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/" replace /> : <Register />}
        />

        {/* Protected Feature Routes */}
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/campaigns" element={<CampaignManager />} />
          <Route path="/generate" element={<ContentGenerator />} />
          <Route path="/audience" element={<AudienceBuilder />} />
          <Route path="/competitors" element={<CompetitorAnalysis />} />
          <Route path="/email" element={<EmailMarketing />} />
          <Route path="/leads" element={<LeadsManager />} />
          <Route path="/schedule" element={<Scheduler />} />
          <Route path="/automation" element={<AutomationHub />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/activity" element={<ActivityLog />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

const App: React.FC = () => (
  <AuthProvider>
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  </AuthProvider>
);

export default App;
