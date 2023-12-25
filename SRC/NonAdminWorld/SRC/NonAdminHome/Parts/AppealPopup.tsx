import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import {
  HEADINGFOURFONTSIZE,
  HEADINGTWOFONTSIZE,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  WRAPPER_COLOR,
  winWidth,
} from "../../../../global/GlobalConfig";
import AppealForm from "./AppealForm";
const AppealPopup = (props: any) => {
  return (
    <>
      <Modal transparent={true} visible={props.AppealPopupToggle}>
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#00000039",
          }}
          activeOpacity={1}
          onPress={() => {
            props.setAppealPopupToggle(false);
            props.setWantAppeal(false);
          }}
        />
        <View style={styles.PopupContainer}>
          <View style={styles.PopUp}>
            {props.WantAppeal ? (
              <AppealForm
                setWantAppeal={props.setWantAppeal}
                setAppealPopupToggle={props.setAppealPopupToggle}
                TransactionID={props.TransactionID}
                Phone={props.Phone}
              />
            ) : (
              <View>
                <Text style={styles.AppealHeader}>विवाद रिपोर्ट गर्नुहोस्</Text>
                <Image
                  source={require("../../../../../assets/images/Report.png")}
                  style={{
                    width: 40,
                    height: 40,
                    alignSelf: "center",
                    marginTop: 15,
                  }}
                />
                <Text
                  style={{
                    fontWeight: "800",
                    alignSelf: "center",
                    marginTop: 15,
                  }}
                >
                  के तपाइँ यो लेनदेन संग एक मुद्दा रिपोर्ट गर्न चाहनुहुन्छ।
                </Text>
                <View style={styles.ButtonsContainer}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      props.setWantAppeal(true);
                    }}
                    style={[styles.Button, { backgroundColor: PRIMARY_COLOR }]}
                  >
                    <Text style={styles.ButtonText}>चाहान्छु</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      props.setWantAppeal(false);
                      props.setAppealPopupToggle(false);
                    }}
                    style={[styles.Button, { backgroundColor: WRAPPER_COLOR }]}
                  >
                    <Text
                      style={[styles.ButtonText, { color: SECONDARY_COLOR }]}
                    >
                      चाहान्न
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
};

export default AppealPopup;

const styles = StyleSheet.create({
  PopupContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  PopUp: {
    width: winWidth * 0.9,
    minHeight: 15,
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: "white",
    borderRadius: 8,
  },
  AppealHeader: {
    fontSize: HEADINGTWOFONTSIZE,
    fontWeight: "800",
    color: SECONDARY_COLOR,
    alignSelf: "center",
  },
  ButtonsContainer: {
    width: "90%",
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-around",
    marginTop: 15,
  },
  Button: {
    height: 45,
    width: 110,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  ButtonText: {
    color: "white",
    fontWeight: "800",
  },
  TextInput: {
    borderRadius: 8,
    borderWidth: 2,
    borderColor: PRIMARY_COLOR,
    minHeight: 160,
    margin: 10,
    width: "90%",
    paddingLeft: 8,
    paddingTop: 8,
    paddingRight: 8,
    color: "black",
    fontSize: HEADINGFOURFONTSIZE,
    backgroundColor: WRAPPER_COLOR,
    fontWeight: "600",
    textAlignVertical: "top",
  },
});
