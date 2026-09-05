import React, { useEffect } from "react";
import { contentsForSongs } from "@/hooks/api";
import { useAudioPlayback } from "@/hooks/useAudioPlayback";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, ScrollView, Animated, TouchableOpacity } from 'react-native';
import { Image } from "expo-image";
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';
import Cards from "@/components/ui/Cards";

export default function ContentScreen() {
  const router = useRouter()
  const [contentData, setContentData] = React.useState<any>(null)
  const [togglePlayback, setTogglePlayback] = React.useState(false);
  const { currentSong, status, setNewSong, togglePlayPause } = useAudioPlayback();
  const { baseSongData }: any = useLocalSearchParams();
  const data = JSON.parse(baseSongData)

  useEffect(() => {
    if (status === "playing") {
      setTogglePlayback(true)
    } else {
      setTogglePlayback(false)
    }
  }, [status, togglePlayback]);

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
        const response: any = await contentsForSongs(data?.id, data?.primaryArtists[0]?.id);
        setContentData(response)
      } catch (err) {
        console.error(err);
      }
    }
    fetchData()
  }, [])

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
        <View className="relative">
          <View className="ml-4">
            <Text className="text-2xl font-bold text-white">
              {data?.name}
            </Text>
            <View className="flex-row flex-wrap items-center flex-shrink">
              <TouchableOpacity onPress={() =>
                router.push({
                  pathname: '/artist',
                  params: { artistData: JSON.stringify(data?.primaryArtists[0]) },
                })
              }
              >
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 20,
                    backgroundColor: '#0553',
                    marginRight: 5
                  }}
                  source={contentData?.artistData?.baseData?.image?.[2]?.link}
                  contentFit="cover"
                  transition={1000}
                />
              </TouchableOpacity>
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
                    <Text className="text-white font-semibold text-sm mr-1">|</Text>
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
          <View className="absolute bottom-14 right-10 bg-green-500 w-16 h-16 rounded-full flex justify-center items-center">
            <TouchableOpacity onPress={() => setTogglePlayback(!togglePlayback)}>
              {togglePlayback ? (
                <FontAwesome5 name="pause" size={24} color="black" />
              ) : (
                <FontAwesome5 name="play" size={24} color="black" />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={() => setNewSong(data)}>
          <View className="flex-row justify-between items-center p-4">
            <View className="flex-row items-center">
              {/* <Image
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 2,
                  backgroundColor: '#0553',
                  marginHorizontal: 10
                }}
                source={data?.image?.[2]?.link}
                contentFit="cover"
                transition={1000}
              /> */}
              <View>
                <Text className={status === "playing" ? "text-green-500 font-medium text-lg" : "text-white font-medium text-lg"}>{data?.name}</Text>
                <Text className="text-sm font-medium text-gray-400">{data?.primaryArtists[0]?.name || 'Unknown'}</Text>
              </View>
            </View>
            <Entypo name="dots-three-horizontal" size={20} color="gray" />
          </View>
        </TouchableOpacity>
        <Text className="text-sm font-medium text-gray-400 px-4">
          1 Song • {Math.floor(data?.duration / 60)}min
        </Text>

        <Cards title={`More by ${data?.primaryArtists[0]?.name}`} data={contentData?.artistData?.songs?.slice(0, 5)} type='content' />
        <Cards title="You might also like" data={contentData?.recommendedSongs?.slice(0, 5)} type='content' />
        <Cards title="Related Albums" data={contentData?.artistData?.albums?.slice(0, 5)} type='content' />

        <Text className="text-sm font-medium text-gray-400 px-4">
          @{data?.label}
        </Text>
      </Animated.ScrollView>
    </SafeAreaView>
  )
}
