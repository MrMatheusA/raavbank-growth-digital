import { useState } from "react";
import { Plus, Search, Shield, UserPlus, UserX, UserCheck, Building, User, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

const DashboardGerente = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("todos");
  const [filterType, setFilterType] = useState("todos");
  const [isNewUserDialogOpen, setIsNewUserDialogOpen] = useState(false);
  const { toast } = useToast();

  // Mock data para gerenciamento de contas
  const [contas, setContas] = useState([
    { id: 1, name: "Tech Solutions Ltda", document: "12.345.678/0001-90", type: "PJ", status: "ativa", gestor: "Maria Silva", saldo: 127890.50, createdAt: "2024-01-15" },
    { id: 2, name: "João Silva Santos", document: "123.456.789-00", type: "PF", status: "ativa", gestor: "Pedro Costa", saldo: 15890.50, createdAt: "2024-01-20" },
    { id: 3, name: "Comércio ABC Ltda", document: "98.765.432/0001-10", type: "PJ", status: "suspensa", gestor: "Ana Santos", saldo: 89567.30, createdAt: "2024-01-10" },
    { id: 4, name: "Maria Oliveira Costa", document: "987.654.321-00", type: "PF", status: "bloqueada", gestor: "Carlos Lima", saldo: 8945.30, createdAt: "2024-01-18" },
    { id: 5, name: "Indústria XYZ SA", document: "11.222.333/0001-44", type: "PJ", status: "inativa", gestor: "Lucia Ferreira", saldo: 0, createdAt: "2024-01-05" },
  ]);

  const handleStatusChange = (contaId: number, newStatus: string) => {
    setContas(contas.map(conta => 
      conta.id === contaId ? { ...conta, status: newStatus } : conta
    ));
    toast({
      title: "Status atualizado",
      description: `Conta ${newStatus} com sucesso.`,
    });
  };

  const handleCreateNewUser = () => {
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "Formulário de criação de usuário será implementado.",
    });
    setIsNewUserDialogOpen(false);
  };

  const filteredContas = contas.filter(conta => {
    const matchesSearch = conta.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conta.document.includes(searchTerm);
    const matchesStatus = filterStatus === "todos" || conta.status === filterStatus;
    const matchesType = filterType === "todos" || conta.type === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativa': return 'bg-green-100 text-green-700 dark:bg-green-900/20';
      case 'suspensa': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20';
      case 'bloqueada': return 'bg-red-100 text-red-700 dark:bg-red-900/20';
      case 'inativa': return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ativa': return 'Ativa';
      case 'suspensa': return 'Suspensa';
      case 'bloqueada': return 'Bloqueada';
      case 'inativa': return 'Inativa';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Dashboard Gerente</h2>
          <p className="text-muted-foreground">Gerenciamento de contas e usuários</p>
        </div>
        <Dialog open={isNewUserDialogOpen} onOpenChange={setIsNewUserDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nova Conta
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Nova Conta</DialogTitle>
              <DialogDescription>
                Adicione um novo cliente ao sistema
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tipoUsuario">Tipo de Conta</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PF">Pessoa Física</SelectItem>
                    <SelectItem value="PJ">Pessoa Jurídica</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="gestor">Gestor Responsável</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o gestor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maria">Maria Silva</SelectItem>
                    <SelectItem value="pedro">Pedro Costa</SelectItem>
                    <SelectItem value="ana">Ana Santos</SelectItem>
                    <SelectItem value="carlos">Carlos Lima</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNewUserDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateNewUser}>
                Criar Conta
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Contas</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contas.length}</div>
            <p className="text-xs text-muted-foreground">+2 este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contas Ativas</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {contas.filter(c => c.status === 'ativa').length}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((contas.filter(c => c.status === 'ativa').length / contas.length) * 100)}% do total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contas Bloqueadas</CardTitle>
            <UserX className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {contas.filter(c => c.status === 'bloqueada' || c.status === 'suspensa').length}
            </div>
            <p className="text-xs text-muted-foreground">Requer atenção</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Segurança</CardTitle>
            <Shield className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">Alto</div>
            <p className="text-xs text-muted-foreground">Sistema seguro</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Gerenciar Contas</CardTitle>
          <CardDescription>
            Visualize e gerencie todas as contas do sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por nome ou documento..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Status</SelectItem>
                <SelectItem value="ativa">Ativas</SelectItem>
                <SelectItem value="suspensa">Suspensas</SelectItem>
                <SelectItem value="bloqueada">Bloqueadas</SelectItem>
                <SelectItem value="inativa">Inativas</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="PF">PF</SelectItem>
                <SelectItem value="PJ">PJ</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {filteredContas.map((conta) => (
              <div key={conta.id} className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${
                    conta.type === 'PJ' 
                      ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20' 
                      : 'bg-green-100 text-green-600 dark:bg-green-900/20'
                  }`}>
                    {conta.type === 'PJ' ? (
                      <Building className="h-4 w-4" />
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{conta.name}</p>
                    <p className="text-sm text-muted-foreground">{conta.document}</p>
                    <p className="text-xs text-muted-foreground">Gestor: {conta.gestor}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-semibold">
                      R$ {conta.saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <Badge className={`text-xs ${getStatusColor(conta.status)}`}>
                      {getStatusText(conta.status)}
                    </Badge>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(conta.id, 'ativa')}
                        disabled={conta.status === 'ativa'}
                      >
                        <UserCheck className="h-4 w-4 mr-2" />
                        Ativar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(conta.id, 'suspensa')}
                        disabled={conta.status === 'suspensa'}
                      >
                        <UserX className="h-4 w-4 mr-2" />
                        Suspender
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(conta.id, 'bloqueada')}
                        disabled={conta.status === 'bloqueada'}
                      >
                        <UserX className="h-4 w-4 mr-2" />
                        Bloquear
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(conta.id, 'inativa')}
                        disabled={conta.status === 'inativa'}
                      >
                        <UserX className="h-4 w-4 mr-2" />
                        Desativar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardGerente;