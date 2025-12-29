'use client'

import React, { useState, useEffect } from 'react';
import { SiteData } from '@/types/website';
import { SiteDatabase } from '@/lib/database/sites';
import WebsiteEditor from '@/components/WebsiteEditor';

export default function DashboardPage() {
  const [sites, setSites] = useState<SiteData[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const [editingSite, setEditingSite] = useState<string | null>(null);
  const [currentUser] = useState('user-123'); // Mock user ID

  useEffect(() => {
    loadUserSites();
  }, []);

  const loadUserSites = () => {
    const userSites = SiteDatabase.getUserSites(currentUser);
    setSites(userSites);
  };

  const createNewSite = () => {
    setEditingSite(null);
    setShowEditor(true);
  };

  const editSite = (siteId: string) => {
    setEditingSite(siteId);
    setShowEditor(true);
  };

  const deleteSite = (siteId: string) => {
    if (confirm('Are you sure you want to delete this site?')) {
      SiteDatabase.deleteSite(siteId);
      loadUserSites();
    }
  };

  if (showEditor) {
    return <WebsiteEditor userId={currentUser} siteId={editingSite || undefined} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Websites</h1>
              <p className="text-gray-600 mt-1">Manage your coaching websites</p>
            </div>
            <button
              onClick={createNewSite}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              + Create New Site
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {sites.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🌐</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No websites yet</h2>
            <p className="text-gray-600 mb-8">Create your first coaching website to get started</p>
            <button
              onClick={createNewSite}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Create Your First Site
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sites.map((site) => (
              <div key={site.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <div className="text-white text-center">
                    <h3 className="text-2xl font-bold mb-2">{site.content.headline || 'Untitled Site'}</h3>
                    <p className="opacity-90">{site.username}.coachlaunch.app</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">{site.content.headline || 'Untitled Site'}</h4>
                      <p className="text-sm text-gray-600">
                        {site.isPublished ? (
                          <span className="text-green-600">✅ Published</span>
                        ) : (
                          <span className="text-yellow-600">⏳ Draft</span>
                        )}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => editSite(site.id)}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      Edit
                    </button>
                    {site.isPublished && (
                      <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm">
                        View
                      </button>
                    )}
                    <button
                      onClick={() => deleteSite(site.id)}
                      className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}