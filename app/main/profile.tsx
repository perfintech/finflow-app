import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAppContext } from '@/context/AppContext';
import { colors, fonts, spacing } from '@/constants/theme';
import { formatCurrency } from '@/utils/formatters';

export const options = {
  title: 'Profile',
  tabBarIcon: () => <Text style={{ fontSize: 20 }}>👤</Text>,
};

const MENU_ITEMS: Array<{ icon: string; label: string; sub: string; route: string; accent?: boolean }> = [
  { icon: '💳', label: 'Spend Check', sub: 'Can I afford it?', route: '/main/spend-check' },
  { icon: '🔄', label: 'Subscription Audit', sub: 'Review & cancel waste', route: '/main/subscriptions' },
  { icon: '✈️', label: 'Trip Mode', sub: 'Track travel budget', route: '/main/trip' },
  { icon: '💎', label: 'Go Premium', sub: 'Unlock all features', route: '/main/premium', accent: true },
];

export default function ProfileScreen() {
  const router = useRouter();
  const { profile, logout } = useAppContext();

  if (!profile) {
    return (
      <SafeAreaView style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>Loading profile...</Text>
      </SafeAreaView>
    );
  }

  const handleLogout = async () => {
    await logout();
    router.replace('/onboarding/splash');
  };

  const isPremium = profile.user.planTier === 'premium';

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Account</Text>

        {/* ── Avatar Card ── */}
        <View style={styles.profileCard}>
          <View style={styles.avatarWrap}>
            <Text style={styles.avatarText}>{profile.user.avatarInitials}</Text>
          </View>
          <View style={styles.profileDetails}>
            <Text style={styles.name}>{profile.user.name}</Text>
            <Text style={styles.email}>{profile.user.email}</Text>
            <View style={[styles.planTag, isPremium && styles.planTagPremium]}>
              <Text style={[styles.planTagText, isPremium && { color: colors.gold }]}>
                {isPremium ? '✦ PREMIUM' : 'FREE'}
              </Text>
            </View>
          </View>
        </View>

        {/* ── Stats Row ── */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Safe to Spend</Text>
            <Text style={styles.statValue}>{formatCurrency(profile.safeToSpendCents)}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Primary Bank</Text>
            <Text style={styles.statValue} numberOfLines={1}>{profile.user.bankName}</Text>
          </View>
        </View>

        {/* ── Tools Menu ── */}
        <Text style={styles.sectionTitle}>Tools</Text>
        {MENU_ITEMS.map(item => (
          <Pressable
            key={item.route}
            style={({ pressed }) => [
              styles.menuItem,
              item.accent && styles.menuItemAccent,
              pressed && { opacity: 0.7 },
            ]}
            onPress={() => router.push(item.route as any)}
          >
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <View style={styles.menuInfo}>
              <Text style={[styles.menuLabel, item.accent && { color: colors.gold }]}>{item.label}</Text>
              <Text style={styles.menuSub}>{item.sub}</Text>
            </View>
            <Text style={styles.menuChevron}>›</Text>
          </Pressable>
        ))}

        {/* ── Account Settings ── */}
        <Text style={styles.sectionTitle}>Settings</Text>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>{profile.user.email}</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Member since</Text>
          <Text style={styles.infoValue}>{new Date(profile.user.onboardedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</Text>
        </View>

        {/* ── Sign Out ── */}
        <Pressable
          style={({ pressed }) => [styles.logoutButton, pressed && { opacity: 0.8 }]}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>Sign out</Text>
        </Pressable>

        <View style={{ height: spacing.xxxl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: spacing.screen, paddingTop: spacing.xl },
  fallbackContainer: { flex: 1, backgroundColor: colors.bg, justifyContent: 'center', alignItems: 'center' },
  fallbackText: { color: colors.text2, fontFamily: fonts.outfit },

  title: { color: colors.text, fontFamily: fonts.outfitBold, fontSize: 28, marginBottom: spacing.lg },

  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  avatarWrap: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: colors.accent,
    alignItems: 'center', justifyContent: 'center',
    marginRight: spacing.md,
  },
  avatarText: { color: colors.bg, fontFamily: fonts.outfitBold, fontSize: 22 },
  profileDetails: { flex: 1 },
  name: { color: colors.text, fontFamily: fonts.outfitBold, fontSize: 18, marginBottom: 2 },
  email: { color: colors.text2, fontFamily: fonts.outfit, fontSize: 13, marginBottom: spacing.sm },
  planTag: { alignSelf: 'flex-start', backgroundColor: colors.surface2, borderRadius: 6, paddingHorizontal: spacing.sm, paddingVertical: 3 },
  planTagPremium: { backgroundColor: 'rgba(255,209,102,0.12)', borderWidth: 1, borderColor: 'rgba(255,209,102,0.25)' },
  planTagText: { color: colors.text2, fontFamily: fonts.outfitBold, fontSize: 10, letterSpacing: 1.5 },

  statsRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.xl },
  statCard: { flex: 1, backgroundColor: colors.surface, borderRadius: 16, padding: spacing.md },
  statLabel: { color: colors.text3, fontFamily: fonts.outfit, fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  statValue: { color: colors.text, fontFamily: fonts.dmMonoMedium, fontSize: 14 },

  sectionTitle: { color: colors.text, fontFamily: fonts.outfitBold, fontSize: 16, marginBottom: spacing.sm },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  menuItemAccent: {
    backgroundColor: 'rgba(255,209,102,0.07)',
    borderColor: 'rgba(255,209,102,0.2)',
  },
  menuIcon: { fontSize: 20, marginRight: spacing.md },
  menuInfo: { flex: 1 },
  menuLabel: { color: colors.text, fontFamily: fonts.outfitBold, fontSize: 14, marginBottom: 2 },
  menuSub: { color: colors.text3, fontFamily: fonts.outfit, fontSize: 12 },
  menuChevron: { color: colors.text3, fontSize: 22, fontWeight: '300' },

  infoCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  infoLabel: { color: colors.text3, fontFamily: fonts.outfit, fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  infoValue: { color: colors.text, fontFamily: fonts.outfitBold, fontSize: 15 },

  logoutButton: {
    marginTop: spacing.xl,
    height: 52, borderRadius: 999,
    backgroundColor: colors.redAlpha12,
    borderWidth: 1, borderColor: 'rgba(255,82,82,0.3)',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  logoutText: { color: colors.red, fontFamily: fonts.outfitBold, fontSize: 15 },
});
