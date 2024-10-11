import SpinningCircle from "@/components/AllComponent/SpinningCircle/SpinningCircle";
import useAuth from "@/components/AllComponent/useAuth/useAuth";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  ToastAndroid,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const { width, height } = Dimensions.get("window");

const OrderTwo = () => {
  const { id } = useLocalSearchParams(); 
  const [address, setAddress] = useState("");
  const [order, setOrder] = useState<any>([]); 
  const [contactNumber, setContactNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash"); 
  const [bkashModalVisible, setBkashModalVisible] = useState(false);
  const [bkashNumber, setBkashNumber] = useState("");
  const [bkashPin, setBkashPin] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {user} = useAuth()

  // Fetch data from backend API based on the product ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://10.0.2.2:5000/menu/popular/${id}`
        );
        setOrder(response.data || []); 
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  // Handle order submission logic for both cash and Bkash payment
  const handleOrder = async () => {
    if (paymentMethod === "bkash") {
      setBkashModalVisible(true);
    } else {
      const orderDetails = {
        address,
        contactNumber,
        paymentMethod: "cash",
        orderItems:order,
        userEmail: user?.email,
        status:"Pending"
      };

      try {
        const response = await axios.post(
          "http://10.0.2.2:5000/order",
          orderDetails
        );
        console.log("Order submitted:", response.data);
        ToastAndroid.show("Order placed successfully!", ToastAndroid.TOP);
        router.push("/allOrder")
      } catch (error) {
        console.error("Error placing order:", error);
        alert("Failed to place order. Please try again.");
      }
    }
  };

  // Handle Bkash payment logic
  const handleBkashPayment = async () => {
    const orderDetails = {
      address,
      contactNumber,
      paymentMethod: "bkash",
      bkashNumber,
      bkashPin,
      orderItems:order,
      userEmail: user?.email,
     status:"Pendnig"
    };

    try {
      const response = await axios.post(
        "http://10.0.2.2:5000/order",
        orderDetails
      );
      console.log("Order submitted (Bkash):", response.data);
      ToastAndroid.show("Bkash payment successful, order placed!", ToastAndroid.TOP);
      router.push("/allOrder")
    } catch (error) {
      console.error("Error placing order with Bkash:", error);
      ToastAndroid.show("Failed to place order with Bkash. Please try again.", ToastAndroid.TOP);
      
    } finally {
      setBkashNumber("");
      setBkashPin("");
      setBkashModalVisible(false);
    }
  };

  if (loading) {
    return <SpinningCircle/>
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.header}>Order Details</Text>
      </View>

      {/* Address Input */}
      <TextInput
        style={styles.input}
        placeholder="Delivery Address"
        value={address}
        onChangeText={setAddress}
      />

      {/* Contact Number Input */}
      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        value={contactNumber}
        onChangeText={setContactNumber}
        keyboardType="phone-pad"
      />

      {/* Ordered Items List */}
      <Text style={styles.sectionHeader}>Items Ordered</Text>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>
          {order.title} x ${order.price}
        </Text>
      </View>

      {/* Payment Options */}
      <Text style={styles.sectionHeader}>Payment Method</Text>
      <View style={styles.paymentContainer}>
        <TouchableOpacity
          style={
            paymentMethod === "bkash"
              ? styles.selectedPayment
              : styles.paymentOption
          }
          onPress={() => setPaymentMethod("bkash")}
        >
          <Text>Bkash</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            paymentMethod === "cash"
              ? styles.selectedPayment
              : styles.paymentOption
          }
          onPress={() => setPaymentMethod("cash")}
        >
          <Text>Cash on Delivery</Text>
        </TouchableOpacity>
      </View>

      {/* Summary */}
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Subtotal: ${order.price}</Text>
      </View>

      {/* Order Button */}
      <TouchableOpacity style={styles.orderButton} onPress={handleOrder}>
        <Text style={styles.orderButtonText}>Place Order</Text>
      </TouchableOpacity>

      {/* Bkash Payment Modal */}
      <Modal
        transparent={true}
        visible={bkashModalVisible}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Bkash Payment</Text>
            <TextInput
              style={styles.input}
              placeholder="Bkash Number"
              value={bkashNumber}
              onChangeText={setBkashNumber}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="PIN"
              value={bkashPin}
              onChangeText={setBkashPin}
              secureTextEntry
            />
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleBkashPayment}
            >
              <Text style={styles.confirmButtonText}>Confirm Payment</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setBkashModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: height * 0.02,
  },
  header: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    marginLeft: width * 0.02,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: width * 0.03,
    marginBottom: height * 0.015,
    fontSize: width * 0.04,
  },
  sectionHeader: {
    fontSize: width * 0.045,
    fontWeight: "bold",
    marginTop: height * 0.02,
    marginBottom: height * 0.01,
  },
  itemContainer: {
    padding: width * 0.03,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  itemText: {
    fontSize: width * 0.04,
  },
  paymentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: height * 0.02,
  },
  paymentOption: {
    padding: width * 0.03,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    flex: 1,
    marginHorizontal: width * 0.01,
    alignItems: "center",
  },
  selectedPayment: {
    padding: width * 0.03,
    borderWidth: 1,
    borderColor: "#e74c3c",
    backgroundColor: "#ffe5e5",
    borderRadius: 8,
    flex: 1,
    marginHorizontal: width * 0.01,
    alignItems: "center",
  },
  orderButton: {
    backgroundColor: "#ff4d4d",
    paddingVertical: height * 0.015,
    width: "45%",
    alignSelf: "center",
    borderRadius: 10,
    marginTop: height * 0.05,
  },
  orderButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: width * 0.045,
  },
  summaryContainer: {
    marginTop: height * 0.03,
  },
  summaryText: {
    fontSize: width * 0.045,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: width * 0.9,
    padding: width * 0.05,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  modalHeader: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    marginBottom: height * 0.02,
  },
  confirmButton: {
    backgroundColor: "#28a745",
    padding: height * 0.015,
    borderRadius: 8,
    alignItems: "center",
    marginTop: height * 0.015,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: width * 0.04,
  },
  cancelButton: {
    backgroundColor: "#ccc",
    padding: height * 0.015,
    borderRadius: 8,
    alignItems: "center",
    marginTop: height * 0.015,
  },
  cancelButtonText: {
    color: "#333",
    fontSize: width * 0.04,
  },
});

export default OrderTwo;
