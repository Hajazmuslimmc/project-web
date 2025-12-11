'use client'

import { useState, useRef } from 'react';

type MediaFile = {
  id: string;
  name: string;
  type: 'video' | 'image' | 'audio';
  url: string;
  duration?: number;
};

type TimelineItem = {
  id: string;
  mediaId: string;
  startTime: number;
  duration: number;
  track: number;
};

export default function IceCut() {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTool, setSelectedTool] = useState('select');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const url = URL.createObjectURL(file);
      const mediaFile: MediaFile = {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        type: file.type.startsWith('video') ? 'video' : 
              file.type.startsWith('image') ? 'image' : 'audio',
        url
      };

      if (file.type.startsWith('video')) {
        const video = document.createElement('video');
        video.src = url;
        video.onloadedmetadata = () => {
          mediaFile.duration = video.duration;
          setMediaFiles(prev => [...prev, mediaFile]);
        };
      } else {
        setMediaFiles(prev => [...prev, mediaFile]);
      }
    });
  };

  const addToTimeline = (mediaFile: MediaFile) => {
    const timelineItem: TimelineItem = {
      id: Date.now().toString(),
      mediaId: mediaFile.id,
      startTime: currentTime,
      duration: mediaFile.duration || 3,
      track: 0
    };
    setTimeline(prev => [...prev, timelineItem]);
  };

  const playPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const exportProject = () => {
    alert('Export functionality would require server-side video processing. This is a demo interface.');
  };

  const tools = [
    { id: 'select', name: 'Select', icon: '👆' },
    { id: 'cut', name: 'Cut', icon: '✂️' },
    { id: 'text', name: 'Text', icon: '📝' },
    { id: 'filter', name: 'Filter', icon: '🎨' },
    { id: 'audio', name: 'Audio', icon: '🎵' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-blue-400">❄️ IceCut</h1>
            <div className="text-sm text-gray-400">Professional Video Editor</div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors"
            >
              Import Media
            </button>
            <button
              onClick={exportProject}
              className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition-colors"
            >
              Export
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-screen">
        {/* Sidebar - Media Library */}
        <div className="w-80 bg-gray-800 border-r border-gray-700 p-4">
          <h3 className="text-lg font-semibold mb-4">Media Library</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {mediaFiles.map(file => (
              <div
                key={file.id}
                className="p-3 bg-gray-700 rounded cursor-pointer hover:bg-gray-600 transition-colors"
                onClick={() => addToTimeline(file)}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">
                    {file.type === 'video' ? '🎬' : file.type === 'image' ? '🖼️' : '🎵'}
                  </span>
                  <div>
                    <div className="text-sm font-medium truncate">{file.name}</div>
                    <div className="text-xs text-gray-400 capitalize">{file.type}</div>
                  </div>
                </div>
              </div>
            ))}
            {mediaFiles.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <div className="text-4xl mb-2">📁</div>
                <div>No media files</div>
                <div className="text-sm">Import videos, images, or audio</div>
              </div>
            )}
          </div>

          {/* Tools */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Tools</h3>
            <div className="grid grid-cols-2 gap-2">
              {tools.map(tool => (
                <button
                  key={tool.id}
                  onClick={() => setSelectedTool(tool.id)}
                  className={`p-3 rounded text-center transition-colors ${
                    selectedTool === tool.id 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  <div className="text-lg">{tool.icon}</div>
                  <div className="text-xs">{tool.name}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Preview Area */}
          <div className="flex-1 bg-black flex items-center justify-center">
            <div className="relative">
              <video
                ref={videoRef}
                className="max-w-full max-h-full"
                controls={false}
                onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
              >
                Your browser does not support video playback.
              </video>
              {timeline.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎬</div>
                    <div className="text-xl">Preview Area</div>
                    <div>Add media to timeline to start editing</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="bg-gray-800 border-t border-gray-700 p-4">
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setCurrentTime(Math.max(0, currentTime - 10))}
                className="px-3 py-2 bg-gray-700 rounded hover:bg-gray-600"
              >
                ⏪
              </button>
              <button
                onClick={playPause}
                className="px-6 py-3 bg-blue-600 rounded-full hover:bg-blue-700 text-xl"
              >
                {isPlaying ? '⏸️' : '▶️'}
              </button>
              <button
                onClick={() => setCurrentTime(currentTime + 10)}
                className="px-3 py-2 bg-gray-700 rounded hover:bg-gray-600"
              >
                ⏩
              </button>
              <div className="text-sm text-gray-400">
                {Math.floor(currentTime / 60)}:{(currentTime % 60).toFixed(0).padStart(2, '0')}
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-gray-800 border-t border-gray-700 p-4 h-48">
            <h3 className="text-sm font-semibold mb-2">Timeline</h3>
            <div className="relative bg-gray-900 rounded h-32 overflow-x-auto">
              {/* Timeline ruler */}
              <div className="absolute top-0 left-0 right-0 h-6 bg-gray-700 border-b border-gray-600">
                {Array.from({ length: 20 }, (_, i) => (
                  <div
                    key={i}
                    className="absolute top-0 h-full border-l border-gray-500 text-xs text-gray-400 pl-1"
                    style={{ left: `${i * 50}px` }}
                  >
                    {i}s
                  </div>
                ))}
              </div>

              {/* Timeline items */}
              <div className="pt-6">
                {timeline.map(item => {
                  const media = mediaFiles.find(m => m.id === item.mediaId);
                  return (
                    <div
                      key={item.id}
                      className="absolute h-8 bg-blue-600 rounded border border-blue-500 flex items-center px-2 cursor-pointer hover:bg-blue-500"
                      style={{
                        left: `${item.startTime * 50}px`,
                        width: `${item.duration * 50}px`,
                        top: `${24 + item.track * 32}px`
                      }}
                    >
                      <span className="text-xs truncate">{media?.name}</span>
                    </div>
                  );
                })}
              </div>

              {/* Playhead */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-red-500 pointer-events-none"
                style={{ left: `${currentTime * 50}px` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="video/*,image/*,audio/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Back link */}
      <div className="absolute top-4 right-4">
        <a href="/" className="text-blue-400 hover:text-blue-300">← Back to Tools</a>
      </div>
    </div>
  );
}