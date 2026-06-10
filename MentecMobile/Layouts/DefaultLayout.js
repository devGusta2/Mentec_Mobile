import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../components/Navbar";

export default function DefaultLayout({ children }) {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
      <NavBar />
      <View style={{ flex: 1 }}>{children}</View>
    </SafeAreaView>
  );
}