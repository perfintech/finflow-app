import { Stack } from 'expo-router';
import { AppProvider } from '@/context/AppContext';

export default function Layout() {
  return (
    <AppProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: { backgroundColor: '#060810' },
        }}
      />
    </AppProvider>
  );
}
