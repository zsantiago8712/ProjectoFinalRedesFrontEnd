import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import NetworkList from './components/dashboard/NetworkList';
import NetworkDetail from './components/network/NetworkDetails';
import AddNetworkForm from './components/network/AddNetworkForm';
import { Network } from './api/types';

type View = 'dashboard' | 'detail';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedNetwork, setSelectedNetwork] = useState<Network | null>(null);
  const [showAddNetwork, setShowAddNetwork] = useState(false);

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedNetwork(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <h1 
              onClick={handleBackToDashboard}
              className="text-xl font-semibold text-gray-800 cursor-pointer"
            >
              Network Monitor
            </h1>
            {currentView === 'dashboard' && (
              <button 
                onClick={() => setShowAddNetwork(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Plus size={20} />
                Add Network
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {currentView === 'dashboard' && (
          <NetworkList 
          onSelectNetwork={(network) => {
            setSelectedNetwork(network); // Guardar el objeto completo
            setCurrentView('detail');
          }}         />
        )}
        
        {currentView === 'detail' && selectedNetwork && (
          <NetworkDetail 
            network={selectedNetwork}
            onBack={handleBackToDashboard}
          />
        )}
      </main>

      {showAddNetwork && (
        <AddNetworkForm
          onClose={() => setShowAddNetwork(false)}
          onSubmit={async (data) => {
            try {
              // Implementar lógica de creación
              setShowAddNetwork(false);
            } catch (error) {
              console.error(error);
            }
          }}
        />
      )}
    </div>
  );
}