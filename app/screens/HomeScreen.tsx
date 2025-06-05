import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { FlatList, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableWithoutFeedback, UIManager, View } from 'react-native';
import AddItemForm from '../components/AddItemForm';
import { ShoppingItem } from '../components/ShoppingItem';

const STORAGE_KEY = '@shopping_list';

export default function HomeScreen() {
  const [items, setItems] = useState<{ id: string; name: string }[]>([
    { id: '1', name: 'Maito' },
    { id: '2', name: 'Leipä' },
    { id: '3', name: 'Sitruuna' },
  ]);

  const saveItems = async (itemsToSave: { id: string; name: string }[]) => {
    try {
      const jsonValue = JSON.stringify(itemsToSave);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (e) {
      console.error("Failed to save items", e);
    }
  };

  const loadItems = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error("Failed to load items", e);
      return null;
    }
  };


  const handleAddItem = (name: string) => {
    const newItem = {
      id: Date.now().toString(),
      name,
    };
    setItems((prev) => [...prev, newItem]);
  };

  const handleDeleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }

  React.useEffect(() => {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental?.(true);
    }
    
    (async () => {
      const savedItems = await loadItems();
      if (savedItems) {
        setItems(savedItems);
      }
    })();
  }, []);

  React.useEffect(() => {
    saveItems(items);
  }, [items]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          if (Platform.OS !== 'web') {
            Keyboard.dismiss();
          }
        }}
      >
        <View style={styles.container}>
          <View style={{ flex: 1 }}>
            <FlatList 
              data={items}
              keyExtractor={item => item.id}
              renderItem={({ item }) => 
                <ShoppingItem
                  id={item.id} 
                  name={item.name}
                  onDelete={handleDeleteItem}  
                />}
              ListHeaderComponent={
                <>
                  <Text style={styles.title}>Shopping list 🛒</Text>
                  <Text style={styles.title}></Text>
                </>
              }
              contentContainerStyle={{ paddingBottom: 80 }}
            />
          </View>
          <AddItemForm onAdd={handleAddItem} />
          <StatusBar style="dark" />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F5F5',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 34,
    textAlign: 'center',
    fontFamily: 'Poppins_600SemiBold',
    color: '#4B7F7F',
    paddingBottom: 16,
  },
});