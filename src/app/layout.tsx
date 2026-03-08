import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "百人一首クイズ",
  description: "百人一首の下の句から上の句を当てる練習ゲーム",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">{children}</body>
    </html>
  );
}
