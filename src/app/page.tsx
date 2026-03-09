import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <h1
        className="mb-2 text-4xl font-bold text-sumi md:text-5xl"
        style={{ fontFamily: "var(--font-serif-jp)" }}
      >
        百人一首クイズ
      </h1>
      <p className="mb-10 text-sm text-sumi/60">
        下の句を見て、上の句を選ぶ練習ゲーム
      </p>
      <Link href="/quiz/">
        <Button size="lg">はじめる</Button>
      </Link>
      <Link
        href="/attribution"
        className="mt-8 text-xs text-sumi/40 underline underline-offset-2"
      >
        百人一首データの出典元
      </Link>
    </div>
  );
}
