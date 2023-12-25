import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TopLogoPlacement from "./Parts/TopLogoPlacement";
import HorizontalEndingLine from "./Parts/HorizontalEndingLine";
import NonAdminInputField from "./Parts/NonAdminInputField";
import NonAdminLoginButton from "./Parts/NonAdminLoginButton";
import ErrorMessage from "../../../global/ErrorMessage";
import { onSnapshot, doc, getDoc } from "firebase/firestore";
import { db } from "../../../../FirebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NonAdminLogin = (props: any) => {
  const [Phone, setPhone] = React.useState<string>("");
  const [PIN, setPIN] = React.useState<string>("");
  const [Uploading, setUploading] = React.useState<boolean>(false);
  const [ErrorState, setErrorState] = React.useState<any>("");
  const [UserData, setUserData] = React.useState<any>([]);
  // =========================================================================
  // =========================================================================
  // =========================================================================
  const GetDataFromFirebase = async () => {
    setUploading(true);
    if (Phone?.length < 9) {
      setErrorState("फोन न: १० अंकको हुनुपर्छ");
      setUploading(false);
      return;
    }
    if (PIN?.length < 3) {
      setErrorState("पिन ४ अंकको हुनुपर्छ");
      setUploading(false);
      return;
    }

    const docRef = doc(db, "UserData", Phone);

    await getDoc(docRef).then((docSnap) => {
      if (!docSnap.exists()) {
        setErrorState("दिएको फोन न: मा कुनै पनि सदस्य दर्ता छैन ");
        setUploading(false);
        return;
      }
      setUserData({
        Address: docSnap.data().Address,
        ID: docSnap.data().ID,
        Name: docSnap.data().Name,
        PIN: docSnap.data().PIN,
        Phone: docSnap.data().Phone,
      });
      if (docSnap.data().PIN === PIN) {
        props.navigation.replace("NonAdminHome", {
          Address: docSnap.data().Address,
          ID: docSnap.data().ID,
          Name: docSnap.data().Name,
          PIN: docSnap.data().PIN,
          Phone: docSnap.data().Phone,
        });
      } else {
        setErrorState("हजुर को पिन मिलेन");
        setUserData([]);
        setUploading(false);
      }
      savePhoneForLater(`${docSnap.data().Phone}`);
    });
    setUploading(false);
  };

  // =========================================================================
  // =========================================================================
  // =========================================================================

  // =========================================================================
  const savePhoneForLater = async (CorrectPhone: string) => {
    await AsyncStorage.setItem("@SavedPhoneNumber", CorrectPhone);
  };

  // =========================================================================

  const GetSavedPhone = async () => {
    const value = await AsyncStorage.getItem("@SavedPhoneNumber");
    if (value !== null) {
      setPhone(value);
    }
  };

  React.useEffect(() => {
    GetSavedPhone();
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <TopLogoPlacement />
      <NonAdminInputField
        setPhone={setPhone}
        setPIN={setPIN}
        Phone={Phone}
        setErrorState={setErrorState}
      />
      <ErrorMessage Error={ErrorState} />
      <NonAdminLoginButton
        Uploading={Uploading}
        GetDataFromFirebase={GetDataFromFirebase}
      />
      <HorizontalEndingLine />
    </View>
  );
};

export default NonAdminLogin;
