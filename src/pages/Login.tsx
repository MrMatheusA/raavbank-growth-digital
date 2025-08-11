import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import raavbankLogo from "@/assets/raavbank-logo-transparent.png";

const Login = () => {
  const [documento, setDocumento] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulação de autenticação
    setTimeout(() => {
      if (documento && senha) {
        toast({
          title: "Login realizado com sucesso!",
          description: "Redirecionando para o dashboard...",
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Erro no login",
          description: "Verifique seus dados e tente novamente.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1500);
  };

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
            <h1 className="text-2xl font-bold mb-2 text-gray-900">Acesso RaavBank</h1>
            <p className="text-gray-600">Entre com seu CPF ou CNPJ</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="documento" className="font-medium text-gray-700">CPF ou CNPJ</Label>
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
              <Label htmlFor="senha" className="font-medium text-gray-700">Senha</Label>
              <div className="relative">
                <Input
                  id="senha"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="h-12 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Entrando...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Entrar no Sistema</span>
                </div>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <p className="text-gray-600">
              <button
                onClick={() => navigate("/recuperar-senha")}
                className="text-blue-600 hover:underline text-sm"
              >
                Esqueceu a senha?
              </button>
            </p>
            <p className="text-gray-600">
              Não possui conta?{" "}
              <button
                onClick={() => navigate("/registro")}
                className="text-blue-600 hover:underline font-medium"
              >
                Cadastre-se aqui
              </button>
            </p>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/")}
              className="text-gray-500 hover:text-blue-600 text-sm"
            >
              ← Voltar ao início
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

export default Login;