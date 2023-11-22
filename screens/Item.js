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

const Item = ({ navigation }) => {
  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "Item Added to Cart",
      text2: "",
      text1Style: { fontSize: 20 },
    });
  };


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
          source={{ uri: item.image }}
          style={{
            height: undefined,
            width: undefined,
            resizeMode: "cover",
            flex: 1,
          }}
        ></Image>
      </View>
      <View style={{ margin: 20 }}>
        <Text style={{ fontSize: 18 }}>{item.foodName}</Text>
        <Text style={{ fontSize: 12, color: "grey", marginTop: 4 }}>
          {item.description}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <Text style={{ fontSize: 18 }}>{item.price}</Text>
          <View
            style={{
              display: "flex",
              gap: 10,
              flexDirection: "row",
            }}
          >
            <Pressable onPress={() =>{if(count>0) setCount(count - 1)}}>
              <Ionicons
                name='remove'
                size={20}
                color='grey'
                style={{ marginRight: 5 }}
              />
            </Pressable>
            <Text style={{ fontSize: 16, color: "grey" }}>{count}</Text>
            <Pressable onPress={() => setCount(count + 1)}>
              <Ionicons name='add' size={20} color='grey' />
            </Pressable>
          </View>
        </View>
      </View>

      <Text
        style={{
          marginTop: 20,
          fontSize: 16,
          marginBottom: 25,
          marginLeft: 20,
        }}
      >
        Add Extra Ingredients
      </Text>
      <ScrollView style={{ paddingHorizontal: 10 }}>
        {data.map((item, index) => (
          <Ingredients item={item} key={index}/>
        ))}
      </ScrollView>
      <Pressable
        onPress={() => addToFavorites(item)}
        style={{
          backgroundColor: "#D82866",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 14,
          marginHorizontal: 20,
          borderRadius: 10,
          marginBottom: 10,
        }}
      >
        <Text style={{ color: "white" }}>Add to Cart</Text>
      </Pressable>
      <Toast
        config={toastConfig}
      />
    </GestureHandlerRootView>
  );
};

export default Item;
