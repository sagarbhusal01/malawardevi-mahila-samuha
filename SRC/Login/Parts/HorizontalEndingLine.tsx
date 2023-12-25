import { View, Text, Image } from "react-native";
import React from "react";
import { styles } from "./Login.Style";

export default function HorizontalEndingLine() {
  return (
    <>
      <View style={styles.HorizontalLine}>
        <Image
          source={require("../../../assets/images/Window.png")}
          style={{ height: 25, width: 25 }}
        />
      </View>
    </>
  );
}
