import { ContactSection } from "@/components/sections/contact"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#07050d] text-white">
      <Navigation />
      <div className="pt-20">
        <ContactSection />
      </div>
      <Footer />
    </main>
  )
}
