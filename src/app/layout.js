import { M_PLUS_1_Code, Manrope, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import CookieConsent from "@/components/shared/CookieConsent";
import { AuthProvider } from "@/lib/auth-provider";
import { Toaster } from "sonner";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: "400",
});
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: "400",
});

const mplusone = M_PLUS_1_Code({
  variable: "--font-m-plus-1-code",
  subsets: ["latin"],
});

// themeColor must be in viewport export, not metadata (Next.js App Router)
export const viewport = {
  themeColor: "#000000",
};

export const metadata = {
  title: "Lenzro",
  description: "The operating system for modern businesses and startups",
  metadataBase: new URL("https://lenzro.com/"),
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Lenzro",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: "Lenzro",
    description: "The operating system for modern businesses and startups",
    url: "https://lenzro.com/",
    siteName: "Lenzro",
    images: [
      {
        url: "/window.svg",
        width: 1200,
        height: 630,
        alt: "Lenzro Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lenzro",
    description: "The operating system for modern businesses and startups",
    site: "@lenzro",
    creator: "@lenzro",
    images: ["/window.svg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${mplusone.variable} ${outfit.variable} ${manrope.variable} antialiased light`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="icon"
          href="https://1j8rp7fkdq62hja2.public.blob.vercel-storage.com/Plugin%20icon%20-%202%20%281%29.png"
        />
        <link
          rel="apple-touch-icon"
          href="https://1j8rp7fkdq62hja2.public.blob.vercel-storage.com/Plugin%20icon%20-%202%20%281%29.png"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <CookieConsent />
            {children}
            <Toaster position="top-center" richColors />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
