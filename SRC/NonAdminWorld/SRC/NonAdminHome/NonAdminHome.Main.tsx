import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import CalculatorIcon from "./Parts/CalculatorIcon";
import NonAdminUserDetail from "./Parts/NonAdminUserDetail";
import NonAdminNews from "./Parts/NonAdminNews";
import NonAdminAllTransaction from "./Parts/NonAdminAllTransaction";
import { query, collection, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../../../../FirebaseConfig";
import { AllTransactionsListType } from "../../../global/Types";
import LoanPaidDetailsPopup from "../../../Components/LoanPaidDetailsPopup";
import AppealPopup from "./Parts/AppealPopup";

const NonAdminHome = (props: any) => {
  // ================================================================
  // ================================================================
  const [Deposit, setDeposit] = React.useState<number>(0);
  const [Loan, setLoan] = React.useState<number>(0);
  const [AllTransactionList, setAllTransactionList] = React.useState<
    AllTransactionsListType[]
  >([]);
  const [LoanPaidDetailsPopupToggle, setLoanPaidDetailsPopupToggle] =
    React.useState<boolean>(false);
  const [LoanPaidData, setLoanPaidData] = React.useState<boolean>(false);

  // ================================================================

  const [AppealPopupToggle, setAppealPopupToggle] =
    React.useState<boolean>(false);
  const [WantAppeal, setWantAppeal] = React.useState<boolean>(false);
  const [TransactionID, setTransactionID] = React.useState<boolean>(false);
  // ================================================================
  const FetchDepositAndLoan = () => {
    const q = query(
      collection(db, "Account", `${props.route.params.Phone}`, "TOTAL")
    );
    onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.empty) {
        setDeposit(0);
        setLoan(0);
      }

      querySnapshot.forEach((doc) => {
        if (doc.id === "Deposit") {
          setDeposit(doc.data().Amount);
        } else if (doc.id === "Loan") {
          setLoan(doc.data().Amount);
        }
      });
    });
  };
  // ================================================================
  //   ==================================================
  //   ==================================================
  const FetchAllTransactionList = () => {
    const q = query(
      collection(db, "Account", `${props.route.params.Phone}`, "Transactions"),
      orderBy("CreatedAt", "desc")
    );
    onSnapshot(q, (querySnapshot) => {
      setAllTransactionList([]);
      querySnapshot.forEach((doc) => {
        if (doc.data().category === "Deposit") {
          setAllTransactionList((prev: any) => [
            ...prev,
            {
              ID: doc.id,
              Amount: doc.data().Amount,
              Date: doc.data().Date,
              Total: doc.data().Total,
              category: doc.data().category,
              Duration: "",
              InterestRate: "",
              IsPaid: false,
              CreatedAt: doc.data().CreatedAt,
              LoanDepositedAmount: "",
              LoanDepositedDate: "",
              Month: doc.data().Month,
              InterestPaid: "",
            },
          ]);
        } else if (doc.data().category === "Loan") {
          setAllTransactionList((prev: any) => [
            ...prev,
            {
              ID: doc.id,
              Amount: doc.data().Amount,
              Date: doc.data().Date,
              Total: doc.data().Total,
              category: doc.data().category,
              Duration: doc.data().Duration,
              InterestRate: doc.data().InterestRate,
              IsPaid: doc.data().IsPaid,
              CreatedAt: doc.data().CreatedAt,
              LoanDepositedAmount: doc.data().LoanDepositedAmount,
              LoanDepositedDate: doc.data().LoanDepositedDate,
              Month: doc.data().Month,
              InterestPaid: doc.data().InterestPaid,
            },
          ]);
        }
      });
    });
  };
  // ================================================================
  // ================================================================
  // ================================================================

  React.useEffect(() => {
    FetchDepositAndLoan();
    FetchAllTransactionList();
  }, []);
  // ================================================================
  // ================================================================
  // ================================================================

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView overScrollMode="never" showsVerticalScrollIndicator={false}>
        <CalculatorIcon NAV={props.navigation.navigate} />
        <NonAdminUserDetail Data={props.route.params} />
        <NonAdminNews />
        <LoanPaidDetailsPopup
          PopupToggle={LoanPaidDetailsPopupToggle}
          Data={LoanPaidData}
          setPopupToggle={setLoanPaidDetailsPopupToggle}
        />

        <AppealPopup
          AppealPopupToggle={AppealPopupToggle}
          setAppealPopupToggle={setAppealPopupToggle}
          WantAppeal={WantAppeal}
          setWantAppeal={setWantAppeal}
          TransactionID={TransactionID}
          Phone={props.route.params.Phone}
        />

        <NonAdminAllTransaction
          Deposit={Deposit}
          Loan={Loan}
          AllTransactionList={AllTransactionList}
          setLoanPaidDetailsPopupToggle={setLoanPaidDetailsPopupToggle}
          setLoanPaidData={setLoanPaidData}
          AppealPopupToggle={AppealPopupToggle}
          setAppealPopupToggle={setAppealPopupToggle}
          setTransactionID={setTransactionID}
          setWantAppeal={setWantAppeal}
          WantAppeal={WantAppeal}
        />
        <View style={{ marginBottom: 40 }} />
      </ScrollView>
    </View>
  );
};

export default NonAdminHome;

const styles = StyleSheet.create({});
