import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import axios from "axios";

export default function Cart() {
  // Example data (you can replace this with your actual data)
  const [items, setItems] = useState<any>([]);

  //fetchData
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://10.0.2.2:5000/cart/meals"
        );
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(items);

  // Update quantity of items
  const updateQuantity = (id: any, type: any) => {
    const updatedItems = items.map((item: any) => {
      if (item._id === id) {
        if (type === "increment") {
          return { ...item, quantity: item.quantity + 1 };
        } else if (type === "decrement" && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
      }
      return item;
    });
    setItems(updatedItems);
  };

  // Calculate total
  const subTotal = items.reduce(
    (total: any, item: any) => total + item.price * item.quantity,
    0
  );
  const deliveryCharge = 10;
  const discount = subTotal > 100 ? 10 : 0;
  const total = subTotal + deliveryCharge - discount;

  // back to pevious page
  const handleBack = () => {
    router.back();
  };

  //hhandleOrder
  const handleOrder =()=>{
    router.push("/order")
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Cart details</Text>
      </View>

      {/* Order Items List */}
      <FlatList
        data={items}
        keyExtractor={(item) => item._id} 
        renderItem={({ item }) => (
          <ScrollView>
            <View style={styles.itemContainer}>
              <Image source={{ uri: item?.image }} style={styles.itemImage} />
              <View style={styles.itemDetails}>
               <Link href={`/cart/${item?._id}`}>
               <Text style={styles.itemTitle}>{item.title}</Text>
               <Text style={styles.itemSubtitle}>{item.description.slice(0, 20)}****</Text>
               </Link>
                <Text style={styles.itemPrice}>${item.price}</Text>
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
          </ScrollView>
        )}
      />

      {/* Order Summary */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Sub-Total</Text>
          <Text style={styles.summaryText}>${subTotal}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Delivery Charge</Text>
          <Text style={styles.summaryText}>${deliveryCharge}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Discount</Text>
          <Text style={styles.summaryText}>${discount}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalText}>${total}</Text>
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
    shadowOpacity: 3,
    shadowRadius: 10,
    shadowColor: "red",
    borderRadius: 10,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  summaryText: {
    color: "black",
    fontSize: 16,
  },
  totalText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  orderButton: {
    backgroundColor: "#ff4d4d",
    paddingVertical: 8,
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
