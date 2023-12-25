import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  HEADINGTTHREEFONTSIZE,
  HEADINGTWOFONTSIZE,
  SECONDARY_COLOR,
  TERTIARY_COLOR,
  winWidth,
} from "./GlobalConfig";

const CatchError = (props: any) => {
  const [ShowErrorCode, setShowErrorCode] = React.useState<boolean>(false);

  const [PopupShown, setPopupShown] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (props.CatchMessage?.message) {
      setPopupShown(true);
    }
  }, [props.CatchMessage?.message]);

  return (
    <>
      <Modal transparent={true} visible={PopupShown}>
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: "#00000039",
          }}
        />
        <View style={styles.PopupContainer}>
          <View style={styles.Popup}>
            <Text style={styles.Header}>समस्या देखियो</Text>
            <View style={styles.Line} />
            <Text style={styles.message}>{props.CatchMessage?.message}</Text>

            {ShowErrorCode ? (
              <View>
                <Text style={{ marginTop: 15 }}>
                  {props.CatchMessage?.ErrorCode}
                </Text>

                <TouchableOpacity
                  style={[styles.ShowMoreButton, { marginTop: 0 }]}
                  onPress={() => {
                    setShowErrorCode(!ShowErrorCode);
                  }}
                >
                  <Text style={{ color: "blue" }}>show less</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.ShowMoreButton}
                onPress={() => {
                  setShowErrorCode(!ShowErrorCode);
                }}
              >
                <Text style={{ color: "blue" }}>show more</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.Button}
              activeOpacity={0.5}
              onPress={() => {
                setPopupShown(false);
              }}
            >
              <Text style={styles.ButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default CatchError;

const styles = StyleSheet.create({
  PopupContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  Popup: {
    width: winWidth * 0.9,
    padding: 15,
    backgroundColor: "white",
    borderRadius: 8,
  },
  Header: {
    color: SECONDARY_COLOR,
    fontSize: HEADINGTWOFONTSIZE,
    alignSelf: "center",
  },
  Line: {
    height: 1,
    backgroundColor: "lightgrey",
    marginTop: 5,
  },
  message: {
    marginTop: 15,
  },
  Button: {
    alignSelf: "flex-end",
    width: 70,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  ButtonText: {
    color: SECONDARY_COLOR,
    fontSize: HEADINGTTHREEFONTSIZE,
    fontWeight: "800",
  },
  ShowMoreButton: {
    marginTop: 15,
  },
});

// usuage

// const [CatchMessage, setCatchMessage] = React.useState<CatchMessagetype>();
// setCatchMessage({
//   message: "हजुर को नाम र विवरण पत्ता लगाउँअ सकिएन",
//   ErrorCode: e.message,
// });
// <CatchError CatchMessage={CatchMessage} />
