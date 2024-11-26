import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  iconColor?: string;
  trend?: {
    direction: 'up' | 'down';
    value: string;
  };
}

export default function MetricCard({
  label,
  value,
  unit,
  icon: Icon,
  iconColor = "text-blue-500",
  trend
}: MetricCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-500">{label}</span>
        <Icon className={`${iconColor}`} size={20} />
      </div>
      <div className="flex items-baseline">
        <p className="text-2xl font-semibold text-gray-900">
          {value}
          {unit && <span className="text-sm font-normal text-gray-500 ml-1">{unit}</span>}
        </p>
        {trend && (
          <span className={`ml-2 text-sm ${
            trend.direction === 'up' ? 'text-green-500' : 'text-red-500'
          }`}>
            {trend.value}
          </span>
        )}
      </div>
    </div>
  );
}