// FinFlow — Local Database Schema & TypeScript Interfaces
// All data types used across the app

export type PlanTier = 'free' | 'premium';
export type AccountType = 'checking' | 'savings' | 'credit' | 'investment' | 'loan';
export type AlertType = 'danger' | 'success' | 'warning' | 'info';
export type BillStatus = 'upcoming' | 'due_soon' | 'overdue' | 'paid';
export type BillSource = 'bank' | 'email' | 'manual';
export type BillingCycle = 'monthly' | 'annual' | 'weekly' | 'quarterly';
export type VerdictResult = 'YES' | 'NO' | 'CAUTION';

// ─── USER ────────────────────────────────────────────────────────────────────

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  avatarInitials: string;  // e.g. "MA" for Maya Adams
  planTier: PlanTier;
  bankName: string;        // Primary institution name
  bankColor: string;       // Brand color hex
  onboardedAt: string;     // ISO date string
  greeting: string;        // Time-based greeting name (first name)
}

// ─── ACCOUNTS ────────────────────────────────────────────────────────────────

export interface AccountRecord {
  id: string;
  userId: string;
  name: string;
  type: AccountType;
  institution: string;
  balanceCents: number;    // Stored as cents to avoid float errors
  interestRate?: number;   // APY for savings, APR for credit
  dueDate?: string;        // For credit cards
  color: string;           // Display accent color hex
  logoAbbrev: string;      // e.g. "CHASE", "BofA"
  updatedAt: string;       // ISO date string
}

// ─── TRANSACTIONS ─────────────────────────────────────────────────────────────

export interface TransactionRecord {
  id: string;
  accountId: string;
  userId: string;
  merchant: string;
  merchantIcon: string;    // emoji
  amountCents: number;     // Always positive; isDebit determines direction
  isDebit: boolean;
  category: string;
  date: string;            // ISO date string
  isSubscription: boolean;
  notes?: string;
}

// ─── BILLS ───────────────────────────────────────────────────────────────────

export interface BillRecord {
  id: string;
  userId: string;
  name: string;
  icon: string;            // emoji
  amountCents: number;
  dueDate: string;         // ISO date string
  source: BillSource;
  status: BillStatus;
  accountId: string;       // Account to pay from
  color: string;
}

// ─── SUBSCRIPTIONS ───────────────────────────────────────────────────────────

export interface SubscriptionRecord {
  id: string;
  userId: string;
  name: string;
  icon: string;
  amountCents: number;
  billingCycle: BillingCycle;
  lastUsedDaysAgo: number;
  nextBillingDate: string;
  category: string;
  isWaste: boolean;        // True if lastUsedDaysAgo > 21
  iconBg: string;          // Background color hex for icon
}

// ─── ALERTS ──────────────────────────────────────────────────────────────────

export interface AlertRecord {
  id: string;
  userId: string;
  type: AlertType;
  icon: string;
  title: string;
  description: string;
  timeAgo: string;
  isRead: boolean;
  actionLabel?: string;
  actionRoute?: string;    // Deep link destination
  amountCents?: number;    // Associated amount if any
}

// ─── CASHFLOW ────────────────────────────────────────────────────────────────

export interface CashflowRecord {
  id: string;
  userId: string;
  month: number;           // 1–12
  year: number;
  monthLabel: string;      // e.g. "May", "Jun"
  incomeCents: number;
  spendCents: number;
  netCents: number;        // income - spend
}

export interface ProjectionRecord {
  thirtyDay: number;       // Projected cash position change (dollars)
  sixtyDay: number;
  ninetyDay: number;
}

// ─── TRIPS ───────────────────────────────────────────────────────────────────

export interface TripRecord {
  id: string;
  userId: string;
  name: string;
  destination: string;     // e.g. "NYC → San Francisco"
  startDate: string;
  endDate: string;
  nights: number;
  travelers: number;
  budgetCents: number;
  spentCents: number;
  isOnTrack: boolean;
  detectedFromEmail: boolean;
  categories: TripCategory[];
  itinerary: ItineraryItem[];
}

export interface TripCategory {
  icon: string;
  label: string;
  spentCents: number;
  budgetCents: number;
  fillColor: string;
}

export interface ItineraryItem {
  date: string;
  event: string;
  icon: string;
  amountCents: number;
  isCovered: boolean;
}

// ─── FULL USER PROFILE (mock data unit) ─────────────────────────────────────

export interface UserFinancialProfile {
  user: UserRecord;
  accounts: AccountRecord[];
  transactions: TransactionRecord[];
  bills: BillRecord[];
  subscriptions: SubscriptionRecord[];
  alerts: AlertRecord[];
  cashflow: CashflowRecord[];
  projection: ProjectionRecord;
  trip: TripRecord | null;
  netWorthCents: number;
  safeToSpendCents: number;
  monthlyIncomeCents: number;
  monthlySpendCents: number;
  subscriptionsTotalMonthlyCents: number;
  subscriptionsWastedMonthlyCents: number;
  sparklineData: number[];   // 6 net worth data points for trend line (normalized 0–1)
}

// ─── SPEND CHECK ─────────────────────────────────────────────────────────────

export interface SpendCheckResult {
  verdict: VerdictResult;
  purchaseAmountCents: number;
  remainingSTSCents: number;
  billsCovered: boolean;
  nextConcernDate: string;
  weeklyRemaining: number;
}

// ─── DB OPERATION RESULT ─────────────────────────────────────────────────────

export interface DbResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// ─── SQL CREATE TABLE STATEMENTS ─────────────────────────────────────────────

export const SQL_CREATE_TABLES = `
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  avatar_initials TEXT,
  plan_tier TEXT DEFAULT 'free',
  bank_name TEXT,
  bank_color TEXT,
  onboarded_at TEXT,
  greeting TEXT
);

CREATE TABLE IF NOT EXISTS accounts (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  institution TEXT,
  balance_cents INTEGER DEFAULT 0,
  interest_rate REAL,
  due_date TEXT,
  color TEXT,
  logo_abbrev TEXT,
  updated_at TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS transactions (
  id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  merchant TEXT NOT NULL,
  merchant_icon TEXT,
  amount_cents INTEGER NOT NULL,
  is_debit INTEGER DEFAULT 1,
  category TEXT,
  date TEXT NOT NULL,
  is_subscription INTEGER DEFAULT 0,
  notes TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS bills (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  icon TEXT,
  amount_cents INTEGER NOT NULL,
  due_date TEXT NOT NULL,
  source TEXT DEFAULT 'bank',
  status TEXT DEFAULT 'upcoming',
  account_id TEXT,
  color TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS subscriptions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  icon TEXT,
  amount_cents INTEGER NOT NULL,
  billing_cycle TEXT DEFAULT 'monthly',
  last_used_days_ago INTEGER DEFAULT 0,
  next_billing_date TEXT,
  category TEXT,
  is_waste INTEGER DEFAULT 0,
  icon_bg TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS alerts (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  type TEXT NOT NULL,
  icon TEXT,
  title TEXT NOT NULL,
  description TEXT,
  time_ago TEXT,
  is_read INTEGER DEFAULT 0,
  action_label TEXT,
  action_route TEXT,
  amount_cents INTEGER,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS cashflow (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  month INTEGER NOT NULL,
  year INTEGER NOT NULL,
  month_label TEXT,
  income_cents INTEGER DEFAULT 0,
  spend_cents INTEGER DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS trips (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  name TEXT,
  destination TEXT,
  start_date TEXT,
  end_date TEXT,
  nights INTEGER DEFAULT 0,
  travelers INTEGER DEFAULT 1,
  budget_cents INTEGER DEFAULT 0,
  spent_cents INTEGER DEFAULT 0,
  is_on_track INTEGER DEFAULT 1,
  detected_from_email INTEGER DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS app_state (
  key TEXT PRIMARY KEY,
  value TEXT
);
`;
