import { View, Text, ActivityIndicator, StyleSheet, Image, ScrollView } from "react-native";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import Search from "@/components/AllComponent/Search/Search";
import HeroSlider from "@/components/AllComponent/HeroSection/HeroSection";
import Category from "@/components/AllComponent/Category/Category";
import BurgerList from "@/components/AllComponent/BurgerList/BurgerList";
import PopularItem from "@/components/AllComponent/PopularItem/PopularItem";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Header section */}
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <FontAwesome5 name="bars" size={24} color="black" />
        </View>
        <View style={styles.location}>
          <Entypo
            style={{
              color: "red",
            }}
            name="location-pin"
            size={24}
            color="black"
          />
          <Text style={styles.locationText}>Uttara-10, Dhaka, Bd</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../../assets/images/profile.webp")}
          />
        </View>
      </View>

      {/* Scrollable content */}
      <ScrollView>
        <View style={styles.contentPlaceholder}>
          <Search />
        </View>
        <View style={styles.contentPlaceholderTow}>
          <HeroSlider />
        </View>
        <View style={styles.contentPlaceholder}>
          <Category />
        </View>
        <View style={styles.contentPlaceholderBurger}>
          <BurgerList />
        </View>
        <View style={styles.popularItem}>
          <PopularItem />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    justifyContent: "space-between",
  },
  iconContainer: {
    marginRight: 10,
  },
  imageContainer: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "red",
    overflow: "hidden",
  },
  image: {
    height: 35,
    width: 35,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  locationText: {
    marginLeft: 5,
    color: "black",
  },
  contentPlaceholder: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  contentPlaceholderTow: {
    height: 160,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  contentPlaceholderBurger: {
    height: 245,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  popularItem: {
    paddingHorizontal: 20,
    marginTop: 14,
    height: "auto",
  },
});
