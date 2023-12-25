import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { GlobalStyle } from "../../global/GlobalConfig";

const DepositAttendance = (props: any) => {
  return (
    <View style={GlobalStyle.WrapperContainer}>
      {props.AllDepositAttendance?.map((names: any, key: number) => {
        return (
          <View style={GlobalStyle.DetailContainer} key={key}>
            <View style={{ width: "65%" }}>
              <Text style={GlobalStyle.DetailText}>{names.Name}</Text>
            </View>
            <View
              style={{
                width: "15%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {names.Present ? (
                <Image
                  source={require("../../../assets/images/DoneGreen.png")}
                  style={{ height: 30, width: 30 }}
                />
              ) : (
                <Image
                  source={require("../../../assets/images/CrossRed.png")}
                  style={{ height: 30, width: 30 }}
                />
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default DepositAttendance;

const styles = StyleSheet.create({});
