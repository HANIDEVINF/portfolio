"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { 
  LayoutDashboard, 
  FolderKanban, 
  FileText, 
  MessageSquare, 
  Settings,
  Plus,
  Trash2,
  Edit,
  LogOut,
  Eye,
  EyeOff,
  Loader2,
  Sparkles,
  Mail,
  CheckCircle,
  Circle
} from "lucide-react"
import type { User } from "@supabase/supabase-js"

interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  github_url: string
  live_url: string
  featured: boolean
  status: string
  created_at: string
}

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  tags: string[]
  published: boolean
  read_time: number
  created_at: string
}

interface Message {
  id: string
  name: string
  email: string
  subject: string
  message: string
  read: boolean
  created_at: string
}

interface Skill {
  id: string
  name: string
  category: string
  proficiency: number
}

interface AdminDashboardProps {
  user: User
  projects: Project[]
  blogPosts: BlogPost[]
  messages: Message[]
  skills: Skill[]
}

export default function AdminDashboard({ 
  user, 
  projects: initialProjects, 
  blogPosts: initialBlogPosts, 
  messages: initialMessages,
  skills: initialSkills 
}: AdminDashboardProps) {
  const router = useRouter()
  const supabase = createClient()
  
  const [projects, setProjects] = useState(initialProjects)
  const [blogPosts, setBlogPosts] = useState(initialBlogPosts)
  const [messages, setMessages] = useState(initialMessages)
  const [skills, setSkills] = useState(initialSkills)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  // Project form state
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    technologies: "",
    github_url: "",
    live_url: "",
    featured: false
  })

  // Blog post form state
  const [newBlogPost, setNewBlogPost] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    tags: "",
    published: false
  })

  // Skill form state
  const [newSkill, setNewSkill] = useState({
    name: "",
    category: "",
    proficiency: 80
  })

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { data, error } = await supabase.from("projects").insert({
      title: newProject.title,
      description: newProject.description,
      technologies: newProject.technologies.split(",").map(t => t.trim()),
      github_url: newProject.github_url,
      live_url: newProject.live_url,
      featured: newProject.featured
    }).select().single()

    if (!error && data) {
      setProjects([data, ...projects])
      setNewProject({ title: "", description: "", technologies: "", github_url: "", live_url: "", featured: false })
    }
    setLoading(false)
  }

  const handleDeleteProject = async (id: string) => {
    const { error } = await supabase.from("projects").delete().eq("id", id)
    if (!error) {
      setProjects(projects.filter(p => p.id !== id))
    }
  }

  const handleAddBlogPost = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { data, error } = await supabase.from("blog_posts").insert({
      title: newBlogPost.title,
      slug: newBlogPost.slug || newBlogPost.title.toLowerCase().replace(/\s+/g, "-"),
      excerpt: newBlogPost.excerpt,
      content: newBlogPost.content,
      tags: newBlogPost.tags.split(",").map(t => t.trim()),
      published: newBlogPost.published,
      author_id: user.id
    }).select().single()

    if (!error && data) {
      setBlogPosts([data, ...blogPosts])
      setNewBlogPost({ title: "", slug: "", excerpt: "", content: "", tags: "", published: false })
    }
    setLoading(false)
  }

  const handleTogglePublish = async (post: BlogPost) => {
    const { error } = await supabase
      .from("blog_posts")
      .update({ published: !post.published })
      .eq("id", post.id)
    
    if (!error) {
      setBlogPosts(blogPosts.map(p => p.id === post.id ? { ...p, published: !p.published } : p))
    }
  }

  const handleDeleteBlogPost = async (id: string) => {
    const { error } = await supabase.from("blog_posts").delete().eq("id", id)
    if (!error) {
      setBlogPosts(blogPosts.filter(p => p.id !== id))
    }
  }

  const handleMarkMessageRead = async (message: Message) => {
    const { error } = await supabase
      .from("contact_messages")
      .update({ read: !message.read })
      .eq("id", message.id)
    
    if (!error) {
      setMessages(messages.map(m => m.id === message.id ? { ...m, read: !m.read } : m))
    }
  }

  const handleDeleteMessage = async (id: string) => {
    const { error } = await supabase.from("contact_messages").delete().eq("id", id)
    if (!error) {
      setMessages(messages.filter(m => m.id !== id))
    }
  }

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { data, error } = await supabase.from("skills").insert({
      name: newSkill.name,
      category: newSkill.category,
      proficiency: newSkill.proficiency
    }).select().single()

    if (!error && data) {
      setSkills([...skills, data])
      setNewSkill({ name: "", category: "", proficiency: 80 })
    }
    setLoading(false)
  }

  const handleDeleteSkill = async (id: string) => {
    const { error } = await supabase.from("skills").delete().eq("id", id)
    if (!error) {
      setSkills(skills.filter(s => s.id !== id))
    }
  }

  const unreadMessages = messages.filter(m => !m.read).length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-semibold">Admin Dashboard</h1>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-card/50 border border-border/50">
            <TabsTrigger value="overview" className="gap-2">
              <LayoutDashboard className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="projects" className="gap-2">
              <FolderKanban className="w-4 h-4" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="blog" className="gap-2">
              <FileText className="w-4 h-4" />
              Blog
            </TabsTrigger>
            <TabsTrigger value="messages" className="gap-2 relative">
              <MessageSquare className="w-4 h-4" />
              Messages
              {unreadMessages > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-[10px] rounded-full flex items-center justify-center text-primary-foreground">
                  {unreadMessages}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="skills" className="gap-2">
              <Settings className="w-4 h-4" />
              Skills
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="bg-card/50 border-border/50">
                  <CardHeader className="pb-2">
                    <CardDescription>Total Projects</CardDescription>
                    <CardTitle className="text-3xl">{projects.length}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {projects.filter(p => p.featured).length} featured
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="bg-card/50 border-border/50">
                  <CardHeader className="pb-2">
                    <CardDescription>Blog Posts</CardDescription>
                    <CardTitle className="text-3xl">{blogPosts.length}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {blogPosts.filter(p => p.published).length} published
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="bg-card/50 border-border/50">
                  <CardHeader className="pb-2">
                    <CardDescription>Messages</CardDescription>
                    <CardTitle className="text-3xl">{messages.length}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {unreadMessages} unread
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card className="bg-card/50 border-border/50">
                  <CardHeader className="pb-2">
                    <CardDescription>Skills</CardDescription>
                    <CardTitle className="text-3xl">{skills.length}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {[...new Set(skills.map(s => s.category))].length} categories
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Recent Messages */}
            <Card className="mt-6 bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Recent Messages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {messages.slice(0, 5).map((message) => (
                    <div 
                      key={message.id} 
                      className={`p-4 rounded-lg border ${message.read ? 'bg-muted/30 border-border/30' : 'bg-primary/5 border-primary/20'}`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{message.name}</h4>
                            {!message.read && <Badge variant="secondary" className="text-xs">New</Badge>}
                          </div>
                          <p className="text-sm text-muted-foreground">{message.email}</p>
                          <p className="text-sm mt-2">{message.subject}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(message.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                  {messages.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">No messages yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1 bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Add Project
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddProject} className="space-y-4">
                    <div>
                      <Label>Title</Label>
                      <Input 
                        value={newProject.title}
                        onChange={e => setNewProject({ ...newProject, title: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea 
                        value={newProject.description}
                        onChange={e => setNewProject({ ...newProject, description: e.target.value })}
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label>Technologies (comma separated)</Label>
                      <Input 
                        value={newProject.technologies}
                        onChange={e => setNewProject({ ...newProject, technologies: e.target.value })}
                        placeholder="React, TypeScript, Node.js"
                      />
                    </div>
                    <div>
                      <Label>GitHub URL</Label>
                      <Input 
                        value={newProject.github_url}
                        onChange={e => setNewProject({ ...newProject, github_url: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Live URL</Label>
                      <Input 
                        value={newProject.live_url}
                        onChange={e => setNewProject({ ...newProject, live_url: e.target.value })}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={newProject.featured}
                        onCheckedChange={checked => setNewProject({ ...newProject, featured: checked })}
                      />
                      <Label>Featured Project</Label>
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Add Project"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="lg:col-span-2 space-y-4">
                {projects.map((project) => (
                  <Card key={project.id} className="bg-card/50 border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{project.title}</h3>
                            {project.featured && <Badge>Featured</Badge>}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {project.technologies?.map((tech, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">{tech}</Badge>
                            ))}
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteProject(project.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {projects.length === 0 && (
                  <Card className="bg-card/50 border-border/50">
                    <CardContent className="py-12 text-center text-muted-foreground">
                      No projects yet. Add your first project!
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Blog Tab */}
          <TabsContent value="blog">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1 bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Add Blog Post
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddBlogPost} className="space-y-4">
                    <div>
                      <Label>Title</Label>
                      <Input 
                        value={newBlogPost.title}
                        onChange={e => setNewBlogPost({ ...newBlogPost, title: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label>Slug</Label>
                      <Input 
                        value={newBlogPost.slug}
                        onChange={e => setNewBlogPost({ ...newBlogPost, slug: e.target.value })}
                        placeholder="auto-generated-from-title"
                      />
                    </div>
                    <div>
                      <Label>Excerpt</Label>
                      <Textarea 
                        value={newBlogPost.excerpt}
                        onChange={e => setNewBlogPost({ ...newBlogPost, excerpt: e.target.value })}
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label>Content</Label>
                      <Textarea 
                        value={newBlogPost.content}
                        onChange={e => setNewBlogPost({ ...newBlogPost, content: e.target.value })}
                        rows={6}
                      />
                    </div>
                    <div>
                      <Label>Tags (comma separated)</Label>
                      <Input 
                        value={newBlogPost.tags}
                        onChange={e => setNewBlogPost({ ...newBlogPost, tags: e.target.value })}
                        placeholder="AI, Machine Learning"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={newBlogPost.published}
                        onCheckedChange={checked => setNewBlogPost({ ...newBlogPost, published: checked })}
                      />
                      <Label>Publish immediately</Label>
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Add Post"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="lg:col-span-2 space-y-4">
                {blogPosts.map((post) => (
                  <Card key={post.id} className="bg-card/50 border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{post.title}</h3>
                            <Badge variant={post.published ? "default" : "secondary"}>
                              {post.published ? "Published" : "Draft"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{post.excerpt}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {post.tags?.map((tag, i) => (
                              <Badge key={i} variant="outline" className="text-xs">{tag}</Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleTogglePublish(post)}
                          >
                            {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteBlogPost(post.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {blogPosts.length === 0 && (
                  <Card className="bg-card/50 border-border/50">
                    <CardContent className="py-12 text-center text-muted-foreground">
                      No blog posts yet. Write your first post!
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <div className="space-y-4">
              {messages.map((message) => (
                <Card key={message.id} className={`bg-card/50 border-border/50 ${!message.read && 'ring-1 ring-primary/30'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <button onClick={() => handleMarkMessageRead(message)}>
                            {message.read ? (
                              <CheckCircle className="w-5 h-5 text-muted-foreground" />
                            ) : (
                              <Circle className="w-5 h-5 text-primary" />
                            )}
                          </button>
                          <h3 className="font-semibold">{message.name}</h3>
                          <span className="text-sm text-muted-foreground">{message.email}</span>
                        </div>
                        <p className="font-medium mt-2">{message.subject}</p>
                        <p className="text-muted-foreground mt-1">{message.message}</p>
                        <p className="text-xs text-muted-foreground mt-3">
                          {new Date(message.created_at).toLocaleString()}
                        </p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeleteMessage(message.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {messages.length === 0 && (
                <Card className="bg-card/50 border-border/50">
                  <CardContent className="py-12 text-center text-muted-foreground">
                    No messages yet. Share your contact page to receive messages!
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1 bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Add Skill
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddSkill} className="space-y-4">
                    <div>
                      <Label>Skill Name</Label>
                      <Input 
                        value={newSkill.name}
                        onChange={e => setNewSkill({ ...newSkill, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label>Category</Label>
                      <Input 
                        value={newSkill.category}
                        onChange={e => setNewSkill({ ...newSkill, category: e.target.value })}
                        placeholder="AI/ML, Frontend, Backend..."
                        required
                      />
                    </div>
                    <div>
                      <Label>Proficiency ({newSkill.proficiency}%)</Label>
                      <Input 
                        type="range"
                        min="0"
                        max="100"
                        value={newSkill.proficiency}
                        onChange={e => setNewSkill({ ...newSkill, proficiency: parseInt(e.target.value) })}
                        className="mt-2"
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Add Skill"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[...new Set(skills.map(s => s.category))].map((category) => (
                    <Card key={category} className="bg-card/50 border-border/50">
                      <CardHeader>
                        <CardTitle className="text-lg">{category}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {skills.filter(s => s.category === category).map((skill) => (
                          <div key={skill.id} className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium">{skill.name}</span>
                                <span className="text-xs text-muted-foreground">{skill.proficiency}%</span>
                              </div>
                              <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-primary to-cyan-500 rounded-full"
                                  style={{ width: `${skill.proficiency}%` }}
                                />
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleDeleteSkill(skill.id)}
                              className="ml-2 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  ))}
                  {skills.length === 0 && (
                    <Card className="md:col-span-2 bg-card/50 border-border/50">
                      <CardContent className="py-12 text-center text-muted-foreground">
                        No skills added yet. Start building your skill set!
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
