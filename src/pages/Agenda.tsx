
import { useState } from "react";
import { Calendar as CalendarIcon, Plus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Dados de exemplo
const mockEvents = [
  {
    id: "1",
    title: "Show no Pub Central",
    date: "2025-04-25",
    time: "21:00",
    location: "Pub Central",
    type: "show",
    description: "Show acústico. Trazer violão e cajon.",
    participants: ["João", "Maria", "Carlos", "Ana"],
    setlist: ["Música 1", "Música 2", "Música 3"],
  },
  {
    id: "2",
    title: "Ensaio para evento",
    date: "2025-04-22",
    time: "19:00",
    location: "Estúdio 42",
    type: "ensaio",
    description: "Ensaio para o show no Pub Central",
    participants: ["João", "Maria", "Carlos", "Ana"],
    setlist: ["Música 1", "Música 2", "Música 3", "Música 4"],
  },
  {
    id: "3",
    title: "Reunião de planejamento",
    date: "2025-04-21",
    time: "18:00",
    location: "Virtual",
    type: "reuniao",
    description: "Discutir próximos eventos e estratégias",
    participants: ["João", "Maria", "Carlos"],
    setlist: [],
  },
];

// Formato para a data atual
const today = new Date();

export default function Agenda() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [activeTab, setActiveTab] = useState("calendar");
  const [eventType, setEventType] = useState<string | undefined>(undefined);

  // Filtrar eventos por data selecionada
  const filteredEvents = selectedDate
    ? mockEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return (
          eventDate.getDate() === selectedDate.getDate() &&
          eventDate.getMonth() === selectedDate.getMonth() &&
          eventDate.getFullYear() === selectedDate.getFullYear()
        );
      })
    : mockEvents;

  // Filtrar eventos por tipo se selecionado
  const filteredByType = eventType
    ? filteredEvents.filter((event) => event.type === eventType)
    : filteredEvents;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Agenda</h1>
          <p className="text-muted-foreground">
            Gerencie seus shows, ensaios e compromissos
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Evento
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Evento</DialogTitle>
              <DialogDescription>
                Preencha os detalhes do evento
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-4">
                  <Label htmlFor="title">Título</Label>
                  <Input id="title" placeholder="Nome do evento" />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="date">Data</Label>
                  <Input id="date" type="date" />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="time">Horário</Label>
                  <Input id="time" type="time" />
                </div>
                <div className="col-span-4">
                  <Label htmlFor="location">Local</Label>
                  <Input id="location" placeholder="Endereço ou nome do local" />
                </div>
                <div className="col-span-4">
                  <Label htmlFor="type">Tipo</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="show">Show</SelectItem>
                      <SelectItem value="ensaio">Ensaio</SelectItem>
                      <SelectItem value="reuniao">Reunião</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-4">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    placeholder="Detalhes sobre o evento"
                  />
                </div>
                <div className="col-span-4">
                  <Label htmlFor="participants">Participantes</Label>
                  <Input
                    id="participants"
                    placeholder="Adicione os participantes"
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

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-64">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Filtros</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="event-type">Tipo de Evento</Label>
                <Select
                  value={eventType}
                  onValueChange={(value) => setEventType(value)}
                >
                  <SelectTrigger id="event-type">
                    <SelectValue placeholder="Todos os tipos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos</SelectItem>
                    <SelectItem value="show">Shows</SelectItem>
                    <SelectItem value="ensaio">Ensaios</SelectItem>
                    <SelectItem value="reuniao">Reuniões</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
              {selectedDate && (
                <Button
                  variant="ghost"
                  onClick={() => setSelectedDate(undefined)}
                  className="w-full"
                >
                  Limpar seleção
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="flex-1">
          <Tabs defaultValue="list" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="list">Lista</TabsTrigger>
                <TabsTrigger value="calendar">Calendário</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="list" className="space-y-4">
              {filteredByType.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <CalendarIcon className="h-10 w-10 text-muted-foreground mb-3" />
                    <h3 className="text-lg font-medium">Nenhum evento encontrado</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {selectedDate
                        ? "Não há eventos para a data selecionada"
                        : "Adicione seu primeiro evento clicando no botão 'Novo Evento'"}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredByType.map((event) => (
                  <Card key={event.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{event.title}</CardTitle>
                          <CardDescription>
                            {new Date(event.date).toLocaleDateString("pt-BR", {
                              weekday: "long",
                              day: "numeric",
                              month: "long",
                            })} • {event.time}
                          </CardDescription>
                        </div>
                        <Badge className={`${event.type === "show" ? "bg-hooboke-500" : 
                                            event.type === "ensaio" ? "border-hooboke-300 text-hooboke-700" : 
                                            "bg-secondary"}`}>
                          {event.type === "show"
                            ? "Show"
                            : event.type === "ensaio"
                            ? "Ensaio"
                            : "Reunião"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium">Local</p>
                          <p className="text-sm text-muted-foreground">
                            {event.location}
                          </p>
                        </div>
                        {event.description && (
                          <div>
                            <p className="text-sm font-medium">Descrição</p>
                            <p className="text-sm text-muted-foreground">
                              {event.description}
                            </p>
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium">Participantes</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {event.participants.map((participant, index) => (
                              <Badge variant="outline" key={index}>
                                {participant}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        {event.setlist.length > 0 && (
                          <div>
                            <p className="text-sm font-medium">Setlist</p>
                            <div className="mt-1 space-y-1">
                              {event.setlist.map((song, index) => (
                                <div
                                  key={index}
                                  className="text-sm text-muted-foreground"
                                >
                                  {index + 1}. {song}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="calendar">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center p-12 text-muted-foreground">
                    <CalendarIcon className="h-12 w-12 mx-auto mb-4" />
                    <h3 className="text-lg font-medium">Visualização em calendário</h3>
                    <p className="mt-1">Implementação futura</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
