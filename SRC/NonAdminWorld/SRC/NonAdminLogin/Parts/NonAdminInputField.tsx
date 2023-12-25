import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import React from "react";
import {
  winWidth,
  PRIMARY_COLOR,
  GENERALTEXTFONTSIZE,
} from "../../../../global/GlobalConfig";

const NonAdminInputField = (props: any) => {
  return (
    <>
      <View style={styles.InputContainer}>
        <View style={styles.InputWrapper}>
          <Image
            source={require("../../../../../assets/images/CallGrey.png")}
            style={[
              {
                width: 20,
                height: 20,
                position: "absolute",
                top: 16.5,
                left: 16,
              },
            ]}
          />

          <TextInput
            keyboardType="number-pad"
            style={styles.PhoneInput}
            placeholder={"फोन न:"}
            maxLength={10}
            value={props.Phone}
            placeholderTextColor={"#6A6A6A"}
            onChangeText={(text) => {
              props.setPhone(text);
              props.setErrorState("");
            }}
          />
        </View>

        <View style={styles.InputWrapper}>
          <Image
            source={require("../../../../../assets/images/PIN.png")}
            style={[
              {
                width: 25,
                height: 12.5,
                position: "absolute",
                top: 20,
                left: 16,
              },
            ]}
          />

          <TextInput
            keyboardType="number-pad"
            style={styles.PasswordInput}
            placeholder="४ अंक को पिन"
            maxLength={4}
            secureTextEntry={true}
            placeholderTextColor={"#6A6A6A"}
            onChangeText={(text) => {
              props.setPIN(text);
              props.setErrorState("");
            }}
          />
        </View>
      </View>
    </>
  );
};

export default NonAdminInputField;

const styles = StyleSheet.create({
  InputContainer: {
    width: winWidth * 0.8,
    alignSelf: "center",
  },
  InputWrapper: {
    flexDirection: "row",
    marginTop: 12,
    alignSelf: "center",
  },
  PhoneInput: {
    borderRadius: 8,
    borderWidth: 2,
    borderColor: PRIMARY_COLOR,
    height: 50,
    width: winWidth * 0.8,
    paddingLeft: 50,
    paddingTop: -5,
    color: "black",
    fontWeight: "500",
    fontSize: GENERALTEXTFONTSIZE,
  },
  PasswordInput: {
    borderRadius: 8,
    borderWidth: 2,
    borderColor: PRIMARY_COLOR,
    height: 50,
    width: winWidth * 0.8,
    paddingLeft: 50,
    paddingTop: -5,
    color: "black",
    fontWeight: "500",
    fontSize: GENERALTEXTFONTSIZE,
  },
});
