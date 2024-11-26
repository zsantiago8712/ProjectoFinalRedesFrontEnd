import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  showRetry?: boolean;
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

export default function ErrorState({
  title = "Error",
  message = "Something went wrong. Please try again.",
  onRetry,
  showRetry = true,
  size = 'md',
  fullScreen = false
}: ErrorStateProps) {
  const sizeConfig = {
    sm: { icon: 16, title: 'text-lg', text: 'text-sm' },
    md: { icon: 24, title: 'text-xl', text: 'text-base' },
    lg: { icon: 32, title: 'text-2xl', text: 'text-lg' }
  };

  const containerClasses = fullScreen 
    ? 'fixed inset-0 bg-white bg-opacity-90 z-50' 
    : 'h-64';

  return (
    <div className={`
      ${containerClasses}
      flex flex-col items-center justify-center
      p-4 text-center
    `}>
      <AlertCircle 
        className="text-red-500"
        size={sizeConfig[size].icon} 
      />
      
      <h3 className={`
        mt-4 font-medium text-gray-900
        ${sizeConfig[size].title}
      `}>
        {title}
      </h3>
      
      <p className={`
        mt-2 text-gray-600
        ${sizeConfig[size].text}
      `}>
        {message}
      </p>

      {showRetry && onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 
                   text-sm font-medium text-white bg-blue-600 rounded-md 
                   hover:bg-blue-700 transition-colors"
        >
          <RefreshCw size={16} />
          Try Again
        </button>
      )}
    </div>
  );
}