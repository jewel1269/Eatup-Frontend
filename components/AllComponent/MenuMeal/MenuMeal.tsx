import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";

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
    title: "Cheese Burger",
    description: "100 gr meat + onion + tomato + lettuce cheese",
    price: 15.0,
    rating: 4.5,
    totalOrder: 200,
    category: "burger",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cheeseburger.jpg/1200px-Cheeseburger.jpg",
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
    title: "BBQ Burger",
    description: "100 gr beef + BBQ sauce + onions",
    price: 19.0,
    rating: 4.6,
    totalOrder: 190,
    category: "burger",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZuAq1ZTIafzokwGKcz2y8S9rd5CgnacD9Ujm4bkxPSvTAd4w9qQKzkgJXvhpkhlcQ-VQ&usqp=CAU",
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
    title: "Chiken",
    description: "200 gr beef + double cheese + lettuce",
    price: 25.0,
    rating: 4.9,
    totalOrder: 250,
    category: "burger",
    image:
      "https://img.freepik.com/photos-premium/hamburger-laitue-tomate-du-fromage_62972-1595.jpg?w=360",
  },
];

const BurgerCard = ({ item }: any) => {
  return (
    <View style={styles.container}>
      <Link href={`/details/${item.id}`}>
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
      </Link>
    </View>
  );
};

const MenuMeal = () => {
  return (
    <ScrollView
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
  container: {
    marginBottom: 5,
  },
  listContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 3,
  },

  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginRight: 15,
    width: 180,
    height: "60%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 10,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  ratingText: {
    marginLeft: 5,
    color: "black",
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 90,
    resizeMode: "contain",
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  description: {
    fontSize: 12,
    color: "gray",
    marginVertical: 5,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
  },
  addButton: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -30,
    alignSelf: "flex-end",
  },
});

export default MenuMeal;
