import { styles } from "./Parts/Login.Style";
import { View, Text, StatusBar, Image, ScrollView } from "react-native";
import React from "react";
// ==========================================
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../FirebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ErrorMessage from "../global/ErrorMessage";
import { FirebaseErrorParse } from "../global/FirebaseErrorParse";
import InputField from "./Parts/InputField";
import LoginButton from "./Parts/LoginButton";
import InterestRateTable from "./Parts/InterestRateTable";
import TopLogoPlacement from "./Parts/TopLogoPlacement";
import HorizontalEndingLine from "./Parts/HorizontalEndingLine";
import { CatchMessagetype } from "../global/Types";
import GoToNonAdmin from "./Parts/GoToNonAdmin";

//==========================================

export default function Login(props: any) {
  // all the states and variables are initialized here

  const [Email, setEmail] = React.useState<any>("");
  const [Password, setPassword] = React.useState<any>("");

  const [ErrorState, setErrorState] = React.useState<any>("");

  const [Uploading, setUploading] = React.useState<boolean>(false);
  const [CatchMessage, setCatchMessage] = React.useState<CatchMessagetype>();

  // ============================ Login With Firebase  ================================

  const LoginWithFirebase = () => {
    if (Email == "" || Password == "") {
      setErrorState("ईमेल र पास्वर्ड दुबै खाली हुन हुँदैन");
      return null;
    }
    setUploading(true);

    signInWithEmailAndPassword(auth, Email, Password)
      .then(() => {
        // Signed in
        setUploading(false);
        SaveEmailForLater(Email).then(() => {
          props.navigation.replace("Canvas");
        });
        // ...
      })
      .catch((error) => {
        setErrorState(FirebaseErrorParse(error.message));
        console.log(error.message);
        setUploading(false);
      });
  };

  // =========================================================================
  const SaveEmailForLater = async (CorrectEmail: string) => {
    try {
      await AsyncStorage.setItem("@SavedEmail", CorrectEmail);
    } catch (e: any) {
      setCatchMessage({
        message: "हजुरको  गर्न सकिएन",
        ErrorCode: e,
      });
    }
  };

  // =========================================================================

  const GetSavedEmail = async () => {
    try {
      const value = await AsyncStorage.getItem("@SavedEmail");
      if (value !== null) {
        setEmail(value);
      }
    } catch (e: any) {
      setCatchMessage({
        message: "हजुरको सेब ईमेल पत्ता गर्न सकिएन",
        ErrorCode: e,
      });
    }
  };
  // =========================================================================

  React.useEffect(() => {
    GetSavedEmail();
  }, []);
  // ==========================================================================
  return (
    <View style={styles.container}>
      <ScrollView overScrollMode="never" showsVerticalScrollIndicator={false}>
        {/* ============================Top Logo placement========================= */}
        <TopLogoPlacement />

        {/* ============================= Login Input Feild ============================= */}
        <InputField
          setEmail={setEmail}
          setPassword={setPassword}
          Email={Email}
        />
        {/* ================================ Error Handler ============================== */}

        <ErrorMessage Error={ErrorState} />

        {/* ========================= login Button========================================= */}
        <LoginButton
          Uploading={Uploading}
          LoginWithFirebase={LoginWithFirebase}
        />
       <GoToNonAdmin NAV={props.navigation.navigate}/>
        {/* =============================== Horizontal Ending Line  ============================== */}
        <HorizontalEndingLine />
        {/* ==================================== Aakarshak byaj dar  ============================= */}
        <InterestRateTable />
        {/* ===================================================================================== */}
        <View style={{ marginBottom: 40 }} />
        {/*for bottom margin */}
        <StatusBar barStyle={"default"} />
      </ScrollView>
    </View>
  );
}
