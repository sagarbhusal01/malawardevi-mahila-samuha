import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { PRIMARY_COLOR, winHeight, winWidth } from "../../global/GlobalConfig";

const AddTransactionButton = (props: any) => {
  return (
    <TouchableOpacity
      style={styles.AddbuttonContainer}
      activeOpacity={0.7}
      onPress={() => {
        props.GOTOAddTransactionPage();
      }}
    >
      <Image
        source={require("../../../assets/images/Add.png")}
        style={{ height: 25, width: 25 }}
      />
    </TouchableOpacity>
  );
};

export default AddTransactionButton;

const styles = StyleSheet.create({
  AddbuttonContainer: {
    position: "absolute",
    top: winHeight * 0.8,
    right: 40,
    height: 60,
    width: 60,
    borderRadius: 60,
    backgroundColor: PRIMARY_COLOR,
    justifyContent: "center",
    alignItems: "center",
  },
});
