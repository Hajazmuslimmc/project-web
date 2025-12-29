import React from 'react';
import { SiteData } from '@/types/website';

interface CoachTemplateProps {
  data: SiteData;
}

export default function CoachTemplate({ data }: CoachTemplateProps) {
  const { content, settings } = data;

  return (
    <div className="min-h-screen" style={{ fontFamily: settings.font }}>
      {/* Header */}
      <header className="py-6 px-4" style={{ backgroundColor: settings.primaryColor }}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            {content.headline || 'Your Coaching Business'}
          </h1>
        </div>
      </header>

      {/* About Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6" style={{ color: settings.primaryColor }}>
            About Me
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {content.about_text || 'Tell your story and connect with your audience...'}
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: settings.primaryColor }}>
            My Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold mb-4" style={{ color: settings.secondaryColor }}>
                Service 1
              </h3>
              <p className="text-gray-600">
                {content.service_1 || 'Describe your first service...'}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold mb-4" style={{ color: settings.secondaryColor }}>
                Service 2
              </h3>
              <p className="text-gray-600">
                {content.service_2 || 'Describe your second service...'}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold mb-4" style={{ color: settings.secondaryColor }}>
                Service 3
              </h3>
              <p className="text-gray-600">
                {content.service_3 || 'Describe your third service...'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4" style={{ backgroundColor: settings.secondaryColor }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <button 
            className="bg-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            style={{ color: settings.primaryColor }}
          >
            {content.cta_button || 'Contact Me Today'}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <p>Contact: {content.contact_email || 'your@email.com'}</p>
          <p className="mt-2 text-gray-400">© 2024 {content.headline}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}