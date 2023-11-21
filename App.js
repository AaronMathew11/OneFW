import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
// import 'react-native-gesture-handler';

import { useState, useEffect } from "react";

import { createStackNavigator } from "@react-navigation/stack";

import MainNav from "./navigation/MainNav";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Stack = createStackNavigator();

export default function App() {
  return (
    // <GestureHandlerRootView>
    <View style={styles.container}>
      <MainNav />
      <StatusBar style='auto' />
    </View>
    // {/* </GestureHandlerRootView> */}
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
  },
});
