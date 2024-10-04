//import liraries
import ProfileUpdateScreen from '@/components/AllComponent/ProfileUpdateScreen/ProfileUpdateScreen';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
const UpdateProfile = () => {
    return (
        <View>
           <ProfileUpdateScreen/>
        </View>
    );
};

//make this component available to the app
export default UpdateProfile;
