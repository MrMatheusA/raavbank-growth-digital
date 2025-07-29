import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Mail, 
  Phone, 
  MessageCircle, 
  Shield, 
  Clock, 
  MapPin,
  Send
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";

const Contato = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    assunto: "",
    mensagem: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Mensagem enviada!",
      description: "Retornaremos em até 24 horas.",
    });
    setFormData({ nome: "", email: "", telefone: "", assunto: "", mensagem: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-animated animate-floating-bg relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-gradient-particles animate-particles"></div>
      <Header />
      
      <main className="relative z-10 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent mb-4 animate-fade-in">
              Entre em Contato
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-up">
              Estamos aqui para ajudar você com todas as suas necessidades bancárias corporativas
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Informações de Contato */}
            <div className="space-y-8">
              <Card className="p-8 bg-gradient-to-br from-card to-secondary/30 border-0 shadow-hero">
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <Shield className="h-6 w-6 mr-3 text-primary" />
                  Canais de Atendimento
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                    <div className="h-12 w-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">E-mail Corporativo</h3>
                      <p className="text-muted-foreground">contato@raav.site</p>
                      <span className="text-sm text-primary">Resposta em até 4 horas úteis</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                    <div className="h-12 w-12 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-lg flex items-center justify-center">
                      <Phone className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Central de Atendimento</h3>
                      <p className="text-muted-foreground">(11) 4002-8922</p>
                      <span className="text-sm text-green-500">Segunda a Sexta, 8h às 18h</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                    <div className="h-12 w-12 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-lg flex items-center justify-center">
                      <MessageCircle className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Chat Online</h3>
                      <p className="text-muted-foreground">Disponível no seu dashboard</p>
                      <span className="text-sm text-blue-500">24/7 para clientes logados</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Segurança */}
              <Card className="p-8 bg-gradient-to-br from-card to-secondary/30 border-0 shadow-hero">
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <Shield className="h-6 w-6 mr-3 text-primary" />
                  Compromisso com a Segurança
                </h2>
                
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="font-semibold text-primary">Criptografia Avançada</h3>
                    <p className="text-sm text-muted-foreground">
                      Proteção com criptografia de ponta e conformidade com regulamentações do Banco Central
                    </p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="font-semibold text-green-500">Controle de Acesso</h3>
                    <p className="text-sm text-muted-foreground">
                      Controle rigoroso por MAC Address e autorização de dispositivos
                    </p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-semibold text-blue-500">Performance Garantida</h3>
                    <p className="text-sm text-muted-foreground">
                      Tempos de resposta otimizados e alta disponibilidade 24/7
                    </p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h3 className="font-semibold text-purple-500">Escalabilidade</h3>
                    <p className="text-sm text-muted-foreground">
                      Infraestrutura preparada para o crescimento do seu negócio
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Formulário de Contato */}
            <Card className="p-8 bg-gradient-to-br from-card to-secondary/30 border-0 shadow-hero">
              <h2 className="text-2xl font-semibold mb-6">Envie sua Mensagem</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome Completo</Label>
                    <Input
                      id="nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      placeholder="Seu nome completo"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      id="telefone"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      placeholder="(11) 99999-9999"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="assunto">Assunto</Label>
                  <Input
                    id="assunto"
                    name="assunto"
                    value={formData.assunto}
                    onChange={handleChange}
                    placeholder="Como podemos ajudar?"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mensagem">Mensagem</Label>
                  <Textarea
                    id="mensagem"
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleChange}
                    placeholder="Descreva sua solicitação em detalhes..."
                    rows={6}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-cta hover:shadow-glow hover:scale-105 transition-all duration-300"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Mensagem
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contato;