import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import MarketSelector from "./pages/MarketSelector";
import SchoolsLanding from "./pages/SchoolsLanding";
import StudentsLanding from "./pages/StudentsLanding";
import NotFound from "./pages/NotFound";
import TestPage from "./pages/TestPage";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import SchoolLeadsPage from "./pages/admin/SchoolLeadsPage";
import StudentSignupsPage from "./pages/admin/StudentSignupsPage";
import PaymentsPage from "./pages/admin/PaymentsPage";
import StudentPortal from "./pages/StudentPortal";
import SchoolDashboard from "./pages/school/SchoolDashboard";
import SchoolStudentsPage from "./pages/school/SchoolStudentsPage";
import SchoolPerformance from "./pages/school/SchoolPerformance";
import SchoolSettings from "./pages/school/SchoolSettings";
import ParentDashboard from "./pages/parent/ParentDashboard";
import ParentActivity from "./pages/parent/ParentActivity";
import ParentPayments from "./pages/parent/ParentPayments";
import ParentSettings from "./pages/parent/ParentSettings";
import DemoCredentials from "./pages/DemoCredentials";
import PSEOPage from "./pages/PSEOPage";
import BlogIndex from "./pages/BlogIndex";
import ContentReview from "./pages/admin/ContentReview";
import { HelmetProvider } from 'react-helmet-async';

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <HelmetProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
            <Route path="/" element={<MarketSelector />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/demo" element={<DemoCredentials />} />
            <Route path="/schools" element={<SchoolsLanding />} />
            <Route path="/students" element={<StudentsLanding />} />
            <Route path="/resources" element={<BlogIndex />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/portal" 
              element={
                <ProtectedRoute allowedRoles={["student", "admin"]}>
                  <StudentPortal />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student-portal" 
              element={
                <ProtectedRoute allowedRoles={["student", "admin"]}>
                  <StudentPortal />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/leads" 
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <SchoolLeadsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/students" 
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <StudentSignupsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/payments" 
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <PaymentsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/content-review" 
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <ContentReview />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/school" 
              element={
                <ProtectedRoute allowedRoles={["school", "admin"]}>
                  <SchoolDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/school/students" 
              element={
                <ProtectedRoute allowedRoles={["school", "admin"]}>
                  <SchoolStudentsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/school/dashboard" 
              element={
                <ProtectedRoute allowedRoles={["school", "admin"]}>
                  <SchoolDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/school/performance" 
              element={
                <ProtectedRoute allowedRoles={["school", "admin"]}>
                  <SchoolPerformance />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/school/settings" 
              element={
                <ProtectedRoute allowedRoles={["school", "admin"]}>
                  <SchoolSettings />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/parent" 
              element={
                <ProtectedRoute allowedRoles={["parent", "admin"]}>
                  <ParentDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/parent/dashboard" 
              element={
                <ProtectedRoute allowedRoles={["parent", "admin"]}>
                  <ParentDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/parent/activity" 
              element={
                <ProtectedRoute allowedRoles={["parent", "admin"]}>
                  <ParentActivity />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/parent/payments" 
              element={
                <ProtectedRoute allowedRoles={["parent", "admin"]}>
                  <ParentPayments />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/parent/settings" 
              element={
                <ProtectedRoute allowedRoles={["parent", "admin"]}>
                  <ParentSettings />
                </ProtectedRoute>
              } 
            />
            
            {/* pSEO Dynamic Routes - MUST BE BEFORE CATCH-ALL */}
            <Route path="/pseo/:slug" element={<PSEOPage />} />
            <Route path="/:slug" element={<PSEOPage />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
    </AuthProvider>
  </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
