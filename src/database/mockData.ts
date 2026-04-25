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


// ═══════════════════════════════════════════════════════════════════════════════
// I — Iris Ingram  |  Insurance Agent · USAA · Free
// ═══════════════════════════════════════════════════════════════════════════════
const I: UserFinancialProfile = {
  user: { id:'u_i', name:'Iris Ingram', email:'iris@example.com', avatarInitials:'II',
    planTier:'free', bankName:'USAA', bankColor:'#003087',
    onboardedAt: fmt(subDays(today,60)), greeting:'Iris' },
  accounts: [
    { id:'a_i1', userId:'u_i', name:'USAA Checking', type:'checking', institution:'USAA',
      balanceCents:184000, color:'#00f5b0', logoAbbrev:'USAA', updatedAt: fmt(today) },
    { id:'a_i2', userId:'u_i', name:'USAA Savings', type:'savings', institution:'USAA',
      balanceCents:120000, interestRate:4.2, color:'#5b8dff', logoAbbrev:'USAA', updatedAt: fmt(today) },
    { id:'a_i3', userId:'u_i', name:'Discover It', type:'credit', institution:'Discover',
      balanceCents:-24000, dueDate: fmt(addDays(today,10)), color:'#ffb347', logoAbbrev:'DISC', updatedAt: fmt(today) },
  ],
  transactions: [
    { id:'t_i1', accountId:'a_i1', userId:'u_i', merchant:'Allstate Corp Payroll', merchantIcon:'💵', amountCents:480000, isDebit:false, category:'Income', date: fmt(subDays(today,3)), isSubscription:false },
    { id:'t_i2', accountId:'a_i1', userId:'u_i', merchant:'Rent', merchantIcon:'🏠', amountCents:152000, isDebit:true, category:'Rent', date: fmt(subDays(today,5)), isSubscription:false },
    { id:'t_i3', accountId:'a_i1', userId:'u_i', merchant:'Walmart', merchantIcon:'🛒', amountCents:8400, isDebit:true, category:'Food', date: fmt(subDays(today,7)), isSubscription:false },
    { id:'t_i4', accountId:'a_i3', userId:'u_i', merchant:'ClassPass', merchantIcon:'💪', amountCents:7900, isDebit:true, category:'Health', date: fmt(subDays(today,10)), isSubscription:true },
    { id:'t_i5', accountId:'a_i1', userId:'u_i', merchant:'CVS Pharmacy', merchantIcon:'💊', amountCents:4200, isDebit:true, category:'Health', date: fmt(subDays(today,14)), isSubscription:false },
  ],
  bills: [
    { id:'b_i1', userId:'u_i', name:'Rent', icon:'🏠', amountCents:152000, dueDate: fmt(addDays(today,22)), source:'manual', status:'upcoming', accountId:'a_i1', color:'#ffb347' },
    { id:'b_i2', userId:'u_i', name:'Car Insurance', icon:'🚗', amountCents:14800, dueDate: fmt(addDays(today,8)), source:'email', status:'due_soon', accountId:'a_i1', color:'#5b8dff' },
    { id:'b_i3', userId:'u_i', name:'Internet', icon:'📡', amountCents:6900, dueDate: fmt(addDays(today,12)), source:'email', status:'upcoming', accountId:'a_i1', color:'#a78bfa' },
  ],
  subscriptions: [
    { id:'s_i1', userId:'u_i', name:'ClassPass', icon:'💪', amountCents:7900, billingCycle:'monthly', lastUsedDaysAgo:38, nextBillingDate: fmt(addDays(today,10)), category:'Health', isWaste:true, iconBg:'rgba(91,141,255,0.12)' },
    { id:'s_i2', userId:'u_i', name:'Spotify', icon:'🎵', amountCents:1099, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,18)), category:'Entertainment', isWaste:false, iconBg:'rgba(30,215,96,0.10)' },
    { id:'s_i3', userId:'u_i', name:'Hulu', icon:'📺', amountCents:1799, billingCycle:'monthly', lastUsedDaysAgo:52, nextBillingDate: fmt(addDays(today,5)), category:'Entertainment', isWaste:true, iconBg:'rgba(28,231,131,0.10)' },
    { id:'s_i4', userId:'u_i', name:'Amazon Prime', icon:'📦', amountCents:1499, billingCycle:'monthly', lastUsedDaysAgo:2, nextBillingDate: fmt(addDays(today,25)), category:'Shopping', isWaste:false, iconBg:'rgba(255,153,0,0.10)' },
  ],
  alerts: [
    { id:'al_i1', userId:'u_i', type:'danger', icon:'🚗', title:'Car insurance due in 8 days', description:'$148.00 due. Pay from USAA Checking (bal: $1,840).', timeAgo:'1 hour ago', isRead:false, actionLabel:'Pay Now →', amountCents:14800 },
    { id:'al_i2', userId:'u_i', type:'warning', icon:'💪', title:'ClassPass unused 38 days', description:'$79/mo. No check-ins since last month. Cancel to save $948/yr.', timeAgo:'Yesterday', isRead:false, actionLabel:'Cancel →', amountCents:7900 },
    { id:'al_i3', userId:'u_i', type:'warning', icon:'📺', title:'Hulu unused 52 days', description:'$17.99/mo and zero streams. Cancel to save $216/yr.', timeAgo:'3 days ago', isRead:false, actionLabel:'Cancel →', amountCents:1799 },
  ],
  cashflow: buildCashflow('u_i', 4800, 3800),
  projection: { thirtyDay: 1000, sixtyDay: 1900, ninetyDay: 2700 },
  trip: null,
  netWorthCents: 2860000,
  safeToSpendCents: 92000,
  monthlyIncomeCents: 480000,
  monthlySpendCents: 380000,
  subscriptionsTotalMonthlyCents: 12297,
  subscriptionsWastedMonthlyCents: 9699,
  sparklineData: [0.22, 0.28, 0.25, 0.31, 0.35, 0.38],
};

// ═══════════════════════════════════════════════════════════════════════════════
// J — James Johnson  |  Junior Dev · Tech Startup · Premium
// ═══════════════════════════════════════════════════════════════════════════════
const J: UserFinancialProfile = {
  user: { id:'u_j', name:'James Johnson', email:'james@example.com', avatarInitials:'JJ',
    planTier:'premium', bankName:'Chase Bank', bankColor:'#003087',
    onboardedAt: fmt(subDays(today,120)), greeting:'James' },
  accounts: [
    { id:'a_j1', userId:'u_j', name:'Chase Checking', type:'checking', institution:'Chase',
      balanceCents:520000, color:'#00f5b0', logoAbbrev:'CHASE', updatedAt: fmt(today) },
    { id:'a_j2', userId:'u_j', name:'Marcus HYSA', type:'savings', institution:'Marcus',
      balanceCents:1840000, interestRate:5.0, color:'#5b8dff', logoAbbrev:'MARC', updatedAt: fmt(today) },
    { id:'a_j3', userId:'u_j', name:'Chase Freedom', type:'credit', institution:'Chase',
      balanceCents:-64000, dueDate: fmt(addDays(today,14)), color:'#ffb347', logoAbbrev:'CFRM', updatedAt: fmt(today) },
    { id:'a_j4', userId:'u_j', name:'Vanguard Roth IRA', type:'investment', institution:'Vanguard',
      balanceCents:4820000, interestRate:9.2, color:'#a78bfa', logoAbbrev:'VANG', updatedAt: fmt(today) },
  ],
  transactions: [
    { id:'t_j1', accountId:'a_j1', userId:'u_j', merchant:'TechStartup Inc Payroll', merchantIcon:'💵', amountCents:1420000, isDebit:false, category:'Income', date: fmt(subDays(today,4)), isSubscription:false },
    { id:'t_j2', accountId:'a_j1', userId:'u_j', merchant:'Rent', merchantIcon:'🏠', amountCents:384000, isDebit:true, category:'Rent', date: fmt(subDays(today,6)), isSubscription:false },
    { id:'t_j3', accountId:'a_j3', userId:'u_j', merchant:'Apple Store', merchantIcon:'🍎', amountCents:129900, isDebit:true, category:'Shopping', date: fmt(subDays(today,8)), isSubscription:false },
    { id:'t_j4', accountId:'a_j1', userId:'u_j', merchant:'GitHub Copilot', merchantIcon:'🤖', amountCents:1900, isDebit:true, category:'Business', date: fmt(subDays(today,10)), isSubscription:true },
    { id:'t_j5', accountId:'a_j3', userId:'u_j', merchant:'LinkedIn Premium', merchantIcon:'💼', amountCents:3999, isDebit:true, category:'Business', date: fmt(subDays(today,15)), isSubscription:true },
    { id:'t_j6', accountId:'a_j1', userId:'u_j', merchant:'DoorDash', merchantIcon:'🍔', amountCents:4800, isDebit:true, category:'Food', date: fmt(subDays(today,18)), isSubscription:false },
  ],
  bills: [
    { id:'b_j1', userId:'u_j', name:'Rent', icon:'🏠', amountCents:384000, dueDate: fmt(addDays(today,20)), source:'manual', status:'upcoming', accountId:'a_j1', color:'#ffb347' },
    { id:'b_j2', userId:'u_j', name:'Chase Freedom', icon:'💳', amountCents:64000, dueDate: fmt(addDays(today,14)), source:'email', status:'upcoming', accountId:'a_j1', color:'#ff5252' },
    { id:'b_j3', userId:'u_j', name:'Electric', icon:'⚡', amountCents:9800, dueDate: fmt(addDays(today,6)), source:'email', status:'due_soon', accountId:'a_j1', color:'#5b8dff' },
  ],
  subscriptions: [
    { id:'s_j1', userId:'u_j', name:'GitHub Copilot', icon:'🤖', amountCents:1900, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,10)), category:'Business', isWaste:false, iconBg:'rgba(255,255,255,0.08)' },
    { id:'s_j2', userId:'u_j', name:'LinkedIn Premium', icon:'💼', amountCents:3999, billingCycle:'monthly', lastUsedDaysAgo:45, nextBillingDate: fmt(addDays(today,15)), category:'Business', isWaste:true, iconBg:'rgba(0,119,181,0.12)' },
    { id:'s_j3', userId:'u_j', name:'Spotify', icon:'🎵', amountCents:1099, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,22)), category:'Entertainment', isWaste:false, iconBg:'rgba(30,215,96,0.10)' },
    { id:'s_j4', userId:'u_j', name:'Netflix', icon:'📺', amountCents:1799, billingCycle:'monthly', lastUsedDaysAgo:5, nextBillingDate: fmt(addDays(today,8)), category:'Entertainment', isWaste:false, iconBg:'rgba(229,9,20,0.12)' },
    { id:'s_j5', userId:'u_j', name:'Headspace', icon:'🧘', amountCents:1299, billingCycle:'monthly', lastUsedDaysAgo:28, nextBillingDate: fmt(addDays(today,17)), category:'Health', isWaste:true, iconBg:'rgba(255,109,40,0.10)' },
  ],
  alerts: [
    { id:'al_j1', userId:'u_j', type:'success', icon:'📈', title:'Roth IRA milestone: $48,200', description:'Your Vanguard IRA crossed $48K. Up 9.2% YTD — keep max contributions going.', timeAgo:'2 days ago', isRead:false, amountCents:4820000 },
    { id:'al_j2', userId:'u_j', type:'warning', icon:'💼', title:'LinkedIn Premium unused 45 days', description:"$39.99/mo. Haven't logged in since March. Cancel to save $480/yr.", timeAgo:'Yesterday', isRead:false, actionLabel:'Cancel →', amountCents:3999 },
    { id:'al_j3', userId:'u_j', type:'danger', icon:'⚡', title:'Electric bill due in 6 days', description:'$98 due soon. Pay from Chase Checking.', timeAgo:'Today', isRead:false, actionLabel:'Pay Now →', amountCents:9800 },
  ],
  cashflow: buildCashflow('u_j', 14200, 9600),
  projection: { thirtyDay: 4600, sixtyDay: 8900, ninetyDay: 13600 },
  trip: null,
  netWorthCents: 22470000,
  safeToSpendCents: 284000,
  monthlyIncomeCents: 1420000,
  monthlySpendCents: 960000,
  subscriptionsTotalMonthlyCents: 10096,
  subscriptionsWastedMonthlyCents: 5298,
  sparklineData: [0.48, 0.54, 0.58, 0.62, 0.67, 0.72],
};

