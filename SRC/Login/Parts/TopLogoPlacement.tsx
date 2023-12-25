import { View, Text, Image } from "react-native";
import React from "react";
import { styles } from "./Login.Style";

export default function TopLogoPlacement() {
  return (
    <>
      <View style={styles.WindowContainer}>
        <Image
          source={require("../../../assets/images/Window.png")}
          style={{
            height: 50,
            width: 50,
          }}
        />
        <View style={styles.CompanyNameContainer}>
          <Text style={styles.ComapnyName}>मलावरदेवी महिला समुह</Text>
        </View>
      </View>
      <View style={styles.WelcomeContainer}>
        <Text style={styles.WelcomeText}>स्वागत छ ! </Text>
      </View>

      <View style={styles.LoginTextContainer}>
        <Text style={styles.LoginText}>लग इन गनुहोस</Text>
      </View>
    </>
  );
}
