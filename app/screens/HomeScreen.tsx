import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from 'react-native';
import AddItemForm from '../components/AddItemForm';
import { ShoppingItem } from '../components/ShoppingItem';

export default function HomeScreen() {
  const [items, setItems] = useState<{ id: string; name: string }[]>([
    { id: '1', name: 'Maito' },
    { id: '2', name: 'Leipä' },
    { id: '3', name: 'Sitruuna' },
  ]);

  const handleAddItem = (name: string) => {
    const newItem = {
      id: Date.now().toString(),
      name,
    };
    setItems((prev) => [newItem, ...prev]);
  };

  const handleDeleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }

  return (
    <View style={styles.container}>
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
            <AddItemForm onAdd={handleAddItem} />
          </>
        }
      />
      <StatusBar style="dark" />
    </View>
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
    fontSize: 28,
    fontFamily: 'Poppins_600SemiBold',
    color: '#4B7F7F',
    paddingBottom: 20,
  },
});