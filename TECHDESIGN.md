# FinFlow — Technical Design Document

> Client Layer (React Native / Expo) · v1.1 · April 2026

---

## 1. Technology Choices

### Framework: Expo (Managed Workflow)

**Why Expo over bare React Native:**
- Unified build pipeline for iOS + Android from a single codebase
- `expo-local-authentication` handles Face ID / Touch ID / Fingerprint with one API
- `expo-secure-store` provides OS-level keychain/keystore without native modules
- `expo-sqlite` gives zero-config local persistence
- OTA update capability via EAS Update for patch deploys

### Navigation: React Navigation v6

- `@react-navigation/native-stack` — native performance for onboarding flow
- `@react-navigation/bottom-tabs` — main app tabs with custom tab bar
- Deep linking via `expo-router` scheme `finflow://`

### State: Zustand + React Context

- **Zustand** for global slices (user, finance, alerts) — minimal boilerplate, no provider hell
- **React Context** (`AppContext`) for DI of the database instance and user session
- **No Redux** — overkill for this domain; Zustand gives 90% of the value with 20% of the complexity

### Local Storage: expo-sqlite

- Schema defined in `src/database/schema.ts`
- All queries in `src/database/LocalDatabase.ts` (repository pattern)
- Mock data seeded once on first launch from `src/database/mockData.ts`
- **No network calls** — entire app operates on local data

### Charts: React Native SVG

- All charts built as SVG components (no third-party chart lib dependency)
- `SparklineChart` — net worth trend line
- `RingChart` — Safe to Spend donut
- `BarChart` — monthly cashflow bars
- `ProjectionChart` — 30/60/90-day forecast line

---

## 2. Data Flow

### Onboarding Data Flow

```
User enters name + email
        │
        ▼
mockDataSelector(email) → picks dataset[0..25]
        │
        ▼
LocalDatabase.seedUser(profile)
   ├── INSERT users
   ├── INSERT accounts[]
   ├── INSERT transactions[]
   ├── INSERT bills[]
   ├── INSERT subscriptions[]
   ├── INSERT alerts[]
   ├── INSERT cashflow[]
   └── INSERT trips[]
        │
        ▼
AppContext.setUser(user) + financeStore.loadUserData()
        │
        ▼
Navigate to MainTabNavigator
```

### Dashboard Data Flow

```
DashboardScreen mounts
        │
        ▼
useFinanceStore() → { accounts, netWorth, safeToSpend }
        │
        ▼
If data empty → LocalDatabase.getUserFinancialData(userId)
        │
        ▼
Render: NetWorthCard, SafeToSpendRing, AccountCard[]
```

---

## 3. Mock Data Architecture

### Dataset Selection Algorithm

```typescript
function selectMockDataset(email: string): UserFinancialProfile {
  const firstChar = email.trim().toLowerCase()[0];
  const isAlpha = /[a-z]/.test(firstChar);
  const index = isAlpha ? firstChar.charCodeAt(0) - 97 : 0; // 'a'=0, 'z'=25
  return MOCK_DATA_SETS[index];
}
```

### Mock Data Structure per User

Each of the 26 datasets contains:

```typescript
interface UserFinancialProfile {
  user: UserRecord;
  accounts: AccountRecord[];        // 2–5 accounts
  transactions: TransactionRecord[]; // 30 transactions (last 30 days)
  bills: BillRecord[];              // 3–6 upcoming bills
  subscriptions: SubscriptionRecord[]; // 4–8 subscriptions
  alerts: AlertRecord[];            // 3–5 alerts
  cashflow: CashflowRecord[];       // 6 months of data
  trip: TripRecord | null;          // Active trip (if any)
  netWorth: number;
  safeToSpend: number;
  monthlyIncome: number;
  monthlySpend: number;
}
```

### 26 User Personas

| Letter | Name | Profile | Net Worth | Tier |
|--------|------|---------|-----------|------|
| A | Alice Adams | Senior engineer, aggressive saver | $285,400 | Premium |
| B | Bob Baker | Recent grad, building credit | $12,800 | Free |
| C | Carol Chen | Small business owner | $198,200 | Premium |
| D | David Diaz | Young family, mortgage | $156,300 | Premium |
| E | Emma Evans | Freelance designer | $34,700 | Free |
| F | Frank Foster | Pre-retirement, 55 | $842,100 | Premium |
| G | Grace Green | Teacher, side hustle | $67,400 | Free |
| H | Henry Hill | Software lead, high earner | $412,900 | Premium |
| I | Iris Ingram | Travel nurse, variable income | $28,600 | Free |
| J | James Johnson | Married, dual income | $224,700 | Premium |
| K | Kim Kim | Startup founder | $91,300 | Premium |
| L | Leo Lopez | College student | $4,200 | Free |
| M | Maya Mitchell | Marketing manager | $142,840 | Premium |
| N | Nina Nguyen | Nurse, second job | $52,100 | Free |
| O | Oscar Owens | Real estate investor | $1,240,000 | Premium |
| P | Priya Patel | Data scientist | $178,500 | Premium |
| Q | Quinn Quinn | Gig worker (Uber/DoorDash) | $8,900 | Free |
| R | Ryan Reed | Sales rep, commission | $88,700 | Premium |
| S | Sara Singh | Single mom, budget-focused | $31,200 | Free |
| T | Tyler Torres | Crypto enthusiast | $64,800 | Free |
| U | Uma Upton | University professor | $312,100 | Premium |
| V | Vince Vega | Chef, restaurant owner | $76,400 | Free |
| W | Wendy Walsh | Retired teacher | $523,600 | Premium |
| X | Xander Xu | Quantitative analyst | $387,200 | Premium |
| Y | Yuki Yamamoto | Product manager | $165,900 | Premium |
| Z | Zoe Zhang | FIRE adherent, early retirement | $1,050,000 | Premium |

