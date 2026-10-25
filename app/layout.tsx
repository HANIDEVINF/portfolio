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
  metadataBase: new URL('https://myportfolio-rho-seven-15.vercel.app'),
  title: 'Hani Ghena | Applied AI Engineer | Deep Learning, NLP & LLM Systems',
  description: 'Portfolio of Hani Ghena — Applied AI Engineer & M.Sc. in Artificial Intelligence candidate at USTHB (2025–2027), CERIST AI Researcher (2024–2025). Specializing in Deep Learning, Transformers, Biomedical Signal Processing, RAG & LLM Evaluation.',
  keywords: ['Applied AI Engineer', 'Machine Learning', 'Deep Learning', 'PyTorch', 'Transformers', 'BERT', 'ECG Arrhythmia', 'MedGuardAI', 'MuCAT', 'RAG', 'Agentic AI', 'LLM Evaluation', 'USTHB', 'CERIST'],
  authors: [{ name: 'Hani Ghena' }],
  creator: 'Hani Ghena',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Hani Ghena | Applied AI Engineer | Deep Learning, NLP & LLM Systems',
    description: 'Applied AI Engineer specializing in Deep Learning, Multilingual Transformers, Healthcare AI, RAG, and Production Systems.',
    siteName: 'Hani Ghena Portfolio',
    images: ['/images/profile-square.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hani Ghena | Applied AI Engineer | Deep Learning, NLP & LLM Systems',
    description: 'Applied AI Engineer specializing in Deep Learning, Multilingual Transformers, Healthcare AI, RAG, and Production Systems.',
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
