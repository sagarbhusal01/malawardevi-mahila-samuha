import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { styles } from "./Login.Style";
import LoadingWhite from "../../Components/LoadingWhite";

export default function LoginButton(props: any) {
  return (
    <>
      <View style={styles.AddButtonContainer}>
        <TouchableOpacity
          style={styles.AddButton}
          activeOpacity={0.8}
          onPress={() => {
            if (!props.Uploading) {
              props.LoginWithFirebase();
            }
          }}
        >
          {!props.Uploading ? (
            <>
              <Text style={styles.AddButtonText}>लग इन</Text>
              <Image
                source={require("../../../assets/images/GoForward.png")}
                style={{
                  height: 20,
                  width: 20,
                  position: "absolute",
                  right: 20,
                }}
              />
            </>
          ) : (
            <LoadingWhite />
          )}
        </TouchableOpacity>
      </View>
    </>
  );
}
