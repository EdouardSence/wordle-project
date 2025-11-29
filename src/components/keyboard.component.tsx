import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { use, useContext, useState } from "react";
import { KeyContext, randomWord } from "../providers/Logic.provider";

const keysFR = [
  ["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["Q", "S", "D", "F", "G", "H", "J", "K", "L", "M"],
  ["ENTER", "W", "X", "C", "V", "B", "N", "⌫"],
];

export default function Keyboard() {
  const { keys, setKeys } = useContext(KeyContext);

  const handlePress = (key: string) => () => {
    switch (key) {
      case "ENTER":
        // Handle enter key
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
          {row.map((key) => (
            <TouchableOpacity onPress={handlePress(key)} key={key}>
              <Text style={styles.key}>{key}</Text>
            </TouchableOpacity>
          ))}
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
    fontSize: 20,
    margin: 4,
    padding: 8,
    borderWidth: 1,
    borderColor: "#3A3A3C",
    borderRadius: 8,
    textAlign: "center",
  },
});
