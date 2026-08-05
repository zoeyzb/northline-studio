import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://northline-studio-wheat.vercel.app"),
  title: {
    default: "Northline — Clear digital presence for complex organizations",
    template: "%s — Northline",
  },
  description:
    "Northline designs and builds clear, credible websites and digital platforms for universities, research programs, nonprofits, and expert organizations.",
  keywords: [
    "institutional website design",
    "university website design",
    "research program website",
    "nonprofit digital platform",
    "information architecture",
    "digital credibility",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Northline — Turn complex work into a clear digital presence",
    description:
      "Websites and digital platforms that connect a clear message, visible evidence, and a useful next action.",
    url: "/",
    siteName: "Northline",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Northline — Clear digital presence for complex organizations",
    description:
      "Institutional websites and digital platforms organized around message, evidence, and action.",
  },
  robots: { index: true, follow: true },
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
