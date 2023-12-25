import { View } from "react-native";
import React from "react";
import Calculator from "./Parts/Calculator";
import News from "./Parts/News";

export default function Home(props: any) {
  const GoTONewsPage = () => {
    props.NAV("AllNews");
  };

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      {/* ===================== Calculator ======================== */}
      <Calculator />
      {/* ===================== News ============================== */}
      <News NAV={props.NAV} GoTONewsPage={GoTONewsPage} />
    </View>
  );
}
