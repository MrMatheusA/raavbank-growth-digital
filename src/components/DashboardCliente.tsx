import { useState } from "react";
import { Eye, EyeOff, ArrowUpRight, ArrowDownRight, Plus, FileText, BarChart3, Users, Shield, DollarSign, TrendingUp, Activity, CheckCircle, AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface DashboardClienteProps {
  userType: 'PF' | 'PJ';
}

const DashboardCliente = ({ userType }: DashboardClienteProps) => {
  const [showBalance, setShowBalance] = useState(true);
  const [showAlert, setShowAlert] = useState(true);
  
  // Simulação de status da conta - em produção viria do backend
  const accountStatus = {
    status: 'suspended', // 'active' | 'suspended' | 'pending' | 'warning'
    message: 'Sua conta foi temporariamente suspensa por motivos de segurança.',
    action: 'Entre em contato com seu gerente de conta para reativação.'
  };

  // Mock data baseado no tipo de usuário
  const mockData = userType === 'PJ' ? {
    clientInfo: {
      name: "Tech Solutions Ltda",
      document: "12.345.678/0001-90",
      type: "CNPJ"
    },
    balance: 127890.50,
    transactions: [
      { id: 1, description: "Pagamento Cliente ABC", date: "2024-01-25", value: 15000, type: "entrada", status: "concluida" },
      { id: 2, description: "Fornecedor XYZ", date: "2024-01-24", value: 3500, type: "saida", status: "concluida" },
      { id: 3, description: "Vendas Online", date: "2024-01-23", value: 8900, type: "entrada", status: "pendente" },
      { id: 4, description: "Taxa de Serviço", date: "2024-01-22", value: 1200, type: "saida", status: "concluida" },
    ],
  } : {
    clientInfo: {
      name: "João Silva Santos",
      document: "123.456.789-00",
      type: "CPF"
    },
    balance: 5890.50,
    transactions: [
      { id: 1, description: "Salário", date: "2024-01-25", value: 4500, type: "entrada", status: "concluida" },
      { id: 2, description: "Supermercado", date: "2024-01-24", value: 350, type: "saida", status: "concluida" },
      { id: 3, description: "Freelance", date: "2024-01-23", value: 890, type: "entrada", status: "pendente" },
      { id: 4, description: "Conta de Luz", date: "2024-01-22", value: 120, type: "saida", status: "concluida" },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Alert de Status da Conta */}
      {showAlert && accountStatus.status !== 'active' && (
        <Alert 
          variant={
            accountStatus.status === 'suspended' ? 'destructive' : 
            accountStatus.status === 'warning' ? 'warning' : 'info'
          }
          className="rounded-xl"
        >
          <AlertTriangle className="h-4 w-4" />
          <div className="flex items-start justify-between w-full">
            <div className="space-y-1">
              <AlertTitle>
                {accountStatus.status === 'suspended' ? 'Conta Suspensa' :
                 accountStatus.status === 'warning' ? 'Atenção Necessária' : 'Informação Importante'}
              </AlertTitle>
              <AlertDescription className="space-y-2">
                <p>{accountStatus.message}</p>
                <p className="font-medium">{accountStatus.action}</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Contatar Gerente
                </Button>
              </AlertDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAlert(false)}
              className="h-6 w-6 p-0 shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </Alert>
      )}
      {/* Client Info */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">{mockData.clientInfo.name}</h2>
          <p className="text-muted-foreground">{mockData.clientInfo.type}: {mockData.clientInfo.document}</p>
        </div>
        <Badge variant="secondary" className="px-3 py-1">
          Conta Ativa
        </Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Disponível</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold">
                {showBalance 
                  ? `R$ ${mockData.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                  : "R$ ••••••"
                }
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBalance(!showBalance)}
                className="h-8 w-8 p-0"
              >
                {showBalance ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transações Hoje</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userType === 'PJ' ? '12' : '3'}</div>
            <p className="text-xs text-muted-foreground">+2 desde ontem</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status da Conta</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Ativa</div>
            <p className="text-xs text-muted-foreground">Verificada</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nível de Segurança</CardTitle>
            <Shield className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">Alto</div>
            <p className="text-xs text-muted-foreground">Criptografia ativa</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Transações Recentes
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Ver Todas
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockData.transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      transaction.type === 'entrada' 
                        ? 'bg-green-100 text-green-600 dark:bg-green-900/20' 
                        : 'bg-red-100 text-red-600 dark:bg-red-900/20'
                    }`}>
                      {transaction.type === 'entrada' ? (
                        <ArrowDownRight className="h-4 w-4" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-muted-foreground">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.type === 'entrada' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'entrada' ? '+' : '-'} R$ {transaction.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <Badge variant={transaction.status === 'concluida' ? 'default' : 'secondary'} className="text-xs">
                      {transaction.status === 'concluida' ? 'Concluída' : 'Pendente'}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="default">
                <Plus className="h-4 w-4 mr-2" />
                Nova Transferência
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Ver Extratos
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <BarChart3 className="h-4 w-4 mr-2" />
                Relatórios
              </Button>
              {userType === 'PJ' && (
                <Button className="w-full justify-start" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Gerenciar Usuários
                </Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Segurança da Conta</CardTitle>
              <CardDescription>
                Suas informações estão protegidas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Criptografia 256-bit</span>
                  <Badge variant="default" className="bg-green-100 text-green-700 dark:bg-green-900/20">Ativa</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Proteção contra Fraudes</span>
                  <Badge variant="default" className="bg-green-100 text-green-700 dark:bg-green-900/20">Ativa</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Conformidade BC</span>
                  <Badge variant="default" className="bg-green-100 text-green-700 dark:bg-green-900/20">Conforme</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardCliente;