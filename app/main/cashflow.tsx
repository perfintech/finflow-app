import { View, Text, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { useAppContext } from '@/context/AppContext';
import { colors, fonts, spacing } from '@/constants/theme';
import { formatCurrency, formatDate } from '@/utils/formatters';

export const options = {
  title: 'Cashflow',
  tabBarIcon: () => <Text style={{ fontSize: 20 }}>📈</Text>,
};

export default function CashflowScreen() {
  const { profile } = useAppContext();

  if (!profile) {
    return (
      <SafeAreaView style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>Loading cashflow...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Monthly Cashflow</Text>
      <Text style={styles.subtitle}>Track income and spending month by month.</Text>
      <FlatList
        data={profile.cashflow}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <View>
              <Text style={styles.itemMonth}>{item.monthLabel}</Text>
              <Text style={styles.itemDetail}>Income {formatCurrency(item.incomeCents)}</Text>
            </View>
            <View style={styles.itemRight}>
              <Text style={styles.itemNet}>{formatCurrency(item.netCents)}</Text>
              <Text style={styles.itemDetail}>Spend {formatCurrency(item.spendCents)}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: spacing.lg }}
      />
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Projection</Text>
        <Text style={styles.summaryText}>30-day change: {formatCurrency(profile.projection.thirtyDay * 100)}</Text>
        <Text style={styles.summaryText}>60-day change: {formatCurrency(profile.projection.sixtyDay * 100)}</Text>
        <Text style={styles.summaryText}>90-day change: {formatCurrency(profile.projection.ninetyDay * 100)}</Text>
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
  itemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  itemMonth: {
    color: colors.accent,
    fontFamily: fonts.outfitBold,
    fontSize: 16,
    marginBottom: spacing.xs,
  },
  itemDetail: {
    color: colors.text2,
    fontFamily: fonts.outfit,
    fontSize: 13,
  },
  itemRight: {
    alignItems: 'flex-end',
  },
  itemNet: {
    color: colors.text,
    fontFamily: fonts.dmMonoMedium,
    fontSize: 16,
    marginBottom: spacing.xs,
  },
  summaryCard: {
    marginTop: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: spacing.lg,
  },
  summaryLabel: {
    color: colors.text3,
    fontFamily: fonts.outfit,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  summaryText: {
    color: colors.text,
    fontFamily: fonts.outfit,
    fontSize: 14,
    marginBottom: spacing.xs,
  },
});
