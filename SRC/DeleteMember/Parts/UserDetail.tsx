import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  GlobalStyle,
  HEADINGTTHREEFONTSIZE,
  SECONDARY_COLOR,
  winWidth,
} from "../../global/GlobalConfig";

const UserDetail = (props: any) => {
  return (
    <View>
      {props.UserData.map((names: any, key: number) => {
        return (
          <View style={GlobalStyle.WrapperContainer} key={key}>
            {/* ==================================Name================================ */}
            <View style={GlobalStyle.DetailContainer}>
              <View style={styles.DetailContainerPartsContainer}>
                <View style={styles.DetailLeftSide}>
                  <Text style={GlobalStyle.DetailText}>नाम</Text>
                </View>
                <View style={styles.DetailRightSide}>
                  <Text style={GlobalStyle.DetailText}>{names.Name}</Text>
                </View>
              </View>
            </View>
            {/* ==================================Address================================ */}
            <View style={GlobalStyle.DetailContainer}>
              <View style={styles.DetailContainerPartsContainer}>
                <View style={styles.DetailLeftSide}>
                  <Text style={GlobalStyle.DetailText}>ठेगाना</Text>
                </View>
                <View style={styles.DetailRightSide}>
                  <Text style={GlobalStyle.DetailText}>{names.Address}</Text>
                </View>
              </View>
            </View>
            {/* ==================================Phone================================ */}
            <View style={GlobalStyle.DetailContainer}>
              <View style={styles.DetailContainerPartsContainer}>
                <View style={styles.DetailLeftSide}>
                  <Text style={GlobalStyle.DetailText}>फोन नम्बर</Text>
                </View>
                <View style={styles.DetailRightSide}>
                  <Text style={GlobalStyle.DetailText}>{names.Phone}</Text>
                </View>
              </View>
            </View>

            {/* ==================================Button================================ */}
            <TouchableOpacity
              style={styles.ButtonStyle}
              activeOpacity={0.85}
              onLongPress={() => props.DeleteUserData(names.Phone)}
            >
              <Text style={styles.ButtonTExt}>सदस्य प्रतिबन्धित गर्नुहोस</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

export default UserDetail;

const styles = StyleSheet.create({
  DetailContainerPartsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  DetailLeftSide: {
    width: "35%",
  },
  DetailRightSide: {
    width: "55%",
  },
  ButtonStyle: {
    width: winWidth * 0.8,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    height: 45,
    backgroundColor: SECONDARY_COLOR,
    borderRadius: 5,
    marginTop: 12,
  },
  ButtonTExt: {
    fontSize: HEADINGTTHREEFONTSIZE,
    fontWeight: "800",
    color: "white",
  },
});