---

## 4. Screen Design Decisions

### Safe to Spend (STS) Calculation

```
STS = Checking Balance
      - Upcoming bills (next 30 days)
      - Savings goal allocation
      - Emergency buffer (10% of balance)
```

### "Can I Afford It?" Logic

```typescript
function canAffordIt(amount: number, userData: UserFinancialProfile): Verdict {
  const remaining = userData.safeToSpend - amount;
  const billsCovered = userData.bills.every(b => 
    userData.accounts[0].balance - amount > b.amount
  );
  return {
    verdict: remaining > 0 && billsCovered ? 'YES' : 'NO',
    remainingSTS: remaining,
    billsCovered,
    nextConcern: getNextBillDate(userData.bills),
  };
}
```

### Subscription Waste Score

```
wasteScore = (daysSinceLastUsed / 30) * monthlyAmount
If wasteScore > threshold → recommend cancel
```

---

## 5. Component API Reference

### `<NetWorthCard />`
```typescript
interface NetWorthCardProps {
  value: number;        // in dollars
  delta: number;        // monthly change in dollars
  deltaPercent: number; // as decimal (0.0167 = 1.67%)
  sparkData: number[];  // 6 data points for sparkline
}
```

### `<SafeToSpendRing />`
```typescript
interface SafeToSpendRingProps {
  available: number;    // dollars available to spend
  lockedItems: Array<{ label: string; amount: number; color: string }>;
}
```

### `<AlertCard />`
```typescript
type AlertVariant = 'danger' | 'success' | 'warning' | 'info';
interface AlertCardProps {
  variant: AlertVariant;
  icon: string;         // emoji
  title: string;
  description: string;
  timeAgo: string;
  actionLabel?: string;
  onAction?: () => void;
}
```

---

## 6. Accessibility

- All interactive elements have `accessibilityLabel` and `accessibilityRole`
- Color is never the sole differentiator (always paired with icon or text)
- Minimum touch target: 44×44 points (Apple HIG)
- Dynamic Type support via `allowFontScaling`
- Screen reader support via `AccessibilityInfo.announceForAccessibility`

---

## 7. Testing Strategy

| Level | Tool | Coverage Target |
|-------|------|----------------|
| Unit | Jest | mockDataSelector, formatters, STS calc |
| Component | React Native Testing Library | All shared components |
| E2E | Detox | Onboarding flow, spend check |

---

## 8. Build & Release

```bash
# Development build
eas build --profile development --platform ios

# Preview build (TestFlight / internal)
eas build --profile preview --platform all

# Production build
eas build --profile production --platform all

# OTA update
eas update --branch production --message "Hotfix: STS calc"
```

---

---

## 9. Money Map — Cross-Institution Aggregation (v1.1)

### Purpose

Give users a single-screen answer to: *"Across all my banks and accounts — where does my money come from, where does it go, what do I own, and what do I owe this month?"*

### Aggregation Functions (computed in screen via `useMemo`)

```typescript
// 1. Total balance across all institutions
const totalBalanceCents = accounts.reduce((s, a) => s + a.balanceCents, 0);

// 2. Group accounts by institution
const byInstitution = accounts.reduce((map, a) => {
  if (!map[a.institution]) map[a.institution] = { accounts: [], color: a.color };
  map[a.institution].accounts.push(a);
  return map;
}, {} as Record<string, { accounts: AccountRecord[]; color: string }>);

// 3. Current-month transactions
const now = new Date();
const monthTxns = transactions.filter(t => {
  const d = new Date(t.date);
  return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
});

// 4. Inflow: credits grouped by institution
const inflowByInstitution = monthTxns
  .filter(t => !t.isDebit)
  .reduce((map, t) => {
    const acct = accounts.find(a => a.id === t.accountId);
    const inst = acct?.institution ?? 'Unknown';
    map[inst] = (map[inst] ?? 0) + t.amountCents;
    return map;
  }, {} as Record<string, number>);

// 5. Expense spend by category
const spendByCategory = monthTxns
  .filter(t => t.isDebit)
  .reduce((map, t) => {
    map[t.category] = (map[t.category] ?? 0) + t.amountCents;
    return map;
  }, {} as Record<string, number>);

// 6. Savings & investment accounts
const savingsAccounts  = accounts.filter(a => a.type === 'savings');
const investAccounts   = accounts.filter(a => a.type === 'investment');

// 7. Bills due this calendar month
const monthBills = bills.filter(b => {
  const d = new Date(b.dueDate);
  return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
});
```

### CategoryRow Bar Width Calculation

```typescript
const maxSpend = Math.max(...Object.values(spendByCategory));
const barWidth = (categoryAmount / maxSpend) * 100; // percentage string for style
```

### Institution Net Position

```typescript
const institutionNet = (inst: string) =>
  byInstitution[inst].accounts.reduce((s, a) =>
    // credit balances are negative debt; add as negative
    a.type === 'credit' ? s + a.balanceCents : s + a.balanceCents, 0);
```

### Component: `<MoneyMapScreen />`

File: `app/main/money-map.tsx`

Props: none (reads from `useAppContext`)

Sections rendered top-to-bottom:
1. `TotalBalanceCard` — net worth across all institutions, color-coded institution rows
2. `InflowSection` — per-institution inflow cards for current month
3. `ExpenseBreakdownSection` — category bars (top 6), total monthly spend
4. `SavingsInvestmentSection` — savings APY cards + investment account values
5. `BillsThisMonthSection` — all bills due in current month, grouped by status (overdue / due soon / upcoming / paid)

---

*FinFlow TechDesign v1.1 — April 2026*
