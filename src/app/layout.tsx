import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Network Security & Packet Inspector App",
  description: "Advanced live packet capture stream, DNS parsing, and DAI spoofing defense inspector.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-neutral-950 text-emerald-50 min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
