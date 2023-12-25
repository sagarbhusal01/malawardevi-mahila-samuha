import { View, Text } from "react-native";
import React from "react";

export default function ErrorMessage(props: any) {
  return (
    <>
      {props.Error != "" ? (
        <View
          style={[{ alignSelf: "center", marginTop: 0, marginBottom: -15 }]}
        >
          <Text
            style={{
              color: "red",
              fontFamily: "AnekDevanagari_400Regular",
              lineHeight: 30,
            }}
          >
            {props.Error}
          </Text>
        </View>
      ) : null}
    </>
  );
}
