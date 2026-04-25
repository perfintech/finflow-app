import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Platform } from 'react-native';
import { getItem, setItem, deleteItem } from '@/utils/storage';
// IS_WEB used below to skip SQLite on web
import { selectMockDataset } from '@/utils/mockDataSelector';
import { buildAvatarInitials } from '@/utils/formatters';
import { database } from '@database/LocalDatabase';
import type { UserFinancialProfile } from '@database/schema';

const IS_WEB = Platform.OS === 'web';

const STORAGE_KEYS = {
  email: 'finflow_user_email',
  userId: 'finflow_user_id',
  onboarded: 'finflow_onboarded',
};

type AppContextValue = {
  ready: boolean;
  isOnboarded: boolean;
  profile: UserFinancialProfile | null;
  createAccount: (name: string, email: string) => Promise<void>;
  chooseBank: (institution: string, bankColor: string) => void;
  finishOnboarding: () => Promise<void>;
  markAlertRead: (alertId: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [profile, setProfile] = useState<UserFinancialProfile | null>(null);
  const [isOnboarded, setIsOnboarded] = useState(false);

  useEffect(() => {
    async function bootstrap() {
      try {
        const email = await getItem(STORAGE_KEYS.email);
        const onboarded = await getItem(STORAGE_KEYS.onboarded);

        if (email) {
          if (!IS_WEB) {
            try {
              const userId = await getItem(STORAGE_KEYS.userId);
              await database.initialize();
              const dbProfile = userId ? await database.getUserFinancialData(userId) : null;
              if (dbProfile) {
                setProfile(dbProfile);
              } else {
                const dataset = selectMockDataset(email);
                await database.seedUser(dataset);
                setProfile(dataset);
              }
            } catch {
              setProfile(selectMockDataset(email));
            }
          } else {
            setProfile(selectMockDataset(email));
          }
          setIsOnboarded(onboarded === 'true');
        }
      } catch {
        // SecureStore unavailable — start fresh
      } finally {
        setReady(true);
      }
    }

    bootstrap();
  }, []);

  const createAccount = useCallback(async (name: string, email: string) => {
    const dataset = selectMockDataset(email);
    dataset.user.name = name;
    dataset.user.email = email;
    dataset.user.avatarInitials = buildAvatarInitials(name);

    if (!IS_WEB) {
      try {
        await database.seedUser(dataset);
      } catch {
        // Proceed without DB — profile still set in memory
      }
    }

    setProfile(dataset);
    await setItem(STORAGE_KEYS.email, email);
    await setItem(STORAGE_KEYS.userId, dataset.user.id);
  }, []);

  const chooseBank = useCallback((institution: string, bankColor: string) => {
    setProfile(current =>
      current
        ? { ...current, user: { ...current.user, bankName: institution, bankColor } }
        : current,
    );
  }, []);

  const finishOnboarding = useCallback(async () => {
    setIsOnboarded(true);
    await setItem(STORAGE_KEYS.onboarded, 'true');
  }, []);

  const markAlertRead = useCallback(async (alertId: string) => {
    try {
      await database.markAlertAsRead(alertId);
    } catch {
      // Best-effort
    }
    setProfile(current =>
      current
        ? {
            ...current,
            alerts: current.alerts.map(a =>
              a.id === alertId ? { ...a, isRead: true } : a,
            ),
          }
        : current,
    );
  }, []);

  const logout = useCallback(async () => {
    setProfile(null);
    setIsOnboarded(false);
    await deleteItem(STORAGE_KEYS.email);
    await deleteItem(STORAGE_KEYS.userId);
    await deleteItem(STORAGE_KEYS.onboarded);
  }, []);

  const contextValue = useMemo(
    () => ({ ready, isOnboarded, profile, createAccount, chooseBank, finishOnboarding, markAlertRead, logout }),
    [ready, isOnboarded, profile, createAccount, chooseBank, finishOnboarding, markAlertRead, logout],
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
