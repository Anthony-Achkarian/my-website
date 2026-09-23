import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ScrollProgress from "./components/ScrollProgress";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://arkindustriestech.com"),
  title: {
    default: "Ark Industries — Robotics & Compute",
    template: "%s — Ark Industries",
  },
  description:
    "Ark Industries operates at the intersection of artificial intelligence, advanced robotics, and real estate development — shaping the infrastructure of tomorrow.",
  openGraph: {
    type: "website",
    siteName: "Ark Industries",
    title: "Ark Industries — Robotics & Compute",
    description:
      "Artificial intelligence, advanced robotics, and real estate development — engineered into the infrastructure of tomorrow.",
    url: "https://arkindustriestech.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ark Industries — Robotics & Compute",
    description:
      "Artificial intelligence, advanced robotics, and real estate development — engineered into the infrastructure of tomorrow.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a1628",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
