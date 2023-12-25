import { ScrollView, StyleSheet, Text, ToastAndroid, View } from "react-native";
import React from "react";
import UserAccountDetails from "./Parts/UserAccountDetails";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db, auth } from "../../FirebaseConfig";
import AccountTransactionSummary from "./Parts/AccountTransactionSummary";
import AccountAllTransactionList from "./Parts/AccountAllTransactionList";
import { AllTransactionsListType } from "../global/Types";
import AddTransactionButton from "./Parts/AddTransactionButton";
import AppealDetails from "./Parts/AppealDetails";

const UserAccount = (props: any) => {
  //   ==================================================
  //   ==================================================
  const [Deposit, setDeposit] = React.useState<number>(0);
  const [Loan, setLoan] = React.useState<number>(0);
  const [Uploading, setUploading] = React.useState<boolean>(false);
  const [AllTransactionList, setAllTransactionList] = React.useState<
    AllTransactionsListType[]
  >([]);
  // const [DocumentExist, setDocumentExist] = React.useState<boolean>(false);
  let CachedAllTransactions: AllTransactionsListType[] = [];
  const [UserAppeal, setUserAppeal] = React.useState<any>();
  const [UserAppealTransaction, setUserAppealTransaction] =
    React.useState<AllTransactionsListType>();
  //   ==================================================
  //   ==================================================

  //   ==================================================
  //    fetch All Deposit and Loan from the firebase for a particular account
  //  ====================================================

  const FetchDepositAndLoan = () => {
    const q = query(
      collection(db, "Account", `${props.route.params.Phone}`, "TOTAL")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.empty) {
        setDeposit(0);
        setLoan(0);
        setUploading(false);
      }

      querySnapshot.forEach((doc) => {
        if (doc.id === "Deposit") {
          setDeposit(doc.data().Amount);
        } else if (doc.id === "Loan") {
          setLoan(doc.data().Amount);
        }
      });
      setUploading(false);
    });
  };

  //   ==================================================
  //   ==================================================
  const FetchAllTransactionList = () => {
    const q = query(
      collection(db, "Account", `${props.route.params.Phone}`, "Transactions"),
      orderBy("CreatedAt", "desc")
    );
    onSnapshot(q, (querySnapshot) => {
      setUploading(true);
      while (CachedAllTransactions.length > 0) {
        CachedAllTransactions.pop();
      }
      querySnapshot.forEach((doc) => {
        if (doc.data().category === "Deposit") {
          CachedAllTransactions.push({
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
          });
        } else if (doc.data().category === "Loan") {
          CachedAllTransactions.push({
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
          });
        }
      });
      setAllTransactionList(CachedAllTransactions);
      setUploading(false);
    });
  };
  //   ==================================================
  //   ==================================================
  const GOTOAddTransactionPage = () => {
    props.navigation.navigate("AddTransactions", {
      Name: props.route.params.Name,
      Phone: props.route.params.Phone,
    });
  };
  //   ==================================================
  const GOTOLoanPaymentPage = () => {
    props.navigation.navigate("LoanPayment", {
      Name: props.route.params.Name,
      Phone: props.route.params.Phone,
    });
  };
  //   ==================================================
  //   ==================================================
  //   ==================================================
  const FetchAppealList = () => {
    onSnapshot(
      doc(db, "Appeal", `${props.route.params.Phone}`),
      (doc) => {
        if (doc.exists()) {
          setUserAppeal({
            AppealData: doc.data().AppealData,
            CreatedAt: doc.data().CreatedAt,
            Date: doc.data().Date,
            TransactionID: doc.data().TransactionID,
          });
        } else {
          setUserAppeal(0);
        }
      }
    );
  };
  //   ==================================================
  //   ==================================================
  //   ==================================================
  const FetchAppealTransaction = (TransactionID: string) => {
    onSnapshot(
      doc(
        db,
        "Account",
        `${props.route.params.Phone}`,
        "Transactions",
        `${TransactionID}`
      ),
      (doc) => {
        if (doc.exists()) {
          setUserAppealTransaction({
            ID: doc.id,
            Amount: doc.data()?.Amount,
            Date: doc.data()?.Date,
            Total: doc.data()?.Total,
            category: doc.data()?.category,
            Duration: doc.data()?.Duration,
            InterestRate: doc.data()?.InterestRate,
            IsPaid: doc.data()?.IsPaid,
            CreatedAt: doc.data()?.CreatedAt,
            LoanDepositedAmount: doc.data()?.LoanDepositedAmount,
            LoanDepositedDate: doc.data()?.LoanDepositedDate,
            Month: doc.data()?.Month,
            InterestPaid: doc.data()?.InterestPaid,
          });
        }
      }
    );
  };
  //   ==================================================
  //   ==================================================
  //   ==================================================

  React.useEffect(() => {
    FetchDepositAndLoan();
    FetchAllTransactionList();
    FetchAppealList();
  }, []);

  //   ==================================================
  //   ==================================================
  //   ==================================================

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView overScrollMode="never" showsVerticalScrollIndicator={false}>
        <UserAccountDetails Route={props.route} />
        <AppealDetails
          UserAppeal={UserAppeal}
          FetchAppealTransaction={FetchAppealTransaction}
          UserAppealTransaction={UserAppealTransaction}
          Phone={props.route.params.Phone}
        />
        <AccountTransactionSummary
          Deposit={Deposit}
          Loan={Loan}
          GOTOLoanPaymentPage={GOTOLoanPaymentPage}
        />
        <AccountAllTransactionList
          AllTransactionList={AllTransactionList}
          GOTOLoanPaymentPage={GOTOLoanPaymentPage}
        />
      </ScrollView>
      <AddTransactionButton GOTOAddTransactionPage={GOTOAddTransactionPage} />
    </View>
  );
};

export default UserAccount;

const styles = StyleSheet.create({});
