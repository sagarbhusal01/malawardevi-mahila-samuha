import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import {
  DETAIL_COLOR,
  GlobalStyle,
  HEADINGTTHREEFONTSIZE,
  HEADINGTWOFONTSIZE,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  TERTIARY_COLOR,
  WRAPPER_COLOR,
  winWidth,
} from "../../global/GlobalConfig";

import { auth, db } from "../../../FirebaseConfig";
import { collection, query, where, onSnapshot } from "firebase/firestore";

import { NewsType } from "../../global/Types";

import { GETNEPALIDATE } from "../../global/GETNEPALIDATE";
import { isAdmin } from "../../global/DetermineAdmin";
// ================================================
export default function News(props: any) {
  // ====================================================
  const [Date, setDate] = React.useState<string>();
  const [News, setNews] = React.useState<NewsType[]>([]);
  const CachedNewsData: NewsType[] = [];
  // ====================================================

  // ====================================================

  const FetchNewsData = () => {
    const q = query(collection(db, "News"), where("isDeadLined", "==", false));

    const unsub = onSnapshot(q, (querySnapshot) => {
      while (CachedNewsData.length > 0) {
        CachedNewsData.pop();
      }
      querySnapshot.forEach((doc) => {
        CachedNewsData.push({
          ID: doc.id,
          Date: doc.data().Date,
          NewsData: doc.data().NewsData,
          isDeadLined: doc.data().isDeadLined,
        });
      });
      setNews(CachedNewsData);
    });
  };
  React.useEffect(() => {
    FetchNewsData();
    setDate(GETNEPALIDATE());
  }, []);

  // ====================================================

  return (
    <>
      {News?.length ? (
        <>
          <View style={styles.AllNewsContainer}>
            <View style={styles.AllNewsButton}>
              <Text style={styles.AllNewsButtonText}>समाचारहरु</Text>
            </View>
          </View>
          {/* ===================== Today's News Container =============== */}
          <View style={[GlobalStyle.WrapperContainer, { paddingBottom: 25 }]}>
            <View style={{ width: "90%", alignSelf: "center" }}>
              <Text style={styles.TodaysDateText}>{Date}</Text>
            </View>

            {/* ========================= Displaying news ==================== */}

            {News.map((names, key) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    if (isAdmin(auth.currentUser?.email)) {
                      props.GoTONewsPage();
                    }
                  }}
                  style={styles.DetailContainer}
                  key={key}
                >
                  <Text style={styles.NewsDataText}>{names.NewsData}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  AllNewsContainer: {
    width: winWidth * 0.9,
    alignSelf: "center",
    marginTop: 35,
  },
  AllNewsButton: {
    width: 150,
    height: 45,
    backgroundColor: PRIMARY_COLOR,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  AllNewsButtonText: {
    color: "white",
    fontSize: HEADINGTWOFONTSIZE,
    fontWeight: "800",
  },
  TodaysNewsContainer: {
    width: winWidth * 0.9,
    backgroundColor: WRAPPER_COLOR,
    borderRadius: 8,
    minHeight: 150,
    marginTop: 15,
    paddingBottom: 20,
  },
  TodaysDateText: {
    fontSize: HEADINGTTHREEFONTSIZE,
    fontFamily: "AnekDevanagari_800ExtraBold",
  },
  DetailContainer: {
    width: "90%",
    padding: 20,
    alignSelf: "center",
    backgroundColor: DETAIL_COLOR,
    borderRadius: 5,
    marginTop: 5,
  },
  NewsDataText: {
    fontWeight: "800",
    color: TERTIARY_COLOR,
  },
  AddNewsButton: {
    marginTop: 20,
  },
});
