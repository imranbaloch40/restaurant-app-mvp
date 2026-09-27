import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { orderTrackingStages } from '../../data/mockData';
import { useCart } from '../../context/CartContext';
import { colors, spacing, radius, typography } from '../../theme/theme';

export default function OrderTrackingScreen({ navigation }) {
  const { orderType, total, clearCart } = useCart();
  const [stageIndex, setStageIndex] = useState(0);

  // Simulate order progressing through stages over time.
  useEffect(() => {
    const interval = setInterval(() => {
      setStageIndex((prev) => (prev < orderTrackingStages.length - 1 ? prev + 1 : prev));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  function handleDone() {
    clearCart();
    navigation.navigate('Menu');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={typography.h1}>Track Order</Text>
        <Text style={typography.caption}>Order #OD-{1000 + total.toFixed(0)} · {orderType}</Text>
      </View>

      <View style={styles.stagesContainer}>
        {orderTrackingStages.map((stage, index) => {
          const isDone = index < stageIndex;
          const isCurrent = index === stageIndex;
          return (
            <View key={stage} style={styles.stageRow}>
              <View style={styles.stageIndicatorCol}>
                <View style={[styles.dot, (isDone || isCurrent) && styles.dotActive]}>
                  {isDone ? (
                    <Ionicons name="checkmark" size={14} color="#fff" />
                  ) : (
                    <View style={[styles.innerDot, isCurrent && styles.innerDotActive]} />
                  )}
                </View>
                {index < orderTrackingStages.length - 1 && (
                  <View style={[styles.line, isDone && styles.lineActive]} />
                )}
              </View>
              <View style={styles.stageTextCol}>
                <Text style={[typography.body, (isDone || isCurrent) && { fontWeight: '700' }]}>{stage}</Text>
                {isCurrent && <Text style={[typography.caption, { color: colors.primary }]}>In progress...</Text>}
              </View>
            </View>
          );
        })}
      </View>

      {stageIndex === orderTrackingStages.length - 1 && (
        <TouchableOpacity style={styles.doneBtn} onPress={handleDone}>
          <Text style={styles.doneBtnText}>Back to Menu</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { padding: spacing.md },
  stagesContainer: { paddingHorizontal: spacing.lg, marginTop: spacing.md },
  stageRow: { flexDirection: 'row' },
  stageIndicatorCol: { alignItems: 'center', width: 32 },
  dot: {
    width: 28,
    height: 28,
    borderRadius: radius.pill,
    backgroundColor: colors.muted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotActive: { backgroundColor: colors.primary },
  innerDot: { width: 8, height: 8, borderRadius: radius.pill, backgroundColor: colors.textSecondary },
  innerDotActive: { backgroundColor: '#fff' },
  line: { width: 2, flex: 1, minHeight: 32, backgroundColor: colors.muted },
  lineActive: { backgroundColor: colors.primary },
  stageTextCol: { paddingBottom: spacing.lg, paddingLeft: spacing.sm, justifyContent: 'flex-start' },
  doneBtn: {
    margin: spacing.md,
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  doneBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