// ═══════════════════════════════════════════════════════════════════════════════
// K — Kim Kim  |  Kindergarten Teacher · First Republic · Premium
// ═══════════════════════════════════════════════════════════════════════════════
const K: UserFinancialProfile = {
  user: { id:'u_k', name:'Kim Kim', email:'kim@example.com', avatarInitials:'KK',
    planTier:'premium', bankName:'First Republic', bankColor:'#7b2ff7',
    onboardedAt: fmt(subDays(today,365)), greeting:'Kim' },
  accounts: [
    { id:'a_k1', userId:'u_k', name:'First Republic Checking', type:'checking', institution:'First Republic',
      balanceCents:840000, color:'#00f5b0', logoAbbrev:'FRB', updatedAt: fmt(today) },
    { id:'a_k2', userId:'u_k', name:'Ally HYSA', type:'savings', institution:'Ally',
      balanceCents:2400000, interestRate:4.5, color:'#5b8dff', logoAbbrev:'ALLY', updatedAt: fmt(today) },
    { id:'a_k3', userId:'u_k', name:'Capital One Venture', type:'credit', institution:'Capital One',
      balanceCents:-120000, dueDate: fmt(addDays(today,9)), color:'#ffb347', logoAbbrev:'CAPO', updatedAt: fmt(today) },
    { id:'a_k4', userId:'u_k', name:'Vanguard 403(b)', type:'investment', institution:'Vanguard',
      balanceCents:1800000, interestRate:7.8, color:'#a78bfa', logoAbbrev:'VANG', updatedAt: fmt(today) },
  ],
  transactions: [
    { id:'t_k1', accountId:'a_k1', userId:'u_k', merchant:'School District Payroll', merchantIcon:'💵', amountCents:1200000, isDebit:false, category:'Income', date: fmt(subDays(today,5)), isSubscription:false },
    { id:'t_k2', accountId:'a_k1', userId:'u_k', merchant:'Rent', merchantIcon:'🏠', amountCents:312000, isDebit:true, category:'Rent', date: fmt(subDays(today,6)), isSubscription:false },
    { id:'t_k3', accountId:'a_k3', userId:'u_k', merchant:"Teachers Pay Teachers", merchantIcon:'📚', amountCents:2900, isDebit:true, category:'Education', date: fmt(subDays(today,8)), isSubscription:false },
    { id:'t_k4', accountId:'a_k1', userId:'u_k', merchant:"Trader Joe's", merchantIcon:'🛒', amountCents:11200, isDebit:true, category:'Food', date: fmt(subDays(today,10)), isSubscription:false },
    { id:'t_k5', accountId:'a_k3', userId:'u_k', merchant:'Disney+', merchantIcon:'🏰', amountCents:1399, isDebit:true, category:'Entertainment', date: fmt(subDays(today,14)), isSubscription:true },
  ],
  bills: [
    { id:'b_k1', userId:'u_k', name:'Rent', icon:'🏠', amountCents:312000, dueDate: fmt(addDays(today,18)), source:'manual', status:'upcoming', accountId:'a_k1', color:'#ffb347' },
    { id:'b_k2', userId:'u_k', name:'Capital One', icon:'💳', amountCents:120000, dueDate: fmt(addDays(today,9)), source:'email', status:'due_soon', accountId:'a_k1', color:'#ff5252' },
    { id:'b_k3', userId:'u_k', name:'Student Loan', icon:'🎓', amountCents:28000, dueDate: fmt(addDays(today,15)), source:'email', status:'upcoming', accountId:'a_k1', color:'#5b8dff' },
  ],
  subscriptions: [
    { id:'s_k1', userId:'u_k', name:'Spotify', icon:'🎵', amountCents:1099, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,12)), category:'Entertainment', isWaste:false, iconBg:'rgba(30,215,96,0.10)' },
    { id:'s_k2', userId:'u_k', name:'Netflix', icon:'📺', amountCents:1799, billingCycle:'monthly', lastUsedDaysAgo:3, nextBillingDate: fmt(addDays(today,20)), category:'Entertainment', isWaste:false, iconBg:'rgba(229,9,20,0.12)' },
    { id:'s_k3', userId:'u_k', name:'Disney+', icon:'🏰', amountCents:1399, billingCycle:'monthly', lastUsedDaysAgo:1, nextBillingDate: fmt(addDays(today,14)), category:'Entertainment', isWaste:false, iconBg:'rgba(17,60,110,0.12)' },
    { id:'s_k4', userId:'u_k', name:'iCloud 200GB', icon:'☁️', amountCents:299, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,7)), category:'Storage', isWaste:false, iconBg:'rgba(91,141,255,0.12)' },
    { id:'s_k5', userId:'u_k', name:'Calm App', icon:'🌊', amountCents:1499, billingCycle:'monthly', lastUsedDaysAgo:44, nextBillingDate: fmt(addDays(today,18)), category:'Health', isWaste:true, iconBg:'rgba(0,150,200,0.10)' },
  ],
  alerts: [
    { id:'al_k1', userId:'u_k', type:'success', icon:'🎓', title:'Emergency fund: 3 months reached!', description:"You hit $24K — that's 3 months of expenses. Great milestone, Kim!", timeAgo:'This week', isRead:false, amountCents:2400000 },
    { id:'al_k2', userId:'u_k', type:'danger', icon:'💳', title:'Capital One due in 9 days', description:'$1,200 due. Pay from First Republic Checking?', timeAgo:'Today', isRead:false, actionLabel:'Pay Now →', amountCents:120000 },
    { id:'al_k3', userId:'u_k', type:'warning', icon:'🌊', title:'Calm unused 44 days', description:'$14.99/mo with no sessions. Cancel to save $180/yr.', timeAgo:'2 days ago', isRead:false, actionLabel:'Cancel →', amountCents:1499 },
  ],
  cashflow: buildCashflow('u_k', 12000, 7800),
  projection: { thirtyDay: 4200, sixtyDay: 8100, ninetyDay: 12400 },
  trip: {
    id:'trip_k1', userId:'u_k', name:'Hawaii Summer Trip', destination:'LAX → Honolulu',
    startDate: fmt(addDays(today,45)), endDate: fmt(addDays(today,52)), nights:7, travelers:1,
    budgetCents:400000, spentCents:180000, isOnTrack:true, detectedFromEmail:true,
    categories: [
      { icon:'✈️', label:'FLIGHTS', spentCents:120000, budgetCents:140000, fillColor:'#5b8dff' },
      { icon:'🏨', label:'HOTEL', spentCents:60000, budgetCents:160000, fillColor:'#a78bfa' },
      { icon:'🍍', label:'FOOD', spentCents:0, budgetCents:60000, fillColor:'#ffb347' },
      { icon:'🏄', label:'ACTIVITIES', spentCents:0, budgetCents:40000, fillColor:'#00f5b0' },
    ],
    itinerary: [
      { date: fmt(addDays(today,45)), event:'Depart LAX → HNL', icon:'✈️', amountCents:120000, isCovered:true },
      { date: fmt(addDays(today,45)), event:'Sheraton Waikiki check-in', icon:'🏨', amountCents:60000, isCovered:true },
      { date: fmt(addDays(today,52)), event:'Return HNL → LAX', icon:'✈️', amountCents:0, isCovered:false },
    ],
  },
  netWorthCents: 9130000,
  safeToSpendCents: 410000,
  monthlyIncomeCents: 1200000,
  monthlySpendCents: 780000,
  subscriptionsTotalMonthlyCents: 6095,
  subscriptionsWastedMonthlyCents: 1499,
  sparklineData: [0.40, 0.46, 0.50, 0.55, 0.60, 0.65],
};

// ═══════════════════════════════════════════════════════════════════════════════
// L — Leo Lopez  |  Lyft/Gig Worker · Chime · Free
// ═══════════════════════════════════════════════════════════════════════════════
const L: UserFinancialProfile = {
  user: { id:'u_l', name:'Leo Lopez', email:'leo@example.com', avatarInitials:'LL',
    planTier:'free', bankName:'Chime', bankColor:'#00d4a1',
    onboardedAt: fmt(subDays(today,7)), greeting:'Leo' },
  accounts: [
    { id:'a_l1', userId:'u_l', name:'Chime Spending', type:'checking', institution:'Chime',
      balanceCents:42000, color:'#00f5b0', logoAbbrev:'CHIM', updatedAt: fmt(today) },
    { id:'a_l2', userId:'u_l', name:'Chime Savings', type:'savings', institution:'Chime',
      balanceCents:0, color:'#5b8dff', logoAbbrev:'CHIM', updatedAt: fmt(today) },
    { id:'a_l3', userId:'u_l', name:'Capital One', type:'credit', institution:'Capital One',
      balanceCents:-18000, dueDate: fmt(addDays(today,4)), color:'#ffb347', logoAbbrev:'CAPO', updatedAt: fmt(today) },
  ],
  transactions: [
    { id:'t_l1', accountId:'a_l1', userId:'u_l', merchant:'Lyft Driver Earnings', merchantIcon:'🚗', amountCents:84000, isDebit:false, category:'Income', date: fmt(subDays(today,2)), isSubscription:false },
    { id:'t_l2', accountId:'a_l1', userId:'u_l', merchant:'Gas Station', merchantIcon:'⛽', amountCents:8400, isDebit:true, category:'Transport', date: fmt(subDays(today,3)), isSubscription:false },
    { id:'t_l3', accountId:'a_l1', userId:'u_l', merchant:"McDonald's", merchantIcon:'🍟', amountCents:1200, isDebit:true, category:'Food', date: fmt(subDays(today,5)), isSubscription:false },
    { id:'t_l4', accountId:'a_l1', userId:'u_l', merchant:'Spotify', merchantIcon:'🎵', amountCents:1099, isDebit:true, category:'Entertainment', date: fmt(subDays(today,8)), isSubscription:true },
    { id:'t_l5', accountId:'a_l1', userId:'u_l', merchant:'Phone Bill', merchantIcon:'📱', amountCents:4500, isDebit:true, category:'Utilities', date: fmt(subDays(today,10)), isSubscription:false },
  ],
  bills: [
    { id:'b_l1', userId:'u_l', name:'Capital One', icon:'💳', amountCents:18000, dueDate: fmt(addDays(today,4)), source:'email', status:'due_soon', accountId:'a_l1', color:'#ff5252' },
    { id:'b_l2', userId:'u_l', name:'Phone', icon:'📱', amountCents:4500, dueDate: fmt(addDays(today,12)), source:'email', status:'upcoming', accountId:'a_l1', color:'#5b8dff' },
    { id:'b_l3', userId:'u_l', name:'Gas (weekly avg)', icon:'⛽', amountCents:8400, dueDate: fmt(addDays(today,7)), source:'manual', status:'due_soon', accountId:'a_l1', color:'#ffb347' },
  ],
  subscriptions: [
    { id:'s_l1', userId:'u_l', name:'Spotify', icon:'🎵', amountCents:1099, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,8)), category:'Entertainment', isWaste:false, iconBg:'rgba(30,215,96,0.10)' },
    { id:'s_l2', userId:'u_l', name:'Netflix', icon:'📺', amountCents:1799, billingCycle:'monthly', lastUsedDaysAgo:14, nextBillingDate: fmt(addDays(today,20)), category:'Entertainment', isWaste:false, iconBg:'rgba(229,9,20,0.12)' },
    { id:'s_l3', userId:'u_l', name:'Xbox Game Pass', icon:'🎮', amountCents:1499, billingCycle:'monthly', lastUsedDaysAgo:60, nextBillingDate: fmt(addDays(today,3)), category:'Entertainment', isWaste:true, iconBg:'rgba(16,124,16,0.12)' },
  ],
  alerts: [
    { id:'al_l1', userId:'u_l', type:'danger', icon:'⚠️', title:'Low balance warning', description:'Chime Spending at $420. Capital One $180 due in 4 days — cutting it close.', timeAgo:'Today', isRead:false, amountCents:42000 },
    { id:'al_l2', userId:'u_l', type:'danger', icon:'💳', title:'Capital One due in 4 days', description:'$180 due. Chime balance: $420. Recommend paying now.', timeAgo:'Today', isRead:false, actionLabel:'Pay Now →', amountCents:18000 },
    { id:'al_l3', userId:'u_l', type:'warning', icon:'🎮', title:'Xbox Game Pass unused 60 days', description:'$14.99/mo. No gaming in 2 months. Cancel to save $180/yr.', timeAgo:'2 days ago', isRead:false, actionLabel:'Cancel →', amountCents:1499 },
  ],
  cashflow: buildCashflow('u_l', 2200, 1900),
  projection: { thirtyDay: 300, sixtyDay: 560, ninetyDay: 790 },
  trip: null,
  netWorthCents: 420000,
  safeToSpendCents: 18000,
  monthlyIncomeCents: 220000,
  monthlySpendCents: 190000,
  subscriptionsTotalMonthlyCents: 4397,
  subscriptionsWastedMonthlyCents: 1499,
  sparklineData: [0.10, 0.12, 0.14, 0.13, 0.15, 0.17],
};

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

