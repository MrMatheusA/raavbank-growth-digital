import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import DashboardCliente from "@/components/DashboardCliente";
import DashboardGestor from "@/components/DashboardGestor";
import DashboardGerente from "@/components/DashboardGerente";
import Extratos from "./Extratos";
import Relatorios from "./Relatorios";
import Transferencias from "./Transferencias";

const Dashboard = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'extratos' | 'relatorios' | 'transferencias'>('dashboard');
  
  // Simulação de detecção do tipo de usuário - em produção viria do backend/auth
  // Tipos: 'cliente', 'gestor', 'gerente'
  // Subtipos para cliente: 'PF', 'PJ'
  const [userProfile] = useState({
    type: 'cliente', // 'cliente' | 'gestor' | 'gerente'
    subtype: 'PF', // 'PF' | 'PJ' (só para clientes)
    name: 'João Silva Santos',
    document: '123.456.789-00'
  });

  const renderDashboardContent = () => {
    switch (userProfile.type) {
      case 'gestor':
        return <DashboardGestor />;
      case 'gerente':
        return <DashboardGerente />;
      case 'cliente':
      default:
        return <DashboardCliente userType={userProfile.subtype as 'PF' | 'PJ'} />;
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'extratos':
        return <Extratos />;
      case 'relatorios':
        return <Relatorios />;
      case 'transferencias':
        return <Transferencias />;
      default:
        return renderDashboardContent();
    }
  };

  return (
    <DashboardLayout currentView={currentView} onViewChange={setCurrentView}>
      {renderContent()}
    </DashboardLayout>
  );
};

export default Dashboard;