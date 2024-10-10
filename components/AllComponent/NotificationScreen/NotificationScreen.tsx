import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Ensure you're using Expo or have icons installed
import { router } from 'expo-router';

const notifications = [
  {
    id: '1',
    name: 'Muhammad Asif',
    message: 'Need based scholarships arrived.',
    time: '5:30',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD00FyaCAv10OK1kDAbRUfHmT7MiZwEZPMhw&s',
  },
  {
    id: '2',
    name: 'Muhammad Noor',
    message: 'Cricket tournament started.',
    time: '3:20',
    avatar: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/04/All-american-boy-song.jpg/220px-All-american-boy-song.jpg',
  },
  {
    id: '3',
    name: 'Suleman',
    message: 'Papers show will be on Monday.',
    time: '1:00',
    avatar: 'https://cdn.aglty.io/boys-town/quotes/ryan_20230915120925.jpg',
  },
  {
    id: '4',
    name: 'Ahmed Khan',
    message: 'FYI proposal submission is due...',
    time: '10:45',
    avatar: 'https://i0.wp.com/pixahive.com/wp-content/uploads/2021/02/An-Indian-boy-375075-pixahive.jpg?fit=1702%2C2560&ssl=1',
  },
  {
    id: '5',
    name: 'Murtaza Khan',
    message: 'International scholarships are avail...',
    time: '9:15',
    avatar: 'https://c0.wallpaperflare.com/preview/440/175/730/fashion-style-boys-fashion-pose.jpg',
  },
  {
    id: '6',
    name: 'Akram Qureshi',
    message: 'Mid term exam date sheet is here.',
    time: '1 day ago',
    avatar: 'https://i.pinimg.com/236x/ab/0f/9f/ab0f9f19aa2175c24437f0dbadc1fe6e.jpg',
  },
];

const NotificationScreen = () => {
  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      {/* Notification List using map */}
      <View>
        {notifications.map((item) => (
          <View style={styles.notificationContainer} key={item.id}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.notificationDetails}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.message}>{item.message}</Text>
            </View>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    height: 55,
    borderColor: "#007bff", 
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: '#fff',

    marginVertical: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  notificationDetails: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  message: {
    color: '#555',
    marginTop: 2,
  },
  time: {
    fontSize: 12,
    color: '#888',
  },
});

export default NotificationScreen;
