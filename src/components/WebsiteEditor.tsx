'use client'

import React, { useState, useEffect } from 'react';
import { SiteData } from '@/types/website';
import { SiteDatabase } from '@/lib/database/sites';
import { getTemplate, TEMPLATES } from '@/components/templates';

interface WebsiteEditorProps {
  userId: string;
  siteId?: string;
}

export default function WebsiteEditor({ userId, siteId }: WebsiteEditorProps) {
  const [siteData, setSiteData] = useState<SiteData>({
    id: siteId || `${userId}-${Date.now()}`,
    username: '',
    template: 'coach-pro',
    content: {
      headline: '',
      about_text: '',
      service_1: '',
      service_2: '',
      service_3: '',
      cta_button: '',
      contact_email: '',
    },
    settings: {
      primaryColor: '#3B82F6',
      secondaryColor: '#10B981',
      font: 'Arial, sans-serif',
    },
    isPublished: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const [activeTab, setActiveTab] = useState<'content' | 'design' | 'settings'>('content');
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    if (siteId) {
      const existingSite = SiteDatabase.getSiteByUsername(siteId);
      if (existingSite) {
        setSiteData(existingSite);
      }
    }
  }, [siteId]);

  const handleSave = () => {
    SiteDatabase.saveSite(siteData);
    alert('Site saved successfully!');
  };

  const handlePublish = () => {
    const updatedSite = { ...siteData, isPublished: true };
    setSiteData(updatedSite);
    SiteDatabase.saveSite(updatedSite);
    alert(`Site published! Visit: ${siteData.username}.coachlaunch.app`);
  };

  const updateContent = (field: string, value: string) => {
    setSiteData(prev => ({
      ...prev,
      content: { ...prev.content, [field]: value }
    }));
  };

  const updateSettings = (field: string, value: string) => {
    setSiteData(prev => ({
      ...prev,
      settings: { ...prev.settings, [field]: value }
    }));
  };

  const TemplateComponent = getTemplate(siteData.template)?.component;

  if (previewMode && TemplateComponent) {
    return (
      <div className="min-h-screen">
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => setPreviewMode(false)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Exit Preview
          </button>
        </div>
        <TemplateComponent data={siteData} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Website Editor</h1>
            <div className="flex gap-3">
              <button
                onClick={() => setPreviewMode(true)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Preview
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={handlePublish}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Editor Panel */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow-sm p-6">
            {/* Tabs */}
            <div className="flex border-b mb-6">
              {['content', 'design', 'settings'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-4 py-2 capitalize ${
                    activeTab === tab
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Content Tab */}
            {activeTab === 'content' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Username</label>
                  <input
                    type="text"
                    value={siteData.username}
                    onChange={(e) => setSiteData(prev => ({ ...prev, username: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="your-username"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Your site will be: {siteData.username || 'username'}.coachlaunch.app
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Headline</label>
                  <input
                    type="text"
                    value={siteData.content.headline}
                    onChange={(e) => updateContent('headline', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Your Coaching Business"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">About Text</label>
                  <textarea
                    value={siteData.content.about_text}
                    onChange={(e) => updateContent('about_text', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg h-24"
                    placeholder="Tell your story..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Service 1</label>
                  <input
                    type="text"
                    value={siteData.content.service_1}
                    onChange={(e) => updateContent('service_1', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Describe your first service"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Service 2</label>
                  <input
                    type="text"
                    value={siteData.content.service_2}
                    onChange={(e) => updateContent('service_2', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Describe your second service"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Service 3</label>
                  <input
                    type="text"
                    value={siteData.content.service_3}
                    onChange={(e) => updateContent('service_3', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Describe your third service"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">CTA Button Text</label>
                  <input
                    type="text"
                    value={siteData.content.cta_button}
                    onChange={(e) => updateContent('cta_button', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Contact Me Today"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Contact Email</label>
                  <input
                    type="email"
                    value={siteData.content.contact_email}
                    onChange={(e) => updateContent('contact_email', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
            )}

            {/* Design Tab */}
            {activeTab === 'design' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Primary Color</label>
                  <input
                    type="color"
                    value={siteData.settings.primaryColor}
                    onChange={(e) => updateSettings('primaryColor', e.target.value)}
                    className="w-full h-10 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Secondary Color</label>
                  <input
                    type="color"
                    value={siteData.settings.secondaryColor}
                    onChange={(e) => updateSettings('secondaryColor', e.target.value)}
                    className="w-full h-10 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Font</label>
                  <select
                    value={siteData.settings.font}
                    onChange={(e) => updateSettings('font', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="Arial, sans-serif">Arial</option>
                    <option value="Georgia, serif">Georgia</option>
                    <option value="'Times New Roman', serif">Times New Roman</option>
                    <option value="'Helvetica Neue', sans-serif">Helvetica</option>
                  </select>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Template</label>
                  <select
                    value={siteData.template}
                    onChange={(e) => setSiteData(prev => ({ ...prev, template: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    {TEMPLATES.map(template => (
                      <option key={template.id} value={template.id}>
                        {template.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Custom Domain</label>
                  <input
                    type="text"
                    value={siteData.domain || ''}
                    onChange={(e) => setSiteData(prev => ({ ...prev, domain: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="yourdomain.com"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={siteData.isPublished}
                    onChange={(e) => setSiteData(prev => ({ ...prev, isPublished: e.target.checked }))}
                    className="mr-2"
                  />
                  <label className="text-sm">Published</label>
                </div>
              </div>
            )}
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
              <h3 className="font-medium">Live Preview</h3>
            </div>
            <div className="h-96 overflow-auto">
              {TemplateComponent && <TemplateComponent data={siteData} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}