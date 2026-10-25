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
  title: 'Ghena Hani | AI Engineering MSc Student | NLP, Deep Learning & LLMs',
  description: 'Portfolio of Ghena Hani, an AI Engineering M.Sc. student at USTHB. Explore projects in multilingual NLP, transformer models, ECG classification, model evaluation, and AI application development.',
  keywords: ['AI Engineering', 'Machine Learning', 'Deep Learning', 'PyTorch', 'Transformers', 'NLP', 'ECG Classification', 'MuCAT', 'RAG', 'LLM Evaluation', 'USTHB', 'CERIST'],
  authors: [{ name: 'Ghena Hani' }],
  creator: 'Ghena Hani',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Ghena Hani | AI Engineering MSc Student',
    description: 'Projects in multilingual NLP, transformer models, ECG classification, model evaluation, and AI application development.',
    siteName: 'Ghena Hani Portfolio',
    images: ['/images/profile-square.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ghena Hani | AI Engineering MSc Student',
    description: 'Projects in multilingual NLP, transformer models, ECG classification, model evaluation, and AI application development.',
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
