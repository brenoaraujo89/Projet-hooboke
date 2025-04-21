
import { Music, Users, Calendar, DollarSign, List, Phone, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const featureList = [
  {
    icon: Calendar,
    title: "Calendário de Shows e Ensaios",
    desc: "Agende shows e ensaios com facilidade, compartilhe datas e detalhes com todos os membros da sua banda.",
  },
  {
    icon: List,
    title: "Repertório Inteligente",
    desc: "Organize músicas, setlists, anotações e referências de forma intuitiva.",
  },
  {
    icon: Users,
    title: "Gestão de Equipe",
    desc: "Centralize informações, funções e pagamentos de todos os membros e colaboradores.",
  },
  {
    icon: DollarSign,
    title: "Gestão Financeira",
    desc: "Registre receitas e despesas, visualize relatórios e saiba exatamente a saúde financeira da sua banda.",
  },
  {
    icon: Phone,
    title: "Gestão de Contatos",
    desc: "Mantenha contratos, histórico e informações de contratantes, casas de show e fornecedores organizados.",
  },
  {
    icon: Music,
    title: "Inventário de Equipamentos",
    desc: "Cadastre, organize e rastreie instrumentos e equipamentos, manutenção e propriedade.",
  },
];

export default function Index() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#F6F5FE] to-[#E5DEFF] flex flex-col">
      {/* HEADER */}
      <header className="w-full flex items-center justify-between px-6 md:px-12 py-4 backdrop-blur-sm bg-white/60 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Music size={28} className="text-primary" />
          <span className="text-2xl font-semibold tracking-tight text-[#6E59A5]">Hoobôke</span>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => navigate("/")} className="hidden sm:inline-flex">
            Início
          </Button>
          <Button variant="ghost" onClick={() => navigate("/encontrar-musicos")} className="hidden md:inline-flex">
            Contratar
          </Button>
          <Button variant="ghost" onClick={() => navigate("/contatos")} className="hidden md:inline-flex">
            Contato
          </Button>
          <Button variant="outline" onClick={() => navigate("/login")}>
            <LogIn className="mr-2 h-4 w-4" /> Login
          </Button>
          <Button onClick={() => navigate("/signup")} className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white">
            <UserPlus className="mr-2 h-4 w-4" /> Cadastre-se
          </Button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-12 gap-10">
        {/* Left: Text */}
        <div className="flex-1 flex flex-col items-start">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-[#1A1F2C] leading-tight">
            Gestão inteligente <span className="text-[#9b87f5]">para músicos e bandas</span>
          </h1>
          <p className="text-lg text-[#8E9196] mb-6 max-w-xl">
            O Hoobôke resolve a desorganização, dores na logística de eventos, contratos e gestão financeira da sua banda. Centralize tudo com praticidade em uma plataforma moderna, feita do seu jeito.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Button size="lg" onClick={() => navigate("/signup")} className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white font-semibold px-8 py-4 text-lg">
              Comece agora por R$17/mês
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/login")} className="font-semibold px-8 py-4 text-lg border-[#9b87f5] text-[#9b87f5]">
              Já tenho conta
            </Button>
          </div>
        </div>
        {/* Right: Illustration */}
        <div className="flex-1 flex justify-center relative">
          <div className="absolute -z-10 inset-0 bg-gradient-to-br from-[#9b87f5]/20 via-[#E5DEFF]/30 to-transparent rounded-full blur-3xl"></div>
          <div className="grid grid-cols-2 gap-4 relative">
            <div className="flex flex-col gap-4">
              <div className="bg-white p-4 rounded-lg shadow-lg transform rotate-3 h-40 w-40 flex items-center justify-center">
                <Calendar className="h-16 w-16 text-hooboke-600" />
              </div>
              <div className="bg-white p-4 rounded-lg shadow-lg transform -rotate-3 h-48 w-48 flex items-center justify-center">
                <DollarSign className="h-16 w-16 text-hooboke-600" />
              </div>
            </div>
            <div className="flex flex-col gap-4 mt-8">
              <div className="bg-white p-4 rounded-lg shadow-lg transform -rotate-3 h-48 w-48 flex items-center justify-center">
                <Music className="h-16 w-16 text-hooboke-600" />
              </div>
              <div className="bg-white p-4 rounded-lg shadow-lg transform rotate-3 h-40 w-40 flex items-center justify-center">
                <Users className="h-16 w-16 text-hooboke-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-6 md:px-20 w-full max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#6E59A5] mb-3">Tudo o que músicos e bandas precisam</h2>
          <p className="text-[#8E9196] text-lg max-w-2xl mx-auto">Funcionalidades completas para facilitar sua organização e alavancar sua carreira musical</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureList.map((f) => (
            <div key={f.title} className="bg-white rounded-2xl shadow-sm border border-[#F3F0FC] p-8 hover:shadow-lg hover:border-hooboke-300 transition-all duration-300">
              <div className="bg-[#F6F5FE] rounded-xl p-3 inline-block mb-4">
                <f.icon size={32} className="text-[#9b87f5]" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#1A1F2C]">{f.title}</h3>
              <p className="text-[#8E9196] text-base">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTRATANTES */}
      <section className="py-20 bg-gradient-to-r from-[#e5deff] via-[#f6f5fe] to-white">
        <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#6E59A5] mb-4">Contratantes, encontre músicos e bandas para seu evento</h2>
            <p className="mb-6 text-lg text-[#8E9196]">
              Navegue na lista de músicos e bandas disponíveis para contratação. Encontre a opção ideal para o seu evento!
            </p>
            <Button
              size="lg"
              className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white font-semibold px-10 py-4 text-lg"
              onClick={() => navigate("/encontrar-musicos")}
            >
              Ver lista de músicos e bandas
            </Button>
          </div>
          <div className="md:w-1/2 relative">
            <div className="absolute -z-10 inset-0 bg-gradient-to-br from-[#9b87f5]/20 via-[#E5DEFF]/30 to-transparent rounded-full blur-3xl"></div>
            <div className="bg-white p-6 rounded-2xl shadow-lg max-w-lg mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 border rounded-lg">
                  <div className="h-10 w-10 bg-hooboke-100 rounded-full flex items-center justify-center text-hooboke-600 font-bold">
                    MB
                  </div>
                  <div>
                    <h4 className="font-medium">Melody Band</h4>
                    <p className="text-xs text-gray-500">Rock, Pop • São Paulo</p>
                  </div>
                  <Badge className="ml-auto" variant="outline">Disponível</Badge>
                </div>
                <div className="flex items-center gap-4 p-3 border rounded-lg">
                  <div className="h-10 w-10 bg-hooboke-100 rounded-full flex items-center justify-center text-hooboke-600 font-bold">
                    JT
                  </div>
                  <div>
                    <h4 className="font-medium">Jazz Trio</h4>
                    <p className="text-xs text-gray-500">Jazz • Rio de Janeiro</p>
                  </div>
                  <Badge className="ml-auto" variant="outline">Disponível</Badge>
                </div>
                <div className="flex items-center gap-4 p-3 border rounded-lg">
                  <div className="h-10 w-10 bg-hooboke-100 rounded-full flex items-center justify-center text-hooboke-600 font-bold">
                    AS
                  </div>
                  <div>
                    <h4 className="font-medium">Acoustic Soul</h4>
                    <p className="text-xs text-gray-500">MPB, Soul • Belo Horizonte</p>
                  </div>
                  <Badge className="ml-auto" variant="outline">Disponível</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER / CTA */}
      <footer className="bg-white border-t border-[#ececec] pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Music size={24} className="text-primary" />
                <span className="text-xl font-semibold tracking-tight text-[#6E59A5]">Hoobôke</span>
              </div>
              <p className="text-[#8E9196] mb-4 max-w-md">
                Plataforma completa para gestão de músicos e bandas. Simplificamos a organização para que você possa focar no que realmente importa: a música.
              </p>
              <div className="flex gap-4">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </Button>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-[#1A1F2C] mb-4">Produto</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-[#8E9196] hover:text-[#6E59A5]">Funcionalidades</a></li>
                <li><a href="#" className="text-[#8E9196] hover:text-[#6E59A5]">Preços</a></li>
                <li><a href="#" className="text-[#8E9196] hover:text-[#6E59A5]">Suporte</a></li>
                <li><a href="#" className="text-[#8E9196] hover:text-[#6E59A5]">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-[#1A1F2C] mb-4">Empresa</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-[#8E9196] hover:text-[#6E59A5]">Sobre nós</a></li>
                <li><a href="#" className="text-[#8E9196] hover:text-[#6E59A5]">Blog</a></li>
                <li><a href="#" className="text-[#8E9196] hover:text-[#6E59A5]">Contato</a></li>
                <li><a href="#" className="text-[#8E9196] hover:text-[#6E59A5]">Carreiras</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-[#ececec] flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-[#8E9196] mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Hoobôke. Todos os direitos reservados.
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-[#8E9196] hover:text-[#6E59A5]">Termos de Uso</a>
              <a href="#" className="text-sm text-[#8E9196] hover:text-[#6E59A5]">Privacidade</a>
              <a href="#" className="text-sm text-[#8E9196] hover:text-[#6E59A5]">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Necessary imports
import { Badge } from "@/components/ui/badge";
