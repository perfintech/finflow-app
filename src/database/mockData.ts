// FinFlow — 26 Mock User Financial Profiles (A–Z)
// Selected by: email.trim().toLowerCase()[0] → charCode - 97 → index 0..25

import { UserFinancialProfile } from './schema';

const today = new Date();
const fmt = (d: Date) => d.toISOString().split('T')[0];
const addDays = (d: Date, n: number) => new Date(d.getTime() + n * 86400000);
const subDays = (d: Date, n: number) => addDays(d, -n);

// ─── HELPER BUILDERS ──────────────────────────────────────────────────────────

function buildCashflow(userId: string, baseIncome: number, baseSpend: number) {
  const months = ['May','Jun','Jul','Aug','Sep','Oct'];
  return months.map((m, i) => ({
    id: `cf_${userId}_${i}`,
    userId,
    month: i + 5,
    year: 2026,
    monthLabel: m,
    incomeCents: Math.round((baseIncome + (Math.random() - 0.5) * baseIncome * 0.1) * 100),
    spendCents:  Math.round((baseSpend  + (Math.random() - 0.5) * baseSpend  * 0.15) * 100),
    netCents: 0,
  })).map(r => ({ ...r, netCents: r.incomeCents - r.spendCents }));
}

// ═══════════════════════════════════════════════════════════════════════════════
// A — Alice Adams  |  Senior Engineer · Aggressive Saver · Premium
// ═══════════════════════════════════════════════════════════════════════════════
const A: UserFinancialProfile = {
  user: { id:'u_a', name:'Alice Adams', email:'alice@example.com', avatarInitials:'AA',
    planTier:'premium', bankName:'Chase Bank', bankColor:'#003087',
    onboardedAt: fmt(subDays(today,90)), greeting:'Alice' },
  accounts: [
    { id:'a_a1', userId:'u_a', name:'Chase Checking', type:'checking', institution:'Chase',
      balanceCents:620000, color:'#00f5b0', logoAbbrev:'CHASE', updatedAt: fmt(today) },
    { id:'a_a2', userId:'u_a', name:'Marcus HYSA', type:'savings', institution:'Marcus',
      balanceCents:4500000, interestRate:5.1, color:'#5b8dff', logoAbbrev:'MARC', updatedAt: fmt(today) },
    { id:'a_a3', userId:'u_a', name:'Chase Sapphire', type:'credit', institution:'Chase',
      balanceCents:-185000, dueDate: fmt(addDays(today,12)), color:'#ffb347', logoAbbrev:'CSR', updatedAt: fmt(today) },
    { id:'a_a4', userId:'u_a', name:'Fidelity 401(k)', type:'investment', institution:'Fidelity',
      balanceCents:19800000, interestRate:8.2, color:'#a78bfa', logoAbbrev:'FIDL', updatedAt: fmt(today) },
  ],
  transactions: [
    { id:'t_a1', accountId:'a_a1', userId:'u_a', merchant:'Whole Foods', merchantIcon:'🛒', amountCents:18700, isDebit:true, category:'Food', date: fmt(subDays(today,1)), isSubscription:false },
    { id:'t_a2', accountId:'a_a1', userId:'u_a', merchant:'Acme Corp Payroll', merchantIcon:'💵', amountCents:980000, isDebit:false, category:'Income', date: fmt(subDays(today,2)), isSubscription:false },
    { id:'t_a3', accountId:'a_a1', userId:'u_a', merchant:'Apple Music', merchantIcon:'🎵', amountCents:1099, isDebit:true, category:'Entertainment', date: fmt(subDays(today,3)), isSubscription:true },
    { id:'t_a4', accountId:'a_a3', userId:'u_a', merchant:'Delta Airlines', merchantIcon:'✈️', amountCents:52400, isDebit:true, category:'Travel', date: fmt(subDays(today,5)), isSubscription:false },
    { id:'t_a5', accountId:'a_a1', userId:'u_a', merchant:'Trader Joe\'s', merchantIcon:'🛒', amountCents:9200, isDebit:true, category:'Food', date: fmt(subDays(today,7)), isSubscription:false },
    { id:'t_a6', accountId:'a_a3', userId:'u_a', merchant:'Netflix', merchantIcon:'📺', amountCents:1799, isDebit:true, category:'Entertainment', date: fmt(subDays(today,8)), isSubscription:true },
    { id:'t_a7', accountId:'a_a1', userId:'u_a', merchant:'Rent - Landlord', merchantIcon:'🏠', amountCents:320000, isDebit:true, category:'Rent', date: fmt(subDays(today,10)), isSubscription:false },
    { id:'t_a8', accountId:'a_a3', userId:'u_a', merchant:'Peloton', merchantIcon:'🚴', amountCents:4400, isDebit:true, category:'Health', date: fmt(subDays(today,12)), isSubscription:true },
    { id:'t_a9', accountId:'a_a1', userId:'u_a', merchant:'Uber Eats', merchantIcon:'🍔', amountCents:6200, isDebit:true, category:'Food', date: fmt(subDays(today,14)), isSubscription:false },
    { id:'t_a10', accountId:'a_a1', userId:'u_a', merchant:'Target', merchantIcon:'🎯', amountCents:14300, isDebit:true, category:'Shopping', date: fmt(subDays(today,16)), isSubscription:false },
  ],
  bills: [
    { id:'b_a1', userId:'u_a', name:'Rent', icon:'🏠', amountCents:320000, dueDate: fmt(addDays(today,18)), source:'manual', status:'upcoming', accountId:'a_a1', color:'#ffb347' },
    { id:'b_a2', userId:'u_a', name:'PG&E', icon:'⚡', amountCents:12400, dueDate: fmt(addDays(today,4)), source:'email', status:'due_soon', accountId:'a_a1', color:'#5b8dff' },
    { id:'b_a3', userId:'u_a', name:'Comcast', icon:'📡', amountCents:8900, dueDate: fmt(addDays(today,9)), source:'email', status:'upcoming', accountId:'a_a1', color:'#ff5252' },
  ],
  subscriptions: [
    { id:'s_a1', userId:'u_a', name:'Netflix', icon:'📺', amountCents:1799, billingCycle:'monthly', lastUsedDaysAgo:47, nextBillingDate: fmt(addDays(today,8)), category:'Entertainment', isWaste:true, iconBg:'rgba(229,9,20,0.12)' },
    { id:'s_a2', userId:'u_a', name:'Peloton', icon:'🚴', amountCents:4400, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,12)), category:'Health', isWaste:false, iconBg:'rgba(255,100,50,0.12)' },
    { id:'s_a3', userId:'u_a', name:'Apple Music', icon:'🎵', amountCents:1099, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,3)), category:'Entertainment', isWaste:false, iconBg:'rgba(255,45,85,0.12)' },
    { id:'s_a4', userId:'u_a', name:'NYT Digital', icon:'📰', amountCents:1700, billingCycle:'monthly', lastUsedDaysAgo:32, nextBillingDate: fmt(addDays(today,15)), category:'News', isWaste:true, iconBg:'rgba(255,255,255,0.08)' },
    { id:'s_a5', userId:'u_a', name:'iCloud 2TB', icon:'☁️', amountCents:999, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,22)), category:'Storage', isWaste:false, iconBg:'rgba(91,141,255,0.12)' },
  ],
  alerts: [
    { id:'al_a1', userId:'u_a', type:'danger', icon:'📋', title:'PG&E due in 4 days', description:'PG&E $124.00 due soon. Pay from Chase Checking (bal: $6,200)?', timeAgo:'10 min ago', isRead:false, actionLabel:'Pay Now →', actionRoute:'/bills', amountCents:12400 },
    { id:'al_a2', userId:'u_a', type:'success', icon:'💵', title:'Payroll received', description:'$9,800 from Acme Corp. Safe to Spend now $3,840', timeAgo:'2 days ago', isRead:false, amountCents:980000 },
    { id:'al_a3', userId:'u_a', type:'info', icon:'💎', title:'Savings opportunity', description:'$1,200 above your buffer sitting idle. Move to Marcus HYSA (5.1%)?', timeAgo:'3 days ago', isRead:true, actionLabel:'Move $1,200 →', amountCents:120000 },
    { id:'al_a4', userId:'u_a', type:'warning', icon:'📺', title:'Netflix unused 47 days', description:'You\'re paying $17.99/mo but haven\'t streamed in 47 days.', timeAgo:'Yesterday', isRead:false, actionLabel:'Cancel →', amountCents:1799 },
  ],
  cashflow: buildCashflow('u_a', 9800, 5900),
  projection: { thirtyDay: 3900, sixtyDay: 7200, ninetyDay: 10800 },
  trip: null,
  netWorthCents: 28540000,
  safeToSpendCents: 384000,
  monthlyIncomeCents: 980000,
  monthlySpendCents: 590000,
  subscriptionsTotalMonthlyCents: 9997,
  subscriptionsWastedMonthlyCents: 3499,
  sparklineData: [0.6, 0.65, 0.68, 0.71, 0.76, 0.82],
};

