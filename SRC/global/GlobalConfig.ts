import { Dimensions, StyleSheet } from "react-native";

export const PRIMARY_COLOR = "#009129";
export const SECONDARY_COLOR = "#DA2727";
export const TERTIARY_COLOR = "#4050C0";
export const WRAPPER_COLOR = "#EDEDED";
export const DETAIL_COLOR = "#DADADA";
export const winHeight = Dimensions.get("window").height;
export const winWidth = Dimensions.get("window").width;
export const BIGGERTEXT = 25;
export const HEADINGONEFONTSIZE = 20;
export const HEADINGTWOFONTSIZE = 18;
export const HEADINGTTHREEFONTSIZE = 17;
export const HEADINGFOURFONTSIZE = 16;
export const GENERALTEXTFONTSIZE = 14;

export const GlobalStyle = StyleSheet.create({
  DetailText: {
    fontWeight: "800",
  },
  DetailContainer: {
    width: "90%",
    borderRadius: 5,
    backgroundColor: DETAIL_COLOR,
    marginTop: 8,
    minHeight: 50,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 12,
  },
  WrapperContainer: {
    width: winWidth * 0.9,
    backgroundColor: WRAPPER_COLOR,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 15,
    paddingTop: 18,
    paddingBottom: 25,
  },
  Overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    opacity: 0.39,
  },
});
