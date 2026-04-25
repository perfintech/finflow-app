import { Text } from 'react-native';
import { Tabs } from 'expo-router';
import { colors } from '@/constants/theme';

export default function MainLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.tabBarBg,
          borderTopWidth: 0,
          height: 72,
          paddingBottom: 10,
          paddingTop: 6,
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>🏠</Text>,
        }}
      />
      <Tabs.Screen
        name="cashflow"
        options={{
          title: 'Cashflow',
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>📈</Text>,
        }}
      />
      <Tabs.Screen
        name="money-map"
        options={{
          title: 'Money Map',
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>🗺️</Text>,
        }}
      />
      <Tabs.Screen
        name="alerts"
        options={{
          title: 'Alerts',
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>🚨</Text>,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>👤</Text>,
        }}
      />
      <Tabs.Screen
        name="subscriptions"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="spend-check"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="trip"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="premium"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
