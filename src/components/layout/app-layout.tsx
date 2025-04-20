
import { SidebarNav } from "./sidebar-nav";
import { AppHeader } from "./app-header";
import { Sidebar } from "@/components/ui/sidebar";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-full flex-col lg:flex-row">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden p-4 border-b flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        <span className="ml-2 text-lg font-semibold">Hoobôke</span>
      </div>

      {/* Sidebar for desktop and conditionally for mobile */}
      <div
        className={`${
          sidebarOpen ? "block" : "hidden"
        } lg:block w-full lg:w-64 shrink-0 border-r bg-sidebar`}
      >
        <div className="p-6 flex items-center h-16 border-b">
          <span className="text-xl font-semibold">Hoobôke</span>
        </div>
        <div className="p-4">
          <SidebarNav />
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <AppHeader />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