// ═══════════════════════════════════════════════════════════════════════════════
// B — Bob Baker  |  Recent Grad · Building Credit · Free
// ═══════════════════════════════════════════════════════════════════════════════
const B: UserFinancialProfile = {
  user: { id:'u_b', name:'Bob Baker', email:'bob@example.com', avatarInitials:'BB',
    planTier:'free', bankName:'Bank of America', bankColor:'#c0392b',
    onboardedAt: fmt(subDays(today,14)), greeting:'Bob' },
  accounts: [
    { id:'a_b1', userId:'u_b', name:'BoA Checking', type:'checking', institution:'Bank of America',
      balanceCents:94000, color:'#00f5b0', logoAbbrev:'BOFA', updatedAt: fmt(today) },
    { id:'a_b2', userId:'u_b', name:'BoA Savings', type:'savings', institution:'Bank of America',
      balanceCents:186000, color:'#5b8dff', logoAbbrev:'BOFA', updatedAt: fmt(today) },
    { id:'a_b3', userId:'u_b', name:'Discover It', type:'credit', institution:'Discover',
      balanceCents:-43200, dueDate: fmt(addDays(today,6)), color:'#ffb347', logoAbbrev:'DISC', updatedAt: fmt(today) },
  ],
  transactions: [
    { id:'t_b1', accountId:'a_b1', userId:'u_b', merchant:'Starbucks', merchantIcon:'☕', amountCents:680, isDebit:true, category:'Food', date: fmt(subDays(today,1)), isSubscription:false },
    { id:'t_b2', accountId:'a_b1', userId:'u_b', merchant:'TechStartup Payroll', merchantIcon:'💵', amountCents:420000, isDebit:false, category:'Income', date: fmt(subDays(today,3)), isSubscription:false },
    { id:'t_b3', accountId:'a_b3', userId:'u_b', merchant:'Spotify', merchantIcon:'🎵', amountCents:1099, isDebit:true, category:'Entertainment', date: fmt(subDays(today,4)), isSubscription:true },
    { id:'t_b4', accountId:'a_b3', userId:'u_b', merchant:'Amazon', merchantIcon:'📦', amountCents:4299, isDebit:true, category:'Shopping', date: fmt(subDays(today,6)), isSubscription:false },
    { id:'t_b5', accountId:'a_b1', userId:'u_b', merchant:'Subway', merchantIcon:'🥪', amountCents:1150, isDebit:true, category:'Food', date: fmt(subDays(today,8)), isSubscription:false },
    { id:'t_b6', accountId:'a_b1', userId:'u_b', merchant:'Rent Payment', merchantIcon:'🏠', amountCents:145000, isDebit:true, category:'Rent', date: fmt(subDays(today,10)), isSubscription:false },
    { id:'t_b7', accountId:'a_b3', userId:'u_b', merchant:'Hulu', merchantIcon:'📺', amountCents:799, isDebit:true, category:'Entertainment', date: fmt(subDays(today,11)), isSubscription:true },
    { id:'t_b8', accountId:'a_b1', userId:'u_b', merchant:'CVS Pharmacy', merchantIcon:'💊', amountCents:2340, isDebit:true, category:'Health', date: fmt(subDays(today,15)), isSubscription:false },
  ],
  bills: [
    { id:'b_b1', userId:'u_b', name:'Rent', icon:'🏠', amountCents:145000, dueDate: fmt(addDays(today,20)), source:'manual', status:'upcoming', accountId:'a_b1', color:'#ffb347' },
    { id:'b_b2', userId:'u_b', name:'Discover Card', icon:'💳', amountCents:43200, dueDate: fmt(addDays(today,6)), source:'email', status:'due_soon', accountId:'a_b1', color:'#ff5252' },
    { id:'b_b3', userId:'u_b', name:'Electric Bill', icon:'⚡', amountCents:7200, dueDate: fmt(addDays(today,11)), source:'email', status:'upcoming', accountId:'a_b1', color:'#5b8dff' },
  ],
  subscriptions: [
    { id:'s_b1', userId:'u_b', name:'Spotify', icon:'🎵', amountCents:1099, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,4)), category:'Entertainment', isWaste:false, iconBg:'rgba(30,215,96,0.1)' },
    { id:'s_b2', userId:'u_b', name:'Hulu', icon:'📺', amountCents:799, billingCycle:'monthly', lastUsedDaysAgo:3, nextBillingDate: fmt(addDays(today,11)), category:'Entertainment', isWaste:false, iconBg:'rgba(28,231,131,0.1)' },
    { id:'s_b3', userId:'u_b', name:'Xbox Game Pass', icon:'🎮', amountCents:1499, billingCycle:'monthly', lastUsedDaysAgo:28, nextBillingDate: fmt(addDays(today,7)), category:'Gaming', isWaste:true, iconBg:'rgba(0,120,212,0.12)' },
    { id:'s_b4', userId:'u_b', name:'Amazon Prime', icon:'📦', amountCents:1499, billingCycle:'monthly', lastUsedDaysAgo:2, nextBillingDate: fmt(addDays(today,16)), category:'Shopping', isWaste:false, iconBg:'rgba(255,153,0,0.10)' },
  ],
  alerts: [
    { id:'al_b1', userId:'u_b', type:'danger', icon:'💳', title:'Discover Card due in 6 days', description:'$432.00 minimum due. Paying full balance saves $67 in interest.', timeAgo:'1 hour ago', isRead:false, actionLabel:'Pay Now →', amountCents:43200 },
    { id:'al_b2', userId:'u_b', type:'warning', icon:'⚠️', title:'Low balance warning', description:'Chase Checking at $940. Below your $1,000 safety buffer.', timeAgo:'Today', isRead:false, amountCents:94000 },
    { id:'al_b3', userId:'u_b', type:'info', icon:'🎮', title:'Xbox Game Pass unused', description:'28 days without gaming. $14.99/mo going to waste.', timeAgo:'Yesterday', isRead:true, actionLabel:'Cancel →', amountCents:1499 },
  ],
  cashflow: buildCashflow('u_b', 4200, 3600),
  projection: { thirtyDay: 600, sixtyDay: 1100, ninetyDay: 1700 },
  trip: null,
  netWorthCents: 1280000,
  safeToSpendCents: 52000,
  monthlyIncomeCents: 420000,
  monthlySpendCents: 360000,
  subscriptionsTotalMonthlyCents: 4896,
  subscriptionsWastedMonthlyCents: 1499,
  sparklineData: [0.3, 0.35, 0.38, 0.36, 0.42, 0.45],
};

