
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Music, Search, Filter, Calendar, MapPin, ChevronDown, ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Dados de amostra para músicos/bandas
const musicianData = [
  {
    id: "1",
    name: "Banda Aurora",
    type: "Banda",
    genre: ["Rock", "Pop", "Alternativo"],
    location: "São Paulo, SP",
    rating: 4.8,
    reviews: 32,
    price: "R$ 2.500 - R$ 5.000",
    image: null,
    availability: ["Sexta", "Sábado"],
    tags: ["Casamentos", "Festas", "Corporativo"],
  },
  {
    id: "2",
    name: "Trio Jazz Elite",
    type: "Trio",
    genre: ["Jazz", "Blues", "Bossa Nova"],
    location: "Rio de Janeiro, RJ",
    rating: 4.9,
    reviews: 45,
    price: "R$ 1.800 - R$ 3.500",
    image: null,
    availability: ["Quinta", "Sexta", "Sábado", "Domingo"],
    tags: ["Restaurantes", "Eventos", "Casamentos"],
  },
  {
    id: "3",
    name: "DJ Mark Sound",
    type: "DJ",
    genre: ["Eletrônica", "Dance", "Pop"],
    location: "Belo Horizonte, MG",
    rating: 4.7,
    reviews: 28,
    price: "R$ 1.200 - R$ 2.800",
    image: null,
    availability: ["Sexta", "Sábado"],
    tags: ["Formaturas", "Festas", "Aniversários"],
  },
  {
    id: "4",
    name: "Acoustic Vibes",
    type: "Duo",
    genre: ["MPB", "Pop Acústico", "Folk"],
    location: "Curitiba, PR",
    rating: 4.6,
    reviews: 19,
    price: "R$ 1.000 - R$ 2.000",
    image: null,
    availability: ["Quarta", "Quinta", "Sexta", "Sábado", "Domingo"],
    tags: ["Bares", "Restaurantes", "Casamentos"],
  },
  {
    id: "5",
    name: "Samba de Lei",
    type: "Grupo",
    genre: ["Samba", "Pagode", "MPB"],
    location: "Salvador, BA",
    rating: 4.9,
    reviews: 37,
    price: "R$ 2.000 - R$ 4.500",
    image: null,
    availability: ["Sexta", "Sábado", "Domingo"],
    tags: ["Bares", "Aniversários", "Eventos"],
  },
  {
    id: "6",
    name: "Classic Strings",
    type: "Quarteto",
    genre: ["Clássica", "Instrumental"],
    location: "Brasília, DF",
    rating: 5.0,
    reviews: 23,
    price: "R$ 1.800 - R$ 3.800",
    image: null,
    availability: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
    tags: ["Casamentos", "Corporativo", "Cerimônias"],
  },
  {
    id: "7",
    name: "Rock Nation",
    type: "Banda",
    genre: ["Rock", "Rock Clássico", "Hard Rock"],
    location: "Porto Alegre, RS",
    rating: 4.7,
    reviews: 31,
    price: "R$ 2.200 - R$ 4.800",
    image: null,
    availability: ["Sexta", "Sábado"],
    tags: ["Bares", "Festivais", "Eventos"],
  },
  {
    id: "8",
    name: "Maria Flores",
    type: "Solo",
    genre: ["MPB", "Bossa Nova", "Jazz"],
    location: "Recife, PE",
    rating: 4.8,
    reviews: 26,
    price: "R$ 800 - R$ 1.800",
    image: null,
    availability: ["Quinta", "Sexta", "Sábado", "Domingo"],
    tags: ["Restaurantes", "Eventos", "Corporativo"],
  },
];

