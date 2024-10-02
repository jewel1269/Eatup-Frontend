import { useFonts } from 'expo-font';

export const useCustomFonts = () => {
  const [fontsLoaded] = useFonts({
    'Playfair': require('../../../assets/fonts/PlayfairDisplay-Regular.ttf'),
  });

  return fontsLoaded;
};
