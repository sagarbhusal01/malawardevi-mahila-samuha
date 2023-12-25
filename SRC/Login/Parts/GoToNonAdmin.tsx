import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  HEADINGFOURFONTSIZE,
  HEADINGTTHREEFONTSIZE,
  TERTIARY_COLOR,
} from "../../global/GlobalConfig";

const GoToNonAdmin = (props: any) => {
  return (
    <TouchableOpacity
      style={{ alignSelf: "center", marginTop: 8 }}
      activeOpacity={0.6}
      onPress={() => {
        props.NAV("NonAdminWorld");
      }}
    >
      <Text
        style={{
          fontSize: HEADINGFOURFONTSIZE,
          fontWeight: "800",
          color: TERTIARY_COLOR,
        }}
      >
        सदस्य लग इन यता
      </Text>
    </TouchableOpacity>
  );
};

export default GoToNonAdmin;

