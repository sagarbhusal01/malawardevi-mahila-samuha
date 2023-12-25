import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { GlobalStyle, HEADINGTTHREEFONTSIZE } from "../../global/GlobalConfig";
import LoadingGreenSmall from "../../Components/LoadingGreenSmall";
import { GETNEPALIDATE } from "../../global/GETNEPALIDATE";

export default function Summary(props: any) {
  const TodayDate = GETNEPALIDATE();
  // ===========================================
  return (
    <View style={GlobalStyle.WrapperContainer}>
      {/* ==================== Date================================ */}
      <View style={{ width: "90%", alignSelf: "center" }}>
        <Text style={styles.TodaysDateText}>{TodayDate}</Text>
      </View>
      {/* ============================================================ */}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          props.NAV("LoanSummary");
        }}
        style={GlobalStyle.DetailContainer}
      >
        <View style={styles.LeftSideContainer}>
          <Text style={GlobalStyle.DetailText}>जम्मा दिएको ऋण</Text>
        </View>
        <View style={styles.RightSideContainer}>
          {props.Cash_Given ? (
            <>
              <Text style={GlobalStyle.DetailText}>रु {props.Cash_Given}</Text>
            </>
          ) : (
            <LoadingGreenSmall />
          )}
        </View>
      </TouchableOpacity>
      {/*=========================================================== */}
      <View style={GlobalStyle.DetailContainer}>
        <View style={styles.LeftSideContainer}>
          <Text style={GlobalStyle.DetailText}>जम्मा ब्याज सन्कलन</Text>
        </View>
        <View style={styles.RightSideContainer}>
          {props.Cash_Taken ? (
            <>
              <Text style={GlobalStyle.DetailText}>
                रु {props.InterestEarned}
              </Text>
            </>
          ) : (
            <LoadingGreenSmall />
          )}
        </View>
      </View>
      {/*=========================================================== */}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          props.NAV("DepositSummary");
        }}
        style={GlobalStyle.DetailContainer}
      >
        <View style={styles.LeftSideContainer}>
          <Text style={GlobalStyle.DetailText}>जम्मा लेवी सन्कलन</Text>
        </View>
        <View style={styles.RightSideContainer}>
          {props.Cash_Taken ? (
            <>
              <Text style={GlobalStyle.DetailText}>रु {props.Cash_Taken}</Text>
            </>
          ) : (
            <LoadingGreenSmall />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  TodaysDateText: {
    fontSize: HEADINGTTHREEFONTSIZE,
    fontFamily: "AnekDevanagari_800ExtraBold",
  },
  LeftSideContainer: {
    width: "53%",
  },
  RightSideContainer: {
    width: "30%",
    justifyContent: "center",
  },
});
