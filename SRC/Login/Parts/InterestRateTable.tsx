import { View, Text } from "react-native";
import React from "react";
import { styles } from "./Login.Style";
import { GlobalStyle } from "../../global/GlobalConfig";
export default function InterestRateTable() {
  return (
    <>
      <View style={styles.Headline}>
        <Text style={styles.HeadLineText}>
          मलावरदेवी महिला समुहका आकर्शक ब्याज दर हरु
        </Text>
      </View>

      <View style={GlobalStyle.WrapperContainer}>
        <View
          style={[GlobalStyle.DetailContainer, { justifyContent: "center" }]}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={styles.AlignmentOne}>
              <Text style={GlobalStyle.DetailText}>एक पटक मा लैजान मिल्ने</Text>
            </View>
            <View style={styles.AlignMentTwo}>
              <Text style={GlobalStyle.DetailText}>रु 50,000</Text>
            </View>
          </View>
        </View>

        <View
          style={[GlobalStyle.DetailContainer, { justifyContent: "center" }]}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View style={styles.AlignmentOne}>
              <Text style={GlobalStyle.DetailText}>प्रती १०० को ब्यज दर</Text>
            </View>
            <View style={styles.AlignMentTwo}>
              <Text style={GlobalStyle.DetailText}>रु 1.5</Text>
            </View>
          </View>
        </View>
        <View
          style={[GlobalStyle.DetailContainer, { justifyContent: "center" }]}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View style={styles.AlignmentOne}>
              <Text style={GlobalStyle.DetailText}>बुझाउन नपर्ने समय</Text>
            </View>
            <View style={styles.AlignMentTwo}>
              <Text style={GlobalStyle.DetailText}>6</Text>
            </View>
          </View>
        </View>
        <View
          style={[GlobalStyle.DetailContainer, { justifyContent: "center" }]}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View style={styles.AlignmentOne}>
              <Text style={GlobalStyle.DetailText}>जती बेला पनि दिन</Text>
            </View>
            <View style={styles.AlignMentTwo}>
              <Text style={GlobalStyle.DetailText}>सकिने</Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}
