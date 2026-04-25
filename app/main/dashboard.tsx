import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppContext } from '@/context/AppContext';
import { colors, fonts, gradients, spacing } from '@/constants/theme';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { RingChart, SparklineChart } from '@/components/Charts';

export const options = {
  title: 'Dashboard',
  tabBarIcon: () => <Text style={{ fontSize: 20 }}>🏠</Text>,
};

const QUICK_ACTIONS = [
  { icon: '💳', label: 'Can I\nAfford It?', route: '/main/spend-check', bg: 'rgba(0,245,176,0.10)', border: 'rgba(0,245,176,0.25)' },
  { icon: '🔄', label: 'Sub\nAudit', route: '/main/subscriptions', bg: 'rgba(91,141,255,0.10)', border: 'rgba(91,141,255,0.25)' },
  { icon: '✈️', label: 'Trip\nMode', route: '/main/trip', bg: 'rgba(167,139,250,0.10)', border: 'rgba(167,139,250,0.25)' },
  { icon: '💎', label: 'Go\nPremium', route: '/main/premium', bg: 'rgba(255,209,102,0.10)', border: 'rgba(255,209,102,0.25)' },
] as const;

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function DashboardScreen() {
  const router = useRouter();
  const { profile } = useAppContext();

  if (!profile) {
    return (
      <SafeAreaView style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>Loading profile...</Text>
      </SafeAreaView>
    );
  }

  const topAccounts = profile.accounts.slice(0, 3);
  const recentTxns = profile.transactions.filter(t => t.isDebit).slice(0, 4);
  const hasTrip = !!profile.trip;
  const unreadAlerts = profile.alerts.filter(a => !a.isRead).length;

  const totalBalance = profile.accounts.reduce((s, a) => s + a.balanceCents, 0);
  const prevMonthWorth = profile.netWorthCents - (profile.monthlyIncomeCents - profile.monthlySpendCents);
  const netWorthDeltaCents = profile.netWorthCents - prevMonthWorth;
  const netWorthDeltaPct = prevMonthWorth > 0 ? ((netWorthDeltaCents / prevMonthWorth) * 100).toFixed(2) : '0.00';

  const stsMax = profile.monthlyIncomeCents > 0 ? profile.monthlyIncomeCents : profile.safeToSpendCents * 3;
  const billsCovered = profile.bills.every(b => b.status !== 'overdue');
  const nextBillDate = profile.bills.length > 0
    ? new Date(profile.bills[0].dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    : null;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ── */}
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>{getGreeting()}, {profile.user.greeting} 👋</Text>
            <Text style={styles.status}>Safe to Spend · {formatCurrency(profile.safeToSpendCents)}</Text>
          </View>
          <Pressable
            style={({ pressed }) => [styles.bellButton, pressed && { opacity: 0.7 }]}
            onPress={() => router.push('/main/alerts' as any)}
          >
            <Text style={styles.bellIcon}>🔔</Text>
            {unreadAlerts > 0 && (
              <View style={styles.bellBadge}>
                <Text style={styles.bellBadgeText}>{unreadAlerts}</Text>
              </View>
            )}
          </Pressable>
        </View>

        {/* ── Net Worth Card ── */}
        <LinearGradient
          colors={gradients.netWorth.colors}
          start={gradients.netWorth.start}
          end={gradients.netWorth.end}
          style={styles.netWorthCard}
        >
          <View style={styles.netWorthHeader}>
            <View>
              <Text style={styles.netWorthLabel}>NET WORTH</Text>
              <Text style={styles.netWorthAmount}>{formatCurrency(profile.netWorthCents)}</Text>
              <View style={styles.deltaBadge}>
                <Text style={[styles.deltaText, { color: netWorthDeltaCents >= 0 ? colors.accent : colors.red }]}>
                  {netWorthDeltaCents >= 0 ? '↑' : '↓'} {netWorthDeltaCents >= 0 ? '+' : ''}{formatCurrency(Math.abs(netWorthDeltaCents))} this month · {netWorthDeltaCents >= 0 ? '+' : ''}{netWorthDeltaPct}%
                </Text>
              </View>
            </View>
            {profile.sparklineData.length > 0 && (
              <SparklineChart
                data={profile.sparklineData}
                width={80}
                height={40}
                strokeColor={colors.accent}
              />
            )}
          </View>
          <View style={styles.netWorthFooter}>
            <View style={styles.netWorthStat}>
              <Text style={styles.netWorthStatLabel}>Monthly income</Text>
              <Text style={styles.netWorthStatValue}>{formatCurrency(profile.monthlyIncomeCents)}</Text>
            </View>
            <View style={[styles.netWorthStat, { alignItems: 'flex-end' }]}>
              <Text style={styles.netWorthStatLabel}>Monthly spend</Text>
              <Text style={styles.netWorthStatValue}>{formatCurrency(profile.monthlySpendCents)}</Text>
            </View>
          </View>
        </LinearGradient>

        {/* ── Safe to Spend Ring ── */}
        <View style={styles.stsCard}>
          <View style={styles.stsLeft}>
            <Text style={styles.stsLabel}>SAFE TO SPEND</Text>
            <Text style={styles.stsAmount}>{formatCurrency(profile.safeToSpendCents)}</Text>
            <Text style={styles.stsAvailable}>available now</Text>
            {billsCovered && nextBillDate && (
              <View style={styles.billsCoveredBadge}>
                <Text style={styles.billsCoveredText}>✓ All bills covered through {nextBillDate}</Text>
              </View>
            )}
          </View>
          <RingChart
            value={profile.safeToSpendCents}
            maxValue={stsMax}
            size={100}
            width={10}
            fillColor={colors.accent}
            trackColor={colors.surface2}
          />
        </View>

        {/* ── Quick Actions ── */}
        <Text style={styles.sectionTitle}>Quick actions</Text>
        <View style={styles.quickActionsRow}>
          {QUICK_ACTIONS.map(action => (
            <Pressable
              key={action.route}
              style={({ pressed }) => [
                styles.quickAction,
                { backgroundColor: action.bg, borderColor: action.border },
                pressed && { opacity: 0.7 },
              ]}
              onPress={() => router.push(action.route as any)}
            >
              <Text style={styles.quickActionIcon}>{action.icon}</Text>
              <Text style={styles.quickActionLabel}>{action.label}</Text>
            </Pressable>
          ))}
        </View>

        {/* ── Trip Banner (if active) ── */}
        {hasTrip && (
          <Pressable
            style={({ pressed }) => [styles.tripBanner, pressed && { opacity: 0.8 }]}
            onPress={() => router.push('/main/trip' as any)}
          >
            <Text style={styles.tripIcon}>✈️</Text>
            <View style={styles.tripInfo}>
              <Text style={styles.tripName}>{profile.trip!.name}</Text>
              <Text style={styles.tripDest}>{profile.trip!.destination} · {profile.trip!.nights} nights</Text>
            </View>
            <View style={[styles.tripStatus, { backgroundColor: profile.trip!.isOnTrack ? colors.accentAlpha10 : colors.redAlpha10 }]}>
              <Text style={[styles.tripStatusText, { color: profile.trip!.isOnTrack ? colors.accent : colors.red }]}>
                {profile.trip!.isOnTrack ? '✓ On Track' : '⚠ Over'}
              </Text>
            </View>
          </Pressable>
        )}

        {/* ── Accounts ── */}
        <Text style={styles.sectionTitle}>Accounts</Text>
        {topAccounts.map(account => (
          <View key={account.id} style={styles.accountCard}>
            <View style={[styles.accountDot, { backgroundColor: account.color }]} />
            <View style={styles.accountInfo}>
              <Text style={styles.accountName}>{account.name}</Text>
              <Text style={styles.accountLabel}>{account.institution}</Text>
            </View>
            <Text style={[styles.accountBalance, account.balanceCents < 0 && { color: colors.warn }]}>
              {formatCurrency(account.balanceCents)}
            </Text>
          </View>
        ))}

        {/* ── Subscription Waste Alert ── */}
        {profile.subscriptionsWastedMonthlyCents > 0 && (
          <Pressable
            style={({ pressed }) => [styles.wasteAlert, pressed && { opacity: 0.8 }]}
            onPress={() => router.push('/main/subscriptions' as any)}
          >
            <Text style={styles.wasteAlertIcon}>⚠️</Text>
            <View style={styles.wasteAlertBody}>
              <Text style={styles.wasteAlertTitle}>Subscription waste detected</Text>
              <Text style={styles.wasteAlertDesc}>
                {formatCurrency(profile.subscriptionsWastedMonthlyCents)}/mo in unused subscriptions
              </Text>
            </View>
            <Text style={styles.wasteAlertArrow}>›</Text>
          </Pressable>
        )}

        {/* ── Recent Transactions ── */}
        <Text style={styles.sectionTitle}>Recent spending</Text>
        {recentTxns.map(txn => (
          <View key={txn.id} style={styles.txnRow}>
            <Text style={styles.txnIcon}>{txn.merchantIcon}</Text>
            <View style={styles.txnInfo}>
              <Text style={styles.txnMerchant}>{txn.merchant}</Text>
              <Text style={styles.txnMeta}>{txn.category} · {formatDate(txn.date)}</Text>
            </View>
            <Text style={styles.txnAmount}>-{formatCurrency(txn.amountCents)}</Text>
          </View>
        ))}

        {/* ── Upcoming Bills ── */}
        <Text style={styles.sectionTitle}>Upcoming bills</Text>
        {profile.bills.map(bill => (
          <View key={bill.id} style={[styles.billRow, bill.status === 'due_soon' && styles.billDueSoon, bill.status === 'overdue' && styles.billOverdue]}>
            <View style={[styles.billDot, { backgroundColor: bill.color }]} />
            <Text style={styles.billIcon}>{bill.icon}</Text>
            <View style={styles.billInfo}>
              <Text style={styles.billName}>{bill.name}</Text>
              <Text style={styles.billDate}>Due {formatDate(bill.dueDate)}</Text>
            </View>
            <View style={styles.billRight}>
              <Text style={[styles.billAmount, bill.status === 'overdue' && { color: colors.red }]}>
                {formatCurrency(bill.amountCents)}
              </Text>
              {bill.status === 'overdue' && <Text style={styles.billOverdueTag}>OVERDUE</Text>}
              {bill.status === 'due_soon' && <Text style={styles.billDueSoonTag}>DUE SOON</Text>}
            </View>
          </View>
        ))}

        <View style={{ height: spacing.xxxl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
  fallbackContainer: { flex: 1, backgroundColor: colors.bg, justifyContent: 'center', alignItems: 'center' },
  fallbackText: { color: colors.text2, fontFamily: fonts.outfit },

  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.lg },
  headerLeft: { flex: 1 },
  greeting: { color: colors.accent, fontFamily: fonts.outfitBold, fontSize: 24, marginBottom: 2 },
  status: { color: colors.text2, fontFamily: fonts.outfit, fontSize: 13 },

  bellButton: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  bellIcon: { fontSize: 22 },
  bellBadge: {
    position: 'absolute',
    top: 2, right: 2,
    minWidth: 16, height: 16,
    borderRadius: 8,
    backgroundColor: colors.red,
    alignItems: 'center', justifyContent: 'center',
    paddingHorizontal: 3,
  },
  bellBadgeText: { color: colors.white, fontFamily: fonts.outfitBold, fontSize: 9 },

  netWorthCard: {
    borderRadius: 24,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  netWorthHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.lg },
  netWorthLabel: { color: colors.text3, fontFamily: fonts.outfit, fontSize: 10, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 4 },
  netWorthAmount: { color: colors.text, fontFamily: fonts.bebas, fontSize: 44, letterSpacing: 1 },
  deltaBadge: { marginTop: 4 },
  deltaText: { fontFamily: fonts.outfit, fontSize: 12 },
  netWorthFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  netWorthStat: {},
  netWorthStatLabel: { color: colors.text3, fontFamily: fonts.outfit, fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 },
  netWorthStatValue: { color: colors.text, fontFamily: fonts.dmMonoMedium, fontSize: 15 },

  stsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border2,
  },
  stsLeft: { flex: 1 },
  stsLabel: { color: colors.text3, fontFamily: fonts.outfit, fontSize: 10, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 4 },
  stsAmount: { color: colors.accent, fontFamily: fonts.bebas, fontSize: 36, letterSpacing: 1 },
  stsAvailable: { color: colors.text2, fontFamily: fonts.outfit, fontSize: 12, marginBottom: spacing.sm },
  billsCoveredBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accentAlpha10,
    borderRadius: 8,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: colors.border2,
  },
  billsCoveredText: { color: colors.accent, fontFamily: fonts.outfit, fontSize: 10 },

  sectionTitle: { color: colors.text, fontFamily: fonts.outfitBold, fontSize: 16, marginBottom: spacing.md, marginTop: spacing.xs },

  quickActionsRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.xl },
  quickAction: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    padding: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 72,
  },
  quickActionIcon: { fontSize: 20, marginBottom: 4 },
  quickActionLabel: { color: colors.text, fontFamily: fonts.outfitBold, fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5, textAlign: 'center', lineHeight: 14 },

  tripBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: spacing.md,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border2,
  },
  tripIcon: { fontSize: 24, marginRight: spacing.md },
  tripInfo: { flex: 1 },
  tripName: { color: colors.text, fontFamily: fonts.outfitBold, fontSize: 14, marginBottom: 2 },
  tripDest: { color: colors.text2, fontFamily: fonts.outfit, fontSize: 12 },
  tripStatus: { borderRadius: 8, paddingHorizontal: spacing.sm, paddingVertical: 4 },
  tripStatusText: { fontFamily: fonts.outfitBold, fontSize: 11 },

  accountCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  accountDot: { width: 10, height: 10, borderRadius: 999, marginRight: spacing.md },
  accountInfo: { flex: 1 },
  accountName: { color: colors.text, fontFamily: fonts.outfitBold, fontSize: 14 },
  accountLabel: { color: colors.text3, fontFamily: fonts.outfit, fontSize: 12 },
  accountBalance: { color: colors.text, fontFamily: fonts.dmMonoMedium, fontSize: 15 },

  wasteAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.warnAlpha10,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.warnAlpha15,
  },
  wasteAlertIcon: { fontSize: 20, marginRight: spacing.md },
  wasteAlertBody: { flex: 1 },
  wasteAlertTitle: { color: colors.warn, fontFamily: fonts.outfitBold, fontSize: 13, marginBottom: 2 },
  wasteAlertDesc: { color: colors.text2, fontFamily: fonts.outfit, fontSize: 12 },
  wasteAlertArrow: { color: colors.text2, fontSize: 22, fontWeight: '300' },

  txnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  txnIcon: { fontSize: 20, marginRight: spacing.md },
  txnInfo: { flex: 1 },
  txnMerchant: { color: colors.text, fontFamily: fonts.outfitBold, fontSize: 14 },
  txnMeta: { color: colors.text3, fontFamily: fonts.outfit, fontSize: 11, marginTop: 2 },
  txnAmount: { color: colors.red, fontFamily: fonts.dmMonoMedium, fontSize: 13 },

  billRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  billDueSoon: { borderColor: colors.warn, backgroundColor: colors.warnAlpha10 },
  billOverdue: { borderColor: colors.red, backgroundColor: colors.redAlpha10 },
  billDot: { width: 8, height: 8, borderRadius: 999, marginRight: spacing.sm },
  billIcon: { fontSize: 16, marginRight: spacing.sm },
  billInfo: { flex: 1 },
  billName: { color: colors.text, fontFamily: fonts.outfitBold, fontSize: 13 },
  billDate: { color: colors.text3, fontFamily: fonts.outfit, fontSize: 11, marginTop: 1 },
  billRight: { alignItems: 'flex-end' },
  billAmount: { color: colors.text, fontFamily: fonts.dmMonoMedium, fontSize: 13 },
  billOverdueTag: { color: colors.red, fontFamily: fonts.outfitBold, fontSize: 9, marginTop: 2, letterSpacing: 0.5 },
  billDueSoonTag: { color: colors.warn, fontFamily: fonts.outfitBold, fontSize: 9, marginTop: 2, letterSpacing: 0.5 },
});
