//import liraries
import OrderPage from '@/components/AllComponent/OrderPage/OrderPage';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
const Orders = () => {
    return (
        <View style={styles.container}>
            <OrderPage/>
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
export default Orders;
