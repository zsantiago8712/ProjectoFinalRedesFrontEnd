import { useState, useEffect } from 'react';
import { apiClient } from '../api/client';
import { API_ENDPOINTS } from '../api/config';
import { Network } from '../api/types';

export function useNetworks() {
  const [networks, setNetworks] = useState<Network[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNetworks();
  }, []);

  const fetchNetworks = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get<Network[]>(API_ENDPOINTS.networks.list);
      if (response.data) {
        setNetworks(response.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch networks');
    } finally {
      setLoading(false);
    }
  };

  const addNetwork = async (networkData: Partial<Network>) => {
    try {
      const response = await apiClient.post<Network>(API_ENDPOINTS.networks.list, networkData);
      if (response.data) {
        setNetworks(prev => [...prev, response.data!]);
        return response.data;
      }
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to add network');
    }
  };

  const deleteNetwork = async (networkId: number) => {
    try {
      await apiClient.delete(API_ENDPOINTS.networks.detail(networkId));
      setNetworks(prev => prev.filter(network => network.id !== networkId));
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete network');
    }
  };

  return {
    networks,
    loading,
    error,
    fetchNetworks,
    addNetwork,
    deleteNetwork
  };
}