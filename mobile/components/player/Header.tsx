import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { Entypo, Ionicons } from '@expo/vector-icons';

type HeaderBarProps = {
  router: ReturnType<typeof useRouter>;
  currentSong: any;
};

export default function HeaderBar({ router, currentSong }: HeaderBarProps) {
  return (
    <View className='flex-row items-center justify-center w-full' style={{ paddingHorizontal: 10 }}>
      {/* <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="chevron-back-sharp" size={30} color="white" />
      </TouchableOpacity> */}
      <Text className="text-white text-center text-lg font-semibold" style={{ marginVertical: 10 }}>
        {currentSong?.album?.name || currentSong?.name}
      </Text>
      {/* <Entypo name="dots-three-vertical" size={24} color="white" /> */}
    </View>
  );
}
