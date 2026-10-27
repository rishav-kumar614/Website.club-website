import type { Metadata, Viewport } from "next";
import { Sora, Inter } from "next/font/google";
import { SITE_URL } from "@/lib/content";
import "./globals.css";

const display = Sora({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });

const TITLE = "Website Club — 3D & Interactive Website Studio";
const DESCRIPTION =
  "Rent a premium 3D website, build a completely custom interactive experience, or transform your existing website with Website Club.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "Website Club",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Website Club",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f4f3ef",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`} data-theme="light" suppressHydrationWarning>
      <head>
        {/* Enables reveal animations only when JS runs, so content is never hidden without it. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js');document.documentElement.dataset.theme='light';",
          }}
        />
      </head>
      {/* extensions (e.g. ColorZilla's cz-shortcut-listen) inject attributes on <body> before hydration */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
