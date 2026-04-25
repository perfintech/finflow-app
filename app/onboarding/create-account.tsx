import { useState } from 'react';
import { Text, TextInput, View, Pressable, SafeAreaView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, typography, spacing } from '@/constants/theme';
import { useAppContext } from '@/context/AppContext';

export default function CreateAccountScreen() {
  const router = useRouter();
  const { createAccount } = useAppContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim()) {
      return;
    }

    setSubmitting(true);
    await createAccount(name.trim(), email.trim());
    setSubmitting(false);
    router.push('/onboarding/biometric');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.content}>
        <Text style={styles.title}>Create your account</Text>
        <Text style={styles.subtitle}>Start with your name and email so we can show your personalized profile.</Text>
        <View style={styles.form}>
          <TextInput
            placeholder="Full name"
            placeholderTextColor={colors.text3}
            value={name}
            onChangeText={setName}
            style={styles.input}
            autoCapitalize="words"
          />
          <TextInput
            placeholder="Email address"
            placeholderTextColor={colors.text3}
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <Pressable style={styles.button} onPress={handleSubmit} disabled={submitting || !name || !email}>
          <Text style={styles.buttonText}>{submitting ? 'Loading...' : 'Continue'}</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.xxxl,
  },
  title: {
    color: colors.text,
    fontFamily: fonts.outfitBold,
    fontSize: 30,
    marginBottom: spacing.md,
  },
  subtitle: {
    color: colors.text2,
    fontFamily: fonts.outfit,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: spacing.xl,
  },
  form: {
    gap: spacing.md,
  },
  input: {
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    color: colors.text,
    fontFamily: fonts.outfit,
    fontSize: 16,
    backgroundColor: colors.surface,
  },
  button: {
    marginTop: spacing.xxxl,
    height: 54,
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
