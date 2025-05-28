import React from "react";
import { Image } from "expo-image";
import { Animated as BasicAnimated, Text, TouchableWithoutFeedback, View } from "react-native";
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
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

export default function Card({ handleTap, scale, scaleAnim, opacity, showLiked, fadeAnim, translateY, likedIcon, item, currentSong, ITEM_WIDTH, SPACING }: any) {
  return (
    <TouchableWithoutFeedback onPress={handleTap}>
      <BasicAnimated.View
        style={{
          width: ITEM_WIDTH,
          marginRight: SPACING,
          height: 500,
          transform: [{ scale: BasicAnimated.multiply(scale, scaleAnim) }],
          opacity,
          alignItems: 'center',
        }}
      >
        <LikeHandler fadeAnim={fadeAnim} translateY={translateY} likedIcon={likedIcon} showLiked={showLiked} />
        <CustomImageStyle item={item?.data} />
        <HandleDetails currentSong={currentSong} />
      </BasicAnimated.View>
    </TouchableWithoutFeedback>
  )
}

function CustomImageStyle({ item }: any) {
  const rotate = useSharedValue(0);
  const [flipped, setFlipped] = React.useState(false);

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotation = interpolate(rotate.value, [0, 180], [0, 180]);
    return {
      transform: [{ rotateY: `${rotation}deg` }],
      backfaceVisibility: 'hidden',
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotation = interpolate(rotate.value, [0, 180], [180, 360]);
    return {
      transform: [{ rotateY: `${rotation}deg` }],
      position: 'absolute',
      top: 0,
      backfaceVisibility: 'hidden',
    };
  });

  const flipCard = () => {
    if (flipped) {
      rotate.value = withTiming(0, { duration: 400 });
    } else {
      rotate.value = withTiming(180, { duration: 400 });
    }
    setFlipped(!flipped);
  };

  const holdGesture = Gesture.LongPress()
    .minDuration(200)
    .onStart(() => {
      runOnJS(flipCard)();
    });

  return (
    <GestureDetector gesture={holdGesture}>
      <View >
        <Animated.View className='w-full h-full flex-row justify-center items-center z-4' style={[{ zIndex: 1 }, frontAnimatedStyle]}>
          <Image
            style={{
              width: '100%',
              height: '80%',
              borderRadius: 12,
              backgroundColor: '#0553',
            }}
            source={{
              uri: item?.image?.[2]?.link || 'https://picsum.photos/seed/696/3000/2000',
            }}
            contentFit="cover"
            transition={500}
          />
        </Animated.View>
        <Animated.View className='w-full h-full flex-row justify-center items-center z-2' style={[backAnimatedStyle]}>
          <Image
            style={{
              width: '100%',
              height: '80%',
              borderRadius: 12,
              backgroundColor: '#0553',
            }}
            source={{
              uri: item?.image?.[2]?.link || 'https://picsum.photos/seed/696/3000/2000',
            }}
            contentFit="cover"
            transition={500}
          />
          <BlurView
            className='absolute'
            style={{
              width: '100%',
              height: '80%',
              borderRadius: 12,
            }}
            intensity={40}
          />
          <View className="absolute text-center max-w-full h-full justify-center items-center flex-col">
            <Text className="text-white">{item?.name}</Text>
            <Text className="text-white">{item?.primaryArtists}</Text>
            <Text className="text-white">{item?.album?.name}</Text>
            <Text className="text-white">{item?.label}</Text>
            <Text className="text-white">{item?.year}</Text>
          </View>
        </Animated.View>
      </View>
    </GestureDetector>
  )
}

function LikeHandler({ fadeAnim, translateY, likedIcon, showLiked }: any) {
  return (
    <>
      {showLiked && (
        <BasicAnimated.View
          className="absolute z-10 justify-center items-center w-full h-full"
          style={{
            opacity: fadeAnim,
            transform: [{ translateY }],
          }}
        >
          <Ionicons
            name={likedIcon}
            size={55}
            color='red'
          />
        </BasicAnimated.View>
      )}
    </>
  )
}

function HandleDetails({ currentSong }: any) {
  return (
    <View style={{ marginVertical: 10 }}>
      <Text className="text-white text-center text-2xl font-semibold">
        {currentSong?.name || 'Track Name'}
      </Text>
      <Text className="text-white text-center text-lg">
        {currentSong?.primaryArtists || 'Artist'}
      </Text>
    </View>
  )
}
