import { useEffect } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppContext } from '@/context/AppContext';
import { colors } from '@/constants/theme';

export default function Index() {
  const router = useRouter();
  const { ready, isOnboarded, profile } = useAppContext();

  useEffect(() => {
    if (!ready) {
      return;
    }

    if (isOnboarded) {
      router.replace('/main/dashboard');
      return;
    }

    if (profile) {
      router.replace('/onboarding/link-bank');
      return;
    }

    router.replace('/onboarding/splash');
  }, [ready, isOnboarded, profile, router]);

  if (!ready) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={colors.accent} />
      </SafeAreaView>
    );
  }

  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
