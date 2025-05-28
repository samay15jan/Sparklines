import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import Player from '@/components/ui/Player';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { userToken, loading } = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }

  // if (!userToken) {
  //   return <Redirect href="/auth" />;
  // }

  return { children }
}
