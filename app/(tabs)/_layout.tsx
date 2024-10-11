import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import useAuth from '@/components/AllComponent/useAuth/useAuth';
import axios from 'axios';
import { ToastAndroid } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const activeTintColor = Colors[colorScheme ?? 'light'].tint;
  const inactiveTintColor = 'red'; 
  const [items, setItems] = useState<any[]>([]);
  const { user } = useAuth();
  const email = user?.email; 

  // Fetch cart items from backend
  useEffect(() => {
    const fetchData = async () => {
      if (!email) {
        console.error("No email found.");
        return; // Exit if no email is available
      }

      try {
        const response = await axios.get(`http://10.0.2.2:5000/cart/meals?email=${email}`);
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        ToastAndroid.show("Error fetching cart items", ToastAndroid.SHORT);
      }
    };

    fetchData();
  }, [email]); // Add email as a dependency to re-fetch if it changes

  const item = items.length;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeTintColor,
        tabBarInactiveTintColor: inactiveTintColor,
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#1c1c1e' : '#ffffff', 
          borderTopWidth: 0, 
          height: 60, 
          paddingBottom: 10,
        },
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12, 
        },
        tabBarIconStyle: {
          marginBottom: 5, 
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={"red"} size={28} />
          ),
        }}
      />
      <Tabs.Screen
        name="meal"
        options={{
          title: 'Meal',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'search' : 'search-outline'} color={"red"} size={28} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'cart' : 'cart-outline'} color={"red"} size={28} />
          ),
          tabBarBadge: item , 
          tabBarBadgeStyle: {
            backgroundColor: activeTintColor,
            color: '#fff',
          },
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'settings' : 'settings-outline'} color={"red"} size={28} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'chatbox' : 'chatbox-ellipses'} color={"red"} size={28} />
          ),
        }}
      />
    </Tabs>
  );
}
