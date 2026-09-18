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
  metadataBase: new URL('https://hanighena.dev'),
  title: 'Hani Ghena | AI Engineering Student & Full-Stack Developer',
  description: 'Portfolio of Hani Ghena - AI Engineering student building intelligent full-stack apps with Flutter, Python, and cloud AI tools. Explore projects, experience, and ideas.',
  keywords: ['AI Engineering', 'Full-Stack Developer', 'Flutter', 'Python', 'Machine Learning', 'Portfolio'],
  authors: [{ name: 'Hani Ghena' }],
  creator: 'Hani Ghena',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Hani Ghena | AI Engineering Student & Full-Stack Developer',
    description: 'Portfolio of Hani Ghena - AI Engineering student building intelligent full-stack apps.',
    siteName: 'Hani Ghena Portfolio',
    images: ['/images/profile-square.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hani Ghena | AI Engineering Student',
    description: 'AI Engineering student building intelligent full-stack apps.',
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
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
