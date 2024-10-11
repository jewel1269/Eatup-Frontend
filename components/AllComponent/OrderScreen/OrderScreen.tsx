import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../useAuth/useAuth";
import axios from "axios";
import { Link } from "expo-router";

const { width } = Dimensions.get("window");

const OrderScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("all");
  const [orders, setOrders] = useState<any[]>([]); // Initialize as an empty array
  const { user } = useAuth();
  const email = user?.email;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://10.0.2.2:5000/order/orderWithEmail?email=${email}`
        );

        if (response && response.data) {
          setOrders(response.data);
        } else {
          console.log("User not found");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [email]);

  const tabs = ["all", "pending", "complete"];

  const renderOrderItem = ({ item }: any) => {
    const statusColors: any = {
      pending: "#FFA500", // Orange for pending
      complete: "#00C853", // Green for complete
      failed: "#FF5252", // Red for failed
    };

    return (
      <View style={styles.orderItem}>
        <Image
          source={
            item?.orderItems[0]?.image
              ? { uri: item.orderItems[0].image } // Use the URI if available
              : {
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz4EwRe31j7RxW01OfOPkZ5PD3a8cDvff4Hw&s",
                } // Fallback image
          }
          style={styles.orderImage}
        />

        <View style={styles.orderDetails}>
          <Link href={`/summary/${item?._id}`}>
            <Text style={styles.orderTitle}>
              {item.orderItems[0]?.title || "Untitled"}
            </Text>
            <View style={styles.orderInfo}>
              <Text style={styles.orderPrice}>Price: ${item.totalPrice}</Text>
            </View>
          </Link>
          <Text style={styles.orderDate}>{item.orderDate.slice(0, 10)}</Text>
        </View>

        <Text style={{ fontWeight: "bold", marginRight: 6 }}>
          {item.paymentMethod}
        </Text>
        <View style={styles.statusContainer}>
          <View style={styles.verticalLine} />
          <View
            style={[
              styles.orderStatus,
              { backgroundColor: statusColors[item.status.toLowerCase()] },
            ]}
          >
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
            <Text
              style={activeTab === tab ? styles.activeTabText : styles.tabText}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={
          orders
            ? orders.filter(
                (order: any) =>
                  activeTab === "all" ||
                  order.status.toLowerCase() === activeTab
              )
            : []
        }
        renderItem={renderOrderItem}
        keyExtractor={(item) => item._id}
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
  orderInfo: {},
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
    backgroundColor: "#1E88E5",
    paddingVertical: 6,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    elevation: 4,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
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
    borderColor: "#ccc",
  },
  activeTab: {
    backgroundColor: "green",
    borderColor: "green",
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
    backgroundColor: "#F5F5F5",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#D3D3D3",
    padding: 16,
    height: 70,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 2,
  },
  orderImage: {
    width: 70,
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
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 22,
  },
  statusText: {
    color: "#FFF",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
});

export default OrderScreen;
