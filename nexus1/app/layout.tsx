import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import Icon from "../public/logo/SEC_NEXUS_logo-removebg-preview.svg";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SEC-NEXUS",
  description: "Event Management Platform for St. Edmund's College",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Global Navigation with consistent styling */}
        <header className="absolute inset-x-0 top-0 z-50 bg-transparent">
          <nav className="flex items-center justify-between p-2 lg:px-8">
            <div className="flex lg:flex-1">
              <Link href="/">
                <Image src={Icon} height={100} width={200} alt="SEC Logo" />
              </Link>
            </div>
            
            <div className="hidden lg:flex lg:gap-x-4"> {/* Adjusted gap here */}
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-semibold leading-2 text-gray-900 hover:text-[#2e9cf0] transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        </header>
        
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
