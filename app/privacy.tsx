//import liraries
import PrivacyPolicyScreen from '@/components/AllComponent/PrivacyPolicyScreen/PrivacyPolicyScreen';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
const Privacy = () => {
    return (
        <View style={styles.container}>
           <PrivacyPolicyScreen/>
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
export default Privacy;
