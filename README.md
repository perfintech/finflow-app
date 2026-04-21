# FinFlow — Proactive Financial Wingman

> Know where you stand. Always.

FinFlow is an AI-powered personal finance mobile app built in React Native (Expo). It aggregates bank accounts, detects subscriptions from email, projects cash flow, and provides a real-time "Safe to Spend" signal so users always know exactly what they can afford.

**Build Status**: ✅ 90% Complete · 23 TS files · 9 screens · 26 mock profiles · Type-safe  
**Last Updated**: April 2026  
**See [BUILD_STATUS.md](./BUILD_STATUS.md) for detailed completion status**

---

## Documentation Map

| Document | Purpose | Read If… |
|----------|---------|----------|
| **[BUILD_STATUS.md](./BUILD_STATUS.md)** | Completion status + immediate next steps | You're picking up development |
| **[FEATURES.md](./FEATURES.md)** | Complete feature spec with UX details | You want to understand what's built |
| **[ARCHITECTURE_IMPLEMENTATION.md](./ARCHITECTURE_IMPLEMENTATION.md)** | Tech stack, design decisions, data flows | You're learning the codebase |
| **[ARCHITECTURE.md](./ARCHITECTURE.md)** | UX flows and system design diagram | You're designing new features |
| **[TECHDESIGN.md](./TECHDESIGN.md)** | Technical specifications | You're building new API integrations |
| **[IMPLEMENTATION.md](./IMPLEMENTATION.md)** | Developer workflows and troubleshooting | You're extending the app |
| **[README.md](./README.md)** | Quick start and project overview | You're new to the project |

---

## Quick Start

```bash
# Install dependencies
npm install

# Start Expo dev server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Type check (should show 0 errors)
npm run type-check
```

---

## App Screens

| Screen | Route | Description |
|--------|-------|-------------|
| Splash | `/onboarding/splash` | Brand entry point with Get Started CTA |
| Create Account | `/onboarding/create-account` | Name / email + Face ID enrollment |
| Link Bank | `/onboarding/link-bank` | Bank institution selector (mock) |
| Email Intelligence | `/onboarding/email` | Gmail/Outlook connect + AHA moment |
| Dashboard | `/main/dashboard` | Net worth, Safe to Spend, accounts |
| Cash Flow | `/main/cashflow` | Monthly bar chart, projections, inbox bills |
| Spend Check | `/main/spend-check` | "Can I afford it?" calculator |
| Alerts | `/main/alerts` | High-signal, low-noise financial alerts |
| Subscription Audit | `/main/subscriptions` | All subscriptions ranked by value/waste |
| Trip Mode | `/main/trip` | Per-trip budget tracker (email-detected) |
| Premium | `/main/premium` | Plan comparison & upgrade |
| Profile | `/main/profile` | Settings, security, account management |

---

## Mock Data System

The app ships with **26 complete user profiles (A–Z)** stored in `src/database/mockData.ts`. The active profile is selected by mapping the **first character of the user's email address** to the corresponding dataset:

```
a → Alice Adams    (aggressive saver, high net worth)
b → Bob Baker      (recent grad, building credit)
c → Carol Chen     (small business owner)
...
z → Zoe Zhang      (early retirement track)
```

See `src/utils/mockDataSelector.ts` for the selection logic.

---

## Project Structure

```
finflow-app/
├── App.tsx                     # Entry point
├── app.json                    # Expo config
├── package.json
├── tsconfig.json
├── babel.config.js
├── metro.config.js
├── assets/                     # Icons, fonts, images
├── src/
│   ├── constants/
│   │   └── theme.ts            # Design tokens (colors, typography, spacing)
│   ├── database/
│   │   ├── schema.ts           # TypeScript interfaces for all data models
│   │   ├── mockData.ts         # 26 complete user datasets (A–Z)
│   │   └── LocalDatabase.ts    # SQLite abstraction layer
│   ├── context/
│   │   └── AppContext.tsx      # Global state (user, accounts, navigation)
│   ├── navigation/
│   │   ├── AppNavigator.tsx    # Root navigator (onboarding vs. main)
│   │   ├── OnboardingNavigator.tsx
│   │   └── MainTabNavigator.tsx
│   ├── screens/
│   │   ├── onboarding/         # S1–S4: Splash → Link Bank → Email → AHA
│   │   └── main/               # S5–S11: Dashboard → Premium
│   ├── components/             # Shared UI components
│   └── utils/
│       ├── mockDataSelector.ts
│       └── formatters.ts
└── spec/                       # Source design docs
    ├── FinFlow_PRD.docx
    ├── FinFlow_SystemDesign.docx
    └── FinFlow_UX_Screens.html
```

---

## Design System

All design tokens live in `src/constants/theme.ts`. The app uses a dark-first palette derived from the FinFlow UX spec:

| Token | Value | Usage |
|-------|-------|-------|
| `colors.bg` | `#060810` | Primary background |
| `colors.surface` | `#111520` | Cards, panels |
| `colors.accent` | `#00f5b0` | Primary CTA, positive values |
| `colors.accent2` | `#5b8dff` | Secondary accent, links |
| `colors.red` | `#ff5252` | Danger, overdue |
| `colors.gold` | `#ffd166` | Premium, highlights |
| `colors.text` | `#eef0f8` | Primary text |
| `colors.text2` | `#8892b0` | Secondary text |
| `colors.text3` | `#3d4461` | Muted / labels |

Typography uses **Outfit** (UI), **Bebas Neue** (display/numbers), and **DM Mono** (financial values).

---

## Architecture Summary

See [ARCHITECTURE.md](./ARCHITECTURE.md) for the full 4-tier system design.

The mobile client implements **Tier 1** of the FinFlow 4-tier architecture:
- Local SQLite cache for offline-first access
- On-device mock NLP simulation (no server calls)
- Biometric auth via `expo-local-authentication`
- State management via Zustand + React Context
- No external API calls in this build (all mock data)

---

## Security Model

- **Zero credential storage** — no passwords saved anywhere
- Biometric-only authentication (Face ID / Touch ID / Fingerprint)
- All sensitive data stored in `expo-secure-store` (iOS Keychain / Android Keystore)
- Session auto-lock after 5 minutes of inactivity
- Mock mode: no network calls, no PII transmitted

---

## Contributing

1. Branch from `main`
2. Follow the TypeScript strict config — no `any` types
3. All new screens must consume data from `AppContext` via `useAppContext()`
4. Mock data additions go in `src/database/mockData.ts` — maintain A–Z structure

---

*FinFlow v1.0 · MVP · April 2026*
