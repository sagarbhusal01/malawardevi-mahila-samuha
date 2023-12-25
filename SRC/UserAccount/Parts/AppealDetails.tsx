import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  ToastAndroid,
} from "react-native";
import React from "react";
import {
  DETAIL_COLOR,
  GlobalStyle,
  HEADINGFOURFONTSIZE,
  HEADINGTTHREEFONTSIZE,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  TERTIARY_COLOR,
  WRAPPER_COLOR,
  winWidth,
} from "../../global/GlobalConfig";
import {
  deleteDoc,
  doc,
  increment,
  onSnapshot,
  writeBatch,
} from "firebase/firestore";
import { db } from "../../../FirebaseConfig";
import TransactionList from "../../Components/TransactionList";

const AppealDetails = (props: any) => {
  const [PopupToggleState, setPopupToggleState] =
    React.useState<boolean>(false);
  // ===========================================
  // ===========================================
  // ===========================================
  const AppealResolved = async () => {
    await deleteDoc(doc(db, "Appeal", `${props.Phone}`))
      .then(() => {
        ToastAndroid.show("बिवाद हल भयो", ToastAndroid.LONG);
        setPopupToggleState(false);
      })
      .catch((e) => {
        alert(e);
      });
  };
  //   ==================================================
  //   ==================================================
  //   ==================================================

  const DeleteTransaction = async (TransactionID: string) => {
    onSnapshot(
      doc(db, "Account", `${props.Phone}`, "Transactions", `${TransactionID}`),
      (doc) => {
        if (!doc.exists()) return;
        if (doc.data().category === "Loan" && doc.data().IsPaid === true) {
          ToastAndroid.show("तिरिएको ऋण डिलिट गर्न मिल्दैन", ToastAndroid.LONG);
          setPopupToggleState(false);
          AppealResolved();
          return;
        }
        if (doc.data().category === "Loan" && doc.data().IsPaid === false) {
          DeleteLoanTransaction(TransactionID, doc.data().Amount);
        } else if (doc.data().category === "Deposit") {
          DeleteDepositTransaction(TransactionID, doc.data().Amount);
        }
      }
    );
  };

  //   ==================================================
  //   ==================================================
  //   ==================================================
  const DeleteLoanTransaction = async (ID: string, LoanAmount: number) => {
    const batch = writeBatch(db);
    // // updating the transaction IsPaid State and adding extra amount
    const Deletetransactionref = doc(
      db,
      "Account",
      `${props.Phone}`,
      "Transactions",
      `${ID}`
    );

    batch.delete(Deletetransactionref);

    const UpdateTotalDepositref = doc(
      db,
      "Account",
      `${props.Phone}`,
      "TOTAL",
      "Loan"
    );

    batch.update(UpdateTotalDepositref, {
      Amount: increment(-LoanAmount),
    });

    const UpdateTOTALCashGiven = doc(db, "TOTAL", "Cash_Given");

    batch.update(UpdateTOTALCashGiven, {
      Amount: increment(-LoanAmount),
    });

    await batch.commit().then(() => {
      ToastAndroid.show("ऋण लेनदेन डिलिट  भयो ", ToastAndroid.LONG);
      setPopupToggleState(false);
      AppealResolved();
    });
  };
  //   ==================================================
  //   ==================================================
  //   ==================================================

  const DeleteDepositTransaction = async (
    ID: string,
    DepositAmount: number
  ) => {
    const batch = writeBatch(db);
    // // updating the transaction IsPaid State and adding extra amount
    const Deletetransactionref = doc(
      db,
      "Account",
      `${props.Phone}`,
      "Transactions",
      `${ID}`
    );

    batch.delete(Deletetransactionref);

    const UpdateTotalDepositref = doc(
      db,
      "Account",
      `${props.Phone}`,
      "TOTAL",
      "Deposit"
    );

    batch.update(UpdateTotalDepositref, {
      Amount: increment(-DepositAmount),
    });

    const UpdateTOTALCashGiven = doc(db, "TOTAL", "Cash_Taken");

    batch.update(UpdateTOTALCashGiven, {
      Amount: increment(-DepositAmount),
    });

    await batch.commit().then(() => {
      ToastAndroid.show("लेवी लेनदेन डिलिट  भयो ", ToastAndroid.LONG);
      setPopupToggleState(false);
      AppealResolved();
    });
  };
  //   ==================================================
  //   ==================================================
  //   ==================================================
  return (
    <>
      {props.UserAppeal ? (
        <>
          <View style={[GlobalStyle.WrapperContainer, { marginTop: 25 }]}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                setPopupToggleState(true);
                props.FetchAppealTransaction(props.UserAppeal?.TransactionID);
              }}
              style={[GlobalStyle.DetailContainer, { padding: 10 }]}
            >
              <Text style={styles.AppealText}>
                {props.UserAppeal?.AppealData}
              </Text>
            </TouchableOpacity>
          </View>
          {/* Popup action */}
          <Modal visible={PopupToggleState} transparent={true}>
            <TouchableOpacity
              style={styles.PopupTouchableContainer}
              activeOpacity={1}
              onPress={() => {
                setPopupToggleState(false);
              }}
            />
            <View style={styles.PopupContainer}>
              <View style={styles.Popup}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setPopupToggleState(false)}
                  style={styles.CrossContainer}
                >
                  <Image
                    source={require("../../../assets/images/Cross.png")}
                    style={{ height: 12, width: 12 }}
                  />
                </TouchableOpacity>
                <Text style={styles.Header}>बिवाद विवरण</Text>
                <View
                  style={{
                    width: "90%",
                    alignItems: "flex-start",
                    alignSelf: "center",
                    marginTop: 15,
                  }}
                >
                  <Text style={{ fontWeight: "800" }}>सन्देश</Text>
                </View>
                <View style={[GlobalStyle.DetailContainer, { padding: 10 }]}>
                  <Text style={styles.AppealText}>
                    {props.UserAppeal?.AppealData}
                  </Text>
                </View>
                <View style={GlobalStyle.DetailContainer}>
                  <Text style={GlobalStyle.DetailText}>जारी मिती</Text>
                  <Text style={GlobalStyle.DetailText}>
                    {props.UserAppeal?.Date}
                  </Text>
                </View>
                {/* Appeal transaction details */}
                <View
                  style={{
                    width: "90%",
                    alignItems: "flex-start",
                    alignSelf: "center",
                    marginTop: 15,
                  }}
                >
                  <Text style={{ fontWeight: "800" }}>बिवाद परेको लेनदेन</Text>
                </View>
                <TransactionList names={props.UserAppealTransaction} />

                {/* Buttons */}
                <View style={styles.ButtonsContainer}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={[
                      styles.Buttons,
                      { backgroundColor: PRIMARY_COLOR, width: 125 },
                    ]}
                    onLongPress={() => {
                      AppealResolved();
                    }}
                  >
                    <Text style={styles.ButtonText}>बिवाद हल भयो</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onLongPress={() => {
                      DeleteTransaction(props.UserAppeal?.TransactionID);
                    }}
                    activeOpacity={0.8}
                    style={[
                      styles.Buttons,
                      { backgroundColor: SECONDARY_COLOR },
                    ]}
                  >
                    <Text style={styles.ButtonText}>लेनदेन डिलिट</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </>
      ) : null}
    </>
  );
};

