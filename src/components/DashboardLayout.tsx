import { useState } from "react";
import { Bell, Settings, LogOut, Home, FileText, BarChart3, Menu, ArrowRightLeft, User, Building, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import ThemeToggle from "@/components/ThemeToggle";
import logo from "@/assets/raavbank-logo-transparent.png";

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentView: 'dashboard' | 'extratos' | 'relatorios' | 'transferencias';
  onViewChange: (view: 'dashboard' | 'extratos' | 'relatorios' | 'transferencias') => void;
}

const DashboardLayout = ({ children, currentView, onViewChange }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const notifications = [
    {
      id: 1,
      title: "Recebimento PIX",
      message: "Você recebeu o valor de R$100,00 e já se encontra disponível na sua conta RaavBank.",
      time: "2 minutos atrás",
      type: "income",
      icon: CreditCard
    },
    {
      id: 2,
      title: "Transferência Enviada",
      message: "Você fez a transferência PIX no valor de R$250,00 para a chave PIX: maria@email.com",
      time: "1 hora atrás",
      type: "transfer",
      icon: ArrowRightLeft
    },
    {
      id: 3,
      title: "Nova Conta Cadastrada",
      message: "Uma nova conta empresarial foi cadastrada em seu nome - Tech Solutions LTDA.",
      time: "3 horas atrás",
      type: "account",
      icon: Building
    }
  ];

  const handleLogout = () => {
    toast({
      title: "Logout realizado com sucesso",
      description: "Você foi desconectado da sua conta.",
    });
    navigate("/");
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'extratos', label: 'Extratos', icon: FileText },
    { id: 'relatorios', label: 'Relatórios', icon: BarChart3 },
    { id: 'transferencias', label: 'Transferências', icon: ArrowRightLeft },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex h-16 items-center px-4 gap-4">
          {/* Menu Mobile */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="RaavBank" className="h-8 w-auto" />
            <div className="hidden md:block">
              <h1 className="text-lg font-semibold text-foreground">RaavBank</h1>
              <p className="text-xs text-muted-foreground">Sistema Empresarial</p>
            </div>
          </div>

          <div className="flex-1" />

          {/* Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            
            <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-4 w-4" />
                  <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 text-xs p-0 flex items-center justify-center">
                    {notifications.length}
                  </Badge>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-0">
                    <div className="p-4 border-b">
                      <h3 className="font-semibold">Notificações</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => {
                        const Icon = notification.icon;
                        return (
                          <div key={notification.id} className="p-4 border-b last:border-b-0 hover:bg-muted/50 transition-colors">
                            <div className="flex items-start space-x-3">
                              <div className={`p-2 rounded-lg ${
                                notification.type === 'income' ? 'bg-green-100 dark:bg-green-900/20' :
                                notification.type === 'transfer' ? 'bg-blue-100 dark:bg-blue-900/20' :
                                'bg-purple-100 dark:bg-purple-900/20'
                              }`}>
                                <Icon className={`h-4 w-4 ${
                                  notification.type === 'income' ? 'text-green-600 dark:text-green-400' :
                                  notification.type === 'transfer' ? 'text-blue-600 dark:text-blue-400' :
                                  'text-purple-600 dark:text-purple-400'
                                }`} />
                              </div>
                              <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium">{notification.title}</p>
                                <p className="text-xs text-muted-foreground">{notification.message}</p>
                                <p className="text-xs text-muted-foreground">{notification.time}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="p-4 border-t">
                      <Button variant="outline" className="w-full" size="sm">
                        Ver todas as notificações
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </PopoverContent>
            </Popover>

            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden md:inline">Sair</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:relative z-40 w-64 h-screen bg-card border-r transition-transform duration-300 ease-in-out`}>
          <div className="p-4">
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={currentView === item.id ? "secondary" : "ghost"}
                    className="w-full justify-start gap-3"
                    onClick={() => {
                      onViewChange(item.id as 'dashboard' | 'extratos' | 'relatorios' | 'transferencias');
                      setSidebarOpen(false);
                    }}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Overlay para mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;