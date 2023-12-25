import { View, RefreshControl, ScrollView } from "react-native";
import React from "react";
import Summary from "./Parts/Summary.Account";
import MembersHeader from "./Parts/MembersHeader";
import AllMembersList from "./Parts/AllMembersList";
import {
  collection,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import { MemberListType } from "../global/Types";
import PopupActions from "./Parts/PopupActions";
import { winWidth } from "../global/GlobalConfig";

export default function KhataPata(props: any) {
  // ==============================================
  const [Uploading, setUploading] = React.useState<boolean>(false);
  // =============================================
  const [MemberList, setMemberList] = React.useState<MemberListType[]>();
  // ==========================================================
  // ======================================================================================================
  // =========================================================== For Summary ===========================
  // ======================================================================================================
  // ======================================================================================================

  const [Cash_Given, setCash_Given] = React.useState<number | string>();
  const [Cash_Taken, setCash_Taken] = React.useState<number | string>();
  const [InterestEarned, setInterestEarned] = React.useState<number | string>();
  // ============================================

  //======================================= Fetching cash given from the firebase ========================

  const FetchCashGiven = () => {
    onSnapshot(doc(db, "TOTAL", "Cash_Given"), (doc) => {
      if (doc.exists()) {
        if (doc.data().Amount === 0) {
          setCash_Given("0");
        } else {
          setCash_Given(doc.data().Amount);
        }
        if (doc.data().InterestEarned === 0 || !doc.data().InterestEarned) {
          setInterestEarned("0");
        } else {
          setInterestEarned(doc.data().InterestEarned);
        }
      } else {
        setCash_Given("0");
        setInterestEarned("0");
      }
    });
  };

  //   ========================================== fetching Cash taken from the firebase =================
  const FetchCashTaken = () => {
    onSnapshot(doc(db, "TOTAL", "Cash_Taken"), (doc) => {
      if (doc.exists()) {
        if (doc.data().Amount == 0) {
          setCash_Taken("0");
        } else {
          setCash_Taken(doc.data().Amount);
        }
      } else {
        setCash_Taken("0");
      }
    });
  };

  //  ============================================ For All MemberList ===================

  const FetchAllMemberList = () => {
    let CachedMemberList: MemberListType[] = [];
    const q = query(collection(db, "UserData"));
    onSnapshot(q, (querySnapshot) => {
      setUploading(true);
      while (CachedMemberList.length > 0) {
        CachedMemberList.pop();
      }
      querySnapshot.forEach((doc) => {
        CachedMemberList.push({
          Name: doc.data().Name,
          Address: doc.data().Address,
          Phone: doc.data().Phone,
          ID: doc.data().ID,
        });
      });
      CachedMemberList.sort(function (x, y) {
        return x.ID - y.ID;
      });
      setMemberList(CachedMemberList);
      setUploading(false);
    });
  };
  // ============================================================================================
  // ======================================================================================================
  // ======================================================================================================
  const [AppealList, setAppealList] = React.useState([]);
  // ======================================================================================================
  // ======================================================================================================

  const FetchAppeal = () => {
    var CachedAppealList: any = [];
    const q = query(collection(db, "Appeal"));

    onSnapshot(q, (querySnapshot) => {
      while (CachedAppealList.length > 0) {
        CachedAppealList.pop();
      }
      querySnapshot.forEach((doc) => {
        CachedAppealList.push({
          AppealData: doc.data().AppealData,
          CreatedAt: doc.data().CreatedAt,
          CreatedBy: doc.data().CreatedBy,
          TransactionID: doc.data().TransactionID,
        });
      });
      setAppealList(CachedAppealList);
    });
  };
  // ======================================================================================================
  // ======================================================================================================
  React.useEffect(() => {
    FetchCashGiven();
    FetchCashTaken();
    FetchAllMemberList();
    FetchAppeal();
  }, []);


  
  // ======================================================================================================
  // =================================================================For Refershing=====================================
  // ======================================================================================================
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    FetchCashGiven();
    FetchCashTaken();
    FetchAllMemberList();
    setTimeout(() => {
      setRefreshing(false);
    }, 100);
  }, []);
  // ======================================================================================================
  // ======================================================================================================
  // ======================================================================================================
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* =========================================== */}
        <Summary
          Cash_Given={Cash_Given}
          Cash_Taken={Cash_Taken}
          InterestEarned={InterestEarned}
          NAV={props.NAV}
        />
        {/* ===================== Members Head ==================*/}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 30,
            width: winWidth * 0.9,
            alignSelf: "center",
          }}
        >
          <MembersHeader />
          <PopupActions NAV={props.NAV} />
        </View>
        {/* ======================= Members List =================*/}
        <AllMembersList
          NAV={props.NAV}
          MemberList={MemberList}
          Uploading={Uploading}
          AppealList={AppealList}
        />
      </ScrollView>
    </View>
  );
}
