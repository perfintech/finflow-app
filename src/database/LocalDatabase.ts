import * as SQLite from 'expo-sqlite';
import {
  SQL_CREATE_TABLES,
  UserFinancialProfile,
} from './schema';

export class LocalDatabase {
  private db: SQLite.SQLiteDatabase | null = null;

  async initialize(): Promise<void> {
    this.db = await SQLite.openDatabaseAsync('finflow.db');

    const statements = SQL_CREATE_TABLES
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0);
    for (const stmt of statements) {
      await this.db.execAsync(stmt + ';');
    }

    // Migrations: add JSON columns to trips for nested data
    for (const col of ['categories_json TEXT DEFAULT \'[]\'', 'itinerary_json TEXT DEFAULT \'[]\'']) {
      try {
        await this.db.execAsync(`ALTER TABLE trips ADD COLUMN ${col};`);
      } catch {
        // Column already exists
      }
    }
  }

  async seedUser(profile: UserFinancialProfile): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');
    const { user } = profile;
    const uid = user.id;

    await this.db.runAsync(
      `INSERT OR REPLACE INTO users (id,name,email,avatar_initials,plan_tier,bank_name,bank_color,onboarded_at,greeting) VALUES (?,?,?,?,?,?,?,?,?)`,
      [uid, user.name, user.email, user.avatarInitials, user.planTier, user.bankName, user.bankColor, user.onboardedAt, user.greeting],
    );

    await this.db.runAsync(
      `INSERT OR REPLACE INTO app_state (key,value) VALUES (?,?)`,
      [
        `${uid}_summary`,
        JSON.stringify({
          netWorthCents: profile.netWorthCents,
          safeToSpendCents: profile.safeToSpendCents,
          monthlyIncomeCents: profile.monthlyIncomeCents,
          monthlySpendCents: profile.monthlySpendCents,
          subscriptionsTotalMonthlyCents: profile.subscriptionsTotalMonthlyCents,
          subscriptionsWastedMonthlyCents: profile.subscriptionsWastedMonthlyCents,
          sparklineData: profile.sparklineData,
          projection: profile.projection,
        }),
      ],
    );

    for (const table of ['accounts', 'transactions', 'bills', 'subscriptions', 'alerts', 'cashflow', 'trips']) {
      await this.db.runAsync(`DELETE FROM ${table} WHERE user_id = ?`, [uid]);
    }

    for (const a of profile.accounts) {
      await this.db.runAsync(
        `INSERT INTO accounts (id,user_id,name,type,institution,balance_cents,interest_rate,due_date,color,logo_abbrev,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
        [a.id, uid, a.name, a.type, a.institution, a.balanceCents, a.interestRate ?? null, a.dueDate ?? null, a.color, a.logoAbbrev, a.updatedAt],
      );
    }

    for (const t of profile.transactions) {
      await this.db.runAsync(
        `INSERT INTO transactions (id,account_id,user_id,merchant,merchant_icon,amount_cents,is_debit,category,date,is_subscription,notes) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
        [t.id, t.accountId, uid, t.merchant, t.merchantIcon, t.amountCents, t.isDebit ? 1 : 0, t.category, t.date, t.isSubscription ? 1 : 0, t.notes ?? null],
      );
    }

    for (const b of profile.bills) {
      await this.db.runAsync(
        `INSERT INTO bills (id,user_id,name,icon,amount_cents,due_date,source,status,account_id,color) VALUES (?,?,?,?,?,?,?,?,?,?)`,
        [b.id, uid, b.name, b.icon, b.amountCents, b.dueDate, b.source, b.status, b.accountId, b.color],
      );
    }

    for (const s of profile.subscriptions) {
      await this.db.runAsync(
        `INSERT INTO subscriptions (id,user_id,name,icon,amount_cents,billing_cycle,last_used_days_ago,next_billing_date,category,is_waste,icon_bg) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
        [s.id, uid, s.name, s.icon, s.amountCents, s.billingCycle, s.lastUsedDaysAgo, s.nextBillingDate, s.category, s.isWaste ? 1 : 0, s.iconBg],
      );
    }

    for (const al of profile.alerts) {
      await this.db.runAsync(
        `INSERT INTO alerts (id,user_id,type,icon,title,description,time_ago,is_read,action_label,action_route,amount_cents) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
        [al.id, uid, al.type, al.icon, al.title, al.description, al.timeAgo, al.isRead ? 1 : 0, al.actionLabel ?? null, al.actionRoute ?? null, al.amountCents ?? null],
      );
    }

    for (const c of profile.cashflow) {
      await this.db.runAsync(
        `INSERT INTO cashflow (id,user_id,month,year,month_label,income_cents,spend_cents) VALUES (?,?,?,?,?,?,?)`,
        [c.id, uid, c.month, c.year, c.monthLabel, c.incomeCents, c.spendCents],
      );
    }

    if (profile.trip) {
      const tr = profile.trip;
      await this.db.runAsync(
        `INSERT INTO trips (id,user_id,name,destination,start_date,end_date,nights,travelers,budget_cents,spent_cents,is_on_track,detected_from_email,categories_json,itinerary_json) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [tr.id, uid, tr.name, tr.destination, tr.startDate, tr.endDate, tr.nights, tr.travelers, tr.budgetCents, tr.spentCents, tr.isOnTrack ? 1 : 0, tr.detectedFromEmail ? 1 : 0, JSON.stringify(tr.categories), JSON.stringify(tr.itinerary)],
      );
    }
  }

  async getUserFinancialData(userId: string): Promise<UserFinancialProfile | null> {
    if (!this.db) throw new Error('Database not initialized');

    const userRow = await this.db.getFirstAsync<Record<string, unknown>>(
      `SELECT * FROM users WHERE id = ?`, [userId],
    );
    if (!userRow) return null;

    const summaryRow = await this.db.getFirstAsync<{ value: string }>(
      `SELECT value FROM app_state WHERE key = ?`, [`${userId}_summary`],
    );
    const summary = summaryRow ? JSON.parse(summaryRow.value) : {};

    const accounts = await this.db.getAllAsync<Record<string, unknown>>(
      `SELECT * FROM accounts WHERE user_id = ?`, [userId],
    );
    const transactions = await this.db.getAllAsync<Record<string, unknown>>(
      `SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC`, [userId],
    );
    const bills = await this.db.getAllAsync<Record<string, unknown>>(
      `SELECT * FROM bills WHERE user_id = ?`, [userId],
    );
    const subscriptions = await this.db.getAllAsync<Record<string, unknown>>(
      `SELECT * FROM subscriptions WHERE user_id = ?`, [userId],
    );
    const alerts = await this.db.getAllAsync<Record<string, unknown>>(
      `SELECT * FROM alerts WHERE user_id = ? ORDER BY is_read ASC`, [userId],
    );
    const cashflow = await this.db.getAllAsync<Record<string, unknown>>(
      `SELECT * FROM cashflow WHERE user_id = ? ORDER BY year ASC, month ASC`, [userId],
    );
    const tripRow = await this.db.getFirstAsync<Record<string, unknown>>(
      `SELECT * FROM trips WHERE user_id = ?`, [userId],
    );

    return {
      user: {
        id: userRow.id as string,
        name: userRow.name as string,
        email: userRow.email as string,
        avatarInitials: userRow.avatar_initials as string,
        planTier: userRow.plan_tier as 'free' | 'premium',
        bankName: userRow.bank_name as string,
        bankColor: userRow.bank_color as string,
        onboardedAt: userRow.onboarded_at as string,
        greeting: userRow.greeting as string,
      },
      accounts: accounts.map(a => ({
        id: a.id as string,
        userId: a.user_id as string,
        name: a.name as string,
        type: a.type as 'checking' | 'savings' | 'credit' | 'investment' | 'loan',
        institution: a.institution as string,
        balanceCents: a.balance_cents as number,
        interestRate: a.interest_rate as number | undefined,
        dueDate: a.due_date as string | undefined,
        color: a.color as string,
        logoAbbrev: a.logo_abbrev as string,
        updatedAt: a.updated_at as string,
      })),
      transactions: transactions.map(t => ({
        id: t.id as string,
        accountId: t.account_id as string,
        userId: t.user_id as string,
        merchant: t.merchant as string,
        merchantIcon: t.merchant_icon as string,
        amountCents: t.amount_cents as number,
        isDebit: (t.is_debit as number) === 1,
        category: t.category as string,
        date: t.date as string,
        isSubscription: (t.is_subscription as number) === 1,
        notes: t.notes as string | undefined,
      })),
      bills: bills.map(b => ({
        id: b.id as string,
        userId: b.user_id as string,
        name: b.name as string,
        icon: b.icon as string,
        amountCents: b.amount_cents as number,
        dueDate: b.due_date as string,
        source: b.source as 'bank' | 'email' | 'manual',
        status: b.status as 'upcoming' | 'due_soon' | 'overdue' | 'paid',
        accountId: b.account_id as string,
        color: b.color as string,
      })),
      subscriptions: subscriptions.map(s => ({
        id: s.id as string,
        userId: s.user_id as string,
        name: s.name as string,
        icon: s.icon as string,
        amountCents: s.amount_cents as number,
        billingCycle: s.billing_cycle as 'monthly' | 'annual' | 'weekly' | 'quarterly',
        lastUsedDaysAgo: s.last_used_days_ago as number,
        nextBillingDate: s.next_billing_date as string,
        category: s.category as string,
        isWaste: (s.is_waste as number) === 1,
        iconBg: s.icon_bg as string,
      })),
      alerts: alerts.map(al => ({
        id: al.id as string,
        userId: al.user_id as string,
        type: al.type as 'danger' | 'success' | 'warning' | 'info',
        icon: al.icon as string,
        title: al.title as string,
        description: al.description as string,
        timeAgo: al.time_ago as string,
        isRead: (al.is_read as number) === 1,
        actionLabel: al.action_label as string | undefined,
        actionRoute: al.action_route as string | undefined,
        amountCents: al.amount_cents as number | undefined,
      })),
      cashflow: cashflow.map(c => ({
        id: c.id as string,
        userId: c.user_id as string,
        month: c.month as number,
        year: c.year as number,
        monthLabel: c.month_label as string,
        incomeCents: c.income_cents as number,
        spendCents: c.spend_cents as number,
        netCents: (c.income_cents as number) - (c.spend_cents as number),
      })),
      trip: tripRow ? {
        id: tripRow.id as string,
        userId: tripRow.user_id as string,
        name: tripRow.name as string,
        destination: tripRow.destination as string,
        startDate: tripRow.start_date as string,
        endDate: tripRow.end_date as string,
        nights: tripRow.nights as number,
        travelers: tripRow.travelers as number,
        budgetCents: tripRow.budget_cents as number,
        spentCents: tripRow.spent_cents as number,
        isOnTrack: (tripRow.is_on_track as number) === 1,
        detectedFromEmail: (tripRow.detected_from_email as number) === 1,
        categories: JSON.parse((tripRow.categories_json as string) ?? '[]'),
        itinerary: JSON.parse((tripRow.itinerary_json as string) ?? '[]'),
      } : null,
      projection: summary.projection ?? { thirtyDay: 0, sixtyDay: 0, ninetyDay: 0 },
      netWorthCents: summary.netWorthCents ?? 0,
      safeToSpendCents: summary.safeToSpendCents ?? 0,
      monthlyIncomeCents: summary.monthlyIncomeCents ?? 0,
      monthlySpendCents: summary.monthlySpendCents ?? 0,
      subscriptionsTotalMonthlyCents: summary.subscriptionsTotalMonthlyCents ?? 0,
      subscriptionsWastedMonthlyCents: summary.subscriptionsWastedMonthlyCents ?? 0,
      sparklineData: summary.sparklineData ?? [],
    };
  }

  async markAlertAsRead(alertId: string): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');
    await this.db.runAsync(`UPDATE alerts SET is_read = 1 WHERE id = ?`, [alertId]);
  }

  async closeDatabase(): Promise<void> {
    if (this.db) {
      await this.db.closeAsync();
    }
  }
}

export const database = new LocalDatabase();
