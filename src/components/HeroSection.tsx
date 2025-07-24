import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Zap, TrendingUp, Users } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 bg-gradient-hero">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="text-center lg:text-left space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-foreground">Raav</span>
              <span className="text-muted-foreground">Bank</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary font-semibold">
              Sua confiança, nossa prioridade.
            </p>
            <p className="text-lg text-muted-foreground max-w-lg">
              Pagamentos seguros com RaavBank. Soluções financeiras corporativas para empresas com CNPJ.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button variant="cta" size="xl" className="min-w-48">
              Abrir Conta Grátis
            </Button>
            <Button variant="modern" size="xl" className="min-w-48">
              Saiba Mais
            </Button>
          </div>

          <div className="flex items-center justify-center lg:justify-start space-x-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-primary" />
              <span>100% Seguro</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-primary" />
              <span>Pagamentos Instantâneos</span>
            </div>
          </div>
        </div>

        {/* Right Content - Feature Cards para Empresas CNPJ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 hover:shadow-card transition-all duration-300 hover:-translate-y-1">
            <div className="space-y-4">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Segurança Empresarial</h3>
              <p className="text-muted-foreground text-sm">
                Proteção bancária avançada para empresas com CNPJ. Sua gestão financeira empresarial em mãos seguras.
              </p>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-card transition-all duration-300 hover:-translate-y-1">
            <div className="space-y-4">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Gestão Financeira</h3>
              <p className="text-muted-foreground text-sm">
                Controle total das finanças da sua empresa. Relatórios detalhados e análises em tempo real.
              </p>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-card transition-all duration-300 hover:-translate-y-1">
            <div className="space-y-4">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Pagamentos Corporativos</h3>
              <p className="text-muted-foreground text-sm">
                Transferências empresariais instantâneas. PIX, TED e boletos para sua operação funcionar sem parar.
              </p>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-card transition-all duration-300 hover:-translate-y-1">
            <div className="space-y-4">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Atendimento CNPJ</h3>
              <p className="text-muted-foreground text-sm">
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