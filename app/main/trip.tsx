import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppContext } from '@/context/AppContext';
import { colors, fonts, gradients, spacing } from '@/constants/theme';
import { formatCurrency, formatDate } from '@/utils/formatters';

export const options = {
  title: 'Trip Mode',
  tabBarIcon: () => <Text style={{ fontSize: 20 }}>✈️</Text>,
};

export default function TripModeScreen() {
  const { profile } = useAppContext();

  if (!profile || !profile.trip) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.emptyContainer}>
          <Text style={styles.title}>Trip Mode</Text>
          <Text style={styles.subtitle}>No active trips detected.</Text>
          <View style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>✈️</Text>
            <Text style={styles.emptyText}>
              FinFlow detects upcoming trips from your email and bank statements. Book a flight or hotel and it will appear here automatically.
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const trip = profile.trip;
  const progress = trip.budgetCents > 0 ? trip.spentCents / trip.budgetCents : 0;
  const remaining = trip.budgetCents - trip.spentCents;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ── */}
        <Text style={styles.title}>{trip.name}</Text>
        <Text style={styles.subtitle}>{trip.destination}</Text>
        <Text style={styles.dates}>
          {formatDate(trip.startDate)} – {formatDate(trip.endDate)} · {trip.nights} nights · {trip.travelers} {trip.travelers === 1 ? 'traveler' : 'travelers'}
        </Text>
        {trip.detectedFromEmail && (
          <View style={styles.emailBadge}>
            <Text style={styles.emailBadgeText}>📧 Detected from email</Text>
          </View>
        )}

        {/* ── Budget Card ── */}
        <LinearGradient
          colors={gradients.trip.colors}
          start={gradients.trip.start}
          end={gradients.trip.end}
          style={styles.budgetCard}
        >
          <View style={styles.budgetHeader}>
            <View>
              <Text style={styles.budgetLabel}>BUDGET</Text>
              <Text style={styles.budgetAmount}>{formatCurrency(trip.budgetCents)}</Text>
            </View>
            <View style={[styles.budgetStatus, { backgroundColor: trip.isOnTrack ? colors.accentAlpha10 : colors.redAlpha10 }]}>
              <Text style={[styles.budgetStatusText, { color: trip.isOnTrack ? colors.accent : colors.red }]}>
                {trip.isOnTrack ? '✓ On Track' : '⚠ Over Budget'}
              </Text>
            </View>
          </View>

          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${Math.min(progress * 100, 100)}%`,
                  backgroundColor: progress > 1 ? colors.red : colors.accent,
                },
              ]}
            />
          </View>

          <View style={styles.budgetFooter}>
            <View>
              <Text style={styles.budgetDetailLabel}>Spent</Text>
              <Text style={styles.budgetDetailAmount}>{formatCurrency(trip.spentCents)}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={[styles.budgetDetailLabel, remaining < 0 && { color: colors.red }]}>Remaining</Text>
              <Text style={[styles.budgetDetailAmount, remaining < 0 && { color: colors.red }]}>
                {formatCurrency(Math.abs(remaining))}
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* ── Spending by Category ── */}
        <Text style={styles.sectionTitle}>Spending by category</Text>
        {trip.categories.map(category => {
          const catProgress = category.budgetCents > 0 ? category.spentCents / category.budgetCents : 0;
          return (
            <View key={category.label} style={styles.categoryCard}>
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <View style={styles.categoryInfo}>
                <View style={styles.categoryHeader}>
                  <Text style={styles.categoryName}>{category.label}</Text>
                  <View style={styles.categoryAmounts}>
                    <Text style={styles.categorySpent}>{formatCurrency(category.spentCents)}</Text>
                    <Text style={styles.categoryBudget}> / {formatCurrency(category.budgetCents)}</Text>
                  </View>
                </View>
                <View style={styles.categoryTrack}>
                  <View
                    style={[
                      styles.categoryFill,
                      {
                        width: `${Math.min(catProgress * 100, 100)}%`,
                        backgroundColor: category.fillColor,
                      },
                    ]}
                  />
                </View>
              </View>
            </View>
          );
        })}

        {/* ── Itinerary ── */}
        {trip.itinerary.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Itinerary</Text>
            {trip.itinerary.map((item, index) => (
              <View key={`itinerary-${index}`} style={styles.itineraryCard}>
                <Text style={styles.itineraryIcon}>{item.icon}</Text>
                <View style={styles.itineraryInfo}>
                  <Text style={styles.itineraryDate}>{formatDate(item.date)}</Text>
                  <Text style={styles.itineraryEvent}>{item.event}</Text>
                </View>
                {item.amountCents > 0 && (
                  <Text style={styles.itineraryAmount}>{formatCurrency(item.amountCents)}</Text>
                )}
                <View style={[styles.coveredBadge, { backgroundColor: item.isCovered ? colors.accentAlpha10 : 'rgba(255,255,255,0.06)' }]}>
                  <Text style={[styles.coveredText, { color: item.isCovered ? colors.accent : colors.text3 }]}>
                    {item.isCovered ? '✓' : '?'}
                  </Text>
                </View>
              </View>
            ))}
          </>
        )}

        <View style={{ height: spacing.xxxl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  scroll: { flex: 1 },
  content: { paddingHorizontal: spacing.screen, paddingTop: spacing.xl },
  emptyContainer: { flex: 1, paddingHorizontal: spacing.screen, paddingTop: spacing.xl },

  title: { color: colors.text, fontFamily: fonts.outfitBold, fontSize: 26, marginBottom: 4 },
  subtitle: { color: colors.text2, fontFamily: fonts.outfit, fontSize: 15 },
  dates: { color: colors.text3, fontFamily: fonts.outfit, fontSize: 13, marginBottom: spacing.sm },
  emailBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.blueAlpha6,
    borderRadius: 8,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.blueAlpha12,
  },
  emailBadgeText: { color: colors.accent2, fontFamily: fonts.outfit, fontSize: 11 },

  emptyCard: { marginTop: spacing.xxxl, alignItems: 'center', padding: spacing.xl },
  emptyIcon: { fontSize: 64, marginBottom: spacing.lg },
  emptyText: { color: colors.text2, fontFamily: fonts.outfit, fontSize: 15, textAlign: 'center', lineHeight: 22 },

  budgetCard: {
    borderRadius: 24, padding: spacing.lg, marginBottom: spacing.xl,
    borderWidth: 1, borderColor: colors.border2,
  },
  budgetHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.lg },
  budgetLabel: { color: colors.text3, fontFamily: fonts.outfit, fontSize: 10, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 4 },
  budgetAmount: { color: colors.text, fontFamily: fonts.bebas, fontSize: 32 },
  budgetStatus: { borderRadius: 10, paddingHorizontal: spacing.md, paddingVertical: 6 },
  budgetStatusText: { fontFamily: fonts.outfitBold, fontSize: 13 },
  progressBackground: { height: 8, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'hidden', marginBottom: spacing.lg },
  progressFill: { height: '100%', borderRadius: 4 },
  budgetFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  budgetDetailLabel: { color: colors.text3, fontFamily: fonts.outfit, fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 },
  budgetDetailAmount: { color: colors.text, fontFamily: fonts.dmMonoMedium, fontSize: 16 },

  sectionTitle: { color: colors.text, fontFamily: fonts.outfitBold, fontSize: 16, marginBottom: spacing.md, marginTop: spacing.sm },

  categoryCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.surface, borderRadius: 16,
    padding: spacing.md, marginBottom: spacing.sm,
  },
  categoryIcon: { fontSize: 22, marginRight: spacing.md, width: 28 },
  categoryInfo: { flex: 1 },
  categoryHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  categoryName: { color: colors.text, fontFamily: fonts.outfitBold, fontSize: 13 },
  categoryAmounts: { flexDirection: 'row', alignItems: 'baseline' },
  categorySpent: { color: colors.text, fontFamily: fonts.dmMonoMedium, fontSize: 13 },
  categoryBudget: { color: colors.text3, fontFamily: fonts.outfit, fontSize: 11 },
  categoryTrack: { height: 6, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 3, overflow: 'hidden' },
  categoryFill: { height: '100%', borderRadius: 3 },

  itineraryCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.surface, borderRadius: 14,
    padding: spacing.md, marginBottom: spacing.sm,
  },
  itineraryIcon: { fontSize: 18, marginRight: spacing.md },
  itineraryInfo: { flex: 1 },
  itineraryDate: { color: colors.text3, fontFamily: fonts.outfit, fontSize: 11, marginBottom: 2 },
  itineraryEvent: { color: colors.text, fontFamily: fonts.outfitBold, fontSize: 13 },
  itineraryAmount: { color: colors.text, fontFamily: fonts.dmMonoMedium, fontSize: 13, marginRight: spacing.sm },
  coveredBadge: { width: 28, height: 28, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  coveredText: { fontFamily: fonts.outfitBold, fontSize: 14 },
});
