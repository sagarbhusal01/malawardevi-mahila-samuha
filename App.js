import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  useFonts,
  AnekDevanagari_500Medium,
  AnekDevanagari_400Regular,
  AnekDevanagari_600SemiBold,
  AnekDevanagari_700Bold,
  AnekDevanagari_800ExtraBold,
} from "@expo-google-fonts/anek-devanagari";
import { LogBox } from "react-native";

// screens
// ========================================================
import AffairHandler from "./SRC/Components/AffairHandler";
import Login from "./SRC/Login/Login.Main";
import BlankCanvas from "./SRC/Canvas/BlankCanvas";
import UserAccount from "./SRC/UserAccount/UserAccount.Main";
import AddTransactions from "./SRC/AddTransactions/AddTransactions.Main";
import LoanPayment from "./SRC/LoanPayment/LoanPayment.Main";
import AllNews from "./SRC/AllNews/AllNews.Main";
import AddMenber from "./SRC/AddMember/AddMember.Main";
import AddMember from "./SRC/AddMember/AddMember.Main";
import DeleteMember from "./SRC/DeleteMember/DeleteMember.Main";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "./SRC/global/GlobalConfig";
import LoanSummary from "./SRC/LoanSummary/LoanSummary.Main";
import DepositSummary from "./SRC/DepositSummary/DepositSummary.Main";
import NonAdminWorld from "./SRC/NonAdminWorld/NonAdminWorld.Main";

// ========================================================

//
//
//
const Stacks = createNativeStackNavigator();
//
//
//
export default function App() {
  LogBox.ignoreAllLogs();

  let [fontsLoaded, fontError] = useFonts({
    AnekDevanagari_500Medium,
    AnekDevanagari_400Regular,
    AnekDevanagari_600SemiBold,
    AnekDevanagari_700Bold,
    AnekDevanagari_800ExtraBold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      <NavigationContainer>
        <Stacks.Navigator initialRouteName="AffairHandler">
          <Stacks.Screen
            name="AffairHandler"
            component={AffairHandler}
            options={{ headerShown: false }}
          />
          <Stacks.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stacks.Screen
            name="Canvas"

            component={BlankCanvas}
            options={{ headerShown: false, }}
          />
          <Stacks.Screen
            name="NonAdminWorld"
            component={NonAdminWorld}
            options={{ headerShown: false, animation: "slide_from_right" }}
          />
          <Stacks.Screen
            name="userAccount"
            component={UserAccount}
            options={({ route }) => ({
              title: route.params?.Name,
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontWeight: "800",
              },
              animation: "slide_from_right",
            })}
          />
          <Stacks.Screen
            name="AddTransactions"
            component={AddTransactions}
            options={({ route }) => ({
              title: `${route.params?.Name}`,
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontWeight: "800",
              },
              animation: "slide_from_right",
            })}
          />
          <Stacks.Screen
            name="LoanPayment"
            component={LoanPayment}
            options={({ route }) => ({
              title: `${route.params?.Name} को ऋण विवरण `,
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontWeight: "800",
              },
              animation: "slide_from_right",
            })}
          />
          <Stacks.Screen
            name="AllNews"
            component={AllNews}
            options={{
              title: `समाचारहरु`,
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontWeight: "800",
              },
              animation: "slide_from_right",
            }}
          />
          <Stacks.Screen
            name="AddNewMember"
            component={AddMember}
            options={{
              title: `नयाँ सदस्य थप`,
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontWeight: "800",
                color: PRIMARY_COLOR,
              },
              animation: "slide_from_right",
            }}
          />
          <Stacks.Screen
            name="DeleteMember"
            component={DeleteMember}
            options={{
              title: `सदस्य प्रतिबन्धित`,
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontWeight: "800",
                color: SECONDARY_COLOR,
              },
              animation: "slide_from_right",
            }}
          />
          <Stacks.Screen
            name="DepositSummary"
            component={DepositSummary}
            options={{
              title: `लेवी`,
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontWeight: "800",
                color: PRIMARY_COLOR,
              },
              animation: "slide_from_right",
            }}
          />
          <Stacks.Screen
            name="LoanSummary"
            component={LoanSummary}
            options={{
              title: `ऋण`,
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontWeight: "800",
                color: SECONDARY_COLOR,
              },
              animation: "slide_from_right",
            }}
          />
        </Stacks.Navigator>
      </NavigationContainer>
    </>
  );
}
