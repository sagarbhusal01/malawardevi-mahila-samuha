import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Linking,
    Platform,
  } from "react-native";
  import React from "react";
  import {
    GlobalStyle,
    WRAPPER_COLOR,
  } from "../../global/GlobalConfig";
  
  const UserAccountDetails = (props: any) => {
    const CallNumber = () => {
      if (Platform.OS === "android") {
        Linking.openURL(`tel:${props.Route.params.Phone}`);
      } else {
        Linking.openURL(`telprompt:${props.Route.params.Phone}`);
      }
    };
    
    return (
      <>
      <View style={GlobalStyle.WrapperContainer}>
        <View style={[GlobalStyle.DetailContainer, { justifyContent: "center" }]}>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.LeftSideContainer}>
              <Text style={GlobalStyle.DetailText}>ठेगाना</Text>
            </View>
            <View style={styles.RightSideContainer}>
              <Text style={GlobalStyle.DetailText}>
                {props.Route.params.Address}
              </Text>
            </View>
          </View>
        </View>
        <View style={[GlobalStyle.DetailContainer, { justifyContent: "center" }]}>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.LeftSideContainer}>
              <Text style={GlobalStyle.DetailText}>फोन नम्बर</Text>
            </View>
            <View style={styles.RightSideContainer}>
              <Text style={GlobalStyle.DetailText}>
                {props.Route.params.Phone}
              </Text>
  
              <TouchableOpacity
                style={styles.PhoneImageContainer}
                onPress={() => {
                  CallNumber();
                }}
              >
                <Image
                  source={require("../../../assets/images/Call.png")}
                  style={{ height: 20, width: 20 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      </>
    );
  };
  
  export default UserAccountDetails;
  
  const styles = StyleSheet.create({
    LeftSideContainer: { width: "40%", marginLeft: 20 },
    RightSideContainer: { width: "55%",justifyContent:"center"},
  
    PhoneImageContainer: {
      position: "absolute",
      right: 15,
      alignSelf:"center",
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: WRAPPER_COLOR,
      borderRadius: 8,
    },
  });
  