import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
// import 'react-native-gesture-handler';

import { useState, useEffect } from "react";

import { createStackNavigator } from "@react-navigation/stack";

import MainNav from "./navigation/MainNav";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SQLite from "expo-sqlite";

const Stack = createStackNavigator();

const db = SQLite.openDatabase("db.db");

export default function App() {
  useEffect(() => {
    // db.transaction((tx) => {
    //   tx.executeSql(
    //     `CREATE TABLE IF NOT EXISTS favorites (
    //           id INTEGER PRIMARY KEY AUTOINCREMENT,
    //           foodName TEXT,
    //           image TEXT,
    //           description TEXT,
    //           price TEXT
    //         );`
    //   );

    // tx.executeSql(
    //   `CREATE TABLE IF NOT EXISTS cart (
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         foodName TEXT,
    //         image TEXT,
    //         description TEXT,
    //         price TEXT,
    //         count INTEGER
    //       );`
    // );
    // });

    db.transaction((tx) => {
      tx.executeSql(
        `DROP TABLE IF EXISTS cart`,
        [],
        () => {
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS cart (
             id INTEGER PRIMARY KEY AUTOINCREMENT,
             foodName TEXT UNIQUE,
             image TEXT,
             description TEXT,
             price TEXT,
             count INTEGER
            );`,
            [],
            () => console.log("Table cart created successfully"),
            (txObj, error) => console.log("Error creating table:", error)
          );
        },
        (txObj, error) => console.log("Error dropping table:", error)
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        `DROP TABLE IF EXISTS favorites`,
        [],
        () => {
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS favorites (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              foodName TEXT UNIQUE,
              image TEXT,
              description TEXT,
              price TEXT
            );`,
            [],
            () => console.log("Table favorites created successfully"),
            (txObj, error) => console.log("Error creating table:", error)
          );
        },
        (txObj, error) => console.log("Error dropping table:", error)
      );
    });
  }, []);

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