// ═══════════════════════════════════════════════════════════════════════════════
// N — Nina Nguyen  |  Hospital Nurse · Ally Bank · Free
// ═══════════════════════════════════════════════════════════════════════════════
const N: UserFinancialProfile = {
  user: { id:'u_n', name:'Nina Nguyen', email:'nina@example.com', avatarInitials:'NN',
    planTier:'free', bankName:'Ally Bank', bankColor:'#7b2ff7',
    onboardedAt: fmt(subDays(today,45)), greeting:'Nina' },
  accounts: [
    { id:'a_n1', userId:'u_n', name:'Ally Checking', type:'checking', institution:'Ally',
      balanceCents:284000, color:'#00f5b0', logoAbbrev:'ALLY', updatedAt: fmt(today) },
    { id:'a_n2', userId:'u_n', name:'Ally HYSA', type:'savings', institution:'Ally',
      balanceCents:420000, interestRate:4.8, color:'#5b8dff', logoAbbrev:'ALLY', updatedAt: fmt(today) },
    { id:'a_n3', userId:'u_n', name:'Visa Signature', type:'credit', institution:'Visa',
      balanceCents:-38000, dueDate: fmt(addDays(today,8)), color:'#ffb347', logoAbbrev:'VISA', updatedAt: fmt(today) },
  ],
  transactions: [
    { id:'t_n1', accountId:'a_n1', userId:'u_n', merchant:'Regional Hospital Payroll', merchantIcon:'💵', amountCents:560000, isDebit:false, category:'Income', date: fmt(subDays(today,4)), isSubscription:false },
    { id:'t_n2', accountId:'a_n1', userId:'u_n', merchant:'Rent', merchantIcon:'🏠', amountCents:168000, isDebit:true, category:'Rent', date: fmt(subDays(today,6)), isSubscription:false },
    { id:'t_n3', accountId:'a_n1', userId:'u_n', merchant:'Walgreens', merchantIcon:'💊', amountCents:3200, isDebit:true, category:'Health', date: fmt(subDays(today,8)), isSubscription:false },
    { id:'t_n4', accountId:'a_n3', userId:'u_n', merchant:'ClassPass', merchantIcon:'💪', amountCents:7900, isDebit:true, category:'Health', date: fmt(subDays(today,10)), isSubscription:true },
    { id:'t_n5', accountId:'a_n1', userId:'u_n', merchant:"Trader Joe's", merchantIcon:'🛒', amountCents:9600, isDebit:true, category:'Food', date: fmt(subDays(today,12)), isSubscription:false },
  ],
  bills: [
    { id:'b_n1', userId:'u_n', name:'Rent', icon:'🏠', amountCents:168000, dueDate: fmt(addDays(today,20)), source:'manual', status:'upcoming', accountId:'a_n1', color:'#ffb347' },
    { id:'b_n2', userId:'u_n', name:'Visa Card', icon:'💳', amountCents:38000, dueDate: fmt(addDays(today,8)), source:'email', status:'due_soon', accountId:'a_n1', color:'#ff5252' },
    { id:'b_n3', userId:'u_n', name:'Student Loan', icon:'🎓', amountCents:32000, dueDate: fmt(addDays(today,14)), source:'email', status:'upcoming', accountId:'a_n1', color:'#5b8dff' },
  ],
  subscriptions: [
    { id:'s_n1', userId:'u_n', name:'ClassPass', icon:'💪', amountCents:7900, billingCycle:'monthly', lastUsedDaysAgo:29, nextBillingDate: fmt(addDays(today,10)), category:'Health', isWaste:true, iconBg:'rgba(91,141,255,0.12)' },
    { id:'s_n2', userId:'u_n', name:'Netflix', icon:'📺', amountCents:1799, billingCycle:'monthly', lastUsedDaysAgo:2, nextBillingDate: fmt(addDays(today,12)), category:'Entertainment', isWaste:false, iconBg:'rgba(229,9,20,0.12)' },
    { id:'s_n3', userId:'u_n', name:'Spotify', icon:'🎵', amountCents:1099, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,18)), category:'Entertainment', isWaste:false, iconBg:'rgba(30,215,96,0.10)' },
    { id:'s_n4', userId:'u_n', name:'Calm', icon:'🧘', amountCents:1499, billingCycle:'monthly', lastUsedDaysAgo:55, nextBillingDate: fmt(addDays(today,5)), category:'Health', isWaste:true, iconBg:'rgba(100,150,255,0.10)' },
  ],
  alerts: [
    { id:'al_n1', userId:'u_n', type:'danger', icon:'💳', title:'Visa due in 8 days', description:'$380 due. Pay from Ally Checking (bal: $2,840)?', timeAgo:'3 hours ago', isRead:false, actionLabel:'Pay Now →', amountCents:38000 },
    { id:'al_n2', userId:'u_n', type:'warning', icon:'💪', title:'ClassPass unused 29 days', description:'$79/mo. No check-ins this month. Cancel to save $948/yr.', timeAgo:'Yesterday', isRead:false, actionLabel:'Cancel →', amountCents:7900 },
    { id:'al_n3', userId:'u_n', type:'warning', icon:'🧘', title:'Calm unused 55 days', description:'$14.99/mo, no sessions opened. Cancel to save $180/yr.', timeAgo:'2 days ago', isRead:false, actionLabel:'Cancel →', amountCents:1499 },
  ],
  cashflow: buildCashflow('u_n', 5600, 4200),
  projection: { thirtyDay: 1400, sixtyDay: 2700, ninetyDay: 4100 },
  trip: null,
  netWorthCents: 5210000,
  safeToSpendCents: 148000,
  monthlyIncomeCents: 560000,
  monthlySpendCents: 420000,
  subscriptionsTotalMonthlyCents: 12297,
  subscriptionsWastedMonthlyCents: 9399,
  sparklineData: [0.28, 0.32, 0.35, 0.38, 0.41, 0.45],
};

// ═══════════════════════════════════════════════════════════════════════════════
// O — Oscar Owens  |  Operations Director · Schwab · Premium
// ═══════════════════════════════════════════════════════════════════════════════
const O: UserFinancialProfile = {
  user: { id:'u_o', name:'Oscar Owens', email:'oscar@example.com', avatarInitials:'OO',
    planTier:'premium', bankName:'Schwab', bankColor:'#1a6ca8',
    onboardedAt: fmt(subDays(today,200)), greeting:'Oscar' },
  accounts: [
    { id:'a_o1', userId:'u_o', name:'Schwab Checking', type:'checking', institution:'Schwab',
      balanceCents:4800000, color:'#00f5b0', logoAbbrev:'SCHW', updatedAt: fmt(today) },
    { id:'a_o2', userId:'u_o', name:'Schwab HYSA', type:'savings', institution:'Schwab',
      balanceCents:12000000, interestRate:5.2, color:'#5b8dff', logoAbbrev:'SCHW', updatedAt: fmt(today) },
    { id:'a_o3', userId:'u_o', name:'Amex Platinum', type:'credit', institution:'Amex',
      balanceCents:-840000, dueDate: fmt(addDays(today,16)), color:'#ffb347', logoAbbrev:'AMEX', updatedAt: fmt(today) },
    { id:'a_o4', userId:'u_o', name:'Schwab Brokerage', type:'investment', institution:'Schwab',
      balanceCents:98000000, interestRate:11.4, color:'#a78bfa', logoAbbrev:'SCHW', updatedAt: fmt(today) },
  ],
  transactions: [
    { id:'t_o1', accountId:'a_o1', userId:'u_o', merchant:'MegaCorp Payroll', merchantIcon:'💵', amountCents:4200000, isDebit:false, category:'Income', date: fmt(subDays(today,3)), isSubscription:false },
    { id:'t_o2', accountId:'a_o3', userId:'u_o', merchant:'Capital Grille Dinner', merchantIcon:'🥩', amountCents:84000, isDebit:true, category:'Food', date: fmt(subDays(today,5)), isSubscription:false },
    { id:'t_o3', accountId:'a_o1', userId:'u_o', merchant:'Mortgage', merchantIcon:'🏠', amountCents:620000, isDebit:true, category:'Rent', date: fmt(subDays(today,7)), isSubscription:false },
    { id:'t_o4', accountId:'a_o3', userId:'u_o', merchant:'Bloomberg Terminal', merchantIcon:'📊', amountCents:34500, isDebit:true, category:'Business', date: fmt(subDays(today,10)), isSubscription:true },
    { id:'t_o5', accountId:'a_o1', userId:'u_o', merchant:'Tesla Charging', merchantIcon:'⚡', amountCents:3800, isDebit:true, category:'Transport', date: fmt(subDays(today,12)), isSubscription:false },
  ],
  bills: [
    { id:'b_o1', userId:'u_o', name:'Mortgage', icon:'🏠', amountCents:620000, dueDate: fmt(addDays(today,24)), source:'manual', status:'upcoming', accountId:'a_o1', color:'#ffb347' },
    { id:'b_o2', userId:'u_o', name:'Amex Platinum', icon:'💳', amountCents:840000, dueDate: fmt(addDays(today,16)), source:'email', status:'upcoming', accountId:'a_o1', color:'#ff5252' },
    { id:'b_o3', userId:'u_o', name:'HOA Fees', icon:'🏡', amountCents:84000, dueDate: fmt(addDays(today,5)), source:'manual', status:'due_soon', accountId:'a_o1', color:'#5b8dff' },
  ],
  subscriptions: [
    { id:'s_o1', userId:'u_o', name:'Bloomberg Terminal', icon:'📊', amountCents:34500, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,10)), category:'Business', isWaste:false, iconBg:'rgba(0,100,180,0.12)' },
    { id:'s_o2', userId:'u_o', name:'LinkedIn Premium', icon:'💼', amountCents:3999, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,18)), category:'Business', isWaste:false, iconBg:'rgba(0,119,181,0.12)' },
    { id:'s_o3', userId:'u_o', name:'WSJ Digital', icon:'📰', amountCents:3899, billingCycle:'monthly', lastUsedDaysAgo:1, nextBillingDate: fmt(addDays(today,22)), category:'News', isWaste:false, iconBg:'rgba(255,255,255,0.08)' },
    { id:'s_o4', userId:'u_o', name:'Netflix 4K', icon:'📺', amountCents:2299, billingCycle:'monthly', lastUsedDaysAgo:4, nextBillingDate: fmt(addDays(today,8)), category:'Entertainment', isWaste:false, iconBg:'rgba(229,9,20,0.12)' },
    { id:'s_o5', userId:'u_o', name:'Peloton', icon:'🚴', amountCents:4400, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,14)), category:'Health', isWaste:false, iconBg:'rgba(255,100,50,0.12)' },
  ],
  alerts: [
    { id:'al_o1', userId:'u_o', type:'success', icon:'📈', title:'Portfolio crossed $1M', description:'Schwab Brokerage hit $980K. Up 11.4% YTD — consider rebalancing allocation.', timeAgo:'Today', isRead:false, actionLabel:'Review →', amountCents:98000000 },
    { id:'al_o2', userId:'u_o', type:'danger', icon:'🏡', title:'HOA fees due in 5 days', description:'$840 HOA due. Schedule from Schwab Checking.', timeAgo:'Today', isRead:false, actionLabel:'Pay Now →', amountCents:84000 },
    { id:'al_o3', userId:'u_o', type:'info', icon:'💎', title:'Q4 bonus deposited', description:'$42,000 year-end bonus landed. Move to brokerage for tax-advantaged growth?', timeAgo:'3 days ago', isRead:true, actionLabel:'Invest →', amountCents:4200000 },
  ],
  cashflow: buildCashflow('u_o', 42000, 18000),
  projection: { thirtyDay: 24000, sixtyDay: 48000, ninetyDay: 72000 },
  trip: {
    id:'trip_o1', userId:'u_o', name:'Miami Leadership Summit', destination:'JFK → Miami',
    startDate: fmt(addDays(today,8)), endDate: fmt(addDays(today,11)), nights:3, travelers:1,
    budgetCents:280000, spentCents:196000, isOnTrack:true, detectedFromEmail:true,
    categories: [
      { icon:'✈️', label:'FLIGHTS', spentCents:84000, budgetCents:100000, fillColor:'#5b8dff' },
      { icon:'🏨', label:'HOTEL', spentCents:112000, budgetCents:120000, fillColor:'#a78bfa' },
      { icon:'🥩', label:'DINING', spentCents:0, budgetCents:40000, fillColor:'#ffb347' },
      { icon:'🚗', label:'TRANSPORT', spentCents:0, budgetCents:20000, fillColor:'#00f5b0' },
    ],
    itinerary: [
      { date: fmt(addDays(today,8)), event:'Depart JFK → MIA', icon:'✈️', amountCents:84000, isCovered:true },
      { date: fmt(addDays(today,8)), event:'Four Seasons Miami check-in', icon:'🏨', amountCents:112000, isCovered:true },
      { date: fmt(addDays(today,9)), event:'Leadership Summit Day 1', icon:'📊', amountCents:0, isCovered:true },
      { date: fmt(addDays(today,11)), event:'Return MIA → JFK', icon:'✈️', amountCents:0, isCovered:false },
    ],
  },
  netWorthCents: 124000000,
  safeToSpendCents: 2400000,
  monthlyIncomeCents: 4200000,
  monthlySpendCents: 1800000,
  subscriptionsTotalMonthlyCents: 49097,
  subscriptionsWastedMonthlyCents: 0,
  sparklineData: [0.80, 0.83, 0.86, 0.88, 0.91, 0.94],
};

