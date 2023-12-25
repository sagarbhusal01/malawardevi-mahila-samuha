import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import {
  BIGGERTEXT,
  HEADINGTWOFONTSIZE,
  PRIMARY_COLOR,
  winWidth,
} from "../../../../global/GlobalConfig";

const TopLogoPlacement = () => {
  return (
    <>
      <View style={styles.WindowContainer}>
        <Image
          source={require("../../../../../assets/images/Window.png")}
          style={{
            height: 50,
            width: 50,
          }}
        />
        <View style={styles.CompanyNameContainer}>
          <Text style={styles.ComapnyName}>मलावरदेवी महिला समुह</Text>
        </View>
      </View>
      <View style={styles.WelcomeContainer}>
        <Text style={styles.WelcomeText}>स्वागत छ ! </Text>
      </View>

      <View style={styles.LoginTextContainer}>
        <Text style={styles.LoginText}>सदस्य लग इन गनुहोस</Text>
      </View>
    </>
  );
};

export default TopLogoPlacement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  WindowContainer: {
    margin: 8,
    marginTop: 12,
    flexDirection: "row",
  },
  CompanyNameContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  ComapnyName: {
    fontSize: BIGGERTEXT,
    fontFamily: "AnekDevanagari_700Bold",
    color: PRIMARY_COLOR,
    lineHeight: 45,
  },
  WelcomeContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  WelcomeText: {
    fontFamily: "AnekDevanagari_800ExtraBold",
    fontSize: BIGGERTEXT,
  },

  LoginTextContainer: {
    width: winWidth * 0.8,
    alignSelf: "center",
    marginTop: 20,
  },
  LoginText: {
    fontSize: HEADINGTWOFONTSIZE,
    fontFamily: "AnekDevanagari_800ExtraBold",
    color: "grey",
  },
});
