
import { useState } from "react";
import { PlusCircle, Search, Music, FileMusic, Star, Filter } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

// Dados de exemplo
const mockSongs = [
  {
    id: "1",
    title: "Californication",
    reference: "Red Hot Chili Peppers",
    tags: ["Rock", "Alternativo"],
    notes: "Tom original: D, Adaptação para Am",
    isFavorite: true,
  },
  {
    id: "2",
    title: "Creep",
    reference: "Radiohead",
    tags: ["Alternativo", "90s"],
    notes: "Verificar acorde do refrão",
    isFavorite: false,
  },
  {
    id: "3",
    title: "Sweet Child O' Mine",
    reference: "Guns N' Roses",
    tags: ["Rock Clássico", "Guitarra Solo"],
    notes: "Importante ensaiar o solo principal",
    isFavorite: true,
  },
  {
    id: "4",
    title: "Nothing Else Matters",
    reference: "Metallica",
    tags: ["Metal", "Balada"],
    notes: "Introdução com violão",
    isFavorite: false,
  },
  {
    id: "5",
    title: "Wonderwall",
    reference: "Oasis",
    tags: ["Britpop", "90s"],
    notes: "Usar capo na 2ª casa",
    isFavorite: true,
  },
  {
    id: "6",
    title: "Hotel California",
    reference: "Eagles",
    tags: ["Rock Clássico", "Solos"],
    notes: "Arranjo com dois violões",
    isFavorite: false,
  },
  {
    id: "7",
    title: "Smells Like Teen Spirit",
    reference: "Nirvana",
    tags: ["Grunge", "90s"],
    notes: "Distorção pesada na guitarra",
    isFavorite: false,
  },
  {
    id: "8",
    title: "Stairway to Heaven",
    reference: "Led Zeppelin",
    tags: ["Rock Clássico", "Progressivo"],
    notes: "Arranjo completo com 3 partes",
    isFavorite: true,
  },
];

// Setlists de exemplo
const mockSetlists = [
  {
    id: "1",
    title: "Show Acústico - Pub Central",
    description: "Setlist para apresentação acústica",
    createdAt: "2025-03-15",
    songs: ["1", "2", "5", "8"],
  },
  {
    id: "2",
    title: "Festival Rock",
    description: "Setlist para o festival de verão",
    createdAt: "2025-04-10",
    songs: ["3", "4", "6", "7"],
  },
  {
    id: "3",
    title: "Casamento Ana & Carlos",
    description: "Músicas escolhidas pelos noivos",
    createdAt: "2025-04-18",
    songs: ["4", "5", "8"],
  },
];

