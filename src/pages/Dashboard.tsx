import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Shield, 
  Settings,
  LogOut,
  Eye,
  EyeOff,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Building2,
  FileText,
  Bell
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import raavbankLogo from "@/assets/raavbank-logo-transparent.png";

const Dashboard = () => {
  const [showBalance, setShowBalance] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com segurança.",
    });
    navigate("/");
  };

  const mockData = {
    empresa: {
      nome: "Tech Solutions Ltda",
      cnpj: "12.345.678/0001-90"
    },
    saldo: 127890.50,
    transacoes: [
      { id: 1, tipo: "entrada", valor: 15000, descricao: "Pagamento Cliente ABC", data: "2024-01-25", status: "concluida" },
      { id: 2, tipo: "saida", valor: 3500, descricao: "Fornecedor XYZ", data: "2024-01-24", status: "concluida" },
      { id: 3, tipo: "entrada", valor: 8900, descricao: "Vendas Online", data: "2024-01-23", status: "pendente" },
      { id: 4, tipo: "saida", valor: 1200, descricao: "Taxa de Serviço", data: "2024-01-22", status: "concluida" }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-animated animate-floating-bg relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0 opacity-10 bg-gradient-particles animate-particles"></div>

      {/* Header do Dashboard */}
      <header className="bg-background/95 backdrop-blur border-b border-border/30 sticky top-0 z-50 shadow-card">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src={raavbankLogo} alt="RaavBank" className="h-8 w-auto" />
              <div>
                <h1 className="text-lg font-semibold">{mockData.empresa.nome}</h1>
                <p className="text-sm text-muted-foreground">CNPJ: {mockData.empresa.cnpj}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6 relative z-10">
        {/* Cards de resumo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 hover:shadow-hero transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-secondary/30 border-0 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Saldo Disponível</p>
                <div className="flex items-center space-x-2 mt-1">
                  <p className="text-2xl font-bold">
                    {showBalance ? `R$ ${mockData.saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : "R$ ••••••"}
                  </p>
                  <button 
                    onClick={() => setShowBalance(!showBalance)}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {showBalance ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="h-12 w-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-hero transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-secondary/30 border-0 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Transações Hoje</p>
                <p className="text-2xl font-bold mt-1">12</p>
                <div className="flex items-center space-x-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-500">+15% vs ontem</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-hero transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-secondary/30 border-0 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Conta Empresarial</p>
                <p className="text-2xl font-bold mt-1">Ativa</p>
                <Badge variant="default" className="mt-1 bg-primary/10 text-primary border-primary/20">
                  Verificada
                </Badge>
              </div>
              <div className="h-12 w-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-hero transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-secondary/30 border-0 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Segurança</p>
                <p className="text-2xl font-bold mt-1">100%</p>
                <Badge variant="default" className="mt-1 bg-green-500/10 text-green-500 border-green-500/20">
                  Protegida
                </Badge>
              </div>
              <div className="h-12 w-12 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Transações Recentes */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-gradient-to-br from-card to-secondary/30 border-0 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Transações Recentes</h2>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Ver Extrato
                </Button>
              </div>
              
              <div className="space-y-4">
                {mockData.transacoes.map((transacao) => (
                  <div key={transacao.id} className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                        transacao.tipo === 'entrada' 
                          ? 'bg-green-500/20 text-green-600' 
                          : 'bg-red-500/20 text-red-600'
                      }`}>
                        {transacao.tipo === 'entrada' ? (
                          <ArrowDownLeft className="h-5 w-5" />
                        ) : (
                          <ArrowUpRight className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{transacao.descricao}</p>
                        <p className="text-sm text-muted-foreground">{transacao.data}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        transacao.tipo === 'entrada' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transacao.tipo === 'entrada' ? '+' : '-'} R$ {transacao.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                      <Badge variant={transacao.status === 'concluida' ? 'default' : 'secondary'} className="text-xs">
                        {transacao.status === 'concluida' ? 'Concluída' : 'Pendente'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Ações Rápidas */}
          <div className="space-y-6">
            <Card className="p-6 bg-gradient-to-br from-card to-secondary/30 border-0 shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Ações Rápidas</h3>
              <div className="space-y-3">
                <Button className="w-full justify-start bg-gradient-cta hover:shadow-glow hover:scale-105 transition-all duration-300">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Nova Transferência
                </Button>
                <Button variant="outline" className="w-full justify-start hover:bg-primary/10 hover:border-primary/30">
                  <FileText className="h-4 w-4 mr-2" />
                  Gerar Boleto
                </Button>
                <Button variant="outline" className="w-full justify-start hover:bg-primary/10 hover:border-primary/30">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Relatórios
                </Button>
                <Button variant="outline" className="w-full justify-start hover:bg-primary/10 hover:border-primary/30">
                  <Users className="h-4 w-4 mr-2" />
                  Gerenciar Usuários
                </Button>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-card to-secondary/30 border-0 shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Segurança da Conta</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Autenticação 2FA</span>
                  <Badge variant="default" className="bg-green-500/10 text-green-500 border-green-500/20">
                    Ativa
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Criptografia</span>
                  <Badge variant="default" className="bg-green-500/10 text-green-500 border-green-500/20">
                    256-bit
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Compliance BC</span>
                  <Badge variant="default" className="bg-green-500/10 text-green-500 border-green-500/20">
                    Conforme
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">MAC Address</span>
                  <Badge variant="default" className="bg-primary/10 text-primary border-primary/20">
                    Autorizado
                  </Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;