// ═══════════════════════════════════════════════════════════════════════════════
// C — Carol Chen  |  Small Business Owner · Premium
// ═══════════════════════════════════════════════════════════════════════════════
const C: UserFinancialProfile = {
  user: { id:'u_c', name:'Carol Chen', email:'carol@example.com', avatarInitials:'CC',
    planTier:'premium', bankName:'Wells Fargo', bankColor:'#c0392b',
    onboardedAt: fmt(subDays(today,60)), greeting:'Carol' },
  accounts: [
    { id:'a_c1', userId:'u_c', name:'WF Business Checking', type:'checking', institution:'Wells Fargo',
      balanceCents:1840000, color:'#00f5b0', logoAbbrev:'WF', updatedAt: fmt(today) },
    { id:'a_c2', userId:'u_c', name:'WF Personal Checking', type:'checking', institution:'Wells Fargo',
      balanceCents:420000, color:'#5b8dff', logoAbbrev:'WF', updatedAt: fmt(today) },
    { id:'a_c3', userId:'u_c', name:'Ally HYSA', type:'savings', institution:'Ally',
      balanceCents:1200000, interestRate:4.9, color:'#a78bfa', logoAbbrev:'ALLY', updatedAt: fmt(today) },
    { id:'a_c4', userId:'u_c', name:'Chase Ink Business', type:'credit', institution:'Chase',
      balanceCents:-380000, dueDate: fmt(addDays(today,8)), color:'#ffb347', logoAbbrev:'CINK', updatedAt: fmt(today) },
    { id:'a_c5', userId:'u_c', name:'SEP-IRA', type:'investment', institution:'Schwab',
      balanceCents:11760000, interestRate:9.1, color:'#ffd166', logoAbbrev:'SCHW', updatedAt: fmt(today) },
  ],
  transactions: [
    { id:'t_c1', accountId:'a_c1', userId:'u_c', merchant:'Office Depot', merchantIcon:'🖨️', amountCents:23400, isDebit:true, category:'Business', date: fmt(subDays(today,1)), isSubscription:false },
    { id:'t_c2', accountId:'a_c1', userId:'u_c', merchant:'Client Payment - Acme', merchantIcon:'💵', amountCents:850000, isDebit:false, category:'Income', date: fmt(subDays(today,2)), isSubscription:false },
    { id:'t_c3', accountId:'a_c4', userId:'u_c', merchant:'AWS', merchantIcon:'☁️', amountCents:28900, isDebit:true, category:'Business', date: fmt(subDays(today,4)), isSubscription:true },
    { id:'t_c4', accountId:'a_c2', userId:'u_c', merchant:'Whole Foods', merchantIcon:'🛒', amountCents:16700, isDebit:true, category:'Food', date: fmt(subDays(today,5)), isSubscription:false },
    { id:'t_c5', accountId:'a_c1', userId:'u_c', merchant:'Contractor Payment', merchantIcon:'🔨', amountCents:320000, isDebit:true, category:'Business', date: fmt(subDays(today,7)), isSubscription:false },
    { id:'t_c6', accountId:'a_c2', userId:'u_c', merchant:'Rent', merchantIcon:'🏠', amountCents:280000, isDebit:true, category:'Rent', date: fmt(subDays(today,9)), isSubscription:false },
    { id:'t_c7', accountId:'a_c4', userId:'u_c', merchant:'Slack', merchantIcon:'💬', amountCents:8750, isDebit:true, category:'Business', date: fmt(subDays(today,12)), isSubscription:true },
    { id:'t_c8', accountId:'a_c1', userId:'u_c', merchant:'Client Payment - XYZ', merchantIcon:'💵', amountCents:600000, isDebit:false, category:'Income', date: fmt(subDays(today,15)), isSubscription:false },
  ],
  bills: [
    { id:'b_c1', userId:'u_c', name:'Chase Ink', icon:'💳', amountCents:380000, dueDate: fmt(addDays(today,8)), source:'email', status:'upcoming', accountId:'a_c1', color:'#ff5252' },
    { id:'b_c2', userId:'u_c', name:'AWS Cloud', icon:'☁️', amountCents:28900, dueDate: fmt(addDays(today,3)), source:'email', status:'due_soon', accountId:'a_c1', color:'#5b8dff' },
    { id:'b_c3', userId:'u_c', name:'Office Rent', icon:'🏢', amountCents:480000, dueDate: fmt(addDays(today,22)), source:'manual', status:'upcoming', accountId:'a_c1', color:'#ffb347' },
  ],
  subscriptions: [
    { id:'s_c1', userId:'u_c', name:'AWS', icon:'☁️', amountCents:28900, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,3)), category:'Business', isWaste:false, iconBg:'rgba(255,153,0,0.12)' },
    { id:'s_c2', userId:'u_c', name:'Slack', icon:'💬', amountCents:8750, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,12)), category:'Business', isWaste:false, iconBg:'rgba(91,141,255,0.12)' },
    { id:'s_c3', userId:'u_c', name:'Adobe Creative', icon:'🎨', amountCents:5499, billingCycle:'monthly', lastUsedDaysAgo:1, nextBillingDate: fmt(addDays(today,18)), category:'Business', isWaste:false, iconBg:'rgba(255,0,0,0.10)' },
    { id:'s_c4', userId:'u_c', name:'Notion Teams', icon:'📓', amountCents:3200, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,25)), category:'Business', isWaste:false, iconBg:'rgba(255,255,255,0.08)' },
    { id:'s_c5', userId:'u_c', name:'Gym - Equinox', icon:'💪', amountCents:18500, billingCycle:'monthly', lastUsedDaysAgo:45, nextBillingDate: fmt(addDays(today,6)), category:'Health', isWaste:true, iconBg:'rgba(0,100,255,0.10)' },
  ],
  alerts: [
    { id:'al_c1', userId:'u_c', type:'success', icon:'💵', title:'Client payment received', description:'$8,500 from Acme Corp. Business Checking balance now $18,400.', timeAgo:'2 days ago', isRead:false, amountCents:850000 },
    { id:'al_c2', userId:'u_c', type:'danger', icon:'💳', title:'Chase Ink due in 8 days', description:'$3,800 balance due. Pay before Oct 28 to avoid interest.', timeAgo:'Today', isRead:false, actionLabel:'Pay Now →', amountCents:380000 },
    { id:'al_c3', userId:'u_c', type:'warning', icon:'💪', title:'Equinox unused 45 days', description:'$185/mo with no visits. Cancel to save $2,220/yr.', timeAgo:'3 days ago', isRead:true, actionLabel:'Cancel →', amountCents:18500 },
  ],
  cashflow: buildCashflow('u_c', 14500, 9200),
  projection: { thirtyDay: 5300, sixtyDay: 10200, ninetyDay: 15400 },
  trip: {
    id:'trip_c1', userId:'u_c', name:'SF Tech Conference', destination:'NYC → San Francisco',
    startDate: fmt(addDays(today,6)), endDate: fmt(addDays(today,10)), nights:4, travelers:1,
    budgetCents:350000, spentCents:124000, isOnTrack:true, detectedFromEmail:true,
    categories: [
      { icon:'✈️', label:'FLIGHTS', spentCents:62000, budgetCents:80000, fillColor:'#5b8dff' },
      { icon:'🏨', label:'HOTEL', spentCents:42000, budgetCents:120000, fillColor:'#a78bfa' },
      { icon:'🍽️', label:'MEALS', spentCents:20000, budgetCents:80000, fillColor:'#ffb347' },
      { icon:'🚗', label:'TRANSPORT', spentCents:0, budgetCents:70000, fillColor:'#00f5b0' },
    ],
    itinerary: [
      { date: fmt(addDays(today,6)), event:'Depart JFK → SFO', icon:'✈️', amountCents:62000, isCovered:true },
      { date: fmt(addDays(today,6)), event:'Hotel Marriott check-in', icon:'🏨', amountCents:42000, isCovered:true },
      { date: fmt(addDays(today,10)), event:'Return SFO → JFK', icon:'✈️', amountCents:0, isCovered:true },
    ],
  },
  netWorthCents: 19820000,
  safeToSpendCents: 820000,
  monthlyIncomeCents: 1450000,
  monthlySpendCents: 920000,
  subscriptionsTotalMonthlyCents: 64849,
  subscriptionsWastedMonthlyCents: 18500,
  sparklineData: [0.55, 0.62, 0.68, 0.72, 0.78, 0.85],
};

// ═══════════════════════════════════════════════════════════════════════════════
// D — David Diaz  |  Young Family · Mortgage · Premium
// ═══════════════════════════════════════════════════════════════════════════════
const D: UserFinancialProfile = {
  user: { id:'u_d', name:'David Diaz', email:'david@example.com', avatarInitials:'DD',
    planTier:'premium', bankName:'TD Bank', bankColor:'#1a9c3e',
    onboardedAt: fmt(subDays(today,45)), greeting:'David' },
  accounts: [
    { id:'a_d1', userId:'u_d', name:'TD Checking', type:'checking', institution:'TD Bank',
      balanceCents:380000, color:'#00f5b0', logoAbbrev:'TD', updatedAt: fmt(today) },
    { id:'a_d2', userId:'u_d', name:'TD Savings', type:'savings', institution:'TD Bank',
      balanceCents:1240000, color:'#5b8dff', logoAbbrev:'TD', updatedAt: fmt(today) },
    { id:'a_d3', userId:'u_d', name:'Capital One Venture', type:'credit', institution:'Capital One',
      balanceCents:-124000, dueDate: fmt(addDays(today,14)), color:'#ffb347', logoAbbrev:'CAP1', updatedAt: fmt(today) },
    { id:'a_d4', userId:'u_d', name:'Vanguard 401(k)', type:'investment', institution:'Vanguard',
      balanceCents:8740000, interestRate:7.8, color:'#a78bfa', logoAbbrev:'VANG', updatedAt: fmt(today) },
  ],
  transactions: [
    { id:'t_d1', accountId:'a_d1', userId:'u_d', merchant:'Target Kids', merchantIcon:'🧒', amountCents:8700, isDebit:true, category:'Shopping', date: fmt(subDays(today,2)), isSubscription:false },
    { id:'t_d2', accountId:'a_d1', userId:'u_d', merchant:'Corp Payroll', merchantIcon:'💵', amountCents:720000, isDebit:false, category:'Income', date: fmt(subDays(today,4)), isSubscription:false },
    { id:'t_d3', accountId:'a_d1', userId:'u_d', merchant:'Mortgage Payment', merchantIcon:'🏠', amountCents:240000, isDebit:true, category:'Rent', date: fmt(subDays(today,5)), isSubscription:false },
    { id:'t_d4', accountId:'a_d3', userId:'u_d', merchant:'Disney+', merchantIcon:'🎬', amountCents:1399, isDebit:true, category:'Entertainment', date: fmt(subDays(today,7)), isSubscription:true },
    { id:'t_d5', accountId:'a_d1', userId:'u_d', merchant:'Costco', merchantIcon:'🛒', amountCents:28600, isDebit:true, category:'Food', date: fmt(subDays(today,9)), isSubscription:false },
    { id:'t_d6', accountId:'a_d3', userId:'u_d', merchant:'Spotify Family', merchantIcon:'🎵', amountCents:1699, isDebit:true, category:'Entertainment', date: fmt(subDays(today,11)), isSubscription:true },
    { id:'t_d7', accountId:'a_d1', userId:'u_d', merchant:'Soccer Practice', merchantIcon:'⚽', amountCents:15000, isDebit:true, category:'Health', date: fmt(subDays(today,13)), isSubscription:false },
  ],
  bills: [
    { id:'b_d1', userId:'u_d', name:'Mortgage', icon:'🏠', amountCents:240000, dueDate: fmt(addDays(today,22)), source:'manual', status:'upcoming', accountId:'a_d1', color:'#ffb347' },
    { id:'b_d2', userId:'u_d', name:'Electric', icon:'⚡', amountCents:18600, dueDate: fmt(addDays(today,5)), source:'email', status:'due_soon', accountId:'a_d1', color:'#5b8dff' },
    { id:'b_d3', userId:'u_d', name:'Internet', icon:'📡', amountCents:7900, dueDate: fmt(addDays(today,12)), source:'email', status:'upcoming', accountId:'a_d1', color:'#a78bfa' },
  ],
  subscriptions: [
    { id:'s_d1', userId:'u_d', name:'Disney+', icon:'🎬', amountCents:1399, billingCycle:'monthly', lastUsedDaysAgo:1, nextBillingDate: fmt(addDays(today,7)), category:'Entertainment', isWaste:false, iconBg:'rgba(11,60,197,0.12)' },
    { id:'s_d2', userId:'u_d', name:'Spotify Family', icon:'🎵', amountCents:1699, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,11)), category:'Entertainment', isWaste:false, iconBg:'rgba(30,215,96,0.10)' },
    { id:'s_d3', userId:'u_d', name:'Amazon Prime', icon:'📦', amountCents:1499, billingCycle:'monthly', lastUsedDaysAgo:3, nextBillingDate: fmt(addDays(today,18)), category:'Shopping', isWaste:false, iconBg:'rgba(255,153,0,0.10)' },
    { id:'s_d4', userId:'u_d', name:'Apple TV+', icon:'🍎', amountCents:999, billingCycle:'monthly', lastUsedDaysAgo:55, nextBillingDate: fmt(addDays(today,9)), category:'Entertainment', isWaste:true, iconBg:'rgba(255,255,255,0.08)' },
    { id:'s_d5', userId:'u_d', name:'Life Insurance', icon:'🛡️', amountCents:8900, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,25)), category:'Insurance', isWaste:false, iconBg:'rgba(0,245,176,0.08)' },
  ],
  alerts: [
    { id:'al_d1', userId:'u_d', type:'danger', icon:'⚡', title:'Electric bill due in 5 days', description:'$186.00 due soon. Pay from TD Checking?', timeAgo:'3 hours ago', isRead:false, actionLabel:'Pay Now →', amountCents:18600 },
    { id:'al_d2', userId:'u_d', type:'success', icon:'💵', title:'Payroll received', description:'$7,200 deposited. All bills covered through month-end.', timeAgo:'4 days ago', isRead:true, amountCents:720000 },
    { id:'al_d3', userId:'u_d', type:'warning', icon:'🍎', title:'Apple TV+ unused 55 days', description:'$9.99/mo, last watched 55 days ago. Cancel to save $120/yr.', timeAgo:'2 days ago', isRead:false, actionLabel:'Cancel →', amountCents:999 },
  ],
  cashflow: buildCashflow('u_d', 7200, 5400),
  projection: { thirtyDay: 1800, sixtyDay: 3400, ninetyDay: 5200 },
  trip: null,
  netWorthCents: 15630000,
  safeToSpendCents: 184000,
  monthlyIncomeCents: 720000,
  monthlySpendCents: 540000,
  subscriptionsTotalMonthlyCents: 14496,
  subscriptionsWastedMonthlyCents: 999,
  sparklineData: [0.42, 0.47, 0.51, 0.54, 0.58, 0.62],
};

