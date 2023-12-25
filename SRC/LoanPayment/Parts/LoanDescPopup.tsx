import {
  StyleSheet,
  Text,
  View,
  Modal,
  Button,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import {
  GlobalStyle,
  HEADINGFOURFONTSIZE,
  HEADINGTWOFONTSIZE,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  WRAPPER_COLOR,
  winWidth,
} from "../../global/GlobalConfig";
import { CalculateAmountAfterInterest } from "../../global/AmountAfterInterestCalculator";
import ErrorMessage from "../../global/ErrorMessage";

const LoanDescPopup = (props: any) => {
  const [LoanDepositState, setLoanDepositState] =
    React.useState<boolean>(false);
  const [ErrorState, setErrorState] = React.useState<string>("");
  const [LoanDepositedAmount, setLoanDepositedAmount] =
    React.useState<number>(0);
  return (
    <>
      <Modal visible={props.TogglePopup} transparent={true}>
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "#00000039",
          }}
          activeOpacity={0.9}
          onPress={() => {
            props.setTogglePopup(false);
            setLoanDepositState(false);
          }}
        />
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={styles.PopUpContainer}>
            <Text style={styles.TopicText}>ऋण विवरण</Text>
            {/* ================ description ===================== */}
            <View style={[GlobalStyle.WrapperContainer, { width: "90%" }]}>
              <View style={[GlobalStyle.DetailContainer, { width: "87%" }]}>
                <View style={styles.LeftSideContainer}>
                  <Text style={GlobalStyle.DetailText}>लगेको रकम</Text>
                </View>
                <View style={styles.RightSideContainer}>
                  <Text style={GlobalStyle.DetailText}>
                    रु {props.PopupData?.Amount}
                  </Text>
                </View>
              </View>
              <View style={[GlobalStyle.DetailContainer, { width: "87%" }]}>
                <View style={styles.LeftSideContainer}>
                  <Text style={GlobalStyle.DetailText}>
                    प्रती महिना ब्यज दर
                  </Text>
                </View>
                <View style={styles.RightSideContainer}>
                  <Text style={GlobalStyle.DetailText}>
                    रु {props.PopupData?.InterestRate}
                  </Text>
                </View>
              </View>
              <View style={[GlobalStyle.DetailContainer, { width: "87%" }]}>
                <View style={styles.LeftSideContainer}>
                  <Text style={GlobalStyle.DetailText}>बुझाउनु पर्ने समय</Text>
                </View>
                <View style={styles.RightSideContainer}>
                  <Text style={GlobalStyle.DetailText}>
                    {props.PopupData?.Duration}
                  </Text>
                </View>
              </View>
              <View style={[GlobalStyle.DetailContainer, { width: "87%" }]}>
                <View style={styles.LeftSideContainer}>
                  <Text style={GlobalStyle.DetailText}>बुझाउनु जम्मा रकम</Text>
                </View>
                <View style={styles.RightSideContainer}>
                  <Text style={GlobalStyle.DetailText}>
                    रु{" "}
                    {CalculateAmountAfterInterest(
                      props.PopupData?.Amount,
                      props.PopupData?.InterestRate,
                      props.PopupData?.Duration
                    )}
                  </Text>
                </View>
              </View>
              {LoanDepositState ? (
                <>
                  <View style={[GlobalStyle.DetailContainer, { width: "87%" }]}>
                    <View style={styles.LeftSideContainer}>
                      <Text style={GlobalStyle.DetailText}>
                        ऋण भुक्तानी रकम
                      </Text>
                    </View>
                    <View style={[styles.RightSideContainer, { width: "45%" }]}>
                      <Text style={GlobalStyle.DetailText}>रु</Text>
                      <TextInput
                        style={[styles.DetailTextInput, { width: 80 }]}
                        maxLength={7}
                        keyboardType="number-pad"
                        onChangeText={(text) => {
                          setLoanDepositedAmount(parseFloat(text));
                        }}
                      />
                    </View>
                  </View>
                  <ErrorMessage Error={ErrorState} />
                </>
              ):null}
            </View>
            {/* =================Butotns ======================== */}
            <View style={styles.ButtonsContainer}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  if (!LoanDepositState) {
                    setLoanDepositState(true);
                    return null;
                  } else {
                    if (
                      !LoanDepositedAmount ||
                      Number.isNaN(LoanDepositedAmount)
                    ) {
                      setErrorState(" ऋण भुक्तानी रकम खाली हुनु हुँदैन");
                      return null;
                    }
                    props.LoanDeposit(
                      props.PopupData?.ID,
                      LoanDepositedAmount,
                      props.PopupData?.Amount
                    );
                    setLoanDepositState(false);
                    setLoanDepositedAmount(0);
                  }
                }}
                style={[styles.Buttons, { backgroundColor: PRIMARY_COLOR }]}
              >
                <Text style={[styles.ButtonText, { color: "white" }]}>
                  ऋण भुक्तानी
                </Text>
              </TouchableOpacity>
              {!LoanDepositState ? (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onLongPress={() => {
                    props.DeleteLoanTransactions(
                      props.PopupData?.ID,
                      props.PopupData?.Amount
                    );
                  }}
                  style={[styles.Buttons, { backgroundColor: SECONDARY_COLOR }]}
                >
                  <Text style={[styles.ButtonText, { color: "white" }]}>
                    ऋण डिलिट
                  </Text>
                </TouchableOpacity>
              ):null}

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  props.setTogglePopup(false);
                  setLoanDepositState(false);
                }}
                style={[styles.Buttons, { backgroundColor: WRAPPER_COLOR }]}
              >
                <Text style={[styles.ButtonText, { color: SECONDARY_COLOR }]}>
                  रद्ध गर्नुहोस
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default LoanDescPopup;

const styles = StyleSheet.create({
  PopUpContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    width: winWidth * 0.9,
    backgroundColor: "white",
    borderRadius: 12,
  },
  TopicText: {
    textAlign: "center",
    fontWeight: "800",
    fontSize: HEADINGTWOFONTSIZE,
    color: PRIMARY_COLOR,
  },
  LeftSideContainer: {
    width: "50%",
    marginLeft: 15,
  },
  RightSideContainer: {
    width: "30%",
    flexDirection: "row",
    alignItems: "center",
  },
  ButtonsContainer: {
    width: "95%",
    alignSelf: "center",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  Buttons: {
    height: 40,
    width: 90,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  ButtonText: {
    fontWeight: "800",
  },
  DetailTextInput: {
    borderRadius: 8,
    borderWidth: 2,
    borderColor: PRIMARY_COLOR,
    height: 40,
    margin: 10,
    width: 120,
    paddingLeft: 8,
    color: "black",
    fontSize: HEADINGFOURFONTSIZE,
    backgroundColor: WRAPPER_COLOR,
    fontWeight: "600",
  },
});
