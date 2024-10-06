import { AntDesign, Entypo, Feather, FontAwesome } from '@expo/vector-icons';
import {  useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

// single data details
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

const DetailsPage = () => {
  const { id } = useLocalSearchParams<any>();
  const router = useRouter()
  const product = data.find((item) => item.id === parseInt(id));

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Product not found</Text>
      </View>
    );
  }

  const handleBack = ()=>{
    router.replace("/meal")
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <AntDesign name="swap" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.favoriteButton}>
          <Feather name="heart" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Image
        source={{ uri: product.image }}
        style={styles.productImage}
      />

      <View style={styles.infoSection}>
        <Text style={styles.popularText}>Popular</Text>
       <View style={{
        flexDirection:"row",
        justifyContent:"space-between",
        alignContent:"center"
       }}>
       <Text style={styles.titleText}>{product.title}</Text>
       <View style={{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-around",
        gap:3
       }}>
       <Entypo name="location" size={24} color="black" />
       <Text>
        Location
       </Text>
       </View>
       </View>

        <View style={styles.ratingRow}>
          <View style={styles.rating}>
            <Feather name="star" size={24} color="red"  />
            <Text style={styles.ratingText}>{product.rating} Rating</Text>
          </View>

          <View style={styles.orders}>
            <FontAwesome name="shopping-bag" size={24} color="red" />
            <Text style={styles.orderText}>{product.totalOrder}+ Order</Text>
          </View>
        </View>

       <ScrollView>
       <Text style={styles.descriptionText}>
          {product.description}
        </Text>
       </ScrollView>

        <Text style={styles.ingredients}>• {product.category}</Text>
      </View>

      <TouchableOpacity style={styles.addToCartButton}>
        <Text style={styles.addToCartText}>Add To Cart - ${product.price.toFixed(2)}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
  },
  favoriteButton: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
  },
  productImage: {
    width: '100%',
    height: 300,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  infoSection: {
    padding: 16,
  },
  popularText: {
    color: '#FF6347',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 16,
  },
  orders: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderText: {
    marginLeft: 4,
    fontSize: 16,
  },
  descriptionText: {
    fontSize: 14,
    color: '#777',
    marginBottom: 8,
  },
  ingredients: {
    fontSize: 14,
    color: '#000',
    marginBottom: 20,
  },
  addToCartButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 16,
    borderRadius: 30,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  addToCartText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default DetailsPage;
