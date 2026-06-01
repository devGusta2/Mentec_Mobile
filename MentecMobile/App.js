import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider } from "./contexts/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import { NotificationProvider } from "./src/notifications/NotificationProvider";


export default function App() {
  return (
    <SafeAreaProvider>
      <NotificationProvider>
        <AuthProvider>
          <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
            <NavigationContainer>
              <AppRoutes />
            </NavigationContainer>
          </SafeAreaView>
        </AuthProvider>
      </NotificationProvider>
    </SafeAreaProvider>
  );
}