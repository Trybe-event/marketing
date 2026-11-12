import type { Metadata } from "next";
import "./globals.css";
import "./community-effects.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://trybe-zeta.vercel.app",
  ),
  title: "Trybe | Your people. Your next chapter.",
  description:
    "Meet relevant people at your next event. Trybe makes event networking convenient, with reusable profiles, mutual connections, and privacy on your terms.",
  openGraph: {
    type: "website",
    siteName: "Trybe",
    title: "Trybe | Your people. Your next chapter.",
    description:
      "Discover events, meet your people and keep the conversation going. Fostering connection with convenience.",
    url: "/",
    images: [
      {
        url: "/images/trybe-share-v1.png",
        width: 1200,
        height: 630,
        alt: "Trybe. Your people. Your next chapter.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trybe | Your people. Your next chapter.",
    description: "Fostering connection with convenience.",
    images: ["/images/trybe-share-v1.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
