import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Building, User, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import raavbankLogo from "@/assets/raavbank-logo-transparent.png";

const EscolhaRegistro = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-6">
      <div className="w-full max-w-4xl">
        <Card className="p-8 shadow-lg bg-white">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <img 
                src={raavbankLogo} 
                alt="RaavBank" 
                className="h-12 w-auto" 
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Bem-vindo ao RaavBank
            </h1>
            <p className="text-gray-600 text-lg">
              Escolha o tipo de conta que deseja criar
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {/* Pessoa Jurídica */}
            <Card className="p-6 border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300 cursor-pointer group" onClick={() => navigate("/registro-pj")}>
              <div className="text-center space-y-4">
                <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-blue-500 transition-colors">
                  <Building className="h-8 w-8 text-blue-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Pessoa Jurídica</h3>
                <p className="text-gray-600 text-sm">
                  Para empresas e produtores que precisam de soluções financeiras corporativas
                </p>
                <ul className="text-sm text-gray-500 space-y-1 text-left">
                  <li>• Gestão de múltiplas contas</li>
                  <li>• Relatórios empresariais</li>
                  <li>• Controle de usuários</li>
                  <li>• Taxas diferenciadas</li>
                </ul>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Criar Conta PJ
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </Card>

            {/* Pessoa Física */}
            <Card className="p-6 border-2 border-gray-200 hover:border-green-500 hover:shadow-lg transition-all duration-300 cursor-pointer group" onClick={() => navigate("/registro-pf")}>
              <div className="text-center space-y-4">
                <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-green-500 transition-colors">
                  <User className="h-8 w-8 text-green-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Pessoa Física</h3>
                <p className="text-gray-600 text-sm">
                  Para pessoas físicas que buscam soluções financeiras digitais modernas
                </p>
                <ul className="text-sm text-gray-500 space-y-1 text-left">
                  <li>• Conta digital gratuita</li>
                  <li>• PIX ilimitado</li>
                  <li>• Cartão de débito</li>
                  <li>• Rendimento automático</li>
                </ul>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Criar Conta PF
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Já possui conta?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-blue-600 hover:underline font-medium"
              >
                Faça login aqui
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
      </div>
    </div>
  );
};

export default EscolhaRegistro;