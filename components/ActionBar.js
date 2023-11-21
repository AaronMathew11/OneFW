import { View, Text, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";

const ActionBar = ({ route }) => {
  const navigation = useNavigation({ navigation });

  return <View></View>;
};

export default ActionBar;

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 40,
    width: 150,
    backgroundColor: "white",
    borderRadius: 22,
    paddingHorizontal: 8,
  },
});
