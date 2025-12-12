'use client'

import React, { useState, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PDFToPNGConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.5);
  const [converting, setConverting] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const onFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files[0]) {
      setFile(files[0]);
      setPageNumber(1);
    }
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const convertToImage = async (pageNum: number) => {
    if (!file) return;

    setConverting(true);
    try {
      const canvas = document.querySelector('canvas') as HTMLCanvasElement;
      if (canvas) {
        const link = document.createElement('a');
        link.download = `page-${pageNum}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      }
    } catch (error) {
      console.error('Error converting page:', error);
    } finally {
      setConverting(false);
    }
  };

  const convertAllPages = async () => {
    if (!file || !numPages) return;

    setConverting(true);
    for (let i = 1; i <= numPages; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      await convertToImage(i);
    }
    setConverting(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">PDF to PNG Converter</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">Convert PDF pages to high-quality PNG images</p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Upload PDF</h2>
              
              {/* File Upload */}
              <div className="mb-6">
                <label className="block w-full">
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors cursor-pointer">
                    <div className="text-4xl mb-2">📄</div>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">Click to upload PDF</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">or drag and drop</p>
                  </div>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={onFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              {file && (
                <>
                  {/* File Info */}
                  <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Selected File:</p>
                    <p className="text-sm text-blue-700 dark:text-blue-300 truncate">{file.name}</p>
                    {numPages && (
                      <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">{numPages} pages</p>
                    )}
                  </div>

                  {/* Scale Control */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Quality: {scale}x
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="3"
                      step="0.1"
                      value={scale}
                      onChange={(e) => setScale(parseFloat(e.target.value))}
                      className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <span>Low</span>
                      <span>High</span>
                    </div>
                  </div>

                  {/* Page Navigation */}
                  {numPages && numPages > 1 && (
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Page: {pageNumber} of {numPages}
                      </label>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
                          disabled={pageNumber <= 1}
                          className="px-3 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded disabled:opacity-50"
                        >
                          ←
                        </button>
                        <input
                          type="number"
                          min="1"
                          max={numPages}
                          value={pageNumber}
                          onChange={(e) => setPageNumber(Math.min(numPages, Math.max(1, parseInt(e.target.value) || 1)))}
                          className="flex-1 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-center"
                        />
                        <button
                          onClick={() => setPageNumber(Math.min(numPages, pageNumber + 1))}
                          disabled={pageNumber >= numPages}
                          className="px-3 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded disabled:opacity-50"
                        >
                          →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Convert Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={() => convertToImage(pageNumber)}
                      disabled={converting}
                      className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                    >
                      {converting ? 'Converting...' : 'Convert Current Page'}
                    </button>
                    
                    {numPages && numPages > 1 && (
                      <button
                        onClick={convertAllPages}
                        disabled={converting}
                        className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                      >
                        {converting ? 'Converting All...' : `Convert All ${numPages} Pages`}
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Preview</h2>
              </div>
              
              <div className="p-6">
                {file ? (
                  <div className="flex justify-center">
                    <Document
                      file={file}
                      onLoadSuccess={onDocumentLoadSuccess}
                      className="max-w-full"
                    >
                      <Page
                        pageNumber={pageNumber}
                        scale={scale}
                        className="shadow-lg"
                      />
                    </Document>
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4 text-gray-300 dark:text-gray-600">📄</div>
                    <p className="text-gray-500 dark:text-gray-400 text-lg">Upload a PDF to see preview</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Fast Conversion</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Convert PDF pages to PNG instantly in your browser</p>
          </div>
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Privacy First</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">All processing happens locally - your files never leave your device</p>
          </div>
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">High Quality</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Adjustable quality settings for perfect results</p>
          </div>
        </div>
      </div>
    </div>
  );
}