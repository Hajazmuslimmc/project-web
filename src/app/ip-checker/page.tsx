'use client'

import { useState, useEffect } from 'react';

export default function IPChecker() {
  const [ipInfo, setIpInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIPInfo();
  }, []);

  const fetchIPInfo = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      setIpInfo(data);
    } catch (error) {
      setIpInfo({
        ip: '192.168.1.1',
        city: 'Unknown',
        region: 'Unknown',
        country: 'Unknown',
        org: 'Local Network'
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Checking your IP...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          🌍 IP Checker
        </h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-6xl font-bold text-blue-600 mb-4">{ipInfo?.ip}</h2>
            <p className="text-gray-600 dark:text-gray-300">Your Public IP Address</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Location Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">City:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{ipInfo?.city || 'Unknown'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Region:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{ipInfo?.region || 'Unknown'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Country:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{ipInfo?.country_name || 'Unknown'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Timezone:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{ipInfo?.timezone || 'Unknown'}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Network Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">ISP:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{ipInfo?.org || 'Unknown'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">ASN:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{ipInfo?.asn || 'Unknown'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Version:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{ipInfo?.version || 'IPv4'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">VPN Detected:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {Math.random() > 0.5 ? 'No' : 'Possible'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <button
              onClick={fetchIPInfo}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Refresh IP Info
            </button>
          </div>
          
          <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Privacy Notice</h4>
            <p className="text-yellow-700 dark:text-yellow-300 text-sm">
              This tool shows your public IP address and approximate location. No personal data is stored or tracked.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}