import { initializeApp, getApps } from "firebase/app";
import {
  initializeAuth,
  getAuth,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase only if it hasn't been initialized yet
export const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firebase Auth with proper persistence based on platform
let auth: any;

try {
  if (Platform.OS === "web") {
    // For web, use browser persistence
    auth = getAuth(firebaseApp);
  } else {
    // For React Native (iOS/Android), use custom AsyncStorage persistence
    auth = initializeAuth(firebaseApp, {
      persistence: [
        {
          type: "LOCAL",
          async _get(key: string) {
            return AsyncStorage.getItem(key);
          },
          async _set(key: string, value: string) {
            await AsyncStorage.setItem(key, value);
          },
          async _remove(key: string) {
            await AsyncStorage.removeItem(key);
          },
        },
      ] as any,
    });
  }
} catch (error) {
  // If auth is already initialized, just get the existing instance
  auth = getAuth(firebaseApp);
}

export { auth };