// ═══════════════════════════════════════════════════════════════════════════════
// P — Priya Patel  |  Product Manager · Chase Bank · Premium
// ═══════════════════════════════════════════════════════════════════════════════
const P: UserFinancialProfile = {
  user: { id:'u_p', name:'Priya Patel', email:'priya@example.com', avatarInitials:'PP',
    planTier:'premium', bankName:'Chase Bank', bankColor:'#003087',
    onboardedAt: fmt(subDays(today,90)), greeting:'Priya' },
  accounts: [
    { id:'a_p1', userId:'u_p', name:'Chase Checking', type:'checking', institution:'Chase',
      balanceCents:680000, color:'#00f5b0', logoAbbrev:'CHASE', updatedAt: fmt(today) },
    { id:'a_p2', userId:'u_p', name:'Marcus HYSA', type:'savings', institution:'Marcus',
      balanceCents:2800000, interestRate:5.0, color:'#5b8dff', logoAbbrev:'MARC', updatedAt: fmt(today) },
    { id:'a_p3', userId:'u_p', name:'Chase Sapphire', type:'credit', institution:'Chase',
      balanceCents:-120000, dueDate: fmt(addDays(today,11)), color:'#ffb347', logoAbbrev:'CSR', updatedAt: fmt(today) },
    { id:'a_p4', userId:'u_p', name:'Fidelity Roth IRA', type:'investment', institution:'Fidelity',
      balanceCents:12000000, interestRate:10.2, color:'#a78bfa', logoAbbrev:'FIDL', updatedAt: fmt(today) },
  ],
  transactions: [
    { id:'t_p1', accountId:'a_p1', userId:'u_p', merchant:'ProductCo Payroll', merchantIcon:'💵', amountCents:1240000, isDebit:false, category:'Income', date: fmt(subDays(today,4)), isSubscription:false },
    { id:'t_p2', accountId:'a_p1', userId:'u_p', merchant:'Rent', merchantIcon:'🏠', amountCents:496000, isDebit:true, category:'Rent', date: fmt(subDays(today,6)), isSubscription:false },
    { id:'t_p3', accountId:'a_p3', userId:'u_p', merchant:'Notion', merchantIcon:'📝', amountCents:1600, isDebit:true, category:'Business', date: fmt(subDays(today,8)), isSubscription:true },
    { id:'t_p4', accountId:'a_p3', userId:'u_p', merchant:'Figma', merchantIcon:'🎨', amountCents:1500, isDebit:true, category:'Business', date: fmt(subDays(today,10)), isSubscription:true },
    { id:'t_p5', accountId:'a_p1', userId:'u_p', merchant:'Sweetgreen', merchantIcon:'🥗', amountCents:1840, isDebit:true, category:'Food', date: fmt(subDays(today,13)), isSubscription:false },
    { id:'t_p6', accountId:'a_p3', userId:'u_p', merchant:'Medium Membership', merchantIcon:'📖', amountCents:500, isDebit:true, category:'News', date: fmt(subDays(today,17)), isSubscription:true },
  ],
  bills: [
    { id:'b_p1', userId:'u_p', name:'Rent', icon:'🏠', amountCents:496000, dueDate: fmt(addDays(today,20)), source:'manual', status:'upcoming', accountId:'a_p1', color:'#ffb347' },
    { id:'b_p2', userId:'u_p', name:'Chase Sapphire', icon:'💳', amountCents:120000, dueDate: fmt(addDays(today,11)), source:'email', status:'upcoming', accountId:'a_p1', color:'#ff5252' },
    { id:'b_p3', userId:'u_p', name:'Electric', icon:'⚡', amountCents:14400, dueDate: fmt(addDays(today,6)), source:'email', status:'due_soon', accountId:'a_p1', color:'#5b8dff' },
  ],
  subscriptions: [
    { id:'s_p1', userId:'u_p', name:'Notion', icon:'📝', amountCents:1600, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,8)), category:'Productivity', isWaste:false, iconBg:'rgba(255,255,255,0.08)' },
    { id:'s_p2', userId:'u_p', name:'Figma', icon:'🎨', amountCents:1500, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,10)), category:'Design', isWaste:false, iconBg:'rgba(162,89,255,0.12)' },
    { id:'s_p3', userId:'u_p', name:'Spotify', icon:'🎵', amountCents:1099, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,15)), category:'Entertainment', isWaste:false, iconBg:'rgba(30,215,96,0.10)' },
    { id:'s_p4', userId:'u_p', name:'Apple TV+', icon:'🍎', amountCents:999, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,20)), category:'Entertainment', isWaste:false, iconBg:'rgba(255,255,255,0.08)' },
    { id:'s_p5', userId:'u_p', name:'Medium', icon:'📖', amountCents:500, billingCycle:'monthly', lastUsedDaysAgo:42, nextBillingDate: fmt(addDays(today,17)), category:'News', isWaste:true, iconBg:'rgba(255,255,255,0.06)' },
  ],
  alerts: [
    { id:'al_p1', userId:'u_p', type:'success', icon:'💎', title:'Savings milestone: $28,000!', description:"You hit $28K in Marcus HYSA. You're 1 month ahead of your $30K target.", timeAgo:'This week', isRead:false, amountCents:2800000 },
    { id:'al_p2', userId:'u_p', type:'danger', icon:'⚡', title:'Electric bill due in 6 days', description:'$144 due. Pay from Chase Checking.', timeAgo:'Today', isRead:false, actionLabel:'Pay Now →', amountCents:14400 },
    { id:'al_p3', userId:'u_p', type:'warning', icon:'📖', title:'Medium unused 42 days', description:'$5/mo with no reads. Cancel to save $60/yr.', timeAgo:'3 days ago', isRead:false, actionLabel:'Cancel →', amountCents:500 },
  ],
  cashflow: buildCashflow('u_p', 12400, 7600),
  projection: { thirtyDay: 3200, sixtyDay: 6100, ninetyDay: 9400 },
  trip: {
    id:'trip_p1', userId:'u_p', name:'Product Summit NYC', destination:'SEA → New York',
    startDate: fmt(addDays(today,12)), endDate: fmt(addDays(today,15)), nights:3, travelers:1,
    budgetCents:200000, spentCents:98000, isOnTrack:true, detectedFromEmail:true,
    categories: [
      { icon:'✈️', label:'FLIGHTS', spentCents:54000, budgetCents:70000, fillColor:'#5b8dff' },
      { icon:'🏨', label:'HOTEL', spentCents:44000, budgetCents:90000, fillColor:'#a78bfa' },
      { icon:'🥗', label:'FOOD', spentCents:0, budgetCents:30000, fillColor:'#ffb347' },
      { icon:'🚖', label:'TRANSPORT', spentCents:0, budgetCents:10000, fillColor:'#00f5b0' },
    ],
    itinerary: [
      { date: fmt(addDays(today,12)), event:'Depart SEA → JFK', icon:'✈️', amountCents:54000, isCovered:true },
      { date: fmt(addDays(today,12)), event:'Ace Hotel Brooklyn check-in', icon:'🏨', amountCents:44000, isCovered:true },
      { date: fmt(addDays(today,13)), event:'ProductCon NYC — Day 1', icon:'📱', amountCents:0, isCovered:true },
      { date: fmt(addDays(today,15)), event:'Return JFK → SEA', icon:'✈️', amountCents:0, isCovered:false },
    ],
  },
  netWorthCents: 17850000,
  safeToSpendCents: 320000,
  monthlyIncomeCents: 1240000,
  monthlySpendCents: 760000,
  subscriptionsTotalMonthlyCents: 5698,
  subscriptionsWastedMonthlyCents: 500,
  sparklineData: [0.55, 0.60, 0.64, 0.68, 0.72, 0.77],
};

// ═══════════════════════════════════════════════════════════════════════════════
// Q — Quinn Quinn  |  College Student · Chime · Free
// ═══════════════════════════════════════════════════════════════════════════════
const Q: UserFinancialProfile = {
  user: { id:'u_q', name:'Quinn Quinn', email:'quinn@example.com', avatarInitials:'QQ',
    planTier:'free', bankName:'Chime', bankColor:'#00d4a1',
    onboardedAt: fmt(subDays(today,14)), greeting:'Quinn' },
  accounts: [
    { id:'a_q1', userId:'u_q', name:'Chime Spending', type:'checking', institution:'Chime',
      balanceCents:89000, color:'#00f5b0', logoAbbrev:'CHIM', updatedAt: fmt(today) },
    { id:'a_q2', userId:'u_q', name:'Chime Savings', type:'savings', institution:'Chime',
      balanceCents:0, color:'#5b8dff', logoAbbrev:'CHIM', updatedAt: fmt(today) },
  ],
  transactions: [
    { id:'t_q1', accountId:'a_q1', userId:'u_q', merchant:'Part-time Café Job', merchantIcon:'☕', amountCents:96000, isDebit:false, category:'Income', date: fmt(subDays(today,5)), isSubscription:false },
    { id:'t_q2', accountId:'a_q1', userId:'u_q', merchant:'Rent (room share)', merchantIcon:'🏠', amountCents:64000, isDebit:true, category:'Rent', date: fmt(subDays(today,7)), isSubscription:false },
    { id:'t_q3', accountId:'a_q1', userId:'u_q', merchant:'Campus Dining', merchantIcon:'🍕', amountCents:3200, isDebit:true, category:'Food', date: fmt(subDays(today,9)), isSubscription:false },
    { id:'t_q4', accountId:'a_q1', userId:'u_q', merchant:'Spotify Student', merchantIcon:'🎵', amountCents:529, isDebit:true, category:'Entertainment', date: fmt(subDays(today,12)), isSubscription:true },
    { id:'t_q5', accountId:'a_q1', userId:'u_q', merchant:'Amazon Prime Student', merchantIcon:'📦', amountCents:749, isDebit:true, category:'Shopping', date: fmt(subDays(today,15)), isSubscription:true },
  ],
  bills: [
    { id:'b_q1', userId:'u_q', name:'Rent (room share)', icon:'🏠', amountCents:64000, dueDate: fmt(addDays(today,18)), source:'manual', status:'upcoming', accountId:'a_q1', color:'#ffb347' },
    { id:'b_q2', userId:'u_q', name:'Phone Plan', icon:'📱', amountCents:3500, dueDate: fmt(addDays(today,6)), source:'email', status:'due_soon', accountId:'a_q1', color:'#5b8dff' },
    { id:'b_q3', userId:'u_q', name:'Textbooks', icon:'📚', amountCents:18000, dueDate: fmt(addDays(today,14)), source:'manual', status:'upcoming', accountId:'a_q1', color:'#a78bfa' },
  ],
  subscriptions: [
    { id:'s_q1', userId:'u_q', name:'Spotify Student', icon:'🎵', amountCents:529, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,12)), category:'Entertainment', isWaste:false, iconBg:'rgba(30,215,96,0.10)' },
    { id:'s_q2', userId:'u_q', name:'Amazon Prime Student', icon:'📦', amountCents:749, billingCycle:'monthly', lastUsedDaysAgo:1, nextBillingDate: fmt(addDays(today,15)), category:'Shopping', isWaste:false, iconBg:'rgba(255,153,0,0.10)' },
    { id:'s_q3', userId:'u_q', name:'Apple TV+', icon:'🍎', amountCents:999, billingCycle:'monthly', lastUsedDaysAgo:38, nextBillingDate: fmt(addDays(today,7)), category:'Entertainment', isWaste:true, iconBg:'rgba(255,255,255,0.08)' },
    { id:'s_q4', userId:'u_q', name:'Discord Nitro', icon:'🎮', amountCents:999, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,20)), category:'Gaming', isWaste:false, iconBg:'rgba(88,101,242,0.12)' },
  ],
  alerts: [
    { id:'al_q1', userId:'u_q', type:'danger', icon:'📱', title:'Phone plan due in 6 days', description:'$35 due. Only $890 in Chime — keep an eye on your balance.', timeAgo:'Today', isRead:false, actionLabel:'Pay Now →', amountCents:3500 },
    { id:'al_q2', userId:'u_q', type:'warning', icon:'🍎', title:'Apple TV+ unused 38 days', description:"$9.99/mo and nothing watched. Cancel and save $120/yr.", timeAgo:'Yesterday', isRead:false, actionLabel:'Cancel →', amountCents:999 },
    { id:'al_q3', userId:'u_q', type:'info', icon:'☕', title:'Tip: start a $25/mo savings habit', description:"Even $25/mo in a HYSA grows to $1,500 in 5 years with interest. You've got this.", timeAgo:'This week', isRead:true, amountCents:0 },
  ],
  cashflow: buildCashflow('u_q', 3200, 2900),
  projection: { thirtyDay: 300, sixtyDay: 580, ninetyDay: 840 },
  trip: null,
  netWorthCents: 890000,
  safeToSpendCents: 34000,
  monthlyIncomeCents: 320000,
  monthlySpendCents: 290000,
  subscriptionsTotalMonthlyCents: 3276,
  subscriptionsWastedMonthlyCents: 999,
  sparklineData: [0.08, 0.10, 0.09, 0.12, 0.11, 0.14],
};

// ═══════════════════════════════════════════════════════════════════════════════
// R — Ryan Reed  |  Real Estate Agent · Bank of America · Premium
// ═══════════════════════════════════════════════════════════════════════════════
const R: UserFinancialProfile = {
  user: { id:'u_r', name:'Ryan Reed', email:'ryan@example.com', avatarInitials:'RR',
    planTier:'premium', bankName:'Bank of America', bankColor:'#c0392b',
    onboardedAt: fmt(subDays(today,150)), greeting:'Ryan' },
  accounts: [
    { id:'a_r1', userId:'u_r', name:'BoA Checking', type:'checking', institution:'Bank of America',
      balanceCents:420000, color:'#00f5b0', logoAbbrev:'BOFA', updatedAt: fmt(today) },
    { id:'a_r2', userId:'u_r', name:'BoA Savings', type:'savings', institution:'Bank of America',
      balanceCents:1800000, interestRate:4.6, color:'#5b8dff', logoAbbrev:'BOFA', updatedAt: fmt(today) },
    { id:'a_r3', userId:'u_r', name:'BoA Premium Rewards', type:'credit', institution:'Bank of America',
      balanceCents:-96000, dueDate: fmt(addDays(today,13)), color:'#ffb347', logoAbbrev:'BOFA', updatedAt: fmt(today) },
    { id:'a_r4', userId:'u_r', name:'Vanguard IRA', type:'investment', institution:'Vanguard',
      balanceCents:3200000, interestRate:8.4, color:'#a78bfa', logoAbbrev:'VANG', updatedAt: fmt(today) },
  ],
  transactions: [
    { id:'t_r1', accountId:'a_r1', userId:'u_r', merchant:'RE Commission — 123 Oak St', merchantIcon:'🏡', amountCents:2400000, isDebit:false, category:'Income', date: fmt(subDays(today,3)), isSubscription:false },
    { id:'t_r2', accountId:'a_r1', userId:'u_r', merchant:'Mortgage', merchantIcon:'🏠', amountCents:284000, isDebit:true, category:'Rent', date: fmt(subDays(today,5)), isSubscription:false },
    { id:'t_r3', accountId:'a_r3', userId:'u_r', merchant:'Zillow Premier Agent', merchantIcon:'🏡', amountCents:59900, isDebit:true, category:'Business', date: fmt(subDays(today,8)), isSubscription:true },
    { id:'t_r4', accountId:'a_r3', userId:'u_r', merchant:'DocuSign', merchantIcon:'✍️', amountCents:4500, isDebit:true, category:'Business', date: fmt(subDays(today,10)), isSubscription:true },
    { id:'t_r5', accountId:'a_r1', userId:'u_r', merchant:'Home Depot', merchantIcon:'🔨', amountCents:28000, isDebit:true, category:'Shopping', date: fmt(subDays(today,14)), isSubscription:false },
  ],
  bills: [
    { id:'b_r1', userId:'u_r', name:'Mortgage', icon:'🏠', amountCents:284000, dueDate: fmt(addDays(today,22)), source:'manual', status:'upcoming', accountId:'a_r1', color:'#ffb347' },
    { id:'b_r2', userId:'u_r', name:'BoA Credit Card', icon:'💳', amountCents:96000, dueDate: fmt(addDays(today,13)), source:'email', status:'upcoming', accountId:'a_r1', color:'#ff5252' },
    { id:'b_r3', userId:'u_r', name:'MLS Dues', icon:'🏡', amountCents:24000, dueDate: fmt(addDays(today,7)), source:'email', status:'due_soon', accountId:'a_r1', color:'#5b8dff' },
  ],
  subscriptions: [
    { id:'s_r1', userId:'u_r', name:'Zillow Premier Agent', icon:'🏡', amountCents:59900, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,8)), category:'Business', isWaste:false, iconBg:'rgba(0,106,255,0.12)' },
    { id:'s_r2', userId:'u_r', name:'DocuSign', icon:'✍️', amountCents:4500, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,10)), category:'Business', isWaste:false, iconBg:'rgba(255,180,0,0.12)' },
    { id:'s_r3', userId:'u_r', name:'Google Workspace', icon:'📧', amountCents:1400, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,20)), category:'Business', isWaste:false, iconBg:'rgba(66,133,244,0.12)' },
    { id:'s_r4', userId:'u_r', name:'Spotify', icon:'🎵', amountCents:1099, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,18)), category:'Entertainment', isWaste:false, iconBg:'rgba(30,215,96,0.10)' },
    { id:'s_r5', userId:'u_r', name:'BombBomb Video', icon:'🎥', amountCents:3900, billingCycle:'monthly', lastUsedDaysAgo:48, nextBillingDate: fmt(addDays(today,5)), category:'Business', isWaste:true, iconBg:'rgba(255,100,50,0.12)' },
  ],
  alerts: [
    { id:'al_r1', userId:'u_r', type:'success', icon:'🏡', title:'Commission deposited: $24,000', description:'123 Oak St closed. After broker split: $24K. Great month, Ryan!', timeAgo:'3 days ago', isRead:false, amountCents:2400000 },
    { id:'al_r2', userId:'u_r', type:'danger', icon:'🏡', title:'MLS dues due in 7 days', description:'$240 annual dues due. Pay from BoA Checking.', timeAgo:'Today', isRead:false, actionLabel:'Pay Now →', amountCents:24000 },
    { id:'al_r3', userId:'u_r', type:'warning', icon:'🎥', title:'BombBomb unused 48 days', description:'$39/mo video tool with no sends. Cancel to save $468/yr.', timeAgo:'Yesterday', isRead:false, actionLabel:'Cancel →', amountCents:3900 },
  ],
  cashflow: buildCashflow('u_r', 9400, 6200),
  projection: { thirtyDay: 1980, sixtyDay: 3800, ninetyDay: 5600 },
  trip: null,
  netWorthCents: 8870000,
  safeToSpendCents: 198000,
  monthlyIncomeCents: 940000,
  monthlySpendCents: 620000,
  subscriptionsTotalMonthlyCents: 70799,
  subscriptionsWastedMonthlyCents: 3900,
  sparklineData: [0.38, 0.43, 0.47, 0.51, 0.55, 0.60],
};

