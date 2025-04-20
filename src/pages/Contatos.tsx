
import { useState } from "react";
import { 
  Phone, Search, Plus, Filter, Mail, MapPin, 
  Calendar, Star, MoreHorizontal, ArrowUpDown, User
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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

// Dados de exemplo
const mockContacts = [
  {
    id: "1",
    name: "João Silva",
    organization: "Pub Central",
    role: "Gerente de Eventos",
    category: "Estabelecimento",
    phone: "+55 11 98765-4321",
    email: "joao@pubcentral.com",
    location: "São Paulo, SP",
    lastContact: "2025-04-10",
    notes: "Prefere ser contatado por WhatsApp. Costuma contratar bandas mensalmente.",
    isFavorite: true,
  },
  {
    id: "2",
    name: "Maria Souza",
    organization: "Eventos MS",
    role: "Produtora",
    category: "Produtor",
    phone: "+55 11 91234-5678",
    email: "maria@eventosms.com",
    location: "São Paulo, SP",
    lastContact: "2025-03-25",
    notes: "Organizadora de eventos corporativos e festas particulares.",
    isFavorite: false,
  },
  {
    id: "3",
    name: "Carlos Ferreira",
    organization: "Bar do Carlos",
    role: "Proprietário",
    category: "Estabelecimento",
    phone: "+55 11 97777-8888",
    email: "carlos@bardocarlos.com",
    location: "Campinas, SP",
    lastContact: "2025-04-05",
    notes: "Procura bandas de rock e blues para shows nos finais de semana.",
    isFavorite: true,
  },
  {
    id: "4",
    name: "Ana Oliveira",
    organization: "Som & Luz Produções",
    role: "Técnica de Som",
    category: "Fornecedor",
    phone: "+55 11 95555-6666",
    email: "ana@someluztec.com",
    location: "São Paulo, SP",
    lastContact: "2025-03-15",
    notes: "Prestadora de serviços técnicos para shows ao vivo.",
    isFavorite: false,
  },
  {
    id: "5",
    name: "Roberto Martins",
    organization: "Festival de Verão",
    role: "Curador",
    category: "Produtor",
    phone: "+55 21 93333-4444",
    email: "roberto@festivalverao.com",
    location: "Rio de Janeiro, RJ",
    lastContact: "2025-02-20",
    notes: "Seleciona bandas para o festival anual que acontece em dezembro.",
    isFavorite: true,
  },
  {
    id: "6",
    name: "Fernanda Almeida",
    organization: "FA Fotografia",
    role: "Fotógrafa",
    category: "Fornecedor",
    phone: "+55 11 92222-3333",
    email: "fernanda@fafotografia.com",
    location: "São Paulo, SP",
    lastContact: "2025-03-30",
    notes: "Especializada em fotografia de eventos e shows musicais.",
    isFavorite: false,
  },
];

// Interações com contatos
const mockInteractions = [
  {
    id: "1",
    contactId: "1",
    date: "2025-04-10",
    type: "reunião",
    notes: "Discutimos próximas datas disponíveis para shows. Pub quer agendar um show mensalmente.",
  },
  {
    id: "2",
    contactId: "1",
    date: "2025-03-15",
    type: "show",
    notes: "Show realizado com sucesso. Público de aproximadamente 80 pessoas.",
  },
  {
    id: "3",
    contactId: "3",
    date: "2025-04-05",
    type: "email",
    notes: "Enviei proposta para apresentação em junho. Aguardando retorno.",
  },
  {
    id: "4",
    contactId: "2",
    date: "2025-03-25",
    type: "telefone",
    notes: "Falamos sobre possibilidade de shows em eventos corporativos. Solicitou uma proposta comercial.",
  },
  {
    id: "5",
    contactId: "5",
    date: "2025-02-20",
    type: "reunião",
    notes: "Apresentamos material para avaliação e possível seleção para o festival de verão.",
  },
];

// Componente para cartão de contato
function ContactCard({ contact, onSelect }) {
  return (
    <Card className="overflow-hidden" onClick={() => onSelect(contact.id)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback className="bg-hooboke-100 text-hooboke-700">
                {contact.name.split(" ").map(n => n[0]).join("").toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{contact.name}</CardTitle>
              <CardDescription>
                {contact.organization} • {contact.role}
              </CardDescription>
            </div>
          </div>
          {contact.isFavorite && (
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{contact.phone}</span>
          </div>
          <div className="flex items-center text-sm">
            <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{contact.email}</span>
          </div>
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{contact.location}</span>
          </div>
          <div className="mt-2">
            <Badge>{contact.category}</Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" size="sm" asChild>
          <a href={`https://wa.me/${contact.phone.replace(/\D/g, '')}`} target="_blank">
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
            <DropdownMenuItem>Registrar Interação</DropdownMenuItem>
            <DropdownMenuItem>
              {contact.isFavorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
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

// Componente para tela de detalhe do contato
function ContactDetail({ contactId, interactions }) {
  const contact = mockContacts.find((c) => c.id === contactId);
  const contactInteractions = interactions.filter(
    (i) => i.contactId === contactId
  );

  if (!contact) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-hooboke-100 text-hooboke-700 text-xl">
              {contact.name.split(" ").map(n => n[0]).join("").toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{contact.name}</h2>
            <p className="text-muted-foreground">
              {contact.organization} • {contact.role}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Editar
          </Button>
          <Button size="sm" asChild>
            <a href={`https://wa.me/${contact.phone.replace(/\D/g, '')}`} target="_blank">
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
                  <span>{contact.phone}</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Email</p>
                <div className="flex items-center mt-1">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{contact.email}</span>
                </div>
              </div>
              <div className="col-span-2">
                <p className="text-sm font-medium">Localidade</p>
                <div className="flex items-center mt-1">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{contact.location}</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Categoria</p>
                <div className="mt-1">
                  <Badge>{contact.category}</Badge>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Último Contato</p>
                <div className="flex items-center mt-1">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>
                    {new Date(contact.lastContact).toLocaleDateString("pt-BR")}
                  </span>
                </div>
              </div>
            </div>
            {contact.notes && (
              <div>
                <p className="text-sm font-medium">Observações</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {contact.notes}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Histórico de Interações</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Interação
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Registrar Interação</DialogTitle>
                  <DialogDescription>
                    Registro de um contato ou evento com {contact.name}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="interaction-date">Data</Label>
                        <Input id="interaction-date" type="date" />
                      </div>
                      <div>
                        <Label htmlFor="interaction-type">Tipo</Label>
                        <Select>
                          <SelectTrigger id="interaction-type">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="telefone">Telefone</SelectItem>
                            <SelectItem value="whatsapp">WhatsApp</SelectItem>
                            <SelectItem value="reunião">Reunião</SelectItem>
                            <SelectItem value="show">Show</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="interaction-notes">Detalhes</Label>
                      <Textarea
                        id="interaction-notes"
                        placeholder="Descreva a interação..."
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Salvar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            {contactInteractions.length === 0 ? (
              <div className="text-center py-6">
                <Calendar className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Nenhuma interação registrada com este contato.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {contactInteractions.map((interaction) => (
                  <div
                    key={interaction.id}
                    className="border-b last:border-0 pb-3 last:pb-0"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center">
                        <Badge
                          variant="outline"
                          className="mr-2 capitalize"
                        >
                          {interaction.type}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {new Date(interaction.date).toLocaleDateString("pt-BR")}
                        </span>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm">{interaction.notes}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function Contatos() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [view, setView] = useState<"grid" | "table">("grid");

  // Extrair todas as categorias únicas
  const categories = Array.from(
    new Set(mockContacts.map((contact) => contact.category))
  ).sort();

  // Filtrar contatos
  const filteredContacts = mockContacts.filter((contact) => {
    const matchesSearch =
      searchQuery === "" ||
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.role.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "" || contact.category === selectedCategory;

    const matchesFavorite = !showFavoritesOnly || contact.isFavorite;

    return matchesSearch && matchesCategory && matchesFavorite;
  });

  // Lidar com a seleção de contato
  const handleContactSelect = (contactId: string) => {
    setSelectedContactId(contactId);
  };

  // Voltar para a lista de contatos
  const handleBackToList = () => {
    setSelectedContactId(null);
  };

  return (
    <div className="space-y-6">
      {selectedContactId ? (
        <>
          <Button
            variant="ghost"
            size="sm"
            className="mb-4"
            onClick={handleBackToList}
          >
            ← Voltar para lista
          </Button>
          <ContactDetail
            contactId={selectedContactId}
            interactions={mockInteractions}
          />
        </>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Contatos</h1>
              <p className="text-muted-foreground">
                Gerencie seus contatos profissionais
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Contato
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Contato</DialogTitle>
                  <DialogDescription>
                    Preencha os dados do contato
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Label htmlFor="name">Nome</Label>
                      <Input id="name" placeholder="Nome completo" />
                    </div>
                    <div>
                      <Label htmlFor="organization">Organização</Label>
                      <Input id="organization" placeholder="Empresa ou estabelecimento" />
                    </div>
                    <div>
                      <Label htmlFor="role">Cargo</Label>
                      <Input id="role" placeholder="Função ou cargo" />
                    </div>
                    <div>
                      <Label htmlFor="category">Categoria</Label>
                      <Select>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Estabelecimento">Estabelecimento</SelectItem>
                          <SelectItem value="Produtor">Produtor</SelectItem>
                          <SelectItem value="Fornecedor">Fornecedor</SelectItem>
                          <SelectItem value="Fã">Fã</SelectItem>
                          <SelectItem value="Músico">Músico</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="location">Localidade</Label>
                      <Input id="location" placeholder="Cidade, Estado" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefone</Label>
                      <Input id="phone" placeholder="+55 11 98765-4321" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="contato@exemplo.com" />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="notes">Observações</Label>
                      <Textarea
                        id="notes"
                        placeholder="Informações adicionais, preferências, etc."
                      />
                    </div>
                    <div className="col-span-2 flex items-center space-x-2">
                      <input type="checkbox" id="favorite" />
                      <Label htmlFor="favorite">Adicionar aos favoritos</Label>
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
                  placeholder="Buscar contatos..."
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
                  <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                    className="justify-between"
                  >
                    Somente favoritos
                    {showFavoritesOnly && <Star className="h-4 w-4 fill-current" />}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Categoria</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => setSelectedCategory("")}>
                    Todas as categorias
                  </DropdownMenuItem>
                  {categories.map((category) => (
                    <DropdownMenuItem
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className="justify-between"
                    >
                      {category}
                      {selectedCategory === category && <Star className="h-4 w-4" />}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {filteredContacts.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <User className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Nenhum contato encontrado</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-6">
                {searchQuery || selectedCategory || showFavoritesOnly
                  ? "Tente ajustar seus filtros"
                  : "Adicione seu primeiro contato clicando no botão 'Novo Contato'"}
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Novo Contato
                  </Button>
                </DialogTrigger>
                <DialogContent>{/* Mesmo conteúdo do modal acima */}</DialogContent>
              </Dialog>
            </div>
          ) : view === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredContacts.map((contact) => (
                <ContactCard
                  key={contact.id}
                  contact={contact}
                  onSelect={handleContactSelect}
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
                      <TableHead>Organização</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Contato</TableHead>
                      <TableHead>Localidade</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredContacts.map((contact) => (
                      <TableRow key={contact.id} onClick={() => handleContactSelect(contact.id)} className="cursor-pointer">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {contact.isFavorite && (
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            )}
                            {contact.name}
                          </div>
                        </TableCell>
                        <TableCell>{contact.organization}</TableCell>
                        <TableCell>
                          <Badge>{contact.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Phone className="h-3 w-3 mr-1" />
                            {contact.phone}
                          </div>
                        </TableCell>
                        <TableCell>{contact.location}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                              <a href={`https://wa.me/${contact.phone.replace(/\D/g, '')}`} target="_blank">
                                <Phone className="h-4 w-4" />
                              </a>
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                              <a href={`mailto:${contact.email}`}>
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
