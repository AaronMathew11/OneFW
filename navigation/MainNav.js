import { View, Text } from "react-native";
import { React, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "../screens/Onboarding";
import BottomNavigation from "./BottomNavigation";
import Item from "../screens/Item";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Delivery from "../screens/Delivery";

const Stack = createNativeStackNavigator();

const MainNav = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value === null) {
        AsyncStorage.setItem("alreadyLaunched", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  return (
    // <GestureHandlerRootView>
    <NavigationContainer>
      <Stack.Navigator>
        {!isFirstLaunch && (
          <Stack.Screen
            options={{ headerShown: false }}
            name='Onboarding'
            component={OnboardingScreen}
          />
        )}
        <Stack.Screen
          name='BottomNavigation'
          component={BottomNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Delivery'
          component={Delivery}
          options={{ headerShown: false }}
        />
        <Stack.Screen name='Item' component={Item} />
      </Stack.Navigator>
    </NavigationContainer>
    // {/* </GestureHandlerRootView> */}
  );
};

export default MainNav;
