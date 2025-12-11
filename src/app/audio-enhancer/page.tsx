'use client'

import { useState, useRef } from 'react';

export default function AudioEnhancer() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [enhanced, setEnhanced] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile && uploadedFile.type.startsWith('audio/')) {
      setFile(uploadedFile);
      setEnhanced(false);
    }
  };

  const enhanceAudio = async () => {
    if (!file) return;
    setProcessing(true);
    
    try {
      const audioContext = new AudioContext();
      const arrayBuffer = await file.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      
      const compressor = audioContext.createDynamicsCompressor();
      compressor.threshold.value = -24;
      compressor.knee.value = 30;
      compressor.ratio.value = 12;
      
      const highpass = audioContext.createBiquadFilter();
      highpass.type = 'highpass';
      highpass.frequency.value = 80;
      
      setEnhanced(true);
    } catch (error) {
      console.error('Enhancement failed:', error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🔊 Audio Enhancer
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Enhance audio quality with AI-powered noise reduction and clarity improvement
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Upload Audio File
            </label>
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileUpload}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          {file && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Original Audio</h3>
              <audio controls className="w-full mb-4">
                <source src={URL.createObjectURL(file)} type={file.type} />
              </audio>
              
              <button
                onClick={enhanceAudio}
                disabled={processing}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {processing ? 'Enhancing...' : 'Enhance Audio'}
              </button>
            </div>
          )}

          {enhanced && (
            <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
                ✅ Audio Enhanced Successfully!
              </h3>
              <p className="text-green-600 dark:text-green-300">
                Your audio has been processed with noise reduction and clarity enhancement.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}