import React, { useEffect, useRef } from "react";
import { View, Animated, Easing, StyleSheet, Dimensions, Text } from "react-native";

const SpinningCircle = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [rotateAnim]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.circle,
          { transform: [{ rotate: rotation }] },
        ]}
      />
      <Text>Loading.....</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: Dimensions.get('window').width * 0.1,
    height: Dimensions.get('window').width * 0.1,
    borderWidth: 4,
    borderColor: "violet",
    borderRadius: Dimensions.get('window').width * 0.1, 
    borderStyle: "dashed",
  },
});

export default SpinningCircle;
