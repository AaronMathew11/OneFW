import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { React, useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import Ingredients from "../components/Ingredients";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.db");

const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "green", height: 40, marginTop: -25 }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 13,
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
        fontSize: 12,
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),
};

const Offer = ({ navigation }) => {
  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "Item Added to Cart",
      text2: "",
      text1Style: { fontSize: 20 },
    });
  };

  // useEffect(() => {
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       `DROP TABLE IF EXISTS cart`,
  //       [],
  //       () => {
  //         tx.executeSql(
  //           `CREATE TABLE IF NOT EXISTS cart (
  //             id INTEGER PRIMARY KEY AUTOINCREMENT,
  //             foodName TEXT,
  //             image TEXT,
  //             description TEXT,
  //             price TEXT,
  //             count INTEGER
  //           );`,
  //           [],
  //           () => console.log("Table cart created successfully"),
  //           (txObj, error) => console.log("Error creating table:", error)
  //         );
  //       },
  //       (txObj, error) => console.log("Error dropping table:", error)
  //     );
  //   });
  // }, []);

  const addToFavorites = (item) => {
    showToast();
    console.log("hello");
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO cart (foodName, image, description, price,count) VALUES (?,?,?,?,?)",
        [item.foodName, item.image, item.description, item.price, count], // Add all four values here
        (txObj, results) => {
          if (results.rowsAffected > 0) {
            console.log("Item added to cart", item);
          } else {
            console.log("Failed to add item to cart");
          }
        },
        (txObj, error) => {
          console.log(error);
        }
      );
    });
  };

  const data = [
    {
      foodName: "Mushroom",
      price: "Rs 12.00",
      image: require("../images/1.png"),
    },
    {
      foodName: "Organic Chicken Patty",
      price: "Rs 32.00",
      image: require("../images/2.png"),
    },
    {
      foodName: "Organic Fried Egg",
      price: "Rs 10.00",
      image: require("../images/3.png"),
    },
    {
      foodName: "Lettuce",
      price: "Rs 7.00",
      image: require("../images/4.png"),
    },
    {
      foodName: "Brioche Bun",
      price: "Rs 16.00",
      image: require("../images/5.png"),
    },
    {
      foodName: "Raw Onions",
      price: "Rs 15.00",
      image: require("../images/6.png"),
    },
  ];

  const route = useRoute();
  const item = route.params?.data;
  console.log("the item is : ", item);

  const [count, setCount] = useState(0);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ width: "100%", height: 270 }}>
        <Image
          source={require("../images/burger.png")}
          style={{
            height: undefined,
            width: undefined,
            resizeMode: "cover",
            flex: 1,
          }}
        ></Image>
      </View>
      <View style={{ margin: 20 }}>
        <Text style={{ fontSize: 18, marginTop: 10 }}>
          American Breakfast Burger
        </Text>
        <Text
          style={{ fontSize: 14, color: "grey", marginTop: 25, lineHeight: 30 }}
        >
          Introducing our mouthwatering burger offer! For only 5 rupees, relish
          a savory medley of seasoned patties, fresh veggies, and signature
          sauces. Dive into a burst of flavors without breaking the bank. Grab
          this delectable deal while it lasts!
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <Text style={{ fontSize: 18, color: "green" }}>Rs 5.00!</Text>
        </View>
      </View>

      <Text
        style={{
          marginTop: 20,
          fontSize: 16,
          marginBottom: 25,
          marginLeft: 20,
        }}
      ></Text>
      <Pressable
        onPress={() => addToFavorites(item)}
        style={{
          backgroundColor: "#229954",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 14,
          marginHorizontal: 20,
          borderRadius: 10,
          marginBottom: 10,
        }}
      >
        <Text style={{ color: "white" }}>Take up the offer</Text>
      </Pressable>
      <Toast config={toastConfig} />
    </GestureHandlerRootView>
  );
};

export default Offer;
