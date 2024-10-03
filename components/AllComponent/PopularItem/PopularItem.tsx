import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Item from "./Item/Item";

// create a component
const PopularItem = () => {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Popular Meal Menu</Text>
        <View style={styles.headerTitle}>
          <Text>See All</Text>
          <AntDesign name="caretright" size={16} color="gray" />
        </View>
      </View>
        <View style={styles.item}>
        <Item />
      </View>
     
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
    marginHorizontal: 10,
  },
  title: {
    fontFamily: "Playfair Display", 
    fontSize: 19,
    fontWeight: "bold",
  },
  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  item:{
    height:"100%"
  }
});

//make this component available to the app
export default PopularItem;
