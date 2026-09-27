import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { dashboardStats, managerOrders } from '../../data/mockData';
import { colors, spacing, radius, typography } from '../../theme/theme';

const statusColors = {
  New: colors.warning,
  Preparing: colors.primary,
  Ready: colors.success,
};

export default function DashboardScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={typography.h1}>Dashboard</Text>
        <Text style={typography.caption}>Today's overview</Text>

        <View style={styles.statsGrid}>
          <StatCard icon="receipt-outline" label="Orders Today" value={dashboardStats.todayOrders} />
          <StatCard icon="cash-outline" label="Revenue" value={`$${dashboardStats.todayRevenue.toFixed(0)}`} />
          <StatCard icon="calendar-outline" label="Reservations" value={dashboardStats.activeReservations} />
          <StatCard icon="time-outline" label="Pending" value={dashboardStats.pendingOrders} accent={colors.warning} />
        </View>

        <View style={styles.sectionHeaderRow}>
          <Text style={typography.h2}>Live Orders</Text>
        </View>

        <View style={styles.card}>
          {managerOrders.map((order, i) => (
            <View key={order.id} style={[styles.orderRow, i === managerOrders.length - 1 && { borderBottomWidth: 0 }]}>
              <View style={{ flex: 1 }}>
                <Text style={typography.body}>{order.id} · {order.table}</Text>
                <Text style={typography.caption}>{order.items} items · ${order.total.toFixed(2)}</Text>
              </View>
              <View style={[styles.statusPill, { backgroundColor: (statusColors[order.status] || colors.textSecondary) + '22' }]}>
                <Text style={[styles.statusText, { color: statusColors[order.status] || colors.textSecondary }]}>{order.status}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function StatCard({ icon, label, value, accent }) {
  return (
    <View style={styles.statCard}>
      <Ionicons name={icon} size={20} color={accent || colors.primary} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={typography.caption}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.md },
  statCard: {
    width: '47%',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statValue: { fontSize: 22, fontWeight: '800', color: colors.textPrimary, marginTop: spacing.xs },
  sectionHeaderRow: { marginTop: spacing.lg, marginBottom: spacing.sm },
  card: { backgroundColor: colors.surface, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border },
  orderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  statusPill: { paddingHorizontal: spacing.sm, paddingVertical: 4, borderRadius: radius.pill },
  statusText: { fontSize: 12, fontWeight: '700' },
});
