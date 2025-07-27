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
  const [cnpj, setCnpj] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const formatCNPJ = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  };

  const handleCNPJChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCNPJ(e.target.value);
    setCnpj(formatted);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulação de autenticação
    setTimeout(() => {
      if (cnpj && senha) {
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
    <div className="min-h-screen bg-gradient-animated animate-floating-bg flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0 opacity-20 bg-gradient-particles animate-particles"></div>
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-primary/8 rounded-full blur-lg animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-primary/6 rounded-full blur-md animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <Card className="p-8 shadow-hero bg-gradient-to-br from-card to-secondary/30 border-0 animate-fade-in">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <img 
                src={raavbankLogo} 
                alt="RaavBank" 
                className="h-12 w-auto animate-float" 
              />
            </div>
            <h1 className="text-2xl font-bold mb-2">Acesso Empresarial</h1>
            <p className="text-muted-foreground">Entre com seus dados corporativos</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="cnpj" className="font-medium">CNPJ</Label>
              <Input
                id="cnpj"
                type="text"
                placeholder="00.000.000/0000-00"
                value={cnpj}
                onChange={handleCNPJChange}
                maxLength={18}
                className="h-12 border-border/50 focus:border-primary transition-all duration-300"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="senha" className="font-medium">Senha</Label>
              <div className="relative">
                <Input
                  id="senha"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="h-12 pr-12 border-border/50 focus:border-primary transition-all duration-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-cta hover:shadow-glow hover:scale-105 transition-all duration-300 font-medium"
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

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Não possui conta?{" "}
              <button
                onClick={() => navigate("/registro")}
                className="text-primary hover:underline font-medium transition-colors"
              >
                Cadastre sua empresa
              </button>
            </p>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/")}
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              ← Voltar ao início
            </button>
          </div>
        </Card>

        {/* Informações de segurança */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-2 text-muted-foreground text-sm">
            <Shield className="h-4 w-4 text-primary" />
            <span>Seus dados estão protegidos por criptografia avançada</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;