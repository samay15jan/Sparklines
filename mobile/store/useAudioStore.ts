import { create } from 'zustand';

type Song = any;

type AudioStore = {
  currentSong: Song | null;
  currentTime: number;
  duration: number;
  setCurrentSong: (song: Song) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
};

export const useAudioStore = create<AudioStore>((set) => ({
  currentSong: null,
  currentTime: 0,
  duration: 0,
  setCurrentSong: (song) => set({ currentSong: song }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) =>
    set((state) => ({
      duration: state.duration || duration,
    })),
}));
