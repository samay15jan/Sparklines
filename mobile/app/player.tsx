import React from 'react';
import { View, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { useAudioPlayback } from '@/hooks/useAudioPlayback';
import { Colors } from '@/constants/Colors';
import HeaderBar from '@/components/player/Header';
import ProgressBar from '@/components/player/ProgressBar';
import Background from '@/components/player/Background';
import SongCarousel from '@/components/player/Carousal';

type SongData = {
  id: string;
  data: any;
};

export default function Player() {
  const { currentSong, currentTime, duration, togglePlayPause } = useAudioPlayback();
  const [togglePlayback, setTogglePlayback] = React.useState(true);
  const [toggleLiked, setToggleLiked] = React.useState(false);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const router = useRouter();

  const progress = (duration && currentTime)
    ? Math.min(Math.max((currentTime / duration) * 100, 0), 100)
    : 0;

  const songsData: SongData[] = Array(6).fill(null).map((_, i) => ({
    id: `${i + 1}`,
    data: currentSong,
  }));

  React.useEffect(() => {
    if (!currentSong) return;

    if (togglePlayback) {
      togglePlayPause('play');
    } else {
      togglePlayPause('pause');
    }
  }, [togglePlayback]);

  return (
    <View style={{ flex: 1 }}>
      <Background url={currentSong?.image?.[0]?.link} />
      <View className="items-center justify-center" style={{ width: '100%', marginTop: 30 }}>
        <View style={{ height: 4, width: '20%', backgroundColor: Colors.colors.text, borderRadius: 20 }} />
        <HeaderBar router={router} currentSong={currentSong} />
        <ProgressBar progress={progress} />
        <SongCarousel
          scrollX={scrollX}
          songsData={songsData}
          currentSong={currentSong}
          togglePlayback={togglePlayback}
          setTogglePlayback={setTogglePlayback}
          toggleLiked={toggleLiked}
          setToggleLiked={setToggleLiked}
        />
      </View>
    </View>
  );
}
