'use client'

import { useState } from 'react';

export default function CitationGenerator() {
  const [format, setFormat] = useState('APA');
  const [type, setType] = useState('website');
  const [fields, setFields] = useState({
    title: '',
    author: '',
    url: '',
    date: '',
    publisher: ''
  });
  const [citation, setCitation] = useState('');

  const generateCitation = () => {
    const { title, author, url, date, publisher } = fields;
    let result = '';

    if (format === 'APA') {
      if (type === 'website') {
        result = `${author}. (${date}). ${title}. ${publisher}. ${url}`;
      }
    } else if (format === 'MLA') {
      if (type === 'website') {
        result = `${author}. "${title}." ${publisher}, ${date}, ${url}.`;
      }
    } else if (format === 'Chicago') {
      if (type === 'website') {
        result = `${author}. "${title}." ${publisher}. Accessed ${date}. ${url}.`;
      }
    }

    setCitation(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(citation);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          📚 Citation Generator
        </h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Citation Format:
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="APA">APA</option>
                <option value="MLA">MLA</option>
                <option value="Chicago">Chicago</option>
                <option value="Harvard">Harvard</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Source Type:
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="website">Website</option>
                <option value="book">Book</option>
                <option value="journal">Journal Article</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-4 mb-6">
            <input
              type="text"
              placeholder="Author"
              value={fields.author}
              onChange={(e) => setFields({...fields, author: e.target.value})}
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <input
              type="text"
              placeholder="Title"
              value={fields.title}
              onChange={(e) => setFields({...fields, title: e.target.value})}
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <input
              type="text"
              placeholder="Publisher"
              value={fields.publisher}
              onChange={(e) => setFields({...fields, publisher: e.target.value})}
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <input
              type="text"
              placeholder="Date"
              value={fields.date}
              onChange={(e) => setFields({...fields, date: e.target.value})}
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <input
              type="url"
              placeholder="URL"
              value={fields.url}
              onChange={(e) => setFields({...fields, url: e.target.value})}
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          
          <button
            onClick={generateCitation}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-6"
          >
            Generate Citation
          </button>
          
          {citation && (
            <div className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Generated Citation:</h3>
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Copy
                </button>
              </div>
              <p className="text-gray-800 dark:text-gray-200">{citation}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}