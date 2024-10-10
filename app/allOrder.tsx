//import liraries
import OrderScreen from '@/components/AllComponent/OrderScreen/OrderScreen';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
const AllOrders = () => {
    return (
        <View style={styles.container}>
            <OrderScreen/>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
      height:"100%"
    },
});

//make this component available to the app
export default AllOrders;
