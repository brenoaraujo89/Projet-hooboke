import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Agenda from "./pages/Agenda";
import Repertorio from "./pages/Repertorio";
import Contatos from "./pages/Contatos";
import Financas from "./pages/Financas";
import Equipe from "./pages/Equipe";
import Equipamentos from "./pages/Equipamentos";
import Disponibilidade from "./pages/Disponibilidade";
import { AppLayout } from "./components/layout/app-layout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/agenda" element={<AppLayout><Agenda /></AppLayout>} />
          <Route path="/repertorio" element={<AppLayout><Repertorio /></AppLayout>} />
          <Route path="/contatos" element={<AppLayout><Contatos /></AppLayout>} />
          <Route path="/financas" element={<AppLayout><Financas /></AppLayout>} />
          <Route path="/equipe" element={<AppLayout><Equipe /></AppLayout>} />
          <Route path="/equipamentos" element={<AppLayout><Equipamentos /></AppLayout>} />
          <Route path="/disponibilidade" element={<AppLayout><Disponibilidade /></AppLayout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
