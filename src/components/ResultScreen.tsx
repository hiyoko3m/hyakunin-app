"use client";

import { AnswerRecord, Poem } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface ResultScreenProps {
  records: AnswerRecord[];
  reviewLaterPoems: Poem[];
  onRestart: () => void;
  onStartReview: () => void;
}

function PoemCard({ poem }: { poem: Poem }) {
  return (
    <Card>
      <div style={{ fontFamily: "var(--font-serif-jp)" }}>
        <p className="text-base leading-relaxed text-sumi">{poem.kamiNoKu}</p>
        <p className="mt-1 text-base leading-relaxed text-sumi">
          {poem.shimoNoKu}
        </p>
      </div>
      <p className="mt-2 text-right text-sm text-sumi/50">{poem.poet}</p>
    </Card>
  );
}

export function ResultScreen({
  records,
  reviewLaterPoems,
  onRestart,
  onStartReview,
}: ResultScreenProps) {
  const correctCount = records.filter((r) => r.isCorrect).length;
  const wrongRecords = records.filter((r) => !r.isCorrect);
  const total = records.length;
  const percentage = Math.round((correctCount / total) * 100);

  const wrongPoemIds = new Set(wrongRecords.map((r) => r.question.poem.id));
  // 間違えた歌と重複しない復習マーク済み歌
  const reviewOnlyPoems = reviewLaterPoems.filter(
    (p) => !wrongPoemIds.has(p.id)
  );

  const hasReviewTarget = wrongRecords.length > 0 || reviewLaterPoems.length > 0;

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
              {wrongRecords.map((record, i) => (
                <PoemCard key={i} poem={record.question.poem} />
              ))}
            </div>
          </div>
        )}

        {/* あとで復習リスト（間違えた歌と重複しないもの） */}
        {reviewOnlyPoems.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-sumi">
              <span className="text-kincha">★</span>
              あとで復習（{reviewOnlyPoems.length}首）
            </h2>
            <div className="space-y-4">
              {reviewOnlyPoems.map((poem, i) => (
                <PoemCard key={i} poem={poem} />
              ))}
            </div>
          </div>
        )}

        {wrongRecords.length === 0 && reviewLaterPoems.length === 0 && (
          <p className="mb-8 text-center text-lg font-medium text-indigo-wa">
            全問正解！素晴らしい！
          </p>
        )}

        {/* ボタン */}
        <div className="space-y-3">
          {hasReviewTarget && (
            <Button
              size="lg"
              className="w-full"
              onClick={onStartReview}
            >
              復習する（
              {wrongRecords.length + reviewOnlyPoems.length}首）
            </Button>
          )}
          <Button
            size="lg"
            variant="secondary"
            className="w-full"
            onClick={onRestart}
          >
            もう一度（最初から）
          </Button>
        </div>
      </div>
    </div>
  );
}
