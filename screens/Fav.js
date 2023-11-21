import { View, Text, Pressable, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import GestureHandlerRootView from "react-native-gesture-handler";
import * as SQLite from "expo-sqlite";
import { useIsFocused } from "@react-navigation/native";

const db = SQLite.openDatabase("db.db");

const Fav = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM favorites",
        [],
        (txObj, { rows: { _array } }) => setFavorites(_array),
        (txObj, error) => console.log(error)
      );
    });
  }, [isFocused]);

  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingBottom: 20 }}>
      <Text
        style={{
          fontSize: 18,
          marginHorizontal: 20,
          marginBottom: 20,
          marginTop: 20,
        }}
      >
        Your Favourite Treats at your fingertips!
      </Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate("Item", { data: item })}
            style={{
              backgroundColor: "white",
              marginHorizontal: 20,
              padding: 10,
              borderRadius: 10,
              marginBottom: 10,
              borderWidth: 0.3,
              borderColor: "grey",

              display: "flex",
              flexDirection: "row",
              flexShrink: 1,
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={{ height: 80, width: 70, borderRadius: 10 }}
            ></Image>
            <View style={{ marginHorizontal: 15 }}>
              <Text style={{ fontSize: 16 }}>{item.foodName}</Text>
              <Text
                numberOfLines={2}
                style={{
                  fontSize: 12,
                  color: "grey",
                  width: 260,
                  marginTop: 5,
                }}
              >
                {item.description}
              </Text>
              <Text style={{ marginTop: 5, fontSize: 12 }}>{item.price}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

export default Fav;
