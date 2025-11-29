import { faker } from "@faker-js/faker";
import { createContext, ReactNode, useState } from "react";

export const randomWord: string = faker.lorem.word().toUpperCase();

export type LetterStatus = "correct" | "present" | "absent" | "empty";

export interface GuessRow {
  letters: string[];
  statuses: LetterStatus[];
  submitted: boolean;
}

interface KeyContextType {
  keys: string[];
  setKeys: (keys: string[]) => void;
  guesses: GuessRow[];
  setGuesses: React.Dispatch<React.SetStateAction<GuessRow[]>>;
  currentRow: number;
  setCurrentRow: React.Dispatch<React.SetStateAction<number>>;
  keyboardColors: Record<string, LetterStatus>;
  setKeyboardColors: React.Dispatch<
    React.SetStateAction<Record<string, LetterStatus>>
  >;
  submitGuess: () => void;
}

export const KeyContext = createContext<KeyContextType>({
  keys: [],
  setKeys: () => {},
  guesses: [],
  setGuesses: () => {},
  currentRow: 0,
  setCurrentRow: () => {},
  keyboardColors: {},
  setKeyboardColors: () => {},
  submitGuess: () => {},
});

const createEmptyGuesses = (): GuessRow[] => {
  return Array.from({ length: 6 }, () => ({
    letters: Array(randomWord.length).fill(""),
    statuses: Array(randomWord.length).fill("empty" as LetterStatus),
    submitted: false,
  }));
};

export const LogicProvider = ({ children }: { children: ReactNode }) => {
  const [keys, setKeys] = useState<string[]>([]);
  const [guesses, setGuesses] = useState<GuessRow[]>(createEmptyGuesses());
  const [currentRow, setCurrentRow] = useState<number>(0);
  const [keyboardColors, setKeyboardColors] = useState<
    Record<string, LetterStatus>
  >({});

  const submitGuess = () => {
    if (keys.length !== randomWord.length || currentRow >= 6) return;

    const newStatuses: LetterStatus[] = [];
    const wordLetters = randomWord.split("");
    const usedIndices: number[] = [];

    // Premier passage : trouver les lettres correctes (vertes)
    keys.forEach((letter, index) => {
      if (letter === wordLetters[index]) {
        newStatuses[index] = "correct";
        usedIndices.push(index);
      } else {
        newStatuses[index] = "absent";
      }
    });

    // Deuxième passage : trouver les lettres présentes (jaunes)
    keys.forEach((letter, index) => {
      if (newStatuses[index] !== "correct") {
        const foundIndex = wordLetters.findIndex(
          (wl, wi) => wl === letter && !usedIndices.includes(wi)
        );
        if (foundIndex !== -1) {
          newStatuses[index] = "present";
          usedIndices.push(foundIndex);
        }
      }
    });

    // Mettre à jour les couleurs du clavier
    const newKeyboardColors = { ...keyboardColors };
    keys.forEach((letter, index) => {
      const status = newStatuses[index];
      const currentStatus = newKeyboardColors[letter];

      // Priorité : correct > present > absent
      if (status === "correct") {
        newKeyboardColors[letter] = "correct";
      } else if (status === "present" && currentStatus !== "correct") {
        newKeyboardColors[letter] = "present";
      } else if (status === "absent" && !currentStatus) {
        newKeyboardColors[letter] = "absent";
      }
    });
    setKeyboardColors(newKeyboardColors);

    // Mettre à jour les guesses
    setGuesses((prev) => {
      const newGuesses = [...prev];
      newGuesses[currentRow] = {
        letters: [...keys],
        statuses: newStatuses,
        submitted: true,
      };
      return newGuesses;
    });

    // Passer à la ligne suivante
    setCurrentRow((prev) => prev + 1);
    setKeys([]);
  };

  return (
    <KeyContext.Provider
      value={{
        keys,
        setKeys,
        guesses,
        setGuesses,
        currentRow,
        setCurrentRow,
        keyboardColors,
        setKeyboardColors,
        submitGuess,
      }}
    >
      {children}
    </KeyContext.Provider>
  );
};
