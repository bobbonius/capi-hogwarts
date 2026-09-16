import "./globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { SiteHeader } from "./_components/site-header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Capi Hogwarts",
    template: "%s | Capi Hogwarts",
  },
  description: "Magical characters database",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang='en'
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className='min-h-full'>
        <div className='flex min-h-full flex-col'>
          <SiteHeader />
          <main className='flex-1 p-4'>{children}</main>
        </div>
      </body>
    </html>
  );
}
