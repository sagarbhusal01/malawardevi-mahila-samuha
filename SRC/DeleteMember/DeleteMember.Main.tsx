import {
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import {
  GlobalStyle,
  HEADINGFOURFONTSIZE,
  HEADINGTTHREEFONTSIZE,
  HEADINGTWOFONTSIZE,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  WRAPPER_COLOR,
  winWidth,
} from "../global/GlobalConfig";
import {
  query,
  collection,
  where,
  doc,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "../../FirebaseConfig";
import { CatchMessagetype, MemberListType } from "../global/Types";
import LoadingWhite from "../Components/LoadingWhite";
import UserDetail from "./Parts/UserDetail";
import CatchError from "../global/CatchError";

const DeleteMember = () => {
  // =================================================================
  // =================================================================
  // =================================================================
  const [Uploading, setUploading] = React.useState<boolean>(false);
  const [CatchMessage, setCatchMessage] = React.useState<CatchMessagetype>();

  const [ID, setID] = React.useState<number>(0);
  const [UserData, setUserData] = React.useState<MemberListType[]>([]);
  // =================================================================
  // =================================================================
  // =================================================================
  // =================================================================
  // =================================================================
  // =================================================================

  const FetchUserData = async () => {
    let CachedUserData: MemberListType[] = [];

    setUploading(true);
    const q = query(collection(db, "UserData"), where("ID", "==", ID));
    onSnapshot(q, (querySnapshot) => {
      while (CachedUserData.length > 0) {
        CachedUserData.pop();
      }
      if (querySnapshot.empty) {
        setUploading(false);
        setUserData([]);
        return;
      }
      querySnapshot.forEach((doc) => {
        CachedUserData.push({
          Name: doc.data().Name,
          Address: doc.data().Address,
          ID: doc.data().ID,
          Phone: doc.data().Phone,
        });
        setUserData(CachedUserData);
        setUploading(false);
      });
    });
  };

  // =================================================================
  // =================================================================
  // =================================================================
  const DeleteUserData = async (Phone: string) => {
    await deleteDoc(doc(db, "UserData", `${Phone}`))
      .catch((e) => {
        setCatchMessage({
          message: "हजुर को नाम र विवरण पत्ता लगाउँअ सकिएन",
          ErrorCode: e.message,
        });
      })
      .then(() => {
        ToastAndroid.show("सदस्य प्रतिबन्धित सफल भयो", ToastAndroid.LONG);
      });
  };
  // =================================================================
  // =================================================================
  // =================================================================

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <CatchError CatchMessage={CatchMessage} />
      <View style={[GlobalStyle.WrapperContainer, { alignItems: "center" }]}>
        <Text style={styles.PromptText}>प्रतिबन्धित सदस्यको आइ डि न:</Text>
        <TextInput
          style={[styles.TextInputStyle, { width: winWidth * 0.75 }]}
          maxLength={5}
          keyboardType="number-pad"
          onChangeText={(text) => {
            setID(parseInt(text));
          }}
        />
        <TouchableOpacity
          style={styles.CheckButton}
          onPress={() => {
            if (ID === 0) {
              setUserData([]);
            }
            if (ID && !Uploading) {
              FetchUserData();
            }
          }}
          activeOpacity={0.7}
        >
          {Uploading ? (
            <LoadingWhite />
          ) : (
            <Text style={styles.ButtonText}>चेक गर्नुहोस</Text>
          )}
        </TouchableOpacity>
      </View>
      {UserData.length ? (
        <UserDetail UserData={UserData} DeleteUserData={DeleteUserData} />
      ) : null}
    </View>
  );
};

export default DeleteMember;

const styles = StyleSheet.create({
  PromptText: {
    fontWeight: "800",
    fontSize: HEADINGTWOFONTSIZE,
    color: SECONDARY_COLOR,
  },
  TextInputStyle: {
    borderRadius: 8,
    borderWidth: 2,
    borderColor: PRIMARY_COLOR,
    height: 45,
    margin: 10,
    paddingLeft: 8,
    color: "black",
    fontSize: HEADINGFOURFONTSIZE,
    backgroundColor: "#ffffff90",
    fontWeight: "600",
    paddingRight: 8,
  },
  CheckButton: {
    width: winWidth * 0.75,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 5,
    height: 45,
  },
  ButtonText: {
    fontWeight: "800",
    fontSize: HEADINGTTHREEFONTSIZE,
    color: "white",
  },
});
