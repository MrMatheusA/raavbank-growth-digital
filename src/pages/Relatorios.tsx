import { useState } from "react";
import { TrendingUp, TrendingDown, BarChart3, PieChart, Download, Calendar, DollarSign, Activity, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

const Relatorios = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("current-month");

  const reportData = {
    summary: {
      totalTransactions: 156,
      totalVolume: 489750.30,
      totalIncome: 312400.80,
      totalExpenses: 177349.50,
      monthlyGrowth: 12.5,
      averageTicket: 3140.71
    },
    incomeCategories: [
      { name: "Recebimentos de Clientes", value: 185600.40, percentage: 59.4, color: "green" },
      { name: "Vendas E-commerce", value: 89450.20, percentage: 28.6, color: "blue" },
      { name: "Consultoria/Serviços", value: 37350.20, percentage: 12.0, color: "purple" }
    ],
    expenseCategories: [
      { name: "Folha de Pagamento", value: 98400.30, percentage: 55.5, color: "red" },
      { name: "Fornecedores", value: 45920.10, percentage: 25.9, color: "orange" },
      { name: "Taxas Bancárias", value: 18150.60, percentage: 10.2, color: "gray" },
      { name: "Operacionais", value: 14878.50, percentage: 8.4, color: "yellow" }
    ],
    monthlyTrends: [
      { month: "Out/23", income: 245600, expenses: 189400 },
      { month: "Nov/23", income: 278900, expenses: 201300 },
      { month: "Dez/23", income: 298500, expenses: 215600 },
      { month: "Jan/24", income: 312400, expenses: 177350 }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Relatórios Financeiros</h1>
          <p className="text-muted-foreground">Análise completa das suas transações e performance</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current-month">Mês Atual</SelectItem>
              <SelectItem value="previous-month">Mês Anterior</SelectItem>
              <SelectItem value="last-quarter">Último Trimestre</SelectItem>
              <SelectItem value="last-year">Último Ano</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Exportar Relatório
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Volume Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {reportData.summary.totalVolume.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+{reportData.summary.monthlyGrowth}%</span> vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transações</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportData.summary.totalTransactions}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-blue-600">+8%</span> vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {reportData.summary.averageTicket.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-purple-600">+15%</span> eficiência
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lucro Líquido</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              R$ {(reportData.summary.totalIncome - reportData.summary.totalExpenses).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+22%</span> crescimento
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Income by Category */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Receitas por Categoria
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {reportData.incomeCategories.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{category.name}</span>
                  <span className="text-sm text-muted-foreground">{category.percentage}%</span>
                </div>
                <Progress value={category.percentage} className="h-2" />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    R$ {category.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Expenses by Category */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-red-500" />
              Gastos por Categoria
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {reportData.expenseCategories.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{category.name}</span>
                  <span className="text-sm text-muted-foreground">{category.percentage}%</span>
                </div>
                <Progress value={category.percentage} className="h-2" />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    R$ {category.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Tendência dos Últimos 4 Meses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reportData.monthlyTrends.map((period, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{period.month}</h4>
                    <p className="text-sm text-muted-foreground">
                      Lucro: R$ {(period.income - period.expenses).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-sm text-green-600 font-medium">
                    +R$ {period.income.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-sm text-red-600 font-medium">
                    -R$ {period.expenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Relatorios;