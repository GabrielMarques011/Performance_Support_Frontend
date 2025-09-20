// App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./hooks/useAuth.tsx";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import IndividualDashboard from "./pages/IndividualDashboard";
import ManageUsers from "./pages/ManageUsers.tsx";
import CreateUser from "./pages/CreateUsers.tsx";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute"; // ✅ NOVO

const queryClient = new QueryClient();

function AppRoutes() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white text-slate-700 font-semibold">
        Carregando autenticação...
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={!user ? <Index /> : (
          <Navigate to={user.role === "admin" ? "/dashboard" : "/individual"} replace />
        )}
      />

      {/* Dashboard do Admin */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Layout><Dashboard /></Layout>
          </ProtectedRoute>
        }
      />

      {/* Dashboard individual do usuário */}
      <Route
        path="/individual"
        element={
          <ProtectedRoute allowedRoles={["user", "admin"]}>
            <Layout><IndividualDashboard /></Layout>
          </ProtectedRoute>
        }
      />

      {/* Rotas exclusivas do Admin */}
      <Route
        path="/manage"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Layout><ManageUsers /></Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/create"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Layout><CreateUser /></Layout>
          </ProtectedRoute>
        }
      />

      {/* Página 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
