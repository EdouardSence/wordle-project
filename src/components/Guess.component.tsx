import React, { useContext } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { KeyContext, randomWord } from "../providers/Logic.provider";

const Guess = () => {
  const { keys, setKeys } = useContext(KeyContext);
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {Array.from({ length: randomWord.length }).map((_, index) => (
          <Text key={index} style={styles.input}>
            {keys[index]}{" "}
          </Text>
        ))}
      </View>
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
    justifyContent: "center",
    textAlign: "center",
  },
});

export default Guess;
