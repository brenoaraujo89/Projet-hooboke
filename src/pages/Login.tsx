
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Music, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd authenticate the user here
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#F6F5FE] to-[#E5DEFF] flex flex-col">
      {/* HEADER */}
      <header className="w-full flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <Music size={28} className="text-primary" />
          <span className="text-2xl font-semibold tracking-tight text-[#6E59A5]">Hoobôke</span>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-[#6E59A5]">Login</CardTitle>
            <CardDescription className="text-center">
              Acesse sua conta para gerenciar sua banda
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="seuemail@exemplo.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <Button type="button" variant="link" className="px-0 text-xs text-[#9b87f5]">
                    Esqueceu a senha?
                  </Button>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full bg-[#9b87f5] hover:bg-[#7E69AB]">
                <LogIn className="mr-2 h-4 w-4" /> Entrar
              </Button>
              <div className="text-sm text-center text-muted-foreground">
                Não tem uma conta?{" "}
                <Button variant="link" className="p-0 text-[#9b87f5]" onClick={() => navigate("/signup")}>
                  Cadastre-se agora
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>

      <footer className="py-6 text-center text-sm text-muted-foreground">
        <div className="max-w-7xl mx-auto px-4">
          Hoobôke &copy; {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
}
