"use client"

import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import Link from "next/link"

// This would normally come from a CMS or database
const posts: Record<string, {
  title: string
  date: string
  readTime: string
  content: string
  tags: string[]
}> = {
  "getting-started-with-ai-engineering": {
    title: "Getting Started with AI Engineering",
    date: "2024-01-15",
    readTime: "8 min read",
    tags: ["AI", "Machine Learning", "Tutorial"],
    content: `
# Getting Started with AI Engineering

AI Engineering is one of the most exciting fields in technology today. In this article, I'll share my journey and the key concepts you need to know to get started.

## What is AI Engineering?

AI Engineering combines software engineering principles with artificial intelligence to build intelligent systems that can learn, reason, and adapt. It's not just about building models—it's about creating production-ready AI systems.

## Essential Skills

1. **Programming**: Python is the de facto language for AI. Master it.
2. **Mathematics**: Linear algebra, calculus, and probability are fundamental.
3. **Machine Learning**: Understand supervised, unsupervised, and reinforcement learning.
4. **Deep Learning**: Neural networks, CNNs, RNNs, and Transformers.
5. **Data Engineering**: Working with data pipelines and preprocessing.

## Tools You'll Need

- **Python**: The primary language
- **PyTorch/TensorFlow**: For building models
- **Jupyter Notebooks**: For experimentation
- **Git**: Version control is crucial
- **Docker**: For containerization

## Getting Started

Start with the basics. Learn Python thoroughly, then move to machine learning fundamentals. Practice with datasets from Kaggle. Build small projects and iterate.

The key is consistency. AI is a vast field, but with dedicated effort, you can make significant progress in just a few months.
    `,
  },
}

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  // In a real app, you'd fetch this from a CMS
  const post = posts["getting-started-with-ai-engineering"]

  if (!post) {
    return (
      <main className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-32 pb-20 px-6 text-center">
          <h1 className="text-2xl font-bold text-foreground">Post not found</h1>
          <Link href="/blog" className="text-primary hover:underline mt-4 inline-block">
            Back to Blog
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <article className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
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

            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="prose prose-invert prose-lg max-w-none">
              <div className="text-muted-foreground leading-relaxed space-y-6 whitespace-pre-line">
                {post.content}
              </div>
            </div>
          </motion.div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
