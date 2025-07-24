import { Button } from "@/components/ui/button";
import raavbankLogo from "@/assets/raavbank-logo-transparent.png";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/50 sticky top-0 z-50 animate-fade-in">
      <div className="flex items-center space-x-2 group">
        <img 
          src={raavbankLogo} 
          alt="RaavBank" 
          className="h-8 w-auto transition-transform duration-300 group-hover:scale-110" 
        />
      </div>
      
      <nav className="hidden md:flex items-center space-x-8">
        <a 
          href="#servicos" 
          className="text-foreground/80 hover:text-foreground transition-all duration-300 relative group"
        >
          Serviços
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
        </a>
        <a 
          href="#sobre" 
          className="text-foreground/80 hover:text-foreground transition-all duration-300 relative group"
        >
          Sobre
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
        </a>
        <a 
          href="#contato" 
          className="text-foreground/80 hover:text-foreground transition-all duration-300 relative group"
        >
          Contato
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
        </a>
      </nav>

      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="sm"
          className="hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-105"
        >
          Entrar
        </Button>
        <Button 
          variant="cta" 
          size="sm"
          className="bg-gradient-cta hover:shadow-glow hover:scale-105 transition-all duration-300 animate-glow"
        >
          Abrir Conta
        </Button>
      </div>
    </header>
  );
};

export default Header;