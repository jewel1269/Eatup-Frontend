import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { Entypo, FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import Search from "@/components/AllComponent/Search/Search";
import HeroSlider from "@/components/AllComponent/HeroSection/HeroSection";
import Category from "@/components/AllComponent/Category/Category";
import BurgerList from "@/components/AllComponent/BurgerList/BurgerList";
import PopularItem from "@/components/AllComponent/PopularItem/PopularItem";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import useAuth from "@/components/AllComponent/useAuth/useAuth";
import axios from "axios";

export default function HomeScreen() {
  const [userData, setUserData] = useState<any>();
  const { user } = useAuth();
  const email = user?.email;

  useEffect(() => {
    // Define an inner async function
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://10.0.2.2:5000/users/users?email=${email}`
        );

        if (response && response.data) {
          console.log("User data:", response.data);
          setUserData(response.data);
        } else {
          console.log("User not found");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    // Call the async function
    fetchUser();
  }, [email]);

  return (
    <View style={styles.container}>
      {/* Header section */}
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Image
            style={{
              height: 45,
              width: 100,
            }}
            source={require("../../assets/images/Logo/logo1.png-removebg-preview.png")}
          />
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
        <Link href={"/updateProfile"}>
        <Text style={styles.locationText}>
            {userData?.address ? userData.address : "Location not available"}
          </Text>
        </Link>
        </View>
        <Link
          style={{
            marginRight: 8,
          }}
          href={"/profile"}
        >
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require("../../assets/images/profile.webp")}
            />
          </View>
        </Link>
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
    marginLeft: -7,
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
    marginRight: 15,
  },
  locationText: {
    marginLeft: 10,
    marginTop:5,
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
    height: 255,
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
