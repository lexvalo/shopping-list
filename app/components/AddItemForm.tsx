import React, { useState } from 'react';
import { Alert, Keyboard, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface AddItemFormProps {
  onAdd: (name: string) => void;
}

export default function AddItemForm({ onAdd }: AddItemFormProps) {
  const [name, setName] = useState('');

  const handleAdd = () => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      console.warn('Attempted to add empty item');
      Alert.alert('Please enter an item name.');
      return;
    }
    onAdd(trimmedName);
    setName('');
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="What to buy"
        value={name}
        onChangeText={setName}
        style={styles.input}
        onSubmitEditing={handleAdd}
        blurOnSubmit={true}
        returnKeyType="done"
      />
      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 3,
    paddingVertical: 10,
    paddingBottom: Platform.OS === 'android' ? 20 : 10,
  },
  input: {
    flex: 3,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    fontFamily: 'OpenSans_400Regular',
    fontSize: 18,
    marginRight: 10,
  },
  button: {
    flex: 1,
    backgroundColor: '#4B7F7F',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    height: 44,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'OpenSans_600SemiBold',
  },
});