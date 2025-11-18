import React, { useContext } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { KeyContext, randomWord } from "../providers/Logic.provider";

const Guess = () => {
  const { keys, setKeys } = useContext(KeyContext);
  return (
    <View style={styles.container}>
      {Array.from({ length: 6 }).map((_, rowIndex) => (
        <View key={rowIndex} style={styles.textBox}>
          {Array.from({ length: randomWord.length }).map((_, colIndex) => {
            const letterIndex = rowIndex * randomWord.length + colIndex;
            return (
              <View key={colIndex} style={styles.letterBox}>
                <Text style={styles.input}>{keys[letterIndex] || ""}</Text>
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
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 6,
  },
  textBox: {
    flexDirection: "row",
    gap: 6,
  },
  letterBox: {
    width: 45,
    height: 45,
    borderColor: "#3A3A3C",
    borderWidth: 2,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121213",
  },
  input: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    textTransform: "uppercase",
  },
});

export default Guess;
