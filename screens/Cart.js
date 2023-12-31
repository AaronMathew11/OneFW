import { View, Text, Pressable, Image } from "react-native";
import React, { useState, useEffect } from "react";
import SmallCard from "../components/SmallCard";
import { FlatList } from "react-native-gesture-handler";
import * as SQLite from "expo-sqlite";
import CartCard from "../components/CartCard";
import { useIsFocused } from "@react-navigation/native";

const db = SQLite.openDatabase("db.db");

const Cart = ({ navigation }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const isFocused = useIsFocused();

  useEffect(() => {
    fetchCartItems(); // Fetch cart items initially
  }, [isFocused]); // Run once when component mounts

  useEffect(()=>{
    calculateTotals()
  },[cart])

  const calculateTotals = () => {
    var totalNumeric = 0;
    for (i = 0; i < cart.length; i++) {
      var numericPart = parseFloat(cart[i].price.replace(/[^0-9.]/g, "")); // Extracts numeric part
      console.log(numericPart);
      totalNumeric += (numericPart*cart[i].count);
    }
    setTotal(totalNumeric);
    console.log(total);
  };

  const fetchCartItems = async () => {
    await db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM cart",
        [],
        (txObj, { rows: { _array } }) => setCart(_array),
        (txObj, error) => console.log(error)
      );
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {cart.length != 0 && (
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <FlatList
            data={cart}
            style={{ marginBottom: 190 }}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <CartCard item={item} navigation={navigation}></CartCard>
            )}
          />
          <View
            style={{
              bottom: 0,
              position: "absolute",
              width: "100%",
              paddingBottom: 20,
              backgroundColor: "white",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 22,
              }}
            >
              <Text style={{ fontSize: 12, color: "grey" }}>Sub Total</Text>
              <Text style={{ fontSize: 12, color: "grey" }}>{total}</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 22,
                marginTop: 7,
              }}
            >
              <Text style={{ fontSize: 12, color: "grey" }}>Delivery</Text>
              <Text style={{ fontSize: 12, color: "grey" }}>$2.00</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 22,
                marginTop: 10,
                marginBottom: 20,
              }}
            >
              <Text style={{ fontSize: 18 }}>Total</Text>
              <Text style={{ fontSize: 18 }}>{total + 2}</Text>
            </View>
            <Pressable
              style={{
                backgroundColor: "#D82866",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 14,
                marginHorizontal: 20,
                borderRadius: 10,
              }}
              onPress={() => navigation.navigate("Delivery")}
            >
              <Text style={{ color: "white" }}>Checkout</Text>
            </Pressable>
          </View>
        </View>
      )}
      {cart.length == 0 && (
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 80,
          }}
        >
          <Image
            source={require("../images/emptyCart.jpg")}
            style={{ height: 300, width: 300 }}
          ></Image>
          <Text style={{ marginTop: 20, fontSize: 20 }}>
            Your Cart is Empty
          </Text>
        </View>
      )}
    </View>
  );
};

export default Cart;
