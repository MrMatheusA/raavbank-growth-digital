import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Eye, EyeOff, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import raavbankLogo from "@/assets/raavbank-logo-official.png";

const Registro = () => {
  const [formData, setFormData] = useState({
    nomeResponsavel: "",
    cnpj: "",
    dataNascimento: "",
    telefone: "",
    email: "",
    cpfResponsavel: "",
    senha: "",
    confirmarSenha: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  const formatTelefone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  const handleInputChange = (field: string, value: string) => {
    let formattedValue = value;
    
    if (field === 'cnpj') formattedValue = formatCNPJ(value);
    if (field === 'cpfResponsavel') formattedValue = formatCPF(value);
    if (field === 'telefone') formattedValue = formatTelefone(value);
    
    setFormData(prev => ({ ...prev, [field]: formattedValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.senha !== formData.confirmarSenha) {
      toast({
        title: "Erro no cadastro",
        description: "As senhas não coincidem.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulação de cadastro
    setTimeout(() => {
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Sua conta foi criada. Redirecionando para o login...",
      });
      navigate("/login");
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-animated animate-floating-bg py-12 px-6 relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0 opacity-20 bg-gradient-particles animate-particles"></div>
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-primary/8 rounded-full blur-lg animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-primary/6 rounded-full blur-md animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        <Card className="p-8 shadow-hero bg-gradient-to-br from-card to-secondary/30 border-0 animate-fade-in">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <img 
                src={raavbankLogo} 
                alt="RaavBank" 
                className="h-12 w-auto animate-float" 
              />
            </div>
            <h1 className="text-2xl font-bold mb-2">Cadastro Empresarial</h1>
            <p className="text-muted-foreground">Registre sua empresa no RaavBank</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nomeResponsavel" className="font-medium">Nome do Responsável</Label>
                <Input
                  id="nomeResponsavel"
                  type="text"
                  placeholder="Nome completo"
                  value={formData.nomeResponsavel}
                  onChange={(e) => handleInputChange('nomeResponsavel', e.target.value)}
                  className="h-12 border-border/50 focus:border-primary transition-all duration-300"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cnpj" className="font-medium">CNPJ da Empresa</Label>
                <Input
                  id="cnpj"
                  type="text"
                  placeholder="00.000.000/0000-00"
                  value={formData.cnpj}
                  onChange={(e) => handleInputChange('cnpj', e.target.value)}
                  maxLength={18}
                  className="h-12 border-border/50 focus:border-primary transition-all duration-300"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dataNascimento" className="font-medium">Data de Nascimento</Label>
                <Input
                  id="dataNascimento"
                  type="date"
                  value={formData.dataNascimento}
                  onChange={(e) => handleInputChange('dataNascimento', e.target.value)}
                  className="h-12 border-border/50 focus:border-primary transition-all duration-300"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefone" className="font-medium">Telefone</Label>
                <Input
                  id="telefone"
                  type="text"
                  placeholder="(00) 00000-0000"
                  value={formData.telefone}
                  onChange={(e) => handleInputChange('telefone', e.target.value)}
                  maxLength={15}
                  className="h-12 border-border/50 focus:border-primary transition-all duration-300"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="font-medium">Email Corporativo</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="contato@empresa.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="h-12 border-border/50 focus:border-primary transition-all duration-300"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cpfResponsavel" className="font-medium">CPF do Responsável</Label>
                <Input
                  id="cpfResponsavel"
                  type="text"
                  placeholder="000.000.000-00"
                  value={formData.cpfResponsavel}
                  onChange={(e) => handleInputChange('cpfResponsavel', e.target.value)}
                  maxLength={14}
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
                    placeholder="Mínimo 8 caracteres"
                    value={formData.senha}
                    onChange={(e) => handleInputChange('senha', e.target.value)}
                    className="h-12 pr-12 border-border/50 focus:border-primary transition-all duration-300"
                    minLength={8}
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

              <div className="space-y-2">
                <Label htmlFor="confirmarSenha" className="font-medium">Confirmar Senha</Label>
                <div className="relative">
                  <Input
                    id="confirmarSenha"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirme sua senha"
                    value={formData.confirmarSenha}
                    onChange={(e) => handleInputChange('confirmarSenha', e.target.value)}
                    className="h-12 pr-12 border-border/50 focus:border-primary transition-all duration-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
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
                  <span>Criando conta...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Criar Conta Empresarial</span>
                </div>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Já possui conta?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-primary hover:underline font-medium transition-colors"
              >
                Faça login
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
            <span>Todos os dados são criptografados e protegidos</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro;