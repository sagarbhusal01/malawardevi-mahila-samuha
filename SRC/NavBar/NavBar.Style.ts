import { StyleSheet } from "react-native";
import {
  DETAIL_COLOR,
  PRIMARY_COLOR,
  WRAPPER_COLOR,
} from "../global/GlobalConfig";
export const NavStyle = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: "#E9E9E9",
    width: 280,
    alignSelf: "center",
    borderRadius: 10,
    justifyContent: "center",
    marginTop: 15,
  },
  Wrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  ICONContainer: {
    height: 45,
    width: "55%",
    borderRadius: 5,
    backgroundColor: PRIMARY_COLOR,
    justifyContent: "center",
    alignSelf: "center",
  },
  HomeIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    margin: 15,
  },
  KhataPataIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    margin: 15,
  },
});
