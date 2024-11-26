import React from 'react';
import { Activity, AlertTriangle, WifiOff } from 'lucide-react';

export type NetworkStatus = 'healthy' | 'warning' | 'error' | 'offline';

interface StatusCardProps {
  status: NetworkStatus;
  message?: string;
  lastUpdated?: string;
}

const STATUS_CONFIG = {
  healthy: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-700',
    icon: Activity,
    title: 'Healthy'
  },
  warning: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    text: 'text-yellow-700',
    icon: AlertTriangle,
    title: 'Warning'
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-700',
    icon: AlertTriangle,
    title: 'Error'
  },
  offline: {
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    text: 'text-gray-700',
    icon: WifiOff,
    title: 'Offline'
  }
};

export default function StatusCard({ 
  status, 
  message,
  lastUpdated
}: StatusCardProps) {
  const config = STATUS_CONFIG[status];
  const Icon = config.icon;

  return (
    <div className={`
      p-4 rounded-lg border
      ${config.bg}
      ${config.border}
    `}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-500">Network Status</h3>
        <Icon className={config.text} size={20} />
      </div>
      
      <p className={`text-2xl font-semibold ${config.text}`}>
        {config.title}
      </p>
      
      {message && (
        <p className="mt-1 text-sm text-gray-600">
          {message}
        </p>
      )}
      
      {lastUpdated && (
        <p className="mt-2 text-xs text-gray-500">
          Last updated: {lastUpdated}
        </p>
      )}
    </div>
  );
}