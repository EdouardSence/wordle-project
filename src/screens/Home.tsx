import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

export default function HomeScreen() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🎯 WORDLE</Text>
        <Text style={styles.subtitle}>Bienvenue !</Text>
        <Text style={styles.userEmail}>{auth.currentUser?.email}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.message}>
          L'écran de jeu Wordle sera bientôt disponible ici !
        </Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Se déconnecter</Text>
      </TouchableOpacity>
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
});
