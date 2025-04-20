
import { useState } from "react";
import { 
  MapPin, Calendar, Music, Search, Filter, Plus, 
  MoreHorizontal, Phone, ArrowUpDown 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Dados de exemplo
const mockAvailability = [
  {
    id: "1",
    dates: ["2025-05-15", "2025-05-16", "2025-05-17"],
    eventType: "Show",
    location: "São Paulo, SP",
    genre: "Rock, Pop, Acústico",
    technicalDetails: "Equipamento próprio de som para ambientes até 100 pessoas",
    contactInfo: "+55 11 98765-4321",
    notes: "Disponíveis para shows de até 2 horas. Repertório variado.",
    isActive: true,
  },
  {
    id: "2",
    dates: ["2025-06-10", "2025-06-11"],
    eventType: "Casamento",
    location: "Campinas, SP",
    genre: "Pop, MPB, Internacional",
    technicalDetails: "Precisa de sistema de som no local",
    contactInfo: "+55 11 98765-4321",
    notes: "Formato acústico ou banda completa. Repertório personalizado disponível.",
    isActive: true,
  },
  {
    id: "3",
    dates: ["2025-06-25", "2025-06-26", "2025-06-27", "2025-06-28"],
    eventType: "Evento Corporativo",
    location: "São Paulo, SP",
    genre: "Jazz, Lounge, Pop",
    technicalDetails: "Precisa de sistema de som no local. Equipe de 4 pessoas.",
    contactInfo: "+55 11 98765-4321",
    notes: "Especializados em música ambiente para eventos corporativos.",
    isActive: true,
  },
  {
    id: "4",
    dates: ["2025-07-15", "2025-07-16", "2025-07-17"],
    eventType: "Festival",
    location: "Qualquer cidade",
    genre: "Rock, Alternativo",
    technicalDetails: "Equipamento próprio de som para ambientes médios",
    contactInfo: "+55 11 98765-4321",
    notes: "Setlist de músicas autorais e covers.",
    isActive: false,
  },
];

// Função auxiliar para formatação de data
const formatDateRange = (dates) => {
  if (!dates || dates.length === 0) return "Sem datas";
  
  if (dates.length === 1) {
    return new Date(dates[0]).toLocaleDateString("pt-BR");
  }
  
  const startDate = new Date(dates[0]).toLocaleDateString("pt-BR");
  const endDate = new Date(dates[dates.length - 1]).toLocaleDateString("pt-BR");
  
  if (startDate === endDate) return startDate;
  
  return `${startDate} a ${endDate}`;
};

// Componente para cartão de disponibilidade
function AvailabilityCard({ availability }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{availability.eventType}</CardTitle>
            <CardDescription>
              {formatDateRange(availability.dates)}
            </CardDescription>
          </div>
          {!availability.isActive && (
            <Badge variant="outline" className="text-muted-foreground">
              Inativo
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center text-sm">
          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>{availability.location}</span>
        </div>
        <div>
          <p className="text-sm font-medium">Gêneros musicais</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {availability.genre.split(",").map((genre, index) => (
              <Badge key={index} variant="outline">
                {genre.trim()}
              </Badge>
            ))}
          </div>
        </div>
        {availability.technicalDetails && (
          <div>
            <p className="text-sm font-medium">Detalhes técnicos</p>
            <p className="text-sm text-muted-foreground">
              {availability.technicalDetails}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" asChild>
          <a href={`https://wa.me/${availability.contactInfo.replace(/\D/g, '')}`} target="_blank">
            <Phone className="h-4 w-4 mr-2" />
            Contato
          </a>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem>Editar</DropdownMenuItem>
            <DropdownMenuItem>
              {availability.isActive
                ? "Desativar Listagem"
                : "Ativar Listagem"}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
}

export default function Disponibilidade() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEventType, setSelectedEventType] = useState("");
  const [showInactiveListings, setShowInactiveListings] = useState(false);
  const [view, setView] = useState<"grid" | "table">("grid");

  // Extrair tipos de eventos únicos
  const eventTypes = Array.from(
    new Set(mockAvailability.map((a) => a.eventType))
  ).sort();

  // Filtrar disponibilidades
  const filteredAvailability = mockAvailability.filter((avail) => {
    const matchesSearch =
      searchQuery === "" ||
      avail.eventType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      avail.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      avail.genre.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesEventType =
      selectedEventType === "" || avail.eventType === selectedEventType;

    const matchesActive = showInactiveListings || avail.isActive;

    return matchesSearch && matchesEventType && matchesActive;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Disponibilidade</h1>
          <p className="text-muted-foreground">
            Gerencie suas listagens de disponibilidade para contratantes
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nova Listagem
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Criar Nova Listagem de Disponibilidade</DialogTitle>
              <DialogDescription>
                Informe datas disponíveis e detalhes para contratantes
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="date-range">Datas Disponíveis</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="start-date" className="text-xs">De</Label>
                      <Input id="start-date" type="date" />
                    </div>
                    <div>
                      <Label htmlFor="end-date" className="text-xs">Até</Label>
                      <Input id="end-date" type="date" />
                    </div>
                  </div>
                </div>
                <div className="col-span-2">
                  <Label htmlFor="event-type">Tipo de Evento</Label>
                  <Select>
                    <SelectTrigger id="event-type">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Show">Show</SelectItem>
                      <SelectItem value="Casamento">Casamento</SelectItem>
                      <SelectItem value="Evento Corporativo">Evento Corporativo</SelectItem>
                      <SelectItem value="Festival">Festival</SelectItem>
                      <SelectItem value="Aniversário">Aniversário</SelectItem>
                      <SelectItem value="Outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <Label htmlFor="location">Localização</Label>
                  <Input id="location" placeholder="Cidade, Estado ou 'Qualquer cidade'" />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="genre">Gêneros Musicais</Label>
                  <Input id="genre" placeholder="Rock, Pop, MPB (separados por vírgula)" />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="technical-details">Detalhes Técnicos</Label>
                  <Textarea
                    id="technical-details"
                    placeholder="Necessidades técnicas, equipamentos próprios, etc."
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="contact-info">Contato para Propostas</Label>
                  <Input id="contact-info" placeholder="WhatsApp: +55 (00) 00000-0000" />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="notes">Observações Adicionais</Label>
                  <Textarea
                    id="notes"
                    placeholder="Informações complementares para os contratantes"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Publicar Listagem</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex gap-2">
          <Button
            variant={view === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("grid")}
          >
            Grid
          </Button>
          <Button
            variant={view === "table" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("table")}
          >
            Tabela
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar listagens..."
              className="pl-8 w-full sm:w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filtros
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Tipo de Evento</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setSelectedEventType("")}>
                Todos os tipos
              </DropdownMenuItem>
              {eventTypes.map((type) => (
                <DropdownMenuItem
                  key={type}
                  onClick={() => setSelectedEventType(type)}
                >
                  {type}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setShowInactiveListings(!showInactiveListings)}
              >
                {showInactiveListings
                  ? "Ocultar listagens inativas"
                  : "Mostrar listagens inativas"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {filteredAvailability.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center">
          <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">Nenhuma listagem encontrada</h3>
          <p className="text-sm text-muted-foreground mt-1 mb-6">
            {searchQuery || selectedEventType
              ? "Tente ajustar seus filtros"
              : "Crie sua primeira listagem de disponibilidade clicando no botão 'Nova Listagem'"}
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nova Listagem
              </Button>
            </DialogTrigger>
            <DialogContent>{/* Mesmo conteúdo do modal acima */}</DialogContent>
          </Dialog>
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAvailability.map((avail) => (
            <AvailabilityCard key={avail.id} availability={avail} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <div className="flex items-center">
                      Tipo de Evento
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>Datas</TableHead>
                  <TableHead>Localização</TableHead>
                  <TableHead>Gêneros</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAvailability.map((avail) => (
                  <TableRow key={avail.id}>
                    <TableCell className="font-medium">
                      {avail.eventType}
                    </TableCell>
                    <TableCell>{formatDateRange(avail.dates)}</TableCell>
                    <TableCell>{avail.location}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {avail.genre.split(",").slice(0, 2).map((genre, index) => (
                          <Badge key={index} variant="outline">
                            {genre.trim()}
                          </Badge>
                        ))}
                        {avail.genre.split(",").length > 2 && (
                          <Badge variant="outline">+</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {avail.isActive ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Ativo
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground">
                          Inativo
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                          <a href={`https://wa.me/${avail.contactInfo.replace(/\D/g, '')}`} target="_blank">
                            <Phone className="h-4 w-4" />
                          </a>
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuItem>Editar</DropdownMenuItem>
                            <DropdownMenuItem>
                              {avail.isActive
                                ? "Desativar Listagem"
                                : "Ativar Listagem"}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
