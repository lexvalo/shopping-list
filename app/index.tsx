import React from "react";
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import { Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7D9D9C"/>
      </View>
    );
  }

  return (
    <View style={styles.container}>
        <Text style={styles.title}>🛒 Shopping list</Text>
        <StatusBar style="dark"/>
    </View>
  );
}

const styles = StyleSheet.create({
  loadindContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F5F5',
  },
  container: {
    flex: 1,
    backgroundColor: '#F0F5F5',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins_600SemiBold',
    color: '#4B7F7F',
  }
})