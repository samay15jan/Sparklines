import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SearchScreen() {
  const [searchText, setSearchText] = useState('');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1 pt-14 px-5"
      >
        <View className="items-center mb-6">
          <Text className="text-white text-2xl font-semibold">Discover</Text>
        </View>

        <View className="flex-row items-center bg-neutral-800 rounded-full px-4 py-3">
          <Ionicons name="search" size={18} color="#999" />
          <TextInput
            className="text-white ml-2 flex-1 text-base"
            placeholder="Search music, artists..."
            placeholderTextColor="#999"
            onChangeText={setSearchText}
            value={searchText}
            returnKeyType="search"
            cursorColor="#00ff7f"
            selectionColor="#00ff7f"
            keyboardAppearance="dark"
            keyboardType="default"
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
