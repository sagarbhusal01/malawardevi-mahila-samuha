import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import {
  winWidth,
  PRIMARY_COLOR,
  HEADINGTWOFONTSIZE,
  GlobalStyle,
  HEADINGFOURFONTSIZE,
  SECONDARY_COLOR,
} from "../../global/GlobalConfig";
import TransactionListWithButton from "../../Components/TransactionListWithButton";

const AllLoanTransactions = (props: any) => {
  return (
    <>
      <View style={styles.HeaderContainer}>
        <View style={styles.Header}>
          <Text style={styles.HeaderText}> ऋण विवरण </Text>
        </View>
      </View>
      {/* ==================== Listing all loan Transactions ========================= */}

      <View style={GlobalStyle.WrapperContainer}>
        {props.AllLoanTransactionList.map((names: any, key: number) => {
          return (
            <View key={key}>
              <TransactionListWithButton
                names={names}
                onPress={() => {
                  props.setPopupData({
                    ID: names.ID,
                    Amount: names.Amount,
                    Date: names.Date,
                    Total: names.Total,
                    category: names.category,
                    Duration: names.Duration,
                    InterestRate: names.InterestRate,
                    IsPaid: names.IsPaid,
                    CreatedAt: names.CreatedAt,
                  });
                  setTimeout(() => {
                    props.setTogglePopup(true);
                  }, 150);
                }}
              />
            </View>
          );
        })}
      </View>
    </>
  );
};

export default AllLoanTransactions;

const styles = StyleSheet.create({
  HeaderContainer: {
    width: winWidth * 0.9,
    alignSelf: "center",
    marginTop: 20,
  },
  Header: {
    width: 140,
    height: 50,
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
  CategoryText: {
    color: "white",
    fontWeight: "800",
    fontSize: HEADINGFOURFONTSIZE,
  },
  CentralandRightsidepart: {
    width: "60%",
  },
  CategoryandLoanAmountContainer: {
    flexDirection: "row",
    padding: 10,
    paddingBottom: 5,
    justifyContent: "space-around",
    alignItems: "center",
  },
  totalandtotalAmountcontainer: {
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    justifyContent: "space-around",
    alignItems: "center",
  },
  CategoryBox: {
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  TotalTextColor: {
    color: "#515151",
    fontWeight: "800",
    fontSize: HEADINGFOURFONTSIZE,
  },
});
