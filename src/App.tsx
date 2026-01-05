import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MarketSelector from "./pages/MarketSelector";
import SchoolsLanding from "./pages/SchoolsLanding";
import StudentsLanding from "./pages/StudentsLanding";
import NotFound from "./pages/NotFound";
import TestPage from "./pages/TestPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import SchoolLeadsPage from "./pages/admin/SchoolLeadsPage";
import StudentSignupsPage from "./pages/admin/StudentSignupsPage";
import PaymentsPage from "./pages/admin/PaymentsPage";
import StudentPortal from "./pages/StudentPortal";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MarketSelector />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/schools" element={<SchoolsLanding />} />
          <Route path="/students" element={<StudentsLanding />} />
          <Route path="/portal" element={<StudentPortal />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/leads" element={<SchoolLeadsPage />} />
          <Route path="/admin/students" element={<StudentSignupsPage />} />
          <Route path="/admin/payments" element={<PaymentsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
