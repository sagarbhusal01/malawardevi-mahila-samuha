import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { winWidth, PRIMARY_COLOR, HEADINGTWOFONTSIZE } from "../../global/GlobalConfig";

const AllNewsHeader = () => {
  return (
    <View style={styles.AllNewsContainer}>
      <View style={styles.AllNewsButton}>
        <Text style={styles.AllNewsButtonText}>समाचारहरु</Text>
      </View>
    </View>
  );
};

export default AllNewsHeader;

const styles = StyleSheet.create({
  AllNewsContainer: {
    width: winWidth * 0.9,
    alignSelf: "center",
    marginTop: 15,
  },
  AllNewsButton: {
    width: 150,
    height: 45,
    backgroundColor: PRIMARY_COLOR,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  AllNewsButtonText: {
    color: "white",
    fontSize: HEADINGTWOFONTSIZE,
    fontWeight: "800",
  },
});
