
import { useState } from "react";
import { 
  User, Plus, Search, Filter, Star, Phone, Mail, 
  MapPin, MoreHorizontal, ArrowUpDown
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Dados de exemplo
const mockMembers = [
  {
    id: "1",
    name: "Rafael Oliveira",
    role: "Vocalista/Guitarrista",
    since: "2020-01-15",
    phone: "+55 11 98765-4321",
    email: "rafael@email.com",
    location: "São Paulo, SP",
    paymentInfo: "PIX: 123.456.789-00",
    instruments: ["Voz", "Guitarra"],
    notes: "Responsável pelas composições principais. Tem equipamento próprio.",
    isActive: true,
  },
  {
    id: "2",
    name: "Carla Santos",
    role: "Baixista",
    since: "2020-02-20",
    phone: "+55 11 91234-5678",
    email: "carla@email.com",
    location: "São Paulo, SP",
    paymentInfo: "Conta Bancária: Banco 001, Ag 1234, CC 56789-0",
    instruments: ["Baixo"],
    notes: "Participa também como backing vocal.",
    isActive: true,
  },
  {
    id: "3",
    name: "Bruno Ferreira",
    role: "Baterista",
    since: "2020-03-10",
    phone: "+55 11 97777-8888",
    email: "bruno@email.com",
    location: "São Paulo, SP",
    paymentInfo: "PIX: bruno@email.com",
    instruments: ["Bateria", "Percussão"],
    notes: "Possui carro para transporte da bateria.",
    isActive: true,
  },
  {
    id: "4",
    name: "Amanda Silva",
    role: "Tecladista",
    since: "2022-05-15",
    phone: "+55 11 95555-6666",
    email: "amanda@email.com",
    location: "São Paulo, SP",
    paymentInfo: "PIX: 987.654.321-00",
    instruments: ["Teclado", "Piano"],
    notes: "Disponível para shows apenas nos finais de semana.",
    isActive: true,
  },
  {
    id: "5",
    name: "Marcelo Costa",
    role: "Roadie",
    since: "2021-04-20",
    phone: "+55 11 93333-4444",
    email: "marcelo@email.com",
    location: "São Paulo, SP",
    paymentInfo: "PIX: marcelo@email.com",
    instruments: [],
    notes: "Responsável pelo equipamento e montagem.",
    isActive: true,
  },
  {
    id: "6",
    name: "Juliana Mendes",
    role: "Guitarrista",
    since: "2021-06-10",
    phone: "+55 11 92222-3333",
    email: "juliana@email.com",
    location: "São Paulo, SP",
    paymentInfo: "PIX: 456.789.123-00",
    instruments: ["Guitarra"],
    notes: "Substituta ocasional. Toca também violão.",
    isActive: false,
  },
];

// Componente para cartão de membro
function MemberCard({ member, onSelect }) {
  return (
    <Card className="overflow-hidden" onClick={() => onSelect(member.id)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback className="bg-hooboke-100 text-hooboke-700">
                {member.name.split(" ").map(n => n[0]).join("").toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{member.name}</CardTitle>
              <CardDescription>{member.role}</CardDescription>
            </div>
          </div>
          {!member.isActive && (
            <Badge variant="outline" className="text-muted-foreground">
              Inativo
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{member.phone}</span>
          </div>
          <div className="flex items-center text-sm">
            <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{member.email}</span>
          </div>
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{member.location}</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-1">
            {member.instruments.map((instrument) => (
              <Badge key={instrument} variant="secondary">
                {instrument}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" size="sm" asChild>
          <a href={`https://wa.me/${member.phone.replace(/\D/g, '')}`} target="_blank">
            WhatsApp
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
              {member.isActive ? "Marcar como inativo" : "Marcar como ativo"}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              Remover
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
}

// Componente para tela de detalhe do membro
function MemberDetail({ memberId }) {
  const member = mockMembers.find((m) => m.id === memberId);

  if (!member) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-hooboke-100 text-hooboke-700 text-xl">
              {member.name.split(" ").map(n => n[0]).join("").toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">{member.name}</h2>
              {!member.isActive && (
                <Badge variant="outline" className="text-muted-foreground">
                  Inativo
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground">{member.role}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Editar
          </Button>
          <Button size="sm" asChild>
            <a href={`https://wa.me/${member.phone.replace(/\D/g, '')}`} target="_blank">
              WhatsApp
            </a>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Informações de Contato</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-sm font-medium">Telefone</p>
                <div className="flex items-center mt-1">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{member.phone}</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Email</p>
                <div className="flex items-center mt-1">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{member.email}</span>
                </div>
              </div>
              <div className="col-span-2">
                <p className="text-sm font-medium">Localidade</p>
                <div className="flex items-center mt-1">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{member.location}</span>
                </div>
              </div>
              <div className="col-span-2">
                <p className="text-sm font-medium">Membro desde</p>
                <div className="mt-1">
                  <span>
                    {new Date(member.since).toLocaleDateString("pt-BR")}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Dados Profissionais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium">Função</p>
              <p className="mt-1">{member.role}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Instrumentos</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {member.instruments.length > 0 ? (
                  member.instruments.map((instrument) => (
                    <Badge key={instrument} variant="secondary">
                      {instrument}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">
                    Nenhum instrumento cadastrado
                  </span>
                )}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">Informação de Pagamento</p>
              <p className="text-sm mt-1">{member.paymentInfo}</p>
            </div>
            {member.notes && (
              <div>
                <p className="text-sm font-medium">Observações</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {member.notes}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Próximos Eventos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-6">
            <p className="text-muted-foreground">
              Não há eventos futuros agendados para este membro.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Equipe() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showInactiveMembers, setShowInactiveMembers] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [view, setView] = useState<"grid" | "table">("grid");

  // Filtrar membros
  const filteredMembers = mockMembers.filter((member) => {
    const matchesSearch =
      searchQuery === "" ||
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesActive = showInactiveMembers || member.isActive;

    return matchesSearch && matchesActive;
  });

  // Lidar com a seleção de membro
  const handleMemberSelect = (memberId: string) => {
    setSelectedMemberId(memberId);
  };

  // Voltar para a lista de membros
  const handleBackToList = () => {
    setSelectedMemberId(null);
  };

  return (
    <div className="space-y-6">
      {selectedMemberId ? (
        <>
          <Button
            variant="ghost"
            size="sm"
            className="mb-4"
            onClick={handleBackToList}
          >
            ← Voltar para lista
          </Button>
          <MemberDetail memberId={selectedMemberId} />
        </>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Equipe</h1>
              <p className="text-muted-foreground">
                Gerencie membros da banda e equipe
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Membro
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Membro</DialogTitle>
                  <DialogDescription>
                    Preencha os dados do membro da equipe
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Label htmlFor="name">Nome</Label>
                      <Input id="name" placeholder="Nome completo" />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="role">Função</Label>
                      <Input id="role" placeholder="Ex: Vocalista, Guitarrista, Técnico de Som" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefone</Label>
                      <Input id="phone" placeholder="+55 11 98765-4321" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="email@exemplo.com" />
                    </div>
                    <div>
                      <Label htmlFor="location">Localidade</Label>
                      <Input id="location" placeholder="Cidade, Estado" />
                    </div>
                    <div>
                      <Label htmlFor="since">Membro desde</Label>
                      <Input id="since" type="date" />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="instruments">Instrumentos</Label>
                      <Input
                        id="instruments"
                        placeholder="Guitarra, Voz, Bateria (separados por vírgula)"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="payment">Informação de Pagamento</Label>
                      <Input
                        id="payment"
                        placeholder="PIX, dados bancários, etc."
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="notes">Observações</Label>
                      <Textarea
                        id="notes"
                        placeholder="Informações adicionais, equipamentos próprios, disponibilidade, etc."
                      />
                    </div>
                    <div className="col-span-2 flex items-center space-x-2">
                      <input type="checkbox" id="active" checked />
                      <Label htmlFor="active">Membro ativo</Label>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Salvar</Button>
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
                  placeholder="Buscar membros..."
                  className="pl-8 w-full sm:w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Button
                variant={showInactiveMembers ? "default" : "outline"}
                size="sm"
                onClick={() => setShowInactiveMembers(!showInactiveMembers)}
              >
                {showInactiveMembers ? "Todos" : "Apenas Ativos"}
              </Button>
            </div>
          </div>

          {filteredMembers.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <User className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Nenhum membro encontrado</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-6">
                {searchQuery
                  ? "Tente ajustar seus filtros"
                  : "Adicione seu primeiro membro clicando no botão 'Novo Membro'"}
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Novo Membro
                  </Button>
                </DialogTrigger>
                <DialogContent>{/* Mesmo conteúdo do modal acima */}</DialogContent>
              </Dialog>
            </div>
          ) : view === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMembers.map((member) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  onSelect={handleMemberSelect}
                />
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
                          Nome
                          <ArrowUpDown className="ml-1 h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead>Função</TableHead>
                      <TableHead>Contato</TableHead>
                      <TableHead>Instrumentos</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Desde</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMembers.map((member) => (
                      <TableRow
                        key={member.id}
                        onClick={() => handleMemberSelect(member.id)}
                        className="cursor-pointer"
                      >
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-hooboke-100 text-hooboke-700 text-xs">
                                {member.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            {member.name}
                          </div>
                        </TableCell>
                        <TableCell>{member.role}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Phone className="h-3 w-3 mr-1" />
                            {member.phone}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {member.instruments.map((instrument) => (
                              <Badge
                                key={instrument}
                                variant="secondary"
                                className="text-xs"
                              >
                                {instrument}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          {member.isActive ? (
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
                          {new Date(member.since).toLocaleDateString("pt-BR")}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                              <a href={`https://wa.me/${member.phone.replace(/\D/g, '')}`} target="_blank">
                                <Phone className="h-4 w-4" />
                              </a>
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                              <a href={`mailto:${member.email}`}>
                                <Mail className="h-4 w-4" />
                              </a>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
