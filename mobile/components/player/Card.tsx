import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated as RNAnimated,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import {
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';

export default function Card({
  handleTap,
  scale,
  scaleAnim,
  opacity,
  showLiked,
  fadeAnim,
  translateY,
  likedIcon,
  item,
  currentSong,
  ITEM_WIDTH,
  SPACING,
}: any) {
  return (
    <TouchableWithoutFeedback onPress={handleTap}>
      <RNAnimated.View
        style={{
          width: ITEM_WIDTH,
          marginRight: SPACING,
          height: 500,
          transform: [{ scale: RNAnimated.multiply(scale, scaleAnim) }],
          opacity,
          alignItems: 'center',
        }}
      >
        <LikeHandler
          fadeAnim={fadeAnim}
          translateY={translateY}
          likedIcon={likedIcon}
          showLiked={showLiked}
        />
        <CustomImageStyle item={item?.data} />
        <HandleDetails currentSong={currentSong} />
      </RNAnimated.View>
    </TouchableWithoutFeedback>
  );
}

function CustomImageStyle({ item }: any) {
  const rotate = useSharedValue(0);
  const [flipped, setFlipped] = useState(false);

  const frontStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(rotate.value, [0, 180], [0, 180]);
    return {
      transform: [{ rotateY: `${rotateY}deg` }],
      backfaceVisibility: 'hidden',
    };
  });

  const backStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(rotate.value, [0, 180], [180, 360]);
    return {
      transform: [{ rotateY: `${rotateY}deg` }],
      backfaceVisibility: 'hidden',
      position: 'absolute',
      top: 0,
      left: 0,
    };
  });

  const flipCard = () => {
    rotate.value = withTiming(flipped ? 0 : 180, { duration: 400 });
    runOnJS(setFlipped)(!flipped);
  };

  const longPress = Gesture.LongPress().minDuration(200).onStart(() => {
    runOnJS(flipCard)();
  });

  const imageUri = item?.image?.[2]?.link || 'https://picsum.photos/seed/696/3000/2000';

  return (
    <GestureDetector gesture={longPress}>
      <View
        style={{
          paddingTop: 40,
          width: '100%',
          height: '80%',
          position: 'relative',
        }}
      >
        {/* Front */}
        <Animated.View style={[frontStyle, { width: '100%', height: '100%' }]}>
          <Image
            source={{ uri: imageUri }}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 12,
              resizeMode: 'cover',
              backgroundColor: '#ccc',
            }}
          />
        </Animated.View>

        {/* Back */}
        <Animated.View style={[backStyle, { width: '100%', height: '100%', marginTop: 40, }]}>
          <Image
            source={{ uri: imageUri }}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 12,
              resizeMode: 'cover',
              backgroundColor: '#ccc',
            }}
          />
          <BlurView
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: 12,
            }}
            intensity={40}
          />
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 10,
            }}
          >
            <Text style={{ color: '#fff' }}>{item?.name}</Text>
            <Text style={{ color: '#fff' }}>{item?.primaryArtists}</Text>
            <Text style={{ color: '#fff' }}>{item?.album?.name}</Text>
            <Text style={{ color: '#fff' }}>{item?.label}</Text>
            <Text style={{ color: '#fff' }}>{item?.year}</Text>
          </View>
        </Animated.View>
      </View>
    </GestureDetector>
  );
}

function LikeHandler({ fadeAnim, translateY, likedIcon, showLiked }: any) {
  if (!showLiked) return null;

  return (
    <RNAnimated.View
      style={{
        position: 'absolute',
        zIndex: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        opacity: fadeAnim,
        transform: [{ translateY }],
      }}
    >
      <Ionicons name={likedIcon} size={55} color="red" />
    </RNAnimated.View>
  );
}

function HandleDetails({ currentSong }: any) {
  const router = useRouter();
  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={{ color: '#fff', fontSize: 20, fontWeight: '600', textAlign: 'center' }}>
        {currentSong?.name || 'Track Name'}
      </Text>
      <TouchableOpacity onPress={() => router.navigate('/artist')}>
        <Text style={{ color: '#fff', fontSize: 16, textAlign: 'center' }}>
          {currentSong?.primaryArtists || 'Artist'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
