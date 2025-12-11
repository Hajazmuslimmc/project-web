'use client'

import { useState } from 'react';

export default function AISummarizer() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [summaryLength, setSummaryLength] = useState('medium');
  const [processing, setProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  const summarizeText = () => {
    if (!text.trim()) return;
    
    setProcessing(true);
    
    // Simulate AI processing with extractive summarization
    setTimeout(() => {
      const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
      let targetLength;
      
      switch (summaryLength) {
        case 'short': targetLength = Math.max(1, Math.floor(sentences.length * 0.2)); break;
        case 'medium': targetLength = Math.max(2, Math.floor(sentences.length * 0.4)); break;
        case 'long': targetLength = Math.max(3, Math.floor(sentences.length * 0.6)); break;
        default: targetLength = Math.max(2, Math.floor(sentences.length * 0.4));
      }

      // Score sentences by word frequency and position
      const wordFreq: { [key: string]: number } = {};
      const words = text.toLowerCase().match(/\b\w+\b/g) || [];
      words.forEach(word => {
        if (word.length > 3) wordFreq[word] = (wordFreq[word] || 0) + 1;
      });

      const scoredSentences = sentences.map((sentence, index) => {
        const sentenceWords = sentence.toLowerCase().match(/\b\w+\b/g) || [];
        const score = sentenceWords.reduce((sum, word) => sum + (wordFreq[word] || 0), 0) / sentenceWords.length;
        const positionScore = index < sentences.length * 0.3 ? 1.5 : 1; // Boost early sentences
        return { sentence: sentence.trim(), score: score * positionScore, index };
      });

      const topSentences = scoredSentences
        .sort((a, b) => b.score - a.score)
        .slice(0, targetLength)
        .sort((a, b) => a.index - b.index)
        .map(s => s.sentence);

      setSummary(topSentences.join('. ') + '.');
      setProcessing(false);
    }, 2000);
  };

  const copyToClipboard = async () => {
    if (summary) {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const loadSample = () => {
    const sampleText = `Artificial Intelligence (AI) has revolutionized numerous industries and aspects of daily life. Machine learning algorithms can now process vast amounts of data to identify patterns and make predictions with remarkable accuracy. Natural language processing enables computers to understand and generate human language, powering chatbots, translation services, and content creation tools. Computer vision allows machines to interpret and analyze visual information, leading to advances in autonomous vehicles, medical imaging, and security systems. AI applications in healthcare include drug discovery, diagnostic assistance, and personalized treatment plans. In finance, AI helps with fraud detection, algorithmic trading, and risk assessment. The technology continues to evolve rapidly, with deep learning and neural networks becoming increasingly sophisticated. However, the development of AI also raises important ethical considerations regarding privacy, job displacement, and decision-making transparency. As AI becomes more integrated into society, it's crucial to ensure responsible development and deployment of these powerful technologies.`;
    setText(sampleText);
    setSummary('');
  };

  const getStats = () => {
    const textWords = text.trim().split(/\s+/).length;
    const summaryWords = summary.trim().split(/\s+/).length;
    const reduction = textWords > 0 ? ((textWords - summaryWords) / textWords * 100).toFixed(1) : 0;
    return { textWords, summaryWords, reduction };
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🤖 AI Text Summarizer
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Summarize long articles and documents using AI technology
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          {/* Controls */}
          <div className="flex flex-wrap gap-4 mb-6">
            <select
              value={summaryLength}
              onChange={(e) => setSummaryLength(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="short">Short Summary (20%)</option>
              <option value="medium">Medium Summary (40%)</option>
              <option value="long">Long Summary (60%)</option>
            </select>
            <button
              onClick={loadSample}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Load Sample Text
            </button>
            <button
              onClick={summarizeText}
              disabled={!text.trim() || processing}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors font-semibold"
            >
              {processing ? 'Analyzing...' : 'Summarize Text'}
            </button>
          </div>

          {/* Input Text */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Input Text
              </label>
              <span className="text-xs text-gray-500">
                {stats.textWords} words
              </span>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your article or document here..."
              className="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Processing Indicator */}
          {processing && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600 dark:text-gray-300">AI is analyzing your text...</p>
            </div>
          )}

          {/* Summary Output */}
          {summary && !processing && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  AI Summary
                </label>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-500">
                    {stats.summaryWords} words • {stats.reduction}% reduction
                  </span>
                  <button
                    onClick={copyToClipboard}
                    className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                  >
                    {copied ? '✓ Copied' : '📋 Copy'}
                  </button>
                </div>
              </div>
              <div className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-gray-900 dark:text-white">
                {summary}
              </div>
            </div>
          )}

          {/* Features */}
          <div className="mt-8 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <h4 className="font-semibold text-purple-900 dark:text-purple-200 mb-2">
              AI Features:
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-purple-800 dark:text-purple-300">
              <div>• Extractive summarization</div>
              <div>• Key sentence detection</div>
              <div>• Word frequency analysis</div>
              <div>• Position-based scoring</div>
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