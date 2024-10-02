import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useCustomFonts } from '@/components/AllComponent/useCustomFonts/useCustomFonts';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.customFontText}>
        Hello Eatup Welcome
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customFontText: {
    fontFamily: 'Playfair', 
    fontSize: 24,
    color: '#000',
  },
});
