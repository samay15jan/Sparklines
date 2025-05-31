import React from 'react';
import { ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import "../global.css"
import { Colors } from '@/constants/Colors';
import { AuthProvider } from '@/context/AuthContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View } from 'react-native';
import Player from '@/components/ui/Player';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/Poppins-Regular.ttf'),
  });

  React.useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider value={Colors}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="home" options={{ headerShown: false }} />
            <Stack.Screen name="player" options={{
              headerShown: false,
              presentation: 'card',
              gestureEnabled: true,
              gestureDirection: 'vertical',
              animationDuration: 100
            }} />
            <Stack.Screen name="artist" options={{
              headerShown: false,
              presentation: 'card',
              gestureEnabled: true,
              gestureDirection: 'horizontal',
              animationDuration: 100
            }} />
            <Stack.Screen name="library" options={{
              headerShown: false,
              presentation: 'card',
              gestureEnabled: true,
              gestureDirection: 'horizontal',
              animationDuration: 100
            }} />
            <Stack.Screen name="setting" options={{
              headerShown: false,
              presentation: 'card',
              gestureEnabled: true,
              gestureDirection: 'horizontal',
              animationDuration: 100
            }} />
            <Stack.Screen name="content" options={{
              headerShown: false,
              presentation: 'card',
              gestureEnabled: true,
              gestureDirection: 'horizontal',
              animationDuration: 100
            }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
          <PlayerWrapper />
        </ThemeProvider>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}

const PlayerWrapper = () => {
  const segments = useSegments();
  const currentRoute = segments[segments.length - 1];

  if (currentRoute === 'player') return null;

  return (
    <View className="absolute w-full justify-center bottom-0 z-1">
      <Player />
    </View>
  );
};