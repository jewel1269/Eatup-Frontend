import { AntDesign, Entypo, Feather, FontAwesome } from '@expo/vector-icons';
import {  useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

// single data details
const data = [
    {
      id: 1,
      title: "Chicken Burger",
      description: "This delicious Chicken Burger is made with a 100-gram chicken patty, layered with fresh tomato slices, gooey cheese, and crisp lettuce. The chicken is perfectly seasoned and grilled to perfection, ensuring a juicy bite in every mouthful. The combination of the tangy tomatoes and the creamy cheese adds a burst of flavor that balances out the savory chicken patty. Perfect for a quick meal or a casual gathering, this burger is a must-try for chicken lovers. It's not too heavy, making it a great option for lunch or dinner. Pair it with fries and a cold drink for the perfect meal.",
      price: 20.00,
      rating: 3.8,
      totalOrder: 120,
      category: "burger",
      image: "https://st4.depositphotos.com/2822381/29830/i/450/depositphotos_298304080-stock-photo-fresh-tasty-burger-isolated-on.jpg"
    },
    {
      id: 2,
      title: "Cheese Burger",
      description: "A classic Cheese Burger, featuring a 100-gram beef patty topped with fresh onion, juicy tomato slices, crisp lettuce, and melted cheese. The beef patty is seasoned with a blend of spices to bring out its natural flavors and is grilled to your preferred doneness. The cheese melts beautifully over the patty, creating a creamy layer that complements the crunchy vegetables. This burger is a favorite among meat lovers for its simplicity and rich, satisfying taste. Ideal for any occasion, whether it's a quick lunch or a casual dinner. Every bite is full of savory goodness.",
      price: 15.00,
      rating: 4.5,
      totalOrder: 200,
      category: "burger",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cheeseburger.jpg/1200px-Cheeseburger.jpg"
    },
    {
      id: 3,
      title: "Veggie Burger",
      description: "The Veggie Burger offers a healthy and flavorful option for those looking to enjoy a meat-free meal. With a 100-gram veggie patty packed full of nutritious ingredients like beans and grains, this burger is a great source of protein. Topped with fresh lettuce, juicy tomato, and served on a soft bun, it provides a delicious, wholesome alternative to traditional burgers. Each bite is filled with flavors that burst through, making it a favorite among vegetarians and health-conscious diners alike. The patty itself is crispy on the outside, soft on the inside, offering the perfect texture contrast.",
      price: 12.00,
      rating: 4.2,
      totalOrder: 150,
      category: "burger",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcpcaXrOe36ZzjBhvgPTkqLh2us1Rj9MwIUZznnSW81T1W51WqN0dE7bBYOkryIdCYd0o&usqp=CAU"
    },
    {
      id: 4,
      title: "Fish Burger",
      description: "This Fish Burger is perfect for seafood lovers. Made with a 100-gram fish fillet that is lightly breaded and fried to a golden crisp, this burger is bursting with flavor. It's topped with fresh lettuce and a tangy tartar sauce that adds just the right amount of zing to each bite. The fish is moist and flaky, complemented by the crunch of the breading and the freshness of the lettuce. It's a delightful alternative to traditional meat burgers and offers a lighter option that still satisfies hunger. This burger pairs well with coleslaw and fries.",
      price: 18.00,
      rating: 4.3,
      totalOrder: 180,
      category: "burger",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1WGXa2HYF4kI4efT_nIE8K5x6As9xElf0KkqNbWB4drzq1UKFshsbqwU9djaFkis1iIU&usqp=CAU"
    },
    {
      id: 5,
      title: "Spicy Burger",
      description: "The Spicy Burger is for those who love a little kick in their meals. This burger is made with a 100-gram beef patty that is spiced up with jalapenos and a special spicy sauce. Topped with melted cheese, it offers a perfect balance of heat and savory flavors. The patty is juicy and cooked to perfection, while the jalapenos add a fresh, fiery punch. This burger is sure to wake up your taste buds and leave you craving more. It's an exciting choice for anyone who enjoys bold flavors and isn't afraid of a little heat.",
      price: 22.00,
      rating: 4.8,
      totalOrder: 220,
      category: "burger",
      image: "https://www.shutterstock.com/image-photo/closeup-front-view-fresh-tasty-600nw-2476315587.jpg"
    },
    {
      id: 6,
      title: "BBQ Burger",
      description: "This BBQ Burger is a smoky, savory delight for any burger lover. Made with a 100-gram beef patty that's perfectly grilled and topped with a rich BBQ sauce, it’s a flavor explosion in every bite. The caramelized onions and BBQ sauce create a sweet and tangy taste that elevates the juicy beef patty. This burger is ideal for those who enjoy bold, hearty flavors with a bit of sweetness. Paired with a side of crispy fries or onion rings, it's a satisfying meal for any time of day, whether you're at a BBQ or a casual lunch.",
      price: 19.00,
      rating: 4.6,
      totalOrder: 190,
      category: "burger",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZuAq1ZTIafzokwGKcz2y8S9rd5CgnacD9Ujm4bkxPSvTAd4w9qQKzkgJXvhpkhlcQ-VQ&usqp=CAU"
    },
    {
      id: 7,
      title: "Double Burger",
      description: "The Double Burger is a beast of a meal, featuring two 100-gram beef patties stacked with double the cheese, lettuce, and all the fixings. This burger is for those with a big appetite or a craving for something extra indulgent. Each bite is packed with juicy beef, melted cheese, and fresh vegetables, making it a true feast. It's a popular choice for anyone who loves burgers and wants something hearty and satisfying. The patties are cooked to perfection, ensuring a juicy bite every time. Add fries and a drink for the ultimate burger experience.",
      price: 25.00,
      rating: 4.9,
      totalOrder: 250,
      category: "burger",
      image: "https://img.freepik.com/photos-premium/hamburger-laitue-tomate-du-fromage_62972-1595.jpg?w=360"
    }
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
    router.back()
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
