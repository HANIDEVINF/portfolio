import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import AdminDashboard from "@/components/admin/dashboard"

export default async function AdminPage() {
  const supabase = await createClient()

  if (!supabase) {
    redirect("/")
  }
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect("/auth/login")
  }

  // Check if user is admin
  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single()

  if (!profile?.is_admin) {
    redirect("/")
  }

  // Fetch dashboard data
  const [
    { data: projects },
    { data: blogPosts },
    { data: messages },
    { data: skills }
  ] = await Promise.all([
    supabase.from("projects").select("*").order("created_at", { ascending: false }),
    supabase.from("blog_posts").select("*").order("created_at", { ascending: false }),
    supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
    supabase.from("skills").select("*").order("category", { ascending: true })
  ])

  return (
    <AdminDashboard 
      user={user}
      projects={projects || []}
      blogPosts={blogPosts || []}
      messages={messages || []}
      skills={skills || []}
    />
  )
}
