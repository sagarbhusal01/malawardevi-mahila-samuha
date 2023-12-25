import {
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import {
  GlobalStyle,
  HEADINGTTHREEFONTSIZE,
  PRIMARY_COLOR,
  winWidth,
} from "../global/GlobalConfig";
import InputField from "./Parts/InputField";
import ErrorMessage from "../global/ErrorMessage";
import {
  collection,
  doc,
  getCountFromServer,
  setDoc,
} from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import LoadingWhite from "../Components/LoadingWhite";
import { CatchMessagetype } from "../global/Types";
import CatchError from "../global/CatchError";

const AddMember = () => {
  const [Name, setName] = React.useState<string>("");
  const [Address, setAddress] = React.useState<string>("");
  const [PhoneNumber, setPhoneNumber] = React.useState<string>("");
  const [ErrorState, setErrorState] = React.useState<string>("");
  const [UniqueID, setUniqueID] = React.useState<number>(0);
  const [Uploading, setUploading] = React.useState<boolean>(false);
  const [CatchMessage, setCatchMessage] = React.useState<CatchMessagetype>();
  const [PIN, setPIN] = React.useState<string>("");
  //
  // =====================================================================
  // =====================================================================
  // =====================================================================
  const CheckDataAndProceed = () => {
    if (!Name || !Address || !PhoneNumber || !PIN) {
      setErrorState("कुनै पनि ठाउ खाली हुनु हुँदैन");
      return;
    }
    if (Name.length < 10 || Address.length < 10 || PhoneNumber.length <= 9) {
      setErrorState("नाम, ठेगाना र फोन नम्बर १० अक्षर भन्दा बढी हुनु पर्छ");
      return;
    }
    if (PIN.length < 3) {
      setErrorState("पिन ४ अंकको हुनु पर्छ ");

      return;
    }
    SETUserData();
  };
  // =====================================================================
  // =====================================================================
  // =====================================================================
  const SETUserData = async () => {
    await setDoc(doc(db, "UserData", `${parseInt(PhoneNumber)}`), {
      Name: Name,
      Address: Address,
      Phone: parseInt(PhoneNumber),
      ID: UniqueID,
      PIN:PIN
    })
      .then(() => {
        setUploading(false);
        ToastAndroid.show("नयाँ सदस्य थप भयो", ToastAndroid.LONG);
        setErrorState("");
        GetUniqueIDForNewMember();
      })
      .catch((e) => {
        setCatchMessage({
          message: "केहि समस्या आयो",
          ErrorCode: e.message,
        });
        setUploading(false);
      });
  };
  // =====================================================================
  // =====================================================================
  // =====================================================================

  const GetUniqueIDForNewMember = async () => {
    setUploading(true);
    setUniqueID(0);
    const UserDataRef = collection(db, "UserData");
    const snapshot = await getCountFromServer(UserDataRef);
    setUniqueID(snapshot.data().count + 1);
    setUploading(false);
  };

  // =====================================================================
  // =====================================================================
  // =====================================================================

  // =====================================================================
  // =====================================================================
  // =====================================================================
  React.useEffect(() => {
    GetUniqueIDForNewMember();
    setErrorState("");
  }, []);
  // =====================================================================
  // =====================================================================
  // =====================================================================

  return (
    <View style={styles.Container}>
      <ScrollView overScrollMode="never" showsVerticalScrollIndicator={false}>
        <CatchError CatchMessage={CatchMessage} />
        <View style={GlobalStyle.WrapperContainer}>
          <InputField
            PlaceHolder={"नाम"}
            keyboardType={"default"}
            maxLength={35}
            setValue={setName}
          />
          <InputField
            PlaceHolder={"ठेगाना"}
            keyboardType={"default"}
            maxLength={35}
            setValue={setAddress}
          />
          <InputField
            PlaceHolder={"फोन नम्बर"}
            keyboardType={"number-pad"}
            maxLength={10}
            setValue={setPhoneNumber}
          />
          <InputField
            PlaceHolder={"४ अंकको पिन"}
            keyboardType={"number-pad"}
            maxLength={4}
            setValue={setPIN}
          />
          <View
            style={{
              alignSelf: "center",
              width: winWidth * 0.9,
              alignItems: "center",
            }}
          >
            {ErrorState ? (
              <View style={{ marginBottom: 15 }}>
                <ErrorMessage Error={ErrorState} />
              </View>
            ) : null}
            <TouchableOpacity
              activeOpacity={0.85}
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 50,
                backgroundColor: PRIMARY_COLOR,
                width: winWidth * 0.8,
                borderRadius: 8,
              }}
              onPress={() => {
                if (!Uploading) {
                  CheckDataAndProceed();
                }
              }}
            >
              {!Uploading ? (
                <Text
                  style={{
                    fontSize: HEADINGTTHREEFONTSIZE,
                    fontWeight: "800",
                    color: "white",
                  }}
                >
                  नयाँ सदस्य थप गर्नुहोस
                </Text>
              ) : (
                <LoadingWhite />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddMember;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
});
