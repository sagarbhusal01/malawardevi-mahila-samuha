import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Loan from "./Parts/Loan";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModalProvider,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import {
  WRAPPER_COLOR,
  PRIMARY_COLOR,
  GlobalStyle,
} from "../global/GlobalConfig";
import { db } from "../../FirebaseConfig";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import Deposit from "./Parts/Deposit";

const AddTransactions = (props: any) => {
  // ========================================================
  const [Uploading, setUploading] = React.useState<boolean>();
  const [TotalDeposit, setTotalDeposit] = React.useState<number>(0);
  const [TotalLoan, setTotalLoan] = React.useState<number>(0);
  // ========================================================

  // =================================== Bottom sheet =====================
  // ======================================================================
  // ======================================================================

  const [BottomSheetChildren, setBottomSheetChildren] =
    React.useState<React.FC>();

  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const [BottomSheetSnapPoints, setBottomSheetSnapPoints] =
    React.useState<string[]>();

  const bottomSheetModalRef = React.useRef<any>(null);

  function ToggleBottomSheet(toggle: boolean) {
    if (toggle) {
      bottomSheetModalRef.current?.present();
      setTimeout(() => {
        setIsOpen(true);
      }, 100);
    } else {
      bottomSheetModalRef.current?.close();
    }
  }
  // ======================================================================
  // ======================================================================
  // ======================================================================

  // =================== Getting Total Deposits and Loan from the firebase ==============
  const GetTotalDepositsAndLoan = async () => {
    const q = query(
      collection(db, "Account", `${props.route.params.Phone}`, "TOTAL")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setUploading(true);

      if (querySnapshot.empty) {
        setUploading(false);
        setTotalLoan(0);
        setTotalDeposit(0);
      }

      querySnapshot.forEach((doc) => {
        if (doc.id === "Deposit") {
          setTotalDeposit(doc.data().Amount);
        } else if (doc.id === "Loan") {
          setTotalLoan(doc.data().Amount);
        }
      });
      setUploading(false);
    });
  };
  // ======================================================================
  // ======================================================================
  React.useEffect(() => {
    GetTotalDepositsAndLoan();
  }, []);
  // ======================================================================

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <GestureHandlerRootView>
        <ScrollView overScrollMode="never" showsVerticalScrollIndicator={false}>
          <Deposit
            Phone={props.route.params.Phone}
            TotalDeposit={TotalDeposit}
            setUploading={setUploading}
            Uploading={Uploading}
            setBottomSheetSnapPoints={setBottomSheetSnapPoints}
            bottomSheetModalRef={bottomSheetModalRef}
            ToggleBottomSheet={ToggleBottomSheet}
            setBottomSheetChildren={setBottomSheetChildren}
          />
          <Loan
            TotalLoan={TotalLoan}
            Phone={props.route.params.Phone}
            setUploading={setUploading}
            Uploading={Uploading}
            setBottomSheetSnapPoints={setBottomSheetSnapPoints}
            bottomSheetModalRef={bottomSheetModalRef}
            ToggleBottomSheet={ToggleBottomSheet}
            setBottomSheetChildren={setBottomSheetChildren}
          />
          <View style={{ marginBottom: 40 }} />
        </ScrollView>
        {/* ===================================== Overlay ======================== */}

        <TouchableOpacity
          activeOpacity={0.39}
          onPress={() => ToggleBottomSheet(false)}
          style={[GlobalStyle.Overlay, { display: isOpen ? "flex" : "none" }]}
        />
        {/* ========================================================= */}
        <BottomSheetModalProvider>
          <View>
            <BottomSheetModal
              ref={bottomSheetModalRef}
              snapPoints={BottomSheetSnapPoints}
              backgroundStyle={{ borderRadius: 50 }}
              onDismiss={() => setIsOpen(false)}
              handleStyle={{
                backgroundColor: WRAPPER_COLOR,
                marginBottom: 0,
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
              }}
              handleIndicatorStyle={{
                backgroundColor: PRIMARY_COLOR,
                height: 5,
                width: 45,
              }}
            >
              <>{BottomSheetChildren}</>
            </BottomSheetModal>
          </View>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </View>
  );
};

export default AddTransactions;

const styles = StyleSheet.create({});
