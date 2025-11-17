import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { keyPressed } from "../providers/Logic.provider";
import { useState } from "react";

const keysFR = [
  ["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["Q", "S", "D", "F", "G", "H", "J", "K", "L", "M"],
  ["ENTER", "W", "X", "C", "V", "B", "N", "⌫"],
];

export default function Keyboard() {

  const handlePress = (key: string) => () => {
    keyPressed(key);
  };

  const [keys, setKeys] = useState<string[]>([]);
  return (
    <View>
      {keysFR.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.container}>
          {row.map((key) => (
            <TouchableOpacity
              onPress={() => setKeys((prevKeys) => [...prevKeys, key])}
              key={key}
            >
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
