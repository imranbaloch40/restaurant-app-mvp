import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius, typography } from '../../theme/theme';

const menuActions = [
  { icon: 'receipt-outline', label: 'Order History' },
  { icon: 'location-outline', label: 'Saved Addresses' },
  { icon: 'card-outline', label: 'Payment Methods' },
  { icon: 'notifications-outline', label: 'Notifications' },
  { icon: 'help-circle-outline', label: 'Help & Support' },
];

export default function ProfileScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AK</Text>
          </View>
          <Text style={typography.h1}>Ayesha Khan</Text>
          <Text style={typography.caption}>ayesha.khan@email.com</Text>
        </View>

        <View style={styles.card}>
          {menuActions.map((action, i) => (
            <TouchableOpacity key={action.label} style={[styles.actionRow, i === menuActions.length - 1 && { borderBottomWidth: 0 }]}>
              <Ionicons name={action.icon} size={20} color={colors.textPrimary} />
              <Text style={[typography.body, { flex: 1, marginLeft: spacing.sm }]}>{action.label}</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={() => navigation.getParent()?.replace('RoleSelect')}>
          <Ionicons name="log-out-outline" size={18} color={colors.primary} />
          <Text style={styles.logoutText}>Switch Role / Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md },
  profileHeader: { alignItems: 'center', marginBottom: spacing.lg, marginTop: spacing.sm },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  avatarText: { color: '#fff', fontSize: 24, fontWeight: '700' },
  card: { backgroundColor: colors.surface, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    marginTop: spacing.lg,
    padding: spacing.md,
  },
  logoutText: { color: colors.primary, fontWeight: '700', marginLeft: spacing.xs },
});
