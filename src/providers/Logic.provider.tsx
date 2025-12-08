import { createContext, ReactNode, useEffect, useState } from "react";

let BACKEND_URL: string = process.env.EXPO_PUBLIC_BACKEND_URL || 'http://localhost:3000';
const fetchWordOfTheDay = async () => {
  const response = await fetch(`${BACKEND_URL}/api/word-of-the-day`);
  const data = await response.json();
  return data.word;
};

export let randomWord: string = "";





export type LetterStatus = "correct" | "present" | "absent" | "empty";

export interface GuessRow {
  letters: string[];
  statuses: LetterStatus[];
  submitted: boolean;
}

export type GameStatus = "playing" | "won" | "lost";


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
  gameStatus: GameStatus;
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>;
}

export const KeyContext = createContext<KeyContextType>({
  keys: [],
  setKeys: () => { },
  guesses: [],
  setGuesses: () => { },
  currentRow: 0,
  setCurrentRow: () => { },
  keyboardColors: {},
  setKeyboardColors: () => { },
  submitGuess: () => { },
  gameStatus: "playing",
  setGameStatus: () => { },
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
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing");

  useEffect(() => {
    fetchWordOfTheDay().then(word => {
      randomWord = word;
      console.log('🎯 Word of the day fetched:', randomWord);
    }).catch(error => {
      console.error('❌ Error fetching word of the day:', error);
    });
  }, []);
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

    // Vérifier la victoire
    const isWin = newStatuses.every((status) => status === "correct");
    if (isWin) {
      setGameStatus("won");
      setKeys([]);
      return;
    }

    // Vérifier la défaite
    if (currentRow === 5) {
      setGameStatus("lost");
      setKeys([]);
      return;
    }

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
        gameStatus,
        setGameStatus,
      }}
    >
      {children}
    </KeyContext.Provider>
  );
};
