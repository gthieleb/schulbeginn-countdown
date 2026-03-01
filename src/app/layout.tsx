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
  title: "Schulbeginn Countdown 2026",
  description: "Countdown zum Schulbeginn am 15. August 2026 in Sachsen-Anhalt",
  openGraph: {
    title: "Noch {days} Tage bis zum Schulbeginn 2026!",
    description: "Countdown zum Schulbeginn am 15. August 2026 - Klasse 1, Grundschule Stadtfeld",
    images: [
      {
        url: "https://gthieleb.github.io/schulbeginn-countdown/og-image",
        width: 1200,
        height: 630,
        alt: "Schulbeginn Countdown Vorschau",
      },
    ],
    url: "https://gthieleb.github.io/schulbeginn-countdown",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
