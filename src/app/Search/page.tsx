'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { buildPreviewDataUrl, searchResults, searchSuggestions, type SearchCategory } from '@/lib/alsafe-data';

const categories: SearchCategory[] = ['Web', 'Images', 'Videos'];

export default function SearchPage() {
  const [query, setQuery] = useState('private browser');
  const [activeCategory, setActiveCategory] = useState<SearchCategory>('Web');

  const filteredSuggestions = useMemo(() => {
    const normalized = query.toLowerCase();
    return searchSuggestions
      .filter((item) => item.includes(normalized) || normalized.length < 2)
      .slice(0, 5);
  }, [query]);

  const filteredResults = useMemo(() => {
    const normalized = query.toLowerCase().trim();

    return searchResults.filter((result) => {
      const categoryMatch = result.category === activeCategory;
      const text = `${result.title} ${result.description} ${result.domain} ${result.tags.join(' ')}`.toLowerCase();
      const queryMatch = normalized.length === 0 || text.includes(normalized);

      return categoryMatch && queryMatch;
    });
  }, [activeCategory, query]);

  return (
    <main className="alsafe-search-page">
      <div className="alsafe-search-shell">
        <div className="alsafe-search-topbar">
          <a className="alsafe-brand compact" href="/">
            <span className="alsafe-brand-mark">A</span>
            <span>AlSafe Browser</span>
          </a>
          <div className="alsafe-search-status">
            <span className="status-dot" />
            Zero-query logging demo
          </div>
        </div>

        <section className="alsafe-search-hero">
          <div className="alsafe-chip">/Search on Networkak.com</div>
          <h1>Private search with visual results, fast filtering, and no tracking profile.</h1>
          <p>
            This demo shows the AlSafe search surface: auto-complete suggestions, Web/Image/Video modes,
            thumbnail-style result previews, and a privacy-first interaction model.
          </p>

          <div className="alsafe-searchbar-wrap">
            <div className="alsafe-searchbar">
              <span className="alsafe-search-icon">⌕</span>
              <input
                aria-label="Search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search privately"
              />
              <button type="button">Search</button>
            </div>

            <AnimatePresence initial={false}>
              {filteredSuggestions.length > 0 && (
                <motion.div
                  className="alsafe-suggestion-panel"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                >
                  {filteredSuggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      className="alsafe-suggestion"
                      onClick={() => setQuery(suggestion)}
                    >
                      <span>⌕</span>
                      {suggestion}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="alsafe-category-row">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={category === activeCategory ? 'active' : ''}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <section className="alsafe-search-results">
          <div className="alsafe-results-header">
            <div>
              <span className="eyebrow">Private index</span>
              <h2>{filteredResults.length} results</h2>
            </div>
            <p>Tracking cookies, fingerprint beacons, and query history are shown as blocked in this demo flow.</p>
          </div>

          <div className="alsafe-results-grid">
            {filteredResults.map((result, index) => (
              <motion.article
                key={result.id}
                className="alsafe-result-card"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="alsafe-result-preview">
                  <img
                    src={buildPreviewDataUrl(result.imageLabel, result.domain, result.accent)}
                    alt={`${result.title} preview`}
                  />
                </div>
                <div className="alsafe-result-copy">
                  <div className="alsafe-domain-row">
                    <span className="secure-badge">HTTPS</span>
                    <span>{result.domain}</span>
                  </div>
                  <h3>{result.title}</h3>
                  <p>{result.description}</p>
                  <div className="alsafe-tag-row">
                    {result.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <a href={result.url} target="_blank" rel="noreferrer">
                    Open result
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
