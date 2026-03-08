"use client";

import { useState } from "react";
import { CardCount } from "@/lib/types";
import { Button } from "@/components/ui/Button";

const COUNTS: CardCount[] = [10, 25, 50, 100];

interface SetupScreenProps {
  onStart: (count: CardCount) => void;
}

export function SetupScreen({ onStart }: SetupScreenProps) {
  const [selected, setSelected] = useState<CardCount>(10);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <h1
        className="mb-2 text-4xl font-bold text-sumi md:text-5xl"
        style={{ fontFamily: "var(--font-serif-jp)" }}
      >
        百人一首クイズ
      </h1>
      <p className="mb-10 text-sm text-sumi/60">
        下の句を見て、上の句を選んでください
      </p>

      <div className="mb-8 w-full max-w-xs">
        <p className="mb-3 text-center text-sm font-medium text-sumi/70">
          問題数を選んでください
        </p>
        <div className="grid grid-cols-2 gap-3">
          {COUNTS.map((count) => (
            <button
              key={count}
              onClick={() => setSelected(count)}
              className={`rounded-lg border-2 py-4 text-lg font-bold transition-colors ${
                selected === count
                  ? "border-indigo-wa bg-indigo-wa text-white"
                  : "border-karuta-border bg-karuta-bg text-sumi hover:border-indigo-wa/50"
              }`}
            >
              {count}首
            </button>
          ))}
        </div>
      </div>

      <Button size="lg" onClick={() => onStart(selected)}>
        はじめる
      </Button>
    </div>
  );
}
