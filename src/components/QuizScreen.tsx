"use client";

import { QuizQuestion } from "@/lib/types";
import { Card } from "@/components/ui/Card";

interface QuizScreenProps {
  question: QuizQuestion;
  currentIndex: number;
  totalCount: number;
  onAnswer: (poemId: number) => void;
}

export function QuizScreen({
  question,
  currentIndex,
  totalCount,
  onAnswer,
}: QuizScreenProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl">
        {/* 進捗 */}
        <div className="mb-2 flex items-center justify-between text-sm text-sumi/60">
          <span>
            第 {currentIndex + 1} 首 / {totalCount} 首
          </span>
          <span>{Math.round(((currentIndex + 1) / totalCount) * 100)}%</span>
        </div>
        <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-karuta-border/40">
          <div
            className="h-full rounded-full bg-indigo-wa transition-all"
            style={{ width: `${((currentIndex + 1) / totalCount) * 100}%` }}
          />
        </div>

        {/* 下の句カード */}
        <Card highlighted className="mb-6 text-center">
          <p className="mb-1 text-xs text-sumi/50">下の句</p>
          <p
            className="text-2xl leading-relaxed text-sumi md:text-3xl"
            style={{ fontFamily: "var(--font-serif-jp)" }}
          >
            {question.poem.shimoNoKu}
          </p>
        </Card>

        {/* 選択肢 */}
        <p className="mb-3 text-center text-sm text-sumi/60">
          上の句を選んでください
        </p>
        <div className="space-y-3">
          {question.choices.map((poem) => (
            <button
              key={poem.id}
              onClick={() => onAnswer(poem.id)}
              className="w-full rounded-lg border-2 border-karuta-border bg-karuta-bg px-5 py-4 text-left text-base text-sumi transition-colors hover:border-indigo-wa hover:bg-indigo-wa/5"
              style={{ fontFamily: "var(--font-serif-jp)" }}
            >
              {poem.kamiNoKu}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
