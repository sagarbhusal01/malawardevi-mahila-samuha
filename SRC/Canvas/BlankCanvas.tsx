import { View, StatusBar, ScrollView, Text } from "react-native";
import React from "react";
import Nav from "../NavBar/Nav";
import Home from "../Home/Home.Main";
import KhataPata from "../KhataPata/KhataPata.Main";
import { auth } from "../../FirebaseConfig";
import { isAdmin } from "../global/DetermineAdmin";
export default function BlankCanvas(props: any) {
  const [FocusedButton, setFocusedButton] = React.useState("Home");
  React.useEffect(() => {
    if (props.route.params?.PageRequest === "KhataPata") {
      setFocusedButton("KhataPata");
    }
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView overScrollMode="never" showsVerticalScrollIndicator={false}>
        {/*  ============================= Navigation ================================== */}
        <Nav
          FocusedButton={FocusedButton}
          setFocusedButton={setFocusedButton}
        />
        {/* ============================================================================ */}
        {/* ================================== Switch in navigation ===================== */}
        {FocusedButton !== "KhataPata" ? (
          <Home NAV={props.navigation.navigate} />
        ) : (
          <>
            {isAdmin(auth.currentUser?.email) ? (
              <KhataPata NAV={props.navigation.navigate} />
            ) : 
            null}
          </>
        )}
        {/* ============================================================================ */}
        <StatusBar barStyle={"default"} />
        <View style={{ marginBottom: 40 }} />
      </ScrollView>
    </View>
  );
}
