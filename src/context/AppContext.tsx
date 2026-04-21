import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { selectMockDataset } from '@/utils/mockDataSelector';
import { buildAvatarInitials } from '@/utils/formatters';
import type { UserFinancialProfile } from '@database/schema';

const STORAGE_KEYS = {
  email: 'finflow_user_email',
  onboarded: 'finflow_onboarded',
};

type AppContextValue = {
  ready: boolean;
  isOnboarded: boolean;
  profile: UserFinancialProfile | null;
  createAccount: (name: string, email: string) => Promise<void>;
  chooseBank: (institution: string, bankColor: string) => void;
  finishOnboarding: () => Promise<void>;
  logout: () => Promise<void>;
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [profile, setProfile] = useState<UserFinancialProfile | null>(null);
  const [isOnboarded, setIsOnboarded] = useState(false);

  useEffect(() => {
    async function bootstrap() {
      const email = await SecureStore.getItemAsync(STORAGE_KEYS.email);
      const onboarded = await SecureStore.getItemAsync(STORAGE_KEYS.onboarded);
      if (email) {
        const dataset = selectMockDataset(email);
        setProfile(dataset);
        setIsOnboarded(onboarded === 'true');
      }
      setReady(true);
    }

    bootstrap();
  }, []);

  const createAccount = async (name: string, email: string) => {
    const dataset = selectMockDataset(email);
    dataset.user.name = name;
    dataset.user.email = email;
    dataset.user.avatarInitials = buildAvatarInitials(name);

    setProfile(dataset);
    await SecureStore.setItemAsync(STORAGE_KEYS.email, email);
  };

  const chooseBank = (institution: string, bankColor: string) => {
    setProfile(current =>
      current
        ? {
            ...current,
            user: {
              ...current.user,
              bankName: institution,
              bankColor,
            },
          }
        : current,
    );
  };

  const finishOnboarding = async () => {
    setIsOnboarded(true);
    await SecureStore.setItemAsync(STORAGE_KEYS.onboarded, 'true');
  };

  const logout = async () => {
    setProfile(null);
    setIsOnboarded(false);
    await SecureStore.deleteItemAsync(STORAGE_KEYS.email);
    await SecureStore.deleteItemAsync(STORAGE_KEYS.onboarded);
  };

  const contextValue = useMemo(
    () => ({
      ready,
      isOnboarded,
      profile,
      createAccount,
      chooseBank,
      finishOnboarding,
      logout,
    }),
    [ready, isOnboarded, profile],
  );

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}