// ═══════════════════════════════════════════════════════════════════════════════
// S — Sara Singh  |  Social Worker · TD Bank · Free
// ═══════════════════════════════════════════════════════════════════════════════
const S: UserFinancialProfile = {
  user: { id:'u_s', name:'Sara Singh', email:'sara@example.com', avatarInitials:'SS',
    planTier:'free', bankName:'TD Bank', bankColor:'#1a9c3e',
    onboardedAt: fmt(subDays(today,75)), greeting:'Sara' },
  accounts: [
    { id:'a_s1', userId:'u_s', name:'TD Checking', type:'checking', institution:'TD Bank',
      balanceCents:184000, color:'#00f5b0', logoAbbrev:'TDBN', updatedAt: fmt(today) },
    { id:'a_s2', userId:'u_s', name:'TD Savings', type:'savings', institution:'TD Bank',
      balanceCents:480000, interestRate:3.8, color:'#5b8dff', logoAbbrev:'TDBN', updatedAt: fmt(today) },
    { id:'a_s3', userId:'u_s', name:'TD Visa', type:'credit', institution:'TD Bank',
      balanceCents:-52000, dueDate: fmt(addDays(today,9)), color:'#ffb347', logoAbbrev:'TDBN', updatedAt: fmt(today) },
  ],
  transactions: [
    { id:'t_s1', accountId:'a_s1', userId:'u_s', merchant:'City Agency Payroll', merchantIcon:'💵', amountCents:420000, isDebit:false, category:'Income', date: fmt(subDays(today,4)), isSubscription:false },
    { id:'t_s2', accountId:'a_s1', userId:'u_s', merchant:'Rent', merchantIcon:'🏠', amountCents:168000, isDebit:true, category:'Rent', date: fmt(subDays(today,6)), isSubscription:false },
    { id:'t_s3', accountId:'a_s1', userId:'u_s', merchant:'Aldi', merchantIcon:'🛒', amountCents:7200, isDebit:true, category:'Food', date: fmt(subDays(today,8)), isSubscription:false },
    { id:'t_s4', accountId:'a_s3', userId:'u_s', merchant:'Headspace', merchantIcon:'🧘', amountCents:1299, isDebit:true, category:'Health', date: fmt(subDays(today,10)), isSubscription:true },
    { id:'t_s5', accountId:'a_s1', userId:'u_s', merchant:'Target', merchantIcon:'🎯', amountCents:6800, isDebit:true, category:'Shopping', date: fmt(subDays(today,14)), isSubscription:false },
  ],
  bills: [
    { id:'b_s1', userId:'u_s', name:'Rent', icon:'🏠', amountCents:168000, dueDate: fmt(addDays(today,20)), source:'manual', status:'upcoming', accountId:'a_s1', color:'#ffb347' },
    { id:'b_s2', userId:'u_s', name:'TD Visa', icon:'💳', amountCents:52000, dueDate: fmt(addDays(today,9)), source:'email', status:'due_soon', accountId:'a_s1', color:'#ff5252' },
    { id:'b_s3', userId:'u_s', name:'Electric', icon:'⚡', amountCents:9600, dueDate: fmt(addDays(today,15)), source:'email', status:'upcoming', accountId:'a_s1', color:'#5b8dff' },
  ],
  subscriptions: [
    { id:'s_s1', userId:'u_s', name:'Netflix', icon:'📺', amountCents:1799, billingCycle:'monthly', lastUsedDaysAgo:4, nextBillingDate: fmt(addDays(today,10)), category:'Entertainment', isWaste:false, iconBg:'rgba(229,9,20,0.12)' },
    { id:'s_s2', userId:'u_s', name:'Spotify', icon:'🎵', amountCents:1099, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,16)), category:'Entertainment', isWaste:false, iconBg:'rgba(30,215,96,0.10)' },
    { id:'s_s3', userId:'u_s', name:'Headspace', icon:'🧘', amountCents:1299, billingCycle:'monthly', lastUsedDaysAgo:35, nextBillingDate: fmt(addDays(today,10)), category:'Health', isWaste:true, iconBg:'rgba(255,109,40,0.10)' },
    { id:'s_s4', userId:'u_s', name:'Amazon Prime', icon:'📦', amountCents:1499, billingCycle:'monthly', lastUsedDaysAgo:3, nextBillingDate: fmt(addDays(today,22)), category:'Shopping', isWaste:false, iconBg:'rgba(255,153,0,0.10)' },
  ],
  alerts: [
    { id:'al_s1', userId:'u_s', type:'success', icon:'💎', title:'Emergency fund growing', description:"$4,800 saved — that's 1.7 months of expenses. Keep going, you're on track!", timeAgo:'This week', isRead:false, amountCents:480000 },
    { id:'al_s2', userId:'u_s', type:'danger', icon:'💳', title:'TD Visa due in 9 days', description:'$520 due. Pay from TD Checking (bal: $1,840).', timeAgo:'Today', isRead:false, actionLabel:'Pay Now →', amountCents:52000 },
    { id:'al_s3', userId:'u_s', type:'warning', icon:'🧘', title:'Headspace unused 35 days', description:'$12.99/mo. No sessions in over a month. Cancel to save $156/yr.', timeAgo:'2 days ago', isRead:false, actionLabel:'Cancel →', amountCents:1299 },
  ],
  cashflow: buildCashflow('u_s', 4200, 3600),
  projection: { thirtyDay: 840, sixtyDay: 1600, ninetyDay: 2380 },
  trip: null,
  netWorthCents: 3120000,
  safeToSpendCents: 84000,
  monthlyIncomeCents: 420000,
  monthlySpendCents: 360000,
  subscriptionsTotalMonthlyCents: 5696,
  subscriptionsWastedMonthlyCents: 1299,
  sparklineData: [0.20, 0.24, 0.27, 0.30, 0.33, 0.36],
};

// ═══════════════════════════════════════════════════════════════════════════════
// T — Tyler Torres  |  Crypto Day Trader · Coinbase · Free
// ═══════════════════════════════════════════════════════════════════════════════
const T: UserFinancialProfile = {
  user: { id:'u_t', name:'Tyler Torres', email:'tyler@example.com', avatarInitials:'TT',
    planTier:'free', bankName:'Coinbase', bankColor:'#0052ff',
    onboardedAt: fmt(subDays(today,60)), greeting:'Tyler' },
  accounts: [
    { id:'a_t1', userId:'u_t', name:'Chase Checking', type:'checking', institution:'Chase',
      balanceCents:260000, color:'#00f5b0', logoAbbrev:'CHASE', updatedAt: fmt(today) },
    { id:'a_t2', userId:'u_t', name:'Coinbase USDC', type:'savings', institution:'Coinbase',
      balanceCents:840000, interestRate:4.0, color:'#5b8dff', logoAbbrev:'COIN', updatedAt: fmt(today) },
    { id:'a_t3', userId:'u_t', name:'Chase Credit', type:'credit', institution:'Chase',
      balanceCents:-42000, dueDate: fmt(addDays(today,11)), color:'#ffb347', logoAbbrev:'CHASE', updatedAt: fmt(today) },
    { id:'a_t4', userId:'u_t', name:'Coinbase Portfolio', type:'investment', institution:'Coinbase',
      balanceCents:1800000, interestRate:0, color:'#a78bfa', logoAbbrev:'COIN', updatedAt: fmt(today) },
  ],
  transactions: [
    { id:'t_t1', accountId:'a_t2', userId:'u_t', merchant:'BTC Trade Gain', merchantIcon:'₿', amountCents:480000, isDebit:false, category:'Income', date: fmt(subDays(today,2)), isSubscription:false },
    { id:'t_t2', accountId:'a_t1', userId:'u_t', merchant:'Rent', merchantIcon:'🏠', amountCents:232000, isDebit:true, category:'Rent', date: fmt(subDays(today,5)), isSubscription:false },
    { id:'t_t3', accountId:'a_t3', userId:'u_t', merchant:'TradingView Pro', merchantIcon:'📈', amountCents:5900, isDebit:true, category:'Business', date: fmt(subDays(today,7)), isSubscription:true },
    { id:'t_t4', accountId:'a_t1', userId:'u_t', merchant:"McDonald's", merchantIcon:'🍟', amountCents:1400, isDebit:true, category:'Food', date: fmt(subDays(today,9)), isSubscription:false },
    { id:'t_t5', accountId:'a_t3', userId:'u_t', merchant:'ETH Gas Fees', merchantIcon:'⛽', amountCents:2800, isDebit:true, category:'Transport', date: fmt(subDays(today,12)), isSubscription:false },
  ],
  bills: [
    { id:'b_t1', userId:'u_t', name:'Rent', icon:'🏠', amountCents:232000, dueDate: fmt(addDays(today,21)), source:'manual', status:'upcoming', accountId:'a_t1', color:'#ffb347' },
    { id:'b_t2', userId:'u_t', name:'Chase Credit', icon:'💳', amountCents:42000, dueDate: fmt(addDays(today,11)), source:'email', status:'upcoming', accountId:'a_t1', color:'#ff5252' },
    { id:'b_t3', userId:'u_t', name:'Internet', icon:'📡', amountCents:7900, dueDate: fmt(addDays(today,8)), source:'email', status:'due_soon', accountId:'a_t1', color:'#5b8dff' },
  ],
  subscriptions: [
    { id:'s_t1', userId:'u_t', name:'TradingView Pro', icon:'📈', amountCents:5900, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,7)), category:'Finance', isWaste:false, iconBg:'rgba(0,120,255,0.12)' },
    { id:'s_t2', userId:'u_t', name:'Spotify', icon:'🎵', amountCents:1099, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,14)), category:'Entertainment', isWaste:false, iconBg:'rgba(30,215,96,0.10)' },
    { id:'s_t3', userId:'u_t', name:'Netflix', icon:'📺', amountCents:1799, billingCycle:'monthly', lastUsedDaysAgo:10, nextBillingDate: fmt(addDays(today,20)), category:'Entertainment', isWaste:false, iconBg:'rgba(229,9,20,0.12)' },
    { id:'s_t4', userId:'u_t', name:'Coinbase One', icon:'₿', amountCents:2999, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,18)), category:'Finance', isWaste:false, iconBg:'rgba(0,82,255,0.12)' },
  ],
  alerts: [
    { id:'al_t1', userId:'u_t', type:'success', icon:'₿', title:'BTC trade gain: $4,800', description:'BTC position +18% this week. Realized $4,800. Consider stablecoin reserve?', timeAgo:'2 days ago', isRead:false, amountCents:480000 },
    { id:'al_t2', userId:'u_t', type:'warning', icon:'⚠️', title:'High spending month', description:"You've spent $580 on food delivery this month — 40% over your usual $420.", timeAgo:'Yesterday', isRead:false, amountCents:58000 },
    { id:'al_t3', userId:'u_t', type:'danger', icon:'📡', title:'Internet due in 8 days', description:'$79 due. Pay from Chase Checking (bal: $2,600).', timeAgo:'Today', isRead:false, actionLabel:'Pay Now →', amountCents:7900 },
  ],
  cashflow: buildCashflow('u_t', 5800, 4400),
  projection: { thirtyDay: 1240, sixtyDay: 2380, ninetyDay: 3640 },
  trip: null,
  netWorthCents: 6480000,
  safeToSpendCents: 124000,
  monthlyIncomeCents: 580000,
  monthlySpendCents: 440000,
  subscriptionsTotalMonthlyCents: 11797,
  subscriptionsWastedMonthlyCents: 0,
  sparklineData: [0.32, 0.40, 0.35, 0.48, 0.42, 0.55],
};

