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
