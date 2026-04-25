import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from '@/context/AppContext';
import { colors, fonts, spacing } from '@/constants/theme';
import { formatCurrency } from '@/utils/formatters';

export const options = {
  title: 'Alerts',
  tabBarIcon: () => <Text style={{ fontSize: 20 }}>🚨</Text>,
};

const BORDER_COLORS: Record<string, string> = {
  danger: colors.red,
  success: colors.accent,
  warning: colors.warn,
  info: colors.accent2,
};

const BG_COLORS: Record<string, string> = {
  danger: 'rgba(255,82,82,0.07)',
  success: 'rgba(0,245,176,0.06)',
  warning: 'rgba(255,179,71,0.07)',
  info: 'rgba(91,141,255,0.07)',
};

export default function AlertsScreen() {
  const { profile, markAlertRead } = useAppContext();

  if (!profile) {
    return (
      <SafeAreaView style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>Loading alerts...</Text>
      </SafeAreaView>
    );
  }

  const unread = profile.alerts.filter(a => !a.isRead).length;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Alerts</Text>
            <Text style={styles.subtitle}>High-signal notices. Act quickly.</Text>
          </View>
          {unread > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unread} new</Text>
            </View>
          )}
        </View>

        {profile.alerts.map(alert => (
          <Pressable
            key={alert.id}
            onPress={() => !alert.isRead && markAlertRead(alert.id)}
            style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}
          >
          <View
            style={[
              styles.alertCard,
              { borderColor: BORDER_COLORS[alert.type] ?? colors.border, backgroundColor: BG_COLORS[alert.type] ?? colors.surface },
              !alert.isRead && styles.alertUnread,
            ]}
          >
            <View style={styles.alertTop}>
              <View style={[styles.alertIconWrap, { backgroundColor: BG_COLORS[alert.type] ?? colors.surface }]}>
                <Text style={styles.alertIcon}>{alert.icon}</Text>
              </View>
              <View style={styles.alertBody}>
                <View style={styles.alertTitleRow}>
                  <Text style={styles.alertTitle} numberOfLines={1}>{alert.title}</Text>
                  {!alert.isRead && <View style={[styles.unreadDot, { backgroundColor: BORDER_COLORS[alert.type] }]} />}
                </View>
                <Text style={styles.alertDescription}>{alert.description}</Text>
                <Text style={styles.alertTime}>{alert.timeAgo}</Text>
              </View>
            </View>

            {(alert.amountCents || alert.actionLabel) ? (
              <View style={styles.alertFooter}>
                {alert.amountCents ? (
                  <Text style={[styles.alertAmount, { color: BORDER_COLORS[alert.type] ?? colors.text }]}>
                    {formatCurrency(alert.amountCents)}
                  </Text>
                ) : <View />}
                {alert.actionLabel && (
                  <Pressable
                    style={({ pressed }) => [
                      styles.actionButton,
                      { borderColor: BORDER_COLORS[alert.type] ?? colors.accent },
                      pressed && { opacity: 0.7 },
                    ]}
                  >
                    <Text style={[styles.actionText, { color: BORDER_COLORS[alert.type] ?? colors.accent }]}>
                      {alert.actionLabel}
                    </Text>
                  </Pressable>
                )}
              </View>
            ) : null}
          </View>
          </Pressable>
        ))}

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

  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.lg },
  title: { color: colors.text, fontFamily: fonts.outfitBold, fontSize: 28 },
  subtitle: { color: colors.text2, fontFamily: fonts.outfit, fontSize: 14, marginTop: 2 },
  badge: { backgroundColor: colors.accent, borderRadius: 12, paddingHorizontal: spacing.sm, paddingVertical: 4, marginTop: 6 },
  badgeText: { color: colors.bg, fontFamily: fonts.outfitBold, fontSize: 11 },

  alertCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  alertUnread: { borderWidth: 1.5 },
  alertTop: { flexDirection: 'row', gap: spacing.md },
  alertIconWrap: {
    width: 44, height: 44, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  alertIcon: { fontSize: 22 },
  alertBody: { flex: 1 },
  alertTitleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: 3 },
  alertTitle: { color: colors.text, fontFamily: fonts.outfitBold, fontSize: 14, flex: 1 },
  unreadDot: { width: 7, height: 7, borderRadius: 999 },
  alertDescription: { color: colors.text2, fontFamily: fonts.outfit, fontSize: 13, lineHeight: 18 },
  alertTime: { color: colors.text3, fontFamily: fonts.outfit, fontSize: 11, marginTop: 4 },

  alertFooter: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginTop: spacing.sm, paddingTop: spacing.sm,
    borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)',
  },
  alertAmount: { fontFamily: fonts.dmMonoMedium, fontSize: 15 },
  actionButton: {
    borderWidth: 1, borderRadius: 8,
    paddingHorizontal: spacing.md, paddingVertical: 5,
  },
  actionText: { fontFamily: fonts.outfitBold, fontSize: 12 },
});