// ═══════════════════════════════════════════════════════════════════════════════
// U — Uma Upton  |  UX Designer · Fidelity · Premium
// ═══════════════════════════════════════════════════════════════════════════════
const U: UserFinancialProfile = {
  user: { id:'u_u', name:'Uma Upton', email:'uma@example.com', avatarInitials:'UU',
    planTier:'premium', bankName:'Fidelity', bankColor:'#006633',
    onboardedAt: fmt(subDays(today,180)), greeting:'Uma' },
  accounts: [
    { id:'a_u1', userId:'u_u', name:'Fidelity Checking', type:'checking', institution:'Fidelity',
      balanceCents:840000, color:'#00f5b0', logoAbbrev:'FIDL', updatedAt: fmt(today) },
    { id:'a_u2', userId:'u_u', name:'Fidelity HYSA', type:'savings', institution:'Fidelity',
      balanceCents:4800000, interestRate:5.1, color:'#5b8dff', logoAbbrev:'FIDL', updatedAt: fmt(today) },
    { id:'a_u3', userId:'u_u', name:'Fidelity 401(k)', type:'investment', institution:'Fidelity',
      balanceCents:24000000, interestRate:9.6, color:'#a78bfa', logoAbbrev:'FIDL', updatedAt: fmt(today) },
  ],
  transactions: [
    { id:'t_u1', accountId:'a_u1', userId:'u_u', merchant:'DesignAgency Co Payroll', merchantIcon:'💵', amountCents:1480000, isDebit:false, category:'Income', date: fmt(subDays(today,4)), isSubscription:false },
    { id:'t_u2', accountId:'a_u1', userId:'u_u', merchant:'Rent', merchantIcon:'🏠', amountCents:328000, isDebit:true, category:'Rent', date: fmt(subDays(today,6)), isSubscription:false },
    { id:'t_u3', accountId:'a_u1', userId:'u_u', merchant:'Adobe Creative Cloud', merchantIcon:'🎨', amountCents:5999, isDebit:true, category:'Business', date: fmt(subDays(today,8)), isSubscription:true },
    { id:'t_u4', accountId:'a_u1', userId:'u_u', merchant:'Figma', merchantIcon:'✏️', amountCents:4500, isDebit:true, category:'Business', date: fmt(subDays(today,10)), isSubscription:true },
    { id:'t_u5', accountId:'a_u1', userId:'u_u', merchant:'Sweetgreen', merchantIcon:'🥗', amountCents:1600, isDebit:true, category:'Food', date: fmt(subDays(today,12)), isSubscription:false },
  ],
  bills: [
    { id:'b_u1', userId:'u_u', name:'Rent', icon:'🏠', amountCents:328000, dueDate: fmt(addDays(today,20)), source:'manual', status:'upcoming', accountId:'a_u1', color:'#ffb347' },
    { id:'b_u2', userId:'u_u', name:'Electric', icon:'⚡', amountCents:11200, dueDate: fmt(addDays(today,7)), source:'email', status:'due_soon', accountId:'a_u1', color:'#5b8dff' },
    { id:'b_u3', userId:'u_u', name:'Renter\'s Insurance', icon:'🔒', amountCents:4800, dueDate: fmt(addDays(today,14)), source:'email', status:'upcoming', accountId:'a_u1', color:'#a78bfa' },
  ],
  subscriptions: [
    { id:'s_u1', userId:'u_u', name:'Adobe Creative Cloud', icon:'🎨', amountCents:5999, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,8)), category:'Design', isWaste:false, iconBg:'rgba(255,50,50,0.12)' },
    { id:'s_u2', userId:'u_u', name:'Figma', icon:'✏️', amountCents:4500, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,10)), category:'Design', isWaste:false, iconBg:'rgba(162,89,255,0.12)' },
    { id:'s_u3', userId:'u_u', name:'Loom', icon:'📹', amountCents:1500, billingCycle:'monthly', lastUsedDaysAgo:40, nextBillingDate: fmt(addDays(today,15)), category:'Productivity', isWaste:true, iconBg:'rgba(100,80,200,0.12)' },
    { id:'s_u4', userId:'u_u', name:'Spotify', icon:'🎵', amountCents:1099, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,18)), category:'Entertainment', isWaste:false, iconBg:'rgba(30,215,96,0.10)' },
    { id:'s_u5', userId:'u_u', name:'Apple One Premier', icon:'🍎', amountCents:3299, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,22)), category:'Entertainment', isWaste:false, iconBg:'rgba(255,255,255,0.08)' },
  ],
  alerts: [
    { id:'al_u1', userId:'u_u', type:'success', icon:'📈', title:'401(k) quarterly gain: +$18,400', description:'Fidelity 401(k) up 9.6% this quarter. Consider increasing contribution?', timeAgo:'This week', isRead:false, amountCents:1840000 },
    { id:'al_u2', userId:'u_u', type:'warning', icon:'📹', title:'Loom unused 40 days', description:'$15/mo, no recordings. Switch to free plan and save $180/yr.', timeAgo:'Yesterday', isRead:false, actionLabel:'Downgrade →', amountCents:1500 },
    { id:'al_u3', userId:'u_u', type:'danger', icon:'⚡', title:'Electric due in 7 days', description:'$112 due. Pay from Fidelity Checking (bal: $8,400).', timeAgo:'Today', isRead:false, actionLabel:'Pay Now →', amountCents:11200 },
  ],
  cashflow: buildCashflow('u_u', 14800, 8200),
  projection: { thirtyDay: 4200, sixtyDay: 8100, ninetyDay: 12600 },
  trip: {
    id:'trip_u1', userId:'u_u', name:'Design Conference PDX', destination:'SFO → Portland',
    startDate: fmt(addDays(today,18)), endDate: fmt(addDays(today,21)), nights:3, travelers:1,
    budgetCents:160000, spentCents:72000, isOnTrack:true, detectedFromEmail:true,
    categories: [
      { icon:'✈️', label:'FLIGHTS', spentCents:42000, budgetCents:60000, fillColor:'#5b8dff' },
      { icon:'🏨', label:'HOTEL', spentCents:30000, budgetCents:60000, fillColor:'#a78bfa' },
      { icon:'🥗', label:'FOOD', spentCents:0, budgetCents:30000, fillColor:'#ffb347' },
      { icon:'🎨', label:'WORKSHOPS', spentCents:0, budgetCents:10000, fillColor:'#00f5b0' },
    ],
    itinerary: [
      { date: fmt(addDays(today,18)), event:'Depart SFO → PDX', icon:'✈️', amountCents:42000, isCovered:true },
      { date: fmt(addDays(today,18)), event:'Ace Hotel Portland check-in', icon:'🏨', amountCents:30000, isCovered:true },
      { date: fmt(addDays(today,19)), event:'Figma Config 2026 — Day 1', icon:'✏️', amountCents:0, isCovered:true },
      { date: fmt(addDays(today,21)), event:'Return PDX → SFO', icon:'✈️', amountCents:0, isCovered:false },
    ],
  },
  netWorthCents: 31210000,
  safeToSpendCents: 420000,
  monthlyIncomeCents: 1480000,
  monthlySpendCents: 820000,
  subscriptionsTotalMonthlyCents: 16397,
  subscriptionsWastedMonthlyCents: 1500,
  sparklineData: [0.60, 0.64, 0.68, 0.71, 0.75, 0.80],
};

// ═══════════════════════════════════════════════════════════════════════════════
// V — Vince Vega  |  Freelance Videographer · Wells Fargo · Free
// ═══════════════════════════════════════════════════════════════════════════════
const V: UserFinancialProfile = {
  user: { id:'u_v', name:'Vince Vega', email:'vince@example.com', avatarInitials:'VV',
    planTier:'free', bankName:'Wells Fargo', bankColor:'#c0392b',
    onboardedAt: fmt(subDays(today,90)), greeting:'Vince' },
  accounts: [
    { id:'a_v1', userId:'u_v', name:'Wells Fargo Checking', type:'checking', institution:'Wells Fargo',
      balanceCents:380000, color:'#00f5b0', logoAbbrev:'WFGO', updatedAt: fmt(today) },
    { id:'a_v2', userId:'u_v', name:'Wells Fargo Savings', type:'savings', institution:'Wells Fargo',
      balanceCents:1200000, interestRate:3.5, color:'#5b8dff', logoAbbrev:'WFGO', updatedAt: fmt(today) },
    { id:'a_v3', userId:'u_v', name:'Wells Fargo Visa', type:'credit', institution:'Wells Fargo',
      balanceCents:-240000, dueDate: fmt(addDays(today,12)), color:'#ffb347', logoAbbrev:'WFGO', updatedAt: fmt(today) },
  ],
  transactions: [
    { id:'t_v1', accountId:'a_v1', userId:'u_v', merchant:'Freelance Invoice — TechCo', merchantIcon:'🎬', amountCents:600000, isDebit:false, category:'Income', date: fmt(subDays(today,3)), isSubscription:false },
    { id:'t_v2', accountId:'a_v1', userId:'u_v', merchant:'Rent', merchantIcon:'🏠', amountCents:328000, isDebit:true, category:'Rent', date: fmt(subDays(today,6)), isSubscription:false },
    { id:'t_v3', accountId:'a_v3', userId:'u_v', merchant:'Adobe Premiere Pro', merchantIcon:'🎬', amountCents:5499, isDebit:true, category:'Business', date: fmt(subDays(today,8)), isSubscription:true },
    { id:'t_v4', accountId:'a_v3', userId:'u_v', merchant:'Dropbox Business', merchantIcon:'💾', amountCents:1699, isDebit:true, category:'Business', date: fmt(subDays(today,10)), isSubscription:true },
    { id:'t_v5', accountId:'a_v1', userId:'u_v', merchant:'B&H Photo', merchantIcon:'📷', amountCents:84000, isDebit:true, category:'Shopping', date: fmt(subDays(today,14)), isSubscription:false },
  ],
  bills: [
    { id:'b_v1', userId:'u_v', name:'Rent', icon:'🏠', amountCents:328000, dueDate: fmt(addDays(today,20)), source:'manual', status:'upcoming', accountId:'a_v1', color:'#ffb347' },
    { id:'b_v2', userId:'u_v', name:'Wells Fargo Visa', icon:'💳', amountCents:240000, dueDate: fmt(addDays(today,12)), source:'email', status:'upcoming', accountId:'a_v1', color:'#ff5252' },
    { id:'b_v3', userId:'u_v', name:'Storage Unit', icon:'📦', amountCents:18000, dueDate: fmt(addDays(today,6)), source:'manual', status:'due_soon', accountId:'a_v1', color:'#5b8dff' },
  ],
  subscriptions: [
    { id:'s_v1', userId:'u_v', name:'Adobe Premiere Pro', icon:'🎬', amountCents:5499, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,8)), category:'Business', isWaste:false, iconBg:'rgba(120,50,200,0.12)' },
    { id:'s_v2', userId:'u_v', name:'Frame.io', icon:'🎞️', amountCents:4500, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,12)), category:'Business', isWaste:false, iconBg:'rgba(0,150,255,0.12)' },
    { id:'s_v3', userId:'u_v', name:'Dropbox Business', icon:'💾', amountCents:1699, billingCycle:'monthly', lastUsedDaysAgo:34, nextBillingDate: fmt(addDays(today,10)), category:'Business', isWaste:true, iconBg:'rgba(0,100,200,0.10)' },
    { id:'s_v4', userId:'u_v', name:'Spotify', icon:'🎵', amountCents:1099, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,18)), category:'Entertainment', isWaste:false, iconBg:'rgba(30,215,96,0.10)' },
  ],
  alerts: [
    { id:'al_v1', userId:'u_v', type:'success', icon:'🎬', title:'Invoice paid: $6,000', description:'TechCo video project paid. After expenses, net $5,200. Nice month!', timeAgo:'3 days ago', isRead:false, amountCents:600000 },
    { id:'al_v2', userId:'u_v', type:'warning', icon:'💾', title:'Dropbox unused 34 days', description:"$16.99/mo. You're using OneDrive now — cancel Dropbox to save $204/yr.", timeAgo:'Yesterday', isRead:false, actionLabel:'Cancel →', amountCents:1699 },
    { id:'al_v3', userId:'u_v', type:'danger', icon:'📦', title:'Storage unit due in 6 days', description:'$180 due. Pay from Wells Fargo Checking.', timeAgo:'Today', isRead:false, actionLabel:'Pay Now →', amountCents:18000 },
  ],
  cashflow: buildCashflow('u_v', 8200, 6800),
  projection: { thirtyDay: 1640, sixtyDay: 3100, ninetyDay: 4700 },
  trip: null,
  netWorthCents: 7640000,
  safeToSpendCents: 164000,
  monthlyIncomeCents: 820000,
  monthlySpendCents: 680000,
  subscriptionsTotalMonthlyCents: 12797,
  subscriptionsWastedMonthlyCents: 1699,
  sparklineData: [0.38, 0.40, 0.42, 0.44, 0.46, 0.50],
};

