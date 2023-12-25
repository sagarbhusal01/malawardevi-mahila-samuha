import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import {
  GlobalStyle,
  HEADINGTTHREEFONTSIZE,
  PRIMARY_COLOR,
  TERTIARY_COLOR,
  SECONDARY_COLOR,
} from "../../global/GlobalConfig";

const AllDeadLinedNews = (props: any) => {
  return (
    <>
      {props.AllDeadLinedNewsList ? (
        <>
          <View style={[GlobalStyle.WrapperContainer, { paddingTop: 10 }]}>
            <Text
              style={{
                alignSelf: "center",
                paddingBottom: 10,
                fontWeight: "800",
                fontSize: HEADINGTTHREEFONTSIZE,
                color: SECONDARY_COLOR,
              }}
            >
              पुरनो समाचारहरु
            </Text>
            {props.AllDeadLinedNewsList.map((names: any, key: number) => {
              return (
                <TouchableOpacity
                activeOpacity={0.85}
                  onLongPress={() => {
                    props.setNewsHandlerStatusData([
                      { ID: names.ID, isDeadLined: names.isDeadLined },
                    ]);
                    props.setNewsStatusHandlerTogglePopupState(true);
                  }}
                  style={GlobalStyle.DetailContainer}
                  key={key}
                >
                  <View style={{ padding: 20 }}>
                    <Text style={{ fontWeight: "800", color: TERTIARY_COLOR }}>
                      {names.NewsData}
                    </Text>
                    <View style={{ width: "100%" }}>
                      <View
                        style={[
                          styles.TagContainer,
                          {
                            backgroundColor: names.isDeadLined
                              ? SECONDARY_COLOR
                              : PRIMARY_COLOR,
                          },
                        ]}
                      >
                        <Text style={{ color: "white", fontWeight: "800" }}>
                          {names.isDeadLined ? "पुरनो " : "चालु"}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </>
      ):null}
    </>
  );
};

export default AllDeadLinedNews;

const styles = StyleSheet.create({
  TagContainer: {
    padding: 10,
    width: "22%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
  },
});
