import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const PizzaOrderScreen = () => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Pizza Image */}
        <Image
          source={{ uri: 'https://www.shutterstock.com/image-photo/closeup-front-view-fresh-tasty-600nw-2476315587.jpg' }} 
          style={styles.pizzaImage}
        />
        
        {/* Title and Description */}
        <Text style={styles.title}>Beef Pizza</Text>
        <Text style={styles.description}>
         
        </Text>
        
        {/* Rating, Calories, and Time */}
        <View style={styles.infoRow}>
          <Text style={styles.rating}>⭐ 4.5</Text>
          <Text style={styles.calories}>🔥 800 kcal</Text>
          <Text style={styles.time}>⏱️ 5-10 mins</Text>
        </View>
        
        {/* Quantity Selector */}
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={handleDecrease} style={styles.quantityButton}>
            <Text style={styles.quantityText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityValue}>{quantity}</Text>
          <TouchableOpacity onPress={handleIncrease} style={styles.quantityButton}>
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Price */}
        <Text style={styles.price}>$24.00</Text>

        {/* Add to Cart Button */}
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    width: '90%',
  },
  pizzaImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    color: '#555',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  rating: {
    fontSize: 16,
    color: '#333',
  },
  calories: {
    fontSize: 16,
    color: '#333',
  },
  time: {
    fontSize: 16,
    color: '#333',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityButton: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 5,
  },
  quantityText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantityValue: {
    fontSize: 20,
    marginHorizontal: 20,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  addToCartButton: {
    backgroundColor: '#ff6347',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  addToCartText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PizzaOrderScreen;
