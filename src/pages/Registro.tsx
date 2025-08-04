import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Eye, EyeOff, CheckCircle, Building, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import raavbankLogo from "@/assets/raavbank-logo-transparent.png";

const Registro = () => {
  const [tipoConta, setTipoConta] = useState<'PF' | 'PJ'>('PF');
  const [formData, setFormData] = useState({
    // Dados PF
    nomeCompleto: "",
    cpf: "",
    dataNascimento: "",
    telefone: "",
    email: "",
    // Dados PJ
    nomeEmpresa: "",
    nomeResponsavel: "",
    cnpj: "",
    cpfResponsavel: "",
    emailCorporativo: "",
    // Comum
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
    if (field === 'cpf' || field === 'cpfResponsavel') formattedValue = formatCPF(value);
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
        title: `Cadastro ${tipoConta} realizado com sucesso!`,
        description: "Sua conta foi criada. Redirecionando para o login...",
      });
      navigate("/login");
      setIsLoading(false);
    }, 2000);
  };

  const resetForm = () => {
    setFormData({
      nomeCompleto: "",
      cpf: "",
      dataNascimento: "",
      telefone: "",
      email: "",
      nomeEmpresa: "",
      nomeResponsavel: "",
      cnpj: "",
      cpfResponsavel: "",
      emailCorporativo: "",
      senha: "",
      confirmarSenha: ""
    });
  };

  const handleTipoContaChange = (tipo: 'PF' | 'PJ') => {
    setTipoConta(tipo);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <Card className="p-8 shadow-lg bg-white">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <img 
                src={raavbankLogo} 
                alt="RaavBank" 
                className="h-12 w-auto" 
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Cadastro RaavBank</h1>
            <p className="text-gray-600">Crie sua conta e faça parte da revolução financeira</p>
          </div>

          {/* Toggle PF/PJ */}
          <div className="flex mb-8">
            <Button
              type="button"
              variant={tipoConta === 'PF' ? 'default' : 'outline'}
              className={`flex-1 h-12 rounded-r-none ${tipoConta === 'PF' ? 'bg-green-600 hover:bg-green-700' : ''}`}
              onClick={() => handleTipoContaChange('PF')}
            >
              <User className="h-4 w-4 mr-2" />
              Pessoa Física
            </Button>
            <Button
              type="button"
              variant={tipoConta === 'PJ' ? 'default' : 'outline'}
              className={`flex-1 h-12 rounded-l-none ${tipoConta === 'PJ' ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
              onClick={() => handleTipoContaChange('PJ')}
            >
              <Building className="h-4 w-4 mr-2" />
              Pessoa Jurídica
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {tipoConta === 'PF' ? (
              // Formulário Pessoa Física
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="nomeCompleto" className="font-medium text-gray-700">Nome Completo</Label>
                  <Input
                    id="nomeCompleto"
                    type="text"
                    placeholder="Seu nome completo"
                    value={formData.nomeCompleto}
                    onChange={(e) => handleInputChange('nomeCompleto', e.target.value)}
                    className="h-12"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="cpf" className="font-medium text-gray-700">CPF</Label>
                    <Input
                      id="cpf"
                      type="text"
                      placeholder="000.000.000-00"
                      value={formData.cpf}
                      onChange={(e) => handleInputChange('cpf', e.target.value)}
                      maxLength={14}
                      className="h-12"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dataNascimento" className="font-medium text-gray-700">Data de Nascimento</Label>
                    <Input
                      id="dataNascimento"
                      type="date"
                      value={formData.dataNascimento}
                      onChange={(e) => handleInputChange('dataNascimento', e.target.value)}
                      className="h-12"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="telefone" className="font-medium text-gray-700">Telefone</Label>
                    <Input
                      id="telefone"
                      type="text"
                      placeholder="(00) 00000-0000"
                      value={formData.telefone}
                      onChange={(e) => handleInputChange('telefone', e.target.value)}
                      maxLength={15}
                      className="h-12"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-medium text-gray-700">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="h-12"
                      required
                    />
                  </div>
                </div>
              </div>
            ) : (
              // Formulário Pessoa Jurídica
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="nomeEmpresa" className="font-medium text-gray-700">Nome da Empresa</Label>
                  <Input
                    id="nomeEmpresa"
                    type="text"
                    placeholder="Razão social da empresa"
                    value={formData.nomeEmpresa}
                    onChange={(e) => handleInputChange('nomeEmpresa', e.target.value)}
                    className="h-12"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="cnpj" className="font-medium text-gray-700">CNPJ</Label>
                    <Input
                      id="cnpj"
                      type="text"
                      placeholder="00.000.000/0000-00"
                      value={formData.cnpj}
                      onChange={(e) => handleInputChange('cnpj', e.target.value)}
                      maxLength={18}
                      className="h-12"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nomeResponsavel" className="font-medium text-gray-700">Nome do Responsável</Label>
                    <Input
                      id="nomeResponsavel"
                      type="text"
                      placeholder="Nome completo"
                      value={formData.nomeResponsavel}
                      onChange={(e) => handleInputChange('nomeResponsavel', e.target.value)}
                      className="h-12"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="cpfResponsavel" className="font-medium text-gray-700">CPF do Responsável</Label>
                    <Input
                      id="cpfResponsavel"
                      type="text"
                      placeholder="000.000.000-00"
                      value={formData.cpfResponsavel}
                      onChange={(e) => handleInputChange('cpfResponsavel', e.target.value)}
                      maxLength={14}
                      className="h-12"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telefone" className="font-medium text-gray-700">Telefone</Label>
                    <Input
                      id="telefone"
                      type="text"
                      placeholder="(00) 00000-0000"
                      value={formData.telefone}
                      onChange={(e) => handleInputChange('telefone', e.target.value)}
                      maxLength={15}
                      className="h-12"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emailCorporativo" className="font-medium text-gray-700">Email Corporativo</Label>
                  <Input
                    id="emailCorporativo"
                    type="email"
                    placeholder="contato@empresa.com"
                    value={formData.emailCorporativo}
                    onChange={(e) => handleInputChange('emailCorporativo', e.target.value)}
                    className="h-12"
                    required
                  />
                </div>
              </div>
            )}

            {/* Campos de Senha */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="senha" className="font-medium text-gray-700">Senha</Label>
                <div className="relative">
                  <Input
                    id="senha"
                    type={showPassword ? "text" : "password"}
                    placeholder="Mínimo 8 caracteres"
                    value={formData.senha}
                    onChange={(e) => handleInputChange('senha', e.target.value)}
                    className="h-12 pr-12"
                    minLength={8}
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

              <div className="space-y-2">
                <Label htmlFor="confirmarSenha" className="font-medium text-gray-700">Confirmar Senha</Label>
                <div className="relative">
                  <Input
                    id="confirmarSenha"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirme sua senha"
                    value={formData.confirmarSenha}
                    onChange={(e) => handleInputChange('confirmarSenha', e.target.value)}
                    className="h-12 pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className={`w-full h-12 text-white font-medium ${
                tipoConta === 'PF' 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
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
                  <span>Criar Conta {tipoConta}</span>
                </div>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Já possui conta?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-blue-600 hover:underline font-medium"
              >
                Faça login
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
            <span>Todos os dados são criptografados e protegidos</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro;