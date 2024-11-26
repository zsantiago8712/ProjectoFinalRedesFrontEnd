import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Download, Upload, Clock, Activity } from 'lucide-react';
import { NetworkMetrics } from '../../api/types';

interface MetricsHistoryProps {
  metrics: NetworkMetrics[];
  timeRange: '1h' | '24h' | '7d' | '30d';
  onTimeRangeChange: (range: '1h' | '24h' | '7d' | '30d') => void;
}

export default function MetricsHistory({ metrics, timeRange, onTimeRangeChange }: MetricsHistoryProps) {
  const [selectedMetric, setSelectedMetric] = useState<'speed' | 'latency'>('speed');

  const timeRanges = [
    { value: '1h', label: '1 Hour' },
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' }
  ] as const;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <div className="space-x-4">
          <button
            onClick={() => setSelectedMetric('speed')}
            className={`px-4 py-2 rounded-md ${
              selectedMetric === 'speed' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Speed
          </button>
          <button
            onClick={() => setSelectedMetric('latency')}
            className={`px-4 py-2 rounded-md ${
              selectedMetric === 'latency' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Latency
          </button>
        </div>

        <div className="flex gap-2">
          {timeRanges.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => onTimeRangeChange(value)}
              className={`px-3 py-1 text-sm rounded-md ${
                timeRange === value
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-80">
        <LineChart
          width={800}
          height={300}
          data={metrics}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="timestamp" 
            tickFormatter={(value) => new Date(value).toLocaleTimeString()}
          />
          <YAxis />
          <Tooltip 
            labelFormatter={(value) => new Date(value).toLocaleString()}
            formatter={(value: number) => [
              `${value.toFixed(2)} ${selectedMetric === 'speed' ? 'Mbps' : 'ms'}`,
              selectedMetric === 'speed' ? 'Speed' : 'Latency'
            ]}
          />
          <Legend />
          
          {selectedMetric === 'speed' ? (
            <>
              <Line
                type="monotone"
                dataKey="download_speed"
                stroke="#10B981"
                name="Download"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="upload_speed"
                stroke="#3B82F6"
                name="Upload"
                dot={false}
              />
            </>
          ) : (
            <Line
              type="monotone"
              dataKey="latency"
              stroke="#F59E0B"
              name="Latency"
              dot={false}
            />
          )}
        </LineChart>
      </div>

      <div className="mt-6 grid grid-cols-4 gap-4">
        <StatCard
          icon={Download}
          label="Avg Download"
          value={`${(metrics.reduce((acc, m) => acc + m.download_speed, 0) / metrics.length).toFixed(2)} Mbps`}
        />
        <StatCard
          icon={Upload}
          label="Avg Upload"
          value={`${(metrics.reduce((acc, m) => acc + m.upload_speed, 0) / metrics.length).toFixed(2)} Mbps`}
        />
        <StatCard
          icon={Clock}
          label="Avg Latency"
          value={`${(metrics.reduce((acc, m) => acc + m.latency, 0) / metrics.length).toFixed(2)} ms`}
        />
        <StatCard
          icon={Activity}
          label="Packet Loss"
          value={`${(metrics.reduce((acc, m) => acc + m.packet_loss, 0) / metrics.length).toFixed(2)}%`}
        />
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: any;
  label: string;
  value: string;
}

function StatCard({ icon: Icon, label, value }: StatCardProps) {
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <Icon size={16} className="text-gray-500" />
        <span className="text-sm text-gray-500">{label}</span>
      </div>
      <p className="text-lg font-semibold text-gray-900">{value}</p>
    </div>
  );
}