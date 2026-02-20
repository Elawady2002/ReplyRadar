import type { Metadata } from "next";
import "./globals.css";
import { SearchProvider } from "@/context/SearchContext";
import { Shell } from "@/components/layout/Shell";

export const metadata: Metadata = {
  title: "1-Tap Cashflow Pro | Executive Social Intelligence",
  description: "High-end discussion discovery and AI response generation engine.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#050505] text-white selection:bg-[#D4AF37]/30">
        <SearchProvider>
          <Shell>
            {children}
          </Shell>
        </SearchProvider>
      </body>
    </html>
  );
}