// ═══════════════════════════════════════════════════════════════════════════════
// E — Emma Evans  |  Freelance Designer · Free
// ═══════════════════════════════════════════════════════════════════════════════
const E: UserFinancialProfile = {
  user: { id:'u_e', name:'Emma Evans', email:'emma@example.com', avatarInitials:'EE',
    planTier:'free', bankName:'Chime', bankColor:'#00d4a1',
    onboardedAt: fmt(subDays(today,21)), greeting:'Emma' },
  accounts: [
    { id:'a_e1', userId:'u_e', name:'Chime Spending', type:'checking', institution:'Chime',
      balanceCents:214000, color:'#00f5b0', logoAbbrev:'CHIM', updatedAt: fmt(today) },
    { id:'a_e2', userId:'u_e', name:'Chime Savings', type:'savings', institution:'Chime',
      balanceCents:820000, color:'#5b8dff', logoAbbrev:'CHIM', updatedAt: fmt(today) },
    { id:'a_e3', userId:'u_e', name:'Amex Blue Cash', type:'credit', institution:'Amex',
      balanceCents:-67000, dueDate: fmt(addDays(today,9)), color:'#ffb347', logoAbbrev:'AMEX', updatedAt: fmt(today) },
  ],
  transactions: [
    { id:'t_e1', accountId:'a_e1', userId:'u_e', merchant:'Figma', merchantIcon:'🎨', amountCents:1500, isDebit:true, category:'Business', date: fmt(subDays(today,2)), isSubscription:true },
    { id:'t_e2', accountId:'a_e1', userId:'u_e', merchant:'Client - Brand Co', merchantIcon:'💵', amountCents:480000, isDebit:false, category:'Income', date: fmt(subDays(today,4)), isSubscription:false },
    { id:'t_e3', accountId:'a_e3', userId:'u_e', merchant:'Adobe XD', merchantIcon:'🎨', amountCents:5499, isDebit:true, category:'Business', date: fmt(subDays(today,6)), isSubscription:true },
    { id:'t_e4', accountId:'a_e1', userId:'u_e', merchant:'Blue Bottle Coffee', merchantIcon:'☕', amountCents:620, isDebit:true, category:'Food', date: fmt(subDays(today,7)), isSubscription:false },
    { id:'t_e5', accountId:'a_e1', userId:'u_e', merchant:'Rent', merchantIcon:'🏠', amountCents:178000, isDebit:true, category:'Rent', date: fmt(subDays(today,9)), isSubscription:false },
    { id:'t_e6', accountId:'a_e1', userId:'u_e', merchant:'Client - Studio X', merchantIcon:'💵', amountCents:300000, isDebit:false, category:'Income', date: fmt(subDays(today,12)), isSubscription:false },
  ],
  bills: [
    { id:'b_e1', userId:'u_e', name:'Rent', icon:'🏠', amountCents:178000, dueDate: fmt(addDays(today,19)), source:'manual', status:'upcoming', accountId:'a_e1', color:'#ffb347' },
    { id:'b_e2', userId:'u_e', name:'Amex Card', icon:'💳', amountCents:67000, dueDate: fmt(addDays(today,9)), source:'email', status:'due_soon', accountId:'a_e1', color:'#ff5252' },
  ],
  subscriptions: [
    { id:'s_e1', userId:'u_e', name:'Adobe Creative', icon:'🎨', amountCents:5499, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,6)), category:'Business', isWaste:false, iconBg:'rgba(255,0,0,0.10)' },
    { id:'s_e2', userId:'u_e', name:'Figma', icon:'✏️', amountCents:1500, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,2)), category:'Business', isWaste:false, iconBg:'rgba(162,89,255,0.12)' },
    { id:'s_e3', userId:'u_e', name:'Netflix', icon:'📺', amountCents:1799, billingCycle:'monthly', lastUsedDaysAgo:38, nextBillingDate: fmt(addDays(today,14)), category:'Entertainment', isWaste:true, iconBg:'rgba(229,9,20,0.12)' },
    { id:'s_e4', userId:'u_e', name:'Notion', icon:'📓', amountCents:1600, billingCycle:'monthly', lastUsedDaysAgo:1, nextBillingDate: fmt(addDays(today,20)), category:'Business', isWaste:false, iconBg:'rgba(255,255,255,0.08)' },
  ],
  alerts: [
    { id:'al_e1', userId:'u_e', type:'danger', icon:'💳', title:'Amex due in 9 days', description:'$670 balance due. Pay in full to avoid 24% APR.', timeAgo:'Today', isRead:false, actionLabel:'Pay Now →', amountCents:67000 },
    { id:'al_e2', userId:'u_e', type:'success', icon:'💵', title:'Client payment landed', description:'$4,800 from Brand Co. Safe to Spend updated.', timeAgo:'4 days ago', isRead:true, amountCents:480000 },
    { id:'al_e3', userId:'u_e', type:'warning', icon:'📺', title:'Netflix unused 38 days', description:'Cancel to save $215/yr. You have Hulu anyway.', timeAgo:'2 days ago', isRead:false, actionLabel:'Cancel →', amountCents:1799 },
  ],
  cashflow: buildCashflow('u_e', 5200, 3800),
  projection: { thirtyDay: 1400, sixtyDay: 2700, ninetyDay: 4100 },
  trip: null,
  netWorthCents: 3470000,
  safeToSpendCents: 112000,
  monthlyIncomeCents: 520000,
  monthlySpendCents: 380000,
  subscriptionsTotalMonthlyCents: 10398,
  subscriptionsWastedMonthlyCents: 1799,
  sparklineData: [0.25, 0.28, 0.32, 0.35, 0.38, 0.42],
};

