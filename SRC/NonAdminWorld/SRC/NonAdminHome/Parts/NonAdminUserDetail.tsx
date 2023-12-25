import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  DETAIL_COLOR,
  PRIMARY_COLOR,
  WRAPPER_COLOR,
  winWidth,
} from "../../../../global/GlobalConfig";

const NonAdminUserDetail = (props: any) => {
  return (
    <View
      style={{
        width: winWidth * 0.9,
        alignSelf: "center",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15,
      }}
    >
      <View style={styles.IDPlaceHolder}>
        <Text style={styles.IDTExt}>{props.Data.ID}</Text>
      </View>
      <View
        style={{
          marginLeft: 25,
          paddingTop: 5,
        }}
      >
        <Text
          style={[
            {
              color: PRIMARY_COLOR,
              fontFamily: "AnekDevanagari_800ExtraBold",
              fontSize: 18,
            },
          ]}
        >
          नमस्ते !!  {props.Data.Name}
        </Text>
      </View>
    </View>
  );
};

export default NonAdminUserDetail;

const styles = StyleSheet.create({
  IDPlaceHolder: {
    minWidth: 45,
    borderRadius: 5,
    backgroundColor: DETAIL_COLOR,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  IDTExt: {
    fontSize: 18,
    fontWeight: "800",
  },
});
