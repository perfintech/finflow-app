import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from '@/context/AppContext';
import { colors, fonts, spacing } from '@/constants/theme';
import { formatCurrency } from '@/utils/formatters';

export const options = {
  title: 'Subscriptions',
  tabBarIcon: () => <Text style={{ fontSize: 20 }}>🔄</Text>,
};

export default function SubscriptionAuditScreen() {
  const { profile } = useAppContext();
  const [dismissedSubs, setDismissedSubs] = useState<Set<string>>(new Set());

  const sortedSubs = useMemo(() => {
    if (!profile) return [];
    return [...profile.subscriptions]
      .filter(s => !dismissedSubs.has(s.id))
      .sort((a, b) => {
        if (a.isWaste !== b.isWaste) return a.isWaste ? -1 : 1;
        return b.amountCents - a.amountCents;
      });
  }, [profile, dismissedSubs]);

  const wasteSubs = useMemo(() => sortedSubs.filter(s => s.isWaste), [sortedSubs]);
  const totalMonthly = useMemo(() => sortedSubs.reduce((sum, s) => sum + s.amountCents, 0), [sortedSubs]);
  const totalWaste = useMemo(() => wasteSubs.reduce((sum, s) => sum + s.amountCents, 0), [wasteSubs]);
  const totalYearly = totalMonthly * 12;
  const yearlySavings = totalWaste * 12;

  const toggleDismiss = (id: string) => {
    const newSet = new Set(dismissedSubs);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setDismissedSubs(newSet);
  };

  const cancelAll = () => {
    const newSet = new Set(dismissedSubs);
    wasteSubs.forEach(s => newSet.add(s.id));
    setDismissedSubs(newSet);
  };

  if (!profile) {
    return (
      <SafeAreaView style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>Loading subscriptions...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Subscription Audit</Text>
        <Text style={styles.subtitle}>Review all subscriptions. Cancel the ones you don't use.</Text>

        {/* ── Yearly Stats Card ── */}
        <View style={styles.yearlyCard}>
          <View style={styles.yearlyTop}>
            <Text style={styles.yearlyHeading}>YOU'RE SPENDING</Text>
            <Text style={styles.yearlyAmount}>{formatCurrency(totalMonthly)}/mo</Text>
            <Text style={styles.yearlyAnnual}>{formatCurrency(totalYearly)} / year on subscriptions</Text>
          </View>
          <View style={styles.yearlyStatsRow}>
            <View style={styles.yearlyStat}>
              <Text style={styles.yearlyStatValue}>{sortedSubs.length}</Text>
              <Text style={styles.yearlyStatLabel}>ACTIVE</Text>
            </View>
            <View style={[styles.yearlyStat, styles.yearlyStatDivider]}>
              <Text style={[styles.yearlyStatValue, { color: colors.red }]}>{formatCurrency(totalWaste)}</Text>
              <Text style={styles.yearlyStatLabel}>WASTED/MO</Text>
            </View>
            <View style={styles.yearlyStat}>
              <Text style={[styles.yearlyStatValue, { color: colors.accent }]}>{formatCurrency(yearlySavings)}</Text>
              <Text style={styles.yearlyStatLabel}>SAVE/YR</Text>
            </View>
          </View>
        </View>

        {/* ── Summary Bar ── */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total monthly</Text>
            <Text style={styles.summaryAmount}>{formatCurrency(totalMonthly)}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Waste</Text>
            <Text style={[styles.summaryAmount, styles.summaryWaste]}>{formatCurrency(totalWaste)}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Active</Text>
            <Text style={styles.summaryValue}>{sortedSubs.length}</Text>
          </View>
        </View>

        {/* ── Subscription Rows ── */}
        {sortedSubs.map(item => (
          <View key={item.id} style={[styles.subCard, item.isWaste && styles.subCardWaste]}>
            {item.isWaste && <View style={styles.wasteTag}>
              <Text style={styles.wasteTagText}>UNUSED</Text>
            </View>}
            <View style={[styles.subIcon, { backgroundColor: item.iconBg }]}>
              <Text style={styles.icon}>{item.icon}</Text>
            </View>
            <View style={styles.subInfo}>
              <Text style={styles.subName}>{item.name}</Text>
              <Text style={styles.subCategory}>{item.category}</Text>
              {item.lastUsedDaysAgo > 0 && (
                <Text style={[styles.subUsage, item.isWaste && { color: colors.red }]}>
                  {item.isWaste ? `Last used ${item.lastUsedDaysAgo} days ago` : 'Used recently ✓'}
                </Text>
              )}
            </View>
            <View style={styles.subRight}>
              <Text style={styles.subAmount}>{formatCurrency(item.amountCents)}</Text>
              <Text style={styles.subFreq}>/{item.billingCycle.charAt(0)}</Text>
            </View>
            <Pressable
              onPress={() => toggleDismiss(item.id)}
              style={({ pressed }) => [
                styles.action,
                item.isWaste && styles.actionCancel,
                pressed && { opacity: 0.6 },
              ]}
            >
              <Text style={[styles.actionText, item.isWaste && styles.actionCancelText]}>
                {item.isWaste ? 'Cancel' : 'Keep'}
              </Text>
            </Pressable>
          </View>
        ))}

        {/* ── Bulk Cancel Button ── */}
        {wasteSubs.length > 0 && (
          <Pressable
            style={({ pressed }) => [styles.bulkCancelButton, pressed && { opacity: 0.85 }]}
            onPress={cancelAll}
          >
            <Text style={styles.bulkCancelText}>
              Cancel {wasteSubs.length} · Save {formatCurrency(yearlySavings)}/year →
            </Text>
          </Pressable>
        )}

        {sortedSubs.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>✅</Text>
            <Text style={styles.emptyTitle}>All clean!</Text>
            <Text style={styles.emptyDesc}>No active subscriptions to review.</Text>
          </View>
        )}

        <View style={{ height: spacing.xxxl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: spacing.screen, paddingTop: spacing.xl },
  fallbackContainer: { flex: 1, backgroundColor: colors.bg, justifyContent: 'center', alignItems: 'center' },
  fallbackText: { color: colors.text2, fontFamily: fonts.outfit },

  title: { color: colors.text, fontFamily: fonts.outfitBold, fontSize: 28, marginBottom: spacing.xs },
  subtitle: { color: colors.text2, fontFamily: fonts.outfit, fontSize: 15, marginBottom: spacing.lg },

  yearlyCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  yearlyTop: { alignItems: 'center', marginBottom: spacing.lg },
  yearlyHeading: { color: colors.text3, fontFamily: fonts.outfitBold, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 },
  yearlyAmount: { color: colors.text, fontFamily: fonts.bebas, fontSize: 40, letterSpacing: 1 },
  yearlyAnnual: { color: colors.text2, fontFamily: fonts.outfit, fontSize: 13, marginTop: 2 },
  yearlyStatsRow: { flexDirection: 'row' },
  yearlyStat: { flex: 1, alignItems: 'center' },
  yearlyStatDivider: {
    borderLeftWidth: 1, borderRightWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.sm,
  },
  yearlyStatValue: { color: colors.text, fontFamily: fonts.dmMonoMedium, fontSize: 16, marginBottom: 2 },
  yearlyStatLabel: { color: colors.text3, fontFamily: fonts.outfit, fontSize: 9, textTransform: 'uppercase', letterSpacing: 1 },

  summaryCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 18,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    marginBottom: spacing.lg,
  },
  summaryItem: { flex: 1, alignItems: 'center' },
  divider: { width: 1, backgroundColor: colors.border },
  summaryLabel: { color: colors.text3, fontFamily: fonts.outfit, fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 },
  summaryAmount: { color: colors.text, fontFamily: fonts.outfitBold, fontSize: 14 },
  summaryWaste: { color: colors.red },
  summaryValue: { color: colors.accent, fontFamily: fonts.outfitBold, fontSize: 16 },

  subCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    position: 'relative',
  },
  subCardWaste: { borderColor: colors.red, borderWidth: 1.5 },
  wasteTag: {
    position: 'absolute',
    top: 8, right: 8,
    backgroundColor: colors.red,
    paddingHorizontal: 6, paddingVertical: 2,
    borderRadius: 4,
  },
  wasteTagText: { color: colors.white, fontFamily: fonts.outfit, fontSize: 10, fontWeight: '700' },
  subIcon: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md },
  icon: { fontSize: 24 },
  subInfo: { flex: 1 },
  subName: { color: colors.text, fontFamily: fonts.outfitBold, fontSize: 15, marginBottom: 2 },
  subCategory: { color: colors.text3, fontFamily: fonts.outfit, fontSize: 12 },
  subUsage: { color: colors.text3, fontFamily: fonts.outfit, fontSize: 11, marginTop: 2 },
  subRight: { alignItems: 'flex-end', marginRight: spacing.md },
  subAmount: { color: colors.text, fontFamily: fonts.dmMonoMedium, fontSize: 14 },
  subFreq: { color: colors.text3, fontFamily: fonts.outfit, fontSize: 11 },
  action: {
    paddingHorizontal: spacing.md, paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: colors.surface2,
  },
  actionCancel: { backgroundColor: colors.redAlpha10, borderWidth: 1, borderColor: 'rgba(255,82,82,0.3)' },
  actionText: { color: colors.accent2, fontFamily: fonts.outfitBold, fontSize: 12 },
  actionCancelText: { color: colors.red },

  bulkCancelButton: {
    height: 52,
    borderRadius: 999,
    backgroundColor: colors.red,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    marginTop: spacing.sm,
  },
  bulkCancelText: { color: colors.white, fontFamily: fonts.outfitBold, fontSize: 14 },

  emptyState: { alignItems: 'center', paddingVertical: spacing.xxxl },
  emptyIcon: { fontSize: 48, marginBottom: spacing.md },
  emptyTitle: { color: colors.text, fontFamily: fonts.outfitBold, fontSize: 20, marginBottom: spacing.sm },
  emptyDesc: { color: colors.text2, fontFamily: fonts.outfit, fontSize: 14 },
});
