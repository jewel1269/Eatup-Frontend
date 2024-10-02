// Import libraries
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import LottieView from 'lottie-react-native'; 

// Create a component
const Index = () => {
  const router = useRouter();
  const scaleValue = useRef(new Animated.Value(1)).current; 
  const [loading, setLoading] = useState(true); 

  const getStart = () => {
    router.replace("/signUp");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); 
    }, 3000);

    Animated.spring(scaleValue, {
      toValue: 1.1,
      friction: 2,
      useNativeDriver: true,
    }).start(() => {
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 2,
        useNativeDriver: true,
      }).start();
    });

    // Clean up the timer
    return () => clearTimeout(timer);
  }, [scaleValue]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/images/eatup logo.png')}
        style={[styles.logo, { transform: [{ scale: scaleValue }] }]}
      />
      {loading ? (
        <LottieView
          source={require('../assets/loader/Loader.json')} 
          autoPlay
          loop
          style={styles.loadingAnimation}
        />
      ) : (
        <TouchableOpacity style={styles.button} onPress={getStart}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// Define your styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ff5757",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  loadingAnimation: {
    width: 180,  
    height: 180, 
    marginBottom: 20, 
  },
  button: {
    backgroundColor: '#ffffff',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: '#ff5757',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Index;
