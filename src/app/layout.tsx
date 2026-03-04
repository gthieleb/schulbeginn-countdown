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
    title: "Countdown zum Schulbeginn 2026",
    description: "Countdown zum Schulbeginn am 15. August 2026 - Klasse 1, Grundschule Stadtfeld",
    images: [
      {
        url: "https://9zexw0j4ok.execute-api.eu-central-1.amazonaws.com/og",
        width: 1200,
        height: 630,
        alt: "Countdown zum Schulbeginn 2026",
      },
    ],
    url: "https://gthieleb.github.io/schulbeginn-countdown",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Countdown zum Schulbeginn 2026",
    description: "Countdown zum Schulbeginn am 15. August 2026 - Klasse 1, Grundschule Stadtfeld",
    images: ["https://9zexw0j4ok.execute-api.eu-central-1.amazonaws.com/og"],
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
