import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MarketSelector />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/schools" element={<SchoolsLanding />} />
            <Route path="/students" element={<StudentsLanding />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/portal" 
              element={
                <ProtectedRoute allowedRoles={["student"]}>
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
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