// ═══════════════════════════════════════════════════════════════════════════════
// W — Wendy Walsh  |  Wealth Manager · Vanguard · Premium
// ═══════════════════════════════════════════════════════════════════════════════
const W: UserFinancialProfile = {
  user: { id:'u_w', name:'Wendy Walsh', email:'wendy@example.com', avatarInitials:'WW',
    planTier:'premium', bankName:'Vanguard', bankColor:'#722f37',
    onboardedAt: fmt(subDays(today,365)), greeting:'Wendy' },
  accounts: [
    { id:'a_w1', userId:'u_w', name:'Vanguard Checking', type:'checking', institution:'Vanguard',
      balanceCents:1800000, color:'#00f5b0', logoAbbrev:'VANG', updatedAt: fmt(today) },
    { id:'a_w2', userId:'u_w', name:'Vanguard Money Mkt', type:'savings', institution:'Vanguard',
      balanceCents:8400000, interestRate:5.3, color:'#5b8dff', logoAbbrev:'VANG', updatedAt: fmt(today) },
    { id:'a_w3', userId:'u_w', name:'Vanguard Brokerage', type:'investment', institution:'Vanguard',
      balanceCents:38000000, interestRate:12.1, color:'#a78bfa', logoAbbrev:'VANG', updatedAt: fmt(today) },
  ],
  transactions: [
    { id:'t_w1', accountId:'a_w1', userId:'u_w', merchant:'WM Advisors Payroll', merchantIcon:'💵', amountCents:2200000, isDebit:false, category:'Income', date: fmt(subDays(today,4)), isSubscription:false },
    { id:'t_w2', accountId:'a_w1', userId:'u_w', merchant:'Mortgage', merchantIcon:'🏠', amountCents:480000, isDebit:true, category:'Rent', date: fmt(subDays(today,6)), isSubscription:false },
    { id:'t_w3', accountId:'a_w1', userId:'u_w', merchant:'Bloomberg Terminal', merchantIcon:'📊', amountCents:34500, isDebit:true, category:'Business', date: fmt(subDays(today,8)), isSubscription:true },
    { id:'t_w4', accountId:'a_w1', userId:'u_w', merchant:'Peloton', merchantIcon:'🚴', amountCents:4400, isDebit:true, category:'Health', date: fmt(subDays(today,10)), isSubscription:true },
    { id:'t_w5', accountId:'a_w1', userId:'u_w', merchant:'Whole Foods', merchantIcon:'🛒', amountCents:28400, isDebit:true, category:'Food', date: fmt(subDays(today,13)), isSubscription:false },
  ],
  bills: [
    { id:'b_w1', userId:'u_w', name:'Mortgage', icon:'🏠', amountCents:480000, dueDate: fmt(addDays(today,22)), source:'manual', status:'upcoming', accountId:'a_w1', color:'#ffb347' },
    { id:'b_w2', userId:'u_w', name:'HOA', icon:'🏡', amountCents:62000, dueDate: fmt(addDays(today,7)), source:'manual', status:'due_soon', accountId:'a_w1', color:'#5b8dff' },
    { id:'b_w3', userId:'u_w', name:'Electric & Gas', icon:'⚡', amountCents:22000, dueDate: fmt(addDays(today,14)), source:'email', status:'upcoming', accountId:'a_w1', color:'#a78bfa' },
  ],
  subscriptions: [
    { id:'s_w1', userId:'u_w', name:'Bloomberg Terminal', icon:'📊', amountCents:34500, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,8)), category:'Business', isWaste:false, iconBg:'rgba(0,100,180,0.12)' },
    { id:'s_w2', userId:'u_w', name:'LinkedIn Premium', icon:'💼', amountCents:3999, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,15)), category:'Business', isWaste:false, iconBg:'rgba(0,119,181,0.12)' },
    { id:'s_w3', userId:'u_w', name:'Calm', icon:'🧘', amountCents:1499, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,18)), category:'Health', isWaste:false, iconBg:'rgba(100,150,255,0.10)' },
    { id:'s_w4', userId:'u_w', name:'Peloton', icon:'🚴', amountCents:4400, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,10)), category:'Health', isWaste:false, iconBg:'rgba(255,100,50,0.12)' },
    { id:'s_w5', userId:'u_w', name:'Morning Brew Pro', icon:'☕', amountCents:2900, billingCycle:'monthly', lastUsedDaysAgo:31, nextBillingDate: fmt(addDays(today,5)), category:'News', isWaste:true, iconBg:'rgba(200,140,50,0.12)' },
  ],
  alerts: [
    { id:'al_w1', userId:'u_w', type:'success', icon:'📈', title:'Portfolio: $380K milestone', description:'Vanguard Brokerage crossed $380K. Up 12.1% YTD — ahead of benchmark by 2.3%.', timeAgo:'Today', isRead:false, amountCents:38000000 },
    { id:'al_w2', userId:'u_w', type:'warning', icon:'☕', title:'Morning Brew Pro unused 31 days', description:'$29/mo. No newsletter opens this month. Cancel to save $348/yr.', timeAgo:'Yesterday', isRead:false, actionLabel:'Cancel →', amountCents:2900 },
    { id:'al_w3', userId:'u_w', type:'danger', icon:'🏡', title:'HOA fees due in 7 days', description:'$620 HOA due. Schedule from Vanguard Checking.', timeAgo:'Today', isRead:false, actionLabel:'Pay Now →', amountCents:62000 },
  ],
  cashflow: buildCashflow('u_w', 22000, 9800),
  projection: { thirtyDay: 8400, sixtyDay: 16200, ninetyDay: 25000 },
  trip: {
    id:'trip_w1', userId:'u_w', name:'Napa Client Retreat', destination:'SFO → Napa Valley',
    startDate: fmt(addDays(today,14)), endDate: fmt(addDays(today,17)), nights:3, travelers:2,
    budgetCents:480000, spentCents:240000, isOnTrack:true, detectedFromEmail:true,
    categories: [
      { icon:'🚗', label:'TRANSPORT', spentCents:84000, budgetCents:100000, fillColor:'#5b8dff' },
      { icon:'🏨', label:'RESORT', spentCents:156000, budgetCents:200000, fillColor:'#a78bfa' },
      { icon:'🍷', label:'DINING', spentCents:0, budgetCents:120000, fillColor:'#ffb347' },
      { icon:'🎯', label:'ACTIVITIES', spentCents:0, budgetCents:60000, fillColor:'#00f5b0' },
    ],
    itinerary: [
      { date: fmt(addDays(today,14)), event:'Drive to Meadowood Napa Valley', icon:'🚗', amountCents:84000, isCovered:true },
      { date: fmt(addDays(today,14)), event:'Meadowood Resort check-in', icon:'🏨', amountCents:156000, isCovered:true },
      { date: fmt(addDays(today,15)), event:'Client portfolio review dinner', icon:'🍷', amountCents:0, isCovered:false },
      { date: fmt(addDays(today,17)), event:'Return to SF', icon:'🚗', amountCents:0, isCovered:false },
    ],
  },
  netWorthCents: 52360000,
  safeToSpendCents: 840000,
  monthlyIncomeCents: 2200000,
  monthlySpendCents: 980000,
  subscriptionsTotalMonthlyCents: 47298,
  subscriptionsWastedMonthlyCents: 2900,
  sparklineData: [0.75, 0.78, 0.80, 0.83, 0.86, 0.90],
};

// ═══════════════════════════════════════════════════════════════════════════════
// X — Xander Xu  |  VP of Finance · Interactive Brokers · Premium
// ═══════════════════════════════════════════════════════════════════════════════
const X: UserFinancialProfile = {
  user: { id:'u_x', name:'Xander Xu', email:'xander@example.com', avatarInitials:'XX',
    planTier:'premium', bankName:'Interactive Brokers', bankColor:'#ff6600',
    onboardedAt: fmt(subDays(today,240)), greeting:'Xander' },
  accounts: [
    { id:'a_x1', userId:'u_x', name:'IBKR Checking', type:'checking', institution:'Interactive Brokers',
      balanceCents:2400000, color:'#00f5b0', logoAbbrev:'IBKR', updatedAt: fmt(today) },
    { id:'a_x2', userId:'u_x', name:'IBKR Cash Mgmt', type:'savings', institution:'Interactive Brokers',
      balanceCents:6400000, interestRate:5.1, color:'#5b8dff', logoAbbrev:'IBKR', updatedAt: fmt(today) },
    { id:'a_x3', userId:'u_x', name:'IBKR Portfolio', type:'investment', institution:'Interactive Brokers',
      balanceCents:28000000, interestRate:14.2, color:'#a78bfa', logoAbbrev:'IBKR', updatedAt: fmt(today) },
  ],
  transactions: [
    { id:'t_x1', accountId:'a_x1', userId:'u_x', merchant:'FinanceCorp Payroll', merchantIcon:'💵', amountCents:2800000, isDebit:false, category:'Income', date: fmt(subDays(today,4)), isSubscription:false },
    { id:'t_x2', accountId:'a_x1', userId:'u_x', merchant:'Mortgage', merchantIcon:'🏠', amountCents:580000, isDebit:true, category:'Rent', date: fmt(subDays(today,6)), isSubscription:false },
    { id:'t_x3', accountId:'a_x1', userId:'u_x', merchant:'Bloomberg Terminal', merchantIcon:'📊', amountCents:34500, isDebit:true, category:'Business', date: fmt(subDays(today,8)), isSubscription:true },
    { id:'t_x4', accountId:'a_x1', userId:'u_x', merchant:'Ruth\'s Chris Steakhouse', merchantIcon:'🥩', amountCents:62000, isDebit:true, category:'Food', date: fmt(subDays(today,10)), isSubscription:false },
    { id:'t_x5', accountId:'a_x1', userId:'u_x', merchant:'Seeking Alpha Pro', merchantIcon:'📉', amountCents:3400, isDebit:true, category:'Finance', date: fmt(subDays(today,14)), isSubscription:true },
  ],
  bills: [
    { id:'b_x1', userId:'u_x', name:'Mortgage', icon:'🏠', amountCents:580000, dueDate: fmt(addDays(today,22)), source:'manual', status:'upcoming', accountId:'a_x1', color:'#ffb347' },
    { id:'b_x2', userId:'u_x', name:'HOA', icon:'🏡', amountCents:84000, dueDate: fmt(addDays(today,9)), source:'manual', status:'due_soon', accountId:'a_x1', color:'#5b8dff' },
    { id:'b_x3', userId:'u_x', name:'Property Tax (Q2)', icon:'🏛️', amountCents:480000, dueDate: fmt(addDays(today,30)), source:'email', status:'upcoming', accountId:'a_x1', color:'#a78bfa' },
  ],
  subscriptions: [
    { id:'s_x1', userId:'u_x', name:'Bloomberg Terminal', icon:'📊', amountCents:34500, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,8)), category:'Finance', isWaste:false, iconBg:'rgba(0,100,180,0.12)' },
    { id:'s_x2', userId:'u_x', name:'WSJ Digital', icon:'📰', amountCents:3899, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,14)), category:'News', isWaste:false, iconBg:'rgba(255,255,255,0.08)' },
    { id:'s_x3', userId:'u_x', name:'LinkedIn Premium', icon:'💼', amountCents:3999, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,20)), category:'Business', isWaste:false, iconBg:'rgba(0,119,181,0.12)' },
    { id:'s_x4', userId:'u_x', name:'Netflix 4K', icon:'📺', amountCents:2299, billingCycle:'monthly', lastUsedDaysAgo:3, nextBillingDate: fmt(addDays(today,18)), category:'Entertainment', isWaste:false, iconBg:'rgba(229,9,20,0.12)' },
    { id:'s_x5', userId:'u_x', name:'Seeking Alpha Pro', icon:'📉', amountCents:3400, billingCycle:'monthly', lastUsedDaysAgo:36, nextBillingDate: fmt(addDays(today,14)), category:'Finance', isWaste:true, iconBg:'rgba(255,150,0,0.10)' },
  ],
  alerts: [
    { id:'al_x1', userId:'u_x', type:'success', icon:'📈', title:'Portfolio: $280K YTD gain', description:'IBKR portfolio up 14.2% this year. Options strategy is outperforming index by 2.1%.', timeAgo:'Today', isRead:false, amountCents:28000000 },
    { id:'al_x2', userId:'u_x', type:'warning', icon:'📉', title:'Seeking Alpha unused 36 days', description:'$34/mo with no reads. Cancel to save $408/yr.', timeAgo:'Yesterday', isRead:false, actionLabel:'Cancel →', amountCents:3400 },
    { id:'al_x3', userId:'u_x', type:'danger', icon:'🏡', title:'HOA due in 9 days', description:'$840 HOA due. Pay from IBKR Checking (bal: $24,000).', timeAgo:'Today', isRead:false, actionLabel:'Pay Now →', amountCents:84000 },
  ],
  cashflow: buildCashflow('u_x', 28000, 12000),
  projection: { thirtyDay: 10800, sixtyDay: 20800, ninetyDay: 31200 },
  trip: {
    id:'trip_x1', userId:'u_x', name:'Singapore Investor Roadshow', destination:'JFK → Singapore',
    startDate: fmt(addDays(today,20)), endDate: fmt(addDays(today,27)), nights:7, travelers:1,
    budgetCents:900000, spentCents:540000, isOnTrack:true, detectedFromEmail:true,
    categories: [
      { icon:'✈️', label:'FLIGHTS', spentCents:280000, budgetCents:350000, fillColor:'#5b8dff' },
      { icon:'🏨', label:'HOTEL', spentCents:260000, budgetCents:350000, fillColor:'#a78bfa' },
      { icon:'🍜', label:'DINING', spentCents:0, budgetCents:120000, fillColor:'#ffb347' },
      { icon:'🚖', label:'TRANSPORT', spentCents:0, budgetCents:80000, fillColor:'#00f5b0' },
    ],
    itinerary: [
      { date: fmt(addDays(today,20)), event:'Depart JFK → SIN (Business)', icon:'✈️', amountCents:280000, isCovered:true },
      { date: fmt(addDays(today,21)), event:'Marina Bay Sands check-in', icon:'🏨', amountCents:260000, isCovered:true },
      { date: fmt(addDays(today,22)), event:'GIC & Temasek investor meetings', icon:'📊', amountCents:0, isCovered:true },
      { date: fmt(addDays(today,27)), event:'Return SIN → JFK', icon:'✈️', amountCents:0, isCovered:false },
    ],
  },
  netWorthCents: 38720000,
  safeToSpendCents: 1080000,
  monthlyIncomeCents: 2800000,
  monthlySpendCents: 1200000,
  subscriptionsTotalMonthlyCents: 48097,
  subscriptionsWastedMonthlyCents: 3400,
  sparklineData: [0.68, 0.72, 0.75, 0.78, 0.82, 0.87],
};