// ═══════════════════════════════════════════════════════════════════════════════
// F — Frank Foster  |  Pre-Retirement · 55 · Premium
// ═══════════════════════════════════════════════════════════════════════════════
const F: UserFinancialProfile = {
  user: { id:'u_f', name:'Frank Foster', email:'frank@example.com', avatarInitials:'FF',
    planTier:'premium', bankName:'Fidelity', bankColor:'#006633',
    onboardedAt: fmt(subDays(today,120)), greeting:'Frank' },
  accounts: [
    { id:'a_f1', userId:'u_f', name:'Fidelity CMA', type:'checking', institution:'Fidelity',
      balanceCents:1240000, color:'#00f5b0', logoAbbrev:'FIDL', updatedAt: fmt(today) },
    { id:'a_f2', userId:'u_f', name:'Fidelity HYSA', type:'savings', institution:'Fidelity',
      balanceCents:8400000, interestRate:5.0, color:'#5b8dff', logoAbbrev:'FIDL', updatedAt: fmt(today) },
    { id:'a_f3', userId:'u_f', name:'Fidelity 401(k)', type:'investment', institution:'Fidelity',
      balanceCents:58200000, interestRate:8.4, color:'#a78bfa', logoAbbrev:'FIDL', updatedAt: fmt(today) },
    { id:'a_f4', userId:'u_f', name:'Vanguard Taxable', type:'investment', institution:'Vanguard',
      balanceCents:15700000, interestRate:9.2, color:'#ffd166', logoAbbrev:'VANG', updatedAt: fmt(today) },
    { id:'a_f5', userId:'u_f', name:'Chase Preferred', type:'credit', institution:'Chase',
      balanceCents:-84000, dueDate: fmt(addDays(today,16)), color:'#ffb347', logoAbbrev:'CHASE', updatedAt: fmt(today) },
  ],
  transactions: [
    { id:'t_f1', accountId:'a_f1', userId:'u_f', merchant:'Vanguard Dividend', merchantIcon:'📈', amountCents:124000, isDebit:false, category:'Income', date: fmt(subDays(today,3)), isSubscription:false },
    { id:'t_f2', accountId:'a_f1', userId:'u_f', merchant:'Golf Club', merchantIcon:'⛳', amountCents:38000, isDebit:true, category:'Health', date: fmt(subDays(today,5)), isSubscription:false },
    { id:'t_f3', accountId:'a_f1', userId:'u_f', merchant:'Corp Final Payroll', merchantIcon:'💵', amountCents:1420000, isDebit:false, category:'Income', date: fmt(subDays(today,7)), isSubscription:false },
    { id:'t_f4', accountId:'a_f5', userId:'u_f', merchant:'Costco', merchantIcon:'🛒', amountCents:31200, isDebit:true, category:'Food', date: fmt(subDays(today,9)), isSubscription:false },
    { id:'t_f5', accountId:'a_f1', userId:'u_f', merchant:'Mortgage', merchantIcon:'🏠', amountCents:310000, isDebit:true, category:'Rent', date: fmt(subDays(today,10)), isSubscription:false },
  ],
  bills: [
    { id:'b_f1', userId:'u_f', name:'Mortgage', icon:'🏠', amountCents:310000, dueDate: fmt(addDays(today,21)), source:'manual', status:'upcoming', accountId:'a_f1', color:'#ffb347' },
    { id:'b_f2', userId:'u_f', name:'HOA', icon:'🏡', amountCents:45000, dueDate: fmt(addDays(today,7)), source:'manual', status:'due_soon', accountId:'a_f1', color:'#5b8dff' },
    { id:'b_f3', userId:'u_f', name:'Chase Card', icon:'💳', amountCents:84000, dueDate: fmt(addDays(today,16)), source:'email', status:'upcoming', accountId:'a_f1', color:'#ff5252' },
  ],
  subscriptions: [
    { id:'s_f1', userId:'u_f', name:'Golf Channel', icon:'⛳', amountCents:2499, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,8)), category:'Entertainment', isWaste:false, iconBg:'rgba(0,245,176,0.08)' },
    { id:'s_f2', userId:'u_f', name:'WSJ Digital', icon:'📰', amountCents:3899, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,15)), category:'News', isWaste:false, iconBg:'rgba(255,255,255,0.08)' },
    { id:'s_f3', userId:'u_f', name:'Amazon Prime', icon:'📦', amountCents:1499, billingCycle:'monthly', lastUsedDaysAgo:2, nextBillingDate: fmt(addDays(today,22)), category:'Shopping', isWaste:false, iconBg:'rgba(255,153,0,0.10)' },
    { id:'s_f4', userId:'u_f', name:'Morningstar', icon:'📊', amountCents:2499, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,5)), category:'Finance', isWaste:false, iconBg:'rgba(255,209,102,0.12)' },
    { id:'s_f5', userId:'u_f', name:'Sirius XM', icon:'📻', amountCents:2199, billingCycle:'monthly', lastUsedDaysAgo:62, nextBillingDate: fmt(addDays(today,18)), category:'Entertainment', isWaste:true, iconBg:'rgba(91,141,255,0.10)' },
  ],
  alerts: [
    { id:'al_f1', userId:'u_f', type:'info', icon:'📈', title:'Portfolio milestone', description:'401(k) crossed $582,000. On track for target retirement in 2028.', timeAgo:'3 days ago', isRead:false, amountCents:58200000 },
    { id:'al_f2', userId:'u_f', type:'danger', icon:'🏡', title:'HOA due in 7 days', description:'$450 HOA fee due Oct 25. Auto-pay from Fidelity CMA?', timeAgo:'Today', isRead:false, actionLabel:'Schedule →', amountCents:45000 },
    { id:'al_f3', userId:'u_f', type:'info', icon:'💎', title:'Rebalance opportunity', description:'Taxable account is 72% equities vs 60% target. Consider rebalancing.', timeAgo:'Yesterday', isRead:true, amountCents:0 },
  ],
  cashflow: buildCashflow('u_f', 14200, 6800),
  projection: { thirtyDay: 7400, sixtyDay: 14200, ninetyDay: 21400 },
  trip: {
    id:'trip_f1', userId:'u_f', name:'Scotland Golf Trip', destination:'NYC → Edinburgh',
    startDate: fmt(addDays(today,30)), endDate: fmt(addDays(today,40)), nights:10, travelers:2,
    budgetCents:1200000, spentCents:480000, isOnTrack:true, detectedFromEmail:true,
    categories: [
      { icon:'✈️', label:'FLIGHTS', spentCents:180000, budgetCents:300000, fillColor:'#5b8dff' },
      { icon:'🏨', label:'HOTEL', spentCents:200000, budgetCents:400000, fillColor:'#a78bfa' },
      { icon:'⛳', label:'GOLF', spentCents:100000, budgetCents:350000, fillColor:'#00f5b0' },
      { icon:'🍽️', label:'DINING', spentCents:0, budgetCents:150000, fillColor:'#ffb347' },
    ],
    itinerary: [
      { date: fmt(addDays(today,30)), event:'Depart JFK → EDI', icon:'✈️', amountCents:180000, isCovered:true },
      { date: fmt(addDays(today,31)), event:'Gleneagles Hotel check-in', icon:'🏨', amountCents:200000, isCovered:true },
      { date: fmt(addDays(today,40)), event:'Return EDI → JFK', icon:'✈️', amountCents:0, isCovered:true },
    ],
  },
  netWorthCents: 84210000,
  safeToSpendCents: 640000,
  monthlyIncomeCents: 1420000,
  monthlySpendCents: 680000,
  subscriptionsTotalMonthlyCents: 12595,
  subscriptionsWastedMonthlyCents: 2199,
  sparklineData: [0.7, 0.74, 0.78, 0.81, 0.85, 0.91],
};

// ═══════════════════════════════════════════════════════════════════════════════
// G — Grace Green  |  Teacher · Side Hustle · Free
// ═══════════════════════════════════════════════════════════════════════════════
const G: UserFinancialProfile = {
  user: { id:'u_g', name:'Grace Green', email:'grace@example.com', avatarInitials:'GG',
    planTier:'free', bankName:'Navy Federal', bankColor:'#003087',
    onboardedAt: fmt(subDays(today,30)), greeting:'Grace' },
  accounts: [
    { id:'a_g1', userId:'u_g', name:'Navy FCU Checking', type:'checking', institution:'Navy Federal',
      balanceCents:286000, color:'#00f5b0', logoAbbrev:'NFCU', updatedAt: fmt(today) },
    { id:'a_g2', userId:'u_g', name:'Navy FCU Savings', type:'savings', institution:'Navy Federal',
      balanceCents:920000, color:'#5b8dff', logoAbbrev:'NFCU', updatedAt: fmt(today) },
    { id:'a_g3', userId:'u_g', name:'Citi Double Cash', type:'credit', institution:'Citi',
      balanceCents:-38900, dueDate: fmt(addDays(today,11)), color:'#ffb347', logoAbbrev:'CITI', updatedAt: fmt(today) },
  ],
  transactions: [
    { id:'t_g1', accountId:'a_g1', userId:'u_g', merchant:'Etsy Shop Revenue', merchantIcon:'🎨', amountCents:84000, isDebit:false, category:'Income', date: fmt(subDays(today,2)), isSubscription:false },
    { id:'t_g2', accountId:'a_g1', userId:'u_g', merchant:'School District Payroll', merchantIcon:'💵', amountCents:480000, isDebit:false, category:'Income', date: fmt(subDays(today,4)), isSubscription:false },
    { id:'t_g3', accountId:'a_g1', userId:'u_g', merchant:'Rent', merchantIcon:'🏠', amountCents:156000, isDebit:true, category:'Rent', date: fmt(subDays(today,6)), isSubscription:false },
    { id:'t_g4', accountId:'a_g3', userId:'u_g', merchant:'Canva Pro', merchantIcon:'🎨', amountCents:1399, isDebit:true, category:'Business', date: fmt(subDays(today,8)), isSubscription:true },
    { id:'t_g5', accountId:'a_g1', userId:'u_g', merchant:'Trader Joe\'s', merchantIcon:'🛒', amountCents:7800, isDebit:true, category:'Food', date: fmt(subDays(today,9)), isSubscription:false },
  ],
  bills: [
    { id:'b_g1', userId:'u_g', name:'Rent', icon:'🏠', amountCents:156000, dueDate: fmt(addDays(today,21)), source:'manual', status:'upcoming', accountId:'a_g1', color:'#ffb347' },
    { id:'b_g2', userId:'u_g', name:'Citi Card', icon:'💳', amountCents:38900, dueDate: fmt(addDays(today,11)), source:'email', status:'upcoming', accountId:'a_g1', color:'#ff5252' },
    { id:'b_g3', userId:'u_g', name:'Spotify', icon:'🎵', amountCents:1099, dueDate: fmt(addDays(today,3)), source:'email', status:'due_soon', accountId:'a_g3', color:'#5b8dff' },
  ],
  subscriptions: [
    { id:'s_g1', userId:'u_g', name:'Canva Pro', icon:'🎨', amountCents:1399, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,8)), category:'Business', isWaste:false, iconBg:'rgba(162,89,255,0.12)' },
    { id:'s_g2', userId:'u_g', name:'Spotify', icon:'🎵', amountCents:1099, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,3)), category:'Entertainment', isWaste:false, iconBg:'rgba(30,215,96,0.10)' },
    { id:'s_g3', userId:'u_g', name:'Peloton', icon:'🚴', amountCents:4400, billingCycle:'monthly', lastUsedDaysAgo:41, nextBillingDate: fmt(addDays(today,19)), category:'Health', isWaste:true, iconBg:'rgba(255,100,50,0.12)' },
    { id:'s_g4', userId:'u_g', name:'YouTube Premium', icon:'▶️', amountCents:1399, billingCycle:'monthly', lastUsedDaysAgo:1, nextBillingDate: fmt(addDays(today,24)), category:'Entertainment', isWaste:false, iconBg:'rgba(255,0,0,0.10)' },
  ],
  alerts: [
    { id:'al_g1', userId:'u_g', type:'success', icon:'🎨', title:'Etsy revenue up 18%', description:'$840 this month from your Etsy shop — best month yet!', timeAgo:'2 days ago', isRead:false, amountCents:84000 },
    { id:'al_g2', userId:'u_g', type:'warning', icon:'🚴', title:'Peloton unused 41 days', description:'$44/mo with zero rides. Cancel to save $528/yr.', timeAgo:'Yesterday', isRead:false, actionLabel:'Cancel →', amountCents:4400 },
    { id:'al_g3', userId:'u_g', type:'info', icon:'💎', title:'You\'re saving 19% of income', description:'Above the 15% recommended for your age bracket. Keep it up!', timeAgo:'This week', isRead:true, amountCents:0 },
  ],
  cashflow: buildCashflow('u_g', 5640, 3900),
  projection: { thirtyDay: 1740, sixtyDay: 3300, ninetyDay: 4900 },
  trip: null,
  netWorthCents: 6740000,
  safeToSpendCents: 154000,
  monthlyIncomeCents: 564000,
  monthlySpendCents: 390000,
  subscriptionsTotalMonthlyCents: 8297,
  subscriptionsWastedMonthlyCents: 4400,
  sparklineData: [0.32, 0.36, 0.38, 0.41, 0.45, 0.48],
};

