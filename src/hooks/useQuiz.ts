"use client";

import { useState, useCallback } from "react";
import { poems } from "@/data/poems";
import { buildSession, buildReviewSession } from "@/lib/quiz";
import {
  CardCount,
  GamePhase,
  QuizQuestion,
  AnswerRecord,
  Poem,
} from "@/lib/types";

interface QuizState {
  phase: GamePhase;
  questions: QuizQuestion[];
  currentIndex: number;
  records: AnswerRecord[];
  lastRecord: AnswerRecord | null;
  reviewLaterIds: Set<number>;
}

const initialState: QuizState = {
  phase: "setup",
  questions: [],
  currentIndex: 0,
  records: [],
  lastRecord: null,
  reviewLaterIds: new Set(),
};

export function useQuiz() {
  const [state, setState] = useState<QuizState>(initialState);

  const startSession = useCallback((count: CardCount) => {
    const questions = buildSession(poems, count);
    setState({
      phase: "quiz",
      questions,
      currentIndex: 0,
      records: [],
      lastRecord: null,
      reviewLaterIds: new Set(),
    });
  }, []);

  const startReviewSession = useCallback((targets: Poem[]) => {
    const questions = buildReviewSession(targets, poems);
    setState({
      phase: "quiz",
      questions,
      currentIndex: 0,
      records: [],
      lastRecord: null,
      reviewLaterIds: new Set(),
    });
  }, []);

  const submitAnswer = useCallback((poemId: number) => {
    setState((prev) => {
      if (prev.phase !== "quiz") return prev;
      const question = prev.questions[prev.currentIndex];
      const isCorrect = poemId === question.correctId;
      const record: AnswerRecord = {
        question,
        selectedId: poemId,
        isCorrect,
      };
      return {
        ...prev,
        phase: "feedback",
        records: [...prev.records, record],
        lastRecord: record,
      };
    });
  }, []);

  const advance = useCallback(() => {
    setState((prev) => {
      if (prev.phase !== "feedback") return prev;
      const nextIndex = prev.currentIndex + 1;
      if (nextIndex >= prev.questions.length) {
        return { ...prev, phase: "result" };
      }
      return { ...prev, phase: "quiz", currentIndex: nextIndex };
    });
  }, []);

  const toggleReviewLater = useCallback((poemId: number) => {
    setState((prev) => {
      const next = new Set(prev.reviewLaterIds);
      if (next.has(poemId)) {
        next.delete(poemId);
      } else {
        next.add(poemId);
      }
      return { ...prev, reviewLaterIds: next };
    });
  }, []);

  const restart = useCallback(() => {
    setState(initialState);
  }, []);

  const reviewLaterPoems = state.questions
    .filter((q) => state.reviewLaterIds.has(q.poem.id))
    .map((q) => q.poem);

  return {
    phase: state.phase,
    question: state.questions[state.currentIndex] ?? null,
    currentIndex: state.currentIndex,
    totalCount: state.questions.length,
    records: state.records,
    lastRecord: state.lastRecord,
    reviewLaterIds: state.reviewLaterIds,
    reviewLaterPoems,
    startSession,
    startReviewSession,
    submitAnswer,
    advance,
    toggleReviewLater,
    restart,
  };
}
