import { Network } from './types';

const API_BASE_URL = 'http://localhost:8000/api/v1';

export const api = {
  // Networks
  getNetworks: () => 
    fetch(`${API_BASE_URL}/networks/`).then(res => res.json()),

  createNetwork: (data: Partial<Network>) =>
    fetch(`${API_BASE_URL}/networks/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json()),

  deleteNetwork: (id: number) =>
    fetch(`${API_BASE_URL}/networks/${id}`, {
      method: 'DELETE'
    }).then(res => res.json()),

  // Monitoring
  startMonitoring: (networkId: number) =>
    fetch(`${API_BASE_URL}/networks/${networkId}/monitor`, {
      method: 'POST'
    }).then(res => res.json()),

  stopMonitoring: (networkId: number) =>
    fetch(`${API_BASE_URL}/networks/${networkId}/stop`, {
      method: 'POST'
    }).then(res => res.json()),

  // Metrics
  getMetrics: (networkId: number) =>
    fetch(`${API_BASE_URL}/networks/${networkId}/metrics/history`).then(res => res.json()),

  getRealtime: (networkId: number) =>
    fetch(`${API_BASE_URL}/networks/${networkId}/realtime`).then(res => res.json()),


  testConnection: () =>
    fetch(`${API_BASE_URL}/networks/test`).then(res => res.json()),

};

export const WS_URL = 'ws://localhost:8000/api/v1/ws';