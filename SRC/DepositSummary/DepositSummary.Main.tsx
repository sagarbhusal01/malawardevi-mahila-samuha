import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { GlobalStyle, PRIMARY_COLOR, winWidth } from "../global/GlobalConfig";
import TodayDepositSummary from "./parts/TodayDepositSummary";
import ThreeDayDepositSummary from "./parts/ThreeDayDepositSummary";
import DepositAttendance from "./parts/DepositAttendance";
import {
  query,
  collection,
  getDocs,
  where,
  onSnapshot,
  or,
  and,
  startAt,
} from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import {
  GETNEPALIDATE,
  GETNEPALIMONTH,
  GETTHATNEPALIDATE,
} from "../global/GETNEPALIDATE";
import { AllDepositTransactionsListTypeWithName } from "../global/Types";

const DepositSummary = (props: any) => {
  const [FocusedButton, setFocusedButton] = useState<string>("आजको लेवी");
  const [TogglePopup, setTogglePopup] = useState<boolean>(false);
  const [AllDepositAttendance, setAllDepositAttendance] = useState<any>();
  // =====================================================================
  // =====================================================================
  // =====================================================================

  const [TotalTodayDeposit, setTotalTodayDeposit] = useState<number>(0);
  const [AllTodayDepositTransaction, setAllTodayDepositTransaction] = useState<
    AllDepositTransactionsListTypeWithName[]
  >([]);
  // =====================================================================
  // =====================================================================
  // =====================================================================
  const [TotalThreeDayDeposit, setTotalThreeDayDeposit] = useState<number>(0);
  const [AllThreedayDepositTransaction, setAllThreedayDepositTransaction] =
    useState<AllDepositTransactionsListTypeWithName[]>([]);
  // =====================================================================
  // =====================================================================
  // =====================================================================

  const GetTodayDepositTransaction = () => {
    const UserDataREF = query(collection(db, "UserData"));
    onSnapshot(UserDataREF, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setAllTodayDepositTransaction([]);
        setTotalTodayDeposit(0);
        const TransactionRef = query(
          collection(db, "Account", `${doc.id}`, "Transactions"),
          where("Date", "==", `${GETNEPALIDATE()}`),
          where("category", "==", "Deposit")
        );
        onSnapshot(TransactionRef, (querySnapshot) => {
          querySnapshot.forEach((subdoc) => {
            setTotalTodayDeposit((prev) => prev + subdoc.data().Amount);

            setAllTodayDepositTransaction((prevState: any) => [
              ...prevState,
              {
                Name: doc.data().Name,
                ID: doc.data().ID,
                Phone: doc.data().Phone,
                Address: doc.data().Address,
                Amount: subdoc.data().Amount,
                Date: subdoc.data().Date,
                Total: subdoc.data().Total,
                category: subdoc.data().category,
                CreatedAt: subdoc.data().CreatedAt,
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
  const GetThreeDepositTransaction = () => {
    const UserDataREF = query(collection(db, "UserData"));
    onSnapshot(UserDataREF, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setAllThreedayDepositTransaction([]);
        setTotalThreeDayDeposit(0);
        const TransactionRef = query(
          collection(db, "Account", `${doc.id}`, "Transactions"),
          and(
            where("category", "==", "Deposit"),
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
            setTotalThreeDayDeposit((prev) => prev + subdoc.data().Amount);

            setAllThreedayDepositTransaction((prevState: any) => [
              ...prevState,
              {
                Name: doc.data().Name,
                ID: doc.data().ID,
                Phone: doc.data().Phone,
                Address: doc.data().Address,
                Amount: subdoc.data().Amount,
                Date: subdoc.data().Date,
                Total: subdoc.data().Total,
                category: subdoc.data().category,
                CreatedAt: subdoc.data().CreatedAt,
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
  const HandleAttendance = () => {
    const USerDataRef = query(collection(db, "UserData"));
    onSnapshot(USerDataRef, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setAllDepositAttendance([]);
        const UserAccountRef = query(
          collection(db, "Account", `${doc.id}`, "Transactions"),
          where("Month", "==", GETNEPALIMONTH()),
          where("category", "==", "Deposit")
        );
        onSnapshot(UserAccountRef, (querySnapshot) => {
          if (querySnapshot.empty) {
            setAllDepositAttendance((prev: any) => [
              ...prev,
              {
                Name: doc.data().Name,
                Present: false,
              },
            ]);
          }
          querySnapshot.forEach((subdoc) => {
            if (subdoc.data().category === "Deposit") {
              setAllDepositAttendance((prev: any) => [
                ...prev,
                {
                  Name: doc.data().Name,
                  Present: true,
                },
              ]);
            } else {
              setAllDepositAttendance((prev: any) => [
                ...prev,
                {
                  Name: doc.data().Name,
                  Present: false,
                },
              ]);
            }
          });
        });
      });
    });
  };
  // =====================================================================
  // =====================================================================
  // =====================================================================
  const HandlePageRender = () => {
    if (FocusedButton === "आजको लेवी") {
      return (
        <TodayDepositSummary
          NAV={props.navigation.navigate}
          AllTodayDepositTransaction={AllTodayDepositTransaction}
          TotalTodayDeposit={TotalTodayDeposit}
        />
      );
    } else if (FocusedButton === "३ दिनको लेवी") {
      return (
        <ThreeDayDepositSummary
          NAV={props.navigation.navigate}
          AllThreedayDepositTransaction={AllThreedayDepositTransaction}
          TotalThreeDayDeposit={TotalThreeDayDeposit}
        />
      );
    } else if (FocusedButton === "हाजिरी") {
      return <DepositAttendance AllDepositAttendance={AllDepositAttendance} />;
    } else {
      return <TodayDepositSummary />;
    }
  };

  // =====================================================================
  // =====================================================================
  // =====================================================================
  useEffect(() => {
    GetTodayDepositTransaction();
    GetThreeDepositTransaction();
    HandleAttendance();
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
                setFocusedButton("आजको लेवी");
                setTogglePopup(false);
              }}
            >
              <Text style={styles.ButtonText}>आजको लेवी</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={GlobalStyle.DetailContainer}
              activeOpacity={0.8}
              onPress={() => {
                setFocusedButton("३ दिनको लेवी");
                setTogglePopup(false);
              }}
            >
              <Text style={styles.ButtonText}>३ दिनको लेवी</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={GlobalStyle.DetailContainer}
              activeOpacity={0.8}
              onPress={() => {
                setFocusedButton("हाजिरी");
                setTogglePopup(false);
              }}
            >
              <Text style={styles.ButtonText}>हाजिरी</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={{ marginTop: 15 }} />

      <HandlePageRender />
    </View>
  );
};

export default DepositSummary;

const styles = StyleSheet.create({
  OptionContainer: {
    height: 50,
    width: 140,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: PRIMARY_COLOR,
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
