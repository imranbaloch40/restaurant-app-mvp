import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../context/CartContext';
import { colors, spacing, radius, typography } from '../../theme/theme';

export default function OrderSummaryScreen({ navigation }) {
  const { items, orderType, setOrderType, subtotal, discount, tax, total, promo, placeOrder, clearCart } = useCart();

  function handleConfirm() {
    placeOrder();
    navigation.navigate('OrderTracking');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={typography.h1}>Order Summary</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionLabel}>Order Type</Text>
        <View style={styles.toggleRow}>
          <ToggleOption
            label="Dine-in"
            icon="restaurant-outline"
            active={orderType === 'Dine-in'}
            onPress={() => setOrderType('Dine-in')}
          />
          <ToggleOption
            label="Takeaway"
            icon="bag-handle-outline"
            active={orderType === 'Takeaway'}
            onPress={() => setOrderType('Takeaway')}
          />
        </View>

        <Text style={styles.sectionLabel}>Items ({items.length})</Text>
        <View style={styles.card}>
          {items.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <Text style={typography.body} numberOfLines={1}>
                {item.qty}x {item.name}
              </Text>
              <Text style={typography.body}>${(item.price * item.qty).toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionLabel}>Payment Details</Text>
        <View style={styles.card}>
          <Row label="Subtotal" value={subtotal} />
          {promo && <Row label={`Discount (${promo.code})`} value={-discount} highlight />}
          <Row label="Tax" value={tax} />
          <View style={styles.divider} />
          <Row label="Total" value={total} bold />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
          <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
          <Text style={styles.confirmBtnText}>Confirm & Place Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function ToggleOption({ label, icon, active, onPress }) {
  return (
    <TouchableOpacity style={[styles.toggle, active && styles.toggleActive]} onPress={onPress}>
      <Ionicons name={icon} size={20} color={active ? '#fff' : colors.textPrimary} />
      <Text style={[styles.toggleLabel, active && { color: '#fff' }]}>{label}</Text>
    </TouchableOpacity>
  );
}

function Row({ label, value, bold, highlight }) {
  return (
    <View style={styles.itemRow}>
      <Text style={[typography.body, bold && { fontWeight: '700' }]}>{label}</Text>
      <Text style={[typography.body, bold && { fontWeight: '700', fontSize: 17 }, highlight && { color: colors.success }]}>
        {value < 0 ? '-' : ''}${Math.abs(value).toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: spacing.md, paddingTop: spacing.sm },
  content: { padding: spacing.md },
  sectionLabel: { ...typography.caption, textTransform: 'uppercase', marginBottom: spacing.xs, marginTop: spacing.md, letterSpacing: 0.5 },
  toggleRow: { flexDirection: 'row', gap: spacing.sm },
  toggle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  toggleActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  toggleLabel: { fontWeight: '700', color: colors.textPrimary, marginLeft: spacing.xs },
  card: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, borderWidth: 1, borderColor: colors.border },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.xs },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.xs },
  footer: { padding: spacing.md, borderTopWidth: 1, borderColor: colors.border, backgroundColor: colors.surface },
  confirmBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  confirmBtnText: { color: '#fff', fontWeight: '700', fontSize: 15, marginLeft: spacing.xs },
});
