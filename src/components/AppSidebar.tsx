import { useState } from "react";
import { 
  BarChart3, 
  Users, 
  UserPlus, 
  Settings, 
  LogOut,
  Monitor,
  TrendingUp
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

interface AppSidebarProps {
  userRole: 'admin' | 'user';
  onLogout: () => void;
}

const adminItems = [
  { title: "Dashboard Geral", url: "/", icon: BarChart3 },
  { title: "Dashboard Individual", url: "/individual", icon: Monitor },
  { title: "Gerenciar Usuários", url: "/manage", icon: Users },
  { title: "Criar Usuário", url: "/create", icon: UserPlus },
];

const userItems = [
  { title: "Meu Desempenho", url: "/", icon: TrendingUp },
];

export function AppSidebar({ userRole, onLogout }: AppSidebarProps) {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  
  const items = userRole === 'admin' ? adminItems : userItems;
  const collapsed = state === 'collapsed';
  
  const isActive = (path: string) => currentPath === path;
  
  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary/10 text-primary border-r-2 border-primary" 
      : "hover:bg-secondary/50 text-muted-foreground hover:text-foreground";

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-card border-r border-border">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-primary" />
            </div>
            {!collapsed && (
              <div>
                <h1 className="font-semibold text-sm">Performance</h1>
                <p className="text-xs text-muted-foreground">
                  {userRole === 'admin' ? 'Admin Panel' : 'Meu Dashboard'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-2 text-xs font-medium text-muted-foreground">
            {!collapsed && (userRole === 'admin' ? 'ADMINISTRAÇÃO' : 'PESSOAL')}
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-2">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="w-full mb-1">
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${getNavClass({ isActive })}`}
                    >
                      <item.icon className="w-4 h-4 shrink-0" />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Footer */}
        <div className="mt-auto p-4 border-t border-border">
          <Button 
            variant="ghost" 
            onClick={onLogout}
            className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
          >
            <LogOut className="w-4 h-4" />
            {!collapsed && <span className="text-sm">Sair</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}