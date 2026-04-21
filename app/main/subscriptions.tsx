import { useMemo, useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
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

  const totalMonthly = useMemo(() => sortedSubs.reduce((sum, s) => sum + s.amountCents, 0), [sortedSubs]);
  const totalWaste = useMemo(() => sortedSubs.filter(s => s.isWaste).reduce((sum, s) => sum + s.amountCents, 0), [sortedSubs]);

  if (!profile) {
    return (
      <SafeAreaView style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>Loading subscriptions...</Text>
      </SafeAreaView>
    );
  }

  const toggleDismiss = (id: string) => {
    const newSet = new Set(dismissedSubs);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setDismissedSubs(newSet);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Subscription Audit</Text>
      <Text style={styles.subtitle}>Review all subscriptions. Cancel the ones you don't use.</Text>

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

      <FlashList
        data={sortedSubs}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.subCard, item.isWaste && styles.subCardWaste]}>
            {item.isWaste && <View style={styles.wasteTag}>
              <Text style={styles.wasteTagText}>UNUSED</Text>
            </View>}
            <View style={[styles.subIcon, { backgroundColor: item.iconBg }]}>
              <Text style={styles.icon}>{item.icon}</Text>
            </View>
            <View style={styles.subInfo}>
              <Text style={styles.subName}>{item.name}</Text>
              <Text style={styles.subCategory}>{item.category}</Text>
            </View>
            <View style={styles.subRight}>
              <Text style={styles.subAmount}>{formatCurrency(item.amountCents)}</Text>
              <Text style={styles.subFreq}>/{item.billingCycle.charAt(0)}</Text>
            </View>
            <Pressable
              onPress={() => toggleDismiss(item.id)}
              style={({ pressed }) => [styles.action, pressed && { opacity: 0.6 }]}
            >
              <Text style={styles.actionText}>{item.isWaste ? 'Cancel' : 'Keep'}</Text>
            </Pressable>
          </View>
        )}
        estimatedItemSize={90}
        contentContainerStyle={{ paddingBottom: spacing.xl }}
      />
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
  title: {
    color: colors.text,
    fontFamily: fonts.outfitBold,
    fontSize: 28,
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: colors.text2,
    fontFamily: fonts.outfit,
    fontSize: 15,
    marginBottom: spacing.lg,
  },
  summaryCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 18,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    marginBottom: spacing.lg,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  divider: {
    width: 1,
    backgroundColor: colors.border,
  },
  summaryLabel: {
    color: colors.text3,
    fontFamily: fonts.outfit,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  summaryAmount: {
    color: colors.text,
    fontFamily: fonts.outfitBold,
    fontSize: 14,
  },
  summaryWaste: {
    color: colors.red,
  },
  summaryValue: {
    color: colors.accent,
    fontFamily: fonts.outfitBold,
    fontSize: 16,
  },
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
  subCardWaste: {
    borderColor: colors.red,
    borderWidth: 1.5,
  },
  wasteTag: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.red,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  wasteTagText: {
    color: colors.white,
    fontFamily: fonts.outfit,
    fontSize: 10,
    fontWeight: '700',
  },
  subIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  icon: {
    fontSize: 24,
  },
  subInfo: {
    flex: 1,
  },
  subName: {
    color: colors.text,
    fontFamily: fonts.outfitBold,
    fontSize: 15,
    marginBottom: 2,
  },
  subCategory: {
    color: colors.text3,
    fontFamily: fonts.outfit,
    fontSize: 12,
  },
  subRight: {
    alignItems: 'flex-end',
    marginRight: spacing.md,
  },
  subAmount: {
    color: colors.text,
    fontFamily: fonts.dmMonoMedium,
    fontSize: 14,
  },
  subFreq: {
    color: colors.text3,
    fontFamily: fonts.outfit,
    fontSize: 11,
  },
  action: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: colors.surface2,
  },
  actionText: {
    color: colors.accent2,
    fontFamily: fonts.outfitBold,
    fontSize: 12,
  },
});
