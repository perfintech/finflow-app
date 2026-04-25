import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from '@/context/AppContext';
import { colors, fonts, spacing } from '@/constants/theme';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { BarChart, ProjectionChart } from '@/components/Charts';

export const options = {
  title: 'Cashflow',
  tabBarIcon: () => <Text style={{ fontSize: 20 }}>📈</Text>,
};

type Period = 'Monthly' | 'Weekly' | 'Daily';
const PERIODS: Period[] = ['Monthly', 'Weekly', 'Daily'];

export default function CashflowScreen() {
  const { profile } = useAppContext();
  const [period, setPeriod] = useState<Period>('Monthly');

  if (!profile) {
    return (
      <SafeAreaView style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>Loading cashflow...</Text>
      </SafeAreaView>
    );
  }

  const cashflow = profile.cashflow;

  const barData = cashflow.map(c => ({
    label: c.monthLabel,
    value: period === 'Monthly'
      ? c.spendCents / 100
      : period === 'Weekly'
        ? c.spendCents / 4 / 100
        : c.spendCents / 30 / 100,
  }));

  const projData = [
    { label: 'Now', value: profile.safeToSpendCents / 100 },
    { label: '30d', value: profile.safeToSpendCents / 100 + profile.projection.thirtyDay },
    { label: '60d', value: profile.safeToSpendCents / 100 + profile.projection.sixtyDay },
    { label: '90d', value: profile.safeToSpendCents / 100 + profile.projection.ninetyDay },
  ];

  const divisor = period === 'Monthly' ? 1 : period === 'Weekly' ? 4 : 30;
  const totalIncome = cashflow.reduce((s, c) => s + c.incomeCents / divisor, 0);
  const totalSpend = cashflow.reduce((s, c) => s + c.spendCents / divisor, 0);
  const totalNet = totalIncome - totalSpend;

  const periodLabel = period === 'Monthly' ? '6-mo' : period === 'Weekly' ? 'Avg/wk' : 'Avg/day';

  const emailBills = profile.bills.filter(b => b.source === 'email');
  const daysUntil = (date: string) => {
    const diff = new Date(date).getTime() - Date.now();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header + Period Toggle ── */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>Smart Money Insights</Text>
            <Text style={styles.subtitle}>Income vs. spend summary</Text>
          </View>
        </View>

        <View style={styles.periodRow}>
          {PERIODS.map(p => (
            <Pressable
              key={p}
              style={[styles.periodPill, period === p && styles.periodPillActive]}
              onPress={() => setPeriod(p)}
            >
              <Text style={[styles.periodText, period === p && styles.periodTextActive]}>{p}</Text>
            </Pressable>
          ))}
        </View>

        {/* ── Summary Row ── */}
        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>{periodLabel} Income</Text>
            <Text style={[styles.summaryValue, { color: colors.accent }]}>{formatCurrency(totalIncome)}</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>{periodLabel} Spend</Text>
            <Text style={[styles.summaryValue, { color: colors.warn }]}>{formatCurrency(totalSpend)}</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Net</Text>
            <Text style={[styles.summaryValue, { color: totalNet >= 0 ? colors.accent : colors.red }]}>
              {totalNet >= 0 ? '+' : ''}{formatCurrency(totalNet)}
            </Text>
          </View>
        </View>

        {/* ── Spend Bar Chart ── */}
        <View style={styles.chartCard}>
          <View style={styles.chartHeaderRow}>
            <Text style={styles.chartTitle}>Monthly Net Cashflow</Text>
            <View style={styles.chartLegend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: colors.accent }]} />
                <Text style={styles.legendText}>Income</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: colors.accent2 }]} />
                <Text style={styles.legendText}>Spend</Text>
              </View>
            </View>
          </View>
          <BarChart data={barData} height={120} width={320} barColor={colors.accent2} />
        </View>

        {/* ── Monthly Breakdown ── */}
        <Text style={styles.sectionTitle}>Month by month</Text>
        {cashflow.map(item => {
          const spendAmt = item.spendCents / divisor;
          const incomeAmt = item.incomeCents / divisor;
          const net = incomeAmt - spendAmt;
          return (
            <View key={item.id} style={styles.monthCard}>
              <View style={styles.monthLeft}>
                <Text style={styles.monthLabel}>{item.monthLabel} {item.year}</Text>
                <View style={styles.monthBars}>
                  <View style={styles.barRow}>
                    <Text style={styles.barRowLabel}>Income</Text>
                    <View style={styles.barTrack}>
                      <View style={[styles.barFill, { width: '100%', backgroundColor: colors.accentAlpha20 }]} />
                    </View>
                    <Text style={[styles.barRowValue, { color: colors.accent }]}>{formatCurrency(incomeAmt)}</Text>
                  </View>
                  <View style={styles.barRow}>
                    <Text style={styles.barRowLabel}>Spend</Text>
                    <View style={styles.barTrack}>
                      <View style={[styles.barFill, {
                        width: `${Math.min((spendAmt / incomeAmt) * 100, 100)}%`,
                        backgroundColor: spendAmt > incomeAmt ? colors.red : colors.warn,
                      }]} />
                    </View>
                    <Text style={[styles.barRowValue, { color: colors.warn }]}>{formatCurrency(spendAmt)}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.monthNet}>
                <Text style={styles.monthNetLabel}>Net</Text>
                <Text style={[styles.monthNetValue, { color: net >= 0 ? colors.accent : colors.red }]}>
                  {net >= 0 ? '+' : ''}{formatCurrency(net)}
                </Text>
              </View>
            </View>
          );
        })}

        {/* ── Detected from Inbox ── */}
        {emailBills.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>⚡ Detected from Inbox</Text>
            {emailBills.map(bill => {
              const days = daysUntil(bill.dueDate);
              return (
                <View key={bill.id} style={[styles.inboxCard, days <= 3 && styles.inboxCardUrgent]}>
                  <View style={[styles.inboxDot, { backgroundColor: bill.color }]} />
                  <Text style={styles.inboxIcon}>{bill.icon}</Text>
                  <View style={styles.inboxInfo}>
                    <Text style={styles.inboxName}>{bill.name}</Text>
                    <Text style={styles.inboxSource}>Email confirmed · Due {formatDate(bill.dueDate)}</Text>
                  </View>
                  <View style={styles.inboxRight}>
                    <Text style={styles.inboxAmount}>{formatCurrency(bill.amountCents)}</Text>
                    {days <= 3 && days >= 0 && (
                      <View style={styles.urgentBadge}>
                        <Text style={styles.urgentText}>Due in {days}d</Text>
                      </View>
                    )}
                    {days < 0 && (
                      <View style={[styles.urgentBadge, { backgroundColor: colors.redAlpha10, borderColor: 'rgba(255,82,82,0.3)' }]}>
                        <Text style={[styles.urgentText, { color: colors.red }]}>Overdue</Text>
                      </View>
                    )}
                  </View>
                </View>
              );
            })}
          </>
        )}

        {/* ── 90-day Projection ── */}
        <Text style={styles.sectionTitle}>📈 Cash Position Projection</Text>
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Safe to Spend trajectory · TODAY →</Text>
          <ProjectionChart data={projData} height={100} width={300} lineColor={colors.accent} />
        </View>
        <View style={styles.projectionRow}>
          {[
            { label: '30-DAY', value: profile.projection.thirtyDay },
            { label: '60-DAY', value: profile.projection.sixtyDay },
            { label: '90-DAY', value: profile.projection.ninetyDay },
          ].map(p => (
            <View key={p.label} style={[styles.projCard, { borderColor: p.value >= 0 ? colors.border2 : 'rgba(255,82,82,0.2)' }]}>
              <Text style={styles.projLabel}>{p.label}</Text>
              <Text style={[styles.projValue, { color: p.value >= 0 ? colors.accent : colors.red }]}>
                {p.value >= 0 ? '+' : ''}{formatCurrency(p.value * 100)}
              </Text>
            </View>
          ))}
        </View>

        <View style={{ height: spacing.xxxl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: spacing.screen, paddingTop: spacing.xl, paddingBottom: spacing.xxxl },
  fallbackContainer: { flex: 1, backgroundColor: colors.bg, justifyContent: 'center', alignItems: 'center' },
  fallbackText: { color: colors.text2, fontFamily: fonts.outfit },

  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.md },
  title: { color: colors.text, fontFamily: fonts.outfitBold, fontSize: 26, marginBottom: 2 },
  subtitle: { color: colors.text2, fontFamily: fonts.outfit, fontSize: 13 },

  periodRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg },
  periodPill: {
    paddingHorizontal: spacing.md,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  periodPillActive: { backgroundColor: colors.accentAlpha10, borderColor: colors.accent },
  periodText: { color: colors.text3, fontFamily: fonts.outfitBold, fontSize: 12 },
  periodTextActive: { color: colors.accent },

  summaryRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg },
  summaryCard: { flex: 1, backgroundColor: colors.surface, borderRadius: 16, padding: spacing.md, alignItems: 'center' },
  summaryLabel: { color: colors.text3, fontFamily: fonts.outfit, fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  summaryValue: { fontFamily: fonts.dmMonoMedium, fontSize: 13 },

  chartCard: { backgroundColor: colors.surface, borderRadius: 20, padding: spacing.lg, marginBottom: spacing.lg, overflow: 'hidden' },
  chartHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  chartTitle: { color: colors.text3, fontFamily: fonts.outfit, fontSize: 11, textTransform: 'uppercase', letterSpacing: 1 },
  chartLegend: { flexDirection: 'row', gap: spacing.sm },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  legendDot: { width: 8, height: 8, borderRadius: 999 },
  legendText: { color: colors.text3, fontFamily: fonts.outfit, fontSize: 10 },

  sectionTitle: { color: colors.text, fontFamily: fonts.outfitBold, fontSize: 16, marginBottom: spacing.md },

  monthCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: spacing.md,
    marginBottom: spacing.sm,
    alignItems: 'center',
  },
  monthLeft: { flex: 1 },
  monthLabel: { color: colors.accent, fontFamily: fonts.outfitBold, fontSize: 14, marginBottom: spacing.sm },
  monthBars: { gap: 6 },
  barRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  barRowLabel: { color: colors.text3, fontFamily: fonts.outfit, fontSize: 10, width: 36 },
  barTrack: { flex: 1, height: 6, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 3 },
  barRowValue: { fontFamily: fonts.dmMonoMedium, fontSize: 11, width: 64, textAlign: 'right' },
  monthNet: { alignItems: 'flex-end', marginLeft: spacing.md },
  monthNetLabel: { color: colors.text3, fontFamily: fonts.outfit, fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  monthNetValue: { fontFamily: fonts.dmMonoMedium, fontSize: 15 },

  inboxCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  inboxCardUrgent: { borderColor: colors.warn, backgroundColor: colors.warnAlpha10 },
  inboxDot: { width: 8, height: 8, borderRadius: 999, marginRight: spacing.sm },
  inboxIcon: { fontSize: 18, marginRight: spacing.sm },
  inboxInfo: { flex: 1 },
  inboxName: { color: colors.text, fontFamily: fonts.outfitBold, fontSize: 13 },
  inboxSource: { color: colors.text3, fontFamily: fonts.outfit, fontSize: 11, marginTop: 1 },
  inboxRight: { alignItems: 'flex-end' },
  inboxAmount: { color: colors.text, fontFamily: fonts.dmMonoMedium, fontSize: 13 },
  urgentBadge: {
    marginTop: 3,
    backgroundColor: colors.warnAlpha10,
    borderRadius: 6,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: 'rgba(255,179,71,0.3)',
  },
  urgentText: { color: colors.warn, fontFamily: fonts.outfitBold, fontSize: 9 },

  projectionRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg },
  projCard: { flex: 1, backgroundColor: colors.surface, borderRadius: 16, padding: spacing.md, alignItems: 'center', borderWidth: 1 },
  projLabel: { color: colors.text3, fontFamily: fonts.outfit, fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  projValue: { fontFamily: fonts.dmMonoMedium, fontSize: 13 },
});
