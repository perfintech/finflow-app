import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, fonts, spacing } from '@/constants/theme';

const STEPS = ['Account', 'Security', 'Bank', 'Email'];

export default function BiometricScreen() {
  const router = useRouter();
  const [enrolled, setEnrolled] = useState(false);

  const handleEnroll = () => setEnrolled(true);

  const handleContinue = () => router.push('/onboarding/link-bank');

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.content}>
        {/* Step indicator */}
        <View style={styles.steps}>
          {STEPS.map((s, i) => (
            <View key={s} style={[styles.stepPill, i === 1 && styles.stepPillActive]}>
              <Text style={[styles.stepText, i === 1 && styles.stepTextActive]}>{s}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.title}>Secure your account</Text>
        <Text style={styles.subtitle}>No password needed. Your face is your key to bank-grade security.</Text>

        {/* Face ID card */}
        <View style={[styles.biometricCard, enrolled && styles.biometricCardEnrolled]}>
          <Text style={styles.biometricIcon}>{enrolled ? '✅' : '🔐'}</Text>
          <Text style={styles.biometricTitle}>{enrolled ? 'Face ID Enrolled' : 'Enable Face ID'}</Text>
          <Text style={styles.biometricDesc}>
            {enrolled
              ? 'You\'re protected. Biometric login is active.'
              : 'Tap the button below to enroll your face. This stays on-device — never uploaded.'}
          </Text>
          {enrolled && (
            <View style={styles.enrolledBadge}>
              <Text style={styles.enrolledBadgeText}>✓ Enrolled · Protected</Text>
            </View>
          )}
        </View>

        {!enrolled && (
          <Pressable
            style={({ pressed }) => [styles.enrollButton, pressed && { opacity: 0.8 }]}
            onPress={handleEnroll}
          >
            <Text style={styles.enrollButtonText}>Enable Face ID</Text>
          </Pressable>
        )}

        {/* Security row */}
        <View style={styles.securityRow}>
          <Text style={styles.securityText}>🔒  Zero-credential · 256-bit AES · SOC 2 Type II · GDPR compliant · Biometric only</Text>
        </View>
      </View>

      <Pressable
        style={({ pressed }) => [styles.continueButton, pressed && { opacity: 0.8 }]}
        onPress={handleContinue}
      >
        <Text style={styles.continueButtonText}>{enrolled ? 'Continue →' : 'Skip for now'}</Text>
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
  content: { paddingTop: spacing.xl },

  steps: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.xl },
  stepPill: {
    paddingHorizontal: spacing.md,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  stepPillActive: { backgroundColor: colors.accentAlpha10, borderColor: colors.accent },
  stepText: { color: colors.text3, fontFamily: fonts.outfit, fontSize: 11 },
  stepTextActive: { color: colors.accent, fontFamily: fonts.outfitBold },

  title: { color: colors.text, fontFamily: fonts.outfitBold, fontSize: 30, marginBottom: spacing.sm },
  subtitle: { color: colors.text2, fontFamily: fonts.outfit, fontSize: 15, lineHeight: 22, marginBottom: spacing.xl },

  biometricCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: spacing.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
  },
  biometricCardEnrolled: { borderColor: colors.accent, backgroundColor: colors.accentAlpha8 },
  biometricIcon: { fontSize: 56, marginBottom: spacing.md },
  biometricTitle: { color: colors.text, fontFamily: fonts.outfitBold, fontSize: 20, marginBottom: spacing.sm, textAlign: 'center' },
  biometricDesc: { color: colors.text2, fontFamily: fonts.outfit, fontSize: 14, lineHeight: 20, textAlign: 'center' },
  enrolledBadge: {
    marginTop: spacing.md,
    backgroundColor: colors.accentAlpha10,
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: colors.border2,
  },
  enrolledBadgeText: { color: colors.accent, fontFamily: fonts.outfitBold, fontSize: 12 },

  enrollButton: {
    height: 52,
    borderRadius: 999,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  enrollButtonText: { color: colors.bg, fontFamily: fonts.outfitBold, fontSize: 15 },

  securityRow: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: spacing.md,
  },
  securityText: { color: colors.text3, fontFamily: fonts.outfit, fontSize: 11, lineHeight: 16, textAlign: 'center' },

  continueButton: {
    height: 56,
    borderRadius: 999,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButtonText: { color: colors.text, fontFamily: fonts.outfitBold, fontSize: 16 },
});
