import * as SQLite from 'expo-sqlite';
import { UserFinancialProfile } from './schema';

export class LocalDatabase {
  private db: SQLite.SQLiteDatabase | null = null;

  async initialize(): Promise<void> {
    this.db = await SQLite.openDatabaseAsync('finflow.db');
  }

  async seedUser(profile: UserFinancialProfile): Promise<void> {
    // TODO: Implement database seeding
  }

  async getUserFinancialData(userId: string): Promise<UserFinancialProfile | null> {
    // TODO: Implement data retrieval
    return null;
  }

  async markAlertAsRead(alertId: string): Promise<void> {
    // TODO: Implement alert update
  }

  async closeDatabase(): Promise<void> {
    if (this.db) {
      await this.db.closeAsync();
    }
  }
}

export const database = new LocalDatabase();
