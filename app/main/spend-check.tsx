import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppContext } from '@/context/AppContext';
import { colors, fonts, gradients, spacing } from '@/constants/theme';
import { formatCurrency } from '@/utils/formatters';

export const options = {
  title: 'Spend Check',
  presentation: 'modal',
};

export default function SpendCheckScreen() {
  const { profile } = useAppContext();
  const [amount, setAmount] = useState('');
  const [verdict, setVerdict] = useState<'YES' | 'NO' | 'CAUTION' | null>(null);

  const calculateVerdict = (inputAmount: string) => {
    if (!inputAmount || !profile) {
      setVerdict(null);
      return;
    }

    const spendAmount = Math.round(parseFloat(inputAmount) * 100);
    const safeToSpend = profile.safeToSpendCents;
    const billsCovered = profile.accounts
      .filter(a => a.type === 'checking')
      .some(a => {
        const requiredForBills = profile.bills.reduce((sum, b) => sum + b.amountCents, 0);
        return a.balanceCents - spendAmount > requiredForBills;
      });

    if (spendAmount <= 0) {
      setVerdict(null);
      return;
    }

    if (spendAmount > safeToSpend) {
      setVerdict('NO');
    } else if (spendAmount > safeToSpend * 0.7) {
      setVerdict('CAUTION');
    } else {
      setVerdict('YES');
    }
  };

  if (!profile) {
    return (
      <SafeAreaView style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>Loading profile...</Text>
      </SafeAreaView>
    );
  }

  const verdictGradient =
    verdict === 'YES'
      ? gradients.ahaMoment
      : verdict === 'CAUTION'
        ? gradients.premium
        : verdict === 'NO'
          ? gradients.cancelDanger
          : null;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Can I afford it?</Text>
      <Text style={styles.subtitle}>Check your Safe to Spend before any purchase.</Text>

      <View style={styles.inputCard}>
        <Text style={styles.inputLabel}>Amount</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.currencySymbol}>$</Text>
          <TextInput
            placeholder="0.00"
            placeholderTextColor={colors.text3}
            value={amount}
            onChangeText={text => {
              setAmount(text);
              calculateVerdict(text);
            }}
            keyboardType="decimal-pad"
            style={styles.amountInput}
          />
        </View>
      </View>

      {verdict && verdictGradient ? (
        <LinearGradient colors={verdictGradient.colors} start={verdictGradient.start} end={verdictGradient.end} style={styles.verdictCard}>
          <Text style={[styles.verdictLabel, verdict === 'YES' && styles.verdictYes, verdict === 'CAUTION' && styles.verdictCaution, verdict === 'NO' && styles.verdictNo]}>
            {verdict === 'YES' ? '✓ YES' : verdict === 'CAUTION' ? '⚠ CAUTION' : '✗ NO'}
          </Text>

          {verdict === 'YES' ? (
            <View>
              <Text style={styles.verdictMessage}>You can afford this purchase.</Text>
              <Text style={styles.verdictDetail}>Safe to Spend after: {formatCurrency(profile.safeToSpendCents - Math.round(parseFloat(amount) * 100))}</Text>
              <Text style={styles.verdictHint}>All upcoming bills will still be covered.</Text>
            </View>
          ) : verdict === 'CAUTION' ? (
            <View>
              <Text style={styles.verdictMessage}>This will use most of your Safe to Spend.</Text>
              <Text style={styles.verdictDetail}>Remaining: {formatCurrency(Math.max(0, profile.safeToSpendCents - Math.round(parseFloat(amount) * 100)))}</Text>
              <Text style={styles.verdictHint}>Consider waiting until your next paycheck.</Text>
            </View>
          ) : (
            <View>
              <Text style={styles.verdictMessage}>Not enough in Safe to Spend.</Text>
              <Text style={styles.verdictDetail}>Shortfall: {formatCurrency(Math.round(parseFloat(amount) * 100) - profile.safeToSpendCents)}</Text>
              <Text style={styles.verdictHint}>Next bill due: {profile.bills.length > 0 ? profile.bills[0].name : 'N/A'}</Text>
            </View>
          )}
        </LinearGradient>
      ) : null}

      <View style={styles.contextCard}>
        <Text style={styles.contextLabel}>Current Safe to Spend</Text>
        <Text style={styles.contextValue}>{formatCurrency(profile.safeToSpendCents)}</Text>
        <Text style={styles.contextHint}>Based on checking balance, bills due, and emergency buffer</Text>
      </View>

      <View style={styles.contextCard}>
        <Text style={styles.contextLabel}>Upcoming bills</Text>
        {profile.bills.slice(0, 3).map(bill => (
          <View key={bill.id} style={styles.billRow}>
            <Text style={styles.billIcon}>{bill.icon}</Text>
            <View style={styles.billInfo}>
              <Text style={styles.billName}>{bill.name}</Text>
              <Text style={styles.billDate}>Due {bill.dueDate}</Text>
            </View>
            <Text style={styles.billAmount}>{formatCurrency(bill.amountCents)}</Text>
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
  content: { paddingHorizontal: spacing.screen, paddingTop: spacing.xl },
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
    marginBottom: spacing.xl,
  },
  inputCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  inputLabel: {
    color: colors.text3,
    fontFamily: fonts.outfit,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencySymbol: {
    color: colors.accent,
    fontFamily: fonts.bebas,
    fontSize: 32,
    marginRight: spacing.sm,
  },
  amountInput: {
    flex: 1,
    color: colors.text,
    fontFamily: fonts.bebas,
    fontSize: 32,
    padding: 0,
  },
  verdictCard: {
    borderRadius: 20,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  verdictLabel: {
    fontFamily: fonts.outfitBold,
    fontSize: 20,
    marginBottom: spacing.md,
  },
  verdictYes: {
    color: colors.accent,
  },
  verdictCaution: {
    color: colors.warn,
  },
  verdictNo: {
    color: colors.red,
  },
  verdictMessage: {
    color: colors.text,
    fontFamily: fonts.outfitBold,
    fontSize: 16,
    marginBottom: spacing.xs,
  },
  verdictDetail: {
    color: colors.text2,
    fontFamily: fonts.outfit,
    fontSize: 14,
    marginBottom: spacing.xs,
  },
  verdictHint: {
    color: colors.text3,
    fontFamily: fonts.outfit,
    fontSize: 13,
  },
  contextCard: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  contextLabel: {
    color: colors.text3,
    fontFamily: fonts.outfit,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  contextValue: {
    color: colors.accent,
    fontFamily: fonts.bebas,
    fontSize: 28,
    marginBottom: spacing.xs,
  },
  contextHint: {
    color: colors.text2,
    fontFamily: fonts.outfit,
    fontSize: 13,
  },
  billRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  billIcon: {
    fontSize: 18,
    marginRight: spacing.md,
  },
  billInfo: {
    flex: 1,
  },
  billName: {
    color: colors.text,
    fontFamily: fonts.outfitBold,
    fontSize: 14,
  },
  billDate: {
    color: colors.text3,
    fontFamily: fonts.outfit,
    fontSize: 12,
  },
  billAmount: {
    color: colors.text,
    fontFamily: fonts.dmMonoMedium,
    fontSize: 14,
  },
});
