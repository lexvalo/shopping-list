import React, { useState } from "react";
import { Alert, Button, StyleSheet, TextInput, View } from "react-native";

type Props = {
    onAdd: (name: string) => void;
};

export type AddItemFormProps = {
    onAdd: (name: string) => void;
};

export default function AddItemForm({ onAdd }: Props) {
    const [name, setName] = useState('');


    const handleAdd = () => {
        const trimmedName = name.trim();
        if (!trimmedName) {
            console.warn("Attempted to add empty item");
            Alert.alert("Please enter an item name.");
            return;
            }
        onAdd(trimmedName);
        setName('');
    };

    return (
        <View style={styles.container}>
            <TextInput 
                placeholder="What to buy"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <Button title="Add" onPress={handleAdd} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
        marginLeft: 3,
        marginRight: 3,
    },
    input: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
        fontFamily: 'Poppins_400Regular',
    },
});