import { MaterialIcons } from '@expo/vector-icons';
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ShoppingItemProps {
    id: string;
    name: string;
    onDelete: (id: string) => void;
}

export const ShoppingItem: React.FC<ShoppingItemProps> = ({ id, name, onDelete }) => {
    return (
        <View style={styles.item}>
            <Text style={styles.name} testID="item-name">{name}</Text>
            <TouchableOpacity onPress={() => onDelete(id)} style={styles.button}>
                <MaterialIcons name="close" size={32} color="grey"/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
    },
    name: {
        fontSize: 18,
        fontFamily: 'Poppins_400Regular'
    },
    button: {
        marginLeft: 12,
    },
});