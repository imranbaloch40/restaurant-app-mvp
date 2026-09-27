import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius, typography } from '../theme/theme';

export default function MenuItemCard({ item, onAdd }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={typography.h2} numberOfLines={1}>{item.name}</Text>
        <Text style={[typography.caption, styles.desc]} numberOfLines={2}>{item.desc}</Text>
        <View style={styles.bottomRow}>
          <Text style={typography.price}>${item.price.toFixed(2)}</Text>
          <TouchableOpacity style={styles.addBtn} onPress={() => onAdd(item)}>
            <Ionicons name="add" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    marginBottom: spacing.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  image: { width: 100, height: 100 },
  info: { flex: 1, padding: spacing.sm, justifyContent: 'space-between' },
  desc: { marginTop: 2 },
  bottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.xs },
  addBtn: {
    backgroundColor: colors.primary,
    width: 32,
    height: 32,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
