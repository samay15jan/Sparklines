import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { Image } from 'expo-image';
import { BlurView } from 'expo-blur';

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const { login, register, error } = useAuth();

  const handleSubmit = () => {
    if (isLogin) {
      login(email, password);
    } else {
      register(email, password);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Image
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
        source={require('@/assets/images/login_background.png')}
        contentFit="cover"
      />
      <BlurView className='absolute' style={{ width: '100%', height: '100%' }} intensity={80} />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 20 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="items-center mb-6">
            <Text className="text-white text-3xl font-bold mb-2">Welcome to Sparklines</Text>
            <Text className="text-neutral-400 text-base">Embrace the Rhythm of Your Soul</Text>
          </View>

          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            className="bg-neutral-800 text-white p-4 rounded mb-3 text-xl"
            placeholderTextColor="#777"
            selectionColor='#00FF7F'
            keyboardType="email-address"
            autoCapitalize="none"
            autoFocus
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            className="bg-neutral-800 text-white p-4 rounded mb-6 text-xl"
            placeholderTextColor="#777"
            selectionColor='#00FF7F'
            secureTextEntry
            autoCapitalize="none"
          />
          {error ? (
            <Text className="text-red-500 text-center mb-6">{error?.message}</Text>
          ) : null}

          <TouchableOpacity
            className="bg-[#00ff7f] p-4 rounded"
            onPress={handleSubmit}
          >
            <Text className="text-black text-center font-bold">
              {isLogin ? 'Login' : 'Register'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsLogin(!isLogin)} className="mt-4">
            <Text className="text-neutral-400 text-center">
              {isLogin ? "New to Sparklines? " : "Already have an account? "}
              <Text className="text-white font-semibold">
                {isLogin ? "Sign Up" : "Login"}
              </Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
