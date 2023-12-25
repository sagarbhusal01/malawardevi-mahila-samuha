import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "./Home.Content.Style";
import DisplayCalculatedValue from "../../NonAdminWorld/SRC/Calculator/Parts/DisplayCalculatedValue";
import { GlobalStyle } from "../../global/GlobalConfig";

export default function Calculator(props: any) {
  const [Amount, setAmount] = React.useState<number>(0);
  const [Rate, setRate] = React.useState<number>(0);
  const [Time, setTime] = React.useState<number>(0);
  const [CalculatedValue, setCalculatedValue] = React.useState<number>();

  const Calculate = () => {
    if (!Time || !Rate || !Amount) {
      setCalculatedValue(0);
      return null;
    }

    // =================================
    var RateInPercentage = (100 * Rate) / (100 * (1 / 12));
    var AmountAfterInterest =
      Amount + (Amount * (Time / 12) * RateInPercentage) / 100;
    //===================================

    setCalculatedValue(Math.round(AmountAfterInterest));
  };

  return (
    <>
      <View style={GlobalStyle.WrapperContainer}>
        <View style={{ alignSelf: "center" }}>
          <Text style={styles.TopicText}>ब्याज दर क्याल्कुलेटर</Text>
        </View>
        <View style={[GlobalStyle.DetailContainer, { marginTop: 12 }]}>
          <View style={styles.LeftSideDetailContainer}>
            <Text style={GlobalStyle.DetailText}>जम्मा लगेको रकम</Text>
          </View>
          <View style={styles.RightSideDetailContainer}>
            <Text style={GlobalStyle.DetailText}>रु</Text>

            <TextInput
              maxLength={9}
              style={styles.DetailTextInput}
              keyboardType="number-pad"
              onChangeText={(text) => {
                setAmount(parseInt(text));
              }}
            />
          </View>
        </View>
        <View style={[GlobalStyle.DetailContainer, { marginTop: 8 }]}>
          <View style={[styles.LeftSideDetailContainer, { width: "55%" }]}>
            <Text style={GlobalStyle.DetailText}>
              प्रती महिना १०० को ब्यज दर
            </Text>
          </View>
          <View style={[styles.RightSideDetailContainer, { width: "30%" }]}>
            <Text style={GlobalStyle.DetailText}>रु</Text>

            <TextInput
              style={[styles.DetailTextInput, { width: 50 }]}
              maxLength={3}
              keyboardType="number-pad"
              onChangeText={(text) => {
                setRate(parseFloat(text));
              }}
            />
          </View>
        </View>
        <View style={[GlobalStyle.DetailContainer, { marginTop: 8 }]}>
          <View style={styles.LeftSideDetailContainer}>
            <Text style={GlobalStyle.DetailText}>लगेको समय महिनमा </Text>
          </View>
          <View style={styles.RightSideDetailContainer}>
            <Text style={GlobalStyle.DetailText}>{"   "}</Text>

            <TextInput
              style={[styles.DetailTextInput, { width: 50 }]}
              maxLength={3}
              keyboardType="number-pad"
              onChangeText={(text) => {
                setTime(parseInt(text));
              }}
            />
          </View>
        </View>
        {/* =====================Calculate Button======================== */}
        <TouchableOpacity
          style={styles.CalculateButton}
          activeOpacity={0.8}
          onPress={() => Calculate()}
        >
          <Text style={styles.ButtonText}>Calculate</Text>
        </TouchableOpacity>
      </View>
      {/* ====================== Displaying Calculated Value ======================= */}

      {CalculatedValue ? (
        <DisplayCalculatedValue
          Time={Time}
          Rate={Rate}
          Amount={Amount}
          CalculatedValue={CalculatedValue}
          setCalculatedValue={setCalculatedValue}
        />
      ) : null}

      {/* ========================================================= */}
    </>
  );
}
