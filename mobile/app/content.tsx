import React from "react";
import { getSongDetails } from "@/hooks/api";
import { useAudioPlayback } from "@/hooks/useAudioPlayback";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, ScrollView, Animated, TouchableOpacity } from 'react-native';
import { Image } from "expo-image";
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function ContentScreen() {
  const router = useRouter()
  const [songData, setSongData] = React.useState(null)
  const [togglePlayback, setTogglePlayback] = React.useState(true);
  const { currentSong, setNewSong, togglePlayPause } = useAudioPlayback();
  const { baseSongData }: any = useLocalSearchParams();
  const data = JSON.parse(baseSongData)

  React.useEffect(() => {
    if (!currentSong) return;

    if (togglePlayback) {
      togglePlayPause('play');
    } else {
      togglePlayPause('pause');
    }
  }, [togglePlayback]);


  const scrollY = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    async function fetchData() {
      if (!data?.id) return
      try {
        const response = await getSongDetails(data?.id);
        if (response?.status === 'SUCCESS') setSongData(response?.data[0])
      } catch (err) {
        console.error(err);
      }
    }
    fetchData()
  }, [data])

  function formatAndCheckRecent(inputDate: any) {
    const date: any = new Date(inputDate);
    const now: any = new Date();
    const formattedDate = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
    const isRecent = now.getTime() - date.getTime() <= THIRTY_DAYS;

    return {
      formattedDate,
      isRecent: !isRecent
    };
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#111' }}>
      <Animated.ScrollView
        className="z-20"
        contentContainerStyle={{ paddingTop: 5 }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        <View className="justify-center items-center flex-rows py-10">
          <View className="w-60 h-60">
            <Image
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 4,
                backgroundColor: '#0553',
                marginHorizontal: 10
              }}
              source={data?.image?.[2]?.link}
              contentFit="cover"
              transition={1000}
            />
          </View>
        </View>
        <View className="ml-4">
          <Text className="text-2xl font-bold text-white">
            {data?.name}
          </Text>
          {/* ARTIST IMAGE HERE TO-DO */}
          <View className="flex-row flex-wrap items-center flex-shrink gap-x-2">
            {data?.primaryArtists.map((artist: any, index: number) => (
              <View key={artist?.id} className="flex-row items-center py-2">
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: '/artist',
                      params: { artistData: JSON.stringify(artist) },
                    })
                  }
                >
                  <Text className="text-white font-semibold text-sm pr-[2]">{artist?.name}</Text>
                </TouchableOpacity>
                {index < data?.primaryArtists?.length - 1 && (
                  <Text className="text-white font-semibold text-sm pl-[4]">|</Text>
                )}
              </View>
            ))}
          </View>
          <View className="flex-1 py-2">
            <Text className="text-sm font-medium text-gray-400">
              Single
              {' • ' + formatAndCheckRecent(data?.releaseDate).formattedDate}
              {formatAndCheckRecent(data?.releaseDate).isRecent ? ' • Latest Release' : ''}
            </Text>
          </View>
        </View>
        <TouchableOpacity className='gap-2' onPress={() => setNewSong(data)}>
          <Feather name="download" size={24} color="white" />
        </TouchableOpacity>
        <View className="absolute bottom-0 right-10 bg-green-500 w-16 h-16 rounded-full flex justify-center items-center">
          <TouchableOpacity onPress={() => setTogglePlayback(!togglePlayback)}>
            {togglePlayback ? (
              <FontAwesome5 name="pause" size={24} color="black" />
            ) : (
              <FontAwesome5 name="play" size={24} color="black" />
            )}
          </TouchableOpacity>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  )
}
