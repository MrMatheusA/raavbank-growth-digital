import { useState } from "react";
import { ArrowRightLeft, Banknote, Clock, CheckCircle, Copy, QrCode, User, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const Transferencias = () => {
  const [transferType, setTransferType] = useState<'pix' | 'raavbank'>('pix');
  const [transferForm, setTransferForm] = useState({
    pixKey: "",
    cpfCnpj: "",
    amount: "",
    description: ""
  });
  const [recentTransfers] = useState([
    { id: 1, recipient: "João Silva", pixKey: "joao@email.com", amount: 1500, date: "2024-01-28 14:30", status: "concluida" },
    { id: 2, recipient: "Tech Corp Ltda", pixKey: "12.345.678/0001-90", amount: 8900, date: "2024-01-27 09:15", status: "concluida" },
    { id: 3, recipient: "Maria Santos", pixKey: "(11) 99999-8888", amount: 750, date: "2024-01-26 16:45", status: "pendente" }
  ]);

  const { toast } = useToast();

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const value = parseFloat(transferForm.amount);
    const method = transferType === 'pix' ? 'PIX' : 'Transferência RaavBank';
    toast({
      title: `${method} realizada!`,
      description: `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} enviado com sucesso.`,
    });
    setTransferForm({ pixKey: "", cpfCnpj: "", amount: "", description: "" });
  };

  const copyPixKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast({
      title: "Chave PIX copiada!",
      description: "A chave foi copiada para a área de transferência.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Transferências PIX</h1>
          <p className="text-muted-foreground">Realize transferências instantâneas de forma segura</p>
        </div>
        <Button variant="outline">
          <QrCode className="h-4 w-4 mr-2" />
          Ler QR Code
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Formulário de Transferência */}
        <Card className="bg-gradient-to-br from-card to-secondary/30 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowRightLeft className="h-5 w-5 text-primary" />
              Nova Transferência
            </CardTitle>
            <CardDescription>
              Escolha o tipo de transferência e envie dinheiro de forma segura
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Seletor de Tipo de Transferência */}
            <div className="flex space-x-1 bg-muted p-1 rounded-lg mb-6">
              <button
                type="button"
                onClick={() => setTransferType('pix')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  transferType === 'pix'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <User className="h-4 w-4" />
                PIX
              </button>
              <button
                type="button"
                onClick={() => setTransferType('raavbank')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  transferType === 'raavbank'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Building className="h-4 w-4" />
                RaavBank
                <Badge variant="secondary" className="ml-1 text-xs">Novo!</Badge>
              </button>
            </div>

            <form onSubmit={handleTransfer} className="space-y-6">
              {transferType === 'pix' ? (
                <div className="space-y-2">
                  <Label htmlFor="pixKey">Chave PIX</Label>
                  <Input
                    id="pixKey"
                    value={transferForm.pixKey}
                    onChange={(e) => setTransferForm(prev => ({ ...prev, pixKey: e.target.value }))}
                    placeholder="E-mail, CPF/CNPJ, telefone ou chave aleatória"
                    required
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="cpfCnpj">CPF/CNPJ do Favorecido</Label>
                  <Input
                    id="cpfCnpj"
                    value={transferForm.cpfCnpj}
                    onChange={(e) => setTransferForm(prev => ({ ...prev, cpfCnpj: e.target.value }))}
                    placeholder="000.000.000-00 ou 00.000.000/0001-00"
                    required
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="amount">Valor da Transferência</Label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-muted-foreground">R$</span>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={transferForm.amount}
                    onChange={(e) => setTransferForm(prev => ({ ...prev, amount: e.target.value }))}
                    placeholder="0,00"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição (Opcional)</Label>
                <Input
                  id="description"
                  value={transferForm.description}
                  onChange={(e) => setTransferForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Motivo da transferência"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-cta hover:shadow-glow hover:scale-105 transition-all duration-300"
                disabled={
                  !transferForm.amount || 
                  (transferType === 'pix' ? !transferForm.pixKey : !transferForm.cpfCnpj)
                }
              >
                <Banknote className="h-4 w-4 mr-2" />
                {transferType === 'pix' ? 'Realizar PIX' : 'Transferir via RaavBank'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Transferências Recentes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Transferências Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransfers.map((transfer) => (
                <div key={transfer.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      {transfer.pixKey.includes('@') ? (
                        <User className="h-5 w-5 text-primary" />
                      ) : (
                        <Building className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{transfer.recipient}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <p className="text-sm text-muted-foreground">{transfer.date}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyPixKey(transfer.pixKey)}
                          className="h-auto p-0 text-xs hover:bg-transparent"
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          {transfer.pixKey}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-red-600">
                      - R$ {transfer.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <Badge variant={transfer.status === 'concluida' ? 'default' : 'secondary'} className="text-xs">
                      {transfer.status === 'concluida' ? (
                        <>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Concluída
                        </>
                      ) : (
                        <>
                          <Clock className="h-3 w-3 mr-1" />
                          Pendente
                        </>
                      )}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Informações sobre PIX */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <QrCode className="h-5 w-5" />
            Sobre o PIX
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <ArrowRightLeft className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Transferência Instantânea</h3>
              <p className="text-sm text-muted-foreground">
                Dinheiro disponível na conta do destinatário em segundos
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">24h por dia, 7 dias por semana</h3>
              <p className="text-sm text-muted-foreground">
                Funciona inclusive aos finais de semana e feriados
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Seguro e Gratuito</h3>
              <p className="text-sm text-muted-foreground">
                Sem taxas para pessoas físicas e com toda segurança do sistema bancário
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Transferencias;