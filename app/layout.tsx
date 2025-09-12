import "./globals.css";

export const metadata = {
  title: "Regulina-T™ — Thymus Immunoregulator Platform",
  description: "A unique breakthrough uniting science and faith."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
export const metadata = {
  title: "Regulina-T™ — Thymus Immunoregulator Platform",
  description: "A unique breakthrough uniting science and faith in immunoregulation.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    url: "https://regulina-t-jg5l.vercel.app",
    title: "Regulina-T™ — Thymus Immunoregulator Platform",
    description: "A unique breakthrough uniting science and faith in immunoregulation.",
    images: [
      {
        url: "https://regulina-t-jg5l.vercel.app/og-regulina.png",
        width: 1200,
        height: 630,
        alt: "Regulina-T™ Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Regulina-T™ — Thymus Immunoregulator Platform",
    description: "A unique breakthrough uniting science and faith in immunoregulation.",
    images: ["https://regulina-t-jg5l.vercel.app/og-regulina.png"],
  },
};
