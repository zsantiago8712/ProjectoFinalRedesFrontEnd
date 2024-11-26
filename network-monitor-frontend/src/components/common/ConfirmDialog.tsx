import React from 'react';
import { AlertCircle, X } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: 'danger' | 'warning' | 'info';
}

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  type = 'danger'
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-start mb-4">
          <div className="flex-shrink-0">
            <AlertCircle className={`
              w-6 h-6
              ${type === 'danger' ? 'text-red-500' : ''}
              ${type === 'warning' ? 'text-yellow-500' : ''}
              ${type === 'info' ? 'text-blue-500' : ''}
            `} />
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <p className="mt-2 text-sm text-gray-500">{message}</p>
          </div>
          <button 
            onClick={onCancel}
            className="ml-auto flex-shrink-0 text-gray-400 hover:text-gray-500"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`
              px-4 py-2 text-sm font-medium text-white rounded-md
              ${type === 'danger' ? 'bg-red-600 hover:bg-red-700' : ''}
              ${type === 'warning' ? 'bg-yellow-600 hover:bg-yellow-700' : ''}
              ${type === 'info' ? 'bg-blue-600 hover:bg-blue-700' : ''}
            `}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}