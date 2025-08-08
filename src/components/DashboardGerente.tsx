import { useState } from "react";
import { 
  Shield, 
  Smartphone, 
  Key, 
  FileText, 
  Settings, 
  Percent, 
  DollarSign, 
  UserCheck, 
  UserX,
  Search,
  MoreVertical,
  Plus,
  Wifi,
  Lock,
  Unlock,
  Eye,
  Calculator
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const DashboardGerente = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("devices");
  
  // Estados para diferentes funcionalidades
  const [searchTerm, setSearchTerm] = useState("");
  const [deviceDialogOpen, setDeviceDialogOpen] = useState(false);
  const [accessRecoveryDialogOpen, setAccessRecoveryDialogOpen] = useState(false);
  const [taxConfigDialogOpen, setTaxConfigDialogOpen] = useState(false);
  const [newMacAddress, setNewMacAddress] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  
  // Mock data para dispositivos MAC autorizados
  const [authorizedDevices, setAuthorizedDevices] = useState([
    { id: 1, macAddress: "AA:BB:CC:DD:EE:FF", user: "João Silva Santos", userType: "cliente", status: "ativo", addedDate: "2024-01-15" },
    { id: 2, macAddress: "11:22:33:44:55:66", user: "Maria Silva", userType: "gestor", status: "ativo", addedDate: "2024-01-18" },
    { id: 3, macAddress: "FF:EE:DD:CC:BB:AA", user: "Tech Solutions Ltda", userType: "cliente", status: "bloqueado", addedDate: "2024-01-10" },
  ]);

  // Mock data para usuários/contas
  const [accounts, setAccounts] = useState([
    { id: 1, name: "Tech Solutions Ltda", document: "12.345.678/0001-90", type: "PJ", status: "ativa", gestor: "Maria Silva", saldo: 127890.50, taxRate: 0.15 },
    { id: 2, name: "João Silva Santos", document: "123.456.789-00", type: "PF", status: "ativa", gestor: "Pedro Costa", saldo: 15890.50, taxRate: 0.12 },
    { id: 3, name: "Comércio ABC Ltda", document: "98.765.432/0001-10", type: "PJ", status: "suspensa", gestor: "Ana Santos", saldo: 89567.30, taxRate: 0.18 },
    { id: 4, name: "Maria Oliveira Costa", document: "987.654.321-00", type: "PF", status: "bloqueada", gestor: "Carlos Lima", saldo: 8945.30, taxRate: 0.10 },
  ]);

  // Mock data para solicitações de recuperação de acesso
  const [accessRequests, setAccessRequests] = useState([
    { id: 1, user: "João Silva Santos", document: "123.456.789-00", userType: "cliente", reason: "Esqueci a senha", status: "pendente", date: "2024-01-20" },
    { id: 2, user: "Maria Silva", document: "987.654.321-00", userType: "gestor", reason: "Celular perdido - 2FA", status: "pendente", date: "2024-01-19" },
  ]);

  // Funções para gerenciar dispositivos MAC
  const handleAddMacAddress = () => {
    if (newMacAddress && selectedUser) {
      const newDevice = {
        id: authorizedDevices.length + 1,
        macAddress: newMacAddress.toUpperCase(),
        user: selectedUser,
        userType: "cliente",
        status: "ativo",
        addedDate: new Date().toISOString().split('T')[0]
      };
      setAuthorizedDevices([...authorizedDevices, newDevice]);
      setNewMacAddress("");
      setSelectedUser("");
      setDeviceDialogOpen(false);
      toast({
        title: "MAC autorizado",
        description: `Dispositivo ${newMacAddress} autorizado com sucesso.`,
      });
    }
  };

  const handleDeviceStatusChange = (deviceId: number, newStatus: string) => {
    setAuthorizedDevices(authorizedDevices.map(device => 
      device.id === deviceId ? { ...device, status: newStatus } : device
    ));
    toast({
      title: "Status do dispositivo atualizado",
      description: `Dispositivo ${newStatus} com sucesso.`,
    });
  };

  // Funções para recuperação de acesso
  const handleAccessRecovery = (requestId: number, action: string) => {
    setAccessRequests(accessRequests.map(request => 
      request.id === requestId ? { ...request, status: action } : request
    ));
    toast({
      title: "Solicitação processada",
      description: `Acesso ${action} com sucesso.`,
    });
  };

  // Funções para gerenciar contas
  const handleAccountStatusChange = (accountId: number, newStatus: string) => {
    setAccounts(accounts.map(account => 
      account.id === accountId ? { ...account, status: newStatus } : account
    ));
    toast({
      title: "Status da conta atualizado",
      description: `Conta ${newStatus} com sucesso.`,
    });
  };

  // Função para configurar taxas
  const handleTaxRateUpdate = (accountId: number, newRate: number) => {
    if (newRate < 0.1) {
      toast({
        title: "Taxa inválida",
        description: "A taxa mínima é de 0,1%.",
        variant: "destructive"
      });
      return;
    }
    
    setAccounts(accounts.map(account => 
      account.id === accountId ? { ...account, taxRate: newRate } : account
    ));
    toast({
      title: "Taxa atualizada",
      description: `Taxa de remuneração configurada para ${newRate}%.`,
    });
  };

  const filteredDevices = authorizedDevices.filter(device =>
    device.macAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAccounts = accounts.filter(account =>
    account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.document.includes(searchTerm)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativa': case 'ativo': return 'bg-green-100 text-green-700 dark:bg-green-900/20';
      case 'suspensa': case 'suspenso': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20';
      case 'bloqueada': case 'bloqueado': return 'bg-red-100 text-red-700 dark:bg-red-900/20';
      case 'inativa': case 'inativo': return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20';
      case 'pendente': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/20';
      case 'aprovado': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ativa': case 'ativo': return 'Ativo';
      case 'suspensa': case 'suspenso': return 'Suspenso';
      case 'bloqueada': case 'bloqueado': return 'Bloqueado';
      case 'inativa': case 'inativo': return 'Inativo';
      case 'pendente': return 'Pendente';
      case 'aprovado': return 'Aprovado';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Dashboard Gerente</h2>
          <p className="text-muted-foreground">Gerenciamento avançado do sistema</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dispositivos Autorizados</CardTitle>
            <Smartphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{authorizedDevices.length}</div>
            <p className="text-xs text-muted-foreground">MACs registrados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recuperações Pendentes</CardTitle>
            <Key className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {accessRequests.filter(r => r.status === 'pendente').length}
            </div>
            <p className="text-xs text-muted-foreground">Aguardando análise</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contas Ativas</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {accounts.filter(c => c.status === 'ativa').length}
            </div>
            <p className="text-xs text-muted-foreground">Operando normalmente</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa Média</CardTitle>
            <Percent className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {(accounts.reduce((acc, curr) => acc + curr.taxRate, 0) / accounts.length).toFixed(2)}%
            </div>
            <p className="text-xs text-muted-foreground">Remuneração aplicada</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs de funcionalidades */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="devices">Dispositivos MAC</TabsTrigger>
          <TabsTrigger value="recovery">Recuperação</TabsTrigger>
          <TabsTrigger value="extracts">Extratos</TabsTrigger>
          <TabsTrigger value="accounts">Contas</TabsTrigger>
          <TabsTrigger value="taxes">Taxas</TabsTrigger>
        </TabsList>

        {/* Aba de Dispositivos MAC */}
        <TabsContent value="devices" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Autorização de Dispositivos MAC</CardTitle>
                  <CardDescription>
                    Liberar e gerenciar MACs de dispositivos para acesso
                  </CardDescription>
                </div>
                <Dialog open={deviceDialogOpen} onOpenChange={setDeviceDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" />
                      Autorizar MAC
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Autorizar Dispositivo MAC</DialogTitle>
                      <DialogDescription>
                        Adicione um novo endereço MAC autorizado
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="macAddress">Endereço MAC</Label>
                        <Input
                          id="macAddress"
                          placeholder="AA:BB:CC:DD:EE:FF"
                          value={newMacAddress}
                          onChange={(e) => setNewMacAddress(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="user">Usuário</Label>
                        <Select value={selectedUser} onValueChange={setSelectedUser}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o usuário" />
                          </SelectTrigger>
                          <SelectContent>
                            {accounts.map(account => (
                              <SelectItem key={account.id} value={account.name}>
                                {account.name} - {account.document}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setDeviceDialogOpen(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={handleAddMacAddress}>
                        Autorizar
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar por MAC ou usuário..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-4">
                {filteredDevices.map((device) => (
                  <div key={device.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/20">
                        <Wifi className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium font-mono">{device.macAddress}</p>
                        <p className="text-sm text-muted-foreground">{device.user}</p>
                        <p className="text-xs text-muted-foreground">
                          {device.userType} • Adicionado em {device.addedDate}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <Badge className={`text-xs ${getStatusColor(device.status)}`}>
                        {getStatusText(device.status)}
                      </Badge>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleDeviceStatusChange(device.id, 'ativo')}
                            disabled={device.status === 'ativo'}
                          >
                            <Unlock className="h-4 w-4 mr-2" />
                            Ativar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeviceStatusChange(device.id, 'bloqueado')}
                            disabled={device.status === 'bloqueado'}
                          >
                            <Lock className="h-4 w-4 mr-2" />
                            Bloquear
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba de Recuperação de Acesso */}
        <TabsContent value="recovery" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recuperação de Acessos</CardTitle>
              <CardDescription>
                Auxiliar na recuperação de acessos de clientes e gestores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {accessRequests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-900/20">
                        <Key className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{request.user}</p>
                        <p className="text-sm text-muted-foreground">{request.document}</p>
                        <p className="text-sm">{request.reason}</p>
                        <p className="text-xs text-muted-foreground">
                          {request.userType} • {request.date}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <Badge className={`text-xs ${getStatusColor(request.status)}`}>
                        {getStatusText(request.status)}
                      </Badge>
                      
                      {request.status === 'pendente' && (
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            onClick={() => handleAccessRecovery(request.id, 'aprovado')}
                          >
                            Aprovar
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleAccessRecovery(request.id, 'rejeitado')}
                          >
                            Rejeitar
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba de Extratos */}
        <TabsContent value="extracts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Visualização de Extratos</CardTitle>
              <CardDescription>
                Visualizar extratos de clientes e gestores quando solicitados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {accounts.map((account) => (
                  <div key={account.id} className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium">{account.name}</p>
                        <p className="text-sm text-muted-foreground">{account.document}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        Ver Extrato
                      </Button>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold">
                        R$ {account.saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                      <Badge className={`text-xs ${getStatusColor(account.status)}`}>
                        {getStatusText(account.status)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba de Gerenciamento de Contas */}
        <TabsContent value="accounts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciamento de Contas</CardTitle>
              <CardDescription>
                Bloquear ou desbloquear contas de clientes e gestores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
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
              <div className="space-y-4">
                {filteredAccounts.map((account) => (
                  <div key={account.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${
                        account.type === 'PJ' 
                          ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20' 
                          : 'bg-green-100 text-green-600 dark:bg-green-900/20'
                      }`}>
                        <UserCheck className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{account.name}</p>
                        <p className="text-sm text-muted-foreground">{account.document}</p>
                        <p className="text-xs text-muted-foreground">Gestor: {account.gestor}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-semibold">
                          R$ {account.saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                        <Badge className={`text-xs ${getStatusColor(account.status)}`}>
                          {getStatusText(account.status)}
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
                            onClick={() => handleAccountStatusChange(account.id, 'ativa')}
                            disabled={account.status === 'ativa'}
                          >
                            <UserCheck className="h-4 w-4 mr-2" />
                            Ativar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleAccountStatusChange(account.id, 'suspensa')}
                            disabled={account.status === 'suspensa'}
                          >
                            <UserX className="h-4 w-4 mr-2" />
                            Suspender
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleAccountStatusChange(account.id, 'bloqueada')}
                            disabled={account.status === 'bloqueada'}
                          >
                            <UserX className="h-4 w-4 mr-2" />
                            Bloquear
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba de Configuração de Taxas */}
        <TabsContent value="taxes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuração de Taxas</CardTitle>
              <CardDescription>
                Determinar percentual de taxa de remuneração e taxas adicionais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    <strong>Importante:</strong> A taxa mínima de remuneração é de 0,1%. 
                    Taxas menores podem ser configuradas para transações que excedam valores específicos.
                  </p>
                </div>
                
                <div className="grid gap-4">
                  {accounts.map((account) => (
                    <div key={account.id} className="p-4 rounded-lg border">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="font-medium">{account.name}</p>
                          <p className="text-sm text-muted-foreground">{account.document}</p>
                        </div>
                        <Badge className={`text-xs ${getStatusColor(account.status)}`}>
                          {getStatusText(account.status)}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Taxa Atual</Label>
                          <div className="flex items-center space-x-2">
                            <Input
                              type="number"
                              step="0.01"
                              min="0.1"
                              value={account.taxRate}
                              onChange={(e) => {
                                const newRate = parseFloat(e.target.value);
                                if (!isNaN(newRate)) {
                                  handleTaxRateUpdate(account.id, newRate);
                                }
                              }}
                              className="w-20"
                            />
                            <span className="text-sm text-muted-foreground">%</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Valor Alto (R$)</Label>
                          <Input
                            type="number"
                            placeholder="10000"
                            className="w-full"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Taxa Reduzida (%)</Label>
                          <Input
                            type="number"
                            step="0.01"
                            min="0.1"
                            placeholder="0.1"
                            className="w-full"
                          />
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t">
                        <Label className="text-sm font-medium">Taxa Adicional de Serviço</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                          <div className="space-y-2">
                            <Label className="text-xs">Valor da Taxa (R$)</Label>
                            <Input
                              type="number"
                              step="0.01"
                              placeholder="0.00"
                              className="w-full"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs">Distribuição (%)</Label>
                            <div className="flex space-x-2">
                              <Input
                                type="number"
                                placeholder="70"
                                className="w-20"
                              />
                              <span className="text-xs text-muted-foreground self-center">IP</span>
                              <Input
                                type="number"
                                placeholder="30"
                                className="w-20"
                              />
                              <span className="text-xs text-muted-foreground self-center">Gerente</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex justify-end">
                        <Button size="sm">
                          <Calculator className="h-4 w-4 mr-2" />
                          Aplicar Configurações
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardGerente;