"use client";

import { AnswerRecord } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface ResultScreenProps {
  records: AnswerRecord[];
  onRestart: () => void;
}

export function ResultScreen({ records, onRestart }: ResultScreenProps) {
  const correctCount = records.filter((r) => r.isCorrect).length;
  const wrongRecords = records.filter((r) => !r.isCorrect);
  const total = records.length;
  const percentage = Math.round((correctCount / total) * 100);

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="mx-auto max-w-xl">
        {/* スコア */}
        <div className="mb-10 text-center">
          <p
            className="mb-1 text-6xl font-bold text-indigo-wa"
            style={{ fontFamily: "var(--font-serif-jp)" }}
          >
            {correctCount}
            <span className="text-3xl text-sumi/40"> / {total}</span>
          </p>
          <p className="text-lg text-sumi/60">{percentage}% 正解</p>
        </div>

        {/* 間違えた歌一覧 */}
        {wrongRecords.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-4 text-base font-semibold text-sumi">
              間違えた歌（{wrongRecords.length}首）
            </h2>
            <div className="space-y-4">
              {wrongRecords.map((record, i) => {
                const poem = record.question.poem;
                return (
                  <Card key={i}>
                    <div style={{ fontFamily: "var(--font-serif-jp)" }}>
                      <p className="text-base leading-relaxed text-sumi">
                        {poem.kamiNoKu}
                      </p>
                      <p className="mt-1 text-base leading-relaxed text-sumi">
                        {poem.shimoNoKu}
                      </p>
                    </div>
                    <p className="mt-2 text-right text-sm text-sumi/50">
                      {poem.poet}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {wrongRecords.length === 0 && (
          <p className="mb-8 text-center text-lg text-indigo-wa font-medium">
            全問正解！素晴らしい！
          </p>
        )}

        <Button size="lg" className="w-full" onClick={onRestart}>
          もう一度
        </Button>
      </div>
    </div>
  );
}
