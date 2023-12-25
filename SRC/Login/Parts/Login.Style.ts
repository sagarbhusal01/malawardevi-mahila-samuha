import { StyleSheet } from "react-native";
import {
  BIGGERTEXT,
  DETAIL_COLOR,
  GENERALTEXTFONTSIZE,
  HEADINGTWOFONTSIZE,
  PRIMARY_COLOR,
  WRAPPER_COLOR,
  winWidth,
} from "../../global/GlobalConfig";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  WindowContainer: {
    margin: 8,
    marginTop: 12,
    flexDirection: "row",
  },
  CompanyNameContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  ComapnyName: {
    fontSize: BIGGERTEXT,
    fontFamily: "AnekDevanagari_700Bold",
    color: PRIMARY_COLOR,
    lineHeight: 45,
  },
  WelcomeContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  WelcomeText: {
    fontFamily: "AnekDevanagari_800ExtraBold",
    fontSize: BIGGERTEXT,
  },

  LoginTextContainer: {
    width: winWidth * 0.8,
    alignSelf: "center",
    marginTop: 20,
  },
  LoginText: {
    fontSize: HEADINGTWOFONTSIZE,
    fontFamily: "AnekDevanagari_800ExtraBold",
    color: "grey",
  },
  InputContainer: {
    width: winWidth * 0.8,
    alignSelf: "center",
  },
  InputWrapper: {
    flexDirection: "row",
    marginTop: 12,
    alignSelf: "center",
  },
  EmailInput: {
    borderRadius: 8,
    borderWidth: 2,
    borderColor: PRIMARY_COLOR,
    height: 50,
    width: winWidth * 0.8,
    paddingLeft: 50,
    paddingTop: -5,
    color: "black",
    fontWeight: "500",
    fontSize: GENERALTEXTFONTSIZE,
  },
  PasswordInput: {
    borderRadius: 8,
    borderWidth: 2,
    borderColor: PRIMARY_COLOR,
    height: 50,
    width: winWidth * 0.8,
    paddingLeft: 50,
    paddingTop: -5,
    color: "black",
    fontWeight: "500",
    fontSize: GENERALTEXTFONTSIZE,
  },
  AddButtonContainer: {
    width: winWidth * 0.8,
    alignSelf: "center",
    marginTop: 12,
  },
  AddButton: {
    backgroundColor: PRIMARY_COLOR,
    height: 50,
    width: "100%",
    borderRadius: 5,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  AddButtonText: {
    color: "white",
    fontSize: HEADINGTWOFONTSIZE,
    fontWeight: "800",
  },
  HorizontalLine: {
    width: winWidth,
    height: 2,
    backgroundColor: DETAIL_COLOR,
    marginTop: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  Headline: {
    width: winWidth * 0.9,
    alignSelf: "center",
    marginTop: 35,
  },
  HeadLineText: {
    fontSize: HEADINGTWOFONTSIZE,
    color: PRIMARY_COLOR,
    textAlign: "center",
    fontWeight: "800",
  },
  AlignmentOne: { width: "65%", marginLeft: 20 },
  AlignMentTwo: { width: "28%" },
});
