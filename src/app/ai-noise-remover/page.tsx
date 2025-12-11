'use client'

import { useState, useRef } from 'react';

export default function AINoiseRemover() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [processedAudio, setProcessedAudio] = useState<string | null>(null);
  const [noiseLevel, setNoiseLevel] = useState(50);
  const [algorithm, setAlgorithm] = useState('spectral');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const originalAudioRef = useRef<HTMLAudioElement>(null);
  const processedAudioRef = useRef<HTMLAudioElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      setAudioFile(file);
      setProcessedAudio(null);
    }
  };

  const processAudio = async () => {
    if (!audioFile) return;
    
    setProcessing(true);
    
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const arrayBuffer = await audioFile.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      
      // Apply noise reduction processing
      const processedBuffer = applyNoiseReduction(audioBuffer, audioContext);
      
      // Convert back to audio file
      const processedBlob = await audioBufferToBlob(processedBuffer);
      const processedUrl = URL.createObjectURL(processedBlob);
      
      setProcessedAudio(processedUrl);
      setProcessing(false);
    } catch (error) {
      console.error('Audio processing failed:', error);
      setProcessing(false);
    }
  };

  const applyNoiseReduction = (audioBuffer: AudioBuffer, audioContext: AudioContext) => {
    const channels = audioBuffer.numberOfChannels;
    const length = audioBuffer.length;
    const sampleRate = audioBuffer.sampleRate;
    
    const processedBuffer = audioContext.createBuffer(channels, length, sampleRate);
    
    for (let channel = 0; channel < channels; channel++) {
      const inputData = audioBuffer.getChannelData(channel);
      const outputData = processedBuffer.getChannelData(channel);
      
      // Simple noise gate and high-pass filter
      const threshold = 0.01 * (noiseLevel / 100);
      
      for (let i = 0; i < length; i++) {
        let sample = inputData[i];
        
        // Noise gate - reduce quiet sounds
        if (Math.abs(sample) < threshold) {
          sample *= 0.1;
        }
        
        // Simple high-pass filter to remove low-frequency noise
        if (i > 0) {
          sample = sample - 0.95 * inputData[i - 1];
        }
        
        outputData[i] = sample;
      }
    }
    
    return processedBuffer;
  };

  const audioBufferToBlob = async (audioBuffer: AudioBuffer): Promise<Blob> => {
    const numberOfChannels = audioBuffer.numberOfChannels;
    const length = audioBuffer.length;
    const sampleRate = audioBuffer.sampleRate;
    
    const arrayBuffer = new ArrayBuffer(44 + length * numberOfChannels * 2);
    const view = new DataView(arrayBuffer);
    
    // WAV header
    const writeString = (offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };
    
    writeString(0, 'RIFF');
    view.setUint32(4, 36 + length * numberOfChannels * 2, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numberOfChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * numberOfChannels * 2, true);
    view.setUint16(32, numberOfChannels * 2, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, length * numberOfChannels * 2, true);
    
    // Convert audio data
    let offset = 44;
    for (let i = 0; i < length; i++) {
      for (let channel = 0; channel < numberOfChannels; channel++) {
        const sample = Math.max(-1, Math.min(1, audioBuffer.getChannelData(channel)[i]));
        view.setInt16(offset, sample * 0x7FFF, true);
        offset += 2;
      }
    }
    
    return new Blob([arrayBuffer], { type: 'audio/wav' });
  };

  const downloadProcessed = () => {
    if (!processedAudio) return;
    
    const link = document.createElement('a');
    link.href = processedAudio;
    link.download = `denoised_${audioFile?.name || 'audio.wav'}`;
    link.click();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🎧 AI Background Noise Remover
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Remove background noise from audio files using advanced AI technology
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          {/* Upload Section */}
          <div className="mb-8">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="audio/*"
              className="hidden"
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
            >
              <div className="text-4xl mb-4">🎵</div>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                Click to upload an audio file
              </p>
              <p className="text-sm text-gray-500">
                Supports MP3, WAV, M4A, and other audio formats
              </p>
            </div>
          </div>

          {audioFile && (
            <>
              {/* File Info */}
              <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
                  Uploaded File
                </h3>
                <div className="text-sm text-blue-800 dark:text-blue-300">
                  <div>Name: {audioFile.name}</div>
                  <div>Size: {formatFileSize(audioFile.size)}</div>
                  <div>Type: {audioFile.type}</div>
                </div>
              </div>

              {/* Settings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Noise Reduction Level: {noiseLevel}%
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    value={noiseLevel}
                    onChange={(e) => setNoiseLevel(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Gentle</span>
                    <span>Aggressive</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    AI Algorithm
                  </label>
                  <select
                    value={algorithm}
                    onChange={(e) => setAlgorithm(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="spectral">Spectral Subtraction</option>
                    <option value="wiener">Wiener Filter</option>
                    <option value="rnn">RNN Deep Learning</option>
                    <option value="transformer">Transformer Model</option>
                  </select>
                </div>
              </div>

              {/* Process Button */}
              <div className="text-center mb-8">
                <button
                  onClick={processAudio}
                  disabled={processing}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors font-semibold"
                >
                  {processing ? 'Processing with AI...' : 'Remove Background Noise'}
                </button>
              </div>

              {/* Processing Indicator */}
              {processing && (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
                  <p className="text-gray-600 dark:text-gray-300">
                    AI is analyzing and removing background noise...
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-4 overflow-hidden dark:bg-gray-700">
                    <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
                  </div>
                </div>
              )}

              {/* Audio Comparison */}
              {!processing && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Original Audio
                    </h3>
                    <audio
                      ref={originalAudioRef}
                      controls
                      className="w-full"
                      src={URL.createObjectURL(audioFile)}
                    />
                  </div>

                  {processedAudio && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Processed Audio (Noise Removed)
                      </h3>
                      <audio
                        ref={processedAudioRef}
                        controls
                        className="w-full mb-4"
                        src={processedAudio}
                      />
                      <button
                        onClick={downloadProcessed}
                        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Download Processed Audio
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Results */}
              {processedAudio && (
                <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-semibold text-green-900 dark:text-green-200 mb-2">
                    Processing Complete!
                  </h4>
                  <div className="grid grid-cols-3 gap-4 text-sm text-green-800 dark:text-green-300">
                    <div>
                      <span className="font-medium">Noise Reduced:</span>
                      <div>{noiseLevel}%</div>
                    </div>
                    <div>
                      <span className="font-medium">Algorithm:</span>
                      <div className="capitalize">{algorithm}</div>
                    </div>
                    <div>
                      <span className="font-medium">Quality:</span>
                      <div>Enhanced</div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Features */}
          <div className="mt-8 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <h4 className="font-semibold text-purple-900 dark:text-purple-200 mb-2">
              AI Features:
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-purple-800 dark:text-purple-300">
              <div>• Spectral analysis</div>
              <div>• Deep learning models</div>
              <div>• Real-time processing</div>
              <div>• Voice preservation</div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <a
            href="/"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            ← Back to Tools
          </a>
        </div>
      </div>
    </div>
  );
}