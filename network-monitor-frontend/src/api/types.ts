export interface Network {
  id: number;
  name: string;
  alias: string;
  location: string;
  created_at: string;
}

export interface NetworkMetrics {
  network_id: number;
  upload_speed: number;
  download_speed: number;
  latency: number;
  packet_loss: number;
  connection_type: 0 | 1; // 0: Ethernet, 1: WiFi
  status: 'healthy' | 'warning' | 'error' | 'offline';
  timestamp: string;
}

export interface RouteChange {
  id: number;
  network_id: number;
  old_route: string;
  new_route: string;
  timestamp: string;
}