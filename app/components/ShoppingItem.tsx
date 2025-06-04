import { MaterialIcons } from '@expo/vector-icons';
import React, { useRef } from "react";
import { Animated, StyleSheet, Text, TouchableOpacity } from "react-native";

interface ShoppingItemProps {
    id: string;
    name: string;
    onDelete: (id: string) => void;
}

export const ShoppingItem: React.FC<ShoppingItemProps> = ({ id, name, onDelete }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const opacityAnim = useRef(new Animated.Value(1)).current;

    const handlePress = () => {
        Animated.parallel([
            Animated.timing(scaleAnim, {
                toValue: 0.6,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start(() => {
            onDelete(id);
        });
    };

    return (
        <Animated.View style={[styles.item, {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim
        }]}>
            <Text style={styles.name}>{name}</Text>
            <TouchableOpacity onPress={handlePress} style={styles.button}>
                <MaterialIcons name="close" size={32} color="grey" />
            </TouchableOpacity>
        </Animated.View>
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
        fontFamily: 'Poppins_400Regular',
        marginLeft: 4,
    },
    button: {
        marginLeft: 12,
    },
});