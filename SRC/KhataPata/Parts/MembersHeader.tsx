import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  HEADINGTWOFONTSIZE,
  PRIMARY_COLOR,
  winWidth,
} from "../../global/GlobalConfig";

const MembersHeader = () => {
  return (
    <View>
      <View style={styles.MemberHeaderContent}>
        <Text style={styles.MemberHeaderContentText}>सदस्यहरु</Text>
      </View>
    </View>
  );
};

export default MembersHeader;

const styles = StyleSheet.create({
  MemberHeaderContent: {
    height: 50,
    width: 120,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 10,
  },
  MemberHeaderContentText: {
    color: "white",
    fontSize: HEADINGTWOFONTSIZE,
    fontWeight: "800",
  },
});
