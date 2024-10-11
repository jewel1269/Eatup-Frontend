import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import axios from "axios";
import useAuth from "@/components/AllComponent/useAuth/useAuth";

export default function Cart() {
  const [items, setItems] = useState<any[]>([]);
  const { user } = useAuth();
  const email = user?.email; 

  // Fetch cart items from backend
  useEffect(() => {
    const fetchData = async () => {
    

      try {
        const response = await axios.get(`http://10.0.2.2:5000/cart/meals?email=${email}`);
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        ToastAndroid.show("Error fetching cart items", ToastAndroid.SHORT);
      }
    };

    fetchData();
  }, [email]); // Add email as a dependency to re-fetch if it changes

  // Handle delete item
  const handleDelete = async (item: any) => {
    try {
      await axios.delete(`http://10.0.2.2:5000/cart/meals/${item._id}`);
      setItems(prevItems => prevItems.filter((i) => i._id !== item._id)); 
      ToastAndroid.show(`${item.title} deleted successfully`, ToastAndroid.SHORT);
    } catch (error) {
      console.error("Failed to delete item:", error);
      ToastAndroid.show(`${item.title} failed to delete`, ToastAndroid.SHORT);
    }
  };

  // Update quantity of items
  const updateQuantity = (id: string, type: "increment" | "decrement") => {
    setItems(prevItems => 
      prevItems.map(item => {
        if (item._id === id) {
          if (type === "increment") {
            return { ...item, quantity: item.quantity + 1 };
          } else if (type === "decrement") {
            if (item.quantity > 1) {
              return { ...item, quantity: item.quantity - 1 };
            } else {
              handleDelete(item);
            }
          }
        }
        return item;
      })
    );
  };

  // Calculate total
  const subTotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryCharge = subTotal > 50 ? 10 : 0;
  const discount = subTotal > 100 ? 10 : 0;
  const total = subTotal + deliveryCharge - discount;

  // Navigate back
  const handleBack = () => {
    router.back();
  };

  // Navigate to order page
  const handleOrder = () => {
    router.push("/order");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Cart Details</Text>
      </View>

      {/* Cart Items List */}
      <FlatList
        data={items}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Link href={`/cart/${item._id}`}>
                <View>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemSubtitle}>
                    {item.description.slice(0, 20)}...
                  </Text>
                </View>
              </Link>
              <Text style={styles.itemPrice}>Price: ${item.price}</Text>
            </View>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                onPress={() => updateQuantity(item._id, "decrement")}
              >
                <AntDesign name="minuscircle" size={24} color="red" />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <TouchableOpacity
                onPress={() => updateQuantity(item._id, "increment")}
              >
                <AntDesign name="pluscircle" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Order Summary */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Sub-Total</Text>
          <Text style={styles.summaryText}>${subTotal.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Delivery Charge</Text>
          <Text style={styles.summaryText}>${deliveryCharge.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Discount</Text>
          <Text style={styles.summaryText}>${discount.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalText}>${total.toFixed(2)}</Text>
        </View>
      </View>

      {/* Place Order Button */}
      <TouchableOpacity onPress={handleOrder} style={styles.orderButton}>
        <Text style={styles.orderButtonText}>Place CheckOut</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#007bff",
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: "#f9f9f9",
    padding: 10,
    marginVertical: 8,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemSubtitle: {
    fontSize: 14,
    color: "#888",
  },
  itemPrice: {
    fontSize: 16,
    color: "#e74c3c",
    marginTop: 5,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  summaryContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 16,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  orderButton: {
    backgroundColor: "#ff4d4d",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 20,
  },
  orderButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
