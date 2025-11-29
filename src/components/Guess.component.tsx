import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import {
  KeyContext,
  randomWord,
  LetterStatus,
} from "../providers/Logic.provider";

const getBackgroundColor = (status: LetterStatus): string => {
  switch (status) {
    case "correct":
      return "#538D4E"; // Vert
    case "present":
      return "#B59F3B"; // Jaune
    case "absent":
      return "#3A3A3C"; // Gris
    default:
      return "transparent";
  }
};

const Guess = () => {
  const { keys, guesses, currentRow } = useContext(KeyContext);

  return (
    <View style={styles.container}>
      {guesses.map((guess, rowIndex) => (
        <View key={rowIndex} style={styles.inputContainer}>
          {Array.from({ length: randomWord.length }).map((_, colIndex) => {
            const isCurrentRow = rowIndex === currentRow;
            const letter = isCurrentRow
              ? keys[colIndex] || ""
              : guess.letters[colIndex] || "";
            const status = guess.submitted ? guess.statuses[colIndex] : "empty";
            const backgroundColor = guess.submitted
              ? getBackgroundColor(status)
              : "transparent";

            return (
              <View
                key={colIndex}
                style={[
                  styles.letterBox,
                  { backgroundColor },
                  guess.submitted && styles.submittedBox,
                ]}
              >
                <Text style={styles.letter}>{letter}</Text>
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 10,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 6,
  },
  letterBox: {
    width: 50,
    height: 50,
    borderColor: "#3A3A3C",
    borderWidth: 2,
    borderRadius: 4,
    marginHorizontal: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  submittedBox: {
    borderColor: "transparent",
  },
  letter: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
});

export default Guess;
