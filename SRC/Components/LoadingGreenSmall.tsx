import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  cancelAnimation,
  Easing,
} from "react-native-reanimated";

export default function LoadingGreenSmall() {
  const rotation = useSharedValue(0);

  const config = {
    duration: 5,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: `${rotation.value}deg`,
        },
      ],
    };
  }, [rotation.value]);

  React.useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1
    );
    return () => cancelAnimation(rotation);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../../assets/images/loading.png")}
        style={[{ width: 30, height: 30 }, animatedStyles]}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