// ═══════════════════════════════════════════════════════════════════════════════
// H — Henry Hill  |  Software Lead · High Earner · Premium
// ═══════════════════════════════════════════════════════════════════════════════
const H: UserFinancialProfile = {
  user: { id:'u_h', name:'Henry Hill', email:'henry@example.com', avatarInitials:'HH',
    planTier:'premium', bankName:'Chase Bank', bankColor:'#003087',
    onboardedAt: fmt(subDays(today,180)), greeting:'Henry' },
  accounts: [
    { id:'a_h1', userId:'u_h', name:'Chase Checking', type:'checking', institution:'Chase',
      balanceCents:1840000, color:'#00f5b0', logoAbbrev:'CHASE', updatedAt: fmt(today) },
    { id:'a_h2', userId:'u_h', name:'Marcus HYSA', type:'savings', institution:'Marcus',
      balanceCents:8200000, interestRate:5.1, color:'#5b8dff', logoAbbrev:'MARC', updatedAt: fmt(today) },
    { id:'a_h3', userId:'u_h', name:'Chase Sapphire Reserve', type:'credit', institution:'Chase',
      balanceCents:-420000, dueDate: fmt(addDays(today,18)), color:'#ffb347', logoAbbrev:'CSR', updatedAt: fmt(today) },
    { id:'a_h4', userId:'u_h', name:'Fidelity 401(k)', type:'investment', institution:'Fidelity',
      balanceCents:28400000, interestRate:9.1, color:'#a78bfa', logoAbbrev:'FIDL', updatedAt: fmt(today) },
    { id:'a_h5', userId:'u_h', name:'Fidelity Brokerage', type:'investment', institution:'Fidelity',
      balanceCents:6250000, interestRate:12.4, color:'#ffd166', logoAbbrev:'FIDL', updatedAt: fmt(today) },
  ],
  transactions: [
    { id:'t_h1', accountId:'a_h1', userId:'u_h', merchant:'TechCo RSU Vest', merchantIcon:'📈', amountCents:2400000, isDebit:false, category:'Income', date: fmt(subDays(today,3)), isSubscription:false },
    { id:'t_h2', accountId:'a_h1', userId:'u_h', merchant:'TechCo Payroll', merchantIcon:'💵', amountCents:1850000, isDebit:false, category:'Income', date: fmt(subDays(today,5)), isSubscription:false },
    { id:'t_h3', accountId:'a_h3', userId:'u_h', merchant:'Nobu Dinner', merchantIcon:'🍣', amountCents:84000, isDebit:true, category:'Food', date: fmt(subDays(today,6)), isSubscription:false },
    { id:'t_h4', accountId:'a_h1', userId:'u_h', merchant:'Mortgage', merchantIcon:'🏠', amountCents:420000, isDebit:true, category:'Rent', date: fmt(subDays(today,8)), isSubscription:false },
    { id:'t_h5', accountId:'a_h3', userId:'u_h', merchant:'Tesla Supercharger', merchantIcon:'⚡', amountCents:2400, isDebit:true, category:'Transport', date: fmt(subDays(today,10)), isSubscription:false },
  ],
  bills: [
    { id:'b_h1', userId:'u_h', name:'Mortgage', icon:'🏠', amountCents:420000, dueDate: fmt(addDays(today,22)), source:'manual', status:'upcoming', accountId:'a_h1', color:'#ffb347' },
    { id:'b_h2', userId:'u_h', name:'Chase Sapphire', icon:'💳', amountCents:420000, dueDate: fmt(addDays(today,18)), source:'email', status:'upcoming', accountId:'a_h1', color:'#ff5252' },
    { id:'b_h3', userId:'u_h', name:'HOA', icon:'🏡', amountCents:62000, dueDate: fmt(addDays(today,5)), source:'manual', status:'due_soon', accountId:'a_h1', color:'#5b8dff' },
  ],
  subscriptions: [
    { id:'s_h1', userId:'u_h', name:'Netflix 4K', icon:'📺', amountCents:2299, billingCycle:'monthly', lastUsedDaysAgo:1, nextBillingDate: fmt(addDays(today,9)), category:'Entertainment', isWaste:false, iconBg:'rgba(229,9,20,0.12)' },
    { id:'s_h2', userId:'u_h', name:'Spotify Premium', icon:'🎵', amountCents:1099, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,14)), category:'Entertainment', isWaste:false, iconBg:'rgba(30,215,96,0.10)' },
    { id:'s_h3', userId:'u_h', name:'Apple One Premier', icon:'🍎', amountCents:3299, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,21)), category:'Entertainment', isWaste:false, iconBg:'rgba(255,255,255,0.08)' },
    { id:'s_h4', userId:'u_h', name:'GitHub Copilot', icon:'🤖', amountCents:1900, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,7)), category:'Business', isWaste:false, iconBg:'rgba(255,255,255,0.08)' },
    { id:'s_h5', userId:'u_h', name:'Calm App', icon:'🧘', amountCents:1499, billingCycle:'monthly', lastUsedDaysAgo:58, nextBillingDate: fmt(addDays(today,16)), category:'Health', isWaste:true, iconBg:'rgba(91,141,255,0.10)' },
  ],
  alerts: [
    { id:'al_h1', userId:'u_h', type:'success', icon:'📈', title:'RSU vesting: $24,000', description:'240 shares vested. After tax ~$16,800. Move to brokerage?', timeAgo:'3 days ago', isRead:false, actionLabel:'Move Funds →', amountCents:2400000 },
    { id:'al_h2', userId:'u_h', type:'danger', icon:'🏡', title:'HOA due in 5 days', description:'$620 HOA due Oct 23. Schedule from Chase Checking.', timeAgo:'Today', isRead:false, actionLabel:'Pay Now →', amountCents:62000 },
    { id:'al_h3', userId:'u_h', type:'warning', icon:'🧘', title:'Calm unused 58 days', description:'$14.99/mo. Haven\'t opened in 2 months. Cancel to save $180/yr.', timeAgo:'2 days ago', isRead:false, actionLabel:'Cancel →', amountCents:1499 },
  ],
  cashflow: buildCashflow('u_h', 20600, 9400),
  projection: { thirtyDay: 11200, sixtyDay: 21600, ninetyDay: 32800 },
  trip: {
    id:'trip_h1', userId:'u_h', name:'Tokyo Tech Trip', destination:'SFO → Tokyo',
    startDate: fmt(addDays(today,15)), endDate: fmt(addDays(today,22)), nights:7, travelers:2,
    budgetCents:800000, spentCents:320000, isOnTrack:true, detectedFromEmail:true,
    categories: [
      { icon:'✈️', label:'FLIGHTS', spentCents:220000, budgetCents:250000, fillColor:'#5b8dff' },
      { icon:'🏨', label:'HOTEL', spentCents:100000, budgetCents:300000, fillColor:'#a78bfa' },
      { icon:'🍣', label:'DINING', spentCents:0, budgetCents:150000, fillColor:'#ffb347' },
      { icon:'🚅', label:'TRANSPORT', spentCents:0, budgetCents:100000, fillColor:'#00f5b0' },
    ],
    itinerary: [
      { date: fmt(addDays(today,15)), event:'Depart SFO → NRT', icon:'✈️', amountCents:220000, isCovered:true },
      { date: fmt(addDays(today,15)), event:'Andaz Tokyo check-in', icon:'🏨', amountCents:100000, isCovered:true },
      { date: fmt(addDays(today,22)), event:'Return NRT → SFO', icon:'✈️', amountCents:0, isCovered:true },
    ],
  },
  netWorthCents: 41290000,
  safeToSpendCents: 1240000,
  monthlyIncomeCents: 2060000,
  monthlySpendCents: 940000,
  subscriptionsTotalMonthlyCents: 10096,
  subscriptionsWastedMonthlyCents: 1499,
  sparklineData: [0.65, 0.70, 0.74, 0.78, 0.84, 0.90],
};

