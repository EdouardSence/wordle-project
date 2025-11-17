import { createContext, ReactNode } from "react";
import * as z from "zod";

const LogicContextType = z.object({
  keys: z.array(z.string()),
});
export type LogicContextType = z.infer<typeof LogicContextType>;
export const LogicContext = createContext<LogicContextType | undefined>(undefined);

export const keyPressed = (key: string) => {
  switch (key) {
    case "ENTER":
      // Gérer la soumission du mot
      console.log("Mot soumis");
      break;
    case "⌫":
      // Gérer la suppression du caractère précédent
      console.log("Caractère supprimé");
      break;
    default:
      // Ajouter le caractère à l'input focusée
      console.log(`Touche pressée: ${key}`);
      break;
  }
};

export const LogicProvider = ({ children }: { children: ReactNode }) => {
  return (
    <LogicContext.Provider value={{ keys: [] }}>
      {children}
    </LogicContext.Provider>
  );
};
