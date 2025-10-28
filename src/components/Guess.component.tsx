import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

const Guess = ({ word }: { word: string }) => {
  let inputs = [];
  if (word !== undefined) {
    for (let i = 0; i < word?.length; i++) {
      inputs.push(<TextInput key={i} style={styles.input} maxLength={1} />);
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
