
import { 
  CalendarCheck, 
  DollarSign, 
  Music, 
  Users, 
  Calendar, 
  Package,
  BarChart2
} from "lucide-react";
import { StatsCard } from "@/components/dashboard/stats-card";
import { UpcomingEvents } from "@/components/dashboard/upcoming-events";
import { RepertoireSummary } from "@/components/dashboard/repertoire-summary";

// Dados de exemplo
const mockEvents = [
  {
    id: "1",
    title: "Show no Pub Central",
    date: "25/04",
    time: "21:00",
    location: "Pub Central",
    type: "show" as const,
  },
  {
    id: "2",
    title: "Ensaio para evento",
    date: "22/04",
    time: "19:00",
    location: "Estúdio 42",
    type: "ensaio" as const,
  },
  {
    id: "3",
    title: "Reunião de planejamento",
    date: "21/04",
    time: "18:00",
    location: "Virtual",
    type: "reuniao" as const,
  },
];

const mockSongs = [
  {
    id: "1",
    title: "Californication",
    reference: "Red Hot Chili Peppers",
    tags: ["Rock"],
  },
  {
    id: "2",
    title: "Creep",
    reference: "Radiohead",
    tags: ["Alternativo"],
  },
  {
    id: "3",
    title: "Sweet Child O' Mine",
    reference: "Guns N' Roses",
    tags: ["Rock Clássico"],
  },
  {
    id: "4",
    title: "Nothing Else Matters",
    reference: "Metallica",
    tags: ["Metal"],
  },
  {
    id: "5",
    title: "Wonderwall",
    reference: "Oasis",
    tags: ["Britpop"],
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Visão geral da sua banda e próximas atividades.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Shows Agendados"
          value="7"
          description="Próximos 30 dias"
          icon={Calendar}
          trend={{ value: 12, isUpward: true }}
        />
        <StatsCard
          title="Músicas no Repertório"
          value="48"
          icon={Music}
        />
        <StatsCard
          title="Membros Ativos"
          value="5"
          icon={Users}
        />
        <StatsCard
          title="Receita Mensal"
          value="R$ 8.760"
          description="Abril 2025"
          icon={DollarSign}
          trend={{ value: 8, isUpward: true }}
        />
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-5">
        <div className="col-span-1 md:col-span-3">
          <UpcomingEvents events={mockEvents} />
        </div>
        <div className="col-span-1 md:col-span-2">
          <RepertoireSummary songs={mockSongs} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Equipamentos</CardTitle>
          </CardHeader>
          <CardContent className="h-72 flex items-center justify-center">
            <div className="text-center">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-sm font-medium">Controle de Equipamentos</h3>
              <p className="text-xs text-muted-foreground mt-1 mb-4">
                Gerencie os equipamentos da banda
              </p>
              <Button asChild size="sm">
                <Link to="/equipamentos">Ver Equipamentos</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Finanças</CardTitle>
          </CardHeader>
          <CardContent className="h-72 flex items-center justify-center">
            <div className="text-center">
              <BarChart2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-sm font-medium">Resumo Financeiro</h3>
              <p className="text-xs text-muted-foreground mt-1 mb-4">
                Acompanhe receitas e despesas
              </p>
              <Button asChild size="sm">
                <Link to="/financas">Ver Finanças</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Importações necessárias para componentes usados no Dashboard
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
