import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius, typography } from '../theme/theme';

export default function CartItemRow({ item, onIncrease, onDecrease, onNotesChange, onRemove }) {
  const [showNotes, setShowNotes] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={{ flex: 1 }}>
          <Text style={typography.h2} numberOfLines={1}>{item.name}</Text>
          <Text style={typography.caption}>${item.price.toFixed(2)} each</Text>
        </View>
        <TouchableOpacity onPress={() => onRemove(item.id)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons name="trash-outline" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomRow}>
        <View style={styles.qtyControls}>
          <TouchableOpacity style={styles.qtyBtn} onPress={() => onDecrease(item.id)}>
            <Ionicons name="remove" size={16} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.qtyText}>{item.qty}</Text>
          <TouchableOpacity style={styles.qtyBtn} onPress={() => onIncrease(item.id)}>
            <Ionicons name="add" size={16} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => setShowNotes((s) => !s)} style={styles.noteToggle}>
          <Ionicons name="create-outline" size={16} color={colors.textSecondary} />
          <Text style={styles.noteToggleText}>{item.notes ? 'Edit note' : 'Add note'}</Text>
        </TouchableOpacity>

        <Text style={typography.price}>${(item.price * item.qty).toFixed(2)}</Text>
      </View>

      {showNotes && (
        <TextInput
          style={styles.notesInput}
          placeholder="e.g. no onions, extra spicy..."
          placeholderTextColor={colors.textSecondary}
          value={item.notes}
          onChangeText={(text) => onNotesChange(item.id, text)}
          multiline
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  bottomRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: spacing.sm },
  qtyControls: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.muted, borderRadius: radius.pill, paddingHorizontal: 4, paddingVertical: 2 },
  qtyBtn: { width: 24, height: 24, alignItems: 'center', justifyContent: 'center' },
  qtyText: { minWidth: 20, textAlign: 'center', fontWeight: '700', color: colors.textPrimary },
  noteToggle: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  noteToggleText: { fontSize: 12, color: colors.textSecondary, marginLeft: 4 },
  notesInput: {
    marginTop: spacing.sm,
    backgroundColor: colors.background,
    borderRadius: radius.sm,
    padding: spacing.sm,
    fontSize: 13,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 40,
  },
});
