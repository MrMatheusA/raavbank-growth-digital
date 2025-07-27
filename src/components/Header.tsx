import { Button } from "@/components/ui/button";
import raavbankLogo from "@/assets/raavbank-logo-transparent.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between px-8 py-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/30 sticky top-0 z-50 animate-fade-in shadow-card">
      <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => navigate('/')}>
        <img 
          src={raavbankLogo} 
          alt="RaavBank" 
          className="h-10 w-auto transition-transform duration-300 group-hover:scale-110" 
        />
      </div>
      
      <nav className="hidden md:flex items-center space-x-10">
        <button 
          onClick={() => navigate('/sobre')}
          className="text-foreground/70 hover:text-primary transition-all duration-300 relative group font-medium"
        >
          Sobre
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
        </button>
        <a 
          href="#contato" 
          className="text-foreground/70 hover:text-primary transition-all duration-300 relative group font-medium"
        >
          Contato
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
        </a>
      </nav>

      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate('/login')}
          className="hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-105 font-medium"
        >
          Entrar
        </Button>
        <Button 
          variant="cta" 
          size="sm"
          onClick={() => navigate('/registro')}
          className="bg-gradient-cta hover:shadow-glow hover:scale-105 transition-all duration-300 animate-glow font-medium"
        >
          Abrir Conta
        </Button>
      </div>
    </header>
  );
};

export default Header;