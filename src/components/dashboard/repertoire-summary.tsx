
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music, Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface Song {
  id: string;
  title: string;
  reference: string;
  tags?: string[];
}

interface RepertoireSummaryProps {
  songs: Song[];
}

export function RepertoireSummary({ songs }: RepertoireSummaryProps) {
  const recentSongs = songs.slice(0, 5);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">Repertório</CardTitle>
        <Button asChild size="sm" variant="ghost">
          <Link to="/repertorio">
            Ver todos
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {recentSongs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <Music className="h-10 w-10 text-muted-foreground mb-3" />
            <h3 className="text-sm font-medium">Nenhuma música adicionada</h3>
            <p className="text-xs text-muted-foreground mt-1 mb-4">
              Adicione músicas ao seu repertório
            </p>
            <Button asChild size="sm">
              <Link to="/repertorio">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Música
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {recentSongs.map((song) => (
              <div key={song.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                <div className="flex items-center">
                  <Music className="h-4 w-4 text-muted-foreground mr-2" />
                  <div>
                    <p className="text-sm font-medium">{song.title}</p>
                    <p className="text-xs text-muted-foreground">{song.reference}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {song.tags?.map((tag) => (
                    <span key={tag} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
