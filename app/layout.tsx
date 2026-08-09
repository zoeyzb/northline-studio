import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./motion-polish.css";
import "./story.css";
import "./visual-variants.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://northline-studio-two.vercel.app"),
  title: {
    default: "Northline — Make important work impossible to overlook",
    template: "%s — Northline",
  },
  description:
    "Northline turns complex organizations into clear digital experiences through strategy, information architecture, design, development, and motion-led storytelling.",
  applicationName: "Northline",
  category: "design",
  keywords: [
    "institutional website design",
    "university website design",
    "research program website",
    "nonprofit digital platform",
    "information architecture",
    "digital storytelling",
    "digital credibility",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Northline — Make important work impossible to overlook",
    description:
      "Digital experiences that make complex organizations easier to understand, trust, and act on.",
    url: "/",
    siteName: "Northline",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Northline — Make important work impossible to overlook",
    description:
      "Strategy, design, development, and digital storytelling for complex organizations.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  other: { "codex-preview": "development" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#050b12",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
