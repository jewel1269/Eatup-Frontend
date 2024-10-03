import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const data = [
  {
    id: 2,
    title: "Cheese Chiken",
    description: "100 gr meat + onion + tomato + lettuce cheese",
    price: 15.00,
    rating: 4.5,
    totalOrder: 200,
    category: "burger",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAxlqag1-uZmhNCzsNMJKQMqiXP3if06hiJg&s"
  },
  {
    id: 3,
    title: "Apple",
    description: "100 gr veggie patty + lettuce + tomato",
    price: 12.00,
    rating: 4.2,
    totalOrder: 150,
    category: "burger",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAR9krgdd110BLzGMRM-CETX5nzGwKS7dksg&s"
  },
  {
    id: 4,
    title: "Bief Curry",
    description: "100 gr fish + lettuce + tartar sauce",
    price: 18.00,
    rating: 4.3,
    totalOrder: 180,
    category: "burger",
    image: "https://static.vecteezy.com/system/resources/previews/040/146/397/non_2x/mutton-curry-or-lamb-curry-with-lettuce-leaves-letus-pata-on-a-wooden-plate-is-spicy-indian-cuisine-mutton-gravy-is-a-delicious-indian-curry-dish-of-soft-white-background-isolated-free-photo.jpg"
  },
  {
    id: 5,
    title: "Fruits Pack",
    description: "100 gr beef + jalapeno + cheese",
    price: 22.00,
    rating: 4.8,
    totalOrder: 220,
    category: "burger",
    image: "https://t4.ftcdn.net/jpg/00/53/14/41/360_F_53144147_Zx2dgnSeefxIjOQ5cjD4PBdZF4m8M7sm.jpg"
  },
  {
    id: 6,
    title: "BBQ Chiken",
    description: "100 gr beef + BBQ sauce + onions",
    price: 19.00,
    rating: 4.6,
    totalOrder: 190,
    category: "burger",
    image: "https://thumbs.dreamstime.com/z/generative-ai-grill-roast-bbq-chicken-legs-isolated-white-background-barbecued-chicken-leg-grilled-chicken-legs-fried-chicken-306864921.jpg"
  },
  {
    id: 7,
    title: "Double Burger",
    description: "200 gr beef + double cheese + lettuce",
    price: 25.00,
    rating: 4.9,
    totalOrder: 250,
    category: "burger",
    image: "https://img.freepik.com/photos-premium/hamburger-laitue-tomate-du-fromage_62972-1595.jpg?w=360"
  }
];

interface MenuItemProps {
  item: {
    id: number;
    title: string;
    description: string;
    price: number;
    rating: number;
    totalOrder: number;
    image: string;
  };
}

const MenuItem = ({ item }: MenuItemProps) => (
  <View style={styles.card}>
    <Image source={{ uri: item.image }} style={styles.image} />
    <View style={styles.info}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description.slice(0, 15)}</Text>
      <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      <View style={styles.row}>
        <Text style={styles.rating}>Rating: {item.rating}</Text>
        <Text style={styles.orders}>Sold: {item.totalOrder}</Text>
      </View>
      <View style={styles.orderBtn}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Order</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addButton}>
        <AntDesign name="plus" size={16} color="white" />
      </TouchableOpacity>
      </View>
    </View>
  </View>
);

const Item = () => (
  <ScrollView style={styles.container} contentContainerStyle={styles.grid}>
    {data.map((item) => (
      <View key={item.id} style={styles.gridItem}>
        <MenuItem item={item} />
      </View>
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  orderBtn:{
  flexDirection:"row",
  justifyContent:"space-between"
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    flexBasis: '48%', 
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 10,
  },
  info: {
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    color: '#555',
  },
  price: {
    color: '#27ae60',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    gap:2
  },
  rating: {
    color: '#f1c40f',
  },
  orders: {
    color: '#3498db',
    marginLeft:3
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6666',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    marginRight: 5,
  },
  addButton: {
    backgroundColor: '#FF6666',
    padding: 8,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -30,
    alignSelf: 'flex-end',
  },
});

export default Item;
