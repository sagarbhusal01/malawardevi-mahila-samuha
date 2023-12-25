import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { GlobalStyle } from "../../../../global/GlobalConfig";
export default function DisplayCalculatedValue(props: any) {
  return (
    <>
      <View style={GlobalStyle.WrapperContainer}>
        <TouchableOpacity
          style={styles.CrossButton}
          activeOpacity={0.8}
          onPress={() => props.setCalculatedValue(0)}
        >
          <Image
            source={require("../../../../../assets/images/Cross.png")}
            style={{ height: 12, width: 12 }}
          />
        </TouchableOpacity>
        <View style={[GlobalStyle.DetailContainer]}>
          <View style={styles.LeftSideDetailContainer}>
            <Text style={GlobalStyle.DetailText}>जम्मा लगेको रकम</Text>
          </View>
          <View style={styles.RightSideDetailContainer}>
            <Text style={GlobalStyle.DetailText}>रु</Text>
            {props.Amount ? (
              <Text style={GlobalStyle.DetailText}> {props.Amount}</Text>
            ) : (
              <Text style={GlobalStyle.DetailText}> 0</Text>
            )}
          </View>
        </View>
        <View style={[GlobalStyle.DetailContainer]}>
          <View style={[styles.LeftSideDetailContainer]}>
            <Text style={GlobalStyle.DetailText}>
              प्रती महिना १०० को ब्यज दर{" "}
            </Text>
          </View>
          <View style={[styles.RightSideDetailContainer]}>
            <Text style={GlobalStyle.DetailText}>रु</Text>
            {props.Rate ? (
              <Text style={GlobalStyle.DetailText}> {props.Rate}</Text>
            ) : (
              <Text style={GlobalStyle.DetailText}> 0</Text>
            )}
          </View>
        </View>
        <View style={[GlobalStyle.DetailContainer]}>
          <View style={styles.LeftSideDetailContainer}>
            <Text style={GlobalStyle.DetailText}>लगेको समय महिनमा </Text>
          </View>
          <View style={styles.RightSideDetailContainer}>
            <Text style={GlobalStyle.DetailText}>{""}</Text>
            {props.Time ? (
              <Text style={GlobalStyle.DetailText}>{props.Time}</Text>
            ) : (
              <Text style={GlobalStyle.DetailText}>{0}</Text>
            )}
          </View>
        </View>
        <View style={[GlobalStyle.DetailContainer]}>
          <View style={styles.LeftSideDetailContainer}>
            <Text style={GlobalStyle.DetailText}>जम्मा दिनु पर्ने रकम</Text>
          </View>
          <View style={styles.RightSideDetailContainer}>
            <Text style={GlobalStyle.DetailText}>{""}</Text>
            {props.CalculatedValue ? (
              <Text style={GlobalStyle.DetailText}>
                रु {props.CalculatedValue}
              </Text>
            ) : (
              <Text style={GlobalStyle.DetailText}>{0}</Text>
            )}
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  CrossButton: {
    height: 30,
    width: 30,
    borderRadius: 50,
    backgroundColor: "grey",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: -10,
    top: -10,
  },
  LeftSideDetailContainer: {
    width: "65%",
    marginLeft: 18,
  },
  RightSideDetailContainer: {
    width: "25%",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
});
