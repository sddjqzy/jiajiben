// 家计本：陈家一家三口的家庭预算数据。
// 所有数字都是这户家庭 2026 年 10 月、11 月的真实记账汇总：
// 分类实际支出 = 该月该分类下每一笔流水之和；月结余 = 月收入 − 月支出。

const HOUSEHOLD = {
  name: '陈家',
  members: [
    { role: '爸爸', name: '陈明', job: '物流公司调度员', income: '月薪 ¥12,800' },
    { role: '妈妈', name: '林晓', job: '社区卫生服务中心护士', income: '月薪 ¥4,200' },
    { role: '孩子', name: '陈小满', job: '小学三年级', income: '副业分红 ¥0' },
  ],
  city: '山东临沂',
  motto: '先记账，再花钱；每一笔都知道去向。',
};

const CATEGORIES = [
  { id: 'food', name: '餐饮伙食', color: '#e8590c', budget: 3200 },
  { id: 'housing', name: '住房房贷', color: '#0f766e', budget: 4500 },
  { id: 'transport', name: '交通出行', color: '#1d4ed8', budget: 900 },
  { id: 'edu', name: '孩子教育', color: '#7c3aed', budget: 2200 },
  { id: 'daily', name: '日用购物', color: '#0891b2', budget: 1400 },
  { id: 'health', name: '医疗健康', color: '#dc2626', budget: 600 },
  { id: 'fun', name: '娱乐休闲', color: '#db2777', budget: 800 },
  { id: 'utility', name: '通讯水电', color: '#65a30d', budget: 900 },
  { id: 'clothing', name: '服饰穿戴', color: '#92400e', budget: 700 },
];

const INCOME_KINDS = {
  salaryDad: '陈明工资',
  salaryMom: '林晓工资',
  side: '副业收入',
  invest: '理财收益',
};

