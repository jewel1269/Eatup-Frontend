import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, ToastAndroid } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/components/AllComponent/Firebase/Firebase';
import axios from 'axios';



const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const router = useRouter()

  const LogIn = () =>{
    router.replace("/signIn")
  }

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validation function
  const validateForm = () => {
    let isValid = true;

    // Validate email
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Invalid email');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Validate password
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 4) {
      setPasswordError('Password is too short');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };


  // Handle form submission
 const handleSignUp = async () => {
  if (validateForm()) {
    try {
      const userInfo = { name, email, password };
      console.log('User Info:', userInfo);
      
      // Create user with Firebase authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Firebase user:', user);

      // Use Android emulator IP to access localhost
      const response = await axios.post("http://10.0.2.2:5000/users", userInfo);
      console.log('Server response:', response);
      
      // Check if the registration was successful
      if (response && response.data) {
        ToastAndroid.show("Successfully Registered", ToastAndroid.SHORT);
        router.replace("/signIn");
      } else {
        throw new Error("Invalid response from server");
      }
      
    } catch (error) {
      console.error('Registration error:', error);
      ToastAndroid.show(`Registration failed:`, ToastAndroid.SHORT);
    }
  }
};
  

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Ionicons name="radio-button-on" size={100} color="#FF6B6B" />
        <Image
          source={require('../assets/images/eatup logo.png')}
          style={styles.logoImage}
        />
      </View>

      <Text style={styles.title}>Register In Now</Text>
      <Text style={styles.subtitle}>Please login to continue using our app</Text>

      <View>
      <TextInput
          mode="outlined"
          label="Name"
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.input} 
          error={!!emailError}
          theme={{ roundness: 15 }} 
        />
        {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
        <TextInput
          mode="outlined"
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input} 
          error={!!emailError}
          theme={{ roundness: 15 }} 
        />
        {emailError ? <Text style={styles.error}>{emailError}</Text> : null}

        <TextInput
          mode="outlined"
          label="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input} 
          error={!!passwordError}
          theme={{ roundness: 15 }}  
        />
        {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}

        <Text style={styles.forgotPassword}>Forgot Password?</Text>

        <Button mode="contained" onPress={handleSignUp} style={styles.loginButton}>
          Sign Up
        </Button>
      </View>

      <Text style={styles.signUpText}>
         Have an account? <Text onPress={LogIn} style={styles.signUpLink}>Sign In</Text>
      </Text>

      <View style={styles.socialIcons}>
        <FontAwesome name="facebook" size={30} color="#3b5998" style={styles.icon} />
        <FontAwesome name="twitter" size={30} color="#00acee" style={styles.icon} />
        <FontAwesome name="google" size={30} color="#db4437" style={styles.icon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F9F9F9',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  logoImage: {
    width: 50,
    height: 50,
    position: 'absolute',
    top: 25,
    left: '42%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontSize: 12,
  },
  forgotPassword: {
    textAlign: 'right',
    color: '#666',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#FF6B6B',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
  },
  signUpText: {
    textAlign: 'center',
    marginBottom: 20,
  },
  signUpLink: {
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  icon: {
    marginHorizontal: 10,
    
  },
});

export default SignUpScreen;
