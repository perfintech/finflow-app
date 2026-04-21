import MOCK_DATA_SETS from '@database/mockData';
import type { UserFinancialProfile } from '@database/schema';

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function selectMockDataset(email: string): UserFinancialProfile {
  const normalized = normalizeEmail(email);
  const firstChar = normalized.charAt(0);
  const index = /[a-z]/.test(firstChar) ? firstChar.charCodeAt(0) - 97 : 0;
  const profile = MOCK_DATA_SETS[index] ?? MOCK_DATA_SETS[0];
  return JSON.parse(JSON.stringify(profile)) as UserFinancialProfile;
}
