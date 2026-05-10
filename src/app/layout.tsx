import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
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
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className="flex-1">{children}</main>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
