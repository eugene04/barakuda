import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ListScreen from "../screens/ListScreen";

import DetailScreen from "../screens/DetailScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Products" component={ListScreen} />
        <Tab.Screen name="Details" component={DetailScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
