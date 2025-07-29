import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Calendar, 
  Filter, 
  Download,
  Search
} from "lucide-react";
import Header from "@/components/Header";

const Extratos = () => {
  const [filtros, setFiltros] = useState({
    periodo: "30dias",
    tipo: "todos",
    busca: ""
  });

  const mockTransacoes = [
    { id: 1, tipo: "entrada", valor: 25000, descricao: "Pagamento Cliente Tech Corp", data: "2024-01-28", status: "concluida", categoria: "Recebimento" },
    { id: 2, tipo: "saida", valor: 5500, descricao: "Fornecedor Software Ltda", data: "2024-01-27", status: "concluida", categoria: "Pagamento" },
    { id: 3, tipo: "entrada", valor: 18900, descricao: "Vendas E-commerce", data: "2024-01-26", status: "concluida", categoria: "Recebimento" },
    { id: 4, tipo: "saida", valor: 2200, descricao: "Taxa de Serviço Bancário", data: "2024-01-25", status: "concluida", categoria: "Taxa" },
    { id: 5, tipo: "entrada", valor: 12000, descricao: "Consultoria Prestada", data: "2024-01-24", status: "pendente", categoria: "Recebimento" },
    { id: 6, tipo: "saida", valor: 8500, descricao: "Pagamento Salários", data: "2024-01-23", status: "concluida", categoria: "Folha" },
    { id: 7, tipo: "entrada", valor: 35000, descricao: "Contrato Anual Cliente ABC", data: "2024-01-22", status: "concluida", categoria: "Recebimento" },
    { id: 8, tipo: "saida", valor: 1500, descricao: "Manutenção Equipamentos", data: "2024-01-21", status: "concluida", categoria: "Operacional" }
  ];

  const transacoesFiltradas = mockTransacoes.filter(transacao => {
    const matchTipo = filtros.tipo === "todos" || transacao.tipo === filtros.tipo;
    const matchBusca = transacao.descricao.toLowerCase().includes(filtros.busca.toLowerCase());
    return matchTipo && matchBusca;
  });

  const totalEntradas = transacoesFiltradas
    .filter(t => t.tipo === "entrada")
    .reduce((sum, t) => sum + t.valor, 0);

  const totalSaidas = transacoesFiltradas
    .filter(t => t.tipo === "saida")
    .reduce((sum, t) => sum + t.valor, 0);

  const saldoPeriodo = totalEntradas - totalSaidas;

  return (
    <div className="min-h-screen bg-gradient-animated animate-floating-bg relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-gradient-particles animate-particles"></div>
      <Header />
      
      <main className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
                Extratos e Movimentações
              </h1>
              <p className="text-muted-foreground">Visualize e filtre todas as suas transações</p>
            </div>
            <Button className="bg-gradient-cta hover:shadow-glow hover:scale-105 transition-all duration-300">
              <Download className="h-4 w-4 mr-2" />
              Exportar PDF
            </Button>
          </div>

          {/* Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 bg-gradient-to-br from-card to-secondary/30 border-0 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Total Entradas</p>
                  <p className="text-2xl font-bold text-green-600">
                    R$ {totalEntradas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="h-12 w-12 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-lg flex items-center justify-center">
                  <ArrowDownLeft className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-card to-secondary/30 border-0 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Total Saídas</p>
                  <p className="text-2xl font-bold text-red-600">
                    R$ {totalSaidas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="h-12 w-12 bg-gradient-to-br from-red-500/20 to-red-500/10 rounded-lg flex items-center justify-center">
                  <ArrowUpRight className="h-6 w-6 text-red-500" />
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-card to-secondary/30 border-0 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Saldo do Período</p>
                  <p className={`text-2xl font-bold ${saldoPeriodo >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    R$ {saldoPeriodo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div className={`h-12 w-12 bg-gradient-to-br ${saldoPeriodo >= 0 ? 'from-green-500/20 to-green-500/10' : 'from-red-500/20 to-red-500/10'} rounded-lg flex items-center justify-center`}>
                  <Calendar className={`h-6 w-6 ${saldoPeriodo >= 0 ? 'text-green-500' : 'text-red-500'}`} />
                </div>
              </div>
            </Card>
          </div>

          {/* Filtros */}
          <Card className="p-6 mb-8 bg-gradient-to-br from-card to-secondary/30 border-0 shadow-lg">
            <div className="flex items-center space-x-2 mb-4">
              <Filter className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Filtros</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Período</Label>
                <Select value={filtros.periodo} onValueChange={(value) => setFiltros(prev => ({ ...prev, periodo: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7dias">Últimos 7 dias</SelectItem>
                    <SelectItem value="30dias">Últimos 30 dias</SelectItem>
                    <SelectItem value="90dias">Últimos 90 dias</SelectItem>
                    <SelectItem value="1ano">Último ano</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Tipo de Transação</Label>
                <Select value={filtros.tipo} onValueChange={(value) => setFiltros(prev => ({ ...prev, tipo: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todas</SelectItem>
                    <SelectItem value="entrada">Entradas</SelectItem>
                    <SelectItem value="saida">Saídas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>Buscar por descrição</Label>
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                  <Input
                    placeholder="Digite para buscar..."
                    value={filtros.busca}
                    onChange={(e) => setFiltros(prev => ({ ...prev, busca: e.target.value }))}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Lista de Transações */}
          <Card className="p-6 bg-gradient-to-br from-card to-secondary/30 border-0 shadow-lg">
            <h2 className="text-xl font-semibold mb-6">Transações ({transacoesFiltradas.length})</h2>
            
            <div className="space-y-4">
              {transacoesFiltradas.map((transacao) => (
                <div key={transacao.id} className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                      transacao.tipo === 'entrada' 
                        ? 'bg-green-500/20 text-green-600' 
                        : 'bg-red-500/20 text-red-600'
                    }`}>
                      {transacao.tipo === 'entrada' ? (
                        <ArrowDownLeft className="h-6 w-6" />
                      ) : (
                        <ArrowUpRight className="h-6 w-6" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{transacao.descricao}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <p className="text-sm text-muted-foreground">{transacao.data}</p>
                        <Badge variant="outline" className="text-xs">
                          {transacao.categoria}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-semibold ${
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
      </main>
    </div>
  );
};

export default Extratos;