import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
} from "react-native";
import React from "react";
import {
  PRIMARY_COLOR,
  WRAPPER_COLOR,
  SECONDARY_COLOR,
  HEADINGFOURFONTSIZE,
  HEADINGTTHREEFONTSIZE,
  HEADINGTWOFONTSIZE,
} from "../../../../global/GlobalConfig";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../../../../../FirebaseConfig";
import { GETNEPALIDATE } from "../../../../global/GETNEPALIDATE";
import ErrorMessage from "../../../../global/ErrorMessage";
import { CatchMessagetype } from "../../../../global/Types";
import CatchError from "../../../../global/CatchError";

const AppealForm = (props: any) => {
  const [ErrorState, setErrorState] = React.useState<string>();
  const [CatchMessage, setCatchMessage] = React.useState<CatchMessagetype>();
  const [AppealData, setAppealData] = React.useState<string>("");

  // ================================================================
  // ================================================================
  // ================================================================
  const ReportAppeal = async () => {
    await setDoc(doc(db, "Appeal", `${props.Phone}`), {
      AppealData: AppealData,
      CreatedBy: `${props.Phone}`,
      Date: GETNEPALIDATE(),
      CreatedAt: new Date(),
      TransactionID: props.TransactionID,
    })
      .then(() => {
        ToastAndroid.show("बिवाद रिपोर्ट भएको छ", ToastAndroid.LONG);
        setAppealData("");
      })
      .catch((e) => {
        setCatchMessage({
          message: "बिवाद रिपोर्ट सफल हुन सकेन",
          ErrorCode: e.message,
        });
      });
  };
  // ================================================================
  // ================================================================
  // ================================================================

  return (
    <View>
      <CatchError CatchMessage={CatchMessage} />
      <Text style={styles.AppealHeader}>नयाँ विवाद थप </Text>
      <View style={{ alignItems: "center" }}>
        <TextInput
          style={styles.TextInput}
          multiline={true}
          placeholder="तपाईंको विवादको कारण  लेख्नु होस । "
          numberOfLines={5}
          onChangeText={(text: string) => {
            setAppealData(text);
            setErrorState("")
          }}
        />
        <ErrorMessage Error={ErrorState} />
      </View>
      <View style={styles.ButtonsContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.Button, { backgroundColor: PRIMARY_COLOR }]}
          onPress={() => {
            if (AppealData == "") {
              setErrorState("विवादको कारण खाली हुनु हुँदैन");
            } else if (AppealData?.length < 50) {
              setErrorState("विवादको कारण ५० भन्दा बढी हुनु पर्छ");
            } else {
              ReportAppeal();
              props.setAppealPopupToggle(false);
            }
          }}
        >
          <Text style={styles.ButtonText}>थप गर्नुहोस</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            props.setAppealPopupToggle(false);
            props.setWantAppeal(false);
          }}
          style={[styles.Button, { backgroundColor: WRAPPER_COLOR }]}
        >
          <Text style={[styles.ButtonText, { color: SECONDARY_COLOR }]}>
            रद्ध गर्नुहोस
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AppealForm;

const styles = StyleSheet.create({
  AppealHeader: {
    fontSize: HEADINGTWOFONTSIZE,
    fontWeight: "800",
    color: SECONDARY_COLOR,
    alignSelf: "center",
  },
  ButtonsContainer: {
    width: "90%",
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-around",
    marginTop: 15,
  },
  Button: {
    height: 45,
    width: 110,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  ButtonText: {
    color: "white",
    fontWeight: "800",
  },
  TextInput: {
    borderRadius: 8,
    borderWidth: 2,
    borderColor: PRIMARY_COLOR,
    minHeight: 160,
    margin: 10,
    width: "90%",
    paddingLeft: 8,
    paddingTop: 8,
    paddingRight: 8,
    color: "black",
    fontSize: HEADINGFOURFONTSIZE,
    backgroundColor: WRAPPER_COLOR,
    fontWeight: "600",
    textAlignVertical: "top",
  },
});
