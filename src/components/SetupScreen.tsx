"use client";

import { useState } from "react";
import { CardCount, DisplayMode } from "@/lib/types";
import { Button } from "@/components/ui/Button";

const COUNTS: CardCount[] = [10, 25, 50, 100];

interface SetupScreenProps {
  onStart: (count: CardCount) => void;
  questionMode: DisplayMode;
  choiceMode: DisplayMode;
  onToggleQuestionMode: () => void;
  onToggleChoiceMode: () => void;
}

function ModeToggle({
  label,
  mode,
  onToggle,
}: {
  label: string;
  mode: DisplayMode;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-sumi/70">{label}</span>
      <div className="flex overflow-hidden rounded-lg border-2 border-karuta-border">
        <button
          onClick={() => mode !== "kanji" && onToggle()}
          className={`px-4 py-1.5 text-sm font-medium transition-colors ${
            mode === "kanji"
              ? "bg-indigo-wa text-white"
              : "bg-karuta-bg text-sumi hover:bg-karuta-border/30"
          }`}
        >
          漢字
        </button>
        <button
          onClick={() => mode !== "kana" && onToggle()}
          className={`px-4 py-1.5 text-sm font-medium transition-colors ${
            mode === "kana"
              ? "bg-indigo-wa text-white"
              : "bg-karuta-bg text-sumi hover:bg-karuta-border/30"
          }`}
        >
          かな
        </button>
      </div>
    </div>
  );
}

export function SetupScreen({
  onStart,
  questionMode,
  choiceMode,
  onToggleQuestionMode,
  onToggleChoiceMode,
}: SetupScreenProps) {
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

      <div className="mb-6 w-full max-w-xs">
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

      <div className="mb-8 w-full max-w-xs space-y-3">
        <p className="text-center text-sm font-medium text-sumi/70">
          表示形式
        </p>
        <ModeToggle
          label="出題（下の句）"
          mode={questionMode}
          onToggle={onToggleQuestionMode}
        />
        <ModeToggle
          label="選択肢（上の句）"
          mode={choiceMode}
          onToggle={onToggleChoiceMode}
        />
      </div>

      <Button size="lg" onClick={() => onStart(selected)}>
        はじめる
      </Button>
    </div>
  );
}
