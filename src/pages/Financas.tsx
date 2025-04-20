
import { useState } from "react";
import { 
  DollarSign, ArrowUpDown, Filter, Search, Plus, 
  MoreHorizontal, ArrowDown, ArrowUp, PieChart, BarChart
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

// Dados de exemplo
const mockTransactions = [
  {
    id: "1",
    date: "2025-04-15",
    description: "Show no Pub Central",
    amount: 2500,
    type: "receita",
    category: "Show",
    paymentMethod: "Transferência",
    status: "recebido",
    notes: "Pagamento para apresentação de 2 horas.",
  },
  {
    id: "2",
    date: "2025-04-10",
    description: "Aluguel de equipamento",
    amount: -300,
    type: "despesa",
    category: "Equipamento",
    paymentMethod: "PIX",
    status: "pago",
    notes: "Aluguel de microfones adicionais para o show.",
  },
  {
    id: "3",
    date: "2025-04-05",
    description: "Show em Evento Corporativo",
    amount: 3800,
    type: "receita",
    category: "Show",
    paymentMethod: "Transferência",
    status: "pendente",
    notes: "Empresa ABC. Pagamento em até 15 dias após o evento.",
  },
  {
    id: "4",
    date: "2025-04-03",
    description: "Manutenção de Equipamento",
    amount: -450,
    type: "despesa",
    category: "Manutenção",
    paymentMethod: "Cartão",
    status: "pago",
    notes: "Conserto da guitarra do Rafael.",
  },
  {
    id: "5",
    date: "2025-03-28",
    description: "Show em Casamento",
    amount: 3200,
    type: "receita",
    category: "Show",
    paymentMethod: "Dinheiro",
    status: "recebido",
    notes: "Show acústico de 3 horas.",
  },
  {
    id: "6",
    date: "2025-03-25",
    description: "Despesas de Transporte",
    amount: -220,
    type: "despesa",
    category: "Transporte",
    paymentMethod: "Dinheiro",
    status: "pago",
    notes: "Combustível e estacionamento para show em Campinas.",
  },
  {
    id: "7",
    date: "2025-03-20",
    description: "Aluguel de Estúdio",
    amount: -350,
    type: "despesa",
    category: "Ensaio",
    paymentMethod: "PIX",
    status: "pago",
    notes: "Ensaio de 5 horas para preparação do show corporativo.",
  },
  {
    id: "8",
    date: "2025-03-15",
    description: "Venda de Merchandise",
    amount: 420,
    type: "receita",
    category: "Merchandise",
    paymentMethod: "Transferência",
    status: "recebido",
    notes: "Venda de camisetas no show do Pub Central.",
  },
];

export default function Financas() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [selectedMonth, setSelectedMonth] = useState<string | undefined>(undefined);
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);

  // Extrair categorias, meses e status únicos
  const categories = Array.from(
    new Set(mockTransactions.map((tx) => tx.category))
  ).sort();
  
  const months = Array.from(
    new Set(
      mockTransactions.map((tx) => {
        const date = new Date(tx.date);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      })
    )
  ).sort((a, b) => b.localeCompare(a)); // Ordem decrescente
  
  const statuses = Array.from(
    new Set(mockTransactions.map((tx) => tx.status))
  ).sort();

  // Filtrar transações
  const filteredTransactions = mockTransactions.filter((tx) => {
    const matchesSearch =
      searchQuery === "" ||
      tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType =
      selectedType === undefined || tx.type === selectedType;

    const matchesCategory =
      selectedCategory === undefined || tx.category === selectedCategory;

    const matchesMonth =
      selectedMonth === undefined ||
      tx.date.substring(0, 7) === selectedMonth;

    const matchesStatus =
      selectedStatus === undefined || tx.status === selectedStatus;

    return matchesSearch && matchesType && matchesCategory && matchesMonth && matchesStatus;
  });

  // Ordenar transações por data (mais recentes primeiro)
  const sortedTransactions = [...filteredTransactions].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Calcular resumo financeiro
  const totalReceitas = filteredTransactions
    .filter((tx) => tx.type === "receita")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalDespesas = filteredTransactions
    .filter((tx) => tx.type === "despesa")
    .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

  const saldo = totalReceitas - totalDespesas;

  const pendentes = filteredTransactions
    .filter((tx) => tx.status === "pendente" && tx.type === "receita")
    .reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Finanças</h1>
          <p className="text-muted-foreground">
            Gerencie receitas, despesas e acompanhe seu fluxo de caixa
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nova Transação
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Adicionar Nova Transação</DialogTitle>
              <DialogDescription>
                Registre uma nova receita ou despesa
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Input id="description" placeholder="Descrição da transação" />
                </div>
                <div>
                  <Label htmlFor="date">Data</Label>
                  <Input id="date" type="date" />
                </div>
                <div>
                  <Label htmlFor="amount">Valor (R$)</Label>
                  <Input id="amount" type="number" placeholder="0,00" />
                </div>
                <div>
                  <Label htmlFor="type">Tipo</Label>
                  <Select>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="receita">Receita</SelectItem>
                      <SelectItem value="despesa">Despesa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="category">Categoria</Label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Show">Show</SelectItem>
                      <SelectItem value="Merchandise">Merchandise</SelectItem>
                      <SelectItem value="Equipamento">Equipamento</SelectItem>
                      <SelectItem value="Manutenção">Manutenção</SelectItem>
                      <SelectItem value="Transporte">Transporte</SelectItem>
                      <SelectItem value="Ensaio">Ensaio</SelectItem>
                      <SelectItem value="Outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="payment-method">Método de Pagamento</Label>
                  <Select>
                    <SelectTrigger id="payment-method">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dinheiro">Dinheiro</SelectItem>
                      <SelectItem value="PIX">PIX</SelectItem>
                      <SelectItem value="Transferência">Transferência</SelectItem>
                      <SelectItem value="Cartão">Cartão</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recebido">Recebido</SelectItem>
                      <SelectItem value="pendente">Pendente</SelectItem>
                      <SelectItem value="pago">Pago</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <Label htmlFor="notes">Observações</Label>
                  <Textarea
                    id="notes"
                    placeholder="Notas adicionais sobre a transação"
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
            <CardTitle className="text-sm">Saldo Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${saldo >= 0 ? "text-green-600" : "text-rose-600"}`}>
              R$ {saldo.toLocaleString("pt-BR")}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Receitas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              R$ {totalReceitas.toLocaleString("pt-BR")}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Despesas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-600">
              R$ {totalDespesas.toLocaleString("pt-BR")}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Pagamentos Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              R$ {pendentes.toLocaleString("pt-BR")}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <TabsList>
            <TabsTrigger value="list">Lista</TabsTrigger>
            <TabsTrigger value="charts">Gráficos</TabsTrigger>
          </TabsList>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar transações..."
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
                <DropdownMenuLabel>Mês</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setSelectedMonth(undefined)}>
                  Todos os meses
                </DropdownMenuItem>
                {months.map((month) => {
                  const [year, monthNum] = month.split("-");
                  const date = new Date(parseInt(year), parseInt(monthNum) - 1);
                  const formattedMonth = date.toLocaleDateString("pt-BR", {
                    month: "long",
                    year: "numeric",
                  });
                  
                  return (
                    <DropdownMenuItem
                      key={month}
                      onClick={() => setSelectedMonth(month)}
                      className="capitalize"
                    >
                      {formattedMonth}
                    </DropdownMenuItem>
                  );
                })}
                
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Tipo</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setSelectedType(undefined)}>
                  Todos os tipos
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedType("receita")}>
                  Receitas
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedType("despesa")}>
                  Despesas
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Categoria</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setSelectedCategory(undefined)}>
                  Todas as categorias
                </DropdownMenuItem>
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
                
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Status</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setSelectedStatus(undefined)}>
                  Todos os status
                </DropdownMenuItem>
                {statuses.map((status) => (
                  <DropdownMenuItem
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className="capitalize"
                  >
                    {status}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <TabsContent value="list">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <div className="flex items-center">
                        Data
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedTransactions.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="h-24 text-center text-muted-foreground"
                      >
                        Nenhuma transação encontrada.
                      </TableCell>
                    </TableRow>
                  ) : (
                    sortedTransactions.map((tx) => (
                      <TableRow key={tx.id}>
                        <TableCell>
                          {new Date(tx.date).toLocaleDateString("pt-BR")}
                        </TableCell>
                        <TableCell>{tx.description}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{tx.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              tx.status === "recebido" || tx.status === "pago"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : "bg-amber-50 text-amber-700 border-amber-200"
                            }
                          >
                            {tx.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          <span
                            className={
                              tx.amount > 0
                                ? "text-green-600"
                                : "text-rose-600"
                            }
                          >
                            {tx.amount > 0 ? "+" : ""}
                            R$ {Math.abs(tx.amount).toLocaleString("pt-BR")}
                          </span>
                        </TableCell>
                        <TableCell>
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
                                {tx.status === "pendente"
                                  ? "Marcar como Pago/Recebido"
                                  : "Marcar como Pendente"}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                Excluir
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="charts">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Receitas x Despesas</CardTitle>
                <CardDescription>
                  Visualização de receitas e despesas por período
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center">
                  <BarChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Visualização de gráficos disponível em breve
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Distribuição por Categoria</CardTitle>
                <CardDescription>
                  Análise da distribuição de receitas e despesas
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center">
                  <PieChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Visualização de gráficos disponível em breve
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
