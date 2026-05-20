import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function StarRating({ value = 0, onChange, size = 32, disabled = false }) {
  return (
    <View style={styles.row}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity
          key={star}
          disabled={disabled}
          onPress={() => onChange(star)}
          style={styles.starBtn}
          accessibilityLabel={`${star} estrela${star > 1 ? 's' : ''}`}
        >
          <FontAwesome
            name={star <= value ? 'star' : 'star-o'}
            size={size}
            color={star <= value ? '#770B1C' : '#ccc'}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 4,
  },
  starBtn: {
    padding: 4,
  },
});
