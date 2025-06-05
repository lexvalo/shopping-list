import { OpenSans_400Regular } from '@expo-google-fonts/open-sans';
import { Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { useFonts } from 'expo-font';
import React from "react";
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';

export default function App() {
  const [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7D9D9C" />
      </View>
    );
  }

  return <HomeScreen />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F5F5',
  },
});
