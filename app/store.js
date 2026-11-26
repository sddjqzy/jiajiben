// 家计本：把用户自己的改动存在本机浏览器里（localStorage）。
// 改动包括：自己记的流水、账单的已付状态、储蓄目标的追加存款、
// 分类预算的调整。原始记账数据始终在 data.js 里，不会被覆盖；
// 清掉浏览器数据后，网站恢复到 data.js 的原始数字。
const STORE_KEY = 'jiajiben-v1';

function loadStore() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return { records: {}, billsPaid: {}, goalExtra: {}, budgets: {} };
    const s = JSON.parse(raw);
    return {
      records: s.records || {},
      billsPaid: s.billsPaid || {},
      goalExtra: s.goalExtra || {},
      budgets: s.budgets || {},
    };
  } catch {
    return { records: {}, billsPaid: {}, goalExtra: {}, budgets: {} };
  }
}

function saveStore(store) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(store));
  } catch {
    // 浏览器不让存时，改动只在本次打开有效，不报错打断页面。
  }
}

const store = loadStore();

// 该月的全部流水 = data.js 的原始流水 + 收入到账 + 用户自己记的流水。
function monthRecords(key) {
  const base = MONTHS[key].records.map((r) => ({ ...r, mine: false }));
  const income = MONTHS[key].income.map((r) => ({
    date: r.date, cat: r.kind, kind: 'in', amount: r.amount, note: r.note, method: '银行到账', mine: false,
  }));
  const extra = (store.records[key] || []).map((r) => ({ ...r, mine: true }));
  return base.concat(income, extra).sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

function addRecord(key, rec) {
  if (!store.records[key]) store.records[key] = [];
  store.records[key].push(rec);
  saveStore(store);
}

// 用户改过的分类预算（元），没改过返回 data.js 的默认值。
function budgetFor(catId) {
  if (store.budgets[catId] != null) return store.budgets[catId];
  const c = CATEGORIES.find((x) => x.id === catId);
  return c ? c.budget : 0;
}

function setBudget(catId, value) {
  store.budgets[catId] = value;
  saveStore(store);
}

// 账单是否已付：先看用户点的状态，没有再看 BILLS 的默认值。
function billPaid(id) {
  if (store.billsPaid[id] != null) return store.billsPaid[id];
  const b = BILLS.find((x) => x.id === id);
  return b ? b.paid : false;
}

function setBillPaid(id, paid) {
  store.billsPaid[id] = paid;
  saveStore(store);
}

// 储蓄目标的追加存款（元），在 GOALS.saved 之外累加。
function goalExtra(id) {
  return store.goalExtra[id] || 0;
}

function addToGoal(id, amount) {
  store.goalExtra[id] = (store.goalExtra[id] || 0) + amount;
  saveStore(store);
}

// 含用户自己记的流水在内的当月汇总：收入、支出、结余、各分类实际支出。
// 分类预算取 budgetFor（用户改过就用改过的数）。
function summarizeLive(key) {
  const m = MONTHS[key];
  let income = 0;
  const byCat = {};
  for (const c of CATEGORIES) byCat[c.id] = 0;
  for (const r of monthRecords(key)) {
    if (r.kind === 'in') income += r.amount;
    else byCat[r.cat] = (byCat[r.cat] || 0) + r.amount;
  }
  const expense = Object.values(byCat).reduce((s, v) => s + v, 0);
  const budget = CATEGORIES.reduce((s, c) => s + budgetFor(c.id), 0);
  return { key, label: m.label, days: m.days, income, expense, balance: income - expense, budget, byCat };
}

// 恢复出厂：清掉全部个人改动，回到 data.js 的原始数字。
function resetStore() {
  store.records = {};
  store.billsPaid = {};
  store.goalExtra = {};
  store.budgets = {};
  saveStore(store);
}
