import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muhammad Arqam - Full-Stack Software Engineer & Solution Architect",
  description: "Full-Stack Software Engineer with 9+ years of experience. Expert in JavaScript, Node.js, AWS, Angular, MEAN/MERN Stack. Based in Lisbon, Portugal.",
  icons: {
    icon: [
      { url: '/codewitharqam-favicon.svg', type: 'image/svg+xml' },
      { url: '/codewitharqam-logo.svg', type: 'image/svg+xml', sizes: 'any' }
    ],
    apple: [
      { url: '/codewitharqam-logo.svg', sizes: '180x180', type: 'image/svg+xml' }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
