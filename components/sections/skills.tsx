"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { 
  Brain, 
  Smartphone, 
  Database, 
  Cloud, 
  Code2, 
  Terminal,
  Cpu,
  Layers,
  Bot,
} from "lucide-react"

const skills = [
  {
    category: "AI & Machine Learning",
    icon: Brain,
    items: ["PyTorch", "TensorFlow", "Deep Learning", "Computer Vision", "NLP", "Scikit-learn"],
  },
  {
    category: "Generative AI & LLMs",
    icon: Bot,
    items: ["LLM Fine-Tuning", "RAG Pipelines", "LangChain", "Prompt Engineering", "OpenAI API", "Hugging Face"],
  },
  {
    category: "Mobile Development",
    icon: Smartphone,
    items: ["Flutter", "Dart", "Firebase", "Mobile UI/UX", "Cross-Platform", "State Management"],
  },
  {
    category: "Backend & APIs",
    icon: Terminal,
    items: ["Python", "Flask", "FastAPI", "REST APIs", "GraphQL", "Node.js"],
  },
  {
    category: "Databases",
    icon: Database,
    items: ["Supabase", "PostgreSQL", "MongoDB", "Redis", "Pinecone", "ChromaDB"],
  },
  {
    category: "Cloud & MLOps",
    icon: Cloud,
    items: ["Vercel", "AWS", "Docker", "Kubernetes", "MLflow", "GitHub Actions"],
  },
  {
    category: "Frontend",
    icon: Code2,
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS", "JavaScript"],
  },
  {
    category: "Tools & Workflow",
    icon: Layers,
    items: ["Git", "VS Code", "Figma", "Postman", "Linux", "Agile"],
  },
  {
    category: "Core Concepts",
    icon: Cpu,
    items: ["Data Structures", "Algorithms", "System Design", "OOP", "Clean Code", "Testing"],
  },
]

export function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="skills" className="py-32 px-6 bg-card/30" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-12">
            <span className="text-primary font-mono text-sm">02.</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Skills & Technologies</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <skill.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm">{skill.category}</h3>
                </div>
                <ul className="space-y-2">
                  {skill.items.map((item) => (
                    <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