export default AppealDetails;

const styles = StyleSheet.create({
  AppealText: {
    color: TERTIARY_COLOR,
  },
  CrossContainer: {
    width: 35,
    height: 35,
    borderRadius: 50,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: -10,
    top: -15,
  },
  PopupTouchableContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "#00000039",
  },
  PopupContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  Popup: {
    minHeight: 20,
    width: winWidth * 0.9,
    borderRadius: 8,
    backgroundColor: "white",
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
  },
  Header: {
    alignSelf: "center",
    color: SECONDARY_COLOR,
    fontSize: HEADINGTTHREEFONTSIZE,
    fontWeight: "800",
  },
  CategoryText: {
    color: "white",
    fontWeight: "800",
    fontSize: HEADINGFOURFONTSIZE,
  },
  CentralandRightsidepart: {
    width: "60%",
  },
  CategoryandLoanAmountContainer: {
    flexDirection: "row",
    padding: 10,
    paddingBottom: 5,
    justifyContent: "space-around",
    alignItems: "center",
  },
  totalandtotalAmountcontainer: {
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    justifyContent: "space-around",
    alignItems: "center",
  },
  CategoryBox: {
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  TotalTextColor: {
    color: "#515151",
    fontWeight: "800",
    fontSize: HEADINGFOURFONTSIZE,
  },
  ButtonsContainer: {
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  Buttons: {
    height: 45,
    width: 110,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  ButtonText: {
    color: "white",
    fontWeight: "800",
  },
});
