import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Switch, TouchableOpacity, TextInput, ToastAndroid, ScrollView, Dimensions } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { signOut } from 'firebase/auth';
import { auth } from '@/components/AllComponent/Firebase/Firebase';

const { width } = Dimensions.get('window'); // Get device width

export default function ProfileScreen() {
  const [isUSCitizen, setIsUSCitizen] = useState(false);

  const toggleSwitch = () => setIsUSCitizen(previousState => !previousState);

  const handleBack = () => {
    router.back();
  };

  const goUpdateProfile = () => {
    router.replace("/updateProfile");
  };

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        ToastAndroid.show("Successfully logged out", ToastAndroid.SHORT);
        router.replace("/signIn");
      })
      .catch((error) => {
        console.error('Logout error:', error.message);
        ToastAndroid.show(`Logout failed: ${error.message}`, ToastAndroid.SHORT);
      });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Profile</Text>
        <TouchableOpacity onPress={handleLogOut}>
          <AntDesign name="logout" size={24} color="red" />
        </TouchableOpacity>
      </View>

      {/* Profile Picture */}
      <View style={styles.profilePicContainer}>
        <Image
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuphMb4mq-EcVWhMVT8FCkv5dqZGgvn_QiA&s' }} 
          style={styles.profilePic}
        />
        <TouchableOpacity style={styles.editIcon}>
          <FontAwesome name="pencil" size={18} color="white" />
        </TouchableOpacity>
      </View>

      {/* Personal Info Section */}
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Personal Info</Text>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Your name</Text>
          <Text style={styles.value}>Jewel Mia</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Occupation</Text>
          <Text style={styles.value}>Manager</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Employer</Text>
          <Text style={styles.value}>Software Engineer</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>BD Citizen</Text>
          <Switch
            trackColor={{ false: '#767577', true: 'black' }}
            thumbColor={isUSCitizen ? 'green' : 'black'}
            ios_backgroundColor="black"
            onValueChange={toggleSwitch}
            value={isUSCitizen}
          />
        </View>
      </View>

      {/* Contact Info Section */}
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Contact Info</Text>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Phone number</Text>
          <TextInput
            style={styles.input}
            defaultValue="+8801684321082"
            editable={false}
          />
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            defaultValue="Jewelmia@mail.com"
            editable={false}
          />
        </View>
      </View>

      {/* Edit Button */}
      <TouchableOpacity onPress={goUpdateProfile} style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profilePicContainer: {
    alignItems: 'center',
    marginTop: 20,
    position: 'relative',
  },
  profilePic: {
    width: width * 0.25, // 25% of screen width
    height: width * 0.25, // 25% of screen width
    borderRadius: (width * 0.25) / 2, // Circular profile picture
    borderWidth: 3,
    borderColor: 'white',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: '30%', // Relative positioning for better responsiveness
    backgroundColor: 'red',
    borderRadius: 60,
    padding: 5,
  },
  infoSection: {
    marginTop: 10,
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    color: '#777',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    fontSize: 16,
    color: '#000',
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f1f1f1',
    width: '60%', // Responsive width
  },
  editButton: {
    backgroundColor: '#ff4d4d',
    padding: 6,
    width: "50%",
    alignSelf: "center",
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 30,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
