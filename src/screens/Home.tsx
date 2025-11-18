import {
  Text,
  View,
  StyleSheet,
} from "react-native";
import UserAvatar from "../components/UserAvatar.component";
import { faker } from "@faker-js/faker";
import Guess from "../components/Guess.component";
import Keyboard from "../components/Keyboard.component";
import { LogicProvider } from "../providers/Logic.provider";

export default function HomeScreen() {
  const randomWord: string = faker.lorem.word();

  return (
    <View style={styles.container}>
      <View style={styles.topRight}>
        <UserAvatar />
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>🎯 WORDLE</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.message}>{randomWord}</Text>
      </View>

      <LogicProvider>
        <View style={styles.guessContainer}>
          <Guess word={randomWord} />
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
    flex: 1,
  },
  topRight: {
    position: "relative",
    alignItems: "flex-end",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 48,
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
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    fontSize: 16,
    color: "#818384",
    textAlign: "center",
    lineHeight: 24,
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
    marginBottom: 40,
  },
});
