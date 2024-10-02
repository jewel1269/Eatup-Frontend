//import liraries
import { AntDesign } from "@expo/vector-icons";
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

// create a component
const PopularItem = () => {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.Title}>Popular Meal Menu</Text>
        <View style={styles.headerTitle}>
          <Text>See All</Text>
          <AntDesign name="caretright" size={16} color="gray" />
        </View>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  header: {
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between"
  },
  Title: {
    fontFamily: "Playfair",
    fontSize: 19,
  },
  headerTitle:{
    flexDirection:"row",
    alignItems:"center"
  }
});

//make this component available to the app
export default PopularItem;
