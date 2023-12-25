import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SECONDARY_COLOR } from "../global/GlobalConfig";

// screens
// ========================================================
import NonAdminCalculator from "./SRC/Calculator/NonAdminCalculator.Main";
import NonAdminHome from "./SRC/NonAdminHome/NonAdminHome.Main";
import NonAdminLogin from "./SRC/NonAdminLogin/NonAdminLogin";

// ========================================================

//
//
//
//
//
//
export default function NonAdminWorld() {
  const Stacks = createNativeStackNavigator();

  return (
    <>
      <NavigationContainer independent={true}>
        <Stacks.Navigator initialRouteName="NonAdminLogin">
          <Stacks.Screen
            name="NonAdminLogin"
            component={NonAdminLogin}
            options={{ headerShown: false }}
          />
          <Stacks.Screen
            name="NonAdminHome"
            component={NonAdminHome}
            options={{ headerShown: false }}
          />
          <Stacks.Screen
            name="NonAdminCalculator"
            component={NonAdminCalculator}
            options={{
              title: `क्याल्कुलेटर`,
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontWeight: "800",
              },
              animation: "slide_from_right",
            }}
          />
        </Stacks.Navigator>
      </NavigationContainer>
    </>
  );
}
