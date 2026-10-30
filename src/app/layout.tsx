import type { Metadata, Viewport } from "next";
import { Russo_One, Chakra_Petch } from "next/font/google";
import "./globals.css";

const russoOne = Russo_One({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
});

const chakraPetch = Chakra_Petch({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const BASE_URL = "https://flarosmp.lumexhosting.xyz";

export const viewport: Viewport = {
  themeColor: "#ff6b1a",
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "FlaroSMP | #1 Minecraft Survival Server",
    template: "%s | FlaroSMP",
  },
  description:
    "Join FlaroSMP — a custom Minecraft Java & Bedrock survival server with unique enchants, player economy, land claims, fair PvP and active staff. IP: play.flarosmp.net",
  keywords: [
    "FlaroSMP",
    "Minecraft server",
    "Minecraft SMP",
    "survival server",
    "Minecraft Java server",
    "Minecraft Bedrock server",
    "custom enchants",
    "player economy",
    "play.flarosmp.net",
  ],
  authors: [{ name: "FlaroSMP" }],
  creator: "FlaroSMP",
  publisher: "FlaroSMP",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: { url: "/icon.png", sizes: "512x512" },
    shortcut: "/icon.png",
  },
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "FlaroSMP",
    title: "FlaroSMP | #1 Minecraft Survival Server",
    description:
      "Custom Minecraft SMP with unique enchants, player economy, fair PvP and active staff. Join now at play.flarosmp.net",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "FlaroSMP Logo",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "FlaroSMP | #1 Minecraft Survival Server",
    description:
      "Custom Minecraft SMP with unique enchants, player economy, fair PvP and active staff. Join now at play.flarosmp.net",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" type="image/png" sizes="512x512" />
        <link rel="apple-touch-icon" href="/icon.png" />
      </head>
      <body className={`${russoOne.variable} ${chakraPetch.variable}`}>{children}</body>
    </html>
  );
}
