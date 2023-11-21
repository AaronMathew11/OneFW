import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const BigCard = ({ navigation,item }) => {
  return (
    <Pressable
      style={{ marginBottom: 20, paddingHorizontal: 20 }}
      onPress={() => navigation.navigate("Item",{data:item})}
    >
      <View
        style={{
          width: "100%",
          height: 240,
          paddingBottom: 20,
          borderRadius: 13,
          borderColor: "#EBEBEB",
          borderWidth: 1,
        }}
      >
        <Image
          source={{uri:item.image}}
          resizeMode='cover'
          style={{
            width: undefined,
            paddingBottom: 30,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            height: undefined,
            flex: 1,
          }}
        ></Image>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 10,
            marginRight: 20,
            marginLeft: 10,
          }}
        >
          <Text style={{ fontSize: 16 }}>{item.foodName}</Text>
          <Text style={{ color: "green" }}>{item.price}</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: 10,
            alignItems: "center",

            marginTop: 10,
          }}
        >
          <Ionicons
            name='time-outline'
            size={14}
            color='grey'
            style={{ marginRight: 5 }}
          />
          <Text style={{ color: "grey", marginRight: 10 }}>{item.makeTime}</Text>
          <Ionicons
            name='car-outline'
            size={14}
            color='grey'
            style={{ marginRight: 5 }}
          />
          <Text style={{ color: "grey", marginRight: 10 }}>
            Delivery Fee Rs 2.00
          </Text>
          <Ionicons
            name='star-outline'
            size={14}
            color='grey'
            style={{ marginRight: 5 }}
          />
          <Text style={{ color: "grey", marginRight: 10 }}>{item.rating}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default BigCard;
