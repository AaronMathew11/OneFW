import { View, Text, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import * as SQLite from "expo-sqlite";

const SmallCard = ({ item, navigation }) => {
  const [count, setCount] = useState(0);
  const [like, setLike] = useState(false);

  //database connection
  const db = SQLite.openDatabase("db.db");

  function toggleLike(item) {
    setLike(like == true ? false : true);
  }

  useEffect(() => {
    if (like) {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO favorites (foodName, image, description, price) VALUES (?,?,?,?)",
          [item.foodName, item.image, item.description, item.price], // Add all four values here
          (txObj, results) => {
            if (results.rowsAffected > 0) {
              console.log("Item added to favorites", item);
            } else {
              console.log("Failed to add item to favorites");
            }
          },
          (txObj, error) => {
            console.log(error);
          }
        );
      });
    } else {
      db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM favorites WHERE foodName = ?",
          [item.foodName], // Add all four values here
          (txObj, results) => {
            if (results.rowsAffected > 0) {
              console.log("Item added to favorites", item);
            } else {
              console.log("Failed to add item to favorites");
            }
          },
          (txObj, error) => {
            console.log(error);
          }
        );
      });
    }
  }, [like]);

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

  const addToFavorites = (item) => {};

  return (
    <Pressable
      onPress={() => {
        navigation.navigate("Item", { data: item });
      }}
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

          <Ionicons
            onPress={() => toggleLike(item)}
            name='heart'
            size={24}
            color={like ? "#D3004A" : "gray"}
          />
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
            {/* <Pressable onPress={() => setCount(count + 1)}>
              <Ionicons name='add' size={15} color='grey' />
            </Pressable>
            <Text style={{ fontSize: 12 }}>
              {item.count ? item.count : count}
            </Text>
            <Pressable onPress={() => setCount(count - 1)}>
              <Ionicons
                name='remove'
                size={15}
                color='grey'
                style={{ marginRight: 5 }}
              />
            </Pressable> */}
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default SmallCard;
