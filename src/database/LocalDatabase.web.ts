import type { UserFinancialProfile } from './schema';

class LocalDatabaseWeb {
  async initialize(): Promise<void> {}
  async seedUser(_profile: UserFinancialProfile): Promise<void> {}
  async getUserFinancialData(_userId: string): Promise<UserFinancialProfile | null> { return null; }
  async markAlertAsRead(_alertId: string): Promise<void> {}
  async closeDatabase(): Promise<void> {}
}

export const database = new LocalDatabaseWeb();
