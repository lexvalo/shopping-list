import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

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
            <TouchableOpacity style={styles.button} onPress={handleAdd}>
                <Text style={styles.buttonText}>Add</Text> 
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
        marginLeft: 3,
        marginRight: 3,
        display: 'flex',
        flexDirection: 'row'
    },
    input: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
        fontFamily: 'Poppins_400Regular',
        flex: 4,
        marginRight: 16
    },
    button: {
        flex: 1,
        backgroundColor: "#4B7F7F",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 22,
        height: 48
    },
    buttonText: {
        color: 'white',
    }
});