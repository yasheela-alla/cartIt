import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "cartIt - Smart Shopping Cart",
  description: "A modern checkout experience with cart, payment, and confirmation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <header className="border-b border-zinc-200 dark:border-zinc-800">
            <div className="container py-4">
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                  <ShoppingBag className="h-6 w-6" />
                  <span className="text-xl font-bold">cartIt</span>
                </Link>
                <nav className="hidden md:flex items-center gap-6">
                  <Link href="/" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">Home</Link>
                  <Link href="/" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">Shop</Link>
                  <Link href="/" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">Categories</Link>
                  <Link href="/" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Cart</Link>
                </nav>
                <div className="flex items-center gap-4">
                  <Link href="/auth" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">Sign In</Link>
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1 bg-zinc-50 dark:bg-zinc-950">
            {children}
          </main>
          <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            <div className="container py-6">
              <div className="flex justify-center items-center">
                <div className="text-sm text-zinc-500 dark:text-zinc-400">
                  Made by Yasheela Alla © 2025
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
