import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { gethomepageData } from '@/hooks/api';
import { useEffect, useState } from 'react';
import { Artists } from '@/components/ui/Artists';
import Cards from '@/components/ui/Cards';

type HomePageData = {
  songs: any[];
  albums: any[];
  charts: any[];
};

export default function HomeScreen() {
  const [homePageData, setHomepageData] = useState<HomePageData>({ songs: [], albums: [], charts: [] });

  useEffect(() => {
    async function getData() {
      const data: any = await gethomepageData()
      if (!data) return
      const response = {
        songs: data?.response?.trending?.songs?.slice(0, 10) || [],
        albums: data?.response?.albums?.slice(0, 10) || [],
        charts: data?.response?.charts?.slice(0, 10) || []
      }
      setHomepageData(response)
    }

    getData()
  }, [])

  return (
    <SafeAreaView className='w-full h-full'>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className='flex-row py-4 justify-between items-center px-[24px]'>
          <View className='flex-row gap-4'>
            <TouchableOpacity>
              <Image
                className='w-14 h-14 rounded-full'
                source={require('@/assets/images/profile-logo.png')}
              />
            </TouchableOpacity>
            <View className='flex-grid'>
              <Text className="font-bold text-white text-2xl">Hi Samay</Text>
              <Text className="font-medium text-white text-md opacity-60">Welcome Back !</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={26} color="white" />
          </TouchableOpacity>
        </View>
        <View className='py-2 px-[24px]'>
          <TouchableOpacity>
            <Text className="font-bold text-white text-xl">Following Artists</Text>
          </TouchableOpacity>
          <Artists touchableStyle='flex-row gap-4 py-2' imageStyle='w-20 h-20 rounded-full' data={null} />
        </View>

        <Cards title='Top 10' data={homePageData?.songs} />
        <Cards title='Albums' data={homePageData?.albums} />
        <Cards title='Charts' data={homePageData?.charts} />
      </ScrollView>
    </SafeAreaView >
  );
}