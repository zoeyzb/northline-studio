import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./clarity.css";
import "./motion-v2.css";
import "./motion-hotfix.css";
import "./recover-inspired.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://northline-studio-wheat.vercel.app"),
  applicationName: "Northline",
  title: {
    default: "Northline — Digital experiences for ambitious organizations",
    template: "%s — Northline",
  },
  description:
    "Northline is a digital studio for strategy, websites, products, interaction, and development—turning complex organizations and ideas into clear, credible, spatial digital experiences.",
  keywords: [
    "digital studio",
    "website strategy",
    "custom website design",
    "interactive website development",
    "digital product design",
    "information architecture",
    "3D web design",
    "motion design",
    "institutional website design",
  ],
  category: "design",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Northline — Make the digital presence impossible to ignore",
    description:
      "Strategy, design, motion, and development for digital experiences that feel clear, dimensional, and premium.",
    url: "/",
    siteName: "Northline",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Northline — Digital experiences for ambitious organizations",
    description:
      "Strategy, design, motion, and development for websites and digital products built around clarity, depth, and action.",
  },
  robots: { index: true, follow: true },
  other: { "codex-preview": "development" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#040a11",
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
