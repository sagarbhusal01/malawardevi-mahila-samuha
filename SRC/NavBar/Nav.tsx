import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { NavStyle } from "./NavBar.Style";

export default function Nav(props: any) {
  const IMAGESIZE = 24;

  return (
    <>
      <View style={NavStyle.container}>
        <View style={NavStyle.Wrapper}>
          {props.FocusedButton == "KhataPata" ? (
            <TouchableOpacity
              style={{
                height: 50,
                justifyContent: "center",
              }}
              onPress={() => props.setFocusedButton("Home")}
            >
              <Image
                source={require("../../assets/images/Home-Gray.png")}
                style={{ height: IMAGESIZE, width: IMAGESIZE, marginLeft: 20 }}
              />
            </TouchableOpacity>
          ) : (
            <View style={[NavStyle.ICONContainer,{width:"45%"}]}>
              <View style={NavStyle.HomeIcon}>
                <Image
                  source={require("../../assets/images/Home-White.png")}
                  style={{ height: IMAGESIZE, width: IMAGESIZE }}
                />
                <Text
                  style={{ color: "white",fontWeight:"600" }}
                >
                  Home
                </Text>
              </View>
            </View>
          )}
          {props.FocusedButton == "Home" ? (
            <TouchableOpacity
              style={{
                height: 50,
                justifyContent: "center",
              }}
              onPress={() => props.setFocusedButton("KhataPata")}
            >
              <Image
                source={require("../../assets/images/KhataPata-Gray.png")}
                style={{ height: IMAGESIZE, width: IMAGESIZE, marginRight: 20 }}
              />
            </TouchableOpacity>
          ) : (
            <View style={[NavStyle.ICONContainer,]}>
              <View style={NavStyle.KhataPataIcon}>
                <Image
                  source={require("../../assets/images/KhataPata-White.png")}
                  style={{ height: IMAGESIZE, width: IMAGESIZE }}
                />
                <Text
                  style={{
                    color: "white",
                    fontWeight:"600"
                  }}
                >
                  खता पाता
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </>
  );
}
