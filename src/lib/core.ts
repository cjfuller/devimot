import { browser } from "$app/env";
import words from "./word-list";

const lookup: { [word: string]: boolean } = {};
words.forEach((it) => (lookup[it] = true));

export type CurrRowState = {
  guess: string;
  result: null | GuessResult;
};

export type CommittedRowState = {
  guess: string;
  result: Statuses;
};

export type State = {
  serialVersionID: number;
  target: string;
  puzzleNumber: number;
  lockedGuesses: CommittedRowState[];
  currRow: CurrRowState;
  result: GameResult;
};

const settingsKey = "__settings";
const settingsVersion = 1;

export type Settings = {
  serialVersionID: number;
  colors: Colors;
};

export const loadSettings = (): Settings => {
  if (browser) {
    const maybeStored = globalThis?.localStorage?.getItem(settingsKey);
    if (maybeStored != null) {
      const parsed: Settings = JSON.parse(maybeStored);
      if (parsed.serialVersionID === settingsVersion) {
        return parsed;
      }
    }
  }
  return {
    serialVersionID: settingsVersion,
    colors: "standard",
  };
};

export const saveSettings = (s: Settings) => {
  globalThis?.localStorage?.setItem(settingsKey, JSON.stringify(s));
};

export type Colors = "standard" | "cb-friendly";
export type Status = "non" | "ailleurs" | "exact" | "inconnu";
export type GameResult = "win" | "loss" | "in-progress";
export const numLetters = 5;
export const numGuesses = 6;
export type Statuses = [Status, Status, Status, Status, Status];

export type ValidGuess = { t: "valid"; guess: string; statuses: Statuses };
export type GuessResult = { t: "invalid"; guess: string } | ValidGuess;

const startDate = 1642050000000;

export const allUnknown: Statuses = ["inconnu", "inconnu", "inconnu", "inconnu", "inconnu"];

export const storageKey = (s: State): string => `puzzle#${s.puzzleNumber}`;

const iterChars = (s: string): string[] => {
  const output: string[] = [];
  for (let i = 0; i < numLetters; i++) {
    output.push(s.charAt(i));
  }
  return output;
};

export const statusForLetter = (state: State, letter: string): Status => {
  const hasHit = state.lockedGuesses.some((rowState) =>
    iterChars(rowState.guess).some((c, i) => c === letter && rowState.result[i] == "exact"),
  );

  if (hasHit) {
    return "exact";
  }

  const hasElsewhere = state.lockedGuesses.some((rowState) =>
    iterChars(rowState.guess).some((c, i) => c === letter && rowState.result[i] == "ailleurs"),
  );

  if (hasElsewhere) {
    return "ailleurs";
  }

  const hasNo = state.lockedGuesses.some((rowState) =>
    iterChars(rowState.guess).some((c, i) => c === letter && rowState.result[i] == "non"),
  );

  if (hasNo) {
    return "non";
  }

  return "inconnu";
};

export const newState = (puzzleNumber?: number | undefined): State => {
  const target = targetForNumber(puzzleNumber);
  const defaultState: State = {
    serialVersionID: 1,
    puzzleNumber: target[0],
    target: target[1],
    lockedGuesses: [],
    currRow: { guess: "     ", result: null },
    result: "in-progress",
  };

  if (browser) {
    const maybeStored = globalThis?.localStorage?.getItem(storageKey(defaultState));
    if (maybeStored != null) {
      const parsed = JSON.parse(maybeStored);
      if (parsed.serialVersionID === defaultState.serialVersionID) {
        return parsed;
      }
    }
  }
  return defaultState;
};

export const turnsToWin = (s: State): number | null => {
  if (s.result !== "win") {
    return null;
  }
  return s.lockedGuesses.length;
};

const greenSquare = "🟩";
const yellowSquare = "🟨";
const greySquare = "⬛";

