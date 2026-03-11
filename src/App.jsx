import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ToolkitProvider, useToolkit } from './context/ToolkitContext';
import { saveToStorage, STORAGE_KEYS } from './utils/storageHelpers';

import SetupWizard from './components/setup/SetupWizard';
import Sidebar from './components/layout/Sidebar';
import TopBar from './components/layout/TopBar';
import MobileNav from './components/layout/MobileNav';
import Dashboard from './components/dashboard/Dashboard';
import ChangeWheel from './components/wheel/ChangeWheel';
import PhaseDetail from './components/phase/PhaseDetail';
import AdoptionDashboard from './components/metrics/AdoptionDashboard';
import ChampionDirectory from './components/champions/ChampionDirectory';
import ProgramSettings from './components/settings/ProgramSettings';

const ROUTE_TITLES = {
  '/dashboard': 'Dashboard',
  '/wheel': 'Change Wheel',
  '/adoption': 'Adoption Metrics',
  '/champions': 'Champion Network',
  '/settings': 'Settings',
};

function AppShell() {
  const { state } = useToolkit();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const location = useLocation();

  // Persist last-visited page
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.lastPage, location.pathname);
  }, [location.pathname]);

  if (!state.setupComplete) {
    return <SetupWizard />;
  }

  const title = ROUTE_TITLES[location.pathname] || 'ABSA Change Toolkit';

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8f9fa]">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-col">
        <Sidebar />
      </div>

      {/* Mobile nav drawer */}
      <MobileNav open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

      {/* Main content area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopBar
          onMenuClick={() => setMobileNavOpen(true)}
          title={title}
        />
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/wheel" element={<ChangeWheel />} />
            <Route path="/phase/:phaseId" element={<PhaseDetail />} />
            <Route path="/adoption" element={<AdoptionDashboard />} />
            <Route path="/champions" element={<ChampionDirectory />} />
            <Route path="/settings" element={<ProgramSettings />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ToolkitProvider>
        <AppShell />
      </ToolkitProvider>
    </BrowserRouter>
  );
}
