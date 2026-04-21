import { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, spacing } from '@/constants/theme';
import { useAppContext } from '@/context/AppContext';

export default function EmailIntelligenceScreen() {
  const router = useRouter();
  const { profile, finishOnboarding } = useAppContext();
  const [connected, setConnected] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setConnected(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleFinish = async () => {
    setSaving(true);
    await finishOnboarding();
    setSaving(false);
    router.replace('/main/dashboard');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Email intelligence</Text>
        <Text style={styles.subtitle}>Connect your inbox to automatically detect subscriptions, bills, and travel plans.</Text>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Connected account</Text>
          <Text style={styles.cardTitle}>{profile?.user.email ?? 'Not connected'}</Text>
          <Text style={styles.cardDetail}>{connected ? 'Mailbox synced · 5 new matches found' : 'Connecting your inbox...'}</Text>
        </View>
        <View style={styles.helpBox}>
          <Text style={styles.helpTitle}>Security first</Text>
          <Text style={styles.helpText}>No passwords are stored. This is a mock integration for FinFlow MVP.</Text>
        </View>
      </View>
      <Pressable style={[styles.button, !connected && styles.buttonDisabled]} onPress={handleFinish} disabled={!connected || saving}>
        <Text style={styles.buttonText}>{saving ? 'Finalizing...' : 'Finish setup'}</Text>
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
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  cardLabel: {
    color: colors.text3,
    fontFamily: fonts.outfit,
    fontSize: 12,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  cardTitle: {
    color: colors.text,
    fontFamily: fonts.outfitBold,
    fontSize: 18,
    marginBottom: 6,
  },
  cardDetail: {
    color: colors.text2,
    fontFamily: fonts.outfit,
    fontSize: 14,
    lineHeight: 20,
  },
  helpBox: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 16,
    padding: spacing.md,
  },
  helpTitle: {
    color: colors.text,
    fontFamily: fonts.outfitBold,
    fontSize: 14,
    marginBottom: 4,
  },
  helpText: {
    color: colors.text2,
    fontFamily: fonts.outfit,
    fontSize: 13,
    lineHeight: 20,
  },
  button: {
    height: 56,
    borderRadius: 999,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.48,
  },
  buttonText: {
    color: colors.bg,
    fontFamily: fonts.outfitBold,
    fontSize: 16,
  },
});
