import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';

export default function Background({ url }: any) {

  return (
    <>
      <Image
        style={{ position: 'absolute', width: '100%', height: '100%', }}
        source={{ uri: url || 'https://picsum.photos/seed/696/3000/2000' }}
        contentFit="cover"
      />
      <BlurView className='absolute' style={{ width: '100%', height: '100%' }} intensity={100} />
    </>
  )
}