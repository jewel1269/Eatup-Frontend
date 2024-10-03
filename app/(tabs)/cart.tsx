import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { router } from "expo-router";

export default function Cart() {
  // Example data (you can replace this with your actual data)
  const [items, setItems] = useState([
    { id: '1', name: 'Chicken Burger', restaurant: 'Burger Factory LTD', price: 20, quantity: 1, image:'https://www.crumbtopbaking.com/wp-content/uploads/2022/06/Air-Fryer-Chicken-Patties-10.jpg' },
    { id: '2', name: 'Onion Pizza', restaurant: 'Pizza Palace', price: 15, quantity: 1, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_8EgE8ECPk3QfIOU0_IrqAV2ntnlqVDswfA&s' },
    { id: '3', name: 'Spicy Shawarma', restaurant: 'Hot Cool Spot', price: 15, quantity: 1, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAH5S_xW_AfeHudBUxhPjj5ta62v3b6tM6Lg&s' },
    { id: '4', name: 'Chicken Burger', restaurant: 'Burger Factory LTD', price: 20, quantity: 1, image:'https://www.crumbtopbaking.com/wp-content/uploads/2022/06/Air-Fryer-Chicken-Patties-10.jpg' },
    { id: '5', name: 'Onion Pizza', restaurant: 'Pizza Palace', price: 15, quantity: 1, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_8EgE8ECPk3QfIOU0_IrqAV2ntnlqVDswfA&s' },
    { id: '6', name: 'Spicy Shawarma', restaurant: 'Hot Cool Spot', price: 15, quantity: 1, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAH5S_xW_AfeHudBUxhPjj5ta62v3b6tM6Lg&s' },
  ]);
  

  // Update quantity of items
  const updateQuantity = (id:any, type:any) => {
    const updatedItems = items.map(item => {
      if (item.id === id) {
        if (type === 'increment') {
          return { ...item, quantity: item.quantity + 1 };
        } else if (type === 'decrement' && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
      }
      return item;
    });
    setItems(updatedItems);
  };
 
  // Calculate total
  const subTotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryCharge = 10;
  const discount = subTotal > 150 ? 10 : 0;
  const total = subTotal + deliveryCharge - discount;

// back to pevious page
  const handleBack =()=>{
    router.back()
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
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
         <ScrollView>
             <View style={styles.itemContainer}>
            <Image source={{uri:item?.image}} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemTitle}>{item.name}</Text>
              <Text style={styles.itemSubtitle}>{item.restaurant}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
            </View>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={() => updateQuantity(item.id, 'decrement')}>
                <AntDesign name="minuscircle" size={24} color="red" />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => updateQuantity(item.id, 'increment')}>
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
      <TouchableOpacity style={styles.orderButton}>
        <Text style={styles.orderButtonText}>Place My Order</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginVertical: 8,
    borderRadius: 10,
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
    fontWeight: 'bold',
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#888',
  },
  itemPrice: {
    fontSize: 16,
    color: '#e74c3c',
    marginTop: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  summaryContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#ff4d4d',
    borderRadius: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryText: {
    color: '#fff',
    fontSize: 16,
  },
  totalText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 20,
  },
  orderButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
