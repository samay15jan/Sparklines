import { Image, Text, TouchableOpacity, View } from 'react-native';

export function Artists({ touchableStyle, imageStyle, imageUrl, primaryTextStyle, primaryText, data }: any) {
  return (
    <TouchableOpacity className={touchableStyle}>
      {/* <Image
        className={imageStyle}
        source={require(imageUrl)}
      />
      <Text className={primaryTextStyle}>{primaryText}</Text> */}
    </TouchableOpacity>
  );
}
