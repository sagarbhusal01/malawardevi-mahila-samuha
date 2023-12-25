import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import {
  GlobalStyle,
  HEADINGFOURFONTSIZE,
  HEADINGTTHREEFONTSIZE,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
} from "../global/GlobalConfig";

const TransactionListWithButton = (props: any) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        props.onPress();
      }}
      onLongPress={() => {
        props?.onLongPress();
      }}
      style={[
        GlobalStyle.DetailContainer,
        {
          justifyContent: "space-around",
          paddingLeft: 15,
          backgroundColor:
            props.names.category === "Deposit" ? "#43915930" : "#DA272730",
        },
      ]}
    >
      {/* ========= Date ============== */}
      <View style={{ width: "25%" }}>
        <Text style={GlobalStyle.DetailText}>{props.names.Date}</Text>
      </View>
      {props.names?.IsPaid ? (
        <Image
          source={require("../../assets/images/Done.png")}
          style={{ height: 13.73, width: 25 }}
        />
      ) : null}
      {/* ========= Central and Right side part */}
      <View style={styles.CentralandRightsidepart}>
        {/* ============ Category and Loan Amount Container */}
        <View style={styles.CategoryandLoanAmountContainer}>
          <View
            style={[
              styles.CategoryBox,
              {
                backgroundColor:
                  props.names?.category === "Deposit"
                    ? PRIMARY_COLOR
                    : SECONDARY_COLOR,
              },
            ]}
          >
            <Text style={{ fontWeight: "800", color: "white" }}>
              {props.names?.category === "Deposit" ? "लेवी" : "ऋण"}
            </Text>
          </View>
          <Text
            style={{
              color:
                props.names?.category === "Deposit"
                  ? PRIMARY_COLOR
                  : SECONDARY_COLOR,
              fontWeight: "800",
              fontSize: HEADINGFOURFONTSIZE,
            }}
          >
            रु {props.names.Amount}
          </Text>
        </View>
        {/* =========== total and total Amount container */}
        <View style={styles.totalandtotalAmountcontainer}>
          <View
            style={{
              paddingLeft: 15,
              paddingRight: 15,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={[styles.TotalTextColor, { fontSize: 15 }]}>कुल</Text>
          </View>
          <View>
            <Text style={styles.TotalTextColor}>रु {props.names.Total}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TransactionListWithButton;

const styles = StyleSheet.create({
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
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  TotalTextColor: {
    color: "#515151",
    fontWeight: "800",
    fontSize: HEADINGFOURFONTSIZE,
  },
});
