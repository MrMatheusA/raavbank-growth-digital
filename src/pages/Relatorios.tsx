import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Download,
  FileText,
  DollarSign,
  Target,
  Users
} from "lucide-react";
import Header from "@/components/Header";

const Relatorios = () => {
  const [periodoSelecionado, setPeriodoSelecionado] = useState("mes-atual");

  const dadosRelatorio = {
    resumoMensal: {
      transacoesTotal: 156,
      volumeTotal: 489750.30,
      recebimentosTotal: 312400.80,
      pagamentosTotal: 177349.50,
      crescimentoMensal: 12.5,
      ticketMedio: 3140.71
    },
    categorias: [
      { nome: "Recebimentos de Clientes", valor: 185600.40, porcentagem: 59.4, cor: "green" },
      { nome: "Vendas E-commerce", valor: 89450.20, porcentagem: 28.6, cor: "blue" },
      { nome: "Consultoria/Serviços", valor: 37350.20, porcentagem: 12.0, cor: "purple" }
    ],
    gastos: [
      { nome: "Folha de Pagamento", valor: 98400.30, porcentagem: 55.5, cor: "red" },
      { nome: "Fornecedores", valor: 45920.10, porcentagem: 25.9, cor: "orange" },
      { nome: "Taxas Bancárias", valor: 18150.60, porcentagem: 10.2, cor: "gray" },
      { nome: "Operacionais", valor: 14878.50, porcentagem: 8.4, cor: "yellow" }
    ],
    tendencias: [
      { mes: "Out/23", receitas: 245600, gastos: 189400 },
      { mes: "Nov/23", receitas: 278900, gastos: 201300 },
      { mes: "Dez/23", receitas: 298500, gastos: 215600 },
      { mes: "Jan/24", receitas: 312400, gastos: 177350 }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-animated animate-floating-bg relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-gradient-particles animate-particles"></div>
      <Header />
      
      <main className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
                Relatórios Financeiros
              </h1>
              <p className="text-muted-foreground">Análise completa das suas transações e performance</p>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={periodoSelecionado} onValueChange={setPeriodoSelecionado}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mes-atual">Mês Atual</SelectItem>
                  <SelectItem value="mes-anterior">Mês Anterior</SelectItem>
                  <SelectItem value="ultimo-trimestre">Último Trimestre</SelectItem>
                  <SelectItem value="ultimo-ano">Último Ano</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-gradient-cta hover:shadow-glow hover:scale-105 transition-all duration-300">
                <Download className="h-4 w-4 mr-2" />
                Exportar Relatório
              </Button>
            </div>
          </div>

          {/* Métricas Principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 bg-gradient-to-br from-card to-secondary/30 border-0 shadow-lg hover:shadow-hero transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Volume Total</p>
                  <p className="text-2xl font-bold">
                    R$ {dadosRelatorio.resumoMensal.volumeTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                  <div className="flex items-center space-x-1 mt-1">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span className="text-xs text-green-500">+{dadosRelatorio.resumoMensal.crescimentoMensal}%</span>
                  </div>
                </div>
                <div className="h-12 w-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-card to-secondary/30 border-0 shadow-lg hover:shadow-hero transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Transações</p>
                  <p className="text-2xl font-bold">{dadosRelatorio.resumoMensal.transacoesTotal}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <BarChart3 className="h-3 w-3 text-blue-500" />
                    <span className="text-xs text-blue-500">+8% vs mês anterior</span>
                  </div>
                </div>
                <div className="h-12 w-12 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-card to-secondary/30 border-0 shadow-lg hover:shadow-hero transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Ticket Médio</p>
                  <p className="text-2xl font-bold">
                    R$ {dadosRelatorio.resumoMensal.ticketMedio.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Target className="h-3 w-3 text-purple-500" />
                    <span className="text-xs text-purple-500">+15% eficiência</span>
                  </div>
                </div>
                <div className="h-12 w-12 bg-gradient-to-br from-purple-500/20 to-purple-500/10 rounded-lg flex items-center justify-center">
                  <Target className="h-6 w-6 text-purple-500" />
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-card to-secondary/30 border-0 shadow-lg hover:shadow-hero transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Lucro Líquido</p>
                  <p className="text-2xl font-bold text-green-600">
                    R$ {(dadosRelatorio.resumoMensal.recebimentosTotal - dadosRelatorio.resumoMensal.pagamentosTotal).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                  <div className="flex items-center space-x-1 mt-1">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span className="text-xs text-green-500">+22% crescimento</span>
                  </div>
                </div>
                <div className="h-12 w-12 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Receitas por Categoria */}
            <Card className="p-6 bg-gradient-to-br from-card to-secondary/30 border-0 shadow-lg">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
                Receitas por Categoria
              </h3>
              <div className="space-y-4">
                {dadosRelatorio.categorias.map((categoria, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{categoria.nome}</span>
                      <span className="text-sm text-muted-foreground">{categoria.porcentagem}%</span>
                    </div>
                    <div className="w-full bg-secondary/30 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-gradient-to-r from-${categoria.cor}-500 to-${categoria.cor}-400`}
                        style={{ width: `${categoria.porcentagem}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        R$ {categoria.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Gastos por Categoria */}
            <Card className="p-6 bg-gradient-to-br from-card to-secondary/30 border-0 shadow-lg">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <TrendingDown className="h-5 w-5 mr-2 text-red-500" />
                Gastos por Categoria
              </h3>
              <div className="space-y-4">
                {dadosRelatorio.gastos.map((gasto, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{gasto.nome}</span>
                      <span className="text-sm text-muted-foreground">{gasto.porcentagem}%</span>
                    </div>
                    <div className="w-full bg-secondary/30 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-gradient-to-r from-${gasto.cor}-500 to-${gasto.cor}-400`}
                        style={{ width: `${gasto.porcentagem}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        R$ {gasto.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Tendência Mensal */}
          <Card className="p-6 bg-gradient-to-br from-card to-secondary/30 border-0 shadow-lg">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-primary" />
              Tendência dos Últimos 4 Meses
            </h3>
            <div className="space-y-4">
              {dadosRelatorio.tendencias.map((periodo, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{periodo.mes}</h4>
                      <p className="text-sm text-muted-foreground">
                        Lucro: R$ {(periodo.receitas - periodo.gastos).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-sm text-green-600 font-medium">
                      +R$ {periodo.receitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-sm text-red-600 font-medium">
                      -R$ {periodo.gastos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
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

export default Relatorios;