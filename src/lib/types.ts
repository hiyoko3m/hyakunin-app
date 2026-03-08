export interface Poem {
  id: number;
  kamiNoKu: string;
  shimoNoKu: string;
  kamiNoKuKana: string;
  shimoNoKuKana: string;
  poet: string;
  poetKana: string;
}

export type CardCount = 10 | 25 | 50 | 100;

export interface QuizQuestion {
  poem: Poem;
  choices: Poem[];
  correctId: number;
}

export type GamePhase = "setup" | "quiz" | "feedback" | "result";

export interface AnswerRecord {
  question: QuizQuestion;
  selectedId: number | null;
  isCorrect: boolean;
}
