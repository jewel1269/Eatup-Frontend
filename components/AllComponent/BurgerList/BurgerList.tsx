import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const data = [
  {
    id: 1,
    title: "Chicken Burger",
    description: "100 gr chicken + tomato + cheese + lettuce",
    price: 20.00,
    rating: 3.8,
    totalOrder: 120,
    category: "burger",
    image: "data:image/jpeg;base64,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"
  },
  {
    id: 2,
    title: "Cheese Burger",
    description: "100 gr meat + onion + tomato + lettuce cheese",
    price: 15.00,
    rating: 4.5,
    totalOrder: 200,
    category: "burger",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cheeseburger.jpg/1200px-Cheeseburger.jpg"
  },
  {
    id: 3,
    title: "Veggie Burger",
    description: "100 gr veggie patty + lettuce + tomato",
    price: 12.00,
    rating: 4.2,
    totalOrder: 150,
    category: "burger",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcpcaXrOe36ZzjBhvgPTkqLh2us1Rj9MwIUZznnSW81T1W51WqN0dE7bBYOkryIdCYd0o&usqp=CAU"
  },
  {
    id: 4,
    title: "Fish Burger",
    description: "100 gr fish + lettuce + tartar sauce",
    price: 18.00,
    rating: 4.3,
    totalOrder: 180,
    category: "burger",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1WGXa2HYF4kI4efT_nIE8K5x6As9xElf0KkqNbWB4drzq1UKFshsbqwU9djaFkis1iIU&usqp=CAU"
  },
  {
    id: 5,
    title: "Spicy Burger",
    description: "100 gr beef + jalapeno + cheese",
    price: 22.00,
    rating: 4.8,
    totalOrder: 220,
    category: "burger",
    image: "https://www.shutterstock.com/image-photo/closeup-front-view-fresh-tasty-600nw-2476315587.jpg"
  },
  {
    id: 6,
    title: "BBQ Burger",
    description: "100 gr beef + BBQ sauce + onions",
    price: 19.00,
    rating: 4.6,
    totalOrder: 190,
    category: "burger",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZuAq1ZTIafzokwGKcz2y8S9rd5CgnacD9Ujm4bkxPSvTAd4w9qQKzkgJXvhpkhlcQ-VQ&usqp=CAU"
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

const BurgerCard = ({ item }:any) => {
  return (
   <View style={styles.container}>
     <View style={styles.card}>
      <View style={styles.rating}>
        <AntDesign name="star" size={16} color="orange" />
        <Text style={styles.ratingText}>{item.rating}</Text>
      </View>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      <TouchableOpacity style={styles.addButton}>
        <AntDesign name="plus" size={16} color="white" />
      </TouchableOpacity>
    </View>
   </View>
  );
};

const BurgerList = () => {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false} 
      contentContainerStyle={styles.listContainer}
    >
      {data.map((item) => (
        <BurgerCard key={item.id} item={item} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container:{
   marginBottom:5
  },
  listContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginRight: 15,
    width: 200,
    height: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 3.84, 
    elevation: 10, 
   
},
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingText: {
    marginLeft: 5,
    color: 'black',
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 90,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  description: {
    fontSize: 12,
    color: 'gray',
    marginVertical: 5,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
  },
  addButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -30,
    alignSelf: 'flex-end',
  },
});

export default BurgerList;
