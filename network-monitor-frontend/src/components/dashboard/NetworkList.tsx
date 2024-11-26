import React from 'react';
import { Wifi, Network, Activity, Download, Upload, Clock } from 'lucide-react';
import { useNetworks } from '../../hooks/useNetworks';
import { useNetworkMetrics } from '../../hooks/useNetworkMetrics';
import LoadingState from '../common/LoadingState';
import ErrorState from '../common/ErrorState';
import MetricCard from '../monitoring/MetricCard';
import StatusCard from '../monitoring/StatusCard';
import { Network as NetworkType } from '../../api/types';
import NetworkCard from './NetworkCard'; 

interface NetworkListProps {
  onSelectNetwork: (network: NetworkType) => void;
}




export default function NetworkList({ onSelectNetwork }: NetworkListProps) {
  const { networks, loading, error, fetchNetworks } = useNetworks();

  if (loading) return <LoadingState message="Loading networks..." />;
  if (error) return <ErrorState message={error} onRetry={fetchNetworks} />;
  console.log('Networks:', networks);
  if (networks.length === 0) {
    
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">No Networks Found</h3>
        <p className="mt-2 text-gray-500">Click 'Add Network' to start monitoring</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {networks.map(network => (
        <NetworkCard 
        key={network.id} 
        network={network} 
        onClick={() => onSelectNetwork(network)}
      />
      ))}
    </div>
  );
}