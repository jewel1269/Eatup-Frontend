import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import Swiper from "react-native-swiper";
import { hp, wp } from "../ScreenWrapper/ScreenWrapper";

const HeroSlider = () => {
  return (
    <View style={styles.container}>
      <Swiper
        autoplay={true}
        loop={true}
        showsPagination={true}
        autoplayTimeout={3}
        style={styles.wrapper}
      >
        <View style={styles.slide}>
          <Image
            source={require("../../../assets/images/slider/burger.png")}
            style={styles.image}
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={require("../../../assets/images/slider/default-pasta.jpg")}
            style={styles.image}
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={require("../../../assets/images/slider/vegitable.png")}
            style={styles.image}
          />
        </View>
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 17,
    marginTop: -20,
  },
  wrapper: {
    height: 200,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 200,
  },
  text: {
    color: "red",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 20,
  },
});

export default HeroSlider;
