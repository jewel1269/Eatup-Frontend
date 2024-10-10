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

type MealItem = {
  _id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  totalOrder: number;
  category: string;
  image: string;
};

type BurgerCardProps = {
  item: MealItem;
  addToCart: (item: MealItem) => void;
};

const BurgerCard = ({ item, addToCart }: BurgerCardProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      delay: 200 * Math.random(), 
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Link href={`/menuDetails/${item._id}`} asChild>
        <TouchableOpacity activeOpacity={0.8}>
          <View style={styles.card}>
            <View style={styles.rating}>
              <AntDesign name="star" size={16} color="#FFC107" />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description} numberOfLines={2}>
              {item.description}
            </Text>
            <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            <TouchableOpacity onPress={() => addToCart(item)} style={styles.addButton}>
              <AntDesign name="plus" size={16} color="white" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Link>
    </Animated.View>
  );
};

type MenuMealProps = {
  searchQuery: string;
};

const MenuMeal = ({ searchQuery }: MenuMealProps) => {
  const [data, setData] = useState<MealItem[]>([]);
  const [cart, setCart] = useState<MealItem[]>([]);

  const addToCart = async (item: MealItem) => {
    const cartItem = {
      id: item._id,
      title: item.title,
      description: item.description,
      price: item.price,
      rating: item.rating,
      totalOrder: item.totalOrder,
      category: item.category,
      image: item.image,
    };

    try {
      const response = await axios.post("http://10.0.2.2:5000/cart/add", cartItem);
      console.log(response);
      ToastAndroid.show(
        `${item.title} has been added to your cart!`,
        ToastAndroid.TOP
      );
    } catch (error) {
      console.error("Error adding to cart:", error);
      ToastAndroid.show(`${item.title} failed to add item to cart`, ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://10.0.2.2:5000/menu/menumeal");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching meal data:", error);
      }
    };
    fetchData();
  }, []);

  const filteredData = data.filter((meal) =>
    meal.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView contentContainerStyle={styles.cardsContainer}>
      {filteredData.map((item) => (
        <BurgerCard key={item._id} item={item} addToCart={addToCart} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardsContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  container: {
    width: "48%",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#333",
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    marginTop: -34,
  },
});

export default MenuMeal;
