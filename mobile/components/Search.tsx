import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';


const PullToSearch = ({ inputAnimatedStyle }: any) => {
  const [searchText, setSearchText] = useState('');
  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Animated.View
          style={[
            {
              position: 'absolute',
              top: 10,
              left: 20,
              right: 20,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 10,
            },
            inputAnimatedStyle,
          ]}
          className='flex-row bg-neutral-800 rounded-full'
        >
          <View className='flex-row'>
            <Ionicons name="search" size={18} color="#999" />
            <TextInput
              className="text-white flex-1 text-base"
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
        </Animated.View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default PullToSearch;
