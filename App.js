import React from "react";
import { ScrollView, View, StyleSheet, ListView } from "react-native";
import { Provider } from "react-native-paper";

import ListScreen from "./app/screens/ListScreen";
import Routes from "./app/navigation/Routes";
import TabNavigation from "./app/navigation/tabNavigation";

export default function App() {
  return (
    <Provider>
      <Routes />
    </Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    //margin: 20,
  },
});
