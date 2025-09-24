import React from 'react'

export default function PrivacyPolicyPage() {
  return (
    <div className="prose p-8 max-w-4xl">
      <h1>Privacy Policy</h1>

      <p className="text-lg text-gray-600 mb-8">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <p>
        At NetworkAK, we are committed to protecting your privacy and ensuring the safety of our users.
        This privacy policy explains how we collect, use, and protect your personal information.
      </p>

      <h2>Information We Collect</h2>

      <h3>User Interests and Analytics</h3>
      <p>
        We collect data about your interests and how you interact with our games and website to:
      </p>
      <ul>
        <li>Understand which games and features are most popular</li>
        <li>Improve our games based on user preferences</li>
        <li>Develop new games that match user interests</li>
        <li>Personalize your experience on our platform</li>
      </ul>

      <h3>User Safety and Security</h3>
      <p>
        To ensure a safe and secure environment for all users, we collect information necessary for:
      </p>
      <ul>
        <li>Account authentication and verification</li>
        <li>Preventing fraud and abuse</li>
        <li>Maintaining platform security</li>
        <li>Enforcing our terms of service</li>
        <li>Protecting against harmful activities</li>
      </ul>

      <h2>How We Use Cookies</h2>
      <p>
        We use cookies and similar technologies to collect information about your interests and ensure platform safety:
      </p>
      <ul>
        <li><strong>Authentication cookies:</strong> To keep you logged in securely</li>
        <li><strong>Analytics cookies:</strong> To understand user interests and improve our games</li>
        <li><strong>Security cookies:</strong> To protect against threats and ensure user safety</li>
        <li><strong>Preference cookies:</strong> To remember your settings and preferences</li>
      </ul>

      <h2>Data Sharing</h2>
      <p>
        We do not sell your personal information to third parties. We may share data only when necessary for:
      </p>
      <ul>
        <li>Providing our services (e.g., with Firebase for authentication)</li>
        <li>Legal compliance and safety requirements</li>
        <li>Platform security and fraud prevention</li>
      </ul>

      <h2>Data Retention</h2>
      <p>
        We retain your information only as long as necessary to:
      </p>
      <ul>
        <li>Provide our services</li>
        <li>Understand user interests for game development</li>
        <li>Maintain platform safety and security</li>
        <li>Comply with legal obligations</li>
      </ul>

      <h2>Your Rights</h2>
      <p>
        You have the right to:
      </p>
      <ul>
        <li>Access your personal information</li>
        <li>Correct inaccurate data</li>
        <li>Request deletion of your data</li>
        <li>Opt out of non-essential data collection</li>
        <li>Control your cookie preferences</li>
      </ul>

      <h2>Contact Us</h2>
      <p>
        If you have questions about this privacy policy or our data practices, please contact us at:
      </p>
      <ul>
        <li>Email: <a href="mailto:contact@networkak.com">contact@networkak.com</a></li>
        <li>GitHub: <a href="https://github.com/Hajazmuslimmc/project-web" target="_blank" rel="noopener noreferrer">Project Repository</a></li>
      </ul>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this privacy policy from time to time. We will notify users of any material changes
        through our website or email communications.
      </p>
    </div>
  )
}
