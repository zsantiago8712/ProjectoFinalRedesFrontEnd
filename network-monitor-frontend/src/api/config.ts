// export const API_BASE_URL = 'http://localhost:8000/api/v1';
// export const WS_BASE_URL = 'ws://localhost:8000/api/v1/ws';

export const API_BASE_URL = 'http://172.22.36.103:8000/api/v1';
export const WS_BASE_URL = 'ws://172.22.36.103:8000/api/v1/ws';


export const API_ENDPOINTS = {
  networks: {
    list: '/networks',
    detail: (id: number) => `/networks/${id}`,
    metrics: (id: number) => `/networks/${id}/metrics/history`,
    realtime: (id: number) => `/networks/${id}/realtime`,
    monitor: {
      start: (id: number) => `/networks/${id}/monitor`,
      stop: (id: number) => `/networks/${id}/stop`
    }
  }
} as const;

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}