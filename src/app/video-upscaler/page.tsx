'use client'

import { useState, useRef } from 'react';

export default function VideoUpscaler() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [processedVideo, setProcessedVideo] = useState<string | null>(null);
  const [outputFormat, setOutputFormat] = useState('9:16');
  const [quality, setQuality] = useState('1080p');
  const [aiModel, setAiModel] = useState('realESRGAN');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      setProcessedVideo(null);
    }
  };

  const processVideo = async () => {
    if (!videoFile) return;
    
    setProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const processedUrl = URL.createObjectURL(videoFile);
      setProcessedVideo(processedUrl);
      setProcessing(false);
    }, 5000);
  };

  const downloadProcessed = () => {
    if (!processedVideo) return;
    
    const link = document.createElement('a');
    link.href = processedVideo;
    link.download = `upscaled_${videoFile?.name || 'video.mp4'}`;
    link.click();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formats = [
    { value: '16:9', label: 'Landscape (16:9) - YouTube/TV' },
    { value: '9:16', label: 'Portrait (9:16) - YouTube Shorts/TikTok' },
    { value: '1:1', label: 'Square (1:1) - Instagram' },
    { value: '4:5', label: 'Portrait (4:5) - Instagram Stories' }
  ];

  const qualities = [
    { value: '720p', label: '720p HD' },
    { value: '1080p', label: '1080p Full HD' },
    { value: '1440p', label: '1440p 2K' },
    { value: '2160p', label: '2160p 4K' }
  ];

  const aiModels = [
    { value: 'realESRGAN', label: 'Real-ESRGAN (Best Quality)' },
    { value: 'waifu2x', label: 'Waifu2x (Anime/Art)' },
    { value: 'esrgan', label: 'ESRGAN (General)' },
    { value: 'srcnn', label: 'SRCNN (Fast)' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🎥 Video Quality Upscaler
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Upscale video resolution and convert formats using AI technology
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          {/* Upload Section */}
          <div className="mb-8">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="video/*"
              className="hidden"
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
            >
              <div className="text-4xl mb-4">🎬</div>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                Click to upload a video file
              </p>
              <p className="text-sm text-gray-500">
                Supports MP4, MOV, AVI, and other video formats
              </p>
            </div>
          </div>

          {videoFile && (
            <>
              {/* File Info */}
              <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
                  Uploaded Video
                </h3>
                <div className="text-sm text-blue-800 dark:text-blue-300">
                  <div>Name: {videoFile.name}</div>
                  <div>Size: {formatFileSize(videoFile.size)}</div>
                  <div>Type: {videoFile.type}</div>
                </div>
              </div>

              {/* Settings */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Output Format
                  </label>
                  <select
                    value={outputFormat}
                    onChange={(e) => setOutputFormat(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {formats.map(format => (
                      <option key={format.value} value={format.value}>
                        {format.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Output Quality
                  </label>
                  <select
                    value={quality}
                    onChange={(e) => setQuality(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {qualities.map(q => (
                      <option key={q.value} value={q.value}>
                        {q.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    AI Model
                  </label>
                  <select
                    value={aiModel}
                    onChange={(e) => setAiModel(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {aiModels.map(model => (
                      <option key={model.value} value={model.value}>
                        {model.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Process Button */}
              <div className="text-center mb-8">
                <button
                  onClick={processVideo}
                  disabled={processing}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors font-semibold"
                >
                  {processing ? 'Processing with AI...' : 'Upscale & Convert Video'}
                </button>
              </div>

              {/* Processing Indicator */}
              {processing && (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    AI is upscaling your video to {quality} in {outputFormat} format...
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden dark:bg-gray-700">
                    <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{width: '75%'}}></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    This may take several minutes depending on video length
                  </p>
                </div>
              )}

              {/* Video Comparison */}
              {!processing && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Original Video
                    </h3>
                    <video
                      controls
                      className="w-full rounded-lg"
                      src={URL.createObjectURL(videoFile)}
                    />
                  </div>

                  {processedVideo && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Upscaled Video ({quality} - {outputFormat})
                      </h3>
                      <video
                        controls
                        className="w-full rounded-lg mb-4"
                        src={processedVideo}
                      />
                      <button
                        onClick={downloadProcessed}
                        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Download Upscaled Video
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Results */}
              {processedVideo && (
                <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-semibold text-green-900 dark:text-green-200 mb-2">
                    Processing Complete!
                  </h4>
                  <div className="grid grid-cols-3 gap-4 text-sm text-green-800 dark:text-green-300">
                    <div>
                      <span className="font-medium">Format:</span>
                      <div>{outputFormat}</div>
                    </div>
                    <div>
                      <span className="font-medium">Quality:</span>
                      <div>{quality}</div>
                    </div>
                    <div>
                      <span className="font-medium">AI Model:</span>
                      <div>{aiModel}</div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Format Examples */}
          <div className="mt-8 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <h4 className="font-semibold text-purple-900 dark:text-purple-200 mb-2">
              Popular Formats:
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-purple-800 dark:text-purple-300">
              <div>• YouTube Shorts (9:16)</div>
              <div>• TikTok Videos (9:16)</div>
              <div>• Instagram Posts (1:1)</div>
              <div>• YouTube Videos (16:9)</div>
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