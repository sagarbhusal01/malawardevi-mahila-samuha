import { StyleSheet, Text, ToastAndroid, View, ScrollView } from "react-native";
import React from "react";
import AllNewsHeader from "./Parts/AllNewsHeader";
import AllActiveNews from "./Parts/AllActiveNews";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import { CatchMessagetype, NewsType } from "../global/Types";
import AllDeadLinedNews from "./Parts/AllDeadLinedNews";
import AddNewsPopup from "./Parts/AddNewsPopup";
import AddNewsButton from "./Parts/AddNewsButton";
import { GETNEPALIDATE } from "../global/GETNEPALIDATE";
import {
  HEADINGTTHREEFONTSIZE,
  HEADINGTWOFONTSIZE,
} from "../global/GlobalConfig";
import NewsStatusHandlerPopup from "./Parts/NewsStatusHandlerPopup";
import CatchError from "../global/CatchError";

const AllNews = () => {
  const [AllActiveNewsList, setAllActiveNewsList] = React.useState<NewsType[]>(
    []
  );
  const [AllDeadLinedNewsList, setAllDeadLinedNewsList] = React.useState<
    NewsType[]
  >([]);
  const [CatchMessage, setCatchMessage] = React.useState<CatchMessagetype>();

  // ==================================================================
  // ==================================================================
  // ==================================================================

  const [NewNewsData, setNewNewsData] = React.useState<string>("");
  const [PopupToggleState, setPopupToggleState] =
    React.useState<boolean>(false);

  // ==================================================================
  // ==================================================================
  // ==================================================================
  const [
    NewsStatusHandlerTogglePopupState,
    setNewsStatusHandlerTogglePopupState,
  ] = React.useState<boolean>(false);

  const [NewsHandlerStatusData, setNewsHandlerStatusData] =
    React.useState<string[]>();
  // ==================================================================
  // ==================================================================
  // ==================================================================
  const FetchAllActiveNewsList = () => {
    let CachedActiveNewsList: NewsType[] = [];
    // ===========================================
    const q = query(collection(db, "News"), where("isDeadLined", "==", false));
    onSnapshot(q, (querySnapshot) => {
      while (CachedActiveNewsList.length > 0) {
        CachedActiveNewsList.pop();
      }

      querySnapshot.forEach((doc) => {
        if (doc.data().isDeadLined === false) {
          CachedActiveNewsList.push({
            ID: doc.id,
            Date: doc.data().Date,
            NewsData: doc.data().NewsData,
            isDeadLined: doc.data().isDeadLined,
          });
        }
      });
      setAllActiveNewsList(CachedActiveNewsList);
    });
  };

  // ==================================================================
  // ==================================================================
  // ==================================================================
  const FetchAllDeadLinedNews = () => {
    let CachedDeadLinedNewsList: NewsType[] = [];
    // =========================================
    const q = query(collection(db, "News"), where("isDeadLined", "==", true));
    onSnapshot(q, (querySnapshot) => {
      while (CachedDeadLinedNewsList.length > 0) {
        CachedDeadLinedNewsList.pop();
      }
      querySnapshot.forEach((doc) => {
        if (doc.data().isDeadLined) {
          CachedDeadLinedNewsList.push({
            ID: doc.id,
            Date: doc.data().Date,
            NewsData: doc.data().NewsData,
            isDeadLined: doc.data().isDeadLined,
          });
        }
      })
      setAllDeadLinedNewsList(CachedDeadLinedNewsList);
    });
  };

  // ==================================================================
  // ==================================================================
  // ==================================================================
  const AddNewNewsDataIntoFirebase = async () => {
    await addDoc(collection(db, "News"), {
      Date: GETNEPALIDATE(),
      NewsData: NewNewsData,
      isDeadLined: false,
    })
      .then(() => {
        ToastAndroid.show("समाचार सफल्ता पूर्वक थप भयो", ToastAndroid.LONG);
        setNewNewsData("");
        setPopupToggleState(false);
      })
      .catch((e) => {
        ToastAndroid.show("समाचार थप भएन", ToastAndroid.LONG);
      });
  };
  // ==================================================================
  // ==================================================================
  // ==================================================================
  const MakeNewsDeadlined = async (data: any) => {
    const NewsRef = doc(db, "News", `${data[0].ID}`);
    await updateDoc(NewsRef, {
      isDeadLined: !data[0].isDeadLined,
    }).then(() => {
      ToastAndroid.show(
        "समाचार सफल्ता पूर्वक पुरानो वा नयाँ घोसित भयो",
        ToastAndroid.LONG
      );
    });
  };
  // ==================================================================
  // ==================================================================
  // ==================================================================
  const DeleteNews = async (data: any) => {
    await deleteDoc(doc(db, "News", data[0].ID))
      .then(() => {
        ToastAndroid.show("समाचार सफल्ता पूर्वक डिलिट भयो", ToastAndroid.LONG);
      })
      .catch((e) => {
        setCatchMessage({
          message: "समाचार सफल्ता पूर्वक डिलिट हुन सकेन",
          ErrorCode: e.message,
        });
      });
  };
  // ==================================================================
  // ==================================================================
  // ==================================================================
  React.useEffect(() => {
    FetchAllActiveNewsList();
    FetchAllDeadLinedNews();
  }, [PopupToggleState,NewsStatusHandlerTogglePopupState]);
  // ==================================================================

  // ==================================================================
  // ==================================================================
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <CatchError CatchMessage={CatchMessage} />
        {AllActiveNewsList?.length || AllDeadLinedNewsList?.length ? (
          <AllNewsHeader />
        ) : (
          <Text
            style={{
              fontFamily: "AnekDevanagari_800ExtraBold",
              alignSelf: "center",
              marginTop: 15,
              fontSize: HEADINGTWOFONTSIZE,
            }}
          >
            कुनै पनि समाचार फेला परेन
          </Text>
        )}
        {AllActiveNewsList?.length ? (
          <AllActiveNews
            AllActiveNewsList={AllActiveNewsList}
            setNewsHandlerStatusData={setNewsHandlerStatusData}
            setNewsStatusHandlerTogglePopupState={
              setNewsStatusHandlerTogglePopupState
            }
          />
        ) : null}
        {AllDeadLinedNewsList?.length ? (
          <AllDeadLinedNews
            AllDeadLinedNewsList={AllDeadLinedNewsList}
            setNewsHandlerStatusData={setNewsHandlerStatusData}
            setNewsStatusHandlerTogglePopupState={
              setNewsStatusHandlerTogglePopupState
            }
          />
        ) : null}
        <NewsStatusHandlerPopup
          DeleteNews={DeleteNews}
          MakeNewsDeadlined={MakeNewsDeadlined}
          NewsHandlerStatusData={NewsHandlerStatusData}
          NewsStatusHandlerTogglePopupState={NewsStatusHandlerTogglePopupState}
          setNewsStatusHandlerTogglePopupState={
            setNewsStatusHandlerTogglePopupState
          }
        />
        <AddNewsPopup
          PopupToggleState={PopupToggleState}
          setPopupToggleState={setPopupToggleState}
          setNewNewsData={setNewNewsData}
          NewNewsData={NewNewsData}
          AddNewNewsDataIntoFirebase={AddNewNewsDataIntoFirebase}
        />
      </ScrollView>

      <AddNewsButton setPopupToggleState={setPopupToggleState} />
    </View>
  );
};

export default AllNews;

const styles = StyleSheet.create({});
