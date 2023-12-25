import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
  Button,
} from "react-native";
import React from "react";
import {
  DETAIL_COLOR,
  GlobalStyle,
  HEADINGFOURFONTSIZE,
  HEADINGTTHREEFONTSIZE,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  WRAPPER_COLOR,
  winWidth,
} from "../../global/GlobalConfig";
import ErrorMessage from "../../global/ErrorMessage";
import LoadingWhite from "../../Components/LoadingWhite";
import { db } from "../../../FirebaseConfig";
import { doc, increment, writeBatch } from "firebase/firestore";
import { GETNEPALIDATE, GETNEPALIMONTH } from "../../global/GETNEPALIDATE";
import { CatchMessagetype } from "../../global/Types";
import CatchError from "../../global/CatchError";

//=============== Bottom Sheet ======================
// ==================================================
const Deposit = (props: any) => {
  // ==========================================================================
  const [DepositAmount, setDepositAmount] = React.useState<string>("");
  const [ErrorState, setErrorState] = React.useState<string>("");
  const [CatchMessage, setCatchMessage] = React.useState<CatchMessagetype>();

  // ==========================================================================
  React.useEffect(() => {
    setErrorState("");
  }, []);
  // ==========================================================================
  const SetDepositAmountInFirebase = async (FinalDepositAmount: number) => {
    props.setUploading(true);
    const batch = writeBatch(db);
    // first changing the total amount
    const TotalDepositRef = doc(
      db,
      "Account",
      `${props.Phone}`,
      "TOTAL",
      "Deposit"
    );

    batch.set(
      TotalDepositRef,
      { Amount: increment(FinalDepositAmount) },
      { merge: true }
    );
    // then updating the transactions

    const TransactionsRef = doc(
      db,
      "Account",
      `${props.Phone}`,
      "Transactions",
      `${GETNEPALIDATE()} ${FinalDepositAmount} ${
        Math.floor(Math.random() * 10000) + 1
      }`
    );
    batch.set(TransactionsRef, {
      Amount: FinalDepositAmount,
      category: "Deposit",
      Date: GETNEPALIDATE(),
      Month: GETNEPALIMONTH(),
      Total: props.TotalDeposit + FinalDepositAmount,
      CreatedAt: new Date(),
    });

    // increment the TOTAL document
    const TOTALdocumentRef = doc(db, "TOTAL", "Cash_Taken");
    batch.set(
      TOTALdocumentRef,
      { Amount: increment(FinalDepositAmount) },
      { merge: true }
    );

    //  then commiting the change

    batch
      .commit()
      .then(() => {
        props.setUploading(false);
        props.ToggleBottomSheet(false);
        props.bottomSheetModalRef.current?.close();
        ToastAndroid.show("लेवी विवरण थप भयो", ToastAndroid.LONG);
        setDepositAmount("");
        setErrorState("");
      })
      .catch((e) => {
        setCatchMessage({
          message: "केहि समस्या आयो",
          ErrorCode: e.message,
        });
      });
  };
  // ===========================================================================
  const BottomSheetChildren = (FinalDepositAmount: number) => {
    return (
      <>
        <View style={styles.BottomSheetContainer}>
          <Text style={styles.BottomSheetTopicText}>
            के तपाईंको विवरण सही छ ?
          </Text>
          {/* ============ Displaying Depsoit Amount ================= */}
          <View
            style={[
              GlobalStyle.DetailContainer,
              { backgroundColor: "lightgrey", marginTop: 15 },
            ]}
          >
            <Text style={GlobalStyle.DetailText}>जम्मा लेवी</Text>
            <Text style={GlobalStyle.DetailText}>रु {FinalDepositAmount}</Text>
          </View>
          {/*===========Buttons================ */}
          <View style={styles.BottomSheetButtonContainer}>
            {/* ============== Correct Button =============== */}
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.BottomSheetPrimaryButton}
              onPress={() => {
                SetDepositAmountInFirebase(FinalDepositAmount);
              }}
            >
              <Text
                style={[
                  {
                    color: "white",
                    fontWeight: "800",
                    fontSize: HEADINGTTHREEFONTSIZE,
                  },
                ]}
              >
                मिल्यो
              </Text>
            </TouchableOpacity>
            {/* =================== not correct Buton ========= */}
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.BottomSheetSecondaryButton}
              onPress={() => {
                props.bottomSheetModalRef.current?.close();
              }}
            >
              <Text
                style={[
                  {
                    color: SECONDARY_COLOR,
                    fontWeight: "800",
                    fontSize: HEADINGTTHREEFONTSIZE,
                  },
                ]}
              >
                मिलेन
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  };
  // ===========================================================================

  return (
    <>
      {/* ============================ HEader =========================== */}
      <View style={styles.HeaderContainer}>
        <CatchError CatchMessage={CatchMessage} />
        <View style={styles.Header}>
          <Text style={styles.HeaderText}>विवरण लेवी</Text>
        </View>
      </View>
      {/* ========================= Deposit Input text========================= */}
      <View style={GlobalStyle.WrapperContainer}>
        <View style={GlobalStyle.DetailContainer}>
          <View style={styles.LeftSideContainer}>
            <Text style={GlobalStyle.DetailText}>जम्मा लेवी</Text>
          </View>
          <View style={styles.RightSideContainer}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={GlobalStyle.DetailText}>रु</Text>
              <TextInput
                style={styles.TextInputStyle}
                value={DepositAmount}
                maxLength={4}
                keyboardType="number-pad"
                onChangeText={(text) => {
                  setDepositAmount(text);
                }}
              />
            </View>
          </View>
        </View>
        {/* ======================== Error HAndling ====================== */}
        <ErrorMessage Error={ErrorState} />
        {/* ======================== Pre Listed Amount ================== */}
        <View style={styles.PreListedAmountContainer}>
          <TouchableOpacity
            style={styles.PreListedBUtton}
            activeOpacity={0.4}
            onPress={() => {
              setDepositAmount("500");
            }}
          >
            <Text style={styles.PreListedBUttonText}>500</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.PreListedBUtton}
            activeOpacity={0.4}
            onPress={() => {
              setDepositAmount("1000");
            }}
          >
            <Text style={styles.PreListedBUttonText}>1000</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.PreListedBUtton}
            activeOpacity={0.4}
            onPress={() => {
              setDepositAmount("1500");
            }}
          >
            <Text style={styles.PreListedBUttonText}>1500</Text>
          </TouchableOpacity>
        </View>
        {/* ============================ Add button ========================== */}
        <TouchableOpacity
          style={styles.AddButton}
          activeOpacity={0.8}
          onPress={() => {
            if (props.uploading) return null;
            const FinalDepositAmount = parseInt(DepositAmount);
            if (Number.isNaN(FinalDepositAmount) || FinalDepositAmount === 0) {
              setErrorState("लेवी खाली हुन हुँदैन");
            } else {
              props.setBottomSheetSnapPoints([200]);
              props.ToggleBottomSheet(true);
              props.setBottomSheetChildren(
                BottomSheetChildren(FinalDepositAmount)
              );
            }
          }}
        >
          {props.uploading ? (
            <LoadingWhite />
          ) : (
            <Text style={styles.AddButtonText}>थप गर्नुहोस</Text>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Deposit;

const styles = StyleSheet.create({
  HeaderContainer: {
    width: winWidth * 0.9,
    alignSelf: "center",
    marginTop: 25,
  },
  Header: {
    width: 130,
    minHeight: 45,
    backgroundColor: PRIMARY_COLOR,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  HeaderText: {
    color: "white",
    fontSize: HEADINGTTHREEFONTSIZE,
    fontWeight: "800",
  },
  LeftSideContainer: { width: "45%", marginLeft: 20 },
  RightSideContainer: { width: "50%" },
  TextInputStyle: {
    borderRadius: 8,
    borderWidth: 2,
    borderColor: PRIMARY_COLOR,
    height: 35,
    margin: 10,
    width: 80,
    paddingLeft: 8,
    color: "black",
    fontSize: HEADINGFOURFONTSIZE,
    backgroundColor: WRAPPER_COLOR,
    fontWeight: "600",
  },
  PreListedAmountContainer: {
    width: "90%",
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },
  PreListedBUtton: {
    backgroundColor: PRIMARY_COLOR,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  PreListedBUttonText: {
    fontWeight: "800",
    color: "white",
  },
  AddButton: {
    width: 140,
    height: 45,
    backgroundColor: PRIMARY_COLOR,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    alignSelf: "center",
    marginTop: 25,
  },
  AddButtonText: {
    color: "white",
    fontSize: HEADINGTTHREEFONTSIZE,
    fontWeight: "800",
  },

  BottomSheetContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: WRAPPER_COLOR,
  },
  BottomSheetTopicText: {
    fontSize: 20,
    color: SECONDARY_COLOR,
    fontWeight: "800",
  },
  BottomSheetButtonContainer: {
    width: winWidth * 0.9,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  BottomSheetPrimaryButton: {
    backgroundColor: PRIMARY_COLOR,
    padding: 10,
    borderRadius: 8,
    width: 130,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  BottomSheetSecondaryButton: {
    backgroundColor: DETAIL_COLOR,
    padding: 10,
    borderRadius: 8,
    width: 130,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
