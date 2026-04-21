# FinFlow Mobile App — Implementation Guide

## Project Structure

```
finflow-app/
├── app/                          # Expo Router app directory
│   ├── _layout.tsx               # Root layout with AppProvider
│   ├── index.tsx                 # Splash/routing logic
│   ├── onboarding/
│   │   ├── splash.tsx            # Brand splash screen
│   │   ├── create-account.tsx    # Name + email input
│   │   ├── link-bank.tsx         # Bank institution selection
│   │   └── email.tsx             # Email sync (mock)
│   └── main/
│       ├── _layout.tsx           # Tab navigator
│       ├── dashboard.tsx         # Net worth + Safe to Spend
│       ├── cashflow.tsx          # Monthly income/spend chart
│       ├── alerts.tsx            # Financial notifications
│       ├── profile.tsx           # Account settings
│       ├── subscriptions.tsx     # Sub audit + waste detection
│       ├── spend-check.tsx       # "Can I afford it?" calculator
│       ├── trip.tsx              # Trip budget tracking
│       └── premium.tsx           # Plan upgrade screen
├── src/
│   ├── components/               # Shared UI
│   │   └── Charts.tsx            # SVG chart components
│   ├── constants/
│   │   └── theme.ts              # Design tokens
│   ├── context/
│   │   └── AppContext.tsx        # Global state + DI
│   ├── database/
│   │   ├── schema.ts             # Types + SQL DDL
│   │   ├── mockData.ts           # 26 user profiles (A-Z)
│   │   └── LocalDatabase.ts      # SQLite repository layer
│   ├── utils/
│   │   ├── mockDataSelector.ts   # Email → dataset mapping
│   │   └── formatters.ts         # Currency, date, initials
│   └── navigation/               # (Expo Router handles routing)
├── assets/                       # Fonts, icons, splash image
├── package.json
├── tsconfig.json
├── babel.config.js
├── metro.config.js
├── app.json                      # Expo config
├── ARCHITECTURE.md               # 4-tier system design
├── TECHDESIGN.md                 # Client-layer tech spec
└── README.md                     # Quick start guide
```

---

## Getting Started

### 1. Install Dependencies

```bash
npm install --cache /tmp/finflow-cache --prefer-offline
```

### 2. Type Check

```bash
npm run type-check
```

### 3. Start Dev Server

```bash
npm start
```

### 4. Run on Simulator

```bash
npm run ios       # iOS Simulator
npm run android   # Android Emulator
```

---

## Key Implementation Decisions

### State Management

- **AppContext**: User session, profile, onboarding state
- **No Redux/MobX**: Zustand provides sufficient complexity reduction
- **Local-first**: All data synced from SQLite on app launch

### Database

- **expo-sqlite**: Zero-config local persistence
- **Repository pattern**: `LocalDatabase.ts` encapsulates all queries
- **Mock data seeding**: 26 complete user profiles allow comprehensive testing
- **No network sync**: Pure offline-first (no server calls)

### Navigation

- **Expo Router**: File-based routing (Next.js-like)
- **Root `_layout.tsx`**: Provides AppProvider wrapper
- **Tab navigator**: Main app uses `<Tabs>` with hidden screens for modals
- **Onboarding gates**: Root `index.tsx` routes based on `isOnboarded` flag

### Charts

- **React Native SVG**: Custom SVG components, zero dependencies
- **Sparkline**: Net worth trend (6-month normalized data)
- **Ring**: Safe to Spend progress indicator
- **Bar**: Monthly cashflow comparison
- **Projection**: 30/60/90-day forecast line

### Design System

- All tokens in `src/constants/theme.ts`
- Dark-first palette: bg `#060810`, accent `#00f5b0` (green), accent2 `#5b8dff` (blue)
- Fonts: Outfit (UI), BebasNeue (display), DM Mono (financial values)
- Spacing scale: xs=4, sm=8, md=12, lg=16, xl=20, xxl=24, xxxl=32

---

## Development Workflows

### Adding a New Screen

1. Create `app/main/[screen].tsx` or `app/onboarding/[screen].tsx`
2. Import `useAppContext()` to access `profile`, `createAccount()`, etc.
3. Use `colors`, `spacing`, `fonts` from `src/constants/theme.ts`
4. Consume mock data from `profile.accounts[]`, `profile.bills[]`, etc.
5. Add route to main tab layout if it's a primary screen

### Adding Mock Data

- Edit `src/database/mockData.ts`
- A–M profiles are detailed objects; N–Z use `makeProfile()` helper
- Ensure all 26 profiles (A–Z) are exported in `MOCK_DATA_SETS` array
- Profile selection: user email first char (a→Alice, z→Zoe, non-alpha→Alice)

### Testing

```bash
npm run lint          # ESLint check
npm run type-check    # TypeScript validation
```

No unit test framework is configured; all testing is manual via simulators.

---

## Security & Privacy

- **Zero credential storage**: No passwords saved anywhere
- **Biometric-only auth**: Face ID / Touch ID / Fingerprint (via `expo-local-authentication`)
- **Secure storage**: Session tokens in `expo-secure-store` (iOS Keychain / Android Keystore)
- **No network calls in MVP**: All data is local, no PII transmitted
- **Session auto-lock**: After 5 minutes of inactivity (future feature)

---

## Offline-First Architecture

All screens function without network connectivity:

- **Dashboard**: Shows cached accounts, net worth, Safe to Spend
- **Transactions**: Rendered from SQLite
- **Bills**: Local database query
- **Subscriptions**: No external API calls
- **Alerts**: Pre-calculated based on user data

---

## Future Enhancements

1. **Real bank integration** (Plaid API)
2. **Email intelligence** (Gmail API for bill detection)
3. **Cloud sync** (PostgreSQL backend, gRPC client)
4. **Biometric enrollment** (on-device Face ID setup)
5. **Push notifications** (APNs / Firebase Cloud Messaging)
6. **Investment tracking** (Alpaca API)
7. **Tax export** (TurboTax / IRS integration)

---

## Troubleshooting

### Dependencies not installing

```bash
# Clear npm cache and retry
sudo chown -R $(whoami) ~/.npm
npm install
```

### TypeScript errors persisting

```bash
# Clear cache and recompile
npx tsc --noEmit --skipLibCheck
```

### Simulators not launching

```bash
# iOS
npx expo prebuild --clean
npx expo run:ios

# Android
npx expo run:android
```

---

*FinFlow v1.0 · Mobile Client · April 2026*
