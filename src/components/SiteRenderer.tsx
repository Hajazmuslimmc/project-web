'use client'

import React, { useEffect, useState } from 'react';
import { SiteData } from '@/types/website';
import { SiteDatabase } from '@/lib/database/sites';
import { getTemplate } from '@/components/templates';

interface SiteRendererProps {
  username: string;
}

export default function SiteRenderer({ username }: SiteRendererProps) {
  const [siteData, setSiteData] = useState<SiteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSite = () => {
      try {
        const site = SiteDatabase.getSiteByUsername(username);
        
        if (!site) {
          setError('Site not found');
          return;
        }

        if (!site.isPublished) {
          setError('Site is not published');
          return;
        }

        setSiteData(site);
      } catch (err) {
        setError('Failed to load site');
      } finally {
        setLoading(false);
      }
    };

    loadSite();
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading site...</p>
        </div>
      </div>
    );
  }

  if (error || !siteData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">🚫</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Site Not Found</h1>
          <p className="text-gray-600 mb-6">
            {error || 'The site you are looking for does not exist or is not published.'}
          </p>
          <a 
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to CoachLaunch
          </a>
        </div>
      </div>
    );
  }

  const template = getTemplate(siteData.template);
  
  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Template Error</h1>
          <p className="text-gray-600">The template for this site could not be loaded.</p>
        </div>
      </div>
    );
  }

  const TemplateComponent = template.component;

  return (
    <div>
      {/* SEO Meta Tags would go in head */}
      <TemplateComponent data={siteData} />
    </div>
  );
}