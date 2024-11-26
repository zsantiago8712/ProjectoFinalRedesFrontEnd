import { useState, useEffect } from 'react';
import { WS_BASE_URL } from '../api/config';

interface WebSocketConfig {
  onMessage?: (data: any) => void;
  onError?: (error: Event) => void;
  reconnectAttempts?: number;
  reconnectInterval?: number;
}

export function useWebSocket(path: string, config: WebSocketConfig = {}) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Event | null>(null);

  useEffect(() => {
    const connect = () => {
      const ws = new WebSocket(`${WS_BASE_URL}${path}`);

      ws.onopen = () => {
        setIsConnected(true);
        setError(null);
      };

      ws.onclose = () => {
        setIsConnected(false);
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        config.onMessage?.(data);
      };

      ws.onerror = (error) => {
        setError(error);
        config.onError?.(error);
      };

      setSocket(ws);
    };

    connect();

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [path]);

  return {
    socket,
    isConnected,
    error
  };
}

export default useWebSocket;