export const statusIntoGridSquare = (s: Status): string => {
  switch (s) {
    case "exact":
      return greenSquare;
    case "ailleurs":
      return yellowSquare;
    case "non":
    case "inconnu":
      return greySquare;
  }
};

export const rowIntoShareGrid = (r: CommittedRowState): string =>
  r.result.map(statusIntoGridSquare).join("");

export const stateIntoShareGrid = (s: State): string =>
  s.lockedGuesses.map(rowIntoShareGrid).join("\n");

export const countWinsByTurn = (): [{ [turns: number]: number }, number] => {
  let total = 0;
  let result: { [turns: number]: number } = { 10: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
  Object.keys(globalThis.localStorage)
    .filter((it) => it.startsWith("puzzle#"))
    .map((it) => JSON.parse(localStorage.getItem(it) as string))
    .map(turnsToWin)
    .forEach((it) => {
      if (it === null) {
        result[10] += 1;
      } else {
        result[it] += 1;
      }
      total += 1;
    });
  return [result, total];
};

export const isVictory = (s: State): boolean =>
  s.lockedGuesses.length > 0 &&
  s.lockedGuesses[s.lockedGuesses.length - 1].result.every((it) => it === "exact");

export const isDefeat = (s: State): boolean =>
  s.lockedGuesses.length === numGuesses &&
  s.lockedGuesses[numGuesses - 1].result.some((it) => it !== "exact");

export function targetForNumber(puzzleNumber: number | undefined): [number, string] {
  const offset = Math.floor((Date.now() - startDate) / 1000 / 60 / 60 / 24);
  const word = puzzleNumber ? words[puzzleNumber % words.length] : words[offset % words.length];
  return [offset, word];
}

export function commitGuess(guess: ValidGuess, state: State): State {
  const nextState = {
    ...state,
    lockedGuesses: [...state.lockedGuesses, { guess: guess.guess, result: guess.statuses }],
    currRow: { guess: "", result: null },
  };
  if (isVictory(nextState)) {
    nextState.result = "win";
  } else if (isDefeat(nextState)) {
    nextState.result = "loss";
  }
  globalThis.localStorage.setItem(storageKey(nextState), JSON.stringify(nextState));
  return nextState;
}

export function countCharsMatching(
  inString: string,
  matching: string,
  upToIndexInclusive?: number | undefined,
): number {
  let count = 0;
  const upperBound = upToIndexInclusive ?? inString.length - 1;
  for (let i = 0; i <= upperBound; i++) {
    if (inString.charAt(i) === matching) {
      count += 1;
    }
  }
  return count;
}

export function scoreGuess(guess: string, state: State): GuessResult {
  const target = state.target;
  if (!lookup[guess]) {
    return { t: "invalid", guess: guess };
  }
  const statuses: Status[] = [];
  for (let i = 0; i < numLetters; i++) {
    if (guess.charAt(i) == target.charAt(i)) {
      statuses.push("exact");
    } else if (target.includes(guess.charAt(i))) {
      const thisChar = guess.charAt(i);
      // Does the number of these in the target exceed the guess?
      if (countCharsMatching(target, thisChar) >= countCharsMatching(guess, thisChar)) {
        statuses.push("ailleurs");
        continue;
      } else {
        // Otherwise, do we have any left in the non-exact matches?
        let filteredTarget = "";
        for (let j = 0; j < target.length; j++) {
          if (guess.charAt(j) !== target.charAt(j)) {
            filteredTarget += target.charAt(j);
          }
        }

        const numRemaining = countCharsMatching(filteredTarget, thisChar);

        if (numRemaining > 0) {
          let count = 0;
          for (let j = 0; j < i; j++) {
            if (target.charAt(j) === thisChar) {
              count += 1;
            }
          }
          if (count < numRemaining) {
            statuses.push("ailleurs");
            continue;
          }
        }
      }
      statuses.push("non");
    } else {
      statuses.push("non");
    }
  }
  return { t: "valid", guess: guess, statuses: statuses as Statuses };
}
