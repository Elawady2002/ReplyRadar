import type { Metadata } from "next";
import "./globals.css";
import { SearchProvider } from "@/context/SearchContext";
import { Sidebar } from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "ReplyRadar Pro | Executive Social Intelligence",
  description: "High-end discussion discovery and AI response generation engine.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex h-screen overflow-hidden bg-[#080808]">
        <SearchProvider>
          <Sidebar />
          <main className="flex-1 overflow-y-auto scroll-smooth relative">
            <div className="px-16 py-16 max-w-7xl mx-auto min-h-full flex flex-col">
              {children}
            </div>
          </main>
        </SearchProvider>
      </body>
    </html>
  );
}
