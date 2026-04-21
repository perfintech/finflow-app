// FinFlow Design System — Theme Constants
// Derived from FinFlow_UX_Screens.html spec

import { Dimensions, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// ─── COLOR PALETTE ───────────────────────────────────────────────────────────

export const colors = {
  // Backgrounds
  bg: '#060810',
  bg2: '#0c0f1a',
  surface: '#111520',
  surface2: '#181d2e',
  surface3: '#1e2438',

  // Brand Accents
  accent: '#00f5b0',       // Primary green — Safe to Spend, positive
  accentDim: 'rgba(0,245,176,0.12)',
  accent2: '#5b8dff',      // Blue — info, projections
  accent3: '#ff6b6b',      // Pink/red accent
  gold: '#ffd166',         // Premium, highlights
  purple: '#a78bfa',       // Investment, 401k

  // Semantic
  red: '#ff5252',          // Danger, overdue
  warn: '#ffb347',         // Warning, near-due

  // Text
  text: '#eef0f8',
  text2: '#8892b0',
  text3: '#3d4461',

  // Borders
  border: 'rgba(255,255,255,0.06)',
  border2: 'rgba(0,245,176,0.15)',

  // Transparent variants
  accentAlpha8: 'rgba(0,245,176,0.08)',
  accentAlpha10: 'rgba(0,245,176,0.10)',
  accentAlpha20: 'rgba(0,245,176,0.20)',
  redAlpha10: 'rgba(255,82,82,0.10)',
  redAlpha12: 'rgba(255,82,82,0.12)',
  blueAlpha6: 'rgba(91,141,255,0.06)',
  blueAlpha12: 'rgba(91,141,255,0.12)',
  warnAlpha10: 'rgba(255,179,71,0.10)',
  warnAlpha15: 'rgba(255,179,71,0.15)',

  // Utility
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',

  // Tab bar
  tabBarBg: 'rgba(17,21,32,0.95)',
  tabActive: '#00f5b0',
  tabInactive: '#3d4461',
} as const;

// ─── TYPOGRAPHY ──────────────────────────────────────────────────────────────

export const fonts = {
  outfit: 'Outfit',           // Main UI font
  outfitBold: 'Outfit-Bold',
  bebas: 'BebasNeue',         // Display / large numbers
  dmMono: 'DMMonoRegular',    // Financial values / amounts
  dmMonoMedium: 'DMMono-Medium',
} as const;

export const typography = {
  // Display (Bebas Neue)
  display1: { fontFamily: fonts.bebas, fontSize: 52, letterSpacing: 4 },
  display2: { fontFamily: fonts.bebas, fontSize: 42, letterSpacing: 1 },
  display3: { fontFamily: fonts.bebas, fontSize: 36, letterSpacing: 1 },
  display4: { fontFamily: fonts.bebas, fontSize: 30, letterSpacing: 1 },
  display5: { fontFamily: fonts.bebas, fontSize: 28, letterSpacing: 1 },
  displayAmt: { fontFamily: fonts.bebas, fontSize: 48, letterSpacing: 2 },

  // UI Text (Outfit)
  h1: { fontFamily: fonts.outfit, fontSize: 24, fontWeight: '800' as const },
  h2: { fontFamily: fonts.outfit, fontSize: 19, fontWeight: '800' as const },
  h3: { fontFamily: fonts.outfit, fontSize: 16, fontWeight: '700' as const },
  h4: { fontFamily: fonts.outfit, fontSize: 14, fontWeight: '700' as const },
  body1: { fontFamily: fonts.outfit, fontSize: 15, fontWeight: '400' as const },
  body2: { fontFamily: fonts.outfit, fontSize: 13, fontWeight: '400' as const },
  caption: { fontFamily: fonts.outfit, fontSize: 12, fontWeight: '500' as const },
  label: {
    fontFamily: fonts.outfit,
    fontSize: 10,
    fontWeight: '700' as const,
    letterSpacing: 2,
    textTransform: 'uppercase' as const,
  },
  tagline: { fontFamily: fonts.outfit, fontSize: 14, fontWeight: '400' as const },

  // Mono (DM Mono)
  monoLg: { fontFamily: fonts.dmMono, fontSize: 15, fontWeight: '500' as const },
  monoMd: { fontFamily: fonts.dmMono, fontSize: 13, fontWeight: '500' as const },
  monoSm: { fontFamily: fonts.dmMono, fontSize: 11, fontWeight: '400' as const },
  monoXs: { fontFamily: fonts.dmMono, fontSize: 10, fontWeight: '400' as const },
  time: { fontFamily: fonts.dmMono, fontSize: 14, fontWeight: '500' as const },
} as const;

// ─── SPACING ─────────────────────────────────────────────────────────────────

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  screen: 22,   // Standard horizontal screen padding
} as const;

// ─── BORDER RADIUS ───────────────────────────────────────────────────────────

export const radius = {
  xs: 6,
  sm: 8,
  md: 10,
  lg: 12,
  xl: 14,
  xxl: 16,
  xxxl: 18,
  card: 20,
  pill: 100,
} as const;

// ─── SHADOWS ─────────────────────────────────────────────────────────────────

export const shadows = {
  glow: {
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
  },
  ctaGlow: {
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
} as const;

// ─── LAYOUT ──────────────────────────────────────────────────────────────────

export const layout = {
  screenWidth: SCREEN_WIDTH,
  screenHeight: SCREEN_HEIGHT,
  tabBarHeight: Platform.OS === 'ios' ? 82 : 64,
  statusBarHeight: Platform.OS === 'ios' ? 44 : 24,
  headerHeight: 56,
  cardPadding: spacing.lg,
  screenPadding: spacing.screen,
} as const;

// ─── GRADIENTS ───────────────────────────────────────────────────────────────

export const gradients = {
  splash: {
    colors: ['rgba(0,245,176,0.18)', 'transparent', 'rgba(91,141,255,0.10)', 'transparent'],
    locations: [0, 0.4, 0.7, 1],
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 },
  },
  orb: ['#00f5b0', '#5b8dff', '#00f5b0', '#a78bfa', '#00f5b0'],
  netWorth: { colors: [colors.surface, '#0f1420'], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  ahaMoment: { colors: ['#001c12', '#000d08'], start: { x: 0, y: 0.17 }, end: { x: 0, y: 1 } },
  verdict: { colors: ['#001c10', '#000c08'], start: { x: 0, y: 0.16 }, end: { x: 0, y: 1 } },
  cancelDanger: { colors: ['#ff5252', '#c0392b'], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  trip: { colors: ['#050d1a', '#020810'], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  premium: { colors: ['rgba(255,209,102,0.15)', 'rgba(255,179,71,0.10)'], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
} as const;

// ─── ACCOUNT TYPE COLORS ─────────────────────────────────────────────────────

export const accountColors = {
  checking: colors.accent,
  savings: colors.accent2,
  credit: colors.warn,
  investment: colors.purple,
  loan: colors.red,
} as const;

// ─── CATEGORY COLORS ─────────────────────────────────────────────────────────

export const categoryColors: Record<string, string> = {
  Food: colors.warn,
  Transport: colors.accent,
  Entertainment: colors.purple,
  Shopping: colors.accent2,
  Health: '#4ecdc4',
  Utilities: '#a8dadc',
  Rent: colors.red,
  Income: colors.accent,
  Savings: colors.accent2,
  Travel: '#7b2ff7',
  Other: colors.text3,
};
