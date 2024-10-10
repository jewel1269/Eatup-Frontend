import { AntDesign, Entypo, Feather, FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ToastAndroid,
} from "react-native";
import LottieView from "lottie-react-native";

const CartDetails = () => {
  const { id } = useLocalSearchParams<any>();
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [cart, setCart] = useState<any[]>([]);

  const addToCart = async (item: any) => {
    const cartItem = {
      id: item?._id,
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
      console.log(response);
      ToastAndroid.show(
        `${item.title} has been added to your cart!`,
        ToastAndroid.TOP
      );

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
        const response = await axios.get("http://10.0.2.2:5000/cart/meals");
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
        setError(true);
      }
    };

    fetchData();
  }, []);

  const product = data.find((item) => item._id === id);

  const handleBack = () => {
    router.replace("/meal");
  };

  // Show Lottie animation loader when data is being fetched
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <LottieView
          source={require("../../assets/loader/Loader2.json")}
          autoPlay
          loop
          style={styles.lottie}
        />
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Product not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <AntDesign name="swap" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.favoriteButton}>
          <Feather name="heart" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Image source={{ uri: product.image }} style={styles.productImage} />

      <View style={styles.infoSection}>
        <Text style={styles.popularText}>Popular</Text>
        <View style={styles.titleRow}>
          <Text style={styles.titleText}>{product.title}</Text>
          <View style={styles.location}>
            <Entypo name="location" size={24} color="black" />
            <Text>Location</Text>
          </View>
        </View>

        <View style={styles.ratingRow}>
          <View style={styles.rating}>
            <Feather name="star" size={24} color="red" />
            <Text style={styles.ratingText}>{product.rating} Rating</Text>
          </View>

          <View style={styles.orders}>
            <FontAwesome name="shopping-bag" size={24} color="red" />
            <Text style={styles.orderText}>{product.totalOrder}+ Order</Text>
          </View>
        </View>

        <Text style={styles.descriptionText}>{product.description}</Text>
        <Text style={styles.ingredients}>• {product.category}</Text>
      </View>

      <TouchableOpacity onPress={()=>addToCart(product)} style={styles.addToCartButton}>
        <Text style={styles.addToCartText}>
          Add To Cart - ${product.price.toFixed(2)}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    height: 20,
    width: 20,
    alignSelf: "center",
    alignItems: "center",
  },
  lottie: {
    width: 200,
    height: 200,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
  },
  favoriteButton: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 20,
  },
  productImage: {
    width: "100%",
    height: 300,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  infoSection: {
    padding: 16,
  },
  popularText: {
    color: "#FF6347",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 16,
  },
  orders: {
    flexDirection: "row",
    alignItems: "center",
  },
  orderText: {
    marginLeft: 4,
    fontSize: 16,
  },
  descriptionText: {
    fontSize: 14,
    color: "#777",
    marginBottom: 8,
  },
  ingredients: {
    fontSize: 14,
    color: "#000",
    marginBottom: 20,
  },
  addToCartButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 16,
    borderRadius: 30,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  addToCartText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
});

export default CartDetails;
