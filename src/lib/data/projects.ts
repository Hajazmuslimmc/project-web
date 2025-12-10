export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  category: 'games' | 'tools' | 'websites' | 'ai' | 'updates';
  featured: boolean;
  image: string;
  screenshots: string[];
  github?: string;
  demo?: string;
  download?: string;
  version?: string;
  lastUpdated: string;
  status: 'completed' | 'in-progress' | 'planned';
  downloads?: number;
}

export const projects: Project[] = [
  {
    id: 'better-notes',
    title: 'Better Notes',
    description: 'A clean, distraction-free note-taking app designed for productivity and organization.',
    longDescription: `Better Notes is a fast, clean, and free note-taking app designed to keep your thoughts organized without the extra clutter. Whether you're writing ideas, class notes, reminders, or project plans, Better Notes makes everything simple and easy to manage.

    The built-in smart tools help you stay organized automatically so you can focus on thinking, not sorting.`,
    tech: ['React', 'TypeScript', 'Electron', 'SQLite'],
    category: 'tools',
    featured: true,
    image: '/screenshots/better-notes-main.png',
    screenshots: [
      '/screenshots/better-notes-1.jpg',
      '/screenshots/better-notes-2.jpg',
      '/screenshots/better-notes-3.jpg',
      '/screenshots/better-notes-4.jpg',
    ],
    github: 'https://github.com/networkak/better-notes',
    demo: 'https://demo.betternotes.net',
    download: 'https://betternotes.net/download',
    version: 'v2.1.3',
    lastUpdated: '2024-12-04',
    status: 'completed',
    downloads: 15000,
  },
  {
    id: 'ai-chatbot',
    title: 'AI Chatbot Assistant',
    description: 'Intelligent conversational AI built with modern machine learning and natural language processing.',
    longDescription: 'An advanced AI chatbot that provides intelligent conversations, task assistance, and automated customer support. Built with cutting-edge NLP models and optimized for performance.',
    tech: ['Python', 'TensorFlow', 'React', 'FastAPI'],
    category: 'ai',
    featured: false,
    image: '/screenshots/ai-chatbot.png',
    screenshots: [
      '/screenshots/ai-chatbot-1.png',
      '/screenshots/ai-chatbot-2.png',
    ],
    github: 'https://github.com/networkak/ai-chatbot',
    status: 'in-progress',
    lastUpdated: '2024-11-28',
  },
  {
    id: 'game-engine',
    title: 'Custom 3D Game Engine',
    description: 'Lightweight 3D game engine built on WebGL, perfect for web-based gaming experiences.',
    longDescription: 'A custom game engine optimized for web deployment with advanced lighting, physics simulation, and multiplayer support. Perfect for creating engaging web-based games.',
    tech: ['WebGL', 'TypeScript', 'WebSocket', 'Three.js'],
    category: 'games',
    featured: false,
    image: '/screenshots/game-engine.png',
    screenshots: [
      '/screenshots/game-engine-1.png',
      '/screenshots/game-engine-2.png',
    ],
    github: 'https://github.com/networkak/web-game-engine',
    demo: 'https://engine-demo.networkak.dev',
    status: 'completed',
    lastUpdated: '2024-11-15',
  },
  {
    id: 'roblox-scripts',
    title: 'Roblox Automation Scripts',
    description: 'Advanced automation scripts and tools for Roblox game development and player assistance.',
    longDescription: 'Comprehensive collection of Roblox scripts including admin tools, game mechanics automation, and player enhancement scripts. Built for both developers and players.',
    tech: ['Lua', 'Roblox Studio', 'Roblox API'],
    category: 'games',
    featured: false,
    image: '/screenshots/roblox-scripts.png',
    screenshots: [],
    github: 'https://github.com/networkak/roblox-tools',
    status: 'completed',
    lastUpdated: '2024-10-22',
  },
  {
    id: 'portfolio-site',
    title: 'Networkak Portfolio Site',
    description: 'Modern portfolio website showcasing projects and development work with dark/light themes.',
    longDescription: 'Responsive portfolio website built with Next.js, featuring dark/light mode support, smooth animations, and comprehensive project showcase.',
    tech: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Framer Motion'],
    category: 'websites',
    featured: false,
    image: '/screenshots/portfolio-site.png',
    screenshots: [],
    github: 'https://github.com/networkak/portfolio',
    status: 'completed',
    lastUpdated: '2024-12-04',
  },
  {
    id: 'task-manager',
    title: 'Task Management Tool',
    description: 'Advanced task management and productivity tool with AI-powered planning assistance.',
    longDescription: 'Comprehensive task management solution with AI-powered suggestions, team collaboration features, and advanced analytics for improving productivity.',
    tech: ['Vue.js', 'Node.js', 'MongoDB', 'OpenAI API'],
    category: 'tools',
    featured: false,
    image: '/screenshots/task-manager.png',
    screenshots: [],
    status: 'planned',
    lastUpdated: '2024-11-30',
  },
];

export const featuredProjects = projects.filter(p => p.featured);
export const categories = [
  { id: 'games', name: 'Games', icon: '🎮' },
  { id: 'tools', name: 'Tools', icon: '⚙️' },
  { id: 'websites', name: 'Websites', icon: '🌐' },
  { id: 'ai', name: 'AI Projects', icon: '🤖' },
  { id: 'updates', name: 'Updates', icon: '📰' },
] as const;
