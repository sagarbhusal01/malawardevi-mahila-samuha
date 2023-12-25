import { StyleSheet, Text, View, ToastAndroid } from "react-native";
import React from "react";
import AllLoanTransactions from "./Parts/AllLoanTransactions";
import TotalLoan from "./Parts/TotalLoan";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
  updateDoc,
  writeBatch,
  increment,
} from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import { AllTransactionsListType, CatchMessagetype } from "../global/Types";
import LoanDescPopup from "./Parts/LoanDescPopup";
import { GETNEPALIDATE } from "../global/GETNEPALIDATE";
import CatchError from "../global/CatchError";
// =========================================================================
// =========================================================================
// =========================================================================

const LoanPayment = (props: any) => {
  // =========================================================================
  // =========================================================================
  // =========================================================================
  const [CatchMessage, setCatchMessage] = React.useState<CatchMessagetype>();
  const [TotalLoanAmount, setTotalLoanAmount] = React.useState<number>();
  const [Uploading, setUploading] = React.useState<boolean>(false);
  const [AllLoanTransactionList, setAllLoanTransactionList] = React.useState<
    AllTransactionsListType[]
  >([]);
  const [TogglePopup, setTogglePopup] = React.useState<boolean>(false);
  const [PopupData, setPopupData] = React.useState<AllTransactionsListType>();
  //   =================================================================================
  //   =================================================================================
  //   =========================== Fetching Total loan Amount ============================

  const GetTotalLoan = () => {
    const unsub = onSnapshot(
      doc(db, "Account", `${props.route.params.Phone}`, "TOTAL", "Loan"),
      (doc) => {
        setTotalLoanAmount(doc.data()?.Amount);
      }
    );
  };

  //   =================================================================================
  //   ============================== Fetching All Loan transactions List ================
  //   =================================================================================
  const FetchAllLoanTransactions = () => {
    const CachedAllLoantransactionList: AllTransactionsListType[] = [];
    const q = query(
      collection(db, "Account", `${props.route.params.Phone}`, "Transactions"),
      where("category", "==", "Loan"),
      where("IsPaid", "==", false),
      orderBy("CreatedAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setUploading(true);
      while (CachedAllLoantransactionList.length > 0) {
        CachedAllLoantransactionList.pop();
      }
      querySnapshot.forEach((doc: any) => {
        if (doc.data().category === "Loan") {
          CachedAllLoantransactionList.push({
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
      setAllLoanTransactionList(CachedAllLoantransactionList);
      setUploading(false);
    });
  };

  //   =================================================================================
  //   =================================================================================
  //   =================================================================================
  const LoanDeposit = async (
    ID: string,
    LoanDepositedAmount: number,
    LoanAmount: number
  ) => {
    // creating batch
    const batch = writeBatch(db);

    // // updating the transaction IsPaid State and adding extra amount
    const UpdateLoanDepositref = doc(
      db,
      "Account",
      `${props.route.params.Phone}`,
      "Transactions",
      `${ID}`
    );

    batch.update(UpdateLoanDepositref, {
      IsPaid: true,
      LoanDepositedAmount: LoanDepositedAmount,
      InterestPaid: LoanDepositedAmount - LoanAmount,
      LoanDepositedDate: GETNEPALIDATE(),
    });

    const ChangeUserTotalref = doc(
      db,
      "Account",
      `${props.route.params.Phone}`,
      "TOTAL",
      "Loan"
    );
    batch.update(ChangeUserTotalref, { Amount: increment(-LoanAmount) });

    const ChangeTOTALref = doc(db, "TOTAL", "Cash_Given");
    batch.update(ChangeTOTALref, { Amount: increment(-LoanAmount) });

    const ChangeTotalInterestEarnedref = doc(db, "TOTAL", "Cash_Given");

    batch.update(ChangeTotalInterestEarnedref, {
      InterestEarned: increment(LoanDepositedAmount - LoanAmount),
    });

    // Commit the batch
    await batch
      .commit()
      .then(() => {
        ToastAndroid.show("ऋण भुक्तानी सफल भयो", ToastAndroid.LONG);
        setTogglePopup(false);
        if (AllLoanTransactionList.length === 0) {
          props.navigation.replace("Canvas", { PageRequest: "KhataPata" });
        }
      })
      .catch((e) => {
        setCatchMessage({
          message: "ऋण भुक्तानी सफल हुन सकेन",
          ErrorCode: e.message,
        });
      });
    //
  };
  //   =================================================================================
  //   =================================================================================
  //   =================================================================================

  const DeleteLoanTransactions = async (ID: string, LoanAmount: number) => {
    const batch = writeBatch(db);
    // // updating the transaction IsPaid State and adding extra amount
    const Deletetransactionref = doc(
      db,
      "Account",
      `${props.route.params.Phone}`,
      "Transactions",
      `${ID}`
    );

    batch.delete(Deletetransactionref);

    const UpdateTotalDepositref = doc(
      db,
      "Account",
      `${props.route.params.Phone}`,
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

    await batch
      .commit()
      .then(() => {
        ToastAndroid.show("ऋण विवरण डिलिट  सफल भयो ", ToastAndroid.LONG);
        setTogglePopup(false);
        if (AllLoanTransactionList.length === 0) {
          props.navigation.replace("Canvas", { PageRequest: "KhataPata" });
        }
      })
      .catch((e) => {
        setCatchMessage({
          message: "ऋण विवरण डिलिट  सफल हुन सकेन",
          ErrorCode: e.message,
        });
      });
  };
  //   =================================================================================
  //   =================================================================================
  //   =================================================================================
  React.useEffect(() => {
    GetTotalLoan();
    FetchAllLoanTransactions();
  }, []);
  //   =================================================================================
  //   =================================================================================
  //   =================================================================================

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <CatchError CatchMessage={CatchMessage} />
      <TotalLoan TotalLoanAmount={TotalLoanAmount} />
      <AllLoanTransactions
        Phone={props.route.params.Phone}
        AllLoanTransactionList={AllLoanTransactionList}
        setTogglePopup={setTogglePopup}
        setPopupData={setPopupData}
      />
      <LoanDescPopup
        setTogglePopup={setTogglePopup}
        TogglePopup={TogglePopup}
        PopupData={PopupData}
        LoanDeposit={LoanDeposit}
        DeleteLoanTransactions={DeleteLoanTransactions}
      />
    </View>
  );
};

export default LoanPayment;