// 每条流水：date 为 MM-DD，kind 为 out（支出）或 in（收入），
// amount 单位为元，cat 为 CATEGORIES 的 id，收入用 INCOME_KINDS 的 key。
const MONTHS = {
  '2026-11': {
    label: '2026 年 11 月',
    days: '11 月 1 日 – 11 月 26 日',
    income: [
      { date: '11-05', kind: 'salaryDad', amount: 12800, note: '陈明 10 月工资到账' },
      { date: '11-06', kind: 'salaryMom', amount: 4200, note: '林晓 10 月工资到账' },
      { date: '11-10', kind: 'side', amount: 1100, note: '周末代驾兼职收入' },
      { date: '11-15', kind: 'invest', amount: 400, note: '货币基金 10 月收益' },
    ],
    records: [
      { date: '11-01', cat: 'food', kind: 'out', amount: 486, note: '大润发超市周采购', method: '微信支付' },
      { date: '11-02', cat: 'transport', kind: 'out', amount: 300, note: '加油 40 升', method: '支付宝' },
      { date: '11-03', cat: 'food', kind: 'out', amount: 128, note: '菜市场买菜', method: '现金' },
      { date: '11-04', cat: 'edu', kind: 'out', amount: 1200, note: '英语班 11 月学费', method: '银行转账' },
      { date: '11-05', cat: 'utility', kind: 'out', amount: 268, note: '10 月电费', method: '支付宝' },
      { date: '11-05', cat: 'food', kind: 'out', amount: 132, note: '水果店买橙子苹果', method: '微信支付' },
      { date: '11-06', cat: 'daily', kind: 'out', amount: 326, note: '纸巾、洗衣液、洗洁精', method: '微信支付' },
      { date: '11-07', cat: 'fun', kind: 'out', amount: 118, note: '周末电影票两张', method: '支付宝' },
      { date: '11-07', cat: 'food', kind: 'out', amount: 96, note: '外卖晚餐', method: '美团' },
      { date: '11-08', cat: 'transport', kind: 'out', amount: 100, note: '公交卡充值', method: '支付宝' },
      { date: '11-08', cat: 'health', kind: 'out', amount: 86, note: '小满感冒药', method: '医保卡' },
      { date: '11-09', cat: 'utility', kind: 'out', amount: 96, note: '10 月水费', method: '支付宝' },
      { date: '11-09', cat: 'food', kind: 'out', amount: 342, note: '超市周采购', method: '微信支付' },
      { date: '11-10', cat: 'housing', kind: 'out', amount: 4500, note: '11 月房贷自动扣款', method: '银行代扣' },
      { date: '11-11', cat: 'edu', kind: 'out', amount: 880, note: '钢琴课四节', method: '银行转账' },
      { date: '11-12', cat: 'utility', kind: 'out', amount: 143, note: '10 月燃气费', method: '支付宝' },
      { date: '11-12', cat: 'food', kind: 'out', amount: 386, note: '姥姥来家聚餐买菜', method: '微信支付' },
      { date: '11-13', cat: 'transport', kind: 'out', amount: 280, note: '加油 37 升', method: '支付宝' },
      { date: '11-14', cat: 'daily', kind: 'out', amount: 214, note: '洗发水、牙膏、护手霜', method: '微信支付' },
      { date: '11-14', cat: 'food', kind: 'out', amount: 168, note: '粮油：大米、花生油', method: '微信支付' },
      { date: '11-15', cat: 'fun', kind: 'out', amount: 260, note: '游乐场亲子套票', method: '支付宝' },
      { date: '11-15', cat: 'food', kind: 'out', amount: 154, note: '菜市场买菜', method: '现金' },
      { date: '11-16', cat: 'health', kind: 'out', amount: 298, note: '陈明年度体检', method: '医保卡' },
      { date: '11-17', cat: 'food', kind: 'out', amount: 88, note: '外卖午餐', method: '美团' },
      { date: '11-17', cat: 'fun', kind: 'out', amount: 93, note: '奶茶和零食', method: '微信支付' },
      { date: '11-18', cat: 'utility', kind: 'out', amount: 286, note: '两部手机话费', method: '支付宝' },
      { date: '11-18', cat: 'edu', kind: 'out', amount: 240, note: '练习册和文具', method: '微信支付' },
      { date: '11-19', cat: 'food', kind: 'out', amount: 402, note: '超市周采购', method: '微信支付' },
      { date: '11-20', cat: 'transport', kind: 'out', amount: 62, note: '商场停车费', method: '微信支付' },
      { date: '11-21', cat: 'daily', kind: 'out', amount: 189, note: '纸巾、垃圾袋、清洁剂', method: '微信支付' },
      { date: '11-21', cat: 'food', kind: 'out', amount: 268, note: '周末火锅食材', method: '微信支付' },
      { date: '11-22', cat: 'edu', kind: 'out', amount: 160, note: '数学练习册两本', method: '微信支付' },
      { date: '11-23', cat: 'food', kind: 'out', amount: 142, note: '菜市场买菜', method: '现金' },
      { date: '11-23', cat: 'health', kind: 'out', amount: 48, note: '维生素 C 一瓶', method: '医保卡' },
      { date: '11-24', cat: 'transport', kind: 'out', amount: 70, note: '雨天打车上班', method: '支付宝' },
      { date: '11-24', cat: 'fun', kind: 'out', amount: 220, note: '家庭影院年会员', method: '微信支付' },
      { date: '11-25', cat: 'daily', kind: 'out', amount: 424, note: '换季收纳箱和衣架', method: '微信支付' },
      { date: '11-25', cat: 'food', kind: 'out', amount: 76, note: '外卖晚餐', method: '美团' },
      { date: '11-26', cat: 'food', kind: 'out', amount: 118, note: '早餐包子、牛奶、鸡蛋', method: '微信支付' },
    ],
  },
  '2026-10': {
    label: '2026 年 10 月',
    days: '10 月 1 日 – 10 月 31 日',
    income: [
      { date: '10-05', kind: 'salaryDad', amount: 12800, note: '陈明 9 月工资到账' },
      { date: '10-06', kind: 'salaryMom', amount: 4200, note: '林晓 9 月工资到账' },
      { date: '10-11', kind: 'side', amount: 800, note: '周末代驾兼职收入' },
      { date: '10-15', kind: 'invest', amount: 400, note: '货币基金 9 月收益' },
    ],
    records: [
      { date: '10-01', cat: 'food', kind: 'out', amount: 520, note: '国庆超市大采购', method: '微信支付' },
      { date: '10-02', cat: 'transport', kind: 'out', amount: 320, note: '加油 42 升', method: '支付宝' },
      { date: '10-03', cat: 'fun', kind: 'out', amount: 96, note: '电影票两张', method: '支付宝' },
      { date: '10-04', cat: 'edu', kind: 'out', amount: 1200, note: '英语班 10 月学费', method: '银行转账' },
      { date: '10-05', cat: 'utility', kind: 'out', amount: 296, note: '9 月电费', method: '支付宝' },
      { date: '10-06', cat: 'food', kind: 'out', amount: 486, note: '菜市场和水果', method: '现金' },
      { date: '10-08', cat: 'daily', kind: 'out', amount: 402, note: '日用品补货', method: '微信支付' },
      { date: '10-09', cat: 'utility', kind: 'out', amount: 88, note: '9 月水费', method: '支付宝' },
      { date: '10-10', cat: 'housing', kind: 'out', amount: 4500, note: '10 月房贷自动扣款', method: '银行代扣' },
      { date: '10-11', cat: 'edu', kind: 'out', amount: 880, note: '钢琴课四节', method: '银行转账' },
      { date: '10-12', cat: 'utility', kind: 'out', amount: 156, note: '9 月燃气费', method: '支付宝' },
      { date: '10-13', cat: 'food', kind: 'out', amount: 312, note: '外卖两顿', method: '美团' },
      { date: '10-14', cat: 'transport', kind: 'out', amount: 100, note: '公交卡充值', method: '支付宝' },
      { date: '10-15', cat: 'health', kind: 'out', amount: 398, note: '林晓年度体检', method: '医保卡' },
      { date: '10-16', cat: 'food', kind: 'out', amount: 428, note: '周末家庭聚餐', method: '微信支付' },
      { date: '10-18', cat: 'fun', kind: 'out', amount: 320, note: '游乐场亲子套票', method: '支付宝' },
      { date: '10-19', cat: 'daily', kind: 'out', amount: 268, note: '洗护用品', method: '微信支付' },
      { date: '10-20', cat: 'transport', kind: 'out', amount: 280, note: '加油 37 升', method: '支付宝' },
      { date: '10-21', cat: 'food', kind: 'out', amount: 612, note: '超市周采购', method: '微信支付' },
      { date: '10-22', cat: 'edu', kind: 'out', amount: 280, note: '课外书三本', method: '微信支付' },
      { date: '10-23', cat: 'utility', kind: 'out', amount: 306, note: '两部手机话费', method: '支付宝' },
      { date: '10-24', cat: 'fun', kind: 'out', amount: 220, note: '家庭影院年会员续费', method: '微信支付' },
      { date: '10-25', cat: 'daily', kind: 'out', amount: 196, note: '纸巾、清洁剂', method: '微信支付' },
      { date: '10-26', cat: 'food', kind: 'out', amount: 210, note: '水果店', method: '微信支付' },
      { date: '10-27', cat: 'transport', kind: 'out', amount: 64, note: '商场停车费', method: '微信支付' },
      { date: '10-28', cat: 'daily', kind: 'out', amount: 420, note: '换季收纳', method: '微信支付' },
      { date: '10-29', cat: 'fun', kind: 'out', amount: 106, note: '奶茶和零食', method: '微信支付' },
      { date: '10-30', cat: 'food', kind: 'out', amount: 536, note: '粮油和超市采购', method: '微信支付' },
      { date: '10-31', cat: 'health', kind: 'out', amount: 120, note: '小满退烧药', method: '医保卡' },
    ],
  },
};

