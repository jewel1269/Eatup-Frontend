import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const activeTintColor = Colors[colorScheme ?? 'light'].tint;
  const inactiveTintColor = 'red'; 

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
        name="setting"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'settings' : 'settings-outline'} color={"red"} size={28} />
          ),
        }}
      />
    </Tabs>
  );
}
