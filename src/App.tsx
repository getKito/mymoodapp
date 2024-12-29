import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PageTransition } from '@/components/routing/PageTransition';
import DashboardLayout from '@/components/layouts/DashboardLayout';

// Import pages from barrel file
const { Home, Auth, Donate, Database, Settings } = {
  Home: lazy(() => import('@/pages').then(m => ({ default: m.Home }))),
  Auth: lazy(() => import('@/pages').then(m => ({ default: m.Auth }))),
  Donate: lazy(() => import('@/pages').then(m => ({ default: m.Donate }))),
  Database: lazy(() => import('@/pages').then(m => ({ default: m.Database }))),
  Settings: lazy(() => import('@/pages').then(m => ({ default: m.Settings }))),
};

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Redirect root to auth */}
        <Route path="/" element={<Navigate to="/auth" replace />} />
        
        <Route path="/auth" element={
          <PageTransition>
            <Auth />
          </PageTransition>
        } />
        
        <Route element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route path="/home" element={
            <PageTransition>
              <Home />
            </PageTransition>
          } />
          <Route path="/donate" element={
            <PageTransition>
              <Donate />
            </PageTransition>
          } />
          <Route path="/database" element={
            <PageTransition>
              <Database />
            </PageTransition>
          } />
          <Route path="/settings" element={
            <PageTransition>
              <Settings />
            </PageTransition>
          } />
        </Route>
      </Routes>
    </AuthProvider>
  );
}