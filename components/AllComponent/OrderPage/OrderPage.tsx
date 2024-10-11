import axios from "axios";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  ToastAndroid,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import the icon library
import useAuth from "../useAuth/useAuth";

interface Item {
  _id: string;
  title: string;
  price: number;
  quantity: number;
}

const OrderPage = () => {
  const [address, setAddress] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("cash");
  const [bkashModalVisible, setBkashModalVisible] = useState<boolean>(false);
  const [bkashNumber, setBkashNumber] = useState<string>("");
  const [bkashPin, setBkashPin] = useState<string>("");
  const { user } = useAuth();
  const [items, setItems] = useState<Item[]>([]);

  // Fetch cart items from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://10.0.2.2:5000/cart/meals");
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        ToastAndroid.show("Failed to fetch cart items. Please try again.", ToastAndroid.TOP);
      }
    };

    fetchData();
  }, []);

  // Calculate subtotal
  const subTotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Handle order submission
  const handleOrder = async () => {
    if (!address || !contactNumber) {
      ToastAndroid.show("Please fill in all fields.", ToastAndroid.TOP);
      return;
    }

    if (paymentMethod === "bkash") {
      setBkashModalVisible(true);
    } else {
      const orderDetails = {
        address,
        contactNumber,
        paymentMethod: "cash",
        orderItems: items.map((item) => ({
          title: item.title,
          _id: item._id,
          quantity: item.quantity,
          price: item.price,
        })),
        subTotal,
        userEmail: user?.email,
        cart:true,
        status: "Pending",
      };

      try {
        await axios.post("http://10.0.2.2:5000/order", orderDetails);
        ToastAndroid.show("Order placed successfully!", ToastAndroid.TOP);
        router.push("/allOrder");
      } catch (error) {
        console.error("Error placing order:", error);
        ToastAndroid.show("Failed to place order. Please try again.", ToastAndroid.TOP);
      }
    }
  };

  // Handle Bkash payment logic
  const handleBkashPayment = async () => {
    if (!bkashNumber || !bkashPin) {
      ToastAndroid.show("Please fill in Bkash details.", ToastAndroid.TOP);
      return;
    }

    const orderDetails = {
      address,
      contactNumber,
      paymentMethod: "bkash",
      bkashNumber,
      bkashPin,
      orderItems: items.map((item) => ({
        title: item.title,
        _id: item._id,
        quantity: item.quantity,
        price: item.price,
      })),
      userEmail: user?.email,
      status: "Pending",
      cart:true,
       subTotal
    };

    try {
      await axios.post("http://10.0.2.2:5000/order", orderDetails);
      ToastAndroid.show("Bkash payment successful, order placed!", ToastAndroid.TOP);
      router.push("/allOrder");
    } catch (error) {
      console.error("Error placing order with Bkash:", error);
      ToastAndroid.show("Failed to place order with Bkash. Please try again.", ToastAndroid.TOP);
    } finally {
      setBkashNumber("");
      setBkashPin("");
      setBkashModalVisible(false);
    }
  };

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
      <FlatList
        data={items}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>{item.title} - ${item.price} x {item.quantity} = ${item.price * item.quantity}</Text>
          </View>
        )}
      />

      {/* Summary */}
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Total Items: {items.length}</Text>
        <Text style={styles.summaryText}>Subtotal: ${subTotal}</Text>
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

      {/* Order Button */}
      <TouchableOpacity style={styles.orderButton} onPress={handleOrder}>
        <Text style={styles.orderButtonText}>Place Order</Text>
      </TouchableOpacity>

      {/* Bkash Payment Modal */}
      <Modal transparent={true} visible={bkashModalVisible} animationType="slide">
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
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  paymentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  paymentOption: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  selectedPayment: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#e74c3c",
    backgroundColor: "#ffe5e5",
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  orderButton: {
    backgroundColor: "#ff4d4d",
    paddingVertical: 10,
    width: "45%",
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 15,
    alignItems: "center",
  },
  orderButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  summaryContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  summaryText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  confirmButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#dc3545",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default OrderPage;
