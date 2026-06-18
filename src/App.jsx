import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './layouts/AppLayout.jsx';
import LoadingState from './components/LoadingState.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import Login from './pages/Login.jsx';

const Dashboard = lazy(() => import('./pages/Dashboard.jsx'));
const EntryForm = lazy(() => import('./pages/EntryForm.jsx'));
const LandRecords = lazy(() => import('./pages/LandRecords.jsx'));
const Reports = lazy(() => import('./pages/Reports.jsx'));
const Settings = lazy(() => import('./pages/Settings.jsx'));
const WorkflowTracker = lazy(() => import('./pages/WorkflowTracker.jsx'));

function App() {
  return (
    <Suspense fallback={<LoadingState label="Loading workspace..." />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/entry" element={<EntryForm />} />
            <Route path="/entry/:recordId" element={<EntryForm />} />
            <Route path="/records" element={<LandRecords />} />
            <Route path="/workflow" element={<WorkflowTracker />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
