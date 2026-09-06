import React from "react";
import useHandleTaps from '@/hooks/useHandleTaps';
import {
  Animated,
  Dimensions,
} from 'react-native';
import Card from "./Card";

type SongData = {
  id: string;
  data: any;
};

type SongCarouselProps = {
  scrollX: Animated.Value;
  songsData: SongData[];
  currentSong: any;
  togglePlayback: boolean;
  setTogglePlayback: React.Dispatch<React.SetStateAction<boolean>>;
  toggleLiked: boolean;
  setToggleLiked: React.Dispatch<React.SetStateAction<boolean>>;
};

const { width: screenWidth } = Dimensions.get('window');
const ITEM_WIDTH = screenWidth * 0.6;
const SPACING = 20;

export default function SongCarousel({ scrollX, songsData, currentSong, setTogglePlayback, toggleLiked, setToggleLiked }: SongCarouselProps) {
  const [showLiked, setShowLiked] = React.useState(false)
  const [likedIcon, setLikedIcon] = React.useState<'heart' | 'heart-dislike'>('heart');

  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const translateY = React.useRef(new Animated.Value(0)).current;

  const onSingleTap = () => {
    setTogglePlayback(prev => {
      const next = !prev;
      Animated.spring(scaleAnim, {
        toValue: next ? 1 : 0.8,
        useNativeDriver: true,
      }).start();
      return next;
    });
  };

  const onDoubleTap = () => {
    setToggleLiked(prev => !prev);
  };

  const handleTap = useHandleTaps(onSingleTap, onDoubleTap);

  React.useEffect(() => {
    setShowLiked(true);
    setLikedIcon(toggleLiked ? 'heart' : 'heart-dislike');

    fadeAnim.setValue(0);
    translateY.setValue(0);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -50,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setShowLiked(false);
      });
    });
  }, [toggleLiked]);

  return (
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
          <Card
            handleTap={handleTap}
            scale={scale}
            scaleAnim={scaleAnim}
            opacity={opacity}
            showLiked={showLiked}
            fadeAnim={fadeAnim}
            translateY={translateY}
            likedIcon={likedIcon}
            item={item}
            currentSong={currentSong}
            SPACING={SPACING}
            ITEM_WIDTH={ITEM_WIDTH}
          />
        );
      }}
    />
  );
}
