import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Shield, Users, TrendingUp, Zap, CheckCircle, Award } from "lucide-react";

const Sobre = () => {
  return (
    <div className="min-h-screen bg-gradient-animated animate-floating-bg">
      <Header />
      
      {/* Background decorativo */}
      <div className="absolute inset-0 opacity-20 bg-gradient-particles animate-particles pointer-events-none"></div>
      
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground animate-slide-up">
              Sobre a <span className="text-primary">RaavBank</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Sua confiança, nossa prioridade. Somos uma fintech especializada em soluções financeiras corporativas para empresas e produtores, oferecendo segurança, inovação e atendimento personalizado.
            </p>
          </div>
        </section>

        {/* Missão, Visão e Valores */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-8 text-center hover:shadow-hero transition-all duration-500 hover:-translate-y-2 group bg-gradient-to-br from-card to-secondary/30 border-0 shadow-lg">
                <div className="h-16 w-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center mx-auto mb-6 group-hover:animate-float">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">Missão</h3>
                <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors">
                  Simplificar a gestão financeira empresarial através de tecnologia segura e soluções inovadoras para empresas e produtores.
                </p>
              </Card>

              <Card className="p-8 text-center hover:shadow-hero transition-all duration-500 hover:-translate-y-2 group bg-gradient-to-br from-card to-secondary/30 border-0 shadow-lg" style={{ animationDelay: '0.1s' }}>
                <div className="h-16 w-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center mx-auto mb-6 group-hover:animate-float">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">Visão</h3>
                <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors">
                  Ser a principal referência em soluções financeiras corporativas, conectando empresas ao futuro dos pagamentos digitais.
                </p>
              </Card>

              <Card className="p-8 text-center hover:shadow-hero transition-all duration-500 hover:-translate-y-2 group bg-gradient-to-br from-card to-secondary/30 border-0 shadow-lg" style={{ animationDelay: '0.2s' }}>
                <div className="h-16 w-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center mx-auto mb-6 group-hover:animate-float">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">Valores</h3>
                <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors">
                  Segurança, transparência, inovação e excelência no atendimento são os pilares que guiam todas as nossas operações.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Diferenciais */}
        <section className="py-16 px-6 bg-secondary/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-slide-up">Nossos Diferenciais</h2>
              <p className="text-xl text-muted-foreground animate-slide-up" style={{ animationDelay: '0.1s' }}>
                O que nos torna únicos no mercado financeiro corporativo
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Shield,
                  title: "Segurança Avançada",
                  description: "Criptografia de ponta e proteção contra fraudes para sua empresa"
                },
                {
                  icon: Zap,
                  title: "Pagamentos Instantâneos",
                  description: "PIX, TED e transferências em tempo real para sua operação"
                },
                {
                  icon: Users,
                  title: "Atendimento Empresarial",
                  description: "Gerente dedicado especializado em soluções para empresas e produtores"
                },
                {
                  icon: CheckCircle,
                  title: "Compliance Total",
                  description: "Conformidade com regulamentações do Banco Central"
                }
              ].map((item, index) => (
                <Card key={index} className="p-6 text-center hover:shadow-hero transition-all duration-500 hover:-translate-y-2 group bg-gradient-to-br from-card to-secondary/50 border-0 shadow-lg" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="h-12 w-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:animate-float">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-muted-foreground text-sm group-hover:text-foreground/80 transition-colors">
                    {item.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Segurança e Conformidade */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold animate-slide-up">Segurança e Conformidade</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4 text-left">
                <h3 className="text-xl font-semibold text-primary">Segurança Técnica</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Criptografia end-to-end em todas as transações</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Controle de acesso por MAC Address</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Proteção avançada contra fraudes</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Monitoramento 24/7 de todas as operações</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4 text-left">
                <h3 className="text-xl font-semibold text-primary">Conformidade Regulatória</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Conformidade com Banco Central</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Operação via BaaS regulamentado</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Transparência total nas taxas</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Alta disponibilidade garantida</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Sobre;