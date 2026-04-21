import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppContext } from '@/context/AppContext';
import { colors, fonts, gradients, spacing } from '@/constants/theme';

export const options = {
  title: 'Premium',
  presentation: 'modal',
};

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Essential cash flow tools',
    features: [
      'Safe to Spend calculation',
      'Bill tracking',
      'Cashflow insights',
      'Basic alerts (3 per month)',
      'Email bill detection',
    ],
  },
  {
    name: 'Premium',
    price: '$9.99',
    period: 'per month',
    description: 'Full financial command center',
    features: [
      'Everything in Free, plus:',
      'Unlimited alerts',
      'Subscription waste scoring',
      'Trip budget tracking',
      'Investment portfolio view',
      'Priority support',
      'Custom spending goals',
      'Financial forecasting (1 year)',
      'Tax-ready reports',
    ],
    highlighted: true,
  },
];

export default function PremiumScreen() {
  const { profile } = useAppContext();
  const isPremium = profile?.user.planTier === 'premium';

  const handleUpgrade = () => {
    // Mock upgrade action
    console.log('Upgrade to Premium');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Upgrade to Premium</Text>
      <Text style={styles.subtitle}>Unlock the full power of FinFlow.</Text>

      {isPremium && (
        <View style={styles.currentPlanBadge}>
          <Text style={styles.currentPlanText}>✓ You are a Premium member</Text>
        </View>
      )}

      {PLANS.map((plan, index) => (
        <LinearGradient
          key={index}
          colors={plan.highlighted ? [colors.surface2, colors.surface] : [colors.surface, colors.surface]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.planCard, plan.highlighted && styles.planCardHighlighted]}
        >
          {plan.highlighted && (
            <View style={styles.recommendedBadge}>
              <Text style={styles.recommendedText}>RECOMMENDED</Text>
            </View>
          )}

          <Text style={styles.planName}>{plan.name}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{plan.price}</Text>
            {plan.period !== 'forever' && <Text style={styles.period}>/{plan.period}</Text>}
          </View>
          <Text style={styles.planDescription}>{plan.description}</Text>

          <View style={styles.featuresContainer}>
            {plan.features.map((feature, i) => (
              <View key={`${index}-${i}`} style={styles.featureRow}>
                <Text style={styles.featureIcon}>{i === 0 ? '✓' : '•'}</Text>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>

          {!isPremium && plan.highlighted && (
            <Pressable style={styles.ctaButton} onPress={handleUpgrade}>
              <Text style={styles.ctaButtonText}>Upgrade Now</Text>
            </Pressable>
          )}

          {isPremium && plan.highlighted && (
            <View style={styles.currentButton}>
              <Text style={styles.currentButtonText}>Current Plan</Text>
            </View>
          )}
        </LinearGradient>
      ))}

      <View style={styles.comparisonTable}>
        <Text style={styles.comparisonTitle}>Feature Comparison</Text>
        <View style={styles.comparisonRow}>
          <View style={styles.comparisonFeature}>
            <Text style={styles.comparisonFeatureText}>Safe to Spend</Text>
          </View>
          <View style={styles.comparisonCell}>
            <Text style={styles.comparisonCheck}>✓</Text>
          </View>
          <View style={styles.comparisonCell}>
            <Text style={styles.comparisonCheck}>✓</Text>
          </View>
        </View>
        <View style={styles.comparisonRow}>
          <View style={styles.comparisonFeature}>
            <Text style={styles.comparisonFeatureText}>Unlimited alerts</Text>
          </View>
          <View style={styles.comparisonCell}>
            <Text style={styles.comparisonCheck}>✗</Text>
          </View>
          <View style={styles.comparisonCell}>
            <Text style={styles.comparisonCheck}>✓</Text>
          </View>
        </View>
        <View style={styles.comparisonRow}>
          <View style={styles.comparisonFeature}>
            <Text style={styles.comparisonFeatureText}>Investment tracking</Text>
          </View>
          <View style={styles.comparisonCell}>
            <Text style={styles.comparisonCheck}>✗</Text>
          </View>
          <View style={styles.comparisonCell}>
            <Text style={styles.comparisonCheck}>✓</Text>
          </View>
        </View>
        <View style={styles.comparisonRow}>
          <View style={styles.comparisonFeature}>
            <Text style={styles.comparisonFeatureText}>Tax reports</Text>
          </View>
          <View style={styles.comparisonCell}>
            <Text style={styles.comparisonCheck}>✗</Text>
          </View>
          <View style={styles.comparisonCell}>
            <Text style={styles.comparisonCheck}>✓</Text>
          </View>
        </View>
      </View>

      <View style={styles.faqCard}>
        <Text style={styles.faqTitle}>Frequently asked</Text>
        <View style={styles.faqItem}>
          <Text style={styles.faqQuestion}>Can I cancel anytime?</Text>
          <Text style={styles.faqAnswer}>Yes, no commitments. Cancel from your profile settings.</Text>
        </View>
        <View style={styles.faqItem}>
          <Text style={styles.faqQuestion}>Is there a free trial?</Text>
          <Text style={styles.faqAnswer}>Yes, 30 days free to explore all Premium features.</Text>
        </View>
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
  currentPlanBadge: {
    backgroundColor: colors.accentAlpha10,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border2,
  },
  currentPlanText: {
    color: colors.accent,
    fontFamily: fonts.outfitBold,
    fontSize: 14,
    textAlign: 'center',
  },
  planCard: {
    borderRadius: 24,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    position: 'relative',
  },
  planCardHighlighted: {
    borderColor: colors.accent,
    borderWidth: 2,
  },
  recommendedBadge: {
    position: 'absolute',
    top: -12,
    left: spacing.lg,
    backgroundColor: colors.gold,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: 8,
  },
  recommendedText: {
    color: colors.bg,
    fontFamily: fonts.outfitBold,
    fontSize: 10,
    letterSpacing: 1,
  },
  planName: {
    color: colors.text,
    fontFamily: fonts.outfitBold,
    fontSize: 22,
    marginBottom: spacing.xs,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: spacing.sm,
  },
  price: {
    color: colors.accent,
    fontFamily: fonts.bebas,
    fontSize: 36,
  },
  period: {
    color: colors.text2,
    fontFamily: fonts.outfit,
    fontSize: 14,
    marginLeft: spacing.xs,
  },
  planDescription: {
    color: colors.text2,
    fontFamily: fonts.outfit,
    fontSize: 14,
    marginBottom: spacing.lg,
  },
  featuresContainer: {
    marginBottom: spacing.lg,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  featureIcon: {
    color: colors.accent,
    fontFamily: fonts.outfitBold,
    fontSize: 12,
    marginRight: spacing.md,
    marginTop: 2,
  },
  featureText: {
    color: colors.text,
    fontFamily: fonts.outfit,
    fontSize: 14,
    flex: 1,
  },
  ctaButton: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  ctaButtonText: {
    color: colors.bg,
    fontFamily: fonts.outfitBold,
    fontSize: 15,
  },
  currentButton: {
    borderWidth: 2,
    borderColor: colors.accent,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  currentButtonText: {
    color: colors.accent,
    fontFamily: fonts.outfitBold,
    fontSize: 15,
  },
  comparisonTable: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  comparisonTitle: {
    color: colors.text,
    fontFamily: fonts.outfitBold,
    fontSize: 16,
    marginBottom: spacing.md,
  },
  comparisonRow: {
    flexDirection: 'row',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  comparisonFeature: {
    flex: 1,
  },
  comparisonFeatureText: {
    color: colors.text2,
    fontFamily: fonts.outfit,
    fontSize: 13,
  },
  comparisonCell: {
    width: 50,
    alignItems: 'center',
  },
  comparisonCheck: {
    color: colors.accent,
    fontFamily: fonts.outfitBold,
    fontSize: 14,
  },
  faqCard: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  faqTitle: {
    color: colors.text,
    fontFamily: fonts.outfitBold,
    fontSize: 16,
    marginBottom: spacing.md,
  },
  faqItem: {
    marginBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.surface,
  },
  faqQuestion: {
    color: colors.text,
    fontFamily: fonts.outfitBold,
    fontSize: 14,
    marginBottom: spacing.xs,
  },
  faqAnswer: {
    color: colors.text2,
    fontFamily: fonts.outfit,
    fontSize: 13,
    lineHeight: 20,
  },
});
