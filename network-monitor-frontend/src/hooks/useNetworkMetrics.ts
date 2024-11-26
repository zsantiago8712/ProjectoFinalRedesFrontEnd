import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '../api/client';
import { API_ENDPOINTS, WS_BASE_URL } from '../api/config';
import { NetworkMetrics } from '../api/types';

export function useNetworkMetrics(networkId: number) {
  const [metrics, setMetrics] = useState<NetworkMetrics[]>([]);
  const [currentMetrics, setCurrentMetrics] = useState<NetworkMetrics | null>(null);
  const [historicalMetrics, setHistoricalMetrics] = useState<NetworkMetrics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [wsInstance, setWsInstance] = useState<WebSocket | null>(null);

  // Función para obtener métricas históricas
  const fetchHistoricalMetrics = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiClient.get<NetworkMetrics[]>(
        API_ENDPOINTS.networks.metrics(networkId)
      );
      if (response.data) {
        setHistoricalMetrics(response.data); // Establece métricas históricas
        console.log("Historical Metrics Set:", response.data);
      }
    } catch (err) {
      setLoading(false);
      setError(err instanceof Error ? err.message : 'Failed to fetch historical metrics');
    } finally {
      setLoading(false);
    }
  }, [networkId]);

  // Función para inicializar el WebSocket
  const initializeWebSocket = useCallback(() => {
    const ws = new WebSocket(`${WS_BASE_URL}/${networkId}`);
    console.log('WebSocket initialized');

    ws.onmessage = (event) => {
      const newMetrics = JSON.parse(event.data) as NetworkMetrics;
      setCurrentMetrics(newMetrics);
      setMetrics((prev) => [...prev.slice(-19), newMetrics]);
    };

    ws.onerror = () => {
      setError('WebSocket connection failed');
      setIsMonitoring(false);
    };

    setWsInstance(ws);

    ws.onclose = () => {
      setWsInstance(null);
      console.log('WebSocket closed');
    };

    return ws;
  }, [networkId]);

  // Efecto para obtener métricas históricas al cargar
  useEffect(() => {
    console.log('Fetching metrics...');
    let isMounted = true;

    const fetchAndSetMetrics = async () => {
      try {
        const response = await apiClient.get<NetworkMetrics[]>(
          API_ENDPOINTS.networks.metrics(networkId)
        );
        if (isMounted && response.data) {
          console.log('Setting metrics...');
          console.log(response.data);
          setHistoricalMetrics(response.data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch metrics');
          if (isMounted) {
            setLoading(false);
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchAndSetMetrics();

    return () => {
      isMounted = false; // Cleanup para evitar actualizaciones en estado desmontado
      console.log('Fetch metrics cleaned up');
    };
  }, [networkId]); // Solo al montar o cuando `networkId` cambia

  // Efecto para limpiar WebSocket al detener monitoreo
  useEffect(() => {
    if (!isMonitoring && wsInstance) {
      console.log('Cleaning up WebSocket...');
      wsInstance.close();
      setWsInstance(null);
    }
  }, [isMonitoring, wsInstance]);

  // Función para iniciar el monitoreo (WebSocket)
  const startMonitoring = async () => {
    if (isMonitoring || wsInstance) {
      console.log('Already monitoring');
      return; // Evita iniciar si ya está monitoreando
    }

    try {
      await apiClient.post(API_ENDPOINTS.networks.monitor.start(networkId));
      setIsMonitoring(true);

      const ws = initializeWebSocket(); // Inicia el WebSocket aquí
      setWsInstance(ws);
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to start monitoring');
    }
  };

  // Función para detener el monitoreo (WebSocket)
  const stopMonitoring = async () => {
    if (!isMonitoring || !wsInstance) {
      console.log('Not monitoring currently');
      return; // Evita detener si ya está detenido
    }

    try {
      await apiClient.post(API_ENDPOINTS.networks.monitor.stop(networkId));
      setIsMonitoring(false);
      if (wsInstance) {
        wsInstance.close();
        setWsInstance(null);
      }
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to stop monitoring');
    }
  };

  return {
    metrics,
    historicalMetrics, // Devuelve las métricas históricas
    currentMetrics,
    loading,
    error,
    isMonitoring,
    fetchHistoricalMetrics, // Opcionalmente reutilizable
    startMonitoring,
    stopMonitoring,
  };
}
