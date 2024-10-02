import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Convert percentage to width and height based on screen size
export const wp = (percentage:any) => {
  return (width * percentage) / 100;
};

export const hp = (percentage:any) => {
  return (height * percentage) / 100;
};
