import React, { useState } from 'react';
import { X } from 'lucide-react';
import { api } from '../../api/api';
import { formatSpeed, formatLatency } from '../../utils/helpers';

interface AddNetworkFormProps {
  onClose: () => void;
  onSubmit: (data: NetworkFormData) => Promise<void>;
}

interface NetworkFormData {
  name: string;
  alias: string;
  location: string;
}

export default function AddNetworkForm({ onClose, onSubmit }: AddNetworkFormProps) {
  
  const [formData, setFormData] = useState<NetworkFormData>({
    name: '',
    alias: '',
    location: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [testingNetwork, setTestingNetwork] = useState(false);
  const [testResults, setTestResults] = useState<{
    download?: number;
    upload?: number;
    latency?: number;
  } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError('Network name is required');
      return false;
    }
    return true;
  };

  const testConnection = async () => {
    setTestingNetwork(true);
    setError(null);
    
    try {
      // Simular prueba de red
      await new Promise(resolve => setTimeout(resolve, 2000));
      const data = await api.testConnection(); // Llamar a la función de la API
      console.log('Test Results:', data);

      // Asume que `data` contiene `download`, `upload`, y `latency`
      setTestResults({
        download: data.download_speed,
        upload: data.upload_speed,
        latency: data.latency,
      });

    } catch (err) {
      setError('Failed to test network connection');
    } finally {
      setTestingNetwork(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await api.createNetwork(formData); // Llamar al endpoint
      console.log('Network created:', response); // Confirmación
      await onSubmit(formData);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add network');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Add New Network</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            disabled={isSubmitting || testingNetwork}
          >
            <X size={24} />
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label 
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Network Name *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Office WiFi"
              value={formData.name}
              onChange={handleInputChange}
              disabled={isSubmitting || testingNetwork}
            />
          </div>

          <div>
            <label 
              htmlFor="alias"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Alias
            </label>
            <input
              id="alias"
              name="alias"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Floor 1 Network"
              value={formData.alias}
              onChange={handleInputChange}
              disabled={isSubmitting || testingNetwork}
            />
            <p className="mt-1 text-sm text-gray-500">
              Optional: Give your network a memorable name
            </p>
          </div>

          <div>
            <label 
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Location
            </label>
            <input
              id="location"
              name="location"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Main Building, Floor 1"
              value={formData.location}
              onChange={handleInputChange}
              disabled={isSubmitting || testingNetwork}
            />
          </div>

          {/* Test Results */}
          {testResults && (
            <div className="p-4 bg-gray-50 rounded-md">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Network Test Results
              </h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Download</p>
                  <p className="font-medium">
                    {formatSpeed(testResults.download || 0)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Upload</p>
                  <p className="font-medium">
                    {formatSpeed(testResults.upload || 0)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Latency</p>
                  <p className="font-medium">
                    {formatLatency(testResults.latency || 0)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={testConnection}
              className="px-4 py-2 text-blue-600 border border-blue-600 
                       rounded-md hover:bg-blue-50 transition-colors"
              disabled={isSubmitting || testingNetwork}
            >
              {testingNetwork ? 'Testing...' : 'Test Connection'}
            </button>
            
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 border border-gray-300 
                         rounded-md hover:bg-gray-50 transition-colors"
                disabled={isSubmitting || testingNetwork}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md 
                         hover:bg-blue-700 transition-colors disabled:opacity-50"
                disabled={isSubmitting || testingNetwork}
              >
                {isSubmitting ? 'Adding...' : 'Add Network'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}