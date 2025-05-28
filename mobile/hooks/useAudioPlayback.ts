import { useEffect, useRef } from 'react';
import { useAudioPlayer, setAudioModeAsync } from 'expo-audio';
import { getSongDetails } from "@/hooks/api";
import { useAudioStore } from "@/store/useAudioStore";

export function useAudioPlayback() {
  const player = useAudioPlayer();

  useEffect(() => {
    setAudioModeAsync({
      playsInSilentMode: true,
      shouldPlayInBackground: false,
    });
  }, []);

  const currentSong = useAudioStore((state) => state.currentSong);
  const currentTime = useAudioStore((state) => state.currentTime);
  const duration = useAudioStore((state) => state.duration);
  const status = useAudioStore((state) => state.status);
  const setCurrentSong = useAudioStore((state) => state.setCurrentSong);
  const setCurrentTime = useAudioStore((state) => state.setCurrentTime);
  const setDuration = useAudioStore((state) => state.setDuration);
  const setStatus = useAudioStore((state) => state.setStatus);

  const prevCurrentTime = useRef(currentTime);
  const rafId = useRef<number>(-1);

  useEffect(() => {
    const updateCurrentTime = () => {
      const time = player.currentTime ?? 0;

      if (Math.abs(time - prevCurrentTime.current) > 0.01) {
        setCurrentTime(time);
        prevCurrentTime.current = time;
      }

      rafId.current = requestAnimationFrame(updateCurrentTime);
    };

    rafId.current = requestAnimationFrame(updateCurrentTime);

    return () => {
      cancelAnimationFrame(rafId.current);
    };
  }, [player]);

  const setNewSong = async (song: any) => {
    try {
      const response = await getSongDetails(song?.id);
      const audioSource = response?.data?.[0]?.downloadUrl?.[4]?.link;

      if (response?.status === 'SUCCESS' && audioSource) {
        setCurrentSong(response.data[0]);
        player.replace(audioSource);
        player.play()

        setTimeout(() => {
          const dur = player.duration ?? 0;
          if (dur > 0) setDuration(dur);
        }, 500);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!player) return;
  
    const controlPlayback = () => {
      try {
        if (status === 'paused') {
           player.pause();
        } else if (status === 'playing') {
           player.play();
        }
      } catch (err) {
        console.error('Playback control failed:', err);
      }
    };
  
    controlPlayback();
  }, [status, player]);
  

  const togglePlayPause =  (action: 'play' | 'pause') => {
    if (!player || !currentSong) return;

    if (action === 'pause') {
      setStatus("paused");
    }
    if (action === 'play') {
      setStatus("playing");
    }
  };

  return {
    currentSong,
    currentTime,
    duration,
    status,
    setNewSong,
    togglePlayPause,
  };
}