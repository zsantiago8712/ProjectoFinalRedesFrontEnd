import React, { useState } from 'react';
import { ArrowLeft, Activity, AlertTriangle, Wifi, Network as NetworkIcon } from 'lucide-react';
import { useNetworkMetrics } from '../../hooks/useNetworkMetrics';
import { useNetworks } from '../../hooks/useNetworks';
import MetricsChart from '../monitoring/MetricsChart';
import StatusCard from '../monitoring/StatusCard';
import MetricCard from '../monitoring/MetricCard';
import LoadingState from '../common/LoadingState';
import ErrorState from '../common/ErrorState';
import ConfirmDialog from '../common/ConfirmDialog';
import { Network as NetworkType } from '../../api/types';

interface NetworkDetailProps {
  network: NetworkType;
  onBack: () => void;
}

export default function NetworkDetail({ network, onBack }: NetworkDetailProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  
  // Obtener datos de la red y métricas
  const {
    metrics,
    historicalMetrics,
    currentMetrics,
    loading,
    error,
    isMonitoring,
    startMonitoring,
    stopMonitoring
  } = useNetworkMetrics(network.id);

  // Encontrar la red actual
  console.log('NetworkDetail:', {
    networkId: network,
    metrics: metrics,
    currentMetrics: metrics,
    loading,
    error
  });

  

  
  if (loading) {
    return <LoadingState message="Loading network details..." />;
  }

  // if (error || !metrics) {
  //   return (
  //     <ErrorState 
  //       message={error || "Network not found"}
  //       onRetry={() => window.location.reload()}
  //     />
  //   );
  // }

  const handleDelete = async () => {
    try {
      // await deleteNetwork(networkId);
      onBack();
    } catch (err) {
      console.error('Failed to delete network:', err);
    }
  };

  const handleMonitoringToggle = async () => {
    try {
      if (isMonitoring) {
        await stopMonitoring();
      } else {
        await startMonitoring();
      }
    } catch (err) {
      console.error('Failed to toggle monitoring:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {network.name}
              </h2>
              <p className="text-sm text-gray-500">{network.location}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleMonitoringToggle}
              className={`px-4 py-2 rounded-md transition-colors ${
                isMonitoring 
                  ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Delete Network
            </button>
          </div>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatusCard
          status={currentMetrics?.status || 'offline'}
          message={isMonitoring ? 'Monitoring active' : 'Monitoring stopped'}
          lastUpdated={currentMetrics?.timestamp}
        />

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Connection Type</h3>
            {currentMetrics?.connection_type === 1 ? (
              <Wifi className="text-blue-500" size={20} />
            ) : (
              <NetworkIcon className="text-gray-500" size={20} />
            )}
          </div>
          <p className="text-2xl font-semibold text-gray-800">
            {currentMetrics?.connection_type === 1 ? 'WiFi' : 'Ethernet'}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Network Health</h3>
            <Activity className="text-blue-500" size={20} />
          </div>
          <p className="text-2xl font-semibold text-gray-800">
            {currentMetrics?.packet_loss}% Loss
          </p>
        </div>
      </div>

      {/* Gráfico del historial de métricas */}
      {historicalMetrics.length > 0 && (       
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Historical Metrics
            </h3>
            <MetricsChart data={historicalMetrics} />
        </div>
      )}



      {/* Metrics Chart */}
      {isMonitoring && metrics.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Real-time Performance
          </h3>
          <MetricsChart data={metrics} />
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title="Delete Network"
        message="Are you sure you want to delete this network? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteConfirm(false)}
        type="danger"
      />
    </div>
  );
}