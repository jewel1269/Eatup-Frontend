import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { Link } from "expo-router";


const MenuItem = ({ item, addToCart }: any) => (
  <Link href={`/popular/${item._id}`}>
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description.slice(0, 15)}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <View style={styles.row}>
          <Text style={styles.rating}>Rating: {item.rating}</Text>
          <Text style={styles.orders}>Sold: {item.totalOrder}</Text>
        </View>
        <View style={styles.orderBtn}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Order</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => addToCart(item)} style={styles.addButton}>
            <AntDesign name="plus" size={16} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Link>
);


const Item = () => {
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

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.grid}>
      {data.map((item) => (
        <View key={item.title} style={styles.gridItem}>
          <MenuItem item={item} addToCart={addToCart}/>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  orderBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    flexBasis: "48%",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 10,
  },
  info: {
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    color: "#555",
  },
  price: {
    color: "#27ae60",
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 2,
  },
  rating: {
    color: "#f1c40f",
  },
  orders: {
    color: "#3498db",
    marginLeft: 3,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF6666",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    marginRight: 5,
  },
  addButton: {
    backgroundColor: "#FF6666",
    padding: 8,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -30,
    alignSelf: "flex-end",
  },
});

export default Item;
