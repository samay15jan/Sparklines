import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  runOnJS,
  interpolate,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { gethomepageData } from '@/hooks/api';
import { Artists } from '@/components/ui/Artists';
import Cards from '@/components/ui/Cards';
import PullToSearch from '@/components/Search';
import { useRouter } from 'expo-router';

const INITIAL_INPUT_Y = -50;
const DELAY_RESET = 2000;

function clamp(value: number, lower: number, upper: number): number {
  'worklet';
  return Math.min(Math.max(value, lower), upper);
}

type HomePageData = {
  songs: any[];
  albums: any[];
  charts: any[];
};

export default function HomeScreen() {
  const router = useRouter()
  const [homePageData, setHomepageData] = React.useState<HomePageData>({
    songs: [],
    albums: [],
    charts: [],
  });

  const [isPanEnabled, setIsPanEnabled] = React.useState(true);
  const inputTranslateY = useSharedValue(INITIAL_INPUT_Y);
  const scrollTranslateY = useSharedValue(0);

  React.useEffect(() => {
    async function getData() {
      const data: any = await gethomepageData();
      if (!data) return;
      const response = {
        songs: data?.response?.trending?.songs?.slice(0, 10) || [],
        albums: data?.response?.albums?.slice(0, 10) || [],
        charts: data?.response?.charts?.slice(0, 10) || [],
      };
      setHomepageData(response);
    }

    getData();
  }, []);

  const scrollHandler = useAnimatedScrollHandler({
    onBeginDrag: ({ contentOffset }) => {
      if (contentOffset.y > 0) runOnJS(setIsPanEnabled)(false);
      else runOnJS(setIsPanEnabled)(true);
    },
    onEndDrag: ({ contentOffset }) => {
      if (contentOffset.y === 0) runOnJS(setIsPanEnabled)(true);
    },
    onMomentumEnd: ({ contentOffset }) => {
      if (contentOffset.y === 0) runOnJS(setIsPanEnabled)(true);
    },
  });

  const panGesture = Gesture.Pan()
    .minPointers(2)
    .enabled(isPanEnabled)
    .onUpdate(({ translationY }) => {
      const clamped = clamp(translationY, 0, -INITIAL_INPUT_Y);
      inputTranslateY.value = interpolate(
        clamped,
        [0, -INITIAL_INPUT_Y],
        [INITIAL_INPUT_Y, 0]
      );
      scrollTranslateY.value = clamped;
    })

  const inputAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: inputTranslateY.value }],
  }));

  const scrollAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: scrollTranslateY.value }],
  }));

  const composedGestures = Gesture.Simultaneous(
    panGesture,
    Gesture.Native()
  );

  return (
    <GestureDetector gesture={composedGestures}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#111' }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}
        >
          <PullToSearch inputAnimatedStyle={inputAnimatedStyle} />
          <Animated.ScrollView
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            style={[{ flex: 1, backgroundColor: '#111' }, scrollAnimatedStyle]}
          >
            <View className="flex-row py-4 justify-between items-center px-[24px]">
              <View className="flex-row gap-4">
                <TouchableOpacity onPress={() => router.navigate('/setting')}>
                  <Image
                    className="w-14 h-14 rounded-full"
                    source={require('@/assets/images/profile-logo.png')}
                  />
                </TouchableOpacity>
                <View className="flex-grid">
                  <Text className="font-bold text-white text-2xl">Hi Samay</Text>
                  <Text className="font-medium text-white text-md opacity-60">Welcome Back !</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Ionicons name="notifications-outline" size={26} color="white" />
              </TouchableOpacity>
            </View>

            <View className="py-2 px-[24px]">
              <TouchableOpacity>
                <Text className="font-bold text-white text-xl">Following Artists</Text>
              </TouchableOpacity>
              <Artists
                touchableStyle="flex-row gap-4 py-2"
                imageStyle="w-20 h-20 rounded-full"
                data={null}
              />
            </View>
            <Cards title="Top 10" data={homePageData?.songs} />
            <Cards title="Albums" data={homePageData?.albums} />
            <Cards title="Charts" data={homePageData?.charts} />
          </Animated.ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </GestureDetector>
  );
}
