import { useState } from "react";
import { Eye, EyeOff, TrendingUp, Users, DollarSign, Activity, Building, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const DashboardGestor = () => {
  const [showBalances, setShowBalances] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState("30");

  // Mock data para carteira de clientes selecionados
  const mockData = {
    carteiraResumo: {
      totalClientes: 24,
      saldoTotalPJ: 1456789.50,
      saldoTotalPF: 234567.89,
      saldoGeral: 1691357.39
    },
    clientesPJ: [
      { id: 1, name: "Tech Solutions Ltda", cnpj: "12.345.678/0001-90", saldo: 127890.50, status: "ativa" },
      { id: 2, name: "Comércio ABC Ltda", cnpj: "98.765.432/0001-10", saldo: 89567.30, status: "ativa" },
      { id: 3, name: "Indústria XYZ SA", cnpj: "11.222.333/0001-44", saldo: 445890.20, status: "suspensa" },
    ],
    clientesPF: [
      { id: 1, name: "João Silva Santos", cpf: "123.456.789-00", saldo: 15890.50, status: "ativa" },
      { id: 2, name: "Maria Oliveira Costa", cpf: "987.654.321-00", saldo: 8945.30, status: "ativa" },
      { id: 3, name: "Pedro Santos Lima", cpf: "456.789.123-00", saldo: 22567.89, status: "ativa" },
    ],
    movimentacoes: [
      { id: 1, cliente: "Tech Solutions Ltda", tipo: "PJ", value: 15000, type: "entrada", date: "2024-01-25" },
      { id: 2, cliente: "João Silva Santos", tipo: "PF", value: 4500, type: "entrada", date: "2024-01-25" },
      { id: 3, cliente: "Comércio ABC Ltda", tipo: "PJ", value: 3500, type: "saida", date: "2024-01-24" },
      { id: 4, cliente: "Maria Oliveira Costa", tipo: "PF", value: 350, type: "saida", date: "2024-01-24" },
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Dashboard Gestor</h2>
          <p className="text-muted-foreground">Visão geral da carteira de clientes</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">7 dias</SelectItem>
              <SelectItem value="30">30 dias</SelectItem>
              <SelectItem value="90">90 dias</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.carteiraResumo.totalClientes}</div>
            <p className="text-xs text-muted-foreground">+3 novos este mês</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Total PJ</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold">
                {showBalances 
                  ? `R$ ${mockData.carteiraResumo.saldoTotalPJ.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                  : "R$ ••••••"
                }
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBalances(!showBalances)}
                className="h-8 w-8 p-0"
              >
                {showBalances ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Total PF</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {showBalances 
                ? `R$ ${mockData.carteiraResumo.saldoTotalPF.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                : "R$ ••••••"
              }
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Geral</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {showBalances 
                ? `R$ ${mockData.carteiraResumo.saldoGeral.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                : "R$ ••••••"
              }
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Clientes PJ */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Clientes Pessoa Jurídica
            </CardTitle>
            <CardDescription>
              Empresas da sua carteira
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockData.clientesPJ.map((cliente) => (
              <div key={cliente.id} className="flex items-center justify-between p-3 rounded-lg border">
                <div>
                  <p className="font-medium">{cliente.name}</p>
                  <p className="text-sm text-muted-foreground">{cliente.cnpj}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    {showBalances 
                      ? `R$ ${cliente.saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                      : "R$ ••••••"
                    }
                  </p>
                  <Badge variant={cliente.status === 'ativa' ? 'default' : 'secondary'} className="text-xs">
                    {cliente.status === 'ativa' ? 'Ativa' : 'Suspensa'}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Clientes PF */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Clientes Pessoa Física
            </CardTitle>
            <CardDescription>
              Pessoas físicas da sua carteira
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockData.clientesPF.map((cliente) => (
              <div key={cliente.id} className="flex items-center justify-between p-3 rounded-lg border">
                <div>
                  <p className="font-medium">{cliente.name}</p>
                  <p className="text-sm text-muted-foreground">{cliente.cpf}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    {showBalances 
                      ? `R$ ${cliente.saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                      : "R$ ••••••"
                    }
                  </p>
                  <Badge variant={cliente.status === 'ativa' ? 'default' : 'secondary'} className="text-xs">
                    {cliente.status === 'ativa' ? 'Ativa' : 'Suspensa'}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Movimentações Recentes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Movimentações Recentes da Carteira
          </CardTitle>
          <CardDescription>
            Últimas transações dos clientes selecionados
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockData.movimentacoes.map((mov) => (
            <div key={mov.id} className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  mov.type === 'entrada' 
                    ? 'bg-green-100 text-green-600 dark:bg-green-900/20' 
                    : 'bg-red-100 text-red-600 dark:bg-red-900/20'
                }`}>
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">{mov.cliente}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {mov.tipo}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{mov.date}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${
                  mov.type === 'entrada' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {mov.type === 'entrada' ? '+' : '-'} R$ {mov.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardGestor;