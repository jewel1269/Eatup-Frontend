import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

const initialProducts = [
  {
    id: 1,
    name: 'Washington Apples',
    image: 'https://images.immediate.co.uk/production/volatile/sites/30/2013/05/spaghetti-carbonara-382837d.jpg?resize=768,574',
    type: 'Premium',
    storageLife: '3 Days',
    discount: '25%',
    price: 128,
    discountedPrice: 90.40,
    quantity: 3,
    inStock: true,
  },
  {
    id: 2,
    name: 'Kinwow',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqT9pgwDXChFqhZoKeR_uEPKt5tVZ8h6jmmH26XerUA1LaFi5ZzBO_yRBU0fgrLrFm8eA&usqp=CAU',
    type: 'Regular',
    storageLife: '5 Days',
    discount: '15%',
    price: 58,
    discountedPrice: 44,
    quantity: 1,
    inStock: true,
  },
  {
    id: 3,
    name: 'Mushrooms - Button',
    image: 'https://via.placeholder.com/50',
    type: 'Premium',
    storageLife: '2 Days',
    discount: '20%',
    price: 57,
    discountedPrice: 45.60,
    quantity: 1,
    inStock: false,
  },
  {
    id: 4,
    name: 'Onion',
    image: 'https://via.placeholder.com/50',
    type: 'Regular',
    storageLife: '2 Weeks',
    discount: '40%',
    price: 32,
    discountedPrice: 20,
    quantity: 1,
    inStock: true,
  },
  {
    id: 5,
    name: 'Garlic',
    image: 'https://via.placeholder.com/50',
    type: 'Regular',
    storageLife: '2 Weeks',
    discount: '30%',
    price: 60,
    discountedPrice: 42,
    quantity: 1,
    inStock: true,
  },
  {
    id: 6,
    name: 'Tomato',
    image: 'https://via.placeholder.com/50',
    type: 'Premium',
    storageLife: '5 Days',
    discount: '10%',
    price: 45,
    discountedPrice: 40.50,
    quantity: 1,
    inStock: true,
  },
];

const MenuMeal = () => {
  const [products, setProducts] = useState(initialProducts);

  const incrementQuantity = (id:any) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, quantity: product.quantity + 1 } : product
      )
    );
  };

  const decrementQuantity = (id:any) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  const renderProductCard = (item:any) => (
    <View key={item.id} style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.discountText}>{item.discount} In Season</Text>
      </View>
  
      <View style={styles.productRow}>
        {/* Product Image */}
        <Image source={{ uri: item.image }} style={styles.productImage} />
  
        <View style={styles.productDetails}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.type}>Type: {item.type}</Text>
          <Text style={styles.storageLife}>Storage Life: {item.storageLife}</Text>
          <Text style={styles.price}>
            Rs. {item.discountedPrice}{' '}
            <Text style={styles.strikethrough}>Rs. {item.price}</Text>
          </Text>
        </View>
  
        {item.inStock ? (
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => decrementQuantity(item.id)}
            >
              <Text style={styles.quantityText}>-</Text>
            </TouchableOpacity>
  
            <Text style={styles.quantityDisplay}>{item.quantity}</Text>
  
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => incrementQuantity(item.id)}
            >
              <Text style={styles.quantityText}>+</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.notifyButton}>
            <Text style={styles.notifyText}>NOTIFY</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
  
  return (
    <View>
      {products.map(renderProductCard)}
    </View>
  );
  
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  discountText: {
    backgroundColor: 'orange',
    color: '#fff',
    paddingHorizontal: 5,
    borderRadius: 3,
    fontWeight: 'bold',
    fontSize: 12,
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  productImage: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  productDetails: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  type: {
    fontSize: 12,
    color: 'gray',
  },
  storageLife: {
    fontSize: 12,
    color: 'gray',
  },
  price: {
    fontSize: 16,
    marginVertical: 5,
  },
  strikethrough: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: 'orange',
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 3,
  },
  quantityText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  quantityDisplay: {
    fontSize: 16,
    paddingHorizontal: 10,
  },
  notifyButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  notifyText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MenuMeal;