// 每月固定账单：day 为每月扣款日；paid 表示 11 月是否已付。
const BILLS = [
  { id: 'mortgage', name: '房贷', amount: 4500, day: 10, note: '建设银行自动扣款，剩余 18 年 4 个月', paid: true },
  { id: 'electric', name: '电费', amount: 268, day: 5, note: '10 月用电 412 度', paid: true },
  { id: 'water', name: '水费', amount: 96, day: 9, note: '10 月用水 9 吨', paid: true },
  { id: 'gas', name: '燃气费', amount: 143, day: 12, note: '10 月用气 38 立方米', paid: true },
  { id: 'property', name: '物业费', amount: 320, day: 15, note: '每月 15 日交，含停车管理费', paid: true },
  { id: 'phone', name: '话费', amount: 286, day: 18, note: '两部手机套餐共 286 元', paid: true },
  { id: 'broadband', name: '宽带', amount: 129, day: 20, note: '300M 宽带月费', paid: true },
  { id: 'insurance', name: '重疾险', amount: 486, day: 28, note: '陈明重疾险年缴分摊到月', paid: false },
  { id: 'english', name: '英语班学费', amount: 1200, day: 30, note: '小满英语班 12 月学费预付', paid: false },
];

// 储蓄目标：saved 为截至 11 月 26 日已存金额。
const GOALS = [
  { id: 'emergency', name: '应急金', target: 30000, saved: 18600, note: '够全家 3 个月基本开销，心里才踏实。' },
  { id: 'eduFund', name: '孩子教育金', target: 50000, saved: 21400, note: '小满小学到初中的课外班和夏令营。' },
  { id: 'car', name: '换车基金', target: 80000, saved: 12000, note: '现在的车开了 9 年，目标 2028 年换一辆混动。' },
  { id: 'travel', name: '家庭旅行', target: 8000, saved: 5200, note: '明年暑假去青岛看海，预算 8,000 元。' },
];

// 按月汇总：收入、支出、结余、各分类实际支出（由流水逐笔加总）。
function summarizeMonth(key) {
  const m = MONTHS[key];
  const income = m.income.reduce((s, r) => s + r.amount, 0);
  const byCat = {};
  for (const c of CATEGORIES) byCat[c.id] = 0;
  for (const r of m.records) byCat[r.cat] += r.amount;
  const expense = Object.values(byCat).reduce((s, v) => s + v, 0);
  const budget = CATEGORIES.reduce((s, c) => s + c.budget, 0);
  return { key, label: m.label, days: m.days, income, expense, balance: income - expense, budget, byCat };
}

function money(n) {
  return '¥' + n.toLocaleString('zh-CN');
}

function catName(id) {
  const c = CATEGORIES.find((x) => x.id === id);
  return c ? c.name : id;
}

function catColor(id) {
  const c = CATEGORIES.find((x) => x.id === id);
  return c ? c.color : '#666';
}