// ─── TEMPLATES FOR I–L (condensed) ───────────────────────────────────────────
function makeProfile(
  letter: string, name: string, email: string, initials: string,
  bank: string, bankColor: string, tier: 'free'|'premium',
  checking: number, savings: number, credit: number, invest: number,
  netWorth: number, sts: number, income: number, spend: number,
  sparkline: number[]
): UserFinancialProfile {
  const id = `u_${letter}`;
  return {
    user: { id, name, email, avatarInitials: initials, planTier: tier,
      bankName: bank, bankColor, onboardedAt: fmt(subDays(today, 30)),
      greeting: name.split(' ')[0] },
    accounts: [
      { id:`a_${letter}1`, userId:id, name:`${bank} Checking`, type:'checking', institution:bank,
        balanceCents: Math.round(checking*100), color:'#00f5b0', logoAbbrev:bank.slice(0,4).toUpperCase(), updatedAt: fmt(today) },
      { id:`a_${letter}2`, userId:id, name:`${bank} Savings`, type:'savings', institution:bank,
        balanceCents: Math.round(savings*100), interestRate:4.8, color:'#5b8dff', logoAbbrev:bank.slice(0,4).toUpperCase(), updatedAt: fmt(today) },
      ...(credit > 0 ? [{ id:`a_${letter}3`, userId:id, name:'Credit Card', type:'credit' as const, institution:bank,
        balanceCents: Math.round(-credit*100), dueDate: fmt(addDays(today,10)), color:'#ffb347', logoAbbrev:'CARD', updatedAt: fmt(today) }] : []),
      ...(invest > 0 ? [{ id:`a_${letter}4`, userId:id, name:'Investment', type:'investment' as const, institution:bank,
        balanceCents: Math.round(invest*100), interestRate:8.0, color:'#a78bfa', logoAbbrev:'INVT', updatedAt: fmt(today) }] : []),
    ],
    transactions: [
      { id:`t_${letter}1`, accountId:`a_${letter}1`, userId:id, merchant:'Grocery Store', merchantIcon:'🛒', amountCents:9800, isDebit:true, category:'Food', date: fmt(subDays(today,2)), isSubscription:false },
      { id:`t_${letter}2`, accountId:`a_${letter}1`, userId:id, merchant:'Employer Payroll', merchantIcon:'💵', amountCents:Math.round(income*100), isDebit:false, category:'Income', date: fmt(subDays(today,5)), isSubscription:false },
      { id:`t_${letter}3`, accountId:`a_${letter}1`, userId:id, merchant:'Rent', merchantIcon:'🏠', amountCents:Math.round(spend*0.4*100), isDebit:true, category:'Rent', date: fmt(subDays(today,8)), isSubscription:false },
      { id:`t_${letter}4`, accountId:`a_${letter}1`, userId:id, merchant:'Netflix', merchantIcon:'📺', amountCents:1799, isDebit:true, category:'Entertainment', date: fmt(subDays(today,10)), isSubscription:true },
      { id:`t_${letter}5`, accountId:`a_${letter}1`, userId:id, merchant:'Coffee Shop', merchantIcon:'☕', amountCents:640, isDebit:true, category:'Food', date: fmt(subDays(today,12)), isSubscription:false },
    ],
    bills: [
      { id:`b_${letter}1`, userId:id, name:'Rent', icon:'🏠', amountCents:Math.round(spend*0.4*100), dueDate: fmt(addDays(today,20)), source:'manual', status:'upcoming', accountId:`a_${letter}1`, color:'#ffb347' },
      { id:`b_${letter}2`, userId:id, name:'Internet', icon:'📡', amountCents:8900, dueDate: fmt(addDays(today,7)), source:'email', status:'due_soon', accountId:`a_${letter}1`, color:'#5b8dff' },
      { id:`b_${letter}3`, userId:id, name:'Electric', icon:'⚡', amountCents:12000, dueDate: fmt(addDays(today,14)), source:'email', status:'upcoming', accountId:`a_${letter}1`, color:'#a78bfa' },
    ],
    subscriptions: [
      { id:`s_${letter}1`, userId:id, name:'Netflix', icon:'📺', amountCents:1799, billingCycle:'monthly', lastUsedDaysAgo:3, nextBillingDate: fmt(addDays(today,10)), category:'Entertainment', isWaste:false, iconBg:'rgba(229,9,20,0.12)' },
      { id:`s_${letter}2`, userId:id, name:'Spotify', icon:'🎵', amountCents:1099, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,15)), category:'Entertainment', isWaste:false, iconBg:'rgba(30,215,96,0.10)' },
      { id:`s_${letter}3`, userId:id, name:'Planet Fitness', icon:'💪', amountCents:2499, billingCycle:'monthly', lastUsedDaysAgo:35, nextBillingDate: fmt(addDays(today,20)), category:'Health', isWaste:true, iconBg:'rgba(0,100,255,0.10)' },
      { id:`s_${letter}4`, userId:id, name:'Amazon Prime', icon:'📦', amountCents:1499, billingCycle:'monthly', lastUsedDaysAgo:5, nextBillingDate: fmt(addDays(today,25)), category:'Shopping', isWaste:false, iconBg:'rgba(255,153,0,0.10)' },
    ],
    alerts: [
      { id:`al_${letter}1`, userId:id, type:'danger', icon:'📡', title:'Internet bill due in 7 days', description:`$89 due soon. Pay from ${bank} Checking.`, timeAgo:'5 hours ago', isRead:false, actionLabel:'Pay Now →', amountCents:8900 },
      { id:`al_${letter}2`, userId:id, type:'success', icon:'💵', title:'Payroll received', description:`$${(income).toLocaleString()} deposited. Safe to Spend updated.`, timeAgo:'5 days ago', isRead:true, amountCents:Math.round(income*100) },
      { id:`al_${letter}3`, userId:id, type:'warning', icon:'💪', title:'Planet Fitness unused 35 days', description:'$24.99/mo. Cancel to save $300/yr.', timeAgo:'Yesterday', isRead:false, actionLabel:'Cancel →', amountCents:2499 },
    ],
    cashflow: buildCashflow(id, income, spend),
    projection: { thirtyDay: Math.round((income-spend)*1), sixtyDay: Math.round((income-spend)*2), ninetyDay: Math.round((income-spend)*3) },
    trip: null,
    netWorthCents: Math.round(netWorth*100),
    safeToSpendCents: Math.round(sts*100),
    monthlyIncomeCents: Math.round(income*100),
    monthlySpendCents: Math.round(spend*100),
    subscriptionsTotalMonthlyCents: 6896,
    subscriptionsWastedMonthlyCents: 2499,
    sparklineData: sparkline,
  };
}

const I = makeProfile('i','Iris Ingram','iris@example.com','II','USAA','#003087','free',1840,1200,240,0,28600,920,4800,3800,[0.22,0.28,0.25,0.31,0.35,0.38]);
const J = makeProfile('j','James Johnson','james@example.com','JJ','Chase Bank','#003087','premium',5200,18400,640,48200,224700,2840,14200,9600,[0.48,0.54,0.58,0.62,0.67,0.72]);
const K = makeProfile('k','Kim Kim','kim@example.com','KK','Silicon Valley Bank','#7b2ff7','premium',8400,24000,1200,18000,91300,4100,12000,7800,[0.40,0.46,0.50,0.55,0.60,0.65]);
const L = makeProfile('l','Leo Lopez','leo@example.com','LL','Chime','#00d4a1','free',420,0,180,0,4200,180,2200,1900,[0.10,0.12,0.14,0.13,0.15,0.17]);

