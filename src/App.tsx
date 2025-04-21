
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
// import Disponibilidade from "./pages/Disponibilidade"; // REMOVIDO
import { AppLayout } from "./components/layout/app-layout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MusicianDirectory from "./pages/MusicianDirectory";
// novas páginas
import Contato from "./pages/Contato";
import Funcionalidades from "./pages/Funcionalidades";
import Precos from "./pages/Precos";
import Suporte from "./pages/Suporte";
import FAQ from "./pages/FAQ";
import Termos from "./pages/Termos";
import Privacidade from "./pages/Privacidade";
import Cookies from "./pages/Cookies";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/agenda" element={<AppLayout><Agenda /></AppLayout>} />
          <Route path="/repertorio" element={<AppLayout><Repertorio /></AppLayout>} />
          <Route path="/contatos" element={<AppLayout><Contatos /></AppLayout>} />
          <Route path="/financas" element={<AppLayout><Financas /></AppLayout>} />
          <Route path="/equipe" element={<AppLayout><Equipe /></AppLayout>} />
          <Route path="/equipamentos" element={<AppLayout><Equipamentos /></AppLayout>} />
          {/* <Route path="/disponibilidade" element={<AppLayout><Disponibilidade /></AppLayout>} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* novas rotas */}
          <Route path="/contato" element={<Contato />} />
          <Route path="/funcionalidades" element={<Funcionalidades />} />
          <Route path="/precos" element={<Precos />} />
          <Route path="/suporte" element={<Suporte />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/termos-de-uso" element={<Termos />} />
          <Route path="/privacidade" element={<Privacidade />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/encontrar-musicos" element={<MusicianDirectory />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
