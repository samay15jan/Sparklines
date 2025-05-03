import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { Colors } from '@/constants/Colors';
import Player from '@/components/ui/Player';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function TabLayout() {

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: Colors.colors.tabIconSelected,
          tabBarInactiveTintColor: Colors.colors.tabIconDefault,
          headerShown: false,
          tabBarButton: HapticTab,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <Ionicons name={color === '#B3B3B3' ? 'home-outline' : 'home'} size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: 'Search',
            tabBarIcon: ({ color }) => <FontAwesome5 name='search' size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="library"
          options={{
            title: 'Library',
            tabBarIcon: ({ color }) => <FontAwesome name={color === '#B3B3B3' ? 'heart-o' : 'heart'} size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => <FontAwesome5 name={color === '#B3B3B3' ? 'user' : 'user-alt'} size={24} color={color} />,
          }}
        />
      </Tabs >
      <View className='absolute w-full justify-center bottom-14'>
        <Player />
      </View>
    </>
  );
}
