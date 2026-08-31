import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";

import "./globals.css";

import { ThemeProvider } from "@/components/theme/ThemeProvider";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://johnny-xavier.vercel.app"),
  title: {
    default: "Johnny Xavier",
    template: "%s | Johnny Xavier",
  },
  description:
    "Portfólio de Johnny Xavier, desenvolvedor full-stack e UI/UX designer.",
  keywords: [
    "Johnny Xavier",
    "portfólio",
    "desenvolvedor full-stack",
    "UI/UX designer",
    "React",
    "Next.js",
    "TypeScript",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Johnny Xavier",
    title: "Johnny Xavier",
    description:
      "Portfólio de Johnny Xavier, desenvolvedor full-stack e UI/UX designer.",
    images: [
      {
        url: "/images/foto-hero.png",
        width: 1080,
        height: 1080,
        alt: "Johnny Xavier",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Johnny Xavier",
    description:
      "Portfólio de Johnny Xavier, desenvolvedor full-stack e UI/UX designer.",
    images: ["/images/foto-hero.png"],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Johnny Xavier",
  url: "https://johnny-xavier.vercel.app",
  jobTitle: "Desenvolvedor Full-Stack e UI/UX Designer",
  sameAs: [
    "https://github.com/xavierrjon",
    "https://www.linkedin.com/in/johnny-xavier/",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={geistMono.variable}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('portfolio-theme');var v=['midnight','dracula','nord','amber','matrix'];if(t&&v.indexOf(t)>-1)document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="scanlines min-h-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
