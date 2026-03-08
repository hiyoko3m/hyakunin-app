"use client";

import { AnswerRecord, DisplayMode } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface FeedbackScreenProps {
  record: AnswerRecord;
  isLast: boolean;
  onNext: () => void;
  questionMode: DisplayMode;
  choiceMode: DisplayMode;
}

export function FeedbackScreen({
  record,
  isLast,
  onNext,
  questionMode,
  choiceMode,
}: FeedbackScreenProps) {
  const { question, selectedId, isCorrect } = record;
  const correctPoem = question.poem;

  const kamiText =
    choiceMode === "kanji" ? correctPoem.kamiNoKu : correctPoem.kamiNoKuKana;
  const shimoText =
    questionMode === "kanji" ? correctPoem.shimoNoKu : correctPoem.shimoNoKuKana;

  const selectedPoem = question.choices.find((c) => c.id === selectedId);
  const selectedText = selectedPoem
    ? choiceMode === "kanji"
      ? selectedPoem.kamiNoKu
      : selectedPoem.kamiNoKuKana
    : null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl">
        {/* 正解 / 不正解アイコン */}
        <div className="mb-6 text-center">
          {isCorrect ? (
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full border-4 border-indigo-wa bg-indigo-wa/10">
              <span className="text-4xl font-bold text-indigo-wa">◯</span>
            </div>
          ) : (
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full border-4 border-kurenai bg-kurenai/10">
              <span className="text-4xl font-bold text-kurenai">✕</span>
            </div>
          )}
          <p className="mt-2 text-sm font-medium text-sumi/60">
            {isCorrect ? "正解！" : "不正解"}
          </p>
        </div>

        {/* 自分の選択（不正解時） */}
        {!isCorrect && selectedText !== null && (
          <div className="mb-3">
            <p className="mb-1 text-xs text-sumi/40">あなたの選択</p>
            <Card className="border-kurenai/40 opacity-60">
              <p
                className="text-base text-sumi line-through"
                style={{ fontFamily: "var(--font-serif-jp)" }}
              >
                {selectedText}
              </p>
            </Card>
          </div>
        )}

        {/* 正解の全文カード */}
        <Card highlighted className="mb-6">
          {!isCorrect && (
            <p className="mb-2 text-xs font-medium text-indigo-wa">正解</p>
          )}
          <div style={{ fontFamily: "var(--font-serif-jp)" }}>
            <p className="mb-1 text-xs text-sumi/40">上の句</p>
            <p className="mb-3 text-xl leading-relaxed text-sumi">
              {kamiText}
            </p>
            <p className="mb-1 text-xs text-sumi/40">下の句</p>
            <p className="mb-3 text-xl leading-relaxed text-sumi">
              {shimoText}
            </p>
          </div>
          <p className="text-right text-sm text-sumi/60">{correctPoem.poet}</p>
        </Card>

        <Button size="lg" className="w-full" onClick={onNext}>
          {isLast ? "けっかを見る" : "つぎへ"}
        </Button>
      </div>
    </div>
  );
}
