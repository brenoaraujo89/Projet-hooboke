
import { useState } from "react";
import { 
  Package, Plus, Search, Filter, MoreHorizontal, 
  User, Calendar, Clock, ArrowUpDown, Check
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Dados de exemplo
const mockEquipments = [
  {
    id: "1",
    name: "Guitarra Fender Stratocaster",
    category: "Instrumento",
    owner: "1", // Rafael Oliveira
    acquisitionDate: "2021-05-10",
    purchaseValue: 4800,
    serialNumber: "US21456789",
    condition: "Bom",
    location: "Estúdio",
    maintenanceHistory: [
      {
        id: "1",
        date: "2022-06-15",
        type: "Manutenção preventiva",
        description: "Troca de cordas e limpeza do instrumento",
        cost: 120,
      },
      {
        id: "2",
        date: "2023-02-20",
        type: "Reparo",
        description: "Ajuste na ponte e regulagem do instrumento",
        cost: 250,
      },
    ],
    notes: "Cor: Sunburst. Captadores Originais.",
  },
  {
    id: "2",
    name: "Contrabaixo Fender Jazz Bass",
    category: "Instrumento",
    owner: "2", // Carla Santos
    acquisitionDate: "2020-08-15",
    purchaseValue: 3200,
    serialNumber: "MX20987654",
    condition: "Ótimo",
    location: "Estúdio",
    maintenanceHistory: [
      {
        id: "3",
        date: "2022-07-10",
        type: "Manutenção preventiva",
        description: "Troca de cordas e regulagem do instrumento",
        cost: 150,
      },
    ],
    notes: "Cor: Preto. Palhetas reservas guardadas no case.",
  },
  {
    id: "3",
    name: "Bateria Pearl Masters",
    category: "Instrumento",
    owner: "3", // Bruno Ferreira
    acquisitionDate: "2019-12-05",
    purchaseValue: 8500,
    serialNumber: "P19654321",
    condition: "Regular",
    location: "Estúdio",
    maintenanceHistory: [
      {
        id: "4",
        date: "2022-03-15",
        type: "Reparo",
        description: "Substituição de pele do bumbo e tons",
        cost: 450,
      },
      {
        id: "5",
        date: "2023-05-20",
        type: "Reparo",
        description: "Ajuste nos estantes e substituição de ferragens",
        cost: 320,
      },
    ],
    notes: "Kit completo com pratos Zildjian. Precisa de manutenção na caixa.",
  },
  {
    id: "4",
    name: "Amplificador Marshall JCM 800",
    category: "Equipamento",
    owner: "1", // Rafael Oliveira
    acquisitionDate: "2022-02-10",
    purchaseValue: 5200,
    serialNumber: "M22123456",
    condition: "Ótimo",
    location: "Estúdio",
    maintenanceHistory: [],
    notes: "Potência 100W. Válvulas substituídas em janeiro/2023.",
  },
  {
    id: "5",
    name: "Caixa Direta Radial JDI",
    category: "Equipamento",
    owner: "0", // Banda (comum)
    acquisitionDate: "2022-09-20",
    purchaseValue: 980,
    serialNumber: "R22789123",
    condition: "Ótimo",
    location: "Case de Equipamentos",
    maintenanceHistory: [],
    notes: "Uso em shows e gravações.",
  },
  {
    id: "6",
    name: "Pedaleira GT-100",
    category: "Equipamento",
    owner: "1", // Rafael Oliveira
    acquisitionDate: "2021-04-15",
    purchaseValue: 2700,
    serialNumber: "GT21654987",
    condition: "Bom",
    location: "Case de Equipamentos",
    maintenanceHistory: [],
    notes: "Presets personalizados salvos em backup digital.",
  },
  {
    id: "7",
    name: "Microfone Shure SM58",
    category: "Equipamento",
    owner: "0", // Banda (comum)
    acquisitionDate: "2020-10-05",
    purchaseValue: 850,
    serialNumber: "SM20123789",
    condition: "Bom",
    location: "Case de Equipamentos",
    maintenanceHistory: [
      {
        id: "6",
        date: "2022-11-10",
        type: "Manutenção preventiva",
        description: "Limpeza e verificação da cápsula",
        cost: 80,
      },
    ],
    notes: "Principal microfone de voz.",
  },
  {
    id: "8",
    name: "Case para Transporte de Equipamentos",
    category: "Acessório",
    owner: "0", // Banda (comum)
    acquisitionDate: "2021-11-15",
    purchaseValue: 1200,
    serialNumber: "N/A",
    condition: "Bom",
    location: "Estúdio",
    maintenanceHistory: [],
    notes: "Dimensões: 120x80x50cm. Capacidade para equipamentos menores e cabos.",
  },
];

// Dados de membros para relacionar com equipamentos
const mockMembers = [
  {
    id: "0",
    name: "Banda (Comum)",
  },
  {
    id: "1",
    name: "Rafael Oliveira",
  },
  {
    id: "2",
    name: "Carla Santos",
  },
  {
    id: "3",
    name: "Bruno Ferreira",
  },
  {
    id: "4",
    name: "Amanda Silva",
  },
  {
    id: "5",
    name: "Marcelo Costa",
  },
];

// Componente para cartão de equipamento
function EquipmentCard({ equipment, members, onSelect }) {
  const owner = members.find((m) => m.id === equipment.owner);
  
  const getConditionColor = (condition) => {
    switch (condition) {
      case "Ótimo":
        return "bg-green-50 text-green-700 border-green-200";
      case "Bom":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Regular":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "Ruim":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "";
    }
  };

  return (
    <Card className="overflow-hidden" onClick={() => onSelect(equipment.id)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{equipment.name}</CardTitle>
            <CardDescription>
              {owner ? owner.name : "Sem proprietário"}
            </CardDescription>
          </div>
          <Badge variant="outline" className={getConditionColor(equipment.condition)}>
            {equipment.condition}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-xs text-muted-foreground">Categoria</p>
              <p className="text-sm">{equipment.category}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Localização</p>
              <p className="text-sm">{equipment.location}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Aquisição</p>
              <p className="text-sm">
                {new Date(equipment.acquisitionDate).toLocaleDateString("pt-BR")}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Valor</p>
              <p className="text-sm">
                R$ {equipment.purchaseValue.toLocaleString("pt-BR")}
              </p>
            </div>
          </div>
          
          {equipment.serialNumber && (
            <div>
              <p className="text-xs text-muted-foreground">Número de Série</p>
              <p className="text-sm">{equipment.serialNumber}</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          Manutenção
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
            <DropdownMenuItem>Registrar Manutenção</DropdownMenuItem>
            <DropdownMenuItem>Transferir Propriedade</DropdownMenuItem>
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

// Componente para tela de detalhe do equipamento
function EquipmentDetail({ equipmentId, members }) {
  const equipment = mockEquipments.find((e) => e.id === equipmentId);
  const owner = members.find((m) => m.id === equipment?.owner);

  if (!equipment) return null;

  const getConditionColor = (condition) => {
    switch (condition) {
      case "Ótimo":
        return "bg-green-50 text-green-700 border-green-200";
      case "Bom":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Regular":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "Ruim":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">{equipment.name}</h2>
            <Badge
              variant="outline"
              className={getConditionColor(equipment.condition)}
            >
              {equipment.condition}
            </Badge>
          </div>
          <p className="text-muted-foreground">
            {equipment.category} • {owner ? owner.name : "Sem proprietário"}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Editar
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">Registrar Manutenção</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Registrar Manutenção</DialogTitle>
                <DialogDescription>
                  Adicione detalhes sobre a manutenção ou reparo do equipamento
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="maintenance-date">Data</Label>
                    <Input id="maintenance-date" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="maintenance-type">Tipo</Label>
                    <Select>
                      <SelectTrigger id="maintenance-type">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="preventiva">
                          Manutenção Preventiva
                        </SelectItem>
                        <SelectItem value="reparo">Reparo</SelectItem>
                        <SelectItem value="troca">
                          Substituição de Peças
                        </SelectItem>
                        <SelectItem value="limpeza">Limpeza</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="maintenance-desc">Descrição</Label>
                    <Textarea
                      id="maintenance-desc"
                      placeholder="Detalhes sobre o que foi feito..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="maintenance-cost">Custo (R$)</Label>
                    <Input
                      id="maintenance-cost"
                      type="number"
                      placeholder="0,00"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Salvar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Detalhes do Equipamento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-sm font-medium">Categoria</p>
                <p className="text-muted-foreground">{equipment.category}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Localização</p>
                <p className="text-muted-foreground">{equipment.location}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Data de Aquisição</p>
                <p className="text-muted-foreground">
                  {new Date(equipment.acquisitionDate).toLocaleDateString("pt-BR")}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Valor de Compra</p>
                <p className="text-muted-foreground">
                  R$ {equipment.purchaseValue.toLocaleString("pt-BR")}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-sm font-medium">Número de Série</p>
                <p className="text-muted-foreground">
                  {equipment.serialNumber || "N/A"}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-sm font-medium">Proprietário</p>
                <div className="flex items-center gap-2 mt-1">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="bg-hooboke-100 text-hooboke-700 text-xs">
                      {owner?.name.split(" ").map(n => n[0]).join("").toUpperCase() || "BC"}
                    </AvatarFallback>
                  </Avatar>
                  <span>{owner?.name || "Banda (Comum)"}</span>
                </div>
              </div>
            </div>
            {equipment.notes && (
              <div>
                <p className="text-sm font-medium">Observações</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {equipment.notes}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Histórico de Manutenção</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Registrar
                </Button>
              </DialogTrigger>
              <DialogContent>
                {/* Mesmo conteúdo do modal acima */}
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            {equipment.maintenanceHistory.length === 0 ? (
              <div className="text-center py-6">
                <Package className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Nenhuma manutenção registrada para este equipamento.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {equipment.maintenanceHistory.map((maintenance) => (
                  <div
                    key={maintenance.id}
                    className="border-b last:border-0 pb-3 last:pb-0"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center">
                        <Badge variant="outline" className="mr-2">
                          {maintenance.type}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {new Date(maintenance.date).toLocaleDateString("pt-BR")}
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        R$ {maintenance.cost.toLocaleString("pt-BR")}
                      </span>
                    </div>
                    <p className="text-sm">{maintenance.description}</p>
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

export default function Equipamentos() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedOwnerId, setSelectedOwnerId] = useState("");
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string | null>(null);
  const [view, setView] = useState<"grid" | "table">("grid");

  // Extrair todas as categorias únicas
  const categories = Array.from(
    new Set(mockEquipments.map((equipment) => equipment.category))
  ).sort();

  // Filtrar equipamentos
  const filteredEquipments = mockEquipments.filter((equipment) => {
    const matchesSearch =
      searchQuery === "" ||
      equipment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      equipment.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      equipment.serialNumber?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "" || equipment.category === selectedCategory;

    const matchesOwner =
      selectedOwnerId === "" || equipment.owner === selectedOwnerId;

    return matchesSearch && matchesCategory && matchesOwner;
  });

  // Lidar com a seleção de equipamento
  const handleEquipmentSelect = (equipmentId: string) => {
    setSelectedEquipmentId(equipmentId);
  };

  // Voltar para a lista de equipamentos
  const handleBackToList = () => {
    setSelectedEquipmentId(null);
  };

  // Calcular valores totais para o resumo
  const totalEquipments = mockEquipments.length;
  const totalValue = mockEquipments.reduce(
    (sum, equipment) => sum + equipment.purchaseValue,
    0
  );
  const maintenanceCost = mockEquipments.reduce(
    (sum, equipment) =>
      sum +
      equipment.maintenanceHistory.reduce((mSum, m) => mSum + m.cost, 0),
    0
  );
  const categoryCounts = {};
  mockEquipments.forEach((equipment) => {
    categoryCounts[equipment.category] = (categoryCounts[equipment.category] || 0) + 1;
  });

  return (
    <div className="space-y-6">
      {selectedEquipmentId ? (
        <>
          <Button
            variant="ghost"
            size="sm"
            className="mb-4"
            onClick={handleBackToList}
          >
            ← Voltar para lista
          </Button>
          <EquipmentDetail
            equipmentId={selectedEquipmentId}
            members={mockMembers}
          />
        </>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Equipamentos</h1>
              <p className="text-muted-foreground">
                Gerencie instrumentos e equipamentos da banda
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Equipamento
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Equipamento</DialogTitle>
                  <DialogDescription>
                    Preencha os detalhes do equipamento
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Label htmlFor="name">Nome</Label>
                      <Input id="name" placeholder="Nome do equipamento" />
                    </div>
                    <div>
                      <Label htmlFor="category">Categoria</Label>
                      <Select>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Instrumento">Instrumento</SelectItem>
                          <SelectItem value="Equipamento">Equipamento</SelectItem>
                          <SelectItem value="Acessório">Acessório</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="owner">Proprietário</Label>
                      <Select>
                        <SelectTrigger id="owner">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockMembers.map((member) => (
                            <SelectItem key={member.id} value={member.id}>
                              {member.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="acquisition-date">Data de Aquisição</Label>
                      <Input id="acquisition-date" type="date" />
                    </div>
                    <div>
                      <Label htmlFor="purchase-value">Valor de Compra (R$)</Label>
                      <Input
                        id="purchase-value"
                        type="number"
                        placeholder="0,00"
                      />
                    </div>
                    <div>
                      <Label htmlFor="serial-number">Número de Série</Label>
                      <Input id="serial-number" placeholder="Opcional" />
                    </div>
                    <div>
                      <Label htmlFor="condition">Condição</Label>
                      <Select>
                        <SelectTrigger id="condition">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Ótimo">Ótimo</SelectItem>
                          <SelectItem value="Bom">Bom</SelectItem>
                          <SelectItem value="Regular">Regular</SelectItem>
                          <SelectItem value="Ruim">Ruim</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="location">Localização</Label>
                      <Input
                        id="location"
                        placeholder="Onde o equipamento está guardado"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="notes">Observações</Label>
                      <Textarea
                        id="notes"
                        placeholder="Detalhes adicionais sobre o equipamento"
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Salvar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Total de Equipamentos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalEquipments}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Valor Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  R$ {totalValue.toLocaleString("pt-BR")}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Custo de Manutenção</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  R$ {maintenanceCost.toLocaleString("pt-BR")}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Por Categoria</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {Object.entries(categoryCounts).map(([category, count]) => (
                    <div key={category} className="flex justify-between text-sm">
                      <span>{category}</span>
                      <span className="font-medium">{count as number}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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
                  placeholder="Buscar equipamentos..."
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
                      {selectedCategory === category && (
                        <Check className="h-4 w-4" />
                      )}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Proprietário</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => setSelectedOwnerId("")}>
                    Todos os proprietários
                  </DropdownMenuItem>
                  {mockMembers.map((member) => (
                    <DropdownMenuItem
                      key={member.id}
                      onClick={() => setSelectedOwnerId(member.id)}
                      className="justify-between"
                    >
                      {member.name}
                      {selectedOwnerId === member.id && (
                        <Check className="h-4 w-4" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {filteredEquipments.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <Package className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Nenhum equipamento encontrado</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-6">
                {searchQuery || selectedCategory || selectedOwnerId
                  ? "Tente ajustar seus filtros"
                  : "Adicione seu primeiro equipamento clicando no botão 'Novo Equipamento'"}
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Novo Equipamento
                  </Button>
                </DialogTrigger>
                <DialogContent>{/* Mesmo conteúdo do modal acima */}</DialogContent>
              </Dialog>
            </div>
          ) : view === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredEquipments.map((equipment) => (
                <EquipmentCard
                  key={equipment.id}
                  equipment={equipment}
                  members={mockMembers}
                  onSelect={handleEquipmentSelect}
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
                      <TableHead>Categoria</TableHead>
                      <TableHead>Proprietário</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Condição</TableHead>
                      <TableHead>Localização</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEquipments.map((equipment) => {
                      const owner = mockMembers.find((m) => m.id === equipment.owner);
                      return (
                        <TableRow
                          key={equipment.id}
                          onClick={() => handleEquipmentSelect(equipment.id)}
                          className="cursor-pointer"
                        >
                          <TableCell>{equipment.name}</TableCell>
                          <TableCell>{equipment.category}</TableCell>
                          <TableCell>
                            {owner ? owner.name : "Sem proprietário"}
                          </TableCell>
                          <TableCell>
                            R$ {equipment.purchaseValue.toLocaleString("pt-BR")}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                equipment.condition === "Ótimo"
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : equipment.condition === "Bom"
                                  ? "bg-blue-50 text-blue-700 border-blue-200"
                                  : equipment.condition === "Regular"
                                  ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                  : "bg-red-50 text-red-700 border-red-200"
                              }
                            >
                              {equipment.condition}
                            </Badge>
                          </TableCell>
                          <TableCell>{equipment.location}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
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
