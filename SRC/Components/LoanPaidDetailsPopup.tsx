import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  GlobalStyle,
  HEADINGTWOFONTSIZE,
  PRIMARY_COLOR,
  winWidth,
} from "../global/GlobalConfig";
import TransactionList from "./TransactionList";

const LoanPaidDetailsPopup = (props: any) => {
  return (
    <>
      <Modal transparent={true} visible={props.PopupToggle}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            props.setPopupToggle(false);
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#00000039",
          }}
        />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View style={styles.Popup}>
            <Text style={styles.PopupHeader}>ऋण दिएको विवरण</Text>
            <View style={{ width: "90%", alignSelf: "center", marginTop: 20 }}>
              <Text style={GlobalStyle.DetailText}>हजुर को लेन देन</Text>
            </View>
            <TransactionList names={props.Data} />
            <View style={GlobalStyle.DetailContainer}>
              <View style={styles.LeftSide}>
                <Text style={GlobalStyle.DetailText}>
                  महिना पछी तिर्नु पर्ने
                </Text>
              </View>
              <View style={styles.RightSide}>
                <Text style={GlobalStyle.DetailText}>
                  {props.Data?.Duration}
                </Text>
              </View>
            </View>
            <View style={GlobalStyle.DetailContainer}>
              <View style={styles.LeftSide}>
                <Text style={GlobalStyle.DetailText}>ब्याज दर</Text>
              </View>
              <View style={styles.RightSide}>
                <Text style={GlobalStyle.DetailText}>
                  रु {props.Data?.InterestRate}
                </Text>
              </View>
            </View>
            <View style={GlobalStyle.DetailContainer}>
              <View style={styles.LeftSide}>
                <Text style={GlobalStyle.DetailText}>कुल तिरेको ब्याज</Text>
              </View>
              <View style={styles.RightSide}>
                <Text style={GlobalStyle.DetailText}>
                  रु {props.Data?.InterestPaid}
                </Text>
              </View>
            </View>
            <View style={GlobalStyle.DetailContainer}>
              <View style={styles.LeftSide}>
                <Text style={GlobalStyle.DetailText}>ऋण तिरेको समय</Text>
              </View>
              <View style={styles.RightSide}>
                <Text style={GlobalStyle.DetailText}>
                  {props.Data?.LoanDepositedDate}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default LoanPaidDetailsPopup;

const styles = StyleSheet.create({
  Popup: {
    width: winWidth * 0.9,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
  },
  PopupHeader: {
    textAlign: "center",
    fontWeight: "800",
    fontSize: HEADINGTWOFONTSIZE,
    color: PRIMARY_COLOR,
  },
  LeftSide: {
    width: "40%",
  },
  RightSide: {
    width: "30%",
  },
});
