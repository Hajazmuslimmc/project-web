'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Project } from '@/lib/data/projects'

interface ProjectCardProps {
  project: Project
  featured?: boolean
}

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const cardClasses = featured
    ? "glass-card rounded-2xl p-6 hover:bg-card/90 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 cursor-pointer animate-fade-in"
    : "glass-card rounded-xl p-5 hover:bg-card/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/15 transform hover:-translate-y-1 cursor-pointer animate-fade-in"

  const statusColors = {
    completed: 'text-green-400',
    'in-progress': 'text-yellow-400',
    planned: 'text-gray-400'
  }

  const statusLabels = {
    completed: 'Completed',
    'in-progress': 'In Progress',
    planned: 'Planned'
  }

  return (
    <Link href={`/projects/${project.id}`}>
      <div className={cardClasses}>
        {/* Image */}
        <div className={`relative rounded-lg overflow-hidden mb-4 ${featured ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <div className="text-4xl opacity-50">{project.category === 'games' ? '🎮' : project.category === 'tools' ? '⚙️' : project.category === 'ai' ? '🤖' : '🌐'}</div>
          </div>
          {/* Status Badge */}
          <div className="absolute top-3 right-3 px-2 py-1 bg-card/90 backdrop-blur-sm rounded-md text-xs font-medium">
            <span className={statusColors[project.status]}>●</span>
            <span className="ml-1 text-muted-foreground">{statusLabels[project.status]}</span>
          </div>
        </div>

        {/* Content */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className={`font-bold text-foreground ${featured ? 'text-xl' : 'text-lg'}`}>
              {project.title}
            </h3>
            {project.downloads && (
              <span className="text-xs text-muted-foreground bg-primary/10 px-2 py-1 rounded-full">
                {project.downloads.toLocaleString()} downloads
              </span>
            )}
          </div>

          <p className={`text-muted-foreground mb-4 ${featured ? 'text-base' : 'text-sm'}`}>
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1 mb-4">
            {project.tech.slice(0, featured ? 4 : 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-md"
              >
                {tech}
              </span>
            ))}
            {project.tech.length > (featured ? 4 : 3) && (
              <span className="px-2 py-1 text-xs text-muted-foreground">
                +{project.tech.length - (featured ? 4 : 3)} more
              </span>
            )}
          </div>

          {/* Links */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="GitHub"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                  </svg>
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  Demo
                </a>
              )}
            </div>

            <div className="text-sm text-muted-foreground">
              {new Date(project.lastUpdated).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
