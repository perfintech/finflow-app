import { View, Text, Pressable, SafeAreaView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppContext } from '@/context/AppContext';
import { colors, fonts, spacing } from '@/constants/theme';
import { formatCurrency } from '@/utils/formatters';

export const options = {
  title: 'Profile',
  tabBarIcon: () => <Text style={{ fontSize: 20 }}>👤</Text>,
};

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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Account</Text>
      <View style={styles.profileCard}>
        <Text style={styles.avatar}>{profile.user.avatarInitials}</Text>
        <View style={styles.profileDetails}>
          <Text style={styles.name}>{profile.user.name}</Text>
          <Text style={styles.email}>{profile.user.email}</Text>
        </View>
      </View>
      <View style={styles.infoCard}>
        <Text style={styles.infoLabel}>Plan tier</Text>
        <Text style={styles.infoValue}>{profile.user.planTier.toUpperCase()}</Text>
      </View>
      <View style={styles.infoCard}>
        <Text style={styles.infoLabel}>Primary bank</Text>
        <Text style={styles.infoValue}>{profile.user.bankName}</Text>
      </View>
      <View style={styles.infoCard}>
        <Text style={styles.infoLabel}>Safe to Spend</Text>
        <Text style={styles.infoValue}>{formatCurrency(profile.safeToSpendCents)}</Text>
      </View>
      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sign out</Text>
      </Pressable>
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
    marginBottom: spacing.xl,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 999,
    backgroundColor: colors.accent,
    color: colors.bg,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: fonts.outfitBold,
    fontSize: 24,
    marginRight: spacing.md,
  },
  profileDetails: {
    flex: 1,
  },
  name: {
    color: colors.text,
    fontFamily: fonts.outfitBold,
    fontSize: 18,
    marginBottom: spacing.xs,
  },
  email: {
    color: colors.text2,
    fontFamily: fonts.outfit,
    fontSize: 14,
  },
  infoCard: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  infoLabel: {
    color: colors.text3,
    fontFamily: fonts.outfit,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  infoValue: {
    color: colors.text,
    fontFamily: fonts.outfitBold,
    fontSize: 16,
  },
  logoutButton: {
    marginTop: spacing.xl,
    height: 52,
    borderRadius: 999,
    backgroundColor: colors.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    color: colors.bg,
    fontFamily: fonts.outfitBold,
    fontSize: 16,
  },
});