// ═══════════════════════════════════════════════════════════════════════════════
// Y — Yuki Yamamoto  |  Yoga Studio Owner · Marcus · Premium
// ═══════════════════════════════════════════════════════════════════════════════
const Y: UserFinancialProfile = {
  user: { id:'u_y', name:'Yuki Yamamoto', email:'yuki@example.com', avatarInitials:'YY',
    planTier:'premium', bankName:'Marcus', bankColor:'#003087',
    onboardedAt: fmt(subDays(today,120)), greeting:'Yuki' },
  accounts: [
    { id:'a_y1', userId:'u_y', name:'Marcus Checking', type:'checking', institution:'Marcus',
      balanceCents:720000, color:'#00f5b0', logoAbbrev:'MARC', updatedAt: fmt(today) },
    { id:'a_y2', userId:'u_y', name:'Marcus HYSA', type:'savings', institution:'Marcus',
      balanceCents:3600000, interestRate:5.0, color:'#5b8dff', logoAbbrev:'MARC', updatedAt: fmt(today) },
    { id:'a_y3', userId:'u_y', name:'Chase Ink Business', type:'credit', institution:'Chase',
      balanceCents:-180000, dueDate: fmt(addDays(today,13)), color:'#ffb347', logoAbbrev:'CHAS', updatedAt: fmt(today) },
    { id:'a_y4', userId:'u_y', name:'Fidelity SEP-IRA', type:'investment', institution:'Fidelity',
      balanceCents:10000000, interestRate:8.9, color:'#a78bfa', logoAbbrev:'FIDL', updatedAt: fmt(today) },
  ],
  transactions: [
    { id:'t_y1', accountId:'a_y1', userId:'u_y', merchant:'Zen Flow Studio Revenue', merchantIcon:'🧘', amountCents:980000, isDebit:false, category:'Income', date: fmt(subDays(today,3)), isSubscription:false },
    { id:'t_y2', accountId:'a_y1', userId:'u_y', merchant:'Studio Lease', merchantIcon:'🏠', amountCents:480000, isDebit:true, category:'Rent', date: fmt(subDays(today,5)), isSubscription:false },
    { id:'t_y3', accountId:'a_y3', userId:'u_y', merchant:'Mindbody Business', merchantIcon:'📱', amountCents:12900, isDebit:true, category:'Business', date: fmt(subDays(today,7)), isSubscription:true },
    { id:'t_y4', accountId:'a_y1', userId:'u_y', merchant:'Yoga Equipment Wholesale', merchantIcon:'🧘', amountCents:48000, isDebit:true, category:'Shopping', date: fmt(subDays(today,10)), isSubscription:false },
    { id:'t_y5', accountId:'a_y3', userId:'u_y', merchant:'YouTube Premium', merchantIcon:'▶️', amountCents:1399, isDebit:true, category:'Entertainment', date: fmt(subDays(today,14)), isSubscription:true },
  ],
  bills: [
    { id:'b_y1', userId:'u_y', name:'Studio Lease', icon:'🏠', amountCents:480000, dueDate: fmt(addDays(today,20)), source:'manual', status:'upcoming', accountId:'a_y1', color:'#ffb347' },
    { id:'b_y2', userId:'u_y', name:'Chase Ink', icon:'💳', amountCents:180000, dueDate: fmt(addDays(today,13)), source:'email', status:'upcoming', accountId:'a_y1', color:'#ff5252' },
    { id:'b_y3', userId:'u_y', name:'Studio Insurance', icon:'🔒', amountCents:24000, dueDate: fmt(addDays(today,6)), source:'email', status:'due_soon', accountId:'a_y1', color:'#5b8dff' },
  ],
  subscriptions: [
    { id:'s_y1', userId:'u_y', name:'Mindbody Business', icon:'📱', amountCents:12900, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,7)), category:'Business', isWaste:false, iconBg:'rgba(0,180,120,0.12)' },
    { id:'s_y2', userId:'u_y', name:'Spotify', icon:'🎵', amountCents:1099, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,14)), category:'Entertainment', isWaste:false, iconBg:'rgba(30,215,96,0.10)' },
    { id:'s_y3', userId:'u_y', name:'Apple Music', icon:'🎶', amountCents:1099, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,20)), category:'Entertainment', isWaste:false, iconBg:'rgba(255,45,85,0.12)' },
    { id:'s_y4', userId:'u_y', name:'Calm', icon:'🧘', amountCents:1499, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,18)), category:'Health', isWaste:false, iconBg:'rgba(100,150,255,0.10)' },
    { id:'s_y5', userId:'u_y', name:'YouTube Premium', icon:'▶️', amountCents:1399, billingCycle:'monthly', lastUsedDaysAgo:28, nextBillingDate: fmt(addDays(today,14)), category:'Entertainment', isWaste:true, iconBg:'rgba(255,0,0,0.10)' },
  ],
  alerts: [
    { id:'al_y1', userId:'u_y', type:'success', icon:'🧘', title:'Studio revenue up 22% this month', description:'Zen Flow hit $9,800 in April — best month since opening. New students up 18%!', timeAgo:'3 days ago', isRead:false, amountCents:980000 },
    { id:'al_y2', userId:'u_y', type:'danger', icon:'🔒', title:'Studio insurance due in 6 days', description:'$240 annual premium due. Pay from Marcus Checking.', timeAgo:'Today', isRead:false, actionLabel:'Pay Now →', amountCents:24000 },
    { id:'al_y3', userId:'u_y', type:'warning', icon:'▶️', title:'YouTube Premium unused 28 days', description:'$13.99/mo. No streams this month — switch to free or cancel.', timeAgo:'Yesterday', isRead:false, actionLabel:'Cancel →', amountCents:1399 },
  ],
  cashflow: buildCashflow('u_y', 11200, 7200),
  projection: { thirtyDay: 3400, sixtyDay: 6600, ninetyDay: 10200 },
  trip: {
    id:'trip_y1', userId:'u_y', name:'Bali Wellness Retreat', destination:'LAX → Bali',
    startDate: fmt(addDays(today,30)), endDate: fmt(addDays(today,42)), nights:12, travelers:1,
    budgetCents:600000, spentCents:280000, isOnTrack:true, detectedFromEmail:true,
    categories: [
      { icon:'✈️', label:'FLIGHTS', spentCents:180000, budgetCents:220000, fillColor:'#5b8dff' },
      { icon:'🏡', label:'VILLA', spentCents:100000, budgetCents:220000, fillColor:'#a78bfa' },
      { icon:'🌿', label:'RETREATS', spentCents:0, budgetCents:100000, fillColor:'#ffb347' },
      { icon:'🍜', label:'FOOD', spentCents:0, budgetCents:60000, fillColor:'#00f5b0' },
    ],
    itinerary: [
      { date: fmt(addDays(today,30)), event:'Depart LAX → DPS', icon:'✈️', amountCents:180000, isCovered:true },
      { date: fmt(addDays(today,30)), event:'Ubud Villa check-in', icon:'🏡', amountCents:100000, isCovered:true },
      { date: fmt(addDays(today,31)), event:'Yoga & Meditation Master Class', icon:'🧘', amountCents:0, isCovered:false },
      { date: fmt(addDays(today,42)), event:'Return DPS → LAX', icon:'✈️', amountCents:0, isCovered:false },
    ],
  },
  netWorthCents: 16590000,
  safeToSpendCents: 340000,
  monthlyIncomeCents: 1120000,
  monthlySpendCents: 720000,
  subscriptionsTotalMonthlyCents: 17996,
  subscriptionsWastedMonthlyCents: 1399,
  sparklineData: [0.52, 0.56, 0.60, 0.64, 0.68, 0.72],
};

// ═══════════════════════════════════════════════════════════════════════════════
// Z — Zoe Zhang  |  Startup Founder · Vanguard · Premium
// ═══════════════════════════════════════════════════════════════════════════════
const Z: UserFinancialProfile = {
  user: { id:'u_z', name:'Zoe Zhang', email:'zoe@example.com', avatarInitials:'ZZ',
    planTier:'premium', bankName:'Vanguard', bankColor:'#722f37',
    onboardedAt: fmt(subDays(today,180)), greeting:'Zoe' },
  accounts: [
    { id:'a_z1', userId:'u_z', name:'SVB Checking', type:'checking', institution:'Silicon Valley Bank',
      balanceCents:8400000, color:'#00f5b0', logoAbbrev:'SVB', updatedAt: fmt(today) },
    { id:'a_z2', userId:'u_z', name:'Vanguard Money Mkt', type:'savings', institution:'Vanguard',
      balanceCents:28000000, interestRate:5.2, color:'#5b8dff', logoAbbrev:'VANG', updatedAt: fmt(today) },
    { id:'a_z3', userId:'u_z', name:'Vanguard Portfolio', type:'investment', institution:'Vanguard',
      balanceCents:72000000, interestRate:18.4, color:'#a78bfa', logoAbbrev:'VANG', updatedAt: fmt(today) },
  ],
  transactions: [
    { id:'t_z1', accountId:'a_z1', userId:'u_z', merchant:'FlowAI Inc Founder Salary', merchantIcon:'💵', amountCents:8400000, isDebit:false, category:'Income', date: fmt(subDays(today,3)), isSubscription:false },
    { id:'t_z2', accountId:'a_z1', userId:'u_z', merchant:'AWS Infrastructure', merchantIcon:'☁️', amountCents:240000, isDebit:true, category:'Business', date: fmt(subDays(today,5)), isSubscription:true },
    { id:'t_z3', accountId:'a_z1', userId:'u_z', merchant:'Notion Team', merchantIcon:'📝', amountCents:1600, isDebit:true, category:'Business', date: fmt(subDays(today,7)), isSubscription:true },
    { id:'t_z4', accountId:'a_z1', userId:'u_z', merchant:'Nobu Restaurant', merchantIcon:'🍣', amountCents:84000, isDebit:true, category:'Food', date: fmt(subDays(today,9)), isSubscription:false },
    { id:'t_z5', accountId:'a_z1', userId:'u_z', merchant:'Mortgage', merchantIcon:'🏠', amountCents:840000, isDebit:true, category:'Rent', date: fmt(subDays(today,11)), isSubscription:false },
  ],
  bills: [
    { id:'b_z1', userId:'u_z', name:'Mortgage', icon:'🏠', amountCents:840000, dueDate: fmt(addDays(today,22)), source:'manual', status:'upcoming', accountId:'a_z1', color:'#ffb347' },
    { id:'b_z2', userId:'u_z', name:'AWS (Monthly)', icon:'☁️', amountCents:240000, dueDate: fmt(addDays(today,5)), source:'email', status:'due_soon', accountId:'a_z1', color:'#ff5252' },
    { id:'b_z3', userId:'u_z', name:'HOA', icon:'🏡', amountCents:84000, dueDate: fmt(addDays(today,14)), source:'manual', status:'upcoming', accountId:'a_z1', color:'#5b8dff' },
  ],
  subscriptions: [
    { id:'s_z1', userId:'u_z', name:'Notion Team', icon:'📝', amountCents:1600, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,7)), category:'Productivity', isWaste:false, iconBg:'rgba(255,255,255,0.08)' },
    { id:'s_z2', userId:'u_z', name:'GitHub Enterprise', icon:'🐙', amountCents:19000, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,10)), category:'Development', isWaste:false, iconBg:'rgba(255,255,255,0.08)' },
    { id:'s_z3', userId:'u_z', name:'Slack Pro', icon:'💬', amountCents:7500, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,15)), category:'Productivity', isWaste:false, iconBg:'rgba(74,21,75,0.12)' },
    { id:'s_z4', userId:'u_z', name:'Linear', icon:'📐', amountCents:800, billingCycle:'monthly', lastUsedDaysAgo:0, nextBillingDate: fmt(addDays(today,18)), category:'Productivity', isWaste:false, iconBg:'rgba(91,141,255,0.12)' },
    { id:'s_z5', userId:'u_z', name:'Adobe Creative Cloud', icon:'🎨', amountCents:5999, billingCycle:'monthly', lastUsedDaysAgo:62, nextBillingDate: fmt(addDays(today,5)), category:'Design', isWaste:true, iconBg:'rgba(255,50,50,0.12)' },
  ],
  alerts: [
    { id:'al_z1', userId:'u_z', type:'success', icon:'🚀', title:'Series A term sheet received', description:'Sequoia & Founders Fund term sheets in. Lead at $18M pre-money. Milestone!', timeAgo:'Today', isRead:false, actionLabel:'Review →', amountCents:0 },
    { id:'al_z2', userId:'u_z', type:'danger', icon:'☁️', title:'AWS bill due in 5 days', description:'$2,400 cloud infrastructure due. Pay from SVB Checking (bal: $84,000).', timeAgo:'Today', isRead:false, actionLabel:'Pay Now →', amountCents:240000 },
    { id:'al_z3', userId:'u_z', type:'warning', icon:'🎨', title:'Adobe CC unused 62 days', description:'$59.99/mo, no files opened. Designers use Figma. Cancel to save $720/yr.', timeAgo:'2 days ago', isRead:false, actionLabel:'Cancel →', amountCents:5999 },
  ],
  cashflow: buildCashflow('u_z', 84000, 24000),
  projection: { thirtyDay: 38000, sixtyDay: 74000, ninetyDay: 112000 },
  trip: {
    id:'trip_z1', userId:'u_z', name:'NYC Series A Roadshow', destination:'SFO → New York',
    startDate: fmt(addDays(today,5)), endDate: fmt(addDays(today,9)), nights:4, travelers:1,
    budgetCents:480000, spentCents:280000, isOnTrack:true, detectedFromEmail:true,
    categories: [
      { icon:'✈️', label:'FLIGHTS', spentCents:84000, budgetCents:100000, fillColor:'#5b8dff' },
      { icon:'🏨', label:'HOTEL', spentCents:196000, budgetCents:220000, fillColor:'#a78bfa' },
      { icon:'🍣', label:'DINNERS', spentCents:0, budgetCents:100000, fillColor:'#ffb347' },
      { icon:'🚖', label:'TRANSPORT', spentCents:0, budgetCents:60000, fillColor:'#00f5b0' },
    ],
    itinerary: [
      { date: fmt(addDays(today,5)), event:'Depart SFO → JFK', icon:'✈️', amountCents:84000, isCovered:true },
      { date: fmt(addDays(today,5)), event:'The Mark Hotel check-in', icon:'🏨', amountCents:196000, isCovered:true },
      { date: fmt(addDays(today,6)), event:'Sequoia NYC — Partner Meeting', icon:'🚀', amountCents:0, isCovered:true },
      { date: fmt(addDays(today,7)), event:'Founders Fund — Partner Meeting', icon:'🚀', amountCents:0, isCovered:true },
      { date: fmt(addDays(today,9)), event:'Return JFK → SFO', icon:'✈️', amountCents:0, isCovered:false },
    ],
  },
  netWorthCents: 105000000,
  safeToSpendCents: 3800000,
  monthlyIncomeCents: 8400000,
  monthlySpendCents: 2400000,
  subscriptionsTotalMonthlyCents: 34899,
  subscriptionsWastedMonthlyCents: 5999,
  sparklineData: [0.88, 0.90, 0.92, 0.93, 0.95, 0.97],
};

// ─── EXPORT ──────────────────────────────────────────────────────────────────

export const MOCK_DATA_SETS: UserFinancialProfile[] = [
  A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z
];

export default MOCK_DATA_SETS;
