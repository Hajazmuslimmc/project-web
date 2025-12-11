'use client'

import { useState } from 'react';

export default function FileEncryptionTool() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [result, setResult] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setResult('');
    }
  };

  const processFile = async () => {
    if (!file || !password) return;
    
    setProcessing(true);
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      const data = new Uint8Array(arrayBuffer);
      
      // Simple XOR encryption (for demo purposes)
      const key = new TextEncoder().encode(password);
      const processed = new Uint8Array(data.length);
      
      for (let i = 0; i < data.length; i++) {
        processed[i] = data[i] ^ key[i % key.length];
      }
      
      const blob = new Blob([processed], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `${mode === 'encrypt' ? 'encrypted' : 'decrypted'}_${file.name}`;
      link.click();
      
      setResult(`File ${mode === 'encrypt' ? 'encrypted' : 'decrypted'} successfully!`);
    } catch (error) {
      setResult(`Error: ${error}`);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          🔐 File Encryption Tool
        </h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <div className="flex gap-4 mb-4">
              <button
                onClick={() => setMode('encrypt')}
                className={`px-6 py-3 rounded-lg font-semibold ${
                  mode === 'encrypt' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Encrypt
              </button>
              <button
                onClick={() => setMode('decrypt')}
                className={`px-6 py-3 rounded-lg font-semibold ${
                  mode === 'decrypt' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Decrypt
              </button>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Select File
            </label>
            <input
              type="file"
              onChange={handleFileUpload}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter encryption password"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          
          <button
            onClick={processFile}
            disabled={!file || !password || processing}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {processing ? `${mode === 'encrypt' ? 'Encrypting' : 'Decrypting'}...` : `${mode === 'encrypt' ? 'Encrypt' : 'Decrypt'} File`}
          </button>
          
          {result && (
            <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-green-800 dark:text-green-200">{result}</p>
            </div>
          )}
          
          <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Security Notice</h4>
            <p className="text-yellow-700 dark:text-yellow-300 text-sm">
              This tool uses XOR encryption for demonstration. For production use, implement AES-256 encryption.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}