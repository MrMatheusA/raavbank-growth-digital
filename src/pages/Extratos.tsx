import { useState } from "react";
import { ArrowDownLeft, ArrowUpRight, Calendar, Filter, Search, TrendingUp, TrendingDown, Equal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const Extratos = () => {
  const [filters, setFilters] = useState({
    period: "30days",
    type: "all",
    search: ""
  });

  const mockTransactions = [
    { id: 1, type: "entrada", value: 25000, description: "Pagamento Cliente Tech Corp", date: "2024-01-28", status: "concluida", category: "Recebimento" },
    { id: 2, type: "saida", value: 5500, description: "Fornecedor Software Ltda", date: "2024-01-27", status: "concluida", category: "Pagamento" },
    { id: 3, type: "entrada", value: 18900, description: "Vendas E-commerce", date: "2024-01-26", status: "concluida", category: "Recebimento" },
    { id: 4, type: "saida", value: 2200, description: "Taxa de Serviço Bancário", date: "2024-01-25", status: "concluida", category: "Taxa" },
    { id: 5, type: "entrada", value: 12000, description: "Consultoria Prestada", date: "2024-01-24", status: "pendente", category: "Recebimento" },
    { id: 6, type: "saida", value: 8500, description: "Pagamento Salários", date: "2024-01-23", status: "concluida", category: "Folha" },
    { id: 7, type: "entrada", value: 35000, description: "Contrato Anual Cliente ABC", date: "2024-01-22", status: "concluida", category: "Recebimento" },
    { id: 8, type: "saida", value: 1500, description: "Manutenção Equipamentos", date: "2024-01-21", status: "concluida", category: "Operacional" }
  ];

  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchType = filters.type === "all" || transaction.type === filters.type;
    const matchSearch = transaction.description.toLowerCase().includes(filters.search.toLowerCase());
    return matchType && matchSearch;
  });

  const totalIncome = filteredTransactions
    .filter(t => t.type === "entrada")
    .reduce((sum, t) => sum + t.value, 0);

  const totalExpenses = filteredTransactions
    .filter(t => t.type === "saida")
    .reduce((sum, t) => sum + t.value, 0);

  const periodBalance = totalIncome - totalExpenses;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Extratos e Movimentações</h1>
          <p className="text-muted-foreground">Visualize e filtre todas as suas transações</p>
        </div>
        <Button>
          <Calendar className="h-4 w-4 mr-2" />
          Exportar PDF
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Entradas</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              R$ {totalIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Saídas</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              R$ {totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo do Período</CardTitle>
            <Equal className={`h-4 w-4 ${periodBalance >= 0 ? 'text-green-500' : 'text-red-500'}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${periodBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              R$ {periodBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Período</label>
              <Select value={filters.period} onValueChange={(value) => setFilters(prev => ({ ...prev, period: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Últimos 7 dias</SelectItem>
                  <SelectItem value="30days">Últimos 30 dias</SelectItem>
                  <SelectItem value="90days">Últimos 90 dias</SelectItem>
                  <SelectItem value="1year">Último ano</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Tipo</label>
              <Select value={filters.type} onValueChange={(value) => setFilters(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="entrada">Recebimentos</SelectItem>
                  <SelectItem value="saida">Retiradas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Buscar</label>
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  placeholder="Digite para buscar..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions List */}
      <Card>
        <CardHeader>
          <CardTitle>Transações ({filteredTransactions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${
                    transaction.type === 'entrada' 
                      ? 'bg-green-100 text-green-600 dark:bg-green-900/20' 
                      : 'bg-red-100 text-red-600 dark:bg-red-900/20'
                  }`}>
                    {transaction.type === 'entrada' ? (
                      <ArrowDownLeft className="h-5 w-5" />
                    ) : (
                      <ArrowUpRight className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <p className="text-sm text-muted-foreground">{transaction.date}</p>
                      <Badge variant="outline" className="text-xs">
                        {transaction.category}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-semibold ${
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Extratos;