# FinFlow MVP — Feature Specification

## Implemented Features

### 1. Onboarding Flow (4 Screens)

#### Splash Screen (`/onboarding/splash`)
- Brand introduction with tagline "Know where you stand. Always."
- Call-to-action button: "Get Started"
- Gradient background reflecting brand colors
- **UX**: Clear value proposition before signup

#### Create Account (`/onboarding/create-account`)
- Text inputs: Full name, email
- Validation: Non-empty fields required
- Uses `useAppContext().createAccount(name, email)`
- Biometric enrollment: *Future* (Face ID setup)
- **UX**: Minimal friction; proceed to bank linking

#### Link Bank (`/onboarding/link-bank`)
- Bank institution selector (Chase, Wells Fargo, Fidelity, Bank of America)
- Visual badges with bank brand colors
- Selection updates user profile bank name + color
- **UX**: Mock integration; no Plaid/OAuth
- **Data Flow**: Bank choice persisted to AppContext

#### Email Intelligence (`/onboarding/email`)
- Mock Gmail/Outlook connection
- Simulates mailbox sync (shows "5 new matches found")
- Completes onboarding flow
- Navigates to Dashboard on "Finish setup"
- **UX**: Security reassurance ("No passwords stored")
- **Data Flow**: Triggers `finishOnboarding()` → sets `isOnboarded=true`

---

### 2. Main Tab Navigation (4 Base Tabs + 4 Hidden Modals)

#### Active Tabs (Bottom Navigation)

##### Dashboard (`/main/dashboard`)
- **Header**: "Good morning, [Name]" greeting
- **Status**: Safe to Spend amount in accent green
- **Net Worth Card**:
  - Uses `profile.netWorthCents`
  - Formatted with `formatCurrency()`
  - Large Bebas Neue font (display typography)
- **Top Accounts Section**:
  - Shows 3 primary accounts (checking, savings, credit)
  - Colored dot per account type
  - Balance displayed for each
  - FlatList with account cards
- **Summary Row**:
  - Monthly income
  - Monthly spend
  - Side-by-side cards

**UX Patterns**:
- Prioritizes Safe to Spend (the core insight)
- Account colors match design system
- Refreshes on mount if data empty

##### Cashflow (`/main/cashflow`)
- **Title**: "Monthly Cashflow"
- **Chart**: `BarChart` component showing 6 months of income vs. spend
- **Data Source**: `profile.cashflow[]` (6 CashflowRecords)
- **Projection Card**:
  - 30-day change
  - 60-day change
  - 90-day change
  - Uses `profile.projection` object
- **List**: Clickable month cards with income/spend/net breakdown

**Chart Components**:
- `BarChart`: SVG-based monthly comparison
- `ProjectionChart`: Line graph of 30/60/90-day forecast

##### Alerts (`/main/alerts`)
- **Title**: "Alerts"
- **Subtitle**: "High-signal, low-noise financial notices"
- **Alert Types**:
  - `danger` (red border): Due bills, overdue, low balance
  - `success` (green border): Payroll received, savings moved
  - `warning` (yellow border): Unusual spend, subscription waste
  - `info` (blue border): Opportunities, insights
- **Alert Card**:
  - Icon, title, description, time ago
  - Associated amount (if any) in monospace font
  - Action label with deep link
- **Data Source**: `profile.alerts[]` (up to 10 unread first)

**UX Patterns**:
- Color-coded by severity
- Time-stamped ("2 min ago", "Yesterday")
- Actionable (can tap to navigate)
- Icons provide quick visual scan

##### Profile (`/main/profile`)
- **Account Section**:
  - Avatar initials (e.g., "MM") in accent circle
  - Name and email below
- **Info Cards**:
  - Plan tier (FREE / PREMIUM)
  - Primary bank name
  - Current Safe to Spend
- **Sign Out Button**:
  - Red confirmation button
  - Calls `logout()` → clears SecureStore → navigates to splash

**UX Patterns**:
- Minimal settings screen (MVP)
- Avatar built from first 2 letters of name
- Future: Biometric re-enrollment, notification settings

---

#### Hidden Modal Screens (Accessible via navigation)

##### Spend Check / Can I Afford It? (`/main/spend-check`)
- **Purpose**: Quick verdict on purchase affordability
- **Input**: Dollar amount (decimal-pad keyboard)
- **Calculation Logic**:
  ```
  spendAmount > safeToSpend → "NO" (red gradient)
  spendAmount > safeToSpend * 70% → "CAUTION" (yellow gradient)
  spendAmount ≤ safeToSpend * 70% → "YES" (green gradient)
  ```
- **Output Card** (conditional gradients):
  - Verdict icon + label
  - Message: "You can afford this" / "Not enough Safe to Spend"
  - Remaining Safe to Spend after purchase
  - Hint about bills coverage
- **Context Cards**:
  - Current Safe to Spend breakdown
  - Upcoming 3 bills with due dates and amounts
