import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  GlobalStyle,
  HEADINGTWOFONTSIZE,
  PRIMARY_COLOR,
  winWidth,
} from "../../global/GlobalConfig";

const AccountTransactionSummary = (props: any) => {
  // =========================================================

  return (
    <>
      {/* ================== Bibarad header ===================== */}
      <View style={styles.HeaderContainer}>
        <View style={styles.Header}>
          <Text style={styles.HeaderText}>विवरण</Text>
        </View>
      </View>
      {/* ====================== ACCOUNT SUMMARY ================ */}
      <View style={GlobalStyle.WrapperContainer}>
        <View
          style={[GlobalStyle.DetailContainer, { justifyContent: "center" }]}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={styles.LeftSideContainer}>
              <Text style={GlobalStyle.DetailText}>आज सम्मको जम्मा लेवी</Text>
            </View>
            <View style={styles.RightSideContainer}>
              <Text style={GlobalStyle.DetailText}>रु {props.Deposit}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            if (
              props.Loan === 0 ||
              props.Loan === "0" ||
              props.Loan === null ||
              props.Loan === undefined
            ) {
              return null;
            }
            props.GOTOLoanPaymentPage();
          }}
          style={[GlobalStyle.DetailContainer, { justifyContent: "center" }]}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={styles.LeftSideContainer}>
              <Text style={GlobalStyle.DetailText}>जम्मा लगेको ऋण </Text>
            </View>
            <View style={styles.RightSideContainer}>
              <Text style={GlobalStyle.DetailText}>रु {props.Loan}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default AccountTransactionSummary;

const styles = StyleSheet.create({
  HeaderContainer: {
    width: winWidth * 0.9,
    alignSelf: "center",
    marginTop: 35,
  },
  Header: {
    width: 110,
    height: 45,
    backgroundColor: PRIMARY_COLOR,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  HeaderText: {
    color: "white",
    fontSize: HEADINGTWOFONTSIZE,
    fontWeight: "800",
  },
  LeftSideContainer: { width: "65%", marginLeft: 20 },
  RightSideContainer: { width: "30%" },
});
