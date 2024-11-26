import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface MetricsChartProps {
  data: Array<{
    timestamp: string;
    download_speed: number;
    upload_speed: number;
    latency: number;
    packet_loss?: number;
  }>;
  height?: number;
  width?: number;
}

export default function MetricsChart({ 
  data,
  height = 300,
  width = 800
}: MetricsChartProps) {
  return (
    <div className="w-full overflow-x-auto">
      <LineChart width={width} height={height} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="timestamp" 
          fontSize={12}
          tickFormatter={(value) => new Date(value).toLocaleTimeString()}
        />
        <YAxis fontSize={12} />
        <Tooltip
          labelFormatter={(value) => new Date(value).toLocaleString()}
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="download_speed" 
          stroke="#10B981" 
          name="Download (Mbps)" 
          dot={false}
        />
        <Line 
          type="monotone" 
          dataKey="upload_speed" 
          stroke="#3B82F6" 
          name="Upload (Mbps)" 
          dot={false}
        />
        <Line 
          type="monotone" 
          dataKey="latency" 
          stroke="#F59E0B" 
          name="Latency (ms)" 
          dot={false}
        />
        {data[0]?.packet_loss !== undefined && (
          <Line 
            type="monotone" 
            dataKey="packet_loss" 
            stroke="#EF4444" 
            name="Packet Loss (%)" 
            dot={false}
          />
        )}
      </LineChart>
    </div>
  );
}