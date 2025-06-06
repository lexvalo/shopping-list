import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  UIManager,
  View,
} from 'react-native';
import AddItemForm from '../components/AddItemForm';
import ShoppingItem from '../components/ShoppingItem';

const STORAGE_KEY = '@shopping_list';

interface Item {
  id: string;
  name: string;
}

export default function HomeScreen() {
  const [items, setItems] = useState<Item[]>([
    { id: '1', name: 'Milk' },
    { id: '2', name: 'Bread' },
    { id: '3', name: 'Lemon' },
    { id: '4', name: 'Coffee' },
    { id: '5', name: 'Guinea pig' },
    { id: '6', name: 'Egg' },
    { id: '7', name: 'Potato' },
    { id: '8', name: 'Fish' },
    { id: '9', name: 'Rice' },
    { id: '10', name: 'Salt' },
  ]);

  const saveItems = async (itemsToSave: Item[]) => {
    try {
      const jsonValue = JSON.stringify(itemsToSave);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
      console.log('Saved to AsyncStorage:', itemsToSave);
    } catch (e) {
      console.error('Failed to save items', e);
    }
  };

  const loadItems = async (): Promise<Item[] | null> => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      console.log('Loaded from AsyncStorage:', jsonValue);
      return jsonValue ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error('Failed to load items', e);
      return null;
    }
  };

  const handleAddItem = (name: string) => {
    const newItem: Item = {
      id: Date.now().toString(),
      name,
    };
    setItems((prev) => [...prev, newItem]);
  };

  const handleDeleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental?.(true);
    }

    (async () => {
      const savedItems = await loadItems();
      if (savedItems && savedItems.length > 0) {
        setItems(savedItems);
      } else {
        console.log('Using initial items:', items);
      }
    })();
  }, []);

  useEffect(() => {
    saveItems(items);
  }, [items]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <View style={styles.innerContainer}>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ShoppingItem id={item.id} name={item.name} onDelete={handleDeleteItem} />
            )}
            ListHeaderComponent={
              <>
                <Text style={styles.title}>Shopping list 🛒</Text>
                <Text style={styles.title}></Text>
              </>
            }
            contentContainerStyle={styles.listContent}
            style={styles.flatList}
          />
          <View style={styles.formContainer}>
            <AddItemForm onAdd={handleAddItem} />
          </View>
        </View>
      </KeyboardAvoidingView>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F5F5',
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  flatList: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
  formContainer: {
    paddingVertical: 10,
    paddingBottom: Platform.OS === 'android' ? 20 : 10,
    backgroundColor: '#F0F5F5',
  },
  title: {
    fontSize: 34,
    textAlign: 'center',
    fontFamily: 'Poppins_600SemiBold',
    color: '#4B7F7F',
    paddingBottom: 16,
  },
});