- **UX Patterns**:
  - Real-time verdict updates as user types
  - Gradient backgrounds match verdict color
  - Bills context prevents overspending

##### Subscription Audit (`/main/subscriptions`)
- **Purpose**: Identify and cancel unused subscriptions
- **Summary Card** (3 columns):
  - Total monthly cost
  - Waste (unused subs)
  - Active count
- **Subscription List**:
  - Sorted: Waste first, then by amount descending
  - Card per subscription:
    - Icon + category (e.g., "Netflix" / "Entertainment")
    - Colored background per category
    - Monthly amount + frequency (M/A/W/Q abbreviation)
    - Red "UNUSED" badge if `isWaste=true` (last used > 21 days)
    - Action button: "Cancel" or "Keep"
- **Data Source**: `profile.subscriptions[]` with `isWaste` boolean

**Waste Detection**:
- `lastUsedDaysAgo > 21` → marked unused
- Total waste = sum of waste subscriptions
- Recommendations to cancel

**UX Patterns**:
- Visual waste detection (badge + red border)
- Action buttons (dismissing removes from list temporarily)
- Summary shows immediate savings if cancel all waste

##### Trip Mode (`/main/trip`)
- **Purpose**: Track travel budget per trip
- **Header**: Trip name, destination, dates ("May 10–12 · 3 nights")
- **Budget Card** (gradient):
  - Total budget
  - Progress bar (filled % = spent/$budget)
  - Spent amount
  - Remaining amount
  - "On Track" or "Over Budget" status
- **Category Breakdown**:
  - Flights, Hotel, Meals, Transport icons
  - Budget vs. spent per category
  - Mini progress bars (color-coded per category)
- **Itinerary** (if available):
  - Date, event, amount, coverage status (✓ = covered)
  - Flight departures, hotel checkins, activity bookings
- **Data Source**: `profile.trip` (optional; null if no active trip)
- **No Active Trip**: Message + airplane emoji

**UX Patterns**:
- Real-time budget status at glance
- Category-level granularity
- Itinerary roadmap of the trip
- "On Track" indicator prevents surprise overspend

##### Premium / Plan Upgrade (`/main/premium`)
- **Purpose**: Upsell Premium features
- **Plan Cards** (2 plans):
  - **Free**: $0, core tools only
  - **Premium**: $9.99/month, "RECOMMENDED" badge
- **Features List** (per plan):
  - Checkmark (✓) for included
  - X for free-only exclusions
  - Examples:
    - Safe to Spend ✓✓
    - Unlimited alerts ✗✓
    - Investment tracking ✗✓
    - Tax reports ✗✓
- **CTA Button**: "Upgrade Now" (if free) or "Current Plan" (if premium)
- **Comparison Table**:
  - Feature matrix: Free vs. Premium
- **FAQ** (mock):
  - "Can I cancel anytime?" → "Yes, no commitments"
  - "Free trial?" → "30 days free"

**UX Patterns**:
- Clear value proposition per feature
- Recommended plan visually highlighted
- FAQ removes upgrade friction
- Mock behavior (no Stripe integration)

---

## Data Model Overview

### User Profile Structure

```typescript
interface UserFinancialProfile {
  user: UserRecord;           // Name, email, plan tier, bank
  accounts: AccountRecord[];  // Checking, savings, credit, investment
  transactions: TransactionRecord[]; // Last 30 days
  bills: BillRecord[];        // Upcoming bills with due dates
  subscriptions: SubscriptionRecord[]; // With waste scoring
  alerts: AlertRecord[];      // Top 5 unread
  cashflow: CashflowRecord[]; // 6 months history
  projection: ProjectionRecord; // 30/60/90-day forecast
  trip: TripRecord | null;    // Active trip (if any)
  
  // Computed values
  netWorthCents: number;      // Sum of all assets - liabilities
  safeToSpendCents: number;   // Checking - bills - buffer
  monthlyIncomeCents: number;
  monthlySpendCents: number;
  subscriptionsTotalMonthlyCents: number;
  subscriptionsWastedMonthlyCents: number;
  sparklineData: number[];    // 6-month normalized trend [0..1]
}
```

### 26 Mock User Profiles (A–Z)

Each profile represents a different financial archetype:

| Letter | Name | Profile | Tier | Net Worth |
|--------|------|---------|------|-----------|
| A | Alice Adams | Senior engineer, aggressive saver | Premium | $285K |
| B | Bob Baker | Recent grad, building credit | Free | $12K |
| C | Carol Chen | Small business owner | Premium | $198K |
| D | David Diaz | Young family, mortgage | Premium | $156K |
| E | Emma Evans | Freelance designer | Free | $34K |
| F | Frank Foster | Pre-retirement, 55 | Premium | $842K |
| ... | ... | ... | ... | ... |
| Z | Zoe Zhang | FIRE adherent, early retirement | Premium | $1.05M |

**Selection Algorithm**:
```typescript
email.toLowerCase()[0] → charCode - 97 → index [0..25]
"alice@..."[0] = 'a' → 0 → MOCK_DATA_SETS[0]
"zoe@..."[0] = 'z' → 25 → MOCK_DATA_SETS[25]
```

---

## Component Reuse & Composition

### Chart Components (`src/components/Charts.tsx`)

All charts are pure SVG components (no D3 or external chart lib):

- **SparklineChart**: 6-point trend line (net worth history)
- **RingChart**: Progress donut (Safe to Spend usage)
- **BarChart**: Monthly comparison (cashflow)
- **ProjectionChart**: Forecast line (30/60/90-day outlook)

Each accepts `data`, `width`, `height`, `color` props for flexibility.

### Formatting Utilities (`src/utils/formatters.ts`)

- `formatCurrency(cents)`: "$1,234.56" from 123456
- `formatDate(iso)`: "May 10" from "2026-05-10"
- `formatDecimal(n)`: "1.23" from 1.23456
- `buildAvatarInitials(name)`: "MA" from "Maya Adams"

---

## State Management

### AppContext (session + profile)

```typescript
{
  ready: boolean,              // DB initialized
  isOnboarded: boolean,        // Flag: completed onboarding
  profile: UserFinancialProfile | null,
  
  createAccount(name, email):  // Loads mock dataset + persists email
  chooseBank(institution):     // Updates profile bank
  finishOnboarding():          // Sets flag + navigates to dashboard
  logout():                    // Clears SecureStore + resets state
}
```

### Secure Storage

- Uses `expo-secure-store` (iOS Keychain / Android Keystore)
- Keys:
  - `finflow_user_email`: Last logged-in email (used to reload profile)
  - `finflow_onboarded`: Boolean flag for onboarding completion

---

## Design System

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `bg` | #060810 | Primary background |
| `surface` | #111520 | Cards, containers |
| `accent` | #00f5b0 | Primary action, positive (green) |
| `accent2` | #5b8dff | Secondary action, info (blue) |
| `red` | #ff5252 | Danger, negative |
| `warn` | #ffb347 | Caution (orange) |
| `gold` | #ffd166 | Premium, highlights |
| `text` | #eef0f8 | Primary text |
| `text2` | #8892b0 | Secondary text |
| `text3` | #3d4461 | Tertiary, muted |

### Typography

| Style | Font | Size | Weight | Usage |
|-------|------|------|--------|-------|
| `h1` | Outfit | 24 | 800 | Screen titles |
| `h2` | Outfit | 19 | 800 | Section headers |
| `h3` | Outfit | 16 | 700 | Card titles |
| `body1` | Outfit | 15 | 400 | Body copy |
| `body2` | Outfit | 13 | 400 | Small descriptions |
| `display1` | BebasNeue | 52 | - | Large numbers (net worth) |
| `displayAmt` | BebasNeue | 48 | - | Large amounts (Safe to Spend) |
| `monoLg` | DMMonoRegular | 15 | 500 | Currency values |

### Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `xs` | 4px | Tight spacing |
| `sm` | 8px | Standard gap |
| `md` | 12px | Padding |
| `lg` | 16px | Card padding |
| `xl` | 20px | Section spacing |
| `xxl` | 24px | Large sections |
| `xxxl` | 32px | Very large |
| `screen` | 22px | Horizontal screen padding |

---

## Cross-Platform Considerations

### iOS-Specific

- Safe area insets handled by `<SafeAreaView>`
- Keyboard avoidance via `<KeyboardAvoidingView>`
- Biometric support: Face ID (set in `app.json` Info.plist)

### Android-Specific

- Material Design baseline (icons, ripl effects)
- Permissions: `USE_BIOMETRIC` in `app.json`
- Back button handled by React Navigation

---

## Performance Notes

- **Bundle Size**: ~15MB uncompressed (Expo managed build)
- **SQLite Load**: <50ms on fresh seed (in-memory after first launch)
- **Screen Render**: <100ms (cached data from SQLite)
- **Navigation Transition**: <200ms (native stack navigator)
- **FlatList Optimization**: `FlashList` used for large lists (subscriptions)

---

## Testing & QA

### Manual Testing Checklist

- [ ] Onboarding flow (all 4 screens)
- [ ] Dashboard loads with correct net worth
- [ ] Safe to Spend calculation correct (checking - bills - 10%)
- [ ] Spend Check verdict updates in real-time
- [ ] Subscription audit shows waste correctly
- [ ] Alerts render with correct color-coded severity
- [ ] Trip mode displays budget progress bar
- [ ] Premium plan comparison displays
- [ ] Sign out clears data and returns to splash
- [ ] All screens responsive on iOS + Android

### No Automated Tests

MVP uses manual QA via Expo simulators. Future: Jest + React Native Testing Library.

---

*FinFlow v1.0 Feature Spec · April 2026*
