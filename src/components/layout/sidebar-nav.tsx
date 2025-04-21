
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Calendar, Music, Users, BookOpen, 
  DollarSign, Package, List, 
  Home, User, MapPin, Phone, BarChart2 
} from "lucide-react";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

export function SidebarNav({ className, ...props }: SidebarNavProps) {
  const location = useLocation();
  
  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Agenda",
      href: "/agenda",
      icon: Calendar,
    },
    {
      title: "Repertório",
      href: "/repertorio",
      icon: Music,
    },
    {
      title: "Contatos",
      href: "/contatos",
      icon: Phone,
    },
    {
      title: "Finanças",
      href: "/financas",
      icon: DollarSign,
    },
    {
      title: "Equipe",
      href: "/equipe",
      icon: Users,
    },
    {
      title: "Equipamentos",
      href: "/equipamentos",
      icon: Package,
    },
    {
      title: "Disponibilidade",
      href: "/disponibilidade",
      icon: MapPin,
    },
  ];

  return (
    <nav className={cn("flex flex-col space-y-1", className)} {...props}>
      {navItems.map((item) => {
        const isActive = location.pathname === item.href;
        const Icon = item.icon;
        
        return (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
              isActive
                ? "text-sidebar-primary-foreground bg-sidebar-primary"
                : "text-sidebar-foreground hover:text-sidebar-primary hover:bg-sidebar-accent"
            )}
          >
            <Icon className="h-4 w-4 mr-3 shrink-0" />
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