// Componente para cartão de música
function SongCard({ song, onAddToSetlist }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div>
            <CardTitle>{song.title}</CardTitle>
            <CardDescription>{song.reference}</CardDescription>
          </div>
          {song.isFavorite && (
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-1 mb-2">
          {song.tags.map((tag) => (
            <Badge variant="outline" key={tag}>
              {tag}
            </Badge>
          ))}
        </div>
        {song.notes && (
          <p className="text-sm text-muted-foreground mt-2">{song.notes}</p>
        )}
      </CardContent>
      <CardFooter className="pt-0 flex justify-between">
        <Button variant="outline" size="sm">
          Editar
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              Ações
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Opções</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onAddToSetlist(song.id)}>
              Adicionar à Setlist
            </DropdownMenuItem>
            <DropdownMenuItem>
              {song.isFavorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
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

// Componente para cartão de setlist
function SetlistCard({ setlist, songs }) {
  const setlistSongs = setlist.songs.map(
    (id) => songs.find((song) => song.id === id)
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{setlist.title}</CardTitle>
        <CardDescription>
          {setlist.description} • {setlistSongs.length} músicas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {setlistSongs.map((song, index) => (
            <div
              key={song.id}
              className="flex items-center justify-between border-b last:border-0 pb-2 last:pb-0"
            >
              <div className="flex items-center">
                <span className="text-muted-foreground mr-2 w-5 text-right">
                  {index + 1}.
                </span>
                <div>
                  <p className="font-medium">{song.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {song.reference}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Music className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="outline" size="sm">
          Editar
        </Button>
        <Button size="sm">Compartilhar</Button>
      </CardFooter>
    </Card>
  );
}

export default function Repertorio() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Extrair todas as tags únicas
  const allTags = Array.from(
    new Set(mockSongs.flatMap((song) => song.tags))
  ).sort();

  // Filtrar músicas
  const filteredSongs = mockSongs.filter((song) => {
    const matchesSearch =
      searchQuery === "" ||
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.reference.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTag =
      selectedTag === "" || song.tags.includes(selectedTag);

    const matchesFavorite = !showFavoritesOnly || song.isFavorite;

    return matchesSearch && matchesTag && matchesFavorite;
  });

  const handleAddToSetlist = (songId) => {
    // Implementação futura: lógica para adicionar à setlist
    console.log(`Adicionando música ${songId} à setlist`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Repertório</h1>
          <p className="text-muted-foreground">
            Gerencie suas músicas e setlists
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Nova Música
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Adicionar Nova Música</DialogTitle>
              <DialogDescription>
                Preencha os detalhes da música
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-4">
                  <Label htmlFor="title">Título</Label>
                  <Input id="title" placeholder="Nome da música" />
                </div>
                <div className="col-span-4">
                  <Label htmlFor="reference">Referência/Artista</Label>
                  <Input
                    id="reference"
                    placeholder="Artista ou banda original"
                  />
                </div>
                <div className="col-span-4">
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    placeholder="Rock, Pop, Jazz (separados por vírgula)"
                  />
                </div>
                <div className="col-span-4">
                  <Label htmlFor="notes">Anotações</Label>
                  <Textarea
                    id="notes"
                    placeholder="Acordes, arranjos, observações..."
                  />
                </div>
                <div className="col-span-4 flex items-center space-x-2">
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

      <Tabs defaultValue="songs" className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <TabsList>
            <TabsTrigger value="songs">Músicas</TabsTrigger>
            <TabsTrigger value="setlists">Setlists</TabsTrigger>
          </TabsList>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar..."
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
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                  className="justify-between"
                >
                  Somente favoritos
                  {showFavoritesOnly && <Star className="h-4 w-4 fill-current" />}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Tags</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setSelectedTag("")}>
                  Todas as tags
                </DropdownMenuItem>
                {allTags.map((tag) => (
                  <DropdownMenuItem
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className="justify-between"
                  >
                    {tag}
                    {selectedTag === tag && <Star className="h-4 w-4" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <TabsContent value="songs">
          {filteredSongs.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <Music className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Nenhuma música encontrada</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-6">
                {searchQuery || selectedTag || showFavoritesOnly
                  ? "Tente ajustar seus filtros"
                  : "Adicione sua primeira música clicando no botão 'Nova Música'"}
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Nova Música
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  {/* Mesmo conteúdo do modal acima */}
                </DialogContent>
              </Dialog>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSongs.map((song) => (
                <SongCard
                  key={song.id}
                  song={song}
                  onAddToSetlist={handleAddToSetlist}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="setlists">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Minhas Setlists</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Nova Setlist
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>Criar Nova Setlist</DialogTitle>
                  <DialogDescription>
                    Organize músicas em um novo setlist
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="setlist-title">Título</Label>
                      <Input id="setlist-title" placeholder="Nome da setlist" />
                    </div>
                    <div>
                      <Label htmlFor="setlist-description">Descrição</Label>
                      <Textarea
                        id="setlist-description"
                        placeholder="Detalhes sobre esta setlist"
                      />
                    </div>
                    <div>
                      <Label>Adicionar Músicas</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione músicas" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockSongs.map((song) => (
                            <SelectItem key={song.id} value={song.id}>
                              {song.title} - {song.reference}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Criar Setlist</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockSetlists.map((setlist) => (
              <SetlistCard key={setlist.id} setlist={setlist} songs={mockSongs} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