// ═══════════════════════════════════════════════════════════════════════════════
// M — Maya Mitchell  |  Marketing Manager · Premium  (primary demo persona)
// ═══════════════════════════════════════════════════════════════════════════════
const M: UserFinancialProfile = {
  user: { id:'u_m', name:'Maya Mitchell', email:'maya@example.com', avatarInitials:'MM',
    planTier:'premium', bankName:'Chase Bank', bankColor:'#003087',
    onboardedAt: fmt(subDays(today,30)), greeting:'Maya' },
  accounts: [
    { id:'a_m1', userId:'u_m', name:'Chase Checking', type:'checking', institution:'Chase',
      balanceCents:421000, color:'#00f5b0', logoAbbrev:'CHASE', updatedAt: fmt(today) },
    { id:'a_m2', userId:'u_m', name:'Marcus HYSA', type:'savings', institution:'Marcus',
      balanceCents:1240000, interestRate:4.8, color:'#5b8dff', logoAbbrev:'MARC', updatedAt: fmt(today) },
    { id:'a_m3', userId:'u_m', name:'Chase Freedom', type:'credit', institution:'Chase',
      balanceCents:-84000, dueDate: fmt(addDays(today,15)), color:'#ffb347', logoAbbrev:'CFRM', updatedAt: fmt(today) },
    { id:'a_m4', userId:'u_m', name:'Fidelity 401(k)', type:'investment', institution:'Fidelity',
      balanceCents:8520000, interestRate:8.1, color:'#a78bfa', logoAbbrev:'FIDL', updatedAt: fmt(today) },
  ],
  transactions: [
    { id:'t_m1', accountId:'a_m1', userId:'u_m', merchant:'Whole Foods', merchantIcon:'🛒', amountCents:13600, isDebit:true, category:'Food', date: fmt(subDays(today,1)), isSubscription:false },
    { id:'t_m2', accountId:'a_m1', userId:'u_m', merchant:'Acme Corp Payroll', merchantIcon:'💵', amountCents:520000, isDebit:false, category:'Income', date: fmt(subDays(today,2)), isSubscription:false },
    { id:'t_m3', accountId:'a_m3', userId:'u_m', merchant:'Netflix', merchantIcon:'📺', amountCents:1599, isDebit:true, category:'Entertainment', date: fmt(subDays(today,8)), isSubscription:true },
    { id:'t_m4', accountId:'a_m3', userId:'u_m', merchant:'Planet Fitness', merchantIcon:'💪', amountCents:2499, isDebit:true, category:'Health', date: fmt(subDays(today,9)), isSubscription:true },
    { id:'t_m5', accountId:'a_m1', userId:'u_m', merchant:'Rent', merchantIcon:'🏠', amountCents:180000, isDebit:true, category:'Rent', date: fmt(subDays(today,10)), isSubscription:false },
    { id:'t_m6', accountId:'a_m3', userId:'u_m', merchant:'Amazon', merchantIcon:'📦', amountCents:4299, isDebit:true, category:'Shopping', date: fmt(subDays(today,12)), isSubscription:false },
    { id:'t_m7', accountId:'a_m1', userId:'u_m', merchant:'Sweetgreen', merchantIcon:'🥗', amountCents:1860, isDebit:true, category:'Food', date: fmt(subDays(today,13)), isSubscription:false },
    { id:'t_m8', accountId:'a_m3', userId:'u_m', merchant:'Comcast', merchantIcon:'📡', amountCents:8900, isDebit:true, category:'Utilities', date: fmt(subDays(today,15)), isSubscription:true },
    { id:'t_m9', accountId:'a_m1', userId:'u_m', merchant:'SoulCycle', merchantIcon:'🚴', amountCents:9200, isDebit:true, category:'Health', date: fmt(subDays(today,17)), isSubscription:false },
    { id:'t_m10', accountId:'a_m1', userId:'u_m', merchant:'Starbucks', merchantIcon:'☕', amountCents:680, isDebit:true, category:'Food', date: fmt(subDays(today,18)), isSubscription:false },
  ],
  bills: [
    { id:'b_m1', userId:'u_m', name:'Rent', icon:'🏠', amountCents:180000, dueDate: fmt(addDays(today,18)), source:'manual', status:'upcoming', accountId:'a_m1', color:'#ffb347' },
    { id:'b_m2', userId:'u_m', name:'Comcast', icon:'📡', amountCents:8900, dueDate: fmt(addDays(today,3)), source:'email', status:'due_soon', accountId:'a_m1', color:'#ff5252' },
    { id:'b_m3', userId:'u_m', name:'Savings Auto-Transfer', icon:'💰', amountCents:30000, dueDate: fmt(addDays(today,7)), source:'manual', status:'upcoming', accountId:'a_m1', color:'#5b8dff' },
  ],
  subscriptions: [
    { id:'s_m1', userId:'u_m', name:'Netflix', icon:'📺', amountCents:1599, billingCycle:'monthly', lastUsedDaysAgo:47, nextBillingDate: fmt(addDays(today,18)), category:'Entertainment', isWaste:true, iconBg:'rgba(229,9,20,0.12)' },
    { id:'s_m2', userId:'u_m', name:'Spotify', icon:'🎵', amountCents:1099, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,14)), category:'Entertainment', isWaste:false, iconBg:'rgba(30,215,96,0.10)' },
    { id:'s_m3', userId:'u_m', name:'Planet Fitness', icon:'💪', amountCents:2499, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,9)), category:'Health', isWaste:false, iconBg:'rgba(0,100,255,0.10)' },
    { id:'s_m4', userId:'u_m', name:'Amazon Prime', icon:'📦', amountCents:1499, billingCycle:'monthly', lastUsedDaysAgo:2, nextBillingDate: fmt(addDays(today,16)), category:'Shopping', isWaste:false, iconBg:'rgba(255,153,0,0.10)' },
    { id:'s_m5', userId:'u_m', name:'Comcast Internet', icon:'📡', amountCents:8900, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,3)), category:'Utilities', isWaste:false, iconBg:'rgba(0,112,255,0.10)' },
    { id:'s_m6', userId:'u_m', name:'iCloud 200GB', icon:'☁️', amountCents:299, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,22)), category:'Storage', isWaste:false, iconBg:'rgba(91,141,255,0.12)' },
    { id:'s_m7', userId:'u_m', name:'Adobe Lightroom', icon:'📷', amountCents:999, billingCycle:'monthly', lastUsedDaysAgo:62, nextBillingDate: fmt(addDays(today,11)), category:'Business', isWaste:true, iconBg:'rgba(255,0,0,0.10)' },
  ],
  alerts: [
    { id:'al_m1', userId:'u_m', type:'danger', icon:'📡', title:'Comcast due in 3 days', description:'Comcast $89.00 due Thursday. Pay from Checking (bal: $4,210)?', timeAgo:'2 min ago', isRead:false, actionLabel:'Pay Now →', actionRoute:'/bills', amountCents:8900 },
    { id:'al_m2', userId:'u_m', type:'success', icon:'💵', title:'Payroll received', description:'$5,200 from Acme Corp. Safe to Spend now $1,840.', timeAgo:'Today 9:02 AM', isRead:false, amountCents:520000 },
    { id:'al_m3', userId:'u_m', type:'warning', icon:'⚠️', title:'Unusual spend detected', description:'Spent $340 on dining this week — 2× your average.', timeAgo:'Yesterday', isRead:true, amountCents:34000 },
    { id:'al_m4', userId:'u_m', type:'info', icon:'💎', title:'Savings opportunity', description:'$600 above your buffer sitting idle. Move to HYSA (4.8%)?', timeAgo:'Yesterday', isRead:false, actionLabel:'Move $600 →', amountCents:60000 },
  ],
  cashflow: [
    { id:'cf_m1', userId:'u_m', month:5, year:2026, monthLabel:'May', incomeCents:720000, spendCents:536000, netCents:184000 },
    { id:'cf_m2', userId:'u_m', month:6, year:2026, monthLabel:'Jun', incomeCents:720000, spendCents:580000, netCents:140000 },
    { id:'cf_m3', userId:'u_m', month:7, year:2026, monthLabel:'Jul', incomeCents:720000, spendCents:498000, netCents:222000 },
    { id:'cf_m4', userId:'u_m', month:8, year:2026, monthLabel:'Aug', incomeCents:720000, spendCents:612000, netCents:108000 },
    { id:'cf_m5', userId:'u_m', month:9, year:2026, monthLabel:'Sep', incomeCents:720000, spendCents:524000, netCents:196000 },
    { id:'cf_m6', userId:'u_m', month:10, year:2026, monthLabel:'Oct', incomeCents:720000, spendCents:536000, netCents:184000 },
  ],
  projection: { thirtyDay: 1840, sixtyDay: 3100, ninetyDay: 4200 },
  trip: {
    id:'trip_m1', userId:'u_m', name:'SF Weekend', destination:'NYC → San Francisco',
    startDate: fmt(addDays(today,6)), endDate: fmt(addDays(today,10)), nights:4, travelers:2,
    budgetCents:180000, spentCents:84000, isOnTrack:true, detectedFromEmail:true,
    categories: [
      { icon:'✈️', label:'FLIGHTS', spentCents:42000, budgetCents:60000, fillColor:'#5b8dff' },
      { icon:'🏨', label:'HOTEL', spentCents:28000, budgetCents:60000, fillColor:'#a78bfa' },
      { icon:'🍽️', label:'FOOD (EST)', spentCents:14000, budgetCents:40000, fillColor:'#ffb347' },
      { icon:'🚗', label:'TRANSPORT', spentCents:0, budgetCents:20000, fillColor:'#00f5b0' },
    ],
    itinerary: [
      { date: fmt(addDays(today,6)), event:'Depart JFK → SFO', icon:'✈️', amountCents:42000, isCovered:true },
      { date: fmt(addDays(today,6)), event:'Hotel Zephyr check-in', icon:'🏨', amountCents:28000, isCovered:true },
      { date: fmt(addDays(today,10)), event:'Return SFO → JFK', icon:'✈️', amountCents:0, isCovered:true },
    ],
  },
  netWorthCents: 14284000,
  safeToSpendCents: 42000,
  monthlyIncomeCents: 720000,
  monthlySpendCents: 536000,
  subscriptionsTotalMonthlyCents: 17894,
  subscriptionsWastedMonthlyCents: 2598,
  sparklineData: [0.50, 0.54, 0.57, 0.59, 0.63, 0.67],
};

const N = makeProfile('n','Nina Nguyen','nina@example.com','NN','Ally Bank','#7b2ff7','free',2840,4200,380,0,52100,1480,5600,4200,[0.28,0.32,0.35,0.38,0.41,0.45]);
const O = makeProfile('o','Oscar Owens','oscar@example.com','OO','Schwab','#1a6ca8','premium',48000,120000,8400,980000,1240000,24000,42000,18000,[0.80,0.83,0.86,0.88,0.91,0.94]);
const P = makeProfile('p','Priya Patel','priya@example.com','PP','Chase Bank','#003087','premium',6800,28000,1200,120000,178500,3200,12400,7600,[0.55,0.60,0.64,0.68,0.72,0.77]);
const Q = makeProfile('q','Quinn Quinn','quinn@example.com','QQ','Chime','#00d4a1','free',890,0,0,0,8900,340,3200,2900,[0.08,0.10,0.09,0.12,0.11,0.14]);
const R = makeProfile('r','Ryan Reed','ryan@example.com','RR','Bank of America','#c0392b','premium',4200,18000,960,32000,88700,1980,9400,6200,[0.38,0.43,0.47,0.51,0.55,0.60]);
const S = makeProfile('s','Sara Singh','sara@example.com','SS','TD Bank','#1a9c3e','free',1840,4800,520,0,31200,840,4200,3600,[0.20,0.24,0.27,0.30,0.33,0.36]);
const T = makeProfile('t','Tyler Torres','tyler@example.com','TT','Coinbase','#0052ff','free',2600,8400,420,18000,64800,1240,5800,4400,[0.32,0.40,0.35,0.48,0.42,0.55]);
const U = makeProfile('u','Uma Upton','uma@example.com','UU','Fidelity','#006633','premium',8400,48000,0,240000,312100,4200,14800,8200,[0.60,0.64,0.68,0.71,0.75,0.80]);
const V = makeProfile('v','Vince Vega','vince@example.com','VV','Wells Fargo','#c0392b','free',3800,12000,2400,0,76400,1640,8200,6800,[0.38,0.40,0.42,0.44,0.46,0.50]);
const W = makeProfile('w','Wendy Walsh','wendy@example.com','WW','Vanguard','#722f37','premium',18000,84000,0,380000,523600,8400,22000,9800,[0.75,0.78,0.80,0.83,0.86,0.90]);
const X = makeProfile('x','Xander Xu','xander@example.com','XX','Interactive Brokers','#ff6600','premium',24000,64000,0,280000,387200,10800,28000,12000,[0.68,0.72,0.75,0.78,0.82,0.87]);
const Y = makeProfile('y','Yuki Yamamoto','yuki@example.com','YY','Marcus','#003087','premium',7200,36000,1800,100000,165900,3400,11200,7200,[0.52,0.56,0.60,0.64,0.68,0.72]);
const Z = makeProfile('z','Zoe Zhang','zoe@example.com','ZZ','Vanguard','#722f37','premium',84000,280000,0,720000,1050000,38000,84000,24000,[0.88,0.90,0.92,0.93,0.95,0.97]);

// ─── EXPORT ──────────────────────────────────────────────────────────────────

export const MOCK_DATA_SETS: UserFinancialProfile[] = [
  A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z
];

export default MOCK_DATA_SETS;
