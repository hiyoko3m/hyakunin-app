"use client";

import { useState, useCallback } from "react";
import { poems } from "@/data/poems";
import { buildSession } from "@/lib/quiz";
import {
  CardCount,
  GamePhase,
  QuizQuestion,
  AnswerRecord,
} from "@/lib/types";

interface QuizState {
  phase: GamePhase;
  questions: QuizQuestion[];
  currentIndex: number;
  records: AnswerRecord[];
  lastRecord: AnswerRecord | null;
}

const initialState: QuizState = {
  phase: "setup",
  questions: [],
  currentIndex: 0,
  records: [],
  lastRecord: null,
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

  const restart = useCallback(() => {
    setState(initialState);
  }, []);

  return {
    phase: state.phase,
    question: state.questions[state.currentIndex] ?? null,
    currentIndex: state.currentIndex,
    totalCount: state.questions.length,
    records: state.records,
    lastRecord: state.lastRecord,
    startSession,
    submitAnswer,
    advance,
    restart,
  };
}
