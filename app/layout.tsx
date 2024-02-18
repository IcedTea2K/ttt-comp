import { GeistSans } from "geist/font/sans";
import { Itim } from "next/font/google";

import "./globals.css";

const defaultUrl = "http://localhost:3000";

const itim = Itim({
  weight: '400',
  subsets: ['latin']
})

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Tic-Tac-Toe Competitive (but not really)",
  description: "A way to play with your friend over the internet.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={itim.className}>
      <body className="bg-[#F4F3EE] text-black">
        <main className="min-h-screen flex flex-col items-center py-2">
          {children}
        </main>
      </body>
    </html>
  );
}
