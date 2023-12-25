import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const CalculatorIcon = (props:any) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={()=>
      {
        props.NAV("NonAdminCalculator")
      }}
      style={{ position: "absolute", right: 15, top: 15 }}
    >
      <Image
        source={require("../../../../../assets/images/Calculator.png")}
        style={{ height: 35, width: 35 }}
      />
    </TouchableOpacity>
  );
};

export default CalculatorIcon;

const styles = StyleSheet.create({});
