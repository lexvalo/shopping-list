import { MaterialIcons } from '@expo/vector-icons';
import React, { useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ShoppingItemProps {
  id: string;
  name: string;
  onDelete: (id: string) => void;
}

export default function ShoppingItem({ id, name, onDelete }: ShoppingItemProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0.6,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDelete(id);
    });
  };

  return (
    <Animated.View
      style={[
        styles.item,
        {
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        },
      ]}
    >
      <Text
        style={styles.name}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {name}
      </Text>
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <MaterialIcons name="close" size={32} color="grey" />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  name: {
    flex: 1,
    fontSize: 22,
    fontFamily: 'OpenSans_400Regular',
    marginLeft: 4,
    marginRight: 8,
  },
  button: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});