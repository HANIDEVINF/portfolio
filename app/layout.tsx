import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-mono"
});

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio-theta-seven-83.vercel.app'),
  title: 'Hani Ghena | AI Engineer & Full-Stack Systems Architect',
  description: 'Portfolio of Hani Ghena — AI Engineer & Master Researcher at USTHB and CERIST specializing in Deep Learning, Multilingual Transformers, Healthcare AI, RAG, Agentic Systems, and Commercial Software.',
  keywords: ['AI Engineering', 'Machine Learning', 'Deep Learning', 'PyTorch', 'Transformers', 'BERT', 'ECG Arrhythmia', 'MedGuardAI', 'RAG', 'Agentic AI', 'Full-Stack Architect', 'USTHB', 'CERIST'],
  authors: [{ name: 'Hani Ghena' }],
  creator: 'Hani Ghena',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Hani Ghena | AI Engineer & Full-Stack Systems Architect',
    description: 'Designing and shipping production AI systems, custom neural architectures, and enterprise software platforms.',
    siteName: 'Hani Ghena Portfolio',
    images: ['/images/profile-square.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hani Ghena | AI Engineer & Full-Stack Systems Architect',
    description: 'Designing and shipping production AI systems, custom neural architectures, and enterprise software platforms.',
    images: ['/images/profile-square.jpg'],
  },
  icons: {
    icon: '/icon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} bg-[#07050d]`}>
      <body className="font-sans antialiased bg-[#07050d] text-slate-100 selection:bg-purple-500/30 selection:text-white">
        {children}
      </body>
    </html>
  )
}
