
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Music } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: "show" | "ensaio" | "reuniao";
}

interface UpcomingEventsProps {
  events: Event[];
}

export function UpcomingEvents({ events }: UpcomingEventsProps) {
  const getEventTypeBadge = (type: Event["type"]) => {
    switch (type) {
      case "show":
        return (
          <Badge className="bg-hooboke-500">
            <Music className="mr-1 h-3 w-3" />
            Show
          </Badge>
        );
      case "ensaio":
        return (
          <Badge variant="outline" className="border-hooboke-300 text-hooboke-700">
            Ensaio
          </Badge>
        );
      case "reuniao":
        return (
          <Badge variant="secondary">
            Reunião
          </Badge>
        );
    }
  };

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-lg">Próximos Eventos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {events.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nenhum evento próximo. Adicione um evento no calendário.
          </p>
        ) : (
          events.map((event) => (
            <div key={event.id} className="flex items-start space-x-4">
              <div className="rounded-md bg-muted p-2 w-12 h-12 flex flex-col items-center justify-center text-center">
                <span className="text-xs text-muted-foreground">
                  {event.date.split('/')[1]}
                </span>
                <span className="text-lg font-bold">
                  {event.date.split('/')[0]}
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium">{event.title}</h3>
                  {getEventTypeBadge(event.type)}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-1 h-3 w-3" />
                  <span>{event.time}</span>
                  <span className="mx-1">•</span>
                  <MapPin className="mr-1 h-3 w-3" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
