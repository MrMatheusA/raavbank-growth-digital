import { Button } from "@/components/ui/button";
import raavbankLogo from "@/assets/raavbank-logo.png";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center space-x-2">
        <img src={raavbankLogo} alt="RaavBank" className="h-8 w-auto" />
      </div>
      
      <nav className="hidden md:flex items-center space-x-8">
        <a href="#servicos" className="text-foreground/80 hover:text-foreground transition-colors">
          Serviços
        </a>
        <a href="#sobre" className="text-foreground/80 hover:text-foreground transition-colors">
          Sobre
        </a>
        <a href="#contato" className="text-foreground/80 hover:text-foreground transition-colors">
          Contato
        </a>
      </nav>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm">
          Entrar
        </Button>
        <Button variant="cta" size="sm">
          Abrir Conta
        </Button>
      </div>
    </header>
  );
};

export default Header;