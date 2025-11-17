import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

export const keyPressed = (key: string) => {
  // ici il faut checker quelle input est focus et envoyer la touche pressée à cette input
  const focusedField = TextInput.State.currentlyFocusedInput();
  if (focusedField) {
    switch (key) {
      case "ENTER":
        // Gérer la soumission du mot
        console.log("Mot soumis");
        break;
      case "⌫":
        // Gérer la suppression du caractère précédent
        (focusedField as any).clear();
        break;
      default:
        // Ajouter le caractère à l'input focusée
        (focusedField as any).setNativeProps({ text: key });
        console.log(`Touche pressée: ${key}`);
        break;
    }
  }
};
const Guess = (
  { word }: { word: string },
  {
    keys,
    setKeys,
  }: { keys: string[]; setKeys: React.Dispatch<React.SetStateAction<string[]>> }
) => {
  const handleChange = (index: number) => (text: string) => {
    if (text.length === 1 && index < word.length - 1) {
      inputRefs[index + 1].current?.focus();
    }
  };
  let inputs = [];
  let inputRefs = [React.useRef<TextInput | null>(null)];
  if (word !== undefined) {
    for (let i = 0; i < keys?.length; i++) {
      inputRefs.push(React.useRef<TextInput | null>(null));
      inputs.push(
        <TextInput
          key={i}
          style={styles.input}
          value={keys[i] || ""}
          maxLength={1}
          ref={inputRefs[i]}
          onChangeText={handleChange(i)}
        />
      );
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>{inputs}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
  },
  container: {
    marginTop: 20,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  input: {
    height: 50,
    borderColor: "#538D4E",
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 12,
    alignSelf: "center",
    flex: 1,
    textAlign: "center",
    marginHorizontal: 2,
  },
});

export default Guess;
