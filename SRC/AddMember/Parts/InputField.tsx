import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import {
  GENERALTEXTFONTSIZE,
  PRIMARY_COLOR,
  winWidth,
} from "../../global/GlobalConfig";

const InputField = (props: any) => {
  return (
    <>
      <View style={{ alignSelf: "center", marginBottom: 15 }}>
        <Text style={{ marginLeft: 2, marginBottom: 5, fontWeight: "800" }}>
          {props.PlaceHolder}
        </Text>
        <TextInput
          secureTextEntry={props.secureTextEntry}
          keyboardType={props.keyboardType}
          style={styles.TextInputContainer}
          maxLength={props.maxLength}
          onChangeText={(text) => {
            props.setValue(text);
          }}
        />
      </View>
    </>
  );
};

export default InputField;

const styles = StyleSheet.create({
  TextInputContainer: {
    borderRadius: 8,
    borderWidth: 2,
    borderColor: PRIMARY_COLOR,
    height: 50,
    width: winWidth * 0.8,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: -5,
    color: "black",
    fontWeight: "500",
    fontSize: GENERALTEXTFONTSIZE,
  },
});
