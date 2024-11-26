import React from 'react';
import { Network } from '../../api/types';
import { Wifi, Network as NetworkIcon, Activity, Download, Upload, Clock } from 'lucide-react';

interface NetworkCardProps {
  network: Network;
  onClick: (network: Network) => void; // Cambiar para aceptar el objeto completo
}




export default function NetworkCard({ network, onClick }: NetworkCardProps) {
  return (
    <div
      onClick={() => onClick(network)}
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-medium text-gray-800">{network.name}</h3>
          <p className="text-sm text-gray-500">{network.location}</p>
        </div>
        <NetworkIcon className="text-gray-500" size={24} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <Download size={20} className="text-green-500" />
          <div>
            <p className="text-sm text-gray-500">Download</p>
            <p className="font-medium">-- Mbps</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Upload size={20} className="text-blue-500" />
          <div>
            <p className="text-sm text-gray-500">Upload</p>
            <p className="font-medium">-- Mbps</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={20} className="text-yellow-500" />
          <div>
            <p className="text-sm text-gray-500">Latency</p>
            <p className="font-medium">-- ms</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Activity size={20} className="text-purple-500" />
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <p className="font-medium text-gray-500">Offline</p>
          </div>
        </div>
      </div>
    </div>
  );
}