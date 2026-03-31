import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Providers } from "@/components/providers";
import { SITE_INFO } from "@/config/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_INFO.url),
  title: {
    default: SITE_INFO.name,
    template: `%s - ${SITE_INFO.name}`,
  },
  description: SITE_INFO.description,
  keywords: SITE_INFO.keywords,
  authors: [{ name: SITE_INFO.name, url: SITE_INFO.url }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_INFO.url,
    title: SITE_INFO.name,
    description: SITE_INFO.description,
    siteName: SITE_INFO.name,
    images: [
      {
        url: "/og_image.png",
        width: 1200,
        height: 630,
        alt: `${SITE_INFO.name} — Game Developer, Technical Artist & AI Engineer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_INFO.name,
    description: SITE_INFO.description,
    images: ["/og_image.png"],
  },
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Dominik Strzalko",
              url: SITE_INFO.url,
              image: `${SITE_INFO.url}/images/avatar.jpg`,
              jobTitle: "Game Developer, Technical Artist & AI Engineer",
              worksFor: { "@type": "Organization", name: "SnowyCocoon" },
              address: { "@type": "PostalAddress", addressLocality: "Poznan", addressCountry: "PL" },
              sameAs: [
                "https://github.com/SnowyCocoon",
                "https://www.linkedin.com/in/snowycocoon/",
              ],
              knowsAbout: [
                "Game Development", "Unity", "Godot", "Unreal Engine",
                "Technical Art", "Shaders", "VFX", "Substance Designer",
                "Artificial Intelligence", "Machine Learning", "Computer Vision", "NLP",
              ],
            }),
          }}
        />
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
