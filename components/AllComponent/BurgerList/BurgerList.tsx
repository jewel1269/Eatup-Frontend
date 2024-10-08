import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import axios from "axios";

const BurgerCard = ({ item, addToCart }: any) => {
  return (
    <View style={styles.container}>
      <Link href={`/details/${item?._id}`}>
        <View style={styles.card}>
          <View style={styles.rating}>
            <AntDesign name="star" size={16} color="orange" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          {/* Add to Cart button */}
          <TouchableOpacity
            onPress={() => addToCart(item)}
            style={styles.addButton}
          >
            <AntDesign name="plus" size={16} color="white" />
          </TouchableOpacity>
        </View>
      </Link>
    </View>
  );
};

const BurgerList = () => {
  const [data, setData] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);

  // Data Fetching from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://10.0.2.2:5000/menu/burgerList"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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

        ToastAndroid.show(
          `${item.title} has been added to your cart!`,
          ToastAndroid.SHORT
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
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
    >
      {data.map((item) => (
        <BurgerCard key={item._id} item={item} addToCart={addToCart} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
  },
  listContainer: {
    paddingHorizontal: 20,
    flexDirection: "row",
    gap: 5,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginRight: 15,
    width: 200,
    height: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 10,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  ratingText: {
    marginLeft: 5,
    color: "black",
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 90,
    resizeMode: "contain",
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  description: {
    fontSize: 12,
    color: "gray",
    marginVertical: 5,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
  },
  addButton: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -30,
    alignSelf: "flex-end",
  },
});

export default BurgerList;
