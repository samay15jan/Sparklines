import { Text, View, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { useAudioPlayback } from '@/hooks/useAudioPlayback';
import { Image } from 'expo-image';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';
import { Colors } from '@/constants/Colors';
import { useRef, useState } from 'react';
import { BlurView } from 'expo-blur';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

const { width: screenWidth } = Dimensions.get('window');
const ITEM_WIDTH = screenWidth * 0.6;
const SPACING = 20;

export default function Player() {
  const { currentSong, currentTime, duration } = useAudioPlayback();
  const [togglePlayback, setTogglePlayback] = useState(false);
  const [toggleMenus, setToggleMenus] = useState(false);
  const [toggleLiked, setToggleLiked] = useState(false)
  const scrollX = useRef(new Animated.Value(0)).current;
  const router = useRouter()

  const progress = (duration && currentTime)
    ? Math.min(Math.max((currentTime / duration) * 100, 0), 100)
    : 0;

  const songsData = [
    { id: '1', data: currentSong },
    { id: '2', data: currentSong },
    { id: '3', data: currentSong },
    { id: '4', data: currentSong },
    { id: '5', data: currentSong },
    { id: '6', data: currentSong },
  ];

  return (
    <View style={{ flex: 1 }}>
      {/* Background Image */}
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

      {/* Blur overlay */}
      <BlurView className='absolute' style={{ width: '100%', height: '100%' }} intensity={100} />

      <View className="items-center justify-center" style={{ width: '100%', marginTop: 30 }}>
        <View
          style={{
            height: 4,
            width: `20%`,
            backgroundColor: Colors.colors.text,
            borderRadius: 20,
          }}
        />
        <View className='flex-row items-center justify-between w-full' style={{ paddingHorizontal: 10 }}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back-sharp" size={30} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-center text-lg font-semibold" style={{ marginVertical: 10 }}>
            {currentSong?.album?.name || currentSong?.name}
          </Text>
          <Entypo name="dots-three-vertical" size={24} color="white" />
        </View>

        {/* Animated FlatList Carousel */}
        <Animated.FlatList
          horizontal
          pagingEnabled
          snapToInterval={ITEM_WIDTH + SPACING}
          snapToAlignment="start"
          disableIntervalMomentum
          decelerationRate="normal"
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: (screenWidth - ITEM_WIDTH) / 2,
          }}
          data={songsData}
          keyExtractor={(item) => item.id}
          scrollEventThrottle={10}
          getItemLayout={(_, index) => ({
            length: ITEM_WIDTH + SPACING,
            offset: (ITEM_WIDTH + SPACING) * index,
            index,
          })}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          renderItem={({ item, index }) => {
            const inputRange = [
              (index - 1) * (ITEM_WIDTH + SPACING),
              index * (ITEM_WIDTH + SPACING),
              (index + 1) * (ITEM_WIDTH + SPACING),
            ];

            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [0.8, 1, 0.8],
              extrapolate: 'clamp',
            });

            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.2, 1, 0.2],
              extrapolate: 'clamp',
            });

            return (
              <>
                <Animated.View
                  style={{
                    width: ITEM_WIDTH,
                    height: 500,
                    marginRight: SPACING,
                    transform: [{ scale }],
                    opacity,
                    alignItems: 'center',
                  }}
                >
                  <Image
                    style={{
                      width: '100%',
                      height: '80%',
                      borderRadius: 12,
                      backgroundColor: '#0553',
                    }}
                    source={{
                      uri: item?.data?.image?.[2]?.link || 'https://picsum.photos/seed/696/3000/2000',
                    }}
                    contentFit="cover"
                    transition={1000}
                  />
                  <View style={{ marginVertical: 10 }}>
                    <Text className="text-white text-center text-2xl font-semibold">
                      {currentSong?.name || 'Track Name'}
                    </Text>
                    <Text className="text-white text-center text-lg">
                      {currentSong?.primaryArtists || 'Artist'}
                    </Text>
                  </View>
                </Animated.View>
              </>
            );
          }}
        />

        {/* Track name and artist */}
        <View style={{ marginBottom: 100 }}>
          {/* Playback controls */}
          <View className="flex-row items-center gap-4">
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
            <TouchableOpacity onPress={() => setToggleLiked(!toggleLiked)}>
              <FontAwesome name={toggleLiked ? 'heart' : 'heart-o'} size={24} color='white' />
            </TouchableOpacity>
          </View>

          {/* Progress bar */}
          <View style={{ height: 4, backgroundColor: Colors.colors.background, width: '100%' }}>
            <View
              style={{
                height: 4,
                width: `${progress}%`,
                backgroundColor: Colors.colors.text,
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
