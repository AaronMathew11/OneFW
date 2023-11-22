import { View, Text, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import * as SQLite from "expo-sqlite";
import Toast from "react-native-toast-message";

const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "green" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: "400",
      }}
      text2Style={{
        fontSize: 13,
        fontWeight: "400",
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 16,
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),
};

const CartCard = ({ item, navigation }) => {
  const [count, setCount] = useState(item.count);

  //database connection
  const db = SQLite.openDatabase("db.db");

  // const [favs, setFavs] = useState(undefined);

  // useEffect(() => {
  //   db.transaction((tx) => {
  //     tx.executeSql(`CREATE TABLE IF NOT EXISTS favorites (
  //         id INTEGER PRIMARY KEY AUTOINCREMENT,
  //         foodName TEXT,
  //         image TEXT,
  //         description TEXT,
  //         price TEXT
  //       );`);

  //     db.transaction((tx) => {
  //       tx.executeSql(
  //         "SELECT * FROM favorites",
  //         null,
  //         (txObj, resultSet) => setFavs(resultSet.rows._array),
  //         (txObj, error) => console.log(error)
  //       );
  //     });
  //   });
  // }, [favs]);

  return (
    <Pressable
      style={{
        display: "flex",
        flexDirection: "row",
        paddingHorizontal: 20,
        marginTop: 20,
        width: "100%",
      }}
    >
      <Image
        source={{ uri: item.image }}
        style={{ width: 90, height: 90, borderRadius: 10 }}
      ></Image>
      <View style={{ marginLeft: 20 }}>
        <View
          style={{
            display: "flex",
            width: 250,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 16 }}>{item.foodName}</Text>
        </View>
        <Text style={{ color: "grey", marginTop: 5, fontSize: 12, width: 250 }}>
          {item.description}
        </Text>
        <View
          style={{
            marginTop: 15,
            display: "flex",
            width: 240,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text>{item.price}</Text>
          <View
            style={{
              display: "flex",
              gap: 10,
              flexDirection: "row",
            }}
          >
            <Pressable onPress={() => setCount(count + 1)}>
              <Ionicons name='add' size={15} color='grey' />
            </Pressable>
            <Text style={{ fontSize: 12 }}>{count}</Text>
            <Pressable
              onPress={() => {
                if (count > 0) setCount(count - 1);
              }}
            >
              <Ionicons
                name='remove'
                size={15}
                color='grey'
                style={{ marginRight: 5 }}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default CartCard;
