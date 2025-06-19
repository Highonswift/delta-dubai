// app/layout.tsx

import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'Delta Dubai',
  description: 'Top vehicle transport services.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
      <body>
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