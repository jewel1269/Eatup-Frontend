import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";

// Burger menu data with 15 unique items
const data = [
  {
    id: 1,
    title: "Chicken Burger",
    description: "100 gr chicken + tomato + cheese + lettuce",
    price: 20.0,
    rating: 3.8,
    totalOrder: 120,
    category: "burger",
    image:
      "https://t4.ftcdn.net/jpg/01/77/76/01/360_F_177760171_8bck7cs3r3oyIC2wrEg0guh6Fdull82k.jpg",
  },
  {
    id: 2,
    title: "Breif",
    description: "100 gr meat + onion + tomato + lettuce + cheese",
    price: 15.0,
    rating: 4.5,
    totalOrder: 200,
    category: "burger",
    image:
      "https://as1.ftcdn.net/v2/jpg/03/62/62/82/1000_F_362628280_lFp7UIw3UQoqIp945H2mcP9RX24MiEdJ.jpg",
  },
  {
    id: 3,
    title: "Veggie Burger",
    description: "100 gr veggie patty + lettuce + tomato",
    price: 12.0,
    rating: 4.2,
    totalOrder: 150,
    category: "burger",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcpcaXrOe36ZzjBhvgPTkqLh2us1Rj9MwIUZznnSW81T1W51WqN0dE7bBYOkryIdCYd0o&usqp=CAU",
  },
  {
    id: 4,
    title: "Fish Burger",
    description: "100 gr fish + lettuce + tartar sauce",
    price: 18.0,
    rating: 4.3,
    totalOrder: 180,
    category: "burger",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1WGXa2HYF4kI4efT_nIE8K5x6As9xElf0KkqNbWB4drzq1UKFshsbqwU9djaFkis1iIU&usqp=CAU",
  },
  {
    id: 5,
    title: "Spicy Burger",
    description: "100 gr beef + jalapeno + cheese",
    price: 22.0,
    rating: 4.8,
    totalOrder: 220,
    category: "burger",
    image:
      "https://www.shutterstock.com/image-photo/closeup-front-view-fresh-tasty-600nw-2476315587.jpg",
  },
  {
    id: 6,
    title: "BBQ ",
    description: "100 gr beef + BBQ sauce + onions",
    price: 19.0,
    rating: 4.6,
    totalOrder: 190,
    category: "burger",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOtLWX02id4Ktra_3oEgepBO5g-eIlNPViow&s",
  },
  {
    id: 7,
    title: "Double Burger",
    description: "200 gr beef + double cheese + lettuce",
    price: 25.0,
    rating: 4.9,
    totalOrder: 250,
    category: "burger",
    image:
      "https://img.freepik.com/photos-premium/hamburger-laitue-tomate-du-fromage_62972-1595.jpg?w=360",
  },
  {
    id: 8,
    title: "Grilled Chicken ",
    description: "150 gr chicken + mayo + lettuce + tomatoes",
    price: 20.0,
    rating: 4.7,
    totalOrder: 180,
    category: "burger",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/022/255/507/small_2x/grilled-chicken-wings-on-the-grill-with-flames-on-a-black-background-generative-ai-photo.jpg",
  },
  {
    id: 9,
    title: "Fish Curry",
    description: "100 gr beef + bacon + cheese + lettuce",
    price: 23.0,
    rating: 4.4,
    totalOrder: 160,
    category: "burger",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQykbGsl8ihpuW7Yn7hfoYix2-V2EpUS81Dqw&s",
  },
  {
    id: 10,
    title: "Mushroom Swiss Burger",
    description: "100 gr beef + mushrooms + swiss cheese + onions",
    price: 21.0,
    rating: 4.5,
    totalOrder: 130,
    category: "burger",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmgz8sZrs6EIiir5DtyaXVhiRpY3efIrSSZw&s",
  },
  {
    id: 11,
    title: "Crispy Chicken Burger",
    description: "100 gr crispy chicken + lettuce + mayo",
    price: 19.0,
    rating: 4.6,
    totalOrder: 190,
    category: "burger",
    image:
      "https://png.pngtree.com/png-vector/20240208/ourmid/pngtree-delicious-crispy-chicken-burger-png-image_11732556.png",
  },
  {
    id: 12,
    title: "Ruti",
    description: "100 gr buffalo meat + blue cheese + lettuce",
    price: 24.0,
    rating: 4.7,
    totalOrder: 180,
    category: "burger",
    image:
      "https://c8.alamy.com/comp/2D6XJ29/round-flat-bread-isolated-on-white-background-2D6XJ29.jpg",
  },
  {
    id: 13,
    title: "Frence Fry ",
    description: "100 gr pulled pork + BBQ sauce + coleslaw",
    price: 22.0,
    rating: 4.4,
    totalOrder: 140,
    category: "burger",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjlrNNf4WIVcrBYdFtTbq-Oo3xUMaF0IHqzQ&s",
  },
  {
    id: 14,
    title: "Fish Fry",
    description: "100 gr turkey + avocado + lettuce",
    price: 18.0,
    rating: 4.3,
    totalOrder: 110,
    category: "burger",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU0xuq2zpkZm1OswYuOpG3kGDj2JKhqBAFJA&s",
  },
  {
    id: 15,
    title: "Stowvery",
    description: "100 gr lamb + feta cheese + spinach",
    price: 26.0,
    rating: 4.8,
    totalOrder: 210,
    category: "burger",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpUWrWRCBNKjT6sknDZQKgnfSgLqQ8xl54T5U7md4xN_rB87oGjo9hJVb9F20PdKyH4cc&usqp=CAU",
  },
  {
    id: 15,
    title: "Stowvery",
    description: "100 gr lamb + feta cheese + spinach",
    price: 26.0,
    rating: 4.8,
    totalOrder: 210,
    category: "burger",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpUWrWRCBNKjT6sknDZQKgnfSgLqQ8xl54T5U7md4xN_rB87oGjo9hJVb9F20PdKyH4cc&usqp=CAU",
  },
];

// Card Component for individual burger items with animation
const BurgerCard = ({ item, index }: any) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      delay: index * 200, // Stagger animation based on index
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Link href={`/menuDetails/${item.id}`}>
        <View style={styles.card}>
          <View style={styles.rating}>
            <AntDesign name="star" size={16} color="orange" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <View style={{
            height:85,
            width:"100%"
          }}>
          <Image  source={{ uri: item.image }} style={styles.image} />
          </View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {item.description}
          </Text>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          <TouchableOpacity style={styles.addButton}>
            <AntDesign name="plus" size={16} color="white" />
          </TouchableOpacity>
        </View>
      </Link>
    </Animated.View>
  );
};

// Main Menu Component
const MenuMeal = () => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
    >
      {data.map((item, index) => (
        <BurgerCard key={item.id} item={item} index={index} />
      ))}
    </ScrollView>
  );
};

// Styles for the Menu and Burger Card components
const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  listContainer: {
    paddingHorizontal: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    width: 185, 
    height: 250, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 7,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  ratingText: {
    marginLeft: 5,
    color: "black",
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: "100%", 
    resizeMode: "cover",
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,

  },
  description: {
    fontSize: 12,
    color: "gray",
 marginTop:-10
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "red",
    padding: 8,
    marginTop:-34,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
  },
});

export default MenuMeal;
