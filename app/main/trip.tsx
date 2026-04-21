import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
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
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Trip Mode</Text>
        <Text style={styles.subtitle}>No active trips. Start planning your next getaway!</Text>
        <View style={styles.emptyCard}>
          <Text style={styles.emptyIcon}>✈️</Text>
          <Text style={styles.emptyText}>Create a trip to track your budget and stay on target.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const trip = profile.trip;
  const progress = trip.budgetCents > 0 ? trip.spentCents / trip.budgetCents : 0;
  const remaining = trip.budgetCents - trip.spentCents;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{trip.name}</Text>
      <Text style={styles.subtitle}>{trip.destination}</Text>
      <Text style={styles.dates}>
        {formatDate(trip.startDate)} – {formatDate(trip.endDate)} · {trip.nights} nights
      </Text>

      <LinearGradient colors={gradients.trip.colors} start={gradients.trip.start} end={gradients.trip.end} style={styles.budgetCard}>
        <View style={styles.budgetHeader}>
          <View>
            <Text style={styles.budgetLabel}>Budget</Text>
            <Text style={styles.budgetAmount}>{formatCurrency(trip.budgetCents)}</Text>
          </View>
          <View style={styles.budgetStatusContainer}>
            <Text style={[styles.budgetStatusText, trip.isOnTrack ? { color: colors.accent } : { color: colors.red }]}>
              {trip.isOnTrack ? '✓ On Track' : '⚠ Over Budget'}
            </Text>
          </View>
        </View>

        <View style={styles.progressContainer}>
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
        </View>

        <View style={styles.budgetFooter}>
          <View>
            <Text style={styles.budgetDetailLabel}>Spent</Text>
            <Text style={styles.budgetDetailAmount}>{formatCurrency(trip.spentCents)}</Text>
          </View>
          <View>
            <Text style={[styles.budgetDetailLabel, remaining < 0 && { color: colors.red }]}>Remaining</Text>
            <Text style={[styles.budgetDetailAmount, remaining < 0 && { color: colors.red }]}>{formatCurrency(Math.max(0, remaining))}</Text>
          </View>
        </View>
      </LinearGradient>

      <Text style={styles.sectionTitle}>Spending by category</Text>
      {trip.categories.map(category => (
        <View key={category.label} style={styles.categoryCard}>
          <View style={styles.categoryHeader}>
            <Text style={styles.categoryIcon}>{category.icon}</Text>
            <View style={styles.categoryInfo}>
              <Text style={styles.categoryName}>{category.label}</Text>
              <View style={styles.categoryProgressBackground}>
                <View
                  style={[
                    styles.categoryProgressFill,
                    {
                      width: `${Math.min((category.spentCents / category.budgetCents) * 100, 100)}%`,
                      backgroundColor: category.fillColor,
                    },
                  ]}
                />
              </View>
            </View>
            <View style={styles.categoryAmount}>
              <Text style={styles.categorySpent}>{formatCurrency(category.spentCents)}</Text>
              <Text style={styles.categoryBudget}>of {formatCurrency(category.budgetCents)}</Text>
            </View>
          </View>
        </View>
      ))}

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
              {item.amountCents > 0 && <Text style={styles.itineraryAmount}>{formatCurrency(item.amountCents)}</Text>}
              <Text style={styles.itineraryCovered}>{item.isCovered ? '✓' : '?'}</Text>
            </View>
          ))}
        </>
      )}
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
  },
  dates: {
    color: colors.text3,
    fontFamily: fonts.outfit,
    fontSize: 13,
    marginBottom: spacing.lg,
  },
  emptyCard: {
    marginTop: spacing.xxxl,
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  emptyText: {
    color: colors.text2,
    fontFamily: fonts.outfit,
    fontSize: 16,
    textAlign: 'center',
  },
  budgetCard: {
    borderRadius: 24,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border2,
  },
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  budgetLabel: {
    color: colors.text3,
    fontFamily: fonts.outfit,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  budgetAmount: {
    color: colors.text,
    fontFamily: fonts.bebas,
    fontSize: 28,
  },
  budgetStatusContainer: {
    justifyContent: 'center',
  },
  budgetStatusText: {
    fontFamily: fonts.outfitBold,
    fontSize: 14,
  },
  progressContainer: {
    marginBottom: spacing.lg,
  },
  progressBackground: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  budgetFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  budgetDetailLabel: {
    color: colors.text3,
    fontFamily: fonts.outfit,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  budgetDetailAmount: {
    color: colors.text,
    fontFamily: fonts.dmMonoMedium,
    fontSize: 15,
  },
  sectionTitle: {
    color: colors.text,
    fontFamily: fonts.outfitBold,
    fontSize: 16,
    marginBottom: spacing.md,
    marginTop: spacing.lg,
  },
  categoryCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 20,
    marginRight: spacing.md,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    color: colors.text,
    fontFamily: fonts.outfitBold,
    fontSize: 14,
    marginBottom: 6,
  },
  categoryProgressBackground: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  categoryProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  categoryAmount: {
    alignItems: 'flex-end',
    marginLeft: spacing.md,
  },
  categorySpent: {
    color: colors.text,
    fontFamily: fonts.dmMonoMedium,
    fontSize: 13,
  },
  categoryBudget: {
    color: colors.text3,
    fontFamily: fonts.outfit,
    fontSize: 11,
  },
  itineraryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  itineraryIcon: {
    fontSize: 18,
    marginRight: spacing.md,
  },
  itineraryInfo: {
    flex: 1,
  },
  itineraryDate: {
    color: colors.text3,
    fontFamily: fonts.outfit,
    fontSize: 11,
    marginBottom: 2,
  },
  itineraryEvent: {
    color: colors.text,
    fontFamily: fonts.outfitBold,
    fontSize: 14,
  },
  itineraryAmount: {
    color: colors.text,
    fontFamily: fonts.dmMonoMedium,
    fontSize: 13,
    marginRight: spacing.md,
  },
  itineraryCovered: {
    color: colors.accent,
    fontFamily: fonts.outfitBold,
    fontSize: 16,
  },
});
