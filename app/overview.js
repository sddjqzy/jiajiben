// 总览页：月份切换 + 收支卡片 + 分类条形图 + 支出环形图 + 最近流水 + 目标速览 + 待付账单。
let currentMonth = '2026-11';

function renderOverview() {
  const s = summarizeLive(currentMonth);
  document.getElementById('monthLabel').textContent = s.label + '（' + s.days + '）';
  document.getElementById('statIncome').textContent = money(s.income);
  document.getElementById('statExpense').textContent = money(s.expense);
  document.getElementById('statBalance').textContent = money(s.balance);
  document.getElementById('statBudget').textContent = money(s.budget);
  document.getElementById('budgetNote').textContent =
    '预算执行 ' + Math.round((s.expense / s.budget) * 100) + '%，'
    + (s.expense <= s.budget
      ? '比预算少花 ' + money(s.budget - s.expense) + '。'
      : '已超预算 ' + money(s.expense - s.budget) + '。');

  const rows = CATEGORIES.map((c) => ({
    name: c.name, color: c.color, budget: budgetFor(c.id), actual: s.byCat[c.id] || 0,
  }));
  const maxValue = Math.max(...rows.map((r) => Math.max(r.budget, r.actual)), 1);
  document.getElementById('barChart').innerHTML = barChart(rows, maxValue);
  document.getElementById('donutChart').innerHTML = donutChart(
    rows.filter((r) => r.actual > 0), s.expense,
  );
  document.getElementById('donutLegend').innerHTML = rows
    .filter((r) => r.actual > 0)
    .sort((a, b) => b.actual - a.actual)
    .map((r) => '<li><span class="dot" style="background:' + r.color + '"></span>' + r.name + ' '
      + money(r.actual) + '（' + Math.round((r.actual / s.expense) * 100) + '%）</li>')
    .join('');

  const recent = monthRecords(currentMonth).slice(0, 6);
  document.getElementById('recentList').innerHTML = recent.map((r) => '<tr>'
    + '<td>' + r.date + '</td><td>' + catName(r.cat) + '</td><td>' + r.note + '</td>'
    + '<td class="num">' + (r.kind === 'in' ? '+' : '−') + money(r.amount) + '</td></tr>').join('');

  document.getElementById('goalMini').innerHTML = GOALS.map((g) => {
    const saved = g.saved + goalExtra(g.id);
    const pct = Math.min(100, Math.round((saved / g.target) * 100));
    return '<div class="bar-row"><span>' + g.name + '</span>'
      + '<span class="bar"><i style="width:' + pct + '%"></i></span>'
      + '<span class="amt">' + money(saved) + ' / ' + money(g.target) + '</span></div>';
  }).join('');

  const unpaid = BILLS.filter((b) => !billPaid(b.id));
  document.getElementById('billMini').innerHTML = unpaid.length === 0
    ? '<p class="ok">本月账单全部付清了。</p>'
    : '<p>还有 <b>' + unpaid.length + '</b> 笔待付，共 <b>' + money(unpaid.reduce((t, b) => t + b.amount, 0)) + '</b>：</p>'
      + '<ul>' + unpaid.map((b) => '<li>' + b.name + ' ' + money(b.amount) + '（每月 ' + b.day + ' 日）</li>').join('') + '</ul>'
      + '<p><a href="bills.html">去账单页查看 →</a></p>';
}

document.querySelectorAll('.month-switch button').forEach((btn) => {
  btn.addEventListener('click', () => {
    currentMonth = btn.dataset.month;
    document.querySelectorAll('.month-switch button').forEach((b) =>
      b.setAttribute('aria-pressed', String(b === btn)));
    renderOverview();
  });
});

renderOverview();
