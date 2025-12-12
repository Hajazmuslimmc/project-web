'use client'

import React, { useState, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PDFConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.5);
  const [converting, setConverting] = useState(false);

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">PDF to PNG Converter</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <input
            type="file"
            accept=".pdf"
            onChange={onFileChange}
            className="mb-4"
          />
          
          {file && (
            <>
              <div className="mb-4">
                <label>Quality: {scale}x</label>
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.1"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <button
                onClick={() => convertToImage(pageNumber)}
                disabled={converting}
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
              >
                {converting ? 'Converting...' : 'Convert Page'}
              </button>
            </>
          )}
        </div>

        {file && (
          <div className="bg-white rounded-lg shadow p-6">
            <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} scale={scale} />
            </Document>
          </div>
        )}
      </div>
    </div>
  );
}