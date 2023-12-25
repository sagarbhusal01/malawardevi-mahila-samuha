import { StyleSheet } from "react-native";
import {
  DETAIL_COLOR,
  GENERALTEXTFONTSIZE,
  HEADINGFOURFONTSIZE,
  HEADINGONEFONTSIZE,
  HEADINGTTHREEFONTSIZE,
  HEADINGTWOFONTSIZE,
  PRIMARY_COLOR,
  WRAPPER_COLOR,
  winWidth,
} from "../../global/GlobalConfig";

export const styles = StyleSheet.create({
  UserDataContainer: {
    width: winWidth * 0.9,
    alignSelf: "center",
    marginTop: 15,
  },
  UserDataWrapper: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  UserDataIDContainer: {
    height: 50,
    backgroundColor: WRAPPER_COLOR,
    width: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    borderColor: PRIMARY_COLOR,
    borderWidth: 2.5,
  },
  UserDataIDText: {
    fontSize: HEADINGTWOFONTSIZE,
    color: PRIMARY_COLOR,
    fontWeight: "800",
  },
  UserDataNameContainer: {
    marginLeft: 15,
  },
  UserDataNameText: {
    fontSize: HEADINGONEFONTSIZE,
    fontFamily: "AnekDevanagari_800ExtraBold",
    color: PRIMARY_COLOR,
  },
  TopicText: {
    fontSize: HEADINGTTHREEFONTSIZE,
    fontWeight: "800",
    color: PRIMARY_COLOR,
  },
 
  LeftSideDetailContainer: {
    width: "40%",
    marginLeft: 18,
  },
  RightSideDetailContainer: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems:"center"
  },
  DetailTextInput: {
    borderRadius: 8,
    borderWidth: 2,
    borderColor: PRIMARY_COLOR,
    height: 40,
    margin: 10,
    width: 120,
    paddingLeft: 8,
    color: "black",
    fontSize: HEADINGFOURFONTSIZE,
    backgroundColor: WRAPPER_COLOR,
    fontWeight:"600",
  },
  CalculateButton: {
    width: 150,
    height: 45,
    backgroundColor: PRIMARY_COLOR,
    alignSelf: "center",
    marginTop: 24,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  ButtonText: {
    color: "white",
    fontSize: HEADINGTWOFONTSIZE,
    fontWeight:"800"
  },
  DisplayCalculatedValueContainer: {
    height: 280,
    width: winWidth * 0.9,
    alignSelf: "center",
    backgroundColor: WRAPPER_COLOR,
    marginTop: 25,
    borderRadius: 15,
  },
});
