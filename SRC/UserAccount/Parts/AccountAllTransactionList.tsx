import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { GlobalStyle } from "../../global/GlobalConfig";
import TransactionListWithButton from "../../Components/TransactionListWithButton";
import LoanPaidDetailsPopup from "../../Components/LoanPaidDetailsPopup";

const AccountAllTransactionList = (props: any) => {
  const [LoanPaidPopupToggle, setLoanPaidPopupToggle] =
    React.useState<boolean>(false);
  const [LoanPaidData, setLoanPaidData] = React.useState();
  return (
    <>
      {props.AllTransactionList.length ? (
        <View style={GlobalStyle.WrapperContainer}>
          <LoanPaidDetailsPopup
            PopupToggle={LoanPaidPopupToggle}
            setPopupToggle={setLoanPaidPopupToggle}
            Data={LoanPaidData}
          />
          {props.AllTransactionList.map((names: any, key: number) => {
            return (
              <View key={key}>
                <TransactionListWithButton
                  names={names}
                  onLongPress={() => {}}
                  onPress={() => {
                    if (names.category === "Loan" && !names.IsPaid) {
                      props.GOTOLoanPaymentPage();
                    } else if (names.category === "Loan" && names.IsPaid) {
                      setLoanPaidPopupToggle(true);
                      setLoanPaidData(names);
                    }
                  }}
                />
              </View>
            );
          })}
        </View>
      ) : null}
    </>
  );
};

export default AccountAllTransactionList;

const styles = StyleSheet.create({});
