export type SearchCategory = 'Web' | 'Images' | 'Videos';

export type SearchResult = {
  id: number;
  title: string;
  domain: string;
  url: string;
  description: string;
  category: SearchCategory;
  accent: string;
  imageLabel: string;
  tags: string[];
};

export const searchSuggestions = [
  'private browser',
  'secure browser download',
  'how to block trackers',
  'privacy search engine',
  'best browser for security',
  'vpn built into browser',
  'private browsing mode',
  'camera mic permissions',
  'browser ad blocker',
  'secure passwordless login',
];

export const searchResults: SearchResult[] = [
  {
    id: 1,
    title: 'AlSafe Browser Overview',
    domain: 'networkak.com',
    url: 'https://networkak.com/alsafe',
    description: 'A privacy-first browser workspace with tab isolation, HTTPS upgrades, strict tracker blocking, and profile-level permission controls.',
    category: 'Web',
    accent: '#6ee7b7',
    imageLabel: 'Browser dashboard',
    tags: ['privacy', 'tabs', 'https'],
  },
  {
    id: 2,
    title: 'Private Search Without Query Logging',
    domain: 'networkak.com',
    url: 'https://networkak.com/Search',
    description: 'Search across web, image, and video cards with anonymous suggestions, zero-query storage design, and clean preview-rich results.',
    category: 'Web',
    accent: '#7dd3fc',
    imageLabel: 'Search UI',
    tags: ['search', 'no logs', 'autocomplete'],
  },
  {
    id: 3,
    title: 'Tracker Radar: Live Session Defenses',
    domain: 'docs.alsafe.network',
    url: 'https://docs.alsafe.network/tracker-radar',
    description: 'A technical look at blocking third-party trackers, cookie abuse, fingerprinting scripts, and covert beacon requests in real time.',
    category: 'Web',
    accent: '#fca5a5',
    imageLabel: 'Threat map',
    tags: ['tracking', 'cookies', 'fingerprinting'],
  },
  {
    id: 4,
    title: 'Search Result Preview Gallery',
    domain: 'gallery.networkak.com',
    url: 'https://gallery.networkak.com/preview-cards',
    description: 'Thumbnail-first layout samples for image-heavy discovery, with large visual previews, domains, descriptions, and source labels.',
    category: 'Images',
    accent: '#f9a8d4',
    imageLabel: 'Preview gallery',
    tags: ['images', 'thumbnails', 'gallery'],
  },
  {
    id: 5,
    title: 'Encrypted Sync Across Profiles',
    domain: 'alsafe.plus',
    url: 'https://alsafe.plus/sync',
    description: 'Premium encrypted sync keeps bookmarks, preferences, and browser layouts aligned across devices without exposing plain-text data.',
    category: 'Web',
    accent: '#fde68a',
    imageLabel: 'Sync cloud',
    tags: ['sync', 'profiles', 'premium'],
  },
  {
    id: 6,
    title: 'VPN Masking Servers Explained',
    domain: 'alsafe.plus',
    url: 'https://alsafe.plus/network',
    description: 'Regional private relays and premium exit nodes designed to reduce IP exposure while preserving browser responsiveness.',
    category: 'Videos',
    accent: '#c4b5fd',
    imageLabel: 'Server map',
    tags: ['vpn', 'masking', 'network'],
  },
  {
    id: 7,
    title: 'Permission Control Center',
    domain: 'help.networkak.com',
    url: 'https://help.networkak.com/permissions',
    description: 'Manage mic, camera, location, clipboard, popups, storage, and background sync from a single browser security surface.',
    category: 'Web',
    accent: '#93c5fd',
    imageLabel: 'Permissions',
    tags: ['permissions', 'camera', 'location'],
  },
  {
    id: 8,
    title: 'Modern Dark UI Motion Study',
    domain: 'labs.networkak.com',
    url: 'https://labs.networkak.com/motion',
    description: 'Design notes for a glass-heavy dark interface with responsive panels, soft gradients, and restrained motion for fast navigation.',
    category: 'Images',
    accent: '#86efac',
    imageLabel: 'Glass panels',
    tags: ['ui', 'motion', 'dark mode'],
  },
  {
    id: 9,
    title: 'Private Window Session Demo',
    domain: 'demo.networkak.com',
    url: 'https://demo.networkak.com/private-window',
    description: 'A temporary browsing session with isolated cache, no history writes, and tighter default permissions for sensitive research.',
    category: 'Videos',
    accent: '#fdba74',
    imageLabel: 'Private mode',
    tags: ['private mode', 'cache', 'session'],
  },
];

export function buildPreviewDataUrl(title: string, domain: string, accent: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#09111f"/>
          <stop offset="100%" stop-color="${accent}"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="630" rx="44" fill="#07101d"/>
      <rect x="34" y="34" width="1132" height="562" rx="34" fill="url(#g)" opacity="0.9"/>
      <rect x="88" y="118" width="1024" height="58" rx="18" fill="rgba(255,255,255,0.16)"/>
      <rect x="88" y="214" width="480" height="220" rx="28" fill="rgba(7,16,29,0.45)"/>
      <rect x="602" y="214" width="510" height="42" rx="14" fill="rgba(255,255,255,0.18)"/>
      <rect x="602" y="280" width="430" height="26" rx="12" fill="rgba(255,255,255,0.18)"/>
      <rect x="602" y="328" width="470" height="26" rx="12" fill="rgba(255,255,255,0.18)"/>
      <rect x="602" y="376" width="350" height="26" rx="12" fill="rgba(255,255,255,0.18)"/>
      <text x="88" y="88" fill="#d7e3f4" font-size="32" font-family="Arial, Helvetica, sans-serif">${domain}</text>
      <text x="88" y="520" fill="white" font-size="58" font-weight="700" font-family="Arial, Helvetica, sans-serif">${title}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
