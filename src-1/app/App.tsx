import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Key, Mail, Wrench, Shield, Zap, Users } from "lucide-react";

export default function App() {
  const tools = [
    {
      icon: Key,
      title: "Password Generator",
      description: "Create strong, secure passwords instantly with customizable options for maximum security.",
    },
    {
      icon: Mail,
      title: "Email Generator",
      description: "Generate professional email addresses and templates for any purpose or business need.",
    },
    {
      icon: Shield,
      title: "Security Tools",
      description: "Essential security utilities to protect your online presence and sensitive information.",
    },
    {
      icon: Wrench,
      title: "Developer Tools",
      description: "Powerful tools designed specifically for developers to streamline their workflow.",
    },
    {
      icon: Zap,
      title: "Quick Converters",
      description: "Fast and accurate converters for various formats, units, and data types.",
    },
    {
      icon: Users,
      title: "Team Utilities",
      description: "Collaborative tools that help teams work more efficiently and productively.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Wrench className="size-5 text-white" />
            </div>
            <span className="text-xl font-semibold">Networkak</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#tools" className="text-slate-600 hover:text-slate-900 transition-colors">
              Tools
            </a>
            <a href="#features" className="text-slate-600 hover:text-slate-900 transition-colors">
              Features
            </a>
            <a href="#about" className="text-slate-600 hover:text-slate-900 transition-colors">
              About
            </a>
          </nav>
          <Button>Get Started</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full mb-6">
            <Zap className="size-4" />
            <span className="text-sm font-medium">Free Online Tools for Everyone</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Essential Tools for Your Digital Life
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Access powerful utilities like password generators, email makers, and more. All free, secure, and easy to use.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-base">
              Explore Tools
            </Button>
            <Button size="lg" variant="outline" className="text-base">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Tools</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover a comprehensive suite of utilities designed to make your online tasks easier and more efficient.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className="size-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="size-6 text-white" />
                  </div>
                  <CardTitle>{tool.title}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Why Choose Networkak?
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="size-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="size-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Secure & Private</h3>
                    <p className="text-slate-600">
                      All tools run locally in your browser. Your data never leaves your device.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="size-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="size-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Lightning Fast</h3>
                    <p className="text-slate-600">
                      Optimized for speed and performance. Get results instantly without waiting.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="size-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="size-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Always Free</h3>
                    <p className="text-slate-600">
                      No subscriptions, no hidden fees. All tools are completely free to use.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 lg:p-12">
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <Key className="size-5 text-blue-600" />
                    <span className="font-medium">Password Generator</span>
                  </div>
                  <div className="h-10 bg-slate-100 rounded flex items-center px-3">
                    <span className="text-slate-400 font-mono text-sm">X9$kL2@pQ7#mN4&amp;...</span>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <Mail className="size-5 text-purple-600" />
                    <span className="font-medium">Email Generator</span>
                  </div>
                  <div className="h-10 bg-slate-100 rounded flex items-center px-3">
                    <span className="text-slate-400 text-sm">user@example.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-blue-50 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust Networkak for their daily online tasks. Start using our tools today.
          </p>
          <Button size="lg" variant="secondary" className="text-base">
            Start Using Tools
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="size-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Wrench className="size-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-white">Networkak</span>
              </div>
              <p className="text-sm">
                Your trusted source for free online utilities and tools.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Tools</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Password Generator</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Email Generator</a></li>
                <li><a href="#" className="hover:text-white transition-colors">All Tools</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm">
            <p>&copy; 2026 Networkak. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
