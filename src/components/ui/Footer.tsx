import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/80 backdrop-blur-sm">
      <div className="container-fluid py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">N</span>
              </div>
              <span className="text-xl font-bold">Networkak</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Building the future, one line of code at a time. Crafting innovative solutions and beautiful experiences.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/networkak" target="_blank" rel="noopener noreferrer"
                 className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">GitHub</span>
                {/* GitHub Icon Placeholder */}
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://discord.gg/networkak" target="_blank" rel="noopener noreferrer"
                 className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">Discord</span>
                {/* Discord Icon Placeholder */}
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 0C4.486 0 0 4.143 0 9.25c0 .975.216 1.905.594 2.75l-.094.344 1.344.75.094-.531c.487.188 1.006.281 1.562.281a10.19 10.19 0 9-1.562-.281l.094.531-1.344-.75-.094-.344A8.92 8.92 0 0 0 1.5 9.25C1.5 4.712 5.025 1 10 1s8.5 3.712 8.5 8.25c0 .975-.216 1.905-.594 2.75l.094.344-1.344.75-.094-.531c-.487.188-1.006.281-1.562.281a10.19 10.19 0 0 1-1.562-.281l-.094.531 1.344-.75.094.344c.378-.845.594-1.775.594-2.75C20 4.143 15.514 0 10 0z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Home</Link>
              <Link href="/projects" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Projects</Link>
              <Link href="/about" className="block text-sm text-muted-foreground hover:text-primary transition-colors">About</Link>
              <Link href="/contact" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Categories</h3>
            <div className="space-y-2">
              <Link href="/projects?category=games" className="block text-sm text-muted-foreground hover:text-primary transition-colors">🎮 Games</Link>
              <Link href="/projects?category=tools" className="block text-sm text-muted-foreground hover:text-primary transition-colors">⚙️ Tools</Link>
              <Link href="/projects?category=websites" className="block text-sm text-muted-foreground hover:text-primary transition-colors">🌐 Websites</Link>
              <Link href="/projects?category=ai" className="block text-sm text-muted-foreground hover:text-primary transition-colors">🤖 AI Projects</Link>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get notified about new projects and updates.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 bg-card border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
              <button className="px-4 py-2 bg-primary hover:bg-secondary text-white text-sm font-medium rounded-md transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {currentYear} Networkak — Built with passion ☕
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
            <a href="https://github.com/networkak/portfolio" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              Source
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
