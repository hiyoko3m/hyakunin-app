import { Poem, CardCount, QuizQuestion } from "./types";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function buildSession(poems: Poem[], count: CardCount): QuizQuestion[] {
  const shuffled = shuffle(poems);
  const targets = shuffled.slice(0, count);

  return targets.map((poem) => {
    const others = shuffled.filter((p) => p.id !== poem.id);
    const wrong = shuffle(others).slice(0, 3);
    const choices = shuffle([poem, ...wrong]);
    return { poem, choices, correctId: poem.id };
  });
}
