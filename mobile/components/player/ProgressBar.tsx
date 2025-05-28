import { Colors } from "@/constants/Colors";
import { View } from "react-native";

type ProgressBarProps = {
  progress: number;
};

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <View style={{ height: 4, backgroundColor: Colors.colors.background, width: '100%' }}>
      <View
        style={{
          height: 4,
          width: `${progress}%`,
          backgroundColor: Colors.colors.text,
        }}
      />
    </View>
  );
}
