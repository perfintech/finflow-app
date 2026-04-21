import { View, Text, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { useAppContext } from '@/context/AppContext';
import { colors, fonts, spacing } from '@/constants/theme';
import { formatCurrency } from '@/utils/formatters';

export const options = {
  title: 'Alerts',
  tabBarIcon: () => <Text style={{ fontSize: 20 }}>🚨</Text>,
};

export default function AlertsScreen() {
  const { profile } = useAppContext();

  if (!profile) {
    return (
      <SafeAreaView style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>Loading alerts...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Alerts</Text>
      <Text style={styles.subtitle}>High-signal notices so you can act quickly.</Text>
      <FlatList
        data={profile.alerts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.alertCard, item.type === 'danger' && styles.danger, item.type === 'success' && styles.success, item.type === 'warning' && styles.warning, item.type === 'info' && styles.info]}>
            <Text style={styles.alertIcon}>{item.icon}</Text>
            <View style={styles.alertBody}>
              <Text style={styles.alertTitle}>{item.title}</Text>
              <Text style={styles.alertDescription}>{item.description}</Text>
            </View>
            {item.amountCents ? <Text style={styles.alertAmount}>{formatCurrency(item.amountCents)}</Text> : null}
          </View>
        )}
        contentContainerStyle={{ paddingBottom: spacing.lg }}
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
  alertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  alertIcon: {
    fontSize: 24,
    marginRight: spacing.md,
  },
  alertBody: {
    flex: 1,
  },
  alertTitle: {
    color: colors.text,
    fontFamily: fonts.outfitBold,
    fontSize: 15,
    marginBottom: spacing.xs,
  },
  alertDescription: {
    color: colors.text2,
    fontFamily: fonts.outfit,
    fontSize: 13,
    lineHeight: 20,
  },
  alertAmount: {
    color: colors.accent,
    fontFamily: fonts.dmMonoMedium,
    fontSize: 14,
  },
  danger: {
    borderColor: colors.red,
    borderWidth: 1,
  },
  success: {
    borderColor: colors.accent,
    borderWidth: 1,
  },
  warning: {
    borderColor: colors.warn,
    borderWidth: 1,
  },
  info: {
    borderColor: colors.accent2,
    borderWidth: 1,
  },
});
