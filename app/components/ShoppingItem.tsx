import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ShoppingItemProps {
    name: string;
}

export const ShoppingItem: React.FC<ShoppingItemProps> = ({ name }) => {
    return (
        <View style={styles.item}>
            <Text style={styles.name} testID="item-name">{name}</Text>
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
    },
    name: {
        fontSize: 18,
        fontFamily: 'Poppins_400Regular'
    },
});