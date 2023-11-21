import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import ActionBar from "../components/ActionBar";
import Home from "../screens/Home";
import Cart from "../screens/Cart";
import Fav from "../screens/Fav";
import Menu from "../screens/Menu";
import {
  BaseButton,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tab.Navigator>
        <Tab.Screen
          name='Home'
          component={Home}
          options={{
            tabBarShowLabel: false,
            // tabBarLabel:'Home',
            // headerTitle: () => <YlfLogo />,
            headerRight: () => <ActionBar />,
            tabBarIcon: (tabInfo) => {
              return (
                <Ionicons
                  name='home'
                  size={24}
                  color={tabInfo.focused ? "#2D6ADB" : "gray"}
                />
              );
            },
            // tabBarButton: (props) => <TabButton {...props} item={item} />,
          }}
        />
        <Tab.Screen
          name='Menu'
          component={Menu}
          options={{
            tabBarShowLabel: false,
            // tabBarLabel:'Home',
            // headerTitle: () => <YlfLogo />,
            headerRight: () => <ActionBar />,
            tabBarIcon: (tabInfo) => {
              return (
                <Ionicons
                  name='search'
                  size={24}
                  color={tabInfo.focused ? "#2D6ADB" : "gray"}
                />
              );
            },
            // tabBarButton: (props) => <TabButton {...props} item={item} />,
          }}
        />
        <Tab.Screen
          name='Cart'
          component={Cart}
          options={{
            tabBarShowLabel: false,
            // tabBarLabel:'Home',
            // headerTitle: () => <YlfLogo />,
            headerRight: () => <ActionBar />,
            tabBarIcon: (tabInfo) => {
              return (
                <Ionicons
                  name='cart'
                  size={24}
                  color={tabInfo.focused ? "#2D6ADB" : "gray"}
                />
              );
            },
            // tabBarButton: (props) => <TabButton {...props} item={item} />,
          }}
        />
        <Tab.Screen
          name='Fav'
          component={Fav}
          options={{
            tabBarShowLabel: false,
            // tabBarLabel:'Home',
            // headerTitle: () => <YlfLogo />,
            headerRight: () => <ActionBar />,
            tabBarIcon: (tabInfo) => {
              return (
                <Ionicons
                  name='heart'
                  size={24}
                  color={tabInfo.focused ? "#2D6ADB" : "gray"}
                />
              );
            },
            // tabBarButton: (props) => <TabButton {...props} item={item} />,
          }}
        />
      </Tab.Navigator>
    </GestureHandlerRootView>
  );
};

export default BottomNavigation;