export default function MusicianDirectory() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Lista de gêneros disponíveis
  const genres = [...new Set(musicianData.flatMap(musician => musician.genre))].sort();
  
  // Lista de tipos de músicos
  const types = [...new Set(musicianData.map(musician => musician.type))].sort();
  
  // Lista de localizações
  const locations = [...new Set(musicianData.map(musician => musician.location))].sort();

  // Filtrar músicos com base nos critérios de busca e filtros
  const filteredMusicians = musicianData
    .filter(musician => {
      const matchesSearch = searchQuery === "" || 
        musician.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        musician.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesGenre = selectedGenre === "" || 
        musician.genre.includes(selectedGenre);
      
      const matchesType = selectedType === "" || 
        musician.type === selectedType;
      
      const matchesLocation = selectedLocation === "" || 
        musician.location === selectedLocation;
      
      return matchesSearch && matchesGenre && matchesType && matchesLocation;
    })
    .sort((a, b) => {
      if (sortBy === "rating") {
        return sortDirection === "desc" ? b.rating - a.rating : a.rating - b.rating;
      } else if (sortBy === "price") {
        // Simplificação: estamos apenas comparando o valor mínimo do preço
        const priceA = parseInt(a.price.split(" - ")[0].replace(/\D/g, ""));
        const priceB = parseInt(b.price.split(" - ")[0].replace(/\D/g, ""));
        return sortDirection === "desc" ? priceB - priceA : priceA - priceB;
      } else { // name
        return sortDirection === "desc" 
          ? b.name.localeCompare(a.name) 
          : a.name.localeCompare(b.name);
      }
    });

  const toggleSortDirection = () => {
    setSortDirection(prev => prev === "desc" ? "asc" : "desc");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* HEADER */}
      <header className="w-full flex items-center justify-between px-6 md:px-12 py-4 backdrop-blur-sm bg-white/60 sticky top-0 z-10 border-b">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <Music size={28} className="text-primary" />
          <span className="text-2xl font-semibold tracking-tight text-[#6E59A5]">Hoobôke</span>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => navigate("/")} className="hidden sm:inline-flex">
            Início
          </Button>
          <Button variant="ghost" onClick={() => navigate("/encontrar-musicos")} className="hidden md:inline-flex">
            Contratar
          </Button>
          <Button variant="outline" onClick={() => navigate("/login")}>
            Login
          </Button>
          <Button onClick={() => navigate("/signup")} className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white">
            Cadastre-se
          </Button>
        </div>
      </header>

      <main className="flex-1 bg-[#F9F9FC] py-10 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#1A1F2C] mb-2">Encontre músicos e bandas</h1>
            <p className="text-[#8E9196]">
              Descubra os melhores talentos musicais para o seu evento, com preços e disponibilidade que se encaixam nas suas necessidades.
            </p>
          </div>

          {/* SEARCH AND FILTERS */}
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
              <div className="relative w-full md:w-auto flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8E9196]" size={18} />
                <Input 
                  placeholder="Buscar por nome, gênero musical..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-3 w-full md:w-auto">
                <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Gênero Musical" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos os gêneros</SelectItem>
                    {genres.map(genre => (
                      <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos os tipos</SelectItem>
                    {types.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="w-full sm:w-[220px]">
                    <SelectValue placeholder="Localização" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas as localizações</SelectItem>
                    {locations.map(location => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between border-t pt-4">
              <div className="text-sm text-[#8E9196]">
                {filteredMusicians.length} {filteredMusicians.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#8E9196]">Ordenar por:</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      {sortBy === "rating" ? "Avaliação" : sortBy === "price" ? "Preço" : "Nome"}
                      <ChevronDown size={14} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setSortBy("rating")}>Avaliação</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("price")}>Preço</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("name")}>Nome</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={toggleSortDirection} 
                  className="h-8 w-8"
                >
                  {sortDirection === "desc" ? <ArrowDown size={16} /> : <ArrowUp size={16} />}
                </Button>
              </div>
            </div>
          </div>

          {/* RESULTS */}
          {filteredMusicians.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center shadow-sm">
              <Music className="h-12 w-12 mx-auto text-[#8E9196] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Nenhum resultado encontrado</h3>
              <p className="text-[#8E9196] mb-6">
                Tente ajustar os filtros de busca ou procurar por outros termos.
              </p>
              <Button onClick={() => {
                setSearchQuery("");
                setSelectedGenre("");
                setSelectedType("");
                setSelectedLocation("");
              }}>
                Limpar filtros
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMusicians.map(musician => (
                <Card key={musician.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-40 bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] flex items-center justify-center relative">
                    {musician.image ? (
                      <img 
                        src={musician.image} 
                        alt={musician.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-white text-4xl font-bold">
                        {musician.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <Badge className="absolute top-3 right-3 bg-white/90 text-[#1A1F2C]">
                      {musician.type}
                    </Badge>
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{musician.name}</CardTitle>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#FFD700" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        <span className="font-medium">{musician.rating}</span>
                        <span className="text-[#8E9196] text-sm ml-1">({musician.reviews})</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center text-[#8E9196]">
                      <MapPin size={16} className="mr-2" />
                      {musician.location}
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-1">Gêneros:</div>
                      <div className="flex flex-wrap gap-1">
                        {musician.genre.map(genre => (
                          <Badge key={genre} variant="outline">
                            {genre}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-1">Disponibilidade:</div>
                      <div className="flex items-center text-[#8E9196]">
                        <Calendar size={16} className="mr-2" />
                        {musician.availability.join(", ")}
                      </div>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm font-medium">Preço aproximado:</div>
                        <div className="text-lg font-semibold text-[#6E59A5]">{musician.price}</div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-[#9b87f5] hover:bg-[#7E69AB]">
                      Solicitar contato
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-[#ececec] py-8">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Music size={20} className="text-primary" />
              <span className="text-lg font-semibold tracking-tight text-[#6E59A5]">Hoobôke</span>
            </div>
            <div className="text-sm text-[#8E9196]">
              &copy; {new Date().getFullYear()} Hoobôke. Todos os direitos reservados.
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-[#8E9196] hover:text-[#6E59A5]">Termos</a>
              <a href="#" className="text-sm text-[#8E9196] hover:text-[#6E59A5]">Privacidade</a>
              <a href="#" className="text-sm text-[#8E9196] hover:text-[#6E59A5]">Ajuda</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
