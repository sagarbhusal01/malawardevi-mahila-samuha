import React from "react";
import { View, ActivityIndicator, Image } from "react-native";
import LoadingGreen from "./LoadingGreen";
//
//
//
export default function AffairHandler(props: any) {
  //
  React.useEffect(() => {
    props.navigation.replace("Login");
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <LoadingGreen />
    </View>
  );
}
