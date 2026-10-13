import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trybe | Your people. Your next chapter.",
  description: "Meet relevant people at your next event. Trybe makes event networking convenient, with reusable profiles, mutual connections, and privacy on your terms.",
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
