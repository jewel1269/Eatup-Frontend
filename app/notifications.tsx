//import liraries
import NotificationScreen from '@/components/AllComponent/NotificationScreen/NotificationScreen';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
const Notifications = () => {
    return (
        <View style={styles.container}>
           <NotificationScreen/>
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
export default Notifications;
