import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./contexts/AuthContext";
import { UserProvider } from "./contexts/UserContext";
import AppRoutes from "./routes/AppRoutes";
export default function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <AppRoutes />
          </NavigationContainer>
        </SafeAreaProvider>
      </UserProvider>
    </AuthProvider>
  );
}
