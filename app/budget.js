// 分类预算页：每月预算 vs 实际，可改预算；超支的分类标红并给省钱建议。
let currentMonth = '2026-11';

const ADVICE = {
  food: '建议：周采购一次列清单，外卖控制在每周两次以内。',
  housing: '建议：房贷固定支出，提前还款前先算清违约金。',
  transport: '建议：短途骑车或公交，油费每月能省 100 元左右。',
  edu: '建议：先问清退费规则再续课，课外班一次只报一门。',
  daily: '建议：日用品趁大促囤三个月的量，别零散买。',
  health: '建议：体检走医保定点，常规药常备不囤。',
  fun: '建议：亲子活动优先选公园、图书馆这类免费场地。',
  utility: '建议：随手关灯、空调 26 度，电费每月能降一成。',
  clothing: '建议：换季前先清衣柜，缺什么补什么。',
};

function renderBudget() {
  const s = summarizeLive(currentMonth);
  document.getElementById('monthLabel').textContent = s.label;
  document.getElementById('sumLine').textContent =
    '预算 ' + money(s.budget) + ' · 已花 ' + money(s.expense) + ' · '
    + (s.expense <= s.budget ? '剩余 ' + money(s.budget - s.expense) : '超支 ' + money(s.expense - s.budget));
  document.getElementById('budgetTable').innerHTML = CATEGORIES.map((c) => {
    const budget = budgetFor(c.id);
    const actual = s.byCat[c.id] || 0;
    const pct = budget > 0 ? Math.round((actual / budget) * 100) : 0;
    const over = actual > budget;
    return '<tr><td>' + c.name + '</td>'
      + '<td class="num">' + money(budget) + '</td>'
      + '<td class="num">' + money(actual) + '</td>'
      + '<td class="num">' + (budget - actual >= 0 ? '剩 ' + money(budget - actual) : '超 ' + money(actual - budget)) + '</td>'
      + '<td class="num"><span class="pill' + (over ? ' over' : '') + '">' + pct + '%</span></td>'
      + '<td><input type="number" min="0" step="50" value="' + budget + '" data-cat="' + c.id
      + '" aria-label="' + c.name + '预算"></td></tr>';
  }).join('');

  const overCats = CATEGORIES.filter((c) => (s.byCat[c.id] || 0) > budgetFor(c.id));
  document.getElementById('advice').innerHTML = overCats.length === 0
    ? '<p class="ok">本月没有分类超支，继续保持。</p>'
    : overCats.map((c) => '<p><b>' + c.name + '超支 ' + money((s.byCat[c.id] || 0) - budgetFor(c.id)) + '</b>。'
      + ADVICE[c.id] + '</p>').join('');

  document.querySelectorAll('#budgetTable input').forEach((input) => {
    input.addEventListener('change', () => {
      const v = Math.max(0, Math.round(Number(input.value) || 0));
      setBudget(input.dataset.cat, v);
      renderBudget();
    });
  });
}

document.querySelectorAll('.month-switch button').forEach((btn) => {
  btn.addEventListener('click', () => {
    currentMonth = btn.dataset.month;
    document.querySelectorAll('.month-switch button').forEach((b) =>
      b.setAttribute('aria-pressed', String(b === btn)));
    renderBudget();
  });
});

document.getElementById('resetBudgets').addEventListener('click', () => {
  CATEGORIES.forEach((c) => setBudget(c.id, c.budget));
  renderBudget();
});

renderBudget();
