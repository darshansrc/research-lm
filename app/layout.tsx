import type { Metadata } from "next";
import localFont from "next/font/local";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "ResearchLM | AI-Powered Research Assistant",
    template: "%s | ResearchLM",
  },
  description:
    "ResearchLM: Your AI-powered research assistant for analyzing data, taking notes, and creating diagrams from various sources including CSV, PDF, and more.",
  keywords: [
    "research",
    "AI",
    "data analysis",
    "note-taking",
    "diagram creation",
    "CSV",
    "PDF",
  ],
  authors: [{ name: "@darshansrc" }],
  creator: "@darshansrc",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://research-lm.vercel.app/",
    siteName: "ResearchLM",
    title: "ResearchLM | AI-Powered Research Assistant",
    description:
      "Analyze data, take notes, and create diagrams with AI-powered assistance.",
    images: [
      {
        url: "https://research-lm.vercel.app/opengraph-image",
        width: 1200,
        height: 630,
        alt: "ResearchLM - Your Research Assistant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ResearchLM | AI-Powered Research Assistant",
    description:
      "Analyze data, take notes, and create diagrams with AI-powered assistance.",
    creator: "@darshansrc",
    images: ["https://research-lm.vercel.app/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-neutral-900`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            {children}
            <Toaster richColors />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
