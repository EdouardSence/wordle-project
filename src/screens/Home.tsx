import { Text, View, StyleSheet } from "react-native";
import UserAvatar from "../components/UserAvatar.component";
import { faker } from "@faker-js/faker";
import Guess from "../components/Guess.component";
import Keyboard from "../components/Keyboard.component";
import { LogicProvider, randomWord } from "../providers/Logic.provider";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.topRight}>
        <UserAvatar />
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>🎯 WORDLE</Text>
        <Text style={styles.message}>{randomWord}</Text>
      </View>

      <LogicProvider>
        <View style={styles.guessContainer}>
          <Guess />
        </View>

        <View style={styles.keyboardContainer}>
          <Keyboard />
        </View>
      </LogicProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121213",
    padding: 24,
    paddingTop: 60,
  },
  guessContainer: {
    flex: 0,
    marginBottom: 20,
  },
  topRight: {
    position: "relative",
    alignItems: "flex-end",
    marginBottom: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 6,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#818384",
    marginTop: 8,
  },
  userEmail: {
    fontSize: 14,
    color: "#538D4E",
    marginTop: 8,
    fontWeight: "600",
  },
  message: {
    fontSize: 13,
    color: "#818384",
    textAlign: "center",
    marginTop: 4,
  },
  logoutButton: {
    height: 56,
    backgroundColor: "#3A3A3C",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  input: {
    height: 56,
    backgroundColor: "#1A1A1B",
    borderWidth: 2,
    borderColor: "#3A3A3C",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#FFFFFF",
    width: "100%",
    alignSelf: "center",
  },
  keyboardContainer: {
    marginTop: "auto",
    paddingBottom: 20,
  },
});
