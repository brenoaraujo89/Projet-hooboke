
import { useNavigate } from "react-router-dom";
import { Music, Users, Search, UserSearch, List } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f9f8fc] via-[#e6e1f7] to-[#edeafd]">
      {/* Header */}
      <header className="w-full flex items-center justify-between px-6 md:px-12 py-4 bg-white/70 backdrop-blur-sm sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <Music size={28} className="text-primary" />
          <span className="text-2xl font-semibold tracking-tight text-[#6E59A5]">Hoobôke</span>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => navigate("/login")}>Login</Button>
          <Button onClick={() => navigate("/signup")} className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white">Cadastre-se</Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-1 flex-col items-center justify-center py-12 px-4 md:px-0">
        <div className="max-w-3xl text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A1F2C] leading-tight">
            Potencialize sua carreira na música com o <span className="text-[#8B5CF6]">Hoobôke</span>
          </h1>
          <p className="text-lg text-[#8E9196]">
            O SaaS completo para músicos, bandas e contratantes. Organize agendas, gerencie repertórios, conecte-se com oportunidades e sua equipe, e seja facilmente encontrado para novas gigs!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <Button
              size="lg"
              className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white shadow-md"
              onClick={() => navigate("/signup")}
            >
              Criar conta gratuita
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#7E69AB] text-[#7E69AB] hover:bg-[#edeafd]"
              onClick={() => navigate("/encontrar-musicos")}
            >
              <UserSearch className="mr-2" /> Encontrar músicos/bandas
            </Button>
          </div>
          <div className="flex flex-col items-center mt-6">
            <p className="text-sm text-[#888]">
              Já tem uma conta?{" "}
              <button
                className="text-[#9b87f5] hover:text-[#7E69AB] font-medium"
                onClick={() => navigate("/login")}
              >
                Entrar no Dashboard
              </button>
            </p>
          </div>
        </div>

        {/* Features Section */}
        <section className="mt-16 w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
            <Users className="mb-2 text-[#9b87f5]" size={36} />
            <h3 className="text-lg font-bold text-[#1A1F2C]">Equipe & Gestão</h3>
            <p className="text-sm text-[#8E9196]">Gerencie sua equipe, comunicação e agenda em uma só plataforma.</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
            <List className="mb-2 text-[#8B5CF6]" size={36} />
            <h3 className="text-lg font-bold text-[#1A1F2C]">Organização Simplificada</h3>
            <p className="text-sm text-[#8E9196]">Agendas, repertórios, finanças e contatos acessíveis e sincronizados.</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
            <Search className="mb-2 text-[#7E69AB]" size={36} />
            <h3 className="text-lg font-bold text-[#1A1F2C]">Contrate Talentos</h3>
            <p className="text-sm text-[#8E9196]">Contratantes encontram músicos e bandas por filtros, estilos e região.</p>
            <Button
              variant="link"
              className="mt-2 text-[#9b87f5] underline"
              onClick={() => navigate("/encontrar-musicos")}
            >
              Explorar músicos disponíveis
            </Button>
          </div>
        </section>

        {/* Call to action for contratantes */}
        <section className="mt-20 w-full max-w-4xl mx-auto rounded-xl bg-gradient-to-r from-[#faf7fe] via-[#edeafd] to-[#f9f8fc] p-8 shadow flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2 text-[#7E69AB] flex items-center">
              <UserSearch className="mr-2" /> Procurando por talentos musicais?
            </h2>
            <p className="text-[#8E9196] mb-4">
              Visualize músicos e bandas com disponibilidade real para sua festa, evento ou estabelecimento. Faça buscas por localidade, gênero, preço e solicite contato diretamente.
            </p>
            <Button
              size="lg"
              className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
              onClick={() => navigate("/encontrar-musicos")}
            >
              Encontrar músicos agora
            </Button>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <Music size={78} className="text-[#ddd] drop-shadow-sm" />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full mt-16 bg-white/90 border-t py-6 px-4 md:px-12 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Music size={22} className="text-primary" />
            <span className="font-semibold text-[#6E59A5] text-lg">Hoobôke</span>
          </div>
          <div className="flex gap-8 flex-wrap justify-center">
            <a href="/encontrar-musicos" className="text-[#8E9196] hover:text-[#7E69AB] text-sm transition">Encontrar músicos</a>
            <a href="mailto:contato@hooboke.com" className="text-[#8E9196] hover:text-[#7E69AB] text-sm transition">Contato</a>
            <a href="#" className="text-[#8E9196] hover:text-[#7E69AB] text-sm transition">Termos de uso</a>
            <a href="#" className="text-[#8E9196] hover:text-[#7E69AB] text-sm transition">Privacidade</a>
          </div>
          <div className="text-xs text-[#8E9196]">
            &copy; {new Date().getFullYear()} Hoobôke. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
