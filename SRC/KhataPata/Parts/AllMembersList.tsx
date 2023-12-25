import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import {
  DETAIL_COLOR,
  HEADINGTTHREEFONTSIZE,
  SECONDARY_COLOR,
  WRAPPER_COLOR,
  winWidth,
} from "../../global/GlobalConfig";
import LoadingGreenSmall from "../../Components/LoadingGreenSmall";
// ==========================================================
const AllMembersList = (props: any) => {
  return (
    <>
      {!props.Uploading ? (
        <>
          {props.MemberList?.length ? (
            <View style={[{ marginTop: 10 }]}>
              {props.MemberList.map((names: any) => {
                return (
                  <TouchableOpacity
                    style={styles.DetailContainer}
                    key={names.ID}
                    activeOpacity={0.6}
                    onPress={() => {
                      props.NAV("userAccount", {
                        Name: names.Name,
                        ID: names.ID,
                        Address: names.Address,
                        Phone: names.Phone,
                      });
                    }}
                  >
                    <View style={styles.IDContainer}>
                      <Text style={styles.Text}>{names.ID}</Text>
                    </View>
                    <View style={styles.NameContainer}>
                      <Text style={styles.Text}>{names.Name}</Text>
                      {props.AppealList.map((ApppealList: any, key: number) => {
                        return (
                          <View key={key}>
                            {ApppealList.CreatedBy == names.Phone ? (
                              <View style={styles.AppealNotification}>
                                <Text style={styles.AppealNotificationText}>
                                  1
                                </Text>
                              </View>
                            ) : null}
                          </View>
                        );
                      })}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : (
            <Text style={styles.NoItemsText}>कुनै पनि सदस्यहरु फेला परेनन</Text>
          )}
        </>
      ) : (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <LoadingGreenSmall />
        </View>
      )}
    </>
  );
};

export default AllMembersList;

const styles = StyleSheet.create({
  DetailContainer: {
    backgroundColor: WRAPPER_COLOR,
    width: winWidth * 0.9,
    alignSelf: "center",
    height: 55,
    marginTop: 8,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  IDContainer: {
    width: 40,
    aspectRatio: 1,
    backgroundColor: DETAIL_COLOR,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
    borderRadius: 5,
  },
  Text: {
    fontSize: HEADINGTTHREEFONTSIZE,
    fontWeight: "800",
  },
  NameContainer: {
    marginLeft: 25,
    width: "65%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  NoItemsText: {
    marginTop: 10,
    fontFamily: "AnekDevanagari_800ExtraBold",
    fontSize: HEADINGTTHREEFONTSIZE,
  },
  AppealNotification: {
    height: 25,
    width: 25,
    backgroundColor: SECONDARY_COLOR,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    position: "relative",
  },
  AppealNotificationText: {
    fontWeight: "800",
    color: "white",
  },
});
