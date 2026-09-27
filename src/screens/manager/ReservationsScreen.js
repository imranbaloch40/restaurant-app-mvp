import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { reservations } from '../../data/mockData';
import { colors, spacing, radius, typography } from '../../theme/theme';

const statusStyle = {
  Confirmed: { color: colors.success, icon: 'checkmark-circle' },
  Pending: { color: colors.warning, icon: 'time' },
  Cancelled: { color: colors.textSecondary, icon: 'close-circle' },
};

export default function ReservationsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={typography.h1}>Reservations</Text>
        <Text style={typography.caption}>{reservations.length} bookings today</Text>
      </View>

      <FlatList
        data={reservations}
        keyExtractor={(r) => r.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const style = statusStyle[item.status] || statusStyle.Pending;
          return (
            <View style={styles.row}>
              <View style={styles.timeCol}>
                <Text style={styles.time}>{item.time}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={typography.h2}>{item.name}</Text>
                <Text style={typography.caption}>{item.guests} guests · {item.id}</Text>
              </View>
              <View style={styles.statusCol}>
                <Ionicons name={style.icon} size={16} color={style.color} />
                <Text style={[styles.statusText, { color: style.color }]}>{item.status}</Text>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { padding: spacing.md },
  listContent: { paddingHorizontal: spacing.md, paddingBottom: spacing.md },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  timeCol: { marginRight: spacing.md, minWidth: 64 },
  time: { fontWeight: '700', color: colors.textPrimary },
  statusCol: { alignItems: 'center' },
  statusText: { fontSize: 11, fontWeight: '700', marginTop: 2 },
});
