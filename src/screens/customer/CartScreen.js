import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CartItemRow from '../../components/CartItemRow';
import { useCart } from '../../context/CartContext';
import { colors, spacing, radius, typography } from '../../theme/theme';

export default function CartScreen({ navigation }) {
  const { items, updateQty, updateNotes, removeItem, promo, applyPromo, subtotal, discount, tax, total } = useCart();
  const [promoInput, setPromoInput] = useState('');
  const [promoMsg, setPromoMsg] = useState('');

  function handleApplyPromo() {
    if (!promoInput.trim()) return;
    const ok = applyPromo(promoInput);
    setPromoMsg(ok ? 'Promo applied!' : 'Invalid code.');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={typography.h1}>Your Cart</Text>
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="cart-outline" size={48} color={colors.textSecondary} />
          <Text style={[typography.body, { marginTop: spacing.sm }]}>Your cart is empty.</Text>
          <TouchableOpacity style={styles.browseBtn} onPress={() => navigation.navigate('Menu')}>
            <Text style={styles.browseBtnText}>Browse Menu</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(i) => i.id}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <CartItemRow
                item={item}
                onIncrease={(id) => updateQty(id, 1)}
                onDecrease={(id) => updateQty(id, -1)}
                onNotesChange={updateNotes}
                onRemove={removeItem}
              />
            )}
          />

          <View style={styles.summaryPanel}>
            <View style={styles.promoRow}>
              <TextInput
                style={styles.promoInput}
                placeholder="Promo code (try SAVE10)"
                placeholderTextColor={colors.textSecondary}
                value={promoInput}
                onChangeText={setPromoInput}
                autoCapitalize="characters"
              />
              <TouchableOpacity style={styles.applyBtn} onPress={handleApplyPromo}>
                <Text style={styles.applyBtnText}>Apply</Text>
              </TouchableOpacity>
            </View>
            {!!promoMsg && (
              <Text style={[typography.caption, { color: promo ? colors.success : colors.warning, marginBottom: spacing.xs }]}>
                {promoMsg}
              </Text>
            )}

            <Row label="Subtotal" value={subtotal} />
            {promo && <Row label={`Discount (${promo.code})`} value={-discount} highlight />}
            <Row label="Tax (8%)" value={tax} />
            <View style={styles.divider} />
            <Row label="Total" value={total} bold />

            <TouchableOpacity style={styles.checkoutBtn} onPress={() => navigation.navigate('OrderSummary')}>
              <Text style={styles.checkoutBtnText}>Proceed to Order Summary</Text>
              <Ionicons name="arrow-forward" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

function Row({ label, value, bold, highlight }) {
  return (
    <View style={styles.row}>
      <Text style={[typography.body, bold && { fontWeight: '700' }]}>{label}</Text>
      <Text
        style={[
          typography.body,
          bold && { fontWeight: '700', fontSize: 17 },
          highlight && { color: colors.success },
        ]}
      >
        {value < 0 ? '-' : ''}${Math.abs(value).toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: spacing.md, paddingTop: spacing.sm },
  listContent: { padding: spacing.md, paddingBottom: spacing.sm },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.lg },
  browseBtn: { marginTop: spacing.md, backgroundColor: colors.primary, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: radius.pill },
  browseBtnText: { color: '#fff', fontWeight: '700' },
  summaryPanel: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    padding: spacing.md,
    borderTopWidth: 1,
    borderColor: colors.border,
  },
  promoRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.sm },
  promoInput: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.textPrimary,
  },
  applyBtn: { backgroundColor: colors.secondary, borderRadius: radius.sm, paddingHorizontal: spacing.md, justifyContent: 'center' },
  applyBtnText: { color: '#fff', fontWeight: '700' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.xs },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.xs },
  checkoutBtn: {
    marginTop: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  checkoutBtnText: { color: '#fff', fontWeight: '700', fontSize: 15, marginRight: spacing.xs },
});
