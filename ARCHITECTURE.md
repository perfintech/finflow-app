# FinFlow — Architecture Document

> Version 1.0 · April 2026 · Client-Side (Tier 1) Implementation

---

## 1. Overview

FinFlow is built on a **4-tier cloud-native architecture**. This repository implements **Tier 1 (Client & Presentation Layer)** — the React Native mobile app. All other tiers (API Gateway, Business Logic, Data) are stubbed with local mock data for this offline build.

### Architecture Principles

1. **Real-time financial intelligence** — data freshness signals shown on every screen
2. **Zero-credential security** — biometric-only, no passwords stored
3. **Sub-second UX** — local SQLite cache ensures <100ms screen loads regardless of connectivity

---

## 2. 4-Tier Model (Full System)

```
┌─────────────────────────────────────────────────────────────┐
│  TIER 1 · CLIENT LAYER  [THIS REPO]                         │
│  React Native (Expo)  ·  Local SQLite  ·  On-Device NLP     │
│  Biometric Auth  ·  Push Client  ·  Zustand State           │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTPS / WebSocket (TLS 1.3)
┌──────────────────────▼──────────────────────────────────────┐
│  TIER 2 · API GATEWAY & EDGE                                │
│  GraphQL (Apollo Federation)  ·  Auth (OAuth 2.0 / OIDC)   │
│  Rate Limiter  ·  WAF (AWS WAF)  ·  CDN (CloudFront)        │
└──────────────────────┬──────────────────────────────────────┘
                       │ gRPC (mTLS sync) / SQS-SNS (async)
┌──────────────────────▼──────────────────────────────────────┐
│  TIER 3 · BUSINESS LOGIC & MICROSERVICES                    │
│  Account Aggregation  ·  Transaction Processor              │
│  Email Intelligence  ·  Cashflow Engine  ·  Prompt Engine   │
│  Investment Service  ·  Notification Service  ·  ML Platform│
└──────────────────────┬──────────────────────────────────────┘
                       │ PgBouncer pooling / Redis client
┌──────────────────────▼──────────────────────────────────────┐
│  TIER 4 · DATA & PERSISTENCE                                │
│  Aurora PostgreSQL (sharded)  ·  ElastiCache Redis          │
│  DynamoDB  ·  S3 + Glacier  ·  SQS/SNS  ·  Kinesis         │
│  SageMaker Feature Store  ·  AWS KMS                        │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Tier 1 — Client Layer Detail

### 3.1 Navigation Architecture

```
AppNavigator (root)
│
├── OnboardingStack (shown if !isOnboarded)
│   ├── SplashScreen
│   ├── CreateAccountScreen
│   ├── LinkBankScreen
│   └── EmailIntelligenceScreen
│
└── MainTabNavigator (shown if isOnboarded)
    ├── Tab: Dashboard
    │   └── DashboardScreen
    ├── Tab: Flow
    │   └── CashflowScreen
    ├── Tab: Alerts
    │   └── AlertsScreen
    └── Tab: Profile
        └── ProfileScreen
        
Modal Screens (accessible from anywhere):
├── SpendCheckScreen       (floating action / quick access)
├── SubscriptionAuditScreen
├── TripModeScreen
└── PremiumScreen
```

### 3.2 State Management

Zustand store slices:

| Store | State | Actions |
|-------|-------|---------|
| `userStore` | `user`, `isAuthenticated`, `isOnboarded` | `login`, `logout`, `completeOnboarding` |
| `financeStore` | `accounts`, `transactions`, `netWorth`, `safeToSpend` | `loadUserData`, `updateSafeToSpend` |
| `alertStore` | `alerts`, `unreadCount` | `markRead`, `dismissAlert` |
| `subscriptionStore` | `subscriptions`, `totalMonthlyCost` | `cancelSubscription`, `keepSubscription` |
| `tripStore` | `activeTip`, `tripExpenses` | `setTrip`, `addExpense` |

### 3.3 Local Database (SQLite)

Tables managed by `LocalDatabase.ts`:

```sql
users          (id, name, email, plan_tier, onboarded_at)
accounts       (id, user_id, name, type, balance_cents, institution, color)
transactions   (id, account_id, user_id, merchant, amount_cents, category, date, is_debit)
bills          (id, user_id, name, amount_cents, due_date, source, status)
subscriptions  (id, user_id, name, amount_cents, billing_cycle, last_used, icon)
alerts         (id, user_id, type, title, description, created_at, is_read)
cashflow       (id, user_id, month, year, income_cents, spend_cents)
trips          (id, user_id, name, destination, start_date, end_date, budget_cents, spent_cents)
```

### 3.4 Mock Data Selection Logic

```
emailAddress → firstChar.toLowerCase() → alphabetIndex (0–25)
                                        ↓
                               mockDataSets[index]
                                        ↓
                            Full UserFinancialProfile
```

Non-alpha first characters default to dataset index 0 (Alice Adams).

---

## 4. Security Architecture (Client Layer)

### Biometric Authentication Flow

```
App Launch
    │
    ▼
Check SecureStore for session token
    │
    ├── Token valid + within timeout → MainTabNavigator
    │
    ├── Token expired → Biometric Challenge
    │       │
    │       ├── Success → Refresh token → MainTabNavigator
    │       └── Failure (3x) → Lock screen → Re-enroll
    │
    └── No token → OnboardingStack → CreateAccount
```

### Data Protection

| Data Type | Storage | Encryption |
|-----------|---------|-----------|
| Session token | `expo-secure-store` | iOS Keychain / Android Keystore |
| User email | `expo-secure-store` | AES-256 |
| Financial data | SQLite | SQLCipher (future) |
| Bank tokens | Never stored locally | Server-side only |

---

## 5. Component Architecture

### Screen → Component Dependency Map

```
DashboardScreen
├── OrbLogo
├── NetWorthCard (SparklineChart)
├── SafeToSpendRing (RingChart)
├── AccountCard[]
└── BottomTabBar

CashflowScreen
├── CashflowBarChart
├── ProjectionChart
├── ProjectionBubble[]
└── BillCard[]

AlertsScreen
└── AlertCard[]  (4 variants: danger, success, warning, info)

SubscriptionAuditScreen
├── SubTotalCard
└── SubscriptionRow[]  (cancel/keep actions)

TripModeScreen
├── TripHeroCard (ProgressBar)
├── TripCategoryCard[]
└── ItineraryRow[]
```

---

## 6. Performance Targets (Client)

| Metric | Target | Strategy |
|--------|--------|---------|
| Screen render (cached) | <100ms | SQLite pre-load on app launch |
| Onboarding flow | <3 steps to AHA | Linear 4-step flow |
| Navigation transition | <200ms | Native stack navigator |
| Mock data load | <50ms | In-memory after first DB seed |
| Bundle size | <15MB | Code splitting by tab |

---

## 7. Offline-First Design

All screens are functional without network connectivity:

1. On first launch: seed SQLite from `mockData.ts` based on user email
2. On subsequent launches: read from SQLite directly
3. Stale indicators shown when data >15 minutes old
4. "Sync in progress" states handled gracefully

---

*FinFlow Architecture v1.0 — Client Layer — April 2026*
