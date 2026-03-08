"use client";

import { useQuiz } from "@/hooks/useQuiz";
import { SetupScreen } from "@/components/SetupScreen";
import { QuizScreen } from "@/components/QuizScreen";
import { FeedbackScreen } from "@/components/FeedbackScreen";
import { ResultScreen } from "@/components/ResultScreen";

export default function QuizPage() {
  const {
    phase,
    question,
    currentIndex,
    totalCount,
    records,
    lastRecord,
    startSession,
    submitAnswer,
    advance,
    restart,
  } = useQuiz();

  if (phase === "setup") {
    return <SetupScreen onStart={startSession} />;
  }

  if (phase === "quiz" && question) {
    return (
      <QuizScreen
        question={question}
        currentIndex={currentIndex}
        totalCount={totalCount}
        onAnswer={submitAnswer}
      />
    );
  }

  if (phase === "feedback" && lastRecord) {
    return (
      <FeedbackScreen
        record={lastRecord}
        isLast={currentIndex === totalCount - 1}
        onNext={advance}
      />
    );
  }

  if (phase === "result") {
    return <ResultScreen records={records} onRestart={restart} />;
  }

  return null;
}
