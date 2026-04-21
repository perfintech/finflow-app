import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { useAppContext } from '@/context/AppContext';
import { colors, fonts, spacing } from '@/constants/theme';
import { formatCurrency } from '@/utils/formatters';

export const options = {
  title: 'Dashboard',
  tabBarIcon: () => <Text style={{ fontSize: 20 }}>🏠</Text>,
};

export default function DashboardScreen() {
  const { profile } = useAppContext();

  if (!profile) {
    return (
      <SafeAreaView style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>Loading profile...</Text>
      </SafeAreaView>
    );
  }

  const topAccounts = profile.accounts.slice(0, 3);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.greeting}>Good morning, {profile.user.greeting}</Text>
      <Text style={styles.status}>Safe to Spend · {formatCurrency(profile.safeToSpendCents)}</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Net worth</Text>
        <Text style={styles.cardAmount}>{formatCurrency(profile.netWorthCents)}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top accounts</Text>
        <FlatList
          data={topAccounts}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.accountCard}>
              <View style={[styles.accountDot, { backgroundColor: item.color }]} />
              <View style={styles.accountInfo}>
                <Text style={styles.accountName}>{item.name}</Text>
                <Text style={styles.accountLabel}>{item.institution}</Text>
              </View>
              <Text style={styles.accountBalance}>{formatCurrency(item.balanceCents)}</Text>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
          contentContainerStyle={{ paddingBottom: spacing.lg }}
        />
      </View>
      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Monthly income</Text>
          <Text style={styles.summaryValue}>{formatCurrency(profile.monthlyIncomeCents)}</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Monthly spend</Text>
          <Text style={styles.summaryValue}>{formatCurrency(profile.monthlySpendCents)}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.xxxl,
  },
  fallbackContainer: {
    flex: 1,
    backgroundColor: colors.bg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    color: colors.text2,
    fontFamily: fonts.outfit,
  },
  greeting: {
    color: colors.accent,
    fontFamily: fonts.outfitBold,
    fontSize: 28,
    marginBottom: spacing.xs,
  },
  status: {
    color: colors.text2,
    fontFamily: fonts.outfit,
    fontSize: 15,
    marginBottom: spacing.xl,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  cardTitle: {
    color: colors.text2,
    fontFamily: fonts.outfit,
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  cardAmount: {
    color: colors.text,
    fontFamily: fonts.bebas,
    fontSize: 42,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    color: colors.text,
    fontFamily: fonts.outfitBold,
    fontSize: 18,
    marginBottom: spacing.md,
  },
  accountCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: spacing.md,
  },
  accountDot: {
    width: 12,
    height: 12,
    borderRadius: 999,
    marginRight: spacing.md,
  },
  accountInfo: {
    flex: 1,
  },
  accountName: {
    color: colors.text,
    fontFamily: fonts.outfitBold,
    fontSize: 15,
  },
  accountLabel: {
    color: colors.text3,
    fontFamily: fonts.outfit,
    fontSize: 13,
  },
  accountBalance: {
    color: colors.text,
    fontFamily: fonts.dmMonoMedium,
    fontSize: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: spacing.md,
  },
  summaryLabel: {
    color: colors.text3,
    fontFamily: fonts.outfit,
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  summaryValue: {
    color: colors.text,
    fontFamily: fonts.outfitBold,
    fontSize: 18,
  },
});
