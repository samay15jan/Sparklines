import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ArtistScreen() {
  const { artistData }: any = useLocalSearchParams();
  const data = JSON.parse(artistData)

  return (
    <SafeAreaView>
      <Text className="text-white">{data?.name}</Text>
    </SafeAreaView>
  )
}
