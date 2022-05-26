import { StyleSheet, Platform, StatusBar } from "react-native";

export const styles = StyleSheet.create({
  topView: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
