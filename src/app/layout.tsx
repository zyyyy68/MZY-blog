import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import SessionProvider from "@/components/session-provider";

export const metadata: Metadata = {
  title: "MZY Blog",
  description: "A personal blog built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-full flex flex-col font-sans antialiased">
        <SessionProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
