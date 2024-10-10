import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Feather"; // Ensure this is installed
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get("window");

const OrderScreen = () => {
  const navigation = useNavigation(); // Use navigation hook
  const [activeTab, setActiveTab] = useState("all");

  const tabs = ["all", "pending", "complete"];

  const orders = [
    { id: "1", title: "Angga Big Park", status: "pending", time: "10 hours", price: "$49,509", date: "12 January 2024" },
    { id: "2", title: "Angga Big Park", status: "pending", time: "10 hours", price: "$49,509", date: "12 January 2024" },
    { id: "3", title: "Angga Big Park", status: "complete", time: "10 hours", price: "$49,509", date: "12 January 2024" },
    { id: "4", title: "Angga Big Park", status: "complete", time: "10 hours", price: "$49,509", date: "12 January 2024" },
    { id: "5", title: "Angga Big Park", status: "failed", time: "10 hours", price: "$49,509", date: "12 January 2024" },
  ];

  const renderOrderItem = ({ item }:any) => {
    const statusColors:any = {
      pending: "#FFA500",  // Orange for pending
      complete: "#00C853", // Green for complete
      failed: "#FF5252",   // Red for failed
    };

    return (
      <View style={styles.orderItem}>
        <Image
          source={{ uri: "https://via.placeholder.com/100x100" }}
          style={styles.orderImage}
        />
        <View style={styles.orderDetails}>
          <Text style={styles.orderTitle}>{item.title}</Text>
          <View style={styles.orderInfo}>
            <Text style={styles.orderTime}>{item.time}</Text>
            <Text style={styles.orderPrice}>{item.price}</Text>
          </View>
          <Text style={styles.orderDate}>{item.date}</Text>
        </View>
        <View style={styles.statusContainer}>
          <View style={styles.verticalLine} />
          <View style={[styles.orderStatus, { backgroundColor: statusColors[item.status] }]}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>My Orders</Text>
        <Icon name="search" size={24} color="#FFF" />
      </View>

      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={activeTab === tab ? styles.activeTabText : styles.tabText}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={orders.filter(order => activeTab === "all" || order.status === activeTab)}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        style={styles.orderList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 16,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
    backgroundColor: "#1E88E5", // Custom header background color
    paddingVertical: 6,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    elevation: 4, // Adds a shadow effect
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center", // Centered title
    flex: 1,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 24,
    backgroundColor: "#E0E0E0",
    borderWidth: 1,
    borderColor: "#ccc", // Custom border color
  },
  activeTab: {
    backgroundColor: "red",
    borderColor: "green", // Match border with active tab
  },
  tabText: {
    color: "#000",
    fontWeight: "bold",
  },
  activeTabText: {
    color: "#FFF",
  },
  orderList: {
    marginTop: 16,
  },
  orderItem: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 2, // Shadow for order items
  },
  orderImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
  },
  orderDetails: {
    flex: 1,
    marginLeft: 16,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F1F1F",
  },
  orderInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  orderTime: {
    color: "#666",
  },
  orderPrice: {
    color: "#000",
    fontWeight: "bold",
  },
  orderDate: {
    color: "#666",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  verticalLine: {
    width: 2,
    height: "100%",
    backgroundColor: "red",
    marginRight: 8, 
  },
  orderStatus: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  statusText: {
    color: "#FFF",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
});

export default OrderScreen;
