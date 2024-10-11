import SpinningCircle from "@/components/AllComponent/SpinningCircle/SpinningCircle";
import useAuth from "@/components/AllComponent/useAuth/useAuth";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
  Easing,
} from "react-native";
import Icon from "react-native-vector-icons/Feather"; // Ensure Feather icons are installed

const CheckoutScreen = () => {
  const { id } = useLocalSearchParams();
  console.log(id);
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://10.0.2.2:5000/order/orderWithId/${id}`
        );

        if (response && response.data) {
          setOrder(response.data);
        } else {
          console.log("Order not found");
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  if (!order) {
    return <SpinningCircle />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Summary</Text>
      </View>

      {/* Progress Steps */}
      <View style={styles.stepsContainer}>
        <View style={styles.step}>
          <View style={styles.circleFilled}>
            <Icon name="check" size={16} color="#FFF" />
          </View>
          <Text style={styles.stepLabel}>Shipping</Text>
        </View>
        <View style={styles.stepSeparator} />
        <View style={styles.step}>
          <View style={styles.circleFilled}>
            <Icon name="check" size={16} color="#FFF" />
          </View>
          <Text style={styles.stepLabel}>Payment</Text>
        </View>
        <View style={styles.stepSeparator} />
        <View style={styles.step}>
          <View style={styles.circleFilled}>
            <Icon name="check" size={16} color="#FFF" />
          </View>
          <Text style={styles.stepLabel}>Processing</Text>
        </View>
      </View>

      <View>
        {/* Iterate through orderItems array and display each item */}

        {order.cart === true ? (
          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz4EwRe31j7RxW01OfOPkZ5PD3a8cDvff4Hw&s",
                }}
                style={{ width: 60, height: 60 }}
              />
              <Text style={{ fontWeight: "bold", marginLeft: 10 }}>
                Total Price: ${order.totalPrice}
              </Text>
            </View>

            <View
              style={{
                height: 100,
                borderWidth: 1,
                borderRadius: 20,
                padding: 10,
              }}
            >
              <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
                Item Name
              </Text>
              <ScrollView>
                {order.orderItems.map((item: any, index: number) => (
                  <Text key={index} style={{ fontWeight: "bold" }}>
                    {item?.title}- ${item.price * item.quantity}
                  </Text>
                ))}
              </ScrollView>
            </View>
          </View>
        ) : (
          order.orderItems.map((item: any, index: any) => (
            <View key={index} style={styles.orderItemContainer}>
              <View style={{ flexDirection: "row" }}>
                <View>
                  <Image
                    source={{ uri: item?.image }}
                    style={styles.imageStyle}
                  />
                </View>
                <View>
                  <Text style={styles.itemTitle}>{item?.title}</Text>
                  <Text style={styles.itemDescription}>
                    {item?.description}
                  </Text>
                  <Text style={styles.itemPrice}>Price: ${item?.price}</Text>
                  <Text style={styles.itemQuantity}>
                    Quantity: {item?.quantity}
                  </Text>
                </View>
              </View>
            </View>
          ))
        )}

        <Text style={styles.confirmText}>
          You will receive your delivery within 30 minutes.
        </Text>

        <Text style={styles.termsText}>
          Enjoy your delicious meal, delivered fresh to your door in just 30
          minutes! Thank You
        </Text>
      </View>

      {/* Payment Section */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Payment</Text>
          <TouchableOpacity
            onPress={() => {
              /* Edit Payment Method */
            }}
          >
            <MaterialIcons name="payment" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.sectionContent}>
          <Icon name="credit-card" size={24} color="#FF5733" />
          <Text style={styles.cardText}>
            {order.paymentMethod} ****{" "}
            {order.bkashNumber ? order.bkashNumber : order.paymentMethod} On
            Delivery
          </Text>
          <Text style={styles.cardExpiry}></Text>
        </View>
      </View>

      {/* Shipping Section */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Shipping address</Text>
          <TouchableOpacity
            onPress={() => {
              /* Edit Shipping Address */
            }}
          >
            <FontAwesome name="address-card" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.sectionContent}>
          <Text style={styles.shippingText}>{order.address}</Text>
        </View>
      </View>

      {/* Order Summary */}
      <View style={styles.orderSummaryContainer}>
        <Text style={styles.summaryTitle}>Order summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>
            ${order.totalPrice ? order.totalPrice : order.orderItems[0].price}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Delivery</Text>
          <Text style={styles.summaryValue}>$0</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.summaryValue}>
            ${order.totalPrice ? order.totalPrice : order.orderItems[0].price}
          </Text>
        </View>
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        onPress={() => router.replace("/(tabs)/home")}
        style={styles.submitButton}
      >
        <Text style={styles.submitButtonText}>Re Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#F9F9F9",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  cancelText: {
    fontSize: 16,
    color: "#888",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  orderItemContainer: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "center",
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 12,
  },
  itemDescription: {
    fontSize: 14,
    color: "#666",
    marginLeft: 12,
    paddingRight: 5,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 12,
  },
  itemQuantity: {
    fontSize: 14,
    color: "#666",
    marginLeft: 12,
  },
  confirmText: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 8,
  },
  termsText: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  stepsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 20,
  },
  step: {
    alignItems: "center",
  },
  circleFilled: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FF5733",
    justifyContent: "center",
    alignItems: "center",
  },
  stepLabel: {
    marginTop: 8,
    fontSize: 12,
    color: "#333",
  },
  stepSeparator: {
    width: 50,
    height: 2,
    backgroundColor: "#FF5733",
  },
  sectionContainer: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  sectionContent: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  cardText: {
    marginLeft: 12,
    fontSize: 16,
  },
  cardExpiry: {
    marginLeft: 12,
    fontSize: 14,
    color: "#888",
  },
  editText: {
    color: "#FF5733",
  },
  shippingText: {
    fontSize: 16,
    marginVertical: 4,
  },
  orderSummaryContainer: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#666",
  },
  summaryValue: {
    fontSize: 14,
    color: "#333",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  spinner: {
    width: 40,
    height: 40,
    borderWidth: 4,
    borderColor: "violet",
    borderStyle: "dashed",
    borderRadius: 32,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "#FF5733",
    padding: 10,
    width: "50%",
    alignSelf: "center",
    borderRadius: 8,
    marginVertical: 16,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CheckoutScreen;
