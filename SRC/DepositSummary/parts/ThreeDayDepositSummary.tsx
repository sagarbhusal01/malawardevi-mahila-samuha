import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GETNEPALIDATE } from "../../global/GETNEPALIDATE";
import {
  GlobalStyle,
  HEADINGFOURFONTSIZE,
  winWidth,
  HEADINGTTHREEFONTSIZE,
} from "../../global/GlobalConfig";
import TransactionList from "../../Components/TransactionList";
import TransactionListWithButton from "../../Components/TransactionListWithButton";

const ThreeDayDepositSummary = (props: any) => {
  return (
    <View>
      {props.AllThreedayDepositTransaction?.length ? (
        <>
          <View style={GlobalStyle.WrapperContainer}>
            <View style={{ width: "90%", alignSelf: "center" }}>
              <Text style={[GlobalStyle.DetailText]}>{GETNEPALIDATE()}</Text>
            </View>

            <>
              {props.AllThreedayDepositTransaction.map(
                (names: any, key: number) => {
                  return (
                    <View key={key}>
                      <View
                        style={{
                          width: "90%",
                          alignSelf: "center",
                          marginTop: 15,
                        }}
                      >
                        <Text style={[GlobalStyle.DetailText]}>
                          {names.Name}
                        </Text>
                      </View>

                      <TransactionListWithButton
                        names={names}
                        onPress={() => {
                          props.NAV("userAccount", {
                            Name: names.Name,
                            ID: names.ID,
                            Address: names.Address,
                            Phone: names.Phone,
                          });
                        }}
                      />
                    </View>
                  );
                }
              )}
            </>
          </View>

          {/* // ========================================================================== */}

          <View style={GlobalStyle.WrapperContainer}>
            <View style={GlobalStyle.DetailContainer}>
              <Text style={GlobalStyle.DetailText}>आज को जम्मा लेवी</Text>
              <Text style={GlobalStyle.DetailText}>
                रु {props.TotalThreeDayDeposit}
              </Text>
            </View>
          </View>
          {/* // ========================================================================== */}
        </>
      ) : (
        <View style={{ width: winWidth * 0.9, alignSelf: "center" }}>
          <Text style={styles.NoItemsText}>
            यो तीन दिनमा कुनै लेवी जम्मा भएन{" "}
          </Text>
        </View>
      )}
    </View>
  );
};

export default ThreeDayDepositSummary;

const styles = StyleSheet.create({
  NoItemsText: {
    marginTop: 10,
    fontFamily: "AnekDevanagari_800ExtraBold",
    fontSize: HEADINGTTHREEFONTSIZE,
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
