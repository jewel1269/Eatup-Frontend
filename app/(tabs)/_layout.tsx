import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const activeTintColor = Colors[colorScheme ?? 'light'].tint;
  const inactiveTintColor = '#8e8e93'; // Soft gray for inactive tabs

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeTintColor,
        tabBarInactiveTintColor: inactiveTintColor,
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#1c1c1e' : '#ffffff', // Dark mode and light mode background
          borderTopWidth: 0, // Remove top border
          height: 60, // Increase tab bar height
          paddingBottom: 10, // Add padding for better spacing
        },
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12, // Smaller font size for a sleeker look
        },
        tabBarIconStyle: {
          marginBottom: 5, // Space between icon and label
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
        name="search"
        options={{
          title: 'Search',
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
          tabBarBadge: 3, 
          tabBarBadgeStyle: {
            backgroundColor: activeTintColor,
            color: '#fff',
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person' : 'person-outline'} color={"red"} size={28} />
          ),
        }}
      />
    </Tabs>
  );
}
