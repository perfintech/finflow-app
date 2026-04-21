import { Link } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts, typography, gradients, spacing } from '@/constants/theme';

export default function SplashScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient style={styles.background} colors={gradients.splash.colors} start={gradients.splash.start} end={gradients.splash.end} />
      <View style={styles.content}>
        <Text style={styles.brand}>FinFlow</Text>
        <Text style={styles.subtitle}>Know where you stand. Always.</Text>
        <Text style={styles.body}>
          AI-powered cash flow, subscription intelligence, and real-time Safe to Spend all in one dark-mode experience.
        </Text>
      </View>
      <Link href="/onboarding/create-account" style={styles.ctaButton}>
        <Text style={styles.ctaText}>Get Started</Text>
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    position: 'relative',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.screen,
  },
  brand: {
    color: colors.accent,
    fontFamily: fonts.bebas,
    fontSize: 56,
    letterSpacing: 4,
    marginBottom: 12,
  },
  subtitle: {
    color: colors.text,
    fontFamily: fonts.outfitBold,
    fontSize: 24,
    marginBottom: 12,
  },
  body: {
    color: colors.text2,
    fontFamily: fonts.outfit,
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 360,
  },
  ctaButton: {
    margin: spacing.xxxl,
    paddingVertical: 18,
    borderRadius: 999,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 6,
  },
  ctaText: {
    color: colors.bg,
    fontFamily: fonts.outfitBold,
    fontSize: 16,
    letterSpacing: 1,
  },
});
