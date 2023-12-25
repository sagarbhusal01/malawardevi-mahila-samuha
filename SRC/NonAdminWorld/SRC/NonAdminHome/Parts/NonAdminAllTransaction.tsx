import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  GlobalStyle,
  HEADINGTWOFONTSIZE,
  PRIMARY_COLOR,
  winWidth,
} from "../../../../global/GlobalConfig";
import TransactionListWithButton from "../../../../Components/TransactionListWithButton";
import LoanPaidDetailsPopup from "../../../../Components/LoanPaidDetailsPopup";

const NonAdminAllTransaction = (props: any) => {
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
        <View
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
        </View>
      </View>
      {/* ====================== ACCOUNT TRANSACTION LIST ================ */}
      <View>
        {props.AllTransactionList?.length ? (
          <>
            <View style={GlobalStyle.WrapperContainer}>
              {props.AllTransactionList.map((names: any, key: number) => {
                return (
                  <TransactionListWithButton
                    names={names}
                    key={key}
                    onLongPress={() => {
                      props.setTransactionID(names.ID);
                      props.setAppealPopupToggle(true);
                    }}
                    onPress={() => {
                      if (names.category === "Loan" && names.IsPaid) {
                        props.setLoanPaidDetailsPopupToggle(true);
                        props.setLoanPaidData(names);
                      }
                    }}
                  />
                );
              })}
            </View>
          </>
        ) : null}
      </View>
      {/* ================================================================ */}
    </>
  );
};

export default NonAdminAllTransaction;

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
