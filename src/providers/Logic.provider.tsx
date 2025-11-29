import { faker } from "@faker-js/faker";
import { createContext, ReactNode, useState } from "react";

export const randomWord: string = faker.lorem.word();

interface KeyContextType {
  keys: string[];
  setKeys: (keys: string[]) => void;
}

export const KeyContext = createContext<KeyContextType>({
  keys: [],
  setKeys: () => {},
});

export const LogicProvider = ({ children }: { children: ReactNode }) => {
  const [keys, setKeys] = useState<string[]>([]);
  return (
    <KeyContext.Provider value={{ keys, setKeys }}>
      {children}
    </KeyContext.Provider>
  );
};
