import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GlobalStyle } from '../../global/GlobalConfig'

const TotalLoan = (props:any) => {
  return (
   <>
   <View style={GlobalStyle.WrapperContainer}>
    <View style={GlobalStyle.DetailContainer}>
        <Text style={GlobalStyle.DetailText}>जम्मा लगेको ऋण </Text>
        <Text style={GlobalStyle.DetailText}>रु{" "}{props.TotalLoanAmount}</Text>
    </View>
   </View>
   </>
  )
}

export default TotalLoan
