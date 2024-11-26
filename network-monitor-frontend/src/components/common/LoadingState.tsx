import React from 'react';
import { Loader } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

export default function LoadingState({ 
  message = "Loading...",
  size = 'md',
  fullScreen = false 
}: LoadingStateProps) {
  const sizeConfig = {
    sm: { icon: 16, text: 'text-sm' },
    md: { icon: 24, text: 'text-base' },
    lg: { icon: 32, text: 'text-lg' }
  };

  const containerClasses = fullScreen 
    ? 'fixed inset-0 bg-white bg-opacity-90 z-50' 
    : 'h-64';

  return (
    <div className={`
      ${containerClasses}
      flex flex-col items-center justify-center
    `}>
      <Loader 
        className={`animate-spin text-blue-500`}
        size={sizeConfig[size].icon}
      />
      <p className={`
        mt-4 text-gray-600
        ${sizeConfig[size].text}
      `}>
        {message}
      </p>
    </div>
  );
}