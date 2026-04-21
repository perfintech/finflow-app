import { useMemo, useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, spacing } from '@/constants/theme';
import { useAppContext } from '@/context/AppContext';

const BANK_OPTIONS = [
  { name: 'Chase Bank', color: '#003087' },
  { name: 'Wells Fargo', color: '#c0392b' },
  { name: 'Fidelity', color: '#006633' },
  { name: 'Bank of America', color: '#c0392b' },
];

export default function LinkBankScreen() {
  const router = useRouter();
  const { profile, chooseBank } = useAppContext();
  const [selected, setSelected] = useState(BANK_OPTIONS[0]);

  const bankLabel = useMemo(() => selected.name, [selected]);

  const handleContinue = () => {
    chooseBank(selected.name, selected.color);
    router.push('/onboarding/email');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Link your bank</Text>
        <Text style={styles.subtitle}>Select the primary institution where your paycheck and bills live.</Text>
        <View style={styles.options}>
          {BANK_OPTIONS.map(option => {
            const active = option.name === selected.name;
            return (
              <Pressable
                key={option.name}
                style={[styles.option, active && { borderColor: option.color, backgroundColor: 'rgba(255,255,255,0.03)' }]}
                onPress={() => setSelected(option)}>
                <View style={[styles.badge, { backgroundColor: option.color }]} />
                <Text style={styles.optionText}>{option.name}</Text>
              </Pressable>
            );
          })}
        </View>
        <Text style={styles.currentBank}>Current bank: {profile?.user.bankName ?? bankLabel}</Text>
      </View>
      <Pressable style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingHorizontal: spacing.screen,
    justifyContent: 'space-between',
    paddingBottom: spacing.xxl,
  },
  content: {
    paddingTop: spacing.xxxl,
  },
  title: {
    color: colors.text,
    fontFamily: fonts.outfitBold,
    fontSize: 30,
    marginBottom: spacing.sm,
  },
  subtitle: {
    color: colors.text2,
    fontFamily: fonts.outfit,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: spacing.xl,
  },
  options: {
    gap: spacing.md,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  badge: {
    width: 14,
    height: 14,
    borderRadius: 999,
    marginRight: spacing.md,
  },
  optionText: {
    color: colors.text,
    fontFamily: fonts.outfit,
    fontSize: 16,
  },
  currentBank: {
    marginTop: spacing.xl,
    color: colors.text2,
    fontFamily: fonts.outfit,
    fontSize: 14,
  },
  button: {
    height: 56,
    borderRadius: 999,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.bg,
    fontFamily: fonts.outfitBold,
    fontSize: 16,
    letterSpacing: 0.5,
  },
});
