import { useEffect, useRef, useState } from 'react';
import { Animated, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, fonts, spacing } from '@/constants/theme';
import { useAppContext } from '@/context/AppContext';
import { formatCurrency } from '@/utils/formatters';

export default function EmailIntelligenceScreen() {
  const router = useRouter();
  const { profile, finishOnboarding } = useAppContext();
  const [syncing, setSyncing] = useState(true);
  const [connected, setConnected] = useState(false);
  const [showAha, setShowAha] = useState(false);
  const [saving, setSaving] = useState(false);
  const slideAnim = useRef(new Animated.Value(400)).current;

  useEffect(() => {
    const t1 = setTimeout(() => setSyncing(false), 1200);
    const t2 = setTimeout(() => {
      setConnected(true);
      setShowAha(true);
      Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true, bounciness: 4 }).start();
    }, 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const wastedCents = profile?.subscriptionsWastedMonthlyCents ?? 4299;
  const wasteSubs = profile?.subscriptions.filter(s => s.isWaste).slice(0, 3) ?? [];

  const handleFinish = async () => {
    setSaving(true);
    await finishOnboarding();
    setSaving(false);
    router.replace('/main/dashboard');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <Text style={styles.title}>Email intelligence</Text>
        <Text style={styles.subtitle}>Connect your inbox to automatically detect subscriptions, bills, and travel plans.</Text>

        <View style={[styles.card, connected && styles.cardConnected]}>
          <Text style={styles.cardLabel}>{connected ? '✅  Connected account' : 'Connecting inbox...'}</Text>
          <Text style={styles.cardTitle}>{profile?.user.email ?? 'Not connected'}</Text>
          <Text style={styles.cardDetail}>
            {syncing ? 'Scanning mailbox...' : connected ? 'Mailbox synced · subscription leaks found 🚨' : 'Analyzing financial emails...'}
          </Text>
          {connected && (
            <View style={styles.scanRow}>
              <View style={styles.scanDot} />
              <Text style={styles.scanText}>✓ Bills detected  ·  ✓ Subscriptions found  ·  ✓ Travel plans</Text>
            </View>
          )}
        </View>

        <View style={styles.privacyBox}>
          <Text style={styles.privacyTitle}>🔒  Privacy First</Text>
          <Text style={styles.privacyText}>FinFlow never reads personal emails. On-device NLP filters only financial signals. Zero email content stored.</Text>
        </View>
      </View>

      <Pressable
        style={[styles.button, (!connected || saving) && styles.buttonDisabled]}
        onPress={handleFinish}
        disabled={!connected || saving}
      >
        <Text style={styles.buttonText}>{saving ? 'Finalizing...' : connected ? 'Go to Dashboard →' : 'Scanning...'}</Text>
      </Pressable>

      {/* AHA Moment Bottom Sheet */}
      <Modal visible={showAha} transparent animationType="none">
        <Pressable style={styles.overlay} onPress={() => setShowAha(false)} />
        <Animated.View style={[styles.sheet, { transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.sheetHandle} />

          <View style={styles.ahaPill}>
            <Text style={styles.ahaPillText}>💸  MONEY LEAK DETECTED</Text>
          </View>

          <Text style={styles.ahaHeadline}>BOOM! WE FOUND</Text>
          <Text style={styles.ahaAmount}>{formatCurrency(wastedCents)}/mo</Text>
          <Text style={styles.ahaSub}>in forgotten subscriptions · {formatCurrency(wastedCents * 12)}/year wasted</Text>

          {wasteSubs.length > 0 && (
            <View style={styles.leakRow}>
              {wasteSubs.map(s => (
                <View key={s.id} style={styles.leakChip}>
                  <Text style={styles.leakChipIcon}>{s.icon}</Text>
                  <Text style={styles.leakChipName}>{s.name}</Text>
                  <Text style={styles.leakChipAmount}>{formatCurrency(s.amountCents)}</Text>
                </View>
              ))}
            </View>
          )}

          <Pressable
            style={({ pressed }) => [styles.ahaButton, pressed && { opacity: 0.85 }]}
            onPress={() => { setShowAha(false); handleFinish(); }}
          >
            <Text style={styles.ahaButtonText}>Review & Cancel in 1 Tap →</Text>
          </Pressable>

          <Pressable onPress={() => setShowAha(false)} style={styles.ahaDismiss}>
            <Text style={styles.ahaDismissText}>Maybe later</Text>
          </Pressable>
        </Animated.View>
      </Modal>
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
  content: { paddingTop: spacing.xxxl },

  title: { color: colors.text, fontFamily: fonts.outfitBold, fontSize: 30, marginBottom: spacing.sm },
  subtitle: { color: colors.text2, fontFamily: fonts.outfit, fontSize: 15, lineHeight: 22, marginBottom: spacing.xl },

  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardConnected: { borderColor: colors.accent },
  cardLabel: { color: colors.accent, fontFamily: fonts.outfitBold, fontSize: 12, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 },
  cardTitle: { color: colors.text, fontFamily: fonts.outfitBold, fontSize: 18, marginBottom: 6 },
  cardDetail: { color: colors.text2, fontFamily: fonts.outfit, fontSize: 14, lineHeight: 20 },
  scanRow: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.md, gap: spacing.sm },
  scanDot: { width: 8, height: 8, borderRadius: 999, backgroundColor: colors.accent },
  scanText: { color: colors.text3, fontFamily: fonts.outfit, fontSize: 11, flex: 1 },

  privacyBox: { backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: spacing.md },
  privacyTitle: { color: colors.text, fontFamily: fonts.outfitBold, fontSize: 14, marginBottom: 4 },
  privacyText: { color: colors.text2, fontFamily: fonts.outfit, fontSize: 13, lineHeight: 20 },

  button: { height: 56, borderRadius: 999, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' },
  buttonDisabled: { opacity: 0.48 },
  buttonText: { color: colors.bg, fontFamily: fonts.outfitBold, fontSize: 16 },

  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: spacing.xl,
    paddingBottom: 48,
    alignItems: 'center',
  },
  sheetHandle: { width: 40, height: 4, borderRadius: 2, backgroundColor: colors.border, marginBottom: spacing.lg },

  ahaPill: {
    backgroundColor: 'rgba(255,82,82,0.12)',
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,82,82,0.25)',
    marginBottom: spacing.lg,
  },
  ahaPillText: { color: colors.red, fontFamily: fonts.outfitBold, fontSize: 11, letterSpacing: 1 },

  ahaHeadline: { color: colors.text3, fontFamily: fonts.outfitBold, fontSize: 13, letterSpacing: 3, marginBottom: 4 },
  ahaAmount: { color: colors.red, fontFamily: fonts.bebas, fontSize: 52, letterSpacing: 2, marginBottom: 4 },
  ahaSub: { color: colors.text2, fontFamily: fonts.outfit, fontSize: 14, marginBottom: spacing.lg, textAlign: 'center' },

  leakRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg, flexWrap: 'wrap', justifyContent: 'center' },
  leakChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.surface2,
    borderRadius: 10,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  leakChipIcon: { fontSize: 14 },
  leakChipName: { color: colors.text2, fontFamily: fonts.outfit, fontSize: 12 },
  leakChipAmount: { color: colors.red, fontFamily: fonts.dmMonoMedium, fontSize: 12 },

  ahaButton: {
    width: '100%',
    height: 52,
    borderRadius: 999,
    backgroundColor: colors.red,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  ahaButtonText: { color: colors.white, fontFamily: fonts.outfitBold, fontSize: 15 },

  ahaDismiss: { paddingVertical: spacing.sm },
  ahaDismissText: { color: colors.text3, fontFamily: fonts.outfit, fontSize: 14 },
});
