import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
  Alert,
  ToastAndroid,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import axios from "axios";


const BurgerCard = ({ item, index, addToCart }: any) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      delay: index * 200, 
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Link href={`/menuDetails/${item._id}`}>
        <View style={styles.card}>
          <View style={styles.rating}>
            <AntDesign name="star" size={16} color="orange" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <View style={{ height: 85, width: "100%" }}>
            <Image source={{ uri: item.image }} style={styles.image} />
          </View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {item.description}
          </Text>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          <TouchableOpacity onPress={()=>addToCart(item)} style={styles.addButton}>
            <AntDesign name="plus" size={16} color="white" />
          </TouchableOpacity>
        </View>
      </Link>
    </Animated.View>
  );
};

// Main Menu Component
const MenuMeal = () => {
  const [data, setData] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);

  const addToCart = async (item: any) => {
    const cartItem = {
      id:item?._id,
      title: item.title,
      description: item.description,
      price: item.price,
      rating: item.rating,
      totalOrder: item.totalOrder,
      category: item.category,
      image: item.image,
    };

    try {
      const response = await axios.post(
        "http://10.0.2.2:5000/cart/add",
        cartItem
      );
      if (response.status === 200) {
        setCart((prevCart) => [...prevCart, item]);

        Alert.alert(
          `${item.title} has been added to your cart!`,
        );
      }
    } catch (error) {
      console.error("Error adding to cart:", error);

      ToastAndroid.show(
        `${item.title} failed to add item to cart`,
        ToastAndroid.SHORT
      );
    }
  };

  // Data Fetching from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://10.0.2.2:5000/menu/menumeal");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
    >
      {data.map((item, index) => (
        <BurgerCard key={item.id} item={item} index={index} addToCart={addToCart} />
      ))}
    </ScrollView>
  );
};

// Styles for the Menu and Burger Card components
const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  listContainer: {
    paddingHorizontal: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    width: 185,
    height: 250,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 7,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  ratingText: {
    marginLeft: 5,
    color: "black",
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },
  description: {
    fontSize: 12,
    color: "gray",
    marginTop: -10,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "red",
    padding: 8,
    marginTop: -34,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
  },
});

export default MenuMeal;
