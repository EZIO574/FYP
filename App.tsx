import React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Layout } from './components/Layout';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Dashboard } from './components/Dashboard';
import { CampaignManager } from './components/CampaignManager';
import { ContentGenerator } from './components/ContentGenerator';
import { CompetitorAnalysis } from './components/CompetitorAnalysis';
import { Scheduler } from './components/Scheduler';
import { Analytics } from './components/Analytics';
import { Settings } from './components/Settings';
import { LeadsManager } from './components/LeadsManager';
import { EmailMarketing } from './components/EmailMarketing';
import { AutomationHub } from './components/AutomationHub';
import { Reports } from './components/Reports';
import { Notifications } from './components/Notifications';
import { ActivityLog } from './components/ActivityLog';
import { AudienceBuilder } from './components/AudienceBuilder';

// Protected Route Wrapper
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }
  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Switch>
      <Route path="/login">
        {isAuthenticated ? <Redirect to="/" /> : <Login />}
      </Route>
      <Route path="/register">
        {isAuthenticated ? <Redirect to="/" /> : <Register />}
      </Route>
      
      {/* Protected Routes */}
      <Route exact path="/">
        <ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>
      </Route>
      <Route path="/campaigns">
        <ProtectedRoute><Layout><CampaignManager /></Layout></ProtectedRoute>
      </Route>
      <Route path="/generate">
        <ProtectedRoute><Layout><ContentGenerator /></Layout></ProtectedRoute>
      </Route>
      <Route path="/audience">
        <ProtectedRoute><Layout><AudienceBuilder /></Layout></ProtectedRoute>
      </Route>
      <Route path="/competitors">
        <ProtectedRoute><Layout><CompetitorAnalysis /></Layout></ProtectedRoute>
      </Route>
      <Route path="/email">
        <ProtectedRoute><Layout><EmailMarketing /></Layout></ProtectedRoute>
      </Route>
      <Route path="/leads">
        <ProtectedRoute><Layout><LeadsManager /></Layout></ProtectedRoute>
      </Route>
      <Route path="/schedule">
        <ProtectedRoute><Layout><Scheduler /></Layout></ProtectedRoute>
      </Route>
      <Route path="/automation">
        <ProtectedRoute><Layout><AutomationHub /></Layout></ProtectedRoute>
      </Route>
      <Route path="/analytics">
        <ProtectedRoute><Layout><Analytics /></Layout></ProtectedRoute>
      </Route>
      <Route path="/settings">
        <ProtectedRoute><Layout><Settings /></Layout></ProtectedRoute>
      </Route>
      <Route path="/reports">
        <ProtectedRoute><Layout><Reports /></Layout></ProtectedRoute>
      </Route>
      <Route path="/notifications">
        <ProtectedRoute><Layout><Notifications /></Layout></ProtectedRoute>
      </Route>
      <Route path="/activity">
        <ProtectedRoute><Layout><ActivityLog /></Layout></ProtectedRoute>
      </Route>
      
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </AuthProvider>
  );
};

export default App;