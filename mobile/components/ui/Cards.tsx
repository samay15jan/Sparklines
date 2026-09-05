import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function Cards({ title, data }: any) {
  const router = useRouter()
  return (
    <View className="py-4">
      <Text className="px-[24px] mb-2 font-bold text-white text-xl">{title}</Text>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal className='px-[24px] flex-row'>
        {data?.map((item: any) => (
          <TouchableOpacity
            className='gap-2'
            key={item?.id}
            onPress={() => router.push({
              pathname: '/content',
              params: { baseSongData: JSON.stringify(item) },
            })}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                borderRadius: 8,
                backgroundColor: '#0553',
                marginHorizontal: 10
              }}
              source={item?.image?.[2]?.link}
              placeholder={{ blurhash }}
              contentFit="cover"
              transition={1000}
            />
            <Text className="font-medium text-white text-md opacity-60">
              {item?.name?.slice(0, 20) || item?.title?.slice(0, 20)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View >
  );
}
