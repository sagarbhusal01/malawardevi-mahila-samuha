import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React from "react";
import {
  winWidth,
  PRIMARY_COLOR,
  HEADINGTTHREEFONTSIZE,
  GlobalStyle,
  HEADINGFOURFONTSIZE,
  WRAPPER_COLOR,
  SECONDARY_COLOR,
  DETAIL_COLOR,
} from "../../global/GlobalConfig";
import LoadingWhite from "../../Components/LoadingWhite";
import ErrorMessage from "../../global/ErrorMessage";
import { writeBatch, doc, increment } from "firebase/firestore";
import { db } from "../../../FirebaseConfig";
import { GETNEPALIDATE, GETNEPALIMONTH } from "../../global/GETNEPALIDATE";
import { CatchMessagetype } from "../../global/Types";
import CatchError from "../../global/CatchError";

const Loan = (props: any) => {
  // ====================================================
  const [LoanAmount, setLoanAmount] = React.useState<number>(0);
  const [InteresrRate, setInterestRate] = React.useState<string>("");
  const [Duration, setDuration] = React.useState<number>(0);
  const [ErrorState, setErrorState] = React.useState<string>("");
  const [CatchMessage, setCatchMessage] = React.useState<CatchMessagetype>();

  // ====================================================

  // ===================== Setting Loan Amount in Firebase ======================

  const SetLoanAmountInFirebase = (FinalInterestRate: number) => {
    props.setUploading(true);
    const batch = writeBatch(db);
    // first changing the total amount

    const TotalLoanRef = doc(db, "Account", `${props.Phone}`, "TOTAL", "Loan");

    batch.set(TotalLoanRef, { Amount: increment(LoanAmount) }, { merge: true });
    // then updating the transactions

    const TransactionsRef = doc(
      db,
      "Account",
      `${props.Phone}`,
      "Transactions",
      `${GETNEPALIDATE()} ${LoanAmount} ${Math.floor(Math.random() * 1000) + 1}`
    );
    batch.set(TransactionsRef, {
      Amount: LoanAmount,
      category: "Loan",
      Date: GETNEPALIDATE(),
      Month: GETNEPALIMONTH(),
      Total: props.TotalLoan + LoanAmount,
      InterestRate: FinalInterestRate,
      Duration: Duration,
      IsPaid: false,
      CreatedAt: new Date(),
    });

    // increment the TOTAL document
    const TOTALdocumentRef = doc(db, "TOTAL", "Cash_Given");
    batch.set(
      TOTALdocumentRef,
      { Amount: increment(LoanAmount) },
      { merge: true }
    );

    //  then conniting the change

    batch
      .commit()
      .then(() => {
        props.setUploading(false);
        props.ToggleBottomSheet(false);
        props.bottomSheetModalRef.current?.close();
        ToastAndroid.show("ऋण विवरण थप भयो", ToastAndroid.LONG);
        setLoanAmount(0);
        setDuration(0);
        setInterestRate("0");
        setErrorState("");
      })
      .catch((e) => {
        setCatchMessage({
          message: "केहि समस्या आयो",
          ErrorCode: e.message,
        });
      });
  };
  // ================== Bottom Sheet =====================

  const BottomSheetChildren = (FinalInterestRate: number) => {
    return (
      <>
        <View style={styles.BottomSheetContainer}>
          <Text style={styles.BottomSheetTopicText}>
            के तपाईंको विवरण सही छ ?{" "}
          </Text>
          {/* ============= LOan Amount=========== */}
          <View
            style={[
              GlobalStyle.DetailContainer,
              { backgroundColor: "lightgrey", marginTop: 15 },
            ]}
          >
            <View style={{ width: "45%" }}>
              <Text style={GlobalStyle.DetailText}>लगेको रकम</Text>
            </View>
            <View style={{ width: "35%" }}>
              <Text style={GlobalStyle.DetailText}>रु {LoanAmount}</Text>
            </View>
          </View>
          {/* ============= Interest Rate =========== */}

          <View
            style={[
              GlobalStyle.DetailContainer,
              { backgroundColor: "lightgrey", marginTop: 15 },
            ]}
          >
            <View style={{ width: "45%" }}>
              <Text style={GlobalStyle.DetailText}>प्रती महिना ब्यज दर</Text>
            </View>
            <View style={{ width: "35%" }}>
              <Text style={GlobalStyle.DetailText}>रु {FinalInterestRate}</Text>
            </View>
          </View>
          {/* =============  Duration  =========== */}

          <View
            style={[
              GlobalStyle.DetailContainer,
              { backgroundColor: "lightgrey", marginTop: 15 },
            ]}
          >
            <View style={{ width: "45%" }}>
              <Text style={GlobalStyle.DetailText}>बुझाउनु पर्ने समय</Text>
            </View>
            <View style={{ width: "35%" }}>
              <Text style={GlobalStyle.DetailText}>{Duration}</Text>
            </View>
          </View>
          {/*===========Buttons================ */}
          <View style={styles.BottomSheetButtonContainer}>
            {/* ============== Correct Button =============== */}
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.BottomSheetPrimaryButton}
              onPress={() => {
                SetLoanAmountInFirebase(FinalInterestRate);
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

  // ====================================================
  return (
    <>
      {/* ============================ HEader =========================== */}
      <View style={styles.HeaderContainer}>
        <CatchError CatchMessage={CatchMessage} />
        <View style={styles.Header}>
          <Text style={styles.HeaderText}>ऋण विवरण</Text>
        </View>
        {/* ========================== Loan Entry Input feild ===================== */}
        <View style={GlobalStyle.WrapperContainer}>
          {/* ============= LoanAmount ================= */}
          <View style={GlobalStyle.DetailContainer}>
            <View style={styles.LeftSideContainer}>
              <Text style={GlobalStyle.DetailText}>लगेको रकम</Text>
            </View>
            <View style={styles.RightSideContainer}>
              <Text style={GlobalStyle.DetailText}>रु </Text>
              <TextInput
                style={styles.TextInputStyle}
                maxLength={9}
                keyboardType="number-pad"
                onChangeText={(text) => {
                  setLoanAmount(parseInt(text));
                }}
              />
            </View>
          </View>
          {/* ============ InterestRate ================ */}
          <View style={GlobalStyle.DetailContainer}>
            <View style={styles.LeftSideContainer}>
              <Text style={GlobalStyle.DetailText}>प्रती महिना ब्यज दर</Text>
            </View>
            <View style={styles.RightSideContainer}>
              <Text style={GlobalStyle.DetailText}>रु </Text>
              <TextInput
                style={[styles.TextInputStyle, { width: 50 }]}
                maxLength={9}
                value={InteresrRate}
                keyboardType="number-pad"
                onChangeText={(text) => {
                  setInterestRate(text);
                }}
              />
            </View>
          </View>
          {/* ====================== PreListed Items======================= */}

          <View style={styles.PreListedAmountContainer}>
            <TouchableOpacity
              style={styles.PreListedBUtton}
              activeOpacity={0.4}
              onPress={() => {
                setInterestRate("1.5");
              }}
            >
              <Text style={styles.PreListedBUttonText}>1.5</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.PreListedBUtton}
              activeOpacity={0.4}
              onPress={() => {
                setInterestRate("2");
              }}
            >
              <Text style={styles.PreListedBUttonText}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.PreListedBUtton}
              activeOpacity={0.4}
              onPress={() => {
                setInterestRate("2.5");
              }}
            >
              <Text style={styles.PreListedBUttonText}>2.5</Text>
            </TouchableOpacity>
          </View>
          {/* =========================== Duration =========================== */}
          <View style={[GlobalStyle.DetailContainer, { marginTop: 20 }]}>
            <View style={styles.LeftSideContainer}>
              <Text style={GlobalStyle.DetailText}>बुझाउनु पर्ने समय</Text>
            </View>
            <View style={styles.RightSideContainer}>
              <TextInput
                style={[styles.TextInputStyle, { width: 50 }]}
                maxLength={9}
                keyboardType="number-pad"
                onChangeText={(text) => {
                  setDuration(parseInt(text));
                }}
              />
            </View>
          </View>
          {/* ======================== Error HAndling ====================== */}
          <ErrorMessage Error={ErrorState} />
          {/* ======================== Add Button ====================== */}

          <TouchableOpacity
            style={styles.AddButton}
            activeOpacity={0.8}
            onPress={() => {
              if (props.uploading) return null;
              const FinalInterestRate = parseFloat(InteresrRate);

              if (
                Number.isNaN(FinalInterestRate) ||
                FinalInterestRate === 0 ||
                LoanAmount === 0 ||
                Number.isNaN(LoanAmount) ||
                Duration === 0 ||
                Number.isNaN(Duration)
              ) {
                setErrorState("कुनै पनि ठाउँ खाली हुनु हिदैन");
              } else {
                props.setBottomSheetSnapPoints([330]);
                props.ToggleBottomSheet(true);
                props.setBottomSheetChildren(
                  BottomSheetChildren(FinalInterestRate)
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
      </View>
    </>
  );
};

export default Loan;

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
  LeftSideContainer: { width: "40%", marginLeft: 20 },
  RightSideContainer: {
    width: "45%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  TextInputStyle: {
    borderRadius: 8,
    borderWidth: 2,
    borderColor: PRIMARY_COLOR,
    height: 35,
    margin: 10,
    width: 110,
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
    paddingLeft: 20,
    paddingRight: 20,
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
