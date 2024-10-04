import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

const Category = () => {
    const [selectedIndex, setSelectedIndex] = useState(null);

    const categories = [
        { name: "Burger", image: require("../../../assets/images/C Icon/b-removebg-preview.png") },
        { name: "Pizza", image: require("../../../assets/images/C Icon/p-removebg-preview.png") },
        { name: "Sandwich", image: require("../../../assets/images/C Icon/s-removebg-preview.png") },
        { name: "Grill", image: require("../../../assets/images/C Icon/g-removebg-preview.png") },
        { name: "Chicken", image: require("../../../assets/images/C Icon/c-removebg-preview.png") },
        { name: "Vegetable", image: require("../../../assets/images/C Icon/v-removebg-preview.png") },
    ];

    return (
        <View style={styles.container}>
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                contentContainerStyle={styles.category}
            >
                {categories.map((category:any, index:any) => (
                    <TouchableOpacity 
                        key={index} 
                        style={[styles.item, { backgroundColor: selectedIndex === index ? 'green' : 'white' }]} 
                        onPress={() => setSelectedIndex(index)}
                    >
                        <Image source={category.image} style={styles.image} />
                        <Text style={styles.text}>{category.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 16,
    },
    category: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    item: {
        alignItems: 'center',
        backgroundColor: 'red',
        flexDirection: "row",
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 5,
        height: 40,
        borderWidth:1,
        borderColor:"black"

    },
    image: {
        width: 35, 
        height: 35, 
        resizeMode: 'contain', 
    },
    text: {
        color: 'black',
        textAlign: 'center', 
    },
});

export default Category;
