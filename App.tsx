import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState, useRef } from "react";
import { View, ActivityIndicator, StyleSheet, Alert } from "react-native";
import { onAuthStateChanged, User } from "@firebase/auth";
import { auth } from "./src/config/firebase";
import HomeScreen from "./src/screens/Home";
import LoginScreen from "./src/screens/Login";
import { PaperProvider } from "react-native-paper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as Notifications from "expo-notifications";
import {
  registerForPushNotificationsAsync,
  addNotificationReceivedListener,
  addNotificationResponseReceivedListener,
} from "./src/services/notifications";

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  const queryClient = new QueryClient();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Configuration des notifications
  useEffect(() => {
    // Demander la permission et obtenir le token
    registerForPushNotificationsAsync();

    // Listener pour les notifications reçues en premier plan
    notificationListener.current = addNotificationReceivedListener(
      (notification) => {
        console.log("📩 Notification reçue:", notification);
        // Vous pouvez afficher une alerte ou faire autre chose ici
      }
    );

    // Listener pour les interactions avec les notifications
    responseListener.current = addNotificationResponseReceivedListener(
      (response) => {
        console.log("👆 Notification cliquée:", response);
        const data = response.notification.request.content.data;

        // Vous pouvez naviguer vers un écran spécifique selon les données
        if (data?.screen) {
          // navigation.navigate(data.screen);
        }
      }
    );

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

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
        <Stack.Navigator
          initialRouteName={user ? "Home" : "Login"}
          screenOptions={{
            headerStyle: {
              backgroundColor: "#121213",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            animation: "fade",
          }}
        >
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
});
