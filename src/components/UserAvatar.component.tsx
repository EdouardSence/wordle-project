import { Avatar } from "react-native-paper";
import { auth } from "../config/firebase";
import { Pressable, StyleSheet, Modal, View, Text } from "react-native";
import { useState } from "react";
import { signOut } from "@firebase/auth";
import { set } from "zod";

function getInitials(email: string | undefined): string {
  if (!email) return "NA";
  const parts = email.split("@")[0].split(".");
  return parts.map((part) => part.charAt(0).toUpperCase()).join("");
}

export default function UserAvatar() {
  const [visible, setVisible] = useState(false);

  const handleLogout = async () => {
    setVisible(false);
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };
  const handleChangePassword = () => {
    setVisible(false);
    console.log("Changement de mot de passe demandé");
  };

  return (
    <View>
      <Pressable onPress={() => setVisible(true)}>
        <Avatar.Text size={40} label={getInitials(auth.currentUser?.email)} />
      </Pressable>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
          <View style={styles.menu}>
            <Text style={styles.menuText}>Connecté en tant que</Text>
            <Text
              style={[
                styles.menuText,
                { fontWeight: "bold", marginBottom: 10 },
              ]}
            >
              {auth.currentUser?.email}
            </Text>
            <Pressable
              style={styles.menuItem}
              onPress={() => handleChangePassword()}
            >
              <Text style={styles.menuText}>Changer le mot de passe</Text>
            </Pressable>
            <Pressable style={styles.menuItem} onPress={handleLogout}>
              <Text style={styles.menuText}>Se déconnecter</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: 100,
    paddingRight: 24,
  },
  menu: {
    backgroundColor: "#1A1A1B",
    borderRadius: 8,
    minWidth: 200,
    borderWidth: 1,
    borderColor: "#3A3A3C",
  },
  menuItem: {
    padding: 16,
  },
  menuText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});
