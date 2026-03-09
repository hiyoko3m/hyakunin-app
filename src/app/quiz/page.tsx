"use client";

import { useState } from "react";
import { useQuiz } from "@/hooks/useQuiz";
import { SetupScreen } from "@/components/SetupScreen";
import { QuizScreen } from "@/components/QuizScreen";
import { FeedbackScreen } from "@/components/FeedbackScreen";
import { ResultScreen } from "@/components/ResultScreen";
import { DisplayMode } from "@/lib/types";

export default function QuizPage() {
  const {
    phase,
    question,
    currentIndex,
    totalCount,
    records,
    lastRecord,
    reviewLaterIds,
    reviewLaterPoems,
    startSession,
    startReviewSession,
    submitAnswer,
    advance,
    toggleReviewLater,
    restart,
  } = useQuiz();

  const [questionMode, setQuestionMode] = useState<DisplayMode>("kanji");
  const [choiceMode, setChoiceMode] = useState<DisplayMode>("kanji");

  const toggleQuestionMode = () =>
    setQuestionMode((m) => (m === "kanji" ? "kana" : "kanji"));
  const toggleChoiceMode = () =>
    setChoiceMode((m) => (m === "kanji" ? "kana" : "kanji"));

  if (phase === "setup") {
    return (
      <SetupScreen
        onStart={startSession}
        questionMode={questionMode}
        choiceMode={choiceMode}
        onToggleQuestionMode={toggleQuestionMode}
        onToggleChoiceMode={toggleChoiceMode}
      />
    );
  }

  if (phase === "quiz" && question) {
    return (
      <QuizScreen
        question={question}
        currentIndex={currentIndex}
        totalCount={totalCount}
        onAnswer={submitAnswer}
        questionMode={questionMode}
        choiceMode={choiceMode}
        isReviewLater={reviewLaterIds.has(question.poem.id)}
        onToggleReviewLater={() => toggleReviewLater(question.poem.id)}
      />
    );
  }

  if (phase === "feedback" && lastRecord) {
    return (
      <FeedbackScreen
        record={lastRecord}
        isLast={currentIndex === totalCount - 1}
        onNext={advance}
        questionMode={questionMode}
        choiceMode={choiceMode}
      />
    );
  }

  if (phase === "result") {
    const wrongPoems = records
      .filter((r) => !r.isCorrect)
      .map((r) => r.question.poem);
    const wrongPoemIds = new Set(wrongPoems.map((p) => p.id));
    const reviewOnlyPoems = reviewLaterPoems.filter(
      (p) => !wrongPoemIds.has(p.id)
    );
    const reviewTargets = [...wrongPoems, ...reviewOnlyPoems];

    return (
      <ResultScreen
        records={records}
        reviewLaterPoems={reviewLaterPoems}
        onRestart={restart}
        onStartReview={() => startReviewSession(reviewTargets)}
      />
    );
  }

  return null;
}
