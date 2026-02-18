import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import ReportHarassment from "./pages/ReportHarassment";
import MyReports from "./pages/MyReports";
import ReportDetail from "./pages/ReportDetail";
import AdminDashboard from "./pages/AdminDashboard";
import AllReports from "./pages/admin/AllReports";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminReportDetail from "./pages/admin/AdminReportDetail";
import Analytics from "./pages/admin/Analytics";
import Resources from "./pages/Resources";
import Team from "./pages/Team";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/team" element={<Team />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard/report" element={<ProtectedRoute><ReportHarassment /></ProtectedRoute>} />
            <Route path="/dashboard/my-reports" element={<ProtectedRoute><MyReports /></ProtectedRoute>} />
            <Route path="/dashboard/my-reports/:id" element={<ProtectedRoute><ReportDetail /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/all-reports" element={<ProtectedRoute requireAdmin><AllReports /></ProtectedRoute>} />
            <Route path="/admin/reports/:id" element={<ProtectedRoute requireAdmin><AdminReportDetail /></ProtectedRoute>} />
            <Route path="/admin/analytics" element={<ProtectedRoute requireAdmin><Analytics /></ProtectedRoute>} />
            <Route path="/admin/settings" element={<ProtectedRoute requireAdmin><AdminSettings /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
