import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import React from "react";
import {
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  WRAPPER_COLOR,
  winHeight,
  winWidth,
} from "../../global/GlobalConfig";

const PopupActions = (props: any) => {
  const [PopupToggleState, setPopupToggleState] =
    React.useState<boolean>(false);
  return (
    <View style={styles.Container}>
      <TouchableOpacity
        style={styles.ButtonHitbox}
        activeOpacity={0.6}
        onPress={() => {
          setPopupToggleState(true);
        }}
      >
        <Image
          source={require("../../../assets/images/More.png")}
          style={{ height: 21, width: 5.1 }}
        />
      </TouchableOpacity>
      <Modal transparent={true} visible={PopupToggleState}>
        <TouchableOpacity
          style={styles.Overlay}
          activeOpacity={1}
          onPress={() => {
            setPopupToggleState(false);
          }}
        />
        <View style={styles.PopupContainer}>
          <View style={styles.PopupContent}>
            <View style={styles.PopupOptionsCOntainer}>
              <TouchableOpacity
                style={styles.OptionBox}
                activeOpacity={0.8}
                onPress={() => {
                  props.NAV("AddNewMember");
                  setPopupToggleState(false);
                }}
              >
                <Image
                  source={require("../../../assets/images/AddMember.png")}
                  style={{ height: 35, width: 48.13 }}
                />
                <Text
                  style={{
                    fontWeight: "800",
                    marginTop: 10,
                    color: PRIMARY_COLOR,
                  }}
                >
                  नयाँ सदस्य थप
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.OptionBox}
                activeOpacity={0.8}
                onPress={() => {
                  props.NAV("DeleteMember");
                  setPopupToggleState(false);
                }}
              >
                <Image
                  source={require("../../../assets/images/DeleteMember.png")}
                  style={{ height: 35, width: 48.13 }}
                />
                <Text
                  style={{
                    fontWeight: "800",
                    marginTop: 10,
                    color: SECONDARY_COLOR,
                  }}
                >
                  सदस्य प्रतिबन्धित
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.OptionBox}
                activeOpacity={0.8}
                onPress={() => {
                  props.NAV("AllNews");
                  setPopupToggleState(false);
                }}
              >
                <Image
                  source={require("../../../assets/images/NewsAddGreen.png")}
                  style={{ height: 28.33, width: 30 }}
                />
                <Text
                  style={{
                    fontWeight: "800",
                    marginTop: 10,
                    color: PRIMARY_COLOR,
                  }}
                >
                  समाचारहरु
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.OptionBox}
                activeOpacity={0.8}
                onPress={() => {
                  props.NAV("DepositSummary");
                  setPopupToggleState(false);
                }}
              >
                <Image
                  source={require("../../../assets/images/Lewi.png")}
                  style={{ height: 27, width: 23 }}
                />
                <Text
                  style={{
                    fontWeight: "800",
                    marginTop: 10,
                    color: PRIMARY_COLOR,
                  }}
                >
                  लेवी
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.OptionBox}
                activeOpacity={0.8}
                onPress={() => {
                  props.NAV("LoanSummary");
                  setPopupToggleState(false);
                }}
              >
                <Image
                  source={require("../../../assets/images/Loan.png")}
                  style={{ height: 27, width: 23 }}
                />
                <Text
                  style={{
                    fontWeight: "800",
                    marginTop: 10,
                    color: SECONDARY_COLOR,
                  }}
                >
                  ऋण
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PopupActions;

const styles = StyleSheet.create({
  Container: {},
  ButtonHitbox: {
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  Overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#00000039",
  },
  PopupContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  PopupContent: {
    width: winWidth * 0.9,
    backgroundColor: "white",
    borderRadius: 8,
    paddingTop: 30,
    paddingBottom: 30,
  },
  PopupOptionsCOntainer: {
    flexDirection: "row",
    gap: 20,
    alignSelf: "center",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  OptionBox: {
    minHeight: 95,
    padding: 20,
    borderRadius: 8,
    backgroundColor: WRAPPER_COLOR,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
});
