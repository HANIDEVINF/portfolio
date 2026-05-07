"use client"

import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

const blogPosts = [
  {
    slug: "getting-started-with-ai-engineering",
    title: "Getting Started with AI Engineering",
    excerpt: "A comprehensive guide to beginning your journey in AI engineering, covering essential concepts, tools, and best practices.",
    date: "2024-01-15",
    readTime: "8 min read",
    tags: ["AI", "Machine Learning", "Tutorial"],
  },
  {
    slug: "building-intelligent-apps-with-langchain",
    title: "Building Intelligent Apps with LangChain",
    excerpt: "Learn how to leverage LangChain to create powerful AI-powered applications with natural language processing capabilities.",
    date: "2024-01-10",
    readTime: "12 min read",
    tags: ["LangChain", "NLP", "Python"],
  },
  {
    slug: "flutter-state-management-2024",
    title: "Flutter State Management in 2024",
    excerpt: "An in-depth look at modern state management solutions in Flutter, comparing different approaches and their use cases.",
    date: "2024-01-05",
    readTime: "10 min read",
    tags: ["Flutter", "Mobile", "State Management"],
  },
  {
    slug: "vector-databases-explained",
    title: "Vector Databases Explained",
    excerpt: "Understanding vector databases and how they power modern AI applications, from semantic search to recommendation systems.",
    date: "2023-12-28",
    readTime: "7 min read",
    tags: ["Databases", "AI", "Vectors"],
  },
]

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Blog</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Thoughts on AI, software development, and everything in between. I write about the things I learn and the projects I build.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300">
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>
                    
                    <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                      {post.title}
                    </h2>
                    
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <span className="text-primary flex items-center gap-1 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        Read more <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-16"
          >
            <p className="text-muted-foreground">
              More articles coming soon. Stay tuned!
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
