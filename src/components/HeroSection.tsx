import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Zap, TrendingUp, Users } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 bg-gradient-hero relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-primary/15 rounded-full blur-lg animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-primary/10 rounded-full blur-md animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <div className="text-center lg:text-left space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-slide-up">
              <span className="text-foreground bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">Raav</span>
              <span className="text-muted-foreground">Bank</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary font-semibold animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Sua confiança, nossa prioridade.
            </p>
            <p className="text-lg text-muted-foreground max-w-lg animate-slide-up" style={{ animationDelay: '0.4s' }}>
              Pagamentos seguros com RaavBank. Soluções financeiras corporativas para empresas com CNPJ.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <Button 
              variant="cta" 
              size="xl" 
              className="min-w-48 bg-gradient-cta hover:shadow-glow hover:scale-105 transition-all duration-500 animate-glow group"
            >
              <span className="group-hover:text-white transition-colors">Abrir Conta Grátis</span>
            </Button>
            <Button 
              variant="modern" 
              size="xl" 
              className="min-w-48 hover:shadow-card hover:scale-105 transition-all duration-300 border-2 hover:border-primary/30"
            >
              Saiba Mais
            </Button>
          </div>

          <div className="flex items-center justify-center lg:justify-start space-x-8 text-sm text-muted-foreground animate-slide-up" style={{ animationDelay: '0.8s' }}>
            <div className="flex items-center space-x-2 hover:text-primary transition-colors duration-300 cursor-pointer">
              <Shield className="h-4 w-4 text-primary animate-float" />
              <span>100% Seguro</span>
            </div>
            <div className="flex items-center space-x-2 hover:text-primary transition-colors duration-300 cursor-pointer">
              <Zap className="h-4 w-4 text-primary animate-float" style={{ animationDelay: '0.5s' }} />
              <span>Pagamentos Instantâneos</span>
            </div>
          </div>
        </div>

        {/* Right Content - Feature Cards para Empresas CNPJ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in" style={{ animationDelay: '1s' }}>
          <Card className="p-6 hover:shadow-hero transition-all duration-500 hover:-translate-y-2 hover:scale-105 group bg-gradient-to-br from-card to-secondary/50 border-0 shadow-lg hover:shadow-glow">
            <div className="space-y-4">
              <div className="h-12 w-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center group-hover:animate-float group-hover:bg-gradient-to-br group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                <Shield className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">Segurança Empresarial</h3>
              <p className="text-muted-foreground text-sm group-hover:text-foreground/80 transition-colors duration-300">
                Proteção bancária avançada para empresas com CNPJ. Sua gestão financeira empresarial em mãos seguras.
              </p>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-hero transition-all duration-500 hover:-translate-y-2 hover:scale-105 group bg-gradient-to-br from-card to-secondary/50 border-0 shadow-lg hover:shadow-glow" style={{ animationDelay: '0.1s' }}>
            <div className="space-y-4">
              <div className="h-12 w-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center group-hover:animate-float group-hover:bg-gradient-to-br group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                <TrendingUp className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">Gestão Financeira</h3>
              <p className="text-muted-foreground text-sm group-hover:text-foreground/80 transition-colors duration-300">
                Controle total das finanças da sua empresa. Relatórios detalhados e análises em tempo real.
              </p>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-hero transition-all duration-500 hover:-translate-y-2 hover:scale-105 group bg-gradient-to-br from-card to-secondary/50 border-0 shadow-lg hover:shadow-glow" style={{ animationDelay: '0.2s' }}>
            <div className="space-y-4">
              <div className="h-12 w-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center group-hover:animate-float group-hover:bg-gradient-to-br group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                <Zap className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">Pagamentos Corporativos</h3>
              <p className="text-muted-foreground text-sm group-hover:text-foreground/80 transition-colors duration-300">
                Transferências empresariais instantâneas. PIX, TED e boletos para sua operação funcionar sem parar.
              </p>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-hero transition-all duration-500 hover:-translate-y-2 hover:scale-105 group bg-gradient-to-br from-card to-secondary/50 border-0 shadow-lg hover:shadow-glow" style={{ animationDelay: '0.3s' }}>
            <div className="space-y-4">
              <div className="h-12 w-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center group-hover:animate-float group-hover:bg-gradient-to-br group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                <Users className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">Atendimento CNPJ</h3>
              <p className="text-muted-foreground text-sm group-hover:text-foreground/80 transition-colors duration-300">
                Suporte especializado para empresas. Gerente dedicado para resolver suas demandas corporativas.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;