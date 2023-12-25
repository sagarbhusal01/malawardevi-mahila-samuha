import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { GlobalStyle, SECONDARY_COLOR, winWidth } from "../global/GlobalConfig";
import TodayLoanSummary from "./parts/TodayLoanSummary";
import ThreeDayLoanSummary from "./parts/ThreeDayLoanSummary";
import {
  query,
  collection,
  where,
  onSnapshot,
  or,
  and,
} from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import { GETNEPALIDATE, GETTHATNEPALIDATE } from "../global/GETNEPALIDATE";
import { AllLoanTransactionsListTypeWithName } from "../global/Types";
import UnpaidLoanSummary from "./parts/UnpaidLoanSummary";

const LoanSummary = (props: any) => {
  const [FocusedButton, setFocusedButton] = useState<string>("आजको ऋण");
  const [TogglePopup, setTogglePopup] = useState<boolean>(false);
  // =====================================================================
  // =====================================================================
  // =====================================================================

  const [TotalTodayLoan, setTotalTodayLoan] = useState<number>(0);
  const [AllTodayLoanTransaction, setAllTodayLoanTransaction] = useState<
    AllLoanTransactionsListTypeWithName[]
  >([]);
  // =====================================================================
  // =====================================================================
  // =====================================================================
  const [TotalThreeDayLoan, setTotalThreeDayLoan] = useState<number>(0);
  const [AllThreedayLoanTransaction, setAllThreedayLoanTransaction] = useState<
    AllLoanTransactionsListTypeWithName[]
  >([]);
  // =====================================================================
  // =====================================================================
  // =====================================================================
  const [TotalUnpaidLoanAmount, setTotalUnpaidLoanAmount] = useState<number>(0);
  const [AllUnpaidLoanTransaction, setAllUnpaidLoanTransaction] = useState<
    AllLoanTransactionsListTypeWithName[]
  >([]);
  // =====================================================================
  // =====================================================================
  // =====================================================================

  const GetTodayLoanTransaction = () => {
    const UserDataREF = query(collection(db, "UserData"));
    setAllTodayLoanTransaction([]);
    setTotalTodayLoan(0);
    onSnapshot(UserDataREF, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const TransactionRef = query(
          collection(db, "Account", `${doc.id}`, "Transactions"),
          where("Date", "==", `${GETNEPALIDATE()}`),
          where("category", "==", "Loan")
        );
        onSnapshot(TransactionRef, (querySnapshot) => {
          querySnapshot.forEach((subdoc) => {
            setTotalTodayLoan((prev) => prev + subdoc.data().Amount);

            setAllTodayLoanTransaction((prevState: any) => [
              ...prevState,
              {
                Name: doc.data().Name,
                Address: doc.data().Address,
                Phone: doc.data().Phone,
                ID: doc.data().ID,
                Amount: subdoc.data().Amount,
                Date: subdoc.data().Date,
                Total: subdoc.data().Total,
                category: subdoc.data().category,
                Duration: subdoc.data().Duration,
                InterestRate: subdoc.data().InterestRate,
                IsPaid: subdoc.data().IsPaid,
                CreatedAt: subdoc.data().CreatedAt,
                LoanDepositedAmount: subdoc.data().LoanDepositedAmount,
                LoanDepositedDate: subdoc.data().LoanDepositedDate,
                Month: subdoc.data().Month,
                InterestPaid: subdoc.data().InterestPaid,
              },
            ]);
          });
        });
      });
    });
  };
  // =====================================================================
  // =====================================================================
  // =====================================================================
  const GetThreeLoanTransaction = () => {
    const UserDataREF = query(collection(db, "UserData"));
    onSnapshot(UserDataREF, (querySnapshot) => {
      setAllThreedayLoanTransaction([]);
      setTotalThreeDayLoan(0);
      querySnapshot.forEach((doc) => {
        const TransactionRef = query(
          collection(db, "Account", `${doc.id}`, "Transactions"),
          and(
            where("category", "==", "Loan"),
            or(
              where(
                "Date",
                "==",
                `${GETTHATNEPALIDATE(
                  new Date().getFullYear(),
                  new Date().getMonth() + 1,
                  new Date().getDate()
                )}`
              ),
              where(
                "Date",
                "==",
                `${GETTHATNEPALIDATE(
                  new Date().getFullYear(),
                  new Date().getMonth() + 1,
                  new Date().getDate() - 1
                )}`
              ),
              where(
                "Date",
                "==",
                `${GETTHATNEPALIDATE(
                  new Date().getFullYear(),
                  new Date().getMonth() + 1,
                  new Date().getDate() - 2
                )}`
              )
            )
          )
        );
        onSnapshot(TransactionRef, (querySnapshot) => {
          querySnapshot.forEach((subdoc) => {
            setTotalThreeDayLoan((prev) => prev + subdoc.data().Amount);

            setAllThreedayLoanTransaction((prevState: any) => [
              ...prevState,
              {
                Name: doc.data().Name,
                Address: doc.data().Address,
                Phone: doc.data().Phone,
                ID: doc.data().ID,
                Amount: subdoc.data().Amount,
                Date: subdoc.data().Date,
                Total: subdoc.data().Total,
                category: subdoc.data().category,
                Duration: subdoc.data().Duration,
                InterestRate: subdoc.data().InterestRate,
                IsPaid: subdoc.data().IsPaid,
                CreatedAt: subdoc.data().CreatedAt,
                LoanDepositedAmount: subdoc.data().LoanDepositedAmount,
                LoanDepositedDate: subdoc.data().LoanDepositedDate,
                Month: subdoc.data().Month,
                InterestPaid: subdoc.data().InterestPaid,
              },
            ]);
          });
        });
      });
    });
  };
  // =====================================================================
  // =====================================================================
  // =====================================================================

  const GetUnPaidLoanDetails = () => {
    const UserDataREF = query(collection(db, "UserData"));
    setAllUnpaidLoanTransaction([]);
    setTotalUnpaidLoanAmount(0);
    onSnapshot(UserDataREF, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const TransactionRef = query(
          collection(db, "Account", `${doc.id}`, "Transactions"),
          where("category", "==", "Loan"),
          where("IsPaid", "==", false)
        );
        onSnapshot(TransactionRef, (querySnapshot) => {
          querySnapshot.forEach((subdoc) => {
            setTotalUnpaidLoanAmount((prev) => prev + subdoc.data().Amount);

            setAllUnpaidLoanTransaction((prevState: any) => [
              ...prevState,
              {
                Name: doc.data().Name,
                Address: doc.data().Address,
                Phone: doc.data().Phone,
                ID: doc.data().ID,
                Amount: subdoc.data().Amount,
                Date: subdoc.data().Date,
                Total: subdoc.data().Total,
                category: subdoc.data().category,
                Duration: subdoc.data().Duration,
                InterestRate: subdoc.data().InterestRate,
                IsPaid: subdoc.data().IsPaid,
                CreatedAt: subdoc.data().CreatedAt,
                LoanDepositedAmount: subdoc.data().LoanDepositedAmount,
                LoanDepositedDate: subdoc.data().LoanDepositedDate,
                Month: subdoc.data().Month,
                InterestPaid: subdoc.data().InterestPaid,
              },
            ]);
          });
        });
      });
    });
  };
  // =====================================================================
  // =====================================================================
  // =====================================================================
  const HandlePageRender = () => {
    if (FocusedButton === "आजको ऋण") {
      return (
        <TodayLoanSummary
          NAV={props.navigation.navigate}
          AllTodayLoanTransaction={AllTodayLoanTransaction}
          TotalTodayLoan={TotalTodayLoan}
        />
      );
    } else if (FocusedButton === "३ दिनको ऋण") {
      return (
        <ThreeDayLoanSummary
          NAV={props.navigation.navigate}
          AllThreedayLoanTransaction={AllThreedayLoanTransaction}
          TotalThreeDayLoan={TotalThreeDayLoan}
        />
      );
    } else if (FocusedButton === "तिर्न बांकी ऋण") {
      return (
        <UnpaidLoanSummary
          NAV={props.navigation.navigate}
          TotalUnpaidLoanAmount={TotalUnpaidLoanAmount}
          AllUnpaidLoanTransaction={AllUnpaidLoanTransaction}
        />
      );
    }
  };

  // =====================================================================
  // =====================================================================
  // =====================================================================
  useEffect(() => {
    GetTodayLoanTransaction();
    GetThreeLoanTransaction();
    GetUnPaidLoanDetails();
  }, []);

  // =====================================================================
  // =====================================================================
  // =====================================================================
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{ width: winWidth * 0.9, alignSelf: "center", marginTop: 15 }}
      >
        <TouchableOpacity
          style={styles.OptionContainer}
          activeOpacity={0.9}
          onPress={() => {
            setTogglePopup(true);
          }}
        >
          <Text style={styles.OptionText}>{FocusedButton}</Text>
          <Image
            source={require("../../assets/images/DownOption.png")}
            style={{ height: 10, width: 15 }}
          />
        </TouchableOpacity>
      </View>
      <Modal transparent={true} visible={TogglePopup}>
        <TouchableOpacity
          style={styles.Overlay}
          activeOpacity={1}
          onPress={() => {
            setTogglePopup(false);
          }}
        />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View style={styles.Popup}>
            <TouchableOpacity
              style={GlobalStyle.DetailContainer}
              activeOpacity={0.8}
              onPress={() => {
                setFocusedButton("आजको ऋण");
                setTogglePopup(false);
              }}
            >
              <Text style={styles.ButtonText}>आजको ऋण</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={GlobalStyle.DetailContainer}
              activeOpacity={0.8}
              onPress={() => {
                setFocusedButton("३ दिनको ऋण");
                setTogglePopup(false);
              }}
            >
              <Text style={styles.ButtonText}>३ दिनको ऋण</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={GlobalStyle.DetailContainer}
              activeOpacity={0.8}
              onPress={() => {
                setFocusedButton("तिर्न बांकी ऋण");
                setTogglePopup(false);
              }}
            >
              <Text style={styles.ButtonText}>तिर्न बांकी ऋण</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={{ marginTop: 15 }} />

      <HandlePageRender />
    </View>
  );
};

export default LoanSummary;

const styles = StyleSheet.create({
  OptionContainer: {
    height: 50,
    width: 140,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: SECONDARY_COLOR,
    borderRadius: 8,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  OptionText: {
    color: "white",
    fontWeight: "800",
  },
  Overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "#00000039",
  },
  Popup: {
    minHeight: 30,
    padding: 15,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    backgroundColor: "white",
    width: winWidth * 0.9,
  },
  ButtonText: {
    fontSize: 16,
    fontWeight: "800",
  },
});
