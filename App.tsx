import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet, Button, Text } from "react-native";
import { onAuthStateChanged, User } from "@firebase/auth";
import { auth } from "./src/config/firebase";
import HomeScreen from "./src/screens/Home";
import LoginScreen from "./src/screens/Login";
import { PaperProvider } from "react-native-paper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as Notifications from 'expo-notifications';
import { 
  registerForPushNotificationsAsync, 
  registerTokenWithBackend, 
} from "./src/services/notifications";

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  console.log("App loaded");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState<Notifications.Notification | undefined>(
    undefined
  );

  const queryClient = new QueryClient();

  // Handle Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Setup notification listeners
  useEffect(() => {
    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
      console.log('📬 Notification received:', notification);
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('👆 Notification tapped:', response);
    });

    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);

  // Register push token when user is authenticated
  useEffect(() => {
    async function setupPushNotifications() {
      if (!user) {
        console.log('⏸️  No user authenticated, skipping notification setup');
        return;
      }

      try {
        console.log('🔔 Setting up push notifications for user:', user.uid);
        
        // Request permission and get token
        const token = await registerForPushNotificationsAsync();
        
        if (!token) {
          console.log('❌ Failed to get push token');
          return;
        }

        setExpoPushToken(token);
        console.log('✅ Expo push token obtained:', token);

        // Register token with backend
        const registered = await registerTokenWithBackend(user.uid, token);
        
        if (registered) {
          console.log('✅ Token registered with backend for user:', user.uid);
        } else {
          console.log('⚠️  Failed to register token with backend');
        }
      } catch (error) {
        console.error('Error setting up push notifications:', error);
        setExpoPushToken(`Error: ${error}`);
      }
    }

    setupPushNotifications();
  }, [user]);

  // async function requestPermission() {
  //   //requesting permission using Notification API
  //   const permission = await Notification.requestPermission();

  //   if (permission === "granted") {
  //     const token = await getToken(messaging, {
  //       vapidKey: process.env.EXPO_PUBLIC_FIREBASE_VAPID_KEY,
  //     });

  //     //We can send token to server
  //     console.log("Token generated : ", token);
  //   } else if (permission === "denied") {
  //     //notifications are blocked
  //     alert("You denied for the notification");
  //   }
  // }

  // useEffect(() => {
  //   requestPermission();
  // }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#538D4E" />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <Stack.Navigator>
          {user ? (
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </PaperProvider>
    </QueryClientProvider>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#121213",
    justifyContent: "center",
    alignItems: "center",
  },
  debugInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 10,
  },
  debugText: {
    color: '#fff',
    fontSize: 10,
  },
});
