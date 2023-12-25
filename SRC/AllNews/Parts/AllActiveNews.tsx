import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import {
  GlobalStyle,
  HEADINGTTHREEFONTSIZE,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  TERTIARY_COLOR,
} from "../../global/GlobalConfig";

const AllActiveNews = (props: any) => {
  return (
    <>
      {props.AllActiveNewsList ? (
        <>
          <View style={[GlobalStyle.WrapperContainer, { paddingTop: 10 }]}>
            <Text
              style={{
                alignSelf: "center",
                paddingBottom: 10,
                fontWeight: "800",
                fontSize: HEADINGTTHREEFONTSIZE,
                color: PRIMARY_COLOR,
              }}
            >
              चालु समाचारहरु
            </Text>
            {props.AllActiveNewsList.map((names: any, key: number) => {
              return (
                <TouchableOpacity
                  style={GlobalStyle.DetailContainer}
                  key={key}
                  activeOpacity={0.85}
                  onLongPress={() => {
                    props.setNewsHandlerStatusData([
                      { ID: names.ID, isDeadLined: names.isDeadLined },
                    ]);
                    props.setNewsStatusHandlerTogglePopupState(true);
                  }}
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
      ):(null)}
    </>
  );
};

export default AllActiveNews;

const styles = StyleSheet.create({
  TagContainer: {
    padding: 10,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
  },
});
