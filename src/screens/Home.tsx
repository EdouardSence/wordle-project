import { Text, View, StyleSheet, Modal, TouchableOpacity } from "react-native";
import UserAvatar from "../components/UserAvatar.component";
import { faker } from "@faker-js/faker";
import Guess from "../components/Guess.component";
import Keyboard from "../components/Keyboard.component";
import {
  LogicProvider,
  randomWord,
  KeyContext,
} from "../providers/Logic.provider";
import { useContext } from "react";

function GameContent() {
  const {
    gameStatus,
    setGameStatus,
    setGuesses,
    setCurrentRow,
    setKeys,
    setKeyboardColors,
  } = useContext(KeyContext);

  const handleRestart = () => {
    setGameStatus("playing");
    setGuesses(
      Array.from({ length: 6 }, () => ({
        letters: Array(randomWord.length).fill(""),
        statuses: Array(randomWord.length).fill("empty" as any),
        submitted: false,
      }))
    );
    setCurrentRow(0);
    setKeys([]);
    setKeyboardColors({});
  };

  return (
    <>
      <View style={styles.guessContainer}>
        <Guess />
      </View>

      <View style={styles.keyboardContainer}>
        <Keyboard />
      </View>

      <Modal
        visible={gameStatus !== "playing"}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {gameStatus === "won" ? "🎉 Victoire !" : "😢 Défaite"}
            </Text>
            <Text style={styles.modalMessage}>
              {gameStatus === "won"
                ? "Félicitations, vous avez trouvé le mot !"
                : `Le mot était : ${randomWord}`}
            </Text>
            <TouchableOpacity
              style={styles.restartButton}
              onPress={handleRestart}
            >
              <Text style={styles.restartText}>Rejouer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.topRight}>
        <UserAvatar />
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>🎯 WORDLE</Text>
      </View>

      <LogicProvider>
        {/* <Text style={styles.message}>{randomWord}</Text> */}

        <GameContent />
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
    marginBottom: 20,
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
    marginBottom: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#1A1A1B",
    borderRadius: 16,
    padding: 32,
    alignItems: "center",
    minWidth: 300,
    borderWidth: 2,
    borderColor: "#3A3A3C",
  },
  modalTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  modalMessage: {
    fontSize: 18,
    color: "#818384",
    textAlign: "center",
    marginBottom: 24,
  },
  restartButton: {
    backgroundColor: "#538D4E",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  restartText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
