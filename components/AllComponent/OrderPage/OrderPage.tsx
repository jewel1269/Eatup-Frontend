import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Modal,
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the icon library

const OrderPage = () => {
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [items] = useState([
    { id: "1", name: "Burger", price: 5, quantity: 2 },
    { id: "2", name: "Pizza", price: 8, quantity: 1 },
  ]);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [bkashModalVisible, setBkashModalVisible] = useState(false);
  const [bkashNumber, setBkashNumber] = useState("");
  const [bkashPin, setBkashPin] = useState("");

  // Calculate total
  const subTotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleOrder = () => {
    if (paymentMethod === "bkash") {
      setBkashModalVisible(true);
    } else {
      // Handle order submission logic for cash payment
      console.log("Order submitted (Cash):", {
        address,
        contactNumber,
        paymentMethod,
      });
    }
  };

  const handleBkashPayment = () => {
    console.log("Order submitted (Bkash):", {
      address,
      contactNumber,
      bkashNumber,
      bkashPin,
    });
    // Reset fields and close modal
    setBkashNumber("");
    setBkashPin("");
    setBkashModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
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
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>
              {item.name} x {item.quantity} - ${item.price * item.quantity}
            </Text>
          </View>
        )}
      />

      {/* Payment Options */}
      <Text style={styles.sectionHeader}>Payment Method</Text>
      <View style={styles.paymentContainer}>
        <TouchableOpacity
          style={paymentMethod === "bkash" ? styles.selectedPayment : styles.paymentOption}
          onPress={() => setPaymentMethod("bkash")}
        >
          <Text>Bkash</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={paymentMethod === "cash" ? styles.selectedPayment : styles.paymentOption}
          onPress={() => setPaymentMethod("cash")}
        >
          <Text>Cash on Delivery</Text>
        </TouchableOpacity>
      </View>

      {/* Summary */}
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Subtotal: ${subTotal}</Text>
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
    </ScrollView>
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
  itemText: {
    fontSize: 16,
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
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: "#ff4d4d",
    paddingVertical: 10,
    borderRadius: 8,
    marginVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  cancelButton: {
    paddingVertical: 10,
    borderRadius: 8,
    marginVertical: 10,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#ccc",
  },
  cancelButtonText: {
    color: "black",
    fontSize: 18,
  },
});

export default OrderPage;
