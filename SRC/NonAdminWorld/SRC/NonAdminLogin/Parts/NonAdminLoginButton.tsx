import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import LoadingWhite from "../../../../Components/LoadingWhite";
import {
  HEADINGTWOFONTSIZE,
  PRIMARY_COLOR,
  winWidth,
} from "../../../../global/GlobalConfig";

const NonAdminLoginButton = (props: any) => {
  return (
    <>
      <View style={styles.AddButtonContainer}>
        <TouchableOpacity
          style={styles.AddButton}
          activeOpacity={0.8}
          onPress={() => {
            if (!props.Uploading) {
              props.GetDataFromFirebase();
            }
          }}
        >
          {!props.Uploading ? (
            <>
              <Text style={styles.AddButtonText}>लग इन</Text>
              <Image
                source={require("../../../../../assets/images/GoForward.png")}
                style={{
                  height: 20,
                  width: 20,
                  position: "absolute",
                  right: 20,
                }}
              />
            </>
          ) : (
            <LoadingWhite />
          )}
        </TouchableOpacity>
      </View>
    </>
  );
};

export default NonAdminLoginButton;

const styles = StyleSheet.create({
  AddButtonContainer: {
    width: winWidth * 0.8,
    alignSelf: "center",
    marginTop: 12,
  },
  AddButton: {
    backgroundColor: PRIMARY_COLOR,
    height: 50,
    width: "100%",
    borderRadius: 5,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  AddButtonText: {
    color: "white",
    fontSize: HEADINGTWOFONTSIZE,
    fontWeight: "800",
  },
});
