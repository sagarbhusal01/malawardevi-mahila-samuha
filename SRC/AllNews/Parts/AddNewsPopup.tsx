import {
  TouchableOpacity,
  Modal,
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";
import React from "react";
import {
  HEADINGFOURFONTSIZE,
  HEADINGTTHREEFONTSIZE,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  WRAPPER_COLOR,
  winWidth,
} from "../../global/GlobalConfig";
import ErrorMessage from "../../global/ErrorMessage";

const AddNewsPopup = (props: any) => {
  const [ErrorState, setErrorState] = React.useState<string>("");
  return (
    <>
      <Modal visible={props.PopupToggleState} transparent={true}>
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
            props.setPopupToggleState(false);
            setErrorState("");
          }}
        />
        <View style={styles.Wrapper}>
          <View style={styles.AddNewsPopupContainer}>
            <Text style={[styles.PopupTopic]}>नयाँ समाचार थप</Text>
            <TextInput
              style={styles.TextInput}
              multiline={true}
              placeholder="तपाईं को समाचार लेख्नु होस । "
              numberOfLines={5}
              onChangeText={(text) => {
                props.setNewNewsData(text);
              }}
            />
            <View style={{ marginTop: -15 }}>
              <ErrorMessage Error={ErrorState} />
            </View>
            <View style={styles.ButtonsContainer}>
              <TouchableOpacity
                activeOpacity={0.6}
                style={[
                  styles.PrimaryButton,
                  { backgroundColor: PRIMARY_COLOR },
                ]}
                onPress={() => {
                  if (props.NewNewsData == "") {
                    setErrorState("समाचार खाली हुनु हुँदैन");
                  } else if (props.NewNewsData.length < 50) {
                    setErrorState("समाचार ५० अक्षर भन्दा बढी हुनु पर्छ");
                  } else {
                    props.AddNewNewsDataIntoFirebase();
                  }
                }}
              >
                <Text style={{ fontWeight: "800", color: "white" }}>
                  थप गर्नुहोस
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  props.setPopupToggleState(false);
                  setErrorState("");
                }}
                style={[
                  styles.PrimaryButton,
                  { backgroundColor: WRAPPER_COLOR },
                ]}
              >
                <Text style={{ fontWeight: "800", color: SECONDARY_COLOR }}>
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

export default AddNewsPopup;

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  AddNewsPopupContainer: {
    padding: 25,
    width: winWidth * 0.9,
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 10,
  },
  PopupTopic: {
    fontSize: HEADINGTTHREEFONTSIZE,
    fontWeight: "800",
    color: PRIMARY_COLOR,
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
  ButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 15,
  },
  PrimaryButton: {
    height: 40,
    width: 90,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
});
