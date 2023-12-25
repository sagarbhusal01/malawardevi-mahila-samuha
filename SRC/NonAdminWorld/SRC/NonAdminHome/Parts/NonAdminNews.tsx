import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  DETAIL_COLOR,
  GlobalStyle,
  HEADINGTTHREEFONTSIZE,
  HEADINGTWOFONTSIZE,
  PRIMARY_COLOR,
  TERTIARY_COLOR,
  WRAPPER_COLOR,
  winWidth,
} from "../../../../global/GlobalConfig";
import { query, collection, where, onSnapshot } from "firebase/firestore";
import { db } from "../../../../../FirebaseConfig";
import { GETNEPALIDATE } from "../../../../global/GETNEPALIDATE";
import { NewsType } from "../../../../global/Types";

const NonAdminNews = (props: any) => {
  const [Date, setDate] = React.useState<string>();
  const [News, setNews] = React.useState<NewsType[]>([]);
  // ====================================================

  // ====================================================

  const FetchNewsData = () => {
    const q = query(collection(db, "News"), where("isDeadLined", "==", false));

    onSnapshot(q, (querySnapshot) => {
      setNews([]);
      querySnapshot.forEach((doc) => {
        setNews((prev: any) => [
          ...prev,
          {
            ID: doc.id,
            Date: doc.data().Date,
            NewsData: doc.data().NewsData,
            isDeadLined: doc.data().isDeadLined,
          },
        ]);
      });
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
                <View style={styles.DetailContainer} key={key}>
                  <Text style={styles.NewsDataText}>{names.NewsData}</Text>
                </View>
              );
            })}
          </View>
        </>
      ) : null}
    </>
  );
};

export default NonAdminNews;

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
    borderRadius: 5,
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
