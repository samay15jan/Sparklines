import { useState, useEffect } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';
import { useAudioPlayback } from '@/hooks/useAudioPlayback';
import { Colors } from '@/constants/Colors';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';

const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function Player() {
  const router = useRouter()
  const [togglePlayback, setTogglePlayback] = useState(true);
  const [toggleMenus, setToggleMenus] = useState(false);
  const { currentSong, currentTime, duration, togglePlayPause } = useAudioPlayback();

  const progress = (duration && currentTime)
    ? Math.min(Math.max((currentTime / duration) * 100, 0), 100)
    : 0;

  const songsData = [
    { id: '1', data: currentSong },
    { id: '2', data: currentSong }
  ];

  useEffect(() => {
    if (!currentSong) return;
  
    if (togglePlayback) {
      togglePlayPause('play');
    } else {
      togglePlayPause('pause');
    }
  }, [togglePlayback]);

  return (
    <TouchableOpacity onPress={() => router.navigate('/player')}>
      <Image
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
        source={{
          uri: currentSong?.image?.[0]?.link || 'https://picsum.photos/seed/696/3000/2000',
        }}
        contentFit="cover"
      />
      <BlurView className='absolute' style={{ width: '100%', height: '100%' }} intensity={100} />

      <View className="w-full shadow-xl border-2 py-2">
        <View className="flex-row justify-between items-center w-full">
          {/* Song Info */}
          <View style={{ width: 280 }}>
            <View className="flex-row items-center gap-4">
              <Image
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  backgroundColor: '#0553',
                  marginLeft: 20,
                }}
                source={currentSong?.image?.[2]?.link || 'https://picsum.photos/seed/696/3000/2000'}
                placeholder={{ blurhash }}
                contentFit="cover"
                transition={1000}
              />
              <FlatList
                data={songsData}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <View style={{ width: 210 }}>
                    <Text className="text-white text-lg font-semibold">
                      {item?.data?.name?.slice(0, 28) || 'Track Name'}
                    </Text>
                    <Text className="text-white text-sm">
                      {item?.data?.primaryArtists?.slice(0, 20) || 'Artist'}
                    </Text>
                  </View>
                )}
              />
            </View>
          </View>

          {/* Playback Controls */}
          <View className="flex-row items-center gap-4" style={{ marginRight: 20 }}>
            <TouchableOpacity onPress={() => setToggleMenus(!toggleMenus)}>
              {toggleMenus ? (
                <FontAwesome6 name="shuffle" size={24} color="white" />
              ) : (
                <Entypo name="loop" size={24} color="white" />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setTogglePlayback(!togglePlayback)}>
              {togglePlayback ? (
                <FontAwesome5 name="pause" size={24} color="white" />
              ) : (
                <FontAwesome5 name="play" size={24} color="white" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{ height: 1, backgroundColor: Colors.colors.background, width: '100%' }}>
        <View
          style={{
            height: 1,
            width: `${progress}%`,
            backgroundColor: Colors.colors.text,
          }}
        />
      </View>
    </TouchableOpacity>
  );
}
