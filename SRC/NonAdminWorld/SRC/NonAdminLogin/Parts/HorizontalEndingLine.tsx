import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { winWidth, DETAIL_COLOR } from "../../../../global/GlobalConfig";

export default function HorizontalEndingLine() {
  return (
    <>
      <View style={styles.HorizontalLine}>
        <Image
          source={require("../../../../../assets/images/Window.png")}
          style={{ height: 25, width: 25 }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  HorizontalLine: {
    width: winWidth,
    height: 2,
    backgroundColor: DETAIL_COLOR,
    marginTop: 25,
    alignItems: "center",
    justifyContent: "center",
  },
});
