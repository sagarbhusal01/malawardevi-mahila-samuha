import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Calculator from "./Parts/Calculator";

const NonAdminCalculator = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Calculator />
    </View>
  );
};

export default NonAdminCalculator;

const styles = StyleSheet.create({});
