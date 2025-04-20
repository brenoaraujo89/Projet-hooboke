
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
      <header className="w-full flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <Music size={28} className="text-primary" />
          <span className="text-2xl font-semibold tracking-tight text-[#6E59A5]">Hoobôke</span>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => navigate("/")} className="hidden sm:inline-flex">
            Início
          </Button>
          <Button variant="ghost" onClick={() => navigate("/contatos")} className="hidden md:inline-flex">
            Contato
          </Button>
          <Button variant="outline" onClick={() => navigate("/login")}>
            <LogIn className="mr-2" /> Login
          </Button>
          <Button onClick={() => navigate("/signup")} className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white">
            <UserPlus className="mr-2" /> Cadastre-se
          </Button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 py-12 gap-10 bg-gradient-to-b from-[#E5DEFF]/20 to-transparent">
        {/* Left: Text */}
        <div className="flex-1 flex flex-col items-start">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#1A1F2C] leading-tight">
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
        <div className="flex-1 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=600&q=80"
            alt="Músicos organizando repertório"
            className="rounded-xl shadow-xl border border-[#E5DEFF] w-[340px] md:w-[400px] lg:w-[500px] object-cover"
            loading="lazy"
          />
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-12 px-6 md:px-20 w-full max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-[#6E59A5] mb-6 text-center">Tudo o que músicos e bandas precisam</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {featureList.map((f) => (
            <div key={f.title} className="bg-white rounded-2xl shadow-sm border border-[#F3F0FC] p-6 hover:scale-[1.03] transition-transform">
              <f.icon size={32} className="mb-3 text-[#9b87f5]" />
              <h3 className="text-xl font-bold mb-2 text-[#1A1F2C]">{f.title}</h3>
              <p className="text-[#8E9196] text-base">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTRATANTES */}
      <section className="py-16 bg-gradient-to-r from-[#e5deff] via-[#f6f5fe] to-white border-t border-[#F3F0FC]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-[#6E59A5] mb-2">Contratantes, encontre bandas e músicos para seu evento</h2>
          <p className="mb-6 text-lg text-[#8E9196]">
            Navegue na lista de músicos e bandas disponíveis para contratação. Encontre a opção ideal para o seu evento!
          </p>
          <Button
            size="lg"
            className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white font-semibold px-10 py-4 text-lg mt-4"
            onClick={() => navigate("/disponibilidade")}
          >
            Ver lista de músicos e bandas
          </Button>
        </div>
      </section>

      {/* FOOTER / CTA */}
      <footer className="mt-auto py-8 text-center text-[#8E9196] bg-white border-t border-[#ececec]">
        <div className="mb-2 font-medium text-[#6E59A5]">
          Junte-se ao Hoobôke e transforme a organização da sua banda!
        </div>
        <div className="flex justify-center gap-4 mb-4">
          <Button onClick={() => navigate("/signup")} className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white font-semibold" size="sm">
            Cadastre-se
          </Button>
          <Button variant="outline" onClick={() => navigate("/login")} className="border-[#9b87f5] text-[#9b87f5]" size="sm">
            Login
          </Button>
        </div>
        <div className="text-xs">Hoobôke &copy; {new Date().getFullYear()}. Feito para músicos. Plataforma SaaS.</div>
      </footer>
    </div>
  );
}
