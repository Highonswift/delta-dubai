// app/layout.tsx

import type { Metadata } from "next";
import { Montserrat, Geist, Geist_Mono,Inter } from "next/font/google";
import Script from 'next/script';
import "./globals.css";
const inter = Inter({ 
  subsets: ['latin'],
  weight: ['400', '700'] // 400 for regular, 700 for bold
})
// 2. Configure Montserrat just like the others, creating a CSS variable for it
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"], // The weights you need from the old project
  variable: "--font-montserrat", // We will use this in globals.css
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Delta Dubai',
  description: 'Top vehicle transport services.',
};
export default function RootLayout({children,}: {children: React.ReactNode;}) {
  return (
    <html lang="en">
      <head>
      <Script id="trata-config" strategy="beforeInteractive">
          {`
            window.trataConfig = {
                agentId: "aia.1750260080.UnkLvnbM",
                token: "ck_1750260145pZqGoNKBfUxnlBhDek0KJ3yOTOsYUKyb",
                selector: '#trata-widget-container',
                isOpen: false,
                color: { primary: '#4CB2BA', secondary: '#1A1A1A', border: '#BO8D57', text: '#0A0A0A' }
            };
          `}
      </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased`}>
        {children}
        <div id="trata-widget-container"></div>
        <Script 
          src="https://widget.trata.ai/widget-loader.js" 
          strategy="afterInteractive" 
          async 
        />
      </body>
    </html>
  );
}