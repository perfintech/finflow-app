import { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from '@/context/AppContext';
import { colors, fonts, spacing } from '@/constants/theme';
import { formatCurrency, formatDate } from '@/utils/formatters';
import type { AccountRecord, BillRecord } from '@/database/schema';

export const options = {
  title: 'Money Map',
  tabBarIcon: () => <Text style={{ fontSize: 20 }}>🗺️</Text>,
};

const ACCOUNT_TYPE_ORDER: Record<string, number> = {
  checking: 0, savings: 1, investment: 2, credit: 3, loan: 4,
};

const STATUS_COLOR: Record<string, string> = {
  overdue: colors.red,
  due_soon: colors.warn,
  upcoming: colors.text2,
  paid: colors.accent,
};

const STATUS_LABEL: Record<string, string> = {
  overdue: 'OVERDUE',
  due_soon: 'DUE SOON',
  upcoming: 'UPCOMING',
  paid: 'PAID',
};

export default function MoneyMapScreen() {
  const { profile } = useAppContext();

  const data = useMemo(() => {
    if (!profile) return null;
    const { accounts, transactions, bills } = profile;

    // ── Current-month window ──────────────────────────────────────────────────
    const now = new Date();
    const curMonth = now.getMonth();
    const curYear = now.getFullYear();

    const monthTxns = transactions.filter(t => {
      const d = new Date(t.date);
      return d.getMonth() === curMonth && d.getFullYear() === curYear;
    });

    // ── 4. Total balance + institution grouping ───────────────────────────────
    const totalBalanceCents = accounts.reduce((s, a) => s + a.balanceCents, 0);
    const liquidCents = accounts
      .filter(a => a.type === 'checking' || a.type === 'savings')
      .reduce((s, a) => s + a.balanceCents, 0);
    const debtCents = accounts
      .filter(a => a.type === 'credit' || a.type === 'loan')
      .reduce((s, a) => s + Math.abs(a.balanceCents < 0 ? a.balanceCents : 0), 0);

    type InstGroup = { accounts: AccountRecord[]; color: string; netCents: number };
    const byInstitution = accounts.reduce<Record<string, InstGroup>>((map, a) => {
      if (!map[a.institution]) map[a.institution] = { accounts: [], color: a.color, netCents: 0 };
      map[a.institution].accounts.push(a);
      map[a.institution].netCents += a.balanceCents;
      return map;
    }, {});

    // ── 1. Money inflow by institution ───────────────────────────────────────
    const totalInflowCents = monthTxns
      .filter(t => !t.isDebit)
      .reduce((s, t) => s + t.amountCents, 0);

    const inflowByInst = monthTxns
      .filter(t => !t.isDebit)
      .reduce<Record<string, number>>((map, t) => {
        const inst = accounts.find(a => a.id === t.accountId)?.institution ?? 'Other';
        map[inst] = (map[inst] ?? 0) + t.amountCents;
        return map;
      }, {});

    // ── 2. Expense breakdown by category ─────────────────────────────────────
    const totalSpendCents = monthTxns
      .filter(t => t.isDebit)
      .reduce((s, t) => s + t.amountCents, 0);

    const spendByCategory = monthTxns
      .filter(t => t.isDebit)
      .reduce<Record<string, number>>((map, t) => {
        map[t.category] = (map[t.category] ?? 0) + t.amountCents;
        return map;
      }, {});

    const topCategories = Object.entries(spendByCategory)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);

    const maxCategorySpend = topCategories[0]?.[1] ?? 1;

    // ── 3. Savings & investments ──────────────────────────────────────────────
    const savingsAccounts = accounts
      .filter(a => a.type === 'savings')
      .sort((a, b) => b.balanceCents - a.balanceCents);
    const investAccounts = accounts
      .filter(a => a.type === 'investment')
      .sort((a, b) => b.balanceCents - a.balanceCents);

    const totalSavingsCents = savingsAccounts.reduce((s, a) => s + a.balanceCents, 0);
    const totalInvestCents = investAccounts.reduce((s, a) => s + a.balanceCents, 0);

    // ── 5. Bills due this month ───────────────────────────────────────────────
    const monthBills = bills
      .filter(b => {
        const d = new Date(b.dueDate);
        return d.getMonth() === curMonth && d.getFullYear() === curYear;
      })
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

    const totalBillsCents = monthBills.reduce((s, b) => s + b.amountCents, 0);
    const paidBillsCents = monthBills
      .filter(b => b.status === 'paid')
      .reduce((s, b) => s + b.amountCents, 0);
    const remainingBillsCents = totalBillsCents - paidBillsCents;

    return {
      totalBalanceCents, liquidCents, debtCents,
      byInstitution,
      totalInflowCents, inflowByInst,
      totalSpendCents, topCategories, maxCategorySpend,
      savingsAccounts, investAccounts, totalSavingsCents, totalInvestCents,
      monthBills, totalBillsCents, paidBillsCents, remainingBillsCents,
    };
  }, [profile]);

  if (!profile || !data) {
    return (
      <SafeAreaView style={styles.fallback}>
        <Text style={styles.fallbackText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  const monthName = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const institutions = Object.entries(data.byInstitution).sort((a, b) => b[1].netCents - a[1].netCents);

  const CATEGORY_ICONS: Record<string, string> = {
    Groceries: '🛒', Dining: '🍽️', Transport: '🚗', Entertainment: '🎬',
    Shopping: '🛍️', Utilities: '💡', Healthcare: '🏥', Rent: '🏠',
    Travel: '✈️', Insurance: '🛡️', Subscriptions: '🔄', Other: '💳',
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Money Map</Text>
        <Text style={styles.subtitle}>{monthName} · All institutions</Text>

        {/* ── 4. Total Balance ──────────────────────────────────────────────── */}
        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>TOTAL BALANCE</Text>
          <Text style={styles.totalAmount}>{formatCurrency(data.totalBalanceCents)}</Text>
          <View style={styles.totalMeta}>
            <View style={styles.totalMetaItem}>
              <Text style={styles.totalMetaLabel}>Liquid</Text>
              <Text style={[styles.totalMetaValue, { color: colors.accent }]}>{formatCurrency(data.liquidCents)}</Text>
            </View>
            <View style={styles.totalMetaDivider} />
            <View style={styles.totalMetaItem}>
              <Text style={styles.totalMetaLabel}>Debt</Text>
              <Text style={[styles.totalMetaValue, { color: data.debtCents > 0 ? colors.red : colors.text2 }]}>
                -{formatCurrency(data.debtCents)}
              </Text>
            </View>
            <View style={styles.totalMetaDivider} />
            <View style={styles.totalMetaItem}>
              <Text style={styles.totalMetaLabel}>Accounts</Text>
              <Text style={styles.totalMetaValue}>{profile.accounts.length}</Text>
            </View>
          </View>
        </View>

        {/* ── Institution Breakdown ─────────────────────────────────────────── */}
        <Text style={styles.sectionTitle}>By Institution</Text>
        {institutions.map(([inst, group]) => {
          const sorted = [...group.accounts].sort(
            (a, b) => (ACCOUNT_TYPE_ORDER[a.type] ?? 9) - (ACCOUNT_TYPE_ORDER[b.type] ?? 9)
          );
          return (
            <View key={inst} style={styles.instCard}>
              <View style={styles.instHeader}>
                <View style={[styles.instDot, { backgroundColor: group.color }]} />
                <Text style={styles.instName}>{inst}</Text>
                <Text style={[styles.instNet, { color: group.netCents >= 0 ? colors.text : colors.red }]}>
                  {formatCurrency(group.netCents)}
                </Text>
              </View>
              {sorted.map(acct => (
                <View key={acct.id} style={styles.acctRow}>
                  <Text style={styles.acctType}>{acct.type.charAt(0).toUpperCase() + acct.type.slice(1)}</Text>
                  <Text style={styles.acctName} numberOfLines={1}>{acct.name}</Text>
                  <Text style={[styles.acctBalance, acct.balanceCents < 0 && { color: colors.red }]}>
                    {formatCurrency(acct.balanceCents)}
                  </Text>
                </View>
              ))}
            </View>
          );
        })}

        {/* ── 1. Money Inflow ───────────────────────────────────────────────── */}
        <Text style={styles.sectionTitle}>💵 Money Inflow · This Month</Text>
        <View style={styles.inflowTotalRow}>
          <Text style={styles.inflowTotalLabel}>Total received</Text>
          <Text style={styles.inflowTotalAmount}>{formatCurrency(data.totalInflowCents)}</Text>
        </View>
        {Object.entries(data.inflowByInst)
          .sort((a, b) => b[1] - a[1])
          .map(([inst, cents]) => {
            const pct = data.totalInflowCents > 0 ? (cents / data.totalInflowCents) * 100 : 0;
            const color = data.byInstitution[inst]?.color ?? colors.accent;
            return (
              <View key={inst} style={styles.inflowRow}>
                <View style={[styles.inflowDot, { backgroundColor: color }]} />
                <View style={styles.inflowInfo}>
                  <View style={styles.inflowLabelRow}>
                    <Text style={styles.inflowInst}>{inst}</Text>
                    <Text style={styles.inflowAmt}>{formatCurrency(cents)}</Text>
                  </View>
                  <View style={styles.inflowTrack}>
                    <View style={[styles.inflowBar, { width: `${pct}%`, backgroundColor: color }]} />
                  </View>
                </View>
              </View>
            );
          })}

        {/* ── 2. Expense Breakdown ──────────────────────────────────────────── */}
        <Text style={styles.sectionTitle}>💸 Spending by Category</Text>
        <View style={styles.spendHeaderRow}>
          <Text style={styles.spendTotal}>Total: {formatCurrency(data.totalSpendCents)}</Text>
          <Text style={styles.spendCount}>{data.topCategories.length} categories</Text>
        </View>
        {data.topCategories.map(([cat, cents]) => {
          const pct = (cents / data.maxCategorySpend) * 100;
          const totalPct = data.totalSpendCents > 0 ? Math.round((cents / data.totalSpendCents) * 100) : 0;
          return (
            <View key={cat} style={styles.categoryRow}>
              <Text style={styles.categoryIcon}>{CATEGORY_ICONS[cat] ?? '💳'}</Text>
              <View style={styles.categoryInfo}>
                <View style={styles.categoryLabelRow}>
                  <Text style={styles.categoryName}>{cat}</Text>
                  <View style={styles.categoryRight}>
                    <Text style={styles.categoryPct}>{totalPct}%</Text>
                    <Text style={styles.categoryAmt}>{formatCurrency(cents)}</Text>
                  </View>
                </View>
                <View style={styles.categoryTrack}>
                  <View style={[styles.categoryBar, { width: `${pct}%` }]} />
                </View>
              </View>
            </View>
          );
        })}

        {/* ── 3. Savings & Investments ──────────────────────────────────────── */}
        <Text style={styles.sectionTitle}>🏦 Savings & Investments</Text>
        <View style={styles.savingsHeaderRow}>
          <View style={styles.savingsStat}>
            <Text style={styles.savingsStatLabel}>Savings</Text>
            <Text style={[styles.savingsStatValue, { color: colors.accent }]}>{formatCurrency(data.totalSavingsCents)}</Text>
          </View>
          <View style={styles.savingsStatDivider} />
          <View style={styles.savingsStat}>
            <Text style={styles.savingsStatLabel}>Investments</Text>
            <Text style={[styles.savingsStatValue, { color: colors.purple }]}>{formatCurrency(data.totalInvestCents)}</Text>
          </View>
        </View>

        {data.savingsAccounts.map(acct => (
          <View key={acct.id} style={styles.savingsAccountCard}>
            <View style={[styles.savingsAcctBar, { backgroundColor: acct.color }]} />
            <View style={styles.savingsAcctInfo}>
              <Text style={styles.savingsAcctName}>{acct.name}</Text>
              <Text style={styles.savingsAcctInst}>{acct.institution}</Text>
            </View>
            {acct.interestRate && (
              <View style={styles.apyBadge}>
                <Text style={styles.apyText}>{acct.interestRate}% APY</Text>
              </View>
            )}
            <Text style={styles.savingsAcctBalance}>{formatCurrency(acct.balanceCents)}</Text>
          </View>
        ))}

        {data.investAccounts.map(acct => (
          <View key={acct.id} style={[styles.savingsAccountCard, styles.investCard]}>
            <View style={[styles.savingsAcctBar, { backgroundColor: colors.purple }]} />
            <View style={styles.savingsAcctInfo}>
              <Text style={styles.savingsAcctName}>{acct.name}</Text>
              <Text style={styles.savingsAcctInst}>{acct.institution}</Text>
            </View>
            <View style={styles.investBadge}>
              <Text style={styles.investBadgeText}>INVEST</Text>
            </View>
            <Text style={[styles.savingsAcctBalance, { color: colors.purple }]}>{formatCurrency(acct.balanceCents)}</Text>
          </View>
        ))}

        {data.savingsAccounts.length === 0 && data.investAccounts.length === 0 && (
          <View style={styles.emptyRow}>
            <Text style={styles.emptyText}>No savings or investment accounts linked.</Text>
          </View>
        )}

        {/* ── 5. Bills Due This Month ───────────────────────────────────────── */}
        <Text style={styles.sectionTitle}>📅 Bills Due This Month</Text>
        <View style={styles.billsHeaderRow}>
          <View style={styles.billsStat}>
            <Text style={styles.billsStatLabel}>Total</Text>
            <Text style={styles.billsStatValue}>{formatCurrency(data.totalBillsCents)}</Text>
          </View>
          <View style={styles.billsStatDivider} />
          <View style={styles.billsStat}>
            <Text style={styles.billsStatLabel}>Remaining</Text>
            <Text style={[styles.billsStatValue, { color: colors.warn }]}>{formatCurrency(data.remainingBillsCents)}</Text>
          </View>
          <View style={styles.billsStatDivider} />
          <View style={styles.billsStat}>
            <Text style={styles.billsStatLabel}>Bills</Text>
            <Text style={styles.billsStatValue}>{data.monthBills.length}</Text>
          </View>
        </View>

        {data.monthBills.length === 0 ? (
          <View style={styles.emptyRow}>
            <Text style={styles.emptyText}>No bills due this month. ✓</Text>
          </View>
        ) : (
          data.monthBills.map(bill => {
            const statusColor = STATUS_COLOR[bill.status] ?? colors.text2;
            return (
              <View key={bill.id} style={[styles.billRow, { borderLeftColor: statusColor }]}>
                <Text style={styles.billIcon}>{bill.icon}</Text>
                <View style={styles.billInfo}>
                  <Text style={styles.billName}>{bill.name}</Text>
                  <Text style={styles.billDate}>Due {formatDate(bill.dueDate)}</Text>
                </View>
                <View style={styles.billRight}>
                  <Text style={styles.billAmt}>{formatCurrency(bill.amountCents)}</Text>
                  <View style={[styles.billStatusTag, { backgroundColor: `${statusColor}18` }]}>
                    <Text style={[styles.billStatusText, { color: statusColor }]}>
                      {STATUS_LABEL[bill.status] ?? bill.status.toUpperCase()}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })
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
  fallback: { flex: 1, backgroundColor: colors.bg, justifyContent: 'center', alignItems: 'center' },
  fallbackText: { color: colors.text2, fontFamily: fonts.outfit },

  title: { color: colors.text, fontFamily: fonts.outfitBold, fontSize: 28, marginBottom: 2 },
  subtitle: { color: colors.text2, fontFamily: fonts.outfit, fontSize: 13, marginBottom: spacing.lg },

  sectionTitle: {
    color: colors.text,
    fontFamily: fonts.outfitBold,
    fontSize: 16,
    marginBottom: spacing.md,
    marginTop: spacing.lg,
  },

  // ── Total Balance Card ──────────────────────────────────────────────────────
  totalCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border2,
    marginBottom: spacing.xs,
  },
  totalLabel: { color: colors.text3, fontFamily: fonts.outfit, fontSize: 10, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 4 },
  totalAmount: { color: colors.accent, fontFamily: fonts.bebas, fontSize: 48, letterSpacing: 1, marginBottom: spacing.md },
  totalMeta: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: colors.border, paddingTop: spacing.md },
  totalMetaItem: { flex: 1, alignItems: 'center' },
  totalMetaDivider: { width: 1, backgroundColor: colors.border },
  totalMetaLabel: { color: colors.text3, fontFamily: fonts.outfit, fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 3 },
  totalMetaValue: { color: colors.text, fontFamily: fonts.dmMonoMedium, fontSize: 14 },

  // ── Institution Cards ───────────────────────────────────────────────────────
  instCard: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  instHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  instDot: { width: 10, height: 10, borderRadius: 999, marginRight: spacing.sm },
  instName: { flex: 1, color: colors.text, fontFamily: fonts.outfitBold, fontSize: 15 },
  instNet: { fontFamily: fonts.dmMonoMedium, fontSize: 15 },
  acctRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingLeft: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  acctType: { color: colors.text3, fontFamily: fonts.outfit, fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5, width: 72 },
  acctName: { flex: 1, color: colors.text2, fontFamily: fonts.outfit, fontSize: 12 },
  acctBalance: { color: colors.text, fontFamily: fonts.dmMonoMedium, fontSize: 13 },

  // ── Inflow ──────────────────────────────────────────────────────────────────
  inflowTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.accentAlpha8,
    borderRadius: 14,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border2,
  },
  inflowTotalLabel: { color: colors.text2, fontFamily: fonts.outfit, fontSize: 13 },
  inflowTotalAmount: { color: colors.accent, fontFamily: fonts.dmMonoMedium, fontSize: 18 },
  inflowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  inflowDot: { width: 10, height: 10, borderRadius: 999, marginRight: spacing.md, flexShrink: 0 },
  inflowInfo: { flex: 1 },
  inflowLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  inflowInst: { color: colors.text, fontFamily: fonts.outfitBold, fontSize: 13 },
  inflowAmt: { color: colors.accent, fontFamily: fonts.dmMonoMedium, fontSize: 13 },
  inflowTrack: { height: 5, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' },
  inflowBar: { height: '100%', borderRadius: 3 },

  // ── Expense Breakdown ───────────────────────────────────────────────────────
  spendHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  spendTotal: { color: colors.text2, fontFamily: fonts.outfit, fontSize: 13 },
  spendCount: { color: colors.text3, fontFamily: fonts.outfit, fontSize: 12 },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  categoryIcon: { fontSize: 20, marginRight: spacing.md, width: 28 },
  categoryInfo: { flex: 1 },
  categoryLabelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
  categoryName: { color: colors.text, fontFamily: fonts.outfitBold, fontSize: 13 },
  categoryRight: { flexDirection: 'row', gap: spacing.sm, alignItems: 'center' },
  categoryPct: { color: colors.text3, fontFamily: fonts.outfit, fontSize: 11 },
  categoryAmt: { color: colors.warn, fontFamily: fonts.dmMonoMedium, fontSize: 13 },
  categoryTrack: { height: 5, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' },
  categoryBar: { height: '100%', borderRadius: 3, backgroundColor: colors.accent2 },

  // ── Savings & Investments ───────────────────────────────────────────────────
  savingsHeaderRow: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  savingsStat: { flex: 1, alignItems: 'center' },
  savingsStatDivider: { width: 1, backgroundColor: colors.border },
  savingsStatLabel: { color: colors.text3, fontFamily: fonts.outfit, fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 3 },
  savingsStatValue: { fontFamily: fonts.dmMonoMedium, fontSize: 16 },
  savingsAccountCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  investCard: { borderColor: 'rgba(167,139,250,0.2)' },
  savingsAcctBar: { width: 4, height: '100%', position: 'absolute', left: 0, top: 0, bottom: 0 },
  savingsAcctInfo: { flex: 1, paddingLeft: spacing.sm },
  savingsAcctName: { color: colors.text, fontFamily: fonts.outfitBold, fontSize: 13 },
  savingsAcctInst: { color: colors.text3, fontFamily: fonts.outfit, fontSize: 11, marginTop: 1 },
  apyBadge: {
    backgroundColor: colors.accentAlpha10,
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: colors.border2,
    marginRight: spacing.sm,
  },
  apyText: { color: colors.accent, fontFamily: fonts.outfitBold, fontSize: 10 },
  investBadge: {
    backgroundColor: 'rgba(167,139,250,0.12)',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: 'rgba(167,139,250,0.25)',
    marginRight: spacing.sm,
  },
  investBadgeText: { color: colors.purple, fontFamily: fonts.outfitBold, fontSize: 9, letterSpacing: 0.5 },
  savingsAcctBalance: { color: colors.text, fontFamily: fonts.dmMonoMedium, fontSize: 14 },

  // ── Bills ───────────────────────────────────────────────────────────────────
  billsHeaderRow: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  billsStat: { flex: 1, alignItems: 'center' },
  billsStatDivider: { width: 1, backgroundColor: colors.border },
  billsStatLabel: { color: colors.text3, fontFamily: fonts.outfit, fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 3 },
  billsStatValue: { color: colors.text, fontFamily: fonts.dmMonoMedium, fontSize: 15 },
  billRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderLeftWidth: 3,
  },
  billIcon: { fontSize: 18, marginRight: spacing.sm },
  billInfo: { flex: 1 },
  billName: { color: colors.text, fontFamily: fonts.outfitBold, fontSize: 13 },
  billDate: { color: colors.text3, fontFamily: fonts.outfit, fontSize: 11, marginTop: 1 },
  billRight: { alignItems: 'flex-end' },
  billAmt: { color: colors.text, fontFamily: fonts.dmMonoMedium, fontSize: 13, marginBottom: 3 },
  billStatusTag: { borderRadius: 5, paddingHorizontal: 5, paddingVertical: 2 },
  billStatusText: { fontFamily: fonts.outfitBold, fontSize: 9, letterSpacing: 0.5 },

  emptyRow: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  emptyText: { color: colors.text3, fontFamily: fonts.outfit, fontSize: 13 },
});
