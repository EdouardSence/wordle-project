import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import Constants from "expo-constants";
import { auth } from "../config/firebase";

// Configuration du comportement des notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// Fonction pour demander la permission et obtenir le token
export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#538D4E",
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    console.log("Permission de notification refusée");
    return;
  }

  try {
    const projectId = Constants.expoConfig?.extra?.eas?.projectId;
    if (!projectId) {
      console.warn("⚠️ Project ID non trouvé dans app.json");
      return;
    }

    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId,
      })
    ).data;
    console.log("✅✅✅ EXPO PUSH TOKEN ✅✅✅");
    console.log(token);
    console.log("✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅");
    console.log("📌 Copiez ce token et testez sur: https://expo.dev/notifications");

    // Sauvegarder le token pour l'utilisateur connecté
    await sendTokenToServer(token);
  } catch (error) {
    console.log("⚠️ Token push non disponible");
    console.log("💡 Utilisez Expo Go pour obtenir le token:");
    console.log("   1. Fermez l'app dev client");
    console.log("   2. Lancez: pnpm expo start");
    console.log("   3. Scannez le QR avec Expo Go");
  }

  return token;
}

// Fonction pour envoyer le token au serveur (optionnel)
export async function sendTokenToServer(token: string) {
  const user = auth.currentUser;
  if (!user) {
    console.log("📱 Token obtenu mais utilisateur non connecté");
    return;
  }

  // Ici vous pouvez envoyer le token à votre backend Firebase
  // Par exemple avec Firestore ou Realtime Database
  console.log("📤 Token à envoyer au serveur:", token);
  console.log("👤 Pour l'utilisateur:", user.uid);

  // Exemple pour l'envoyer à Firestore :
  // import { doc, setDoc } from "firebase/firestore";
  // import { db } from "../config/firebase";
  // await setDoc(doc(db, "userTokens", user.uid), {
  //   token,
  //   updatedAt: new Date(),
  // });
}

// Fonction pour gérer les notifications reçues en premier plan
export function addNotificationReceivedListener(
  callback: (notification: Notifications.Notification) => void
) {
  return Notifications.addNotificationReceivedListener(callback);
}

// Fonction pour gérer les interactions avec les notifications
export function addNotificationResponseReceivedListener(
  callback: (response: Notifications.NotificationResponse) => void
) {
  return Notifications.addNotificationResponseReceivedListener(callback);
}
