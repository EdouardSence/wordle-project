import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useContext } from "react";
import {
  KeyContext,
  randomWord,
  LetterStatus,
} from "../providers/Logic.provider";

const keysFR = [
  ["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["Q", "S", "D", "F", "G", "H", "J", "K", "L", "M"],
  ["ENTER", "W", "X", "C", "V", "B", "N", "⌫"],
];

const getKeyBackgroundColor = (status: LetterStatus | undefined): string => {
  switch (status) {
    case "correct":
      return "#538D4E"; // Vert
    case "present":
      return "#B59F3B"; // Jaune
    case "absent":
      return "#3A3A3C"; // Gris foncé
    default:
      return "#818384"; // Gris par défaut
  }
};

export default function Keyboard() {
  const { keys, setKeys, keyboardColors, submitGuess } = useContext(KeyContext);

  const handlePress = (key: string) => () => {
    switch (key) {
      case "ENTER":
        submitGuess();
        break;
      case "⌫":
        setKeys(keys.slice(0, -1));
        break;
      default:
        if (keys.length < randomWord.length) {
          setKeys([...keys, key]);
        }
        break;
    }
  };

  return (
    <View>
      {keysFR.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.container}>
          {row.map((key) => {
            const isSpecialKey = key === "ENTER" || key === "⌫";
            const backgroundColor = isSpecialKey
              ? "#818384"
              : getKeyBackgroundColor(keyboardColors[key]);

            return (
              <TouchableOpacity onPress={handlePress(key)} key={key}>
                <Text style={[styles.key, { backgroundColor }]}>{key}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
  key: {
    color: "#FFFFFF",
    fontSize: 18,
    margin: 3,
    paddingVertical: 10,
    paddingHorizontal: 10,
    minWidth: 30,
    borderRadius: 4,
    textAlign: "center",
    fontWeight: "bold",
    overflow: "hidden",
  },
});
