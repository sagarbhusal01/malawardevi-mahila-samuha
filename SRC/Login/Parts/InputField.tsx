import { View, Image, TextInput } from "react-native";
import React from "react";
import { styles } from "./Login.Style";
export default function InputField(props: any) {
  return (
    <>
      <View style={styles.InputContainer}>
        <View style={styles.InputWrapper}>
          <Image
            source={require("../../../assets/images/Mail.png")}
            style={[
              {
                width: 25,
                height: 20,
                position: "absolute",
                top: 16.5,
                left: 16,
              },
            ]}
          />

          <TextInput
            keyboardType="email-address"
            style={styles.EmailInput}
            placeholder={"इमेल"}
            value={props.Email}
            placeholderTextColor={"#6A6A6A"}
            onChangeText={(text) => {
              props.setEmail(text);
            }}
          />
        </View>

        <View style={styles.InputWrapper}>
          <Image
            source={require("../../../assets/images/Password.png")}
            style={[
              {
                width: 20,
                height: 26.25,
                position: "absolute",
                top: 10.5,
                left: 16,
              },
            ]}
          />

          <TextInput
            keyboardType="default"
            style={styles.PasswordInput}
            placeholder="पास्वर्ड"
            secureTextEntry={true}
            placeholderTextColor={"#6A6A6A"}
            onChangeText={(text) => {
              props.setPassword(text);
            }}
          />
        </View>
      </View>
    </>
  );
}
