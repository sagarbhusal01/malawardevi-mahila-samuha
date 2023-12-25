import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  HEADINGTWOFONTSIZE,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  WRAPPER_COLOR,
  winWidth,
} from "../../global/GlobalConfig";

const NewsStatusHandlerPopup = (props: any) => {
  return (
    <>
      <Modal
        visible={props.NewsStatusHandlerTogglePopupState}
        transparent={true}
      >
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "#00000039",
          }}
          activeOpacity={0.9}
          onPress={() => {
            props.setNewsStatusHandlerTogglePopupState(false);
          }}
        />
        <View style={styles.Wrapper}>
          <View style={styles.PopupContainer}>
            <Text style={styles.TopicHead}>
              के तपाईं यो समाचार डिलिट गर्न चाहानुहुन्छ ?
            </Text>
            {/* ============================ Buttons================= */}
            <View style={styles.ButtonsContainer}>
              <TouchableOpacity
                onPress={() => {
                  props.MakeNewsDeadlined(props.NewsHandlerStatusData);
                  props.setNewsStatusHandlerTogglePopupState(false);
                }}
                activeOpacity={0.8}
                style={[styles.Buttons, { backgroundColor: PRIMARY_COLOR }]}
              >
                <Text style={{ fontWeight: "800", color: "white" }}>
                  पुरानो वा नयाँ घोसित गर्नुहोस
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onLongPress={() => {
                  props.DeleteNews(props.NewsHandlerStatusData);
                  props.setNewsStatusHandlerTogglePopupState(false);
                }}
                activeOpacity={0.8}
                style={[styles.Buttons, { backgroundColor: SECONDARY_COLOR }]}
              >
                <Text style={{ fontWeight: "800", color: "white" }}>
                  हैन! डिलिट गर्नुहोस
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  props.setNewsStatusHandlerTogglePopupState(false);
                }}
                activeOpacity={0.8}
                style={[styles.Buttons, { backgroundColor: WRAPPER_COLOR }]}
              >
                <Text style={{ fontWeight: "800", color: SECONDARY_COLOR }}>
                  रद्ध गर्नुहोस
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default NewsStatusHandlerPopup;

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  PopupContainer: {
    minHeight: 100,
    paddingBottom: 30,
    width: winWidth * 0.9,
    backgroundColor: "white",
    borderRadius: 8,
  },
  TopicHead: {
    color: SECONDARY_COLOR,
    fontSize: HEADINGTWOFONTSIZE,
    fontFamily: "AnekDevanagari_800ExtraBold",
    alignSelf: "center",
    marginTop: 20,
  },
  ButtonsContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
    marginTop: 15,
  },
  Buttons: {
    height: 40,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
});
