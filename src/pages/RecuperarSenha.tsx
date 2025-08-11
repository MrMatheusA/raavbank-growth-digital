import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Shield, ArrowLeft, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import raavbankLogo from "@/assets/raavbank-logo-transparent.png";

const RecuperarSenha = () => {
  const [documento, setDocumento] = useState("");
  const [motivo, setMotivo] = useState("");
  const [outroMotivo, setOutroMotivo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const formatCNPJ = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  };

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const handleDocumentoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    let formatted = value;
    
    if (value.length <= 11) {
      // CPF
      formatted = formatCPF(e.target.value);
    } else {
      // CNPJ
      formatted = formatCNPJ(e.target.value);
    }
    
    setDocumento(formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulação de envio do pedido
    setTimeout(() => {
      if (documento && motivo) {
        // Simular fetch para backend
        const requestData = {
          documento,
          motivo,
          outroMotivo: motivo === "outros" ? outroMotivo : "",
          timestamp: new Date().toISOString()
        };

        console.log("Pedido de recuperação enviado:", requestData);

        toast({
          title: "Pedido enviado com sucesso!",
          description: "Seu gerente de contas será notificado.",
        });
        
        setRequestSent(true);
      } else {
        toast({
          title: "Erro ao enviar pedido",
          description: "Verifique os dados informados e tente novamente.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  if (requestSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <Card className="p-8 shadow-lg bg-white text-center">
            <div className="flex justify-center mb-6">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold mb-4 text-gray-900">Pedido Enviado!</h1>
            <p className="text-gray-600 mb-6">
              Seu pedido de recuperação de senha foi enviado com sucesso. 
              O gerente de contas responsável pela sua conta será notificado 
              e entrará em contato em breve.
            </p>
            <div className="space-y-4">
              <Button
                onClick={() => navigate("/login")}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
              >
                Voltar ao Login
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="w-full h-12"
              >
                Ir para Página Inicial
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <Card className="p-8 shadow-lg bg-white">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <img 
                src={raavbankLogo} 
                alt="RaavBank" 
                className="h-12 w-auto animate-float" 
              />
            </div>
            <h1 className="text-2xl font-bold mb-2 text-gray-900">Recuperar Senha</h1>
            <p className="text-gray-600">Solicite a recuperação da sua conta</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="documento" className="font-medium text-gray-700">CPF ou CNPJ da Conta</Label>
              <Input
                id="documento"
                type="text"
                placeholder="000.000.000-00 ou 00.000.000/0000-00"
                value={documento}
                onChange={handleDocumentoChange}
                maxLength={18}
                className="h-12"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="motivo" className="font-medium text-gray-700">Motivo da Recuperação</Label>
              <Select value={motivo} onValueChange={setMotivo}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Selecione o motivo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="esqueci-senha">Esqueci a Senha</SelectItem>
                  <SelectItem value="sem-acesso">Não estou conseguindo ter acesso, mesmo com os dados corretos</SelectItem>
                  <SelectItem value="celular-perdido">Celular Perdido ou dispositivo formatado</SelectItem>
                  <SelectItem value="outros">Outros motivos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {motivo === "outros" && (
              <div className="space-y-2">
                <Label htmlFor="outroMotivo" className="font-medium text-gray-700">Descreva o motivo</Label>
                <Textarea
                  id="outroMotivo"
                  placeholder="Descreva detalhadamente o motivo da solicitação..."
                  value={outroMotivo}
                  onChange={(e) => setOutroMotivo(e.target.value)}
                  className="min-h-[80px]"
                  required
                />
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
              disabled={isLoading || !documento || !motivo || (motivo === "outros" && !outroMotivo)}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Enviando Pedido...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Enviar Pedido</span>
                </div>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/login")}
              className="text-gray-500 hover:text-blue-600 text-sm flex items-center justify-center space-x-1"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar ao Login</span>
            </button>
          </div>
        </Card>

        <div className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-2 text-gray-600 text-sm">
            <Shield className="h-4 w-4 text-blue-600" />
            <span>Seus dados estão protegidos por criptografia avançada</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecuperarSenha;