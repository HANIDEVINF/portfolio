"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ExternalLink, Globe, Layers, ShieldCheck, Sparkles, Store, Terminal, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const clientSystems = [
  {
    slug: "clinicatajmeel",
    name: "Tadjmeel Clinica (Algiers)",
    type: "Medical Aesthetic Clinic & Desktop Suite",
    description: "Multi-surface system featuring public clinic website, Doctor treatment queue workspace, and Receptionist management desktop app.",
    demoUrl: "https://hanidevinf.github.io/clinicatajmeel/",
    github: "https://github.com/HANIDEVINF/clinicatajmeel",
    technologies: ["React", "TypeScript", "Electron", "Node.js", "Healthcare CRM"],
    badge: "Client Production",
  },
  {
    slug: "allure",
    name: "ALLURE HOMME (Sidi Bel Abbès)",
    type: "Luxury Menswear Storefront & OS Gérant",
    description: "High-conversion menswear e-commerce platform with 58-wilaya shipping calculator, variant stock manager, and WhatsApp COD order dispatch.",
    demoUrl: "https://hanidevinf.github.io/allure/",
    github: "https://github.com/HANIDEVINF/allure",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Inventory OS", "58-Wilaya COD"],
    badge: "Client Production",
  },
  {
    slug: "ecom-dashboard",
    name: "Enterprise DZD ERP, POS & G50 Suite",
    type: "Multi-Role Algerian Enterprise Software",
    description: "Dedicated workspaces for Gérant (Manager), Caissier (Barcode POS), Magasinier (Stock), and Comptable (G50 Tax Ledger).",
    demoUrl: "https://hanidevinf.github.io/ecom-dashboard/",
    github: "https://github.com/HANIDEVINF/ecom-dashboard",
    technologies: ["TypeScript", "React", "RBAC Auth", "POS Checkout", "G50 Ledger"],
    badge: "Client Production",
  },
  {
    slug: "gkstore",
    name: "GK STORE (Birkhadem, Algiers)",
    type: "Boutique Storefront & Manager OS",
    description: "Bespoke menswear e-commerce and inventory operating system deployed for a retail store in Birkhadem, Algiers.",
    demoUrl: "https://hanidevinf.github.io/gkstore/",
    github: "https://github.com/HANIDEVINF/gkstore",
    technologies: ["React", "TypeScript", "OS Gérant", "Delivery API"],
    badge: "Client Production",
  },
  {
    slug: "clothes",
    name: "CASUAL 29 (Mascara)",
    type: "Menswear Storefront & Stock OS",
    description: "E-commerce platform and back-office stock controller built for retail operations in Mascara (Wilaya 29).",
    demoUrl: "https://hanidevinf.github.io/clothes/",
    github: "https://github.com/HANIDEVINF/clothes",
    technologies: ["React", "TypeScript", "Inventory OS", "WhatsApp Checkout"],
    badge: "Client Production",
  },
  {
    slug: "ecom",
    name: "AURA Multi-Industry Luxury Commerce OS",
    type: "5-Vertical Retail Suite & PDF Generator",
    description: "Modular commerce suite adaptable across Eyewear, Apparel, Gourmet Food, Electronics, and Mobile Accessories with PDF financial reporting.",
    demoUrl: "https://hanidevinf.github.io/ecom/",
    github: "https://github.com/HANIDEVINF/ecom",
    technologies: ["React", "TypeScript", "PDF Reports", "Multi-Vertical"],
    badge: "Client Production",
  },
]

export default function ClientSystemsLiveLabPage() {
  const [selectedSystem, setSelectedSystem] = useState(clientSystems[0])

  return (
    <main className="min-h-screen bg-[#07050d] text-white">
      <Navigation />

      <section className="pt-32 pb-16 px-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.18),transparent_60%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/35 bg-purple-950/40 px-4 py-1.5 text-xs sm:text-sm text-purple-300 mb-6">
            <Store className="h-4 w-4 text-purple-400" />
            Live Client Systems & E-Commerce Showcase
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
            Live Commercial Client Systems & E-Commerce Live Lab
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mb-10 leading-relaxed font-light">
            Test live client e-commerce platforms, retail operating systems (OS Gérant), medical clinic software, and multi-role ERP suites deployed in Algiers, Sidi Bel Abbès, Mascara, and Birkhadem.
          </p>

          {/* System Switcher Tabs */}
          <div className="mb-10 flex flex-wrap gap-2">
            {clientSystems.map((sys) => (
              <button
                key={sys.slug}
                onClick={() => setSelectedSystem(sys)}
                className={`rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-2 ${
                  selectedSystem.slug === sys.slug
                    ? "bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white shadow-lg shadow-purple-500/25"
                    : "border border-purple-500/20 bg-[#120a22]/80 text-slate-300 hover:text-white hover:bg-[#1a0f30]"
                }`}
              >
                <Globe className="h-4 w-4" />
                {sys.name}
              </button>
            ))}
          </div>

          {/* Active System Showcase Box */}
          <div className="rounded-3xl border border-purple-500/35 bg-[#0e091e] p-6 sm:p-8 shadow-2xl shadow-purple-950/60 mb-16">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-purple-500/20">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="rounded-full border border-purple-500/30 bg-purple-950/60 px-3 py-0.5 text-xs font-semibold text-purple-300 font-mono">
                    {selectedSystem.badge}
                  </span>
                  <span className="text-xs font-mono text-purple-400">{selectedSystem.type}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">{selectedSystem.name}</h2>
                <p className="text-sm text-slate-300 mt-2 max-w-2xl font-light leading-relaxed">
                  {selectedSystem.description}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/25"
                  asChild
                >
                  <a href={selectedSystem.demoUrl} target="_blank" rel="noopener noreferrer">
                    Open Live App <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Live Interactive IFrame Preview Frame */}
            <div className="mt-8 rounded-2xl border border-purple-500/30 bg-[#070511] overflow-hidden shadow-2xl">
              <div className="bg-[#130b26] px-4 py-3 border-b border-purple-500/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-3 font-mono text-xs text-slate-400 truncate max-w-md">
                    {selectedSystem.demoUrl}
                  </span>
                </div>
                <span className="text-xs font-mono text-purple-300">Live Secure Preview</span>
              </div>
              <div className="relative w-full h-[650px] bg-[#0b0718]">
                <iframe
                  src={selectedSystem.demoUrl}
                  title={selectedSystem.name}
                  className="w-full h-full border-0"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
