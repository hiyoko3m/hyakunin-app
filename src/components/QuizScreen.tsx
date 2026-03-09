"use client";

import { QuizQuestion, DisplayMode } from "@/lib/types";
import { Card } from "@/components/ui/Card";

interface QuizScreenProps {
  question: QuizQuestion;
  currentIndex: number;
  totalCount: number;
  onAnswer: (poemId: number) => void;
  questionMode: DisplayMode;
  choiceMode: DisplayMode;
  isReviewLater: boolean;
  onToggleReviewLater: () => void;
}

export function QuizScreen({
  question,
  currentIndex,
  totalCount,
  onAnswer,
  questionMode,
  choiceMode,
  isReviewLater,
  onToggleReviewLater,
}: QuizScreenProps) {
  const questionText =
    questionMode === "kanji"
      ? question.poem.shimoNoKu
      : question.poem.shimoNoKuKana;

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
        <Card highlighted className="relative mb-4 text-center">
          <button
            onClick={onToggleReviewLater}
            title={isReviewLater ? "あとで復習を解除" : "あとで復習に追加"}
            className={`absolute right-3 top-3 flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium transition-colors ${
              isReviewLater
                ? "bg-kincha/20 text-kincha"
                : "bg-sumi/5 text-sumi/30 hover:bg-kincha/10 hover:text-kincha/70"
            }`}
          >
            <span>{isReviewLater ? "★" : "☆"}</span>
            <span>あとで復習</span>
          </button>
          <p className="mb-1 mt-1 text-xs text-sumi/50">下の句</p>
          <p
            className="text-2xl leading-relaxed text-sumi md:text-3xl"
            style={{ fontFamily: "var(--font-serif-jp)" }}
          >
            {questionText}
          </p>
        </Card>

        {/* 選択肢 */}
        <p className="mb-3 text-center text-sm text-sumi/60">
          上の句を選んでください
        </p>
        <div className="space-y-3">
          {question.choices.map((poem) => {
            const choiceText =
              choiceMode === "kanji" ? poem.kamiNoKu : poem.kamiNoKuKana;
            return (
              <button
                key={poem.id}
                onClick={() => onAnswer(poem.id)}
                className="w-full rounded-lg border-2 border-karuta-border bg-karuta-bg px-5 py-4 text-left text-base text-sumi transition-colors hover:border-indigo-wa hover:bg-indigo-wa/5"
                style={{ fontFamily: "var(--font-serif-jp)" }}
              >
                {choiceText}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
