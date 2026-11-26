// 记账流水页：按分类筛选、按关键字搜索、新增一笔收支；新增的流水
// 立即计入汇总并存在本机，下次打开还在。
let currentMonth = '2026-11';
let filterCat = 'all';
let keyword = '';

function renderRecords() {
  const s = summarizeLive(currentMonth);
  document.getElementById('monthLabel').textContent = s.label;
  const all = monthRecords(currentMonth);
  const shown = all.filter((r) => {
    if (filterCat === 'in') return r.kind === 'in';
    if (filterCat === 'out') return r.kind === 'out';
    if (filterCat !== 'all') return r.cat === filterCat;
    return true;
  }).filter((r) => !keyword || (r.note + catName(r.cat) + r.method).includes(keyword));

  document.getElementById('sumLine').textContent =
    '共 ' + shown.length + ' 笔 · 收入 ' + money(
      shown.filter((r) => r.kind === 'in').reduce((t, r) => t + r.amount, 0))
    + ' · 支出 ' + money(
      shown.filter((r) => r.kind === 'out').reduce((t, r) => t + r.amount, 0));

  document.getElementById('recordRows').innerHTML = shown.length === 0
    ? '<tr><td colspan="5">没有符合条件的流水，换个筛选试试。</td></tr>'
    : shown.map((r) => '<tr' + (r.mine ? ' class="mine"' : '') + '><td>' + r.date + '</td>'
      + '<td>' + (r.kind === 'in' ? INCOME_KINDS[r.cat] || catName(r.cat) : catName(r.cat)) + '</td>'
      + '<td>' + r.note + '</td><td class="hide-mobile">' + r.method + '</td>'
      + '<td class="num">' + (r.kind === 'in' ? '+' : '−') + money(r.amount) + '</td></tr>').join('');
}

document.querySelectorAll('.month-switch button').forEach((btn) => {
  btn.addEventListener('click', () => {
    currentMonth = btn.dataset.month;
    document.querySelectorAll('.month-switch button').forEach((b) =>
      b.setAttribute('aria-pressed', String(b === btn)));
    renderRecords();
  });
});

document.getElementById('catFilter').addEventListener('change', (e) => {
  filterCat = e.target.value;
  renderRecords();
});

document.getElementById('searchBox').addEventListener('input', (e) => {
  keyword = e.target.value.trim();
  renderRecords();
});

document.getElementById('addForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const date = document.getElementById('fDate').value;
  const kind = document.getElementById('fKind').value;
  const cat = document.getElementById('fCat').value;
  const amount = Math.round(Number(document.getElementById('fAmount').value));
  const note = document.getElementById('fNote').value.trim();
  const method = document.getElementById('fMethod').value;
  if (!date || !amount || amount <= 0 || !note) {
    document.getElementById('formMsg').textContent = '日期、金额和备注都要填，金额要大于 0。';
    return;
  }
  addRecord(currentMonth, { date: date.slice(5), cat, kind, amount, note, method });
  document.getElementById('formMsg').textContent =
    '已记一笔' + (kind === 'in' ? '收入' : '支出') + ' ' + money(amount) + '，汇总已更新。';
  e.target.reset();
  document.getElementById('fDate').value = '2026-11-26';
  renderRecords();
});

// 分类下拉框：支出用 9 个分类，收入用 4 种收入来源。
const catSelect = document.getElementById('fCat');
function fillCatOptions() {
  const kind = document.getElementById('fKind').value;
  catSelect.innerHTML = kind === 'in'
    ? Object.entries(INCOME_KINDS).map(([k, v]) => '<option value="' + k + '">' + v + '</option>').join('')
    : CATEGORIES.map((c) => '<option value="' + c.id + '">' + c.name + '</option>').join('');
}
document.getElementById('fKind').addEventListener('change', fillCatOptions);
fillCatOptions();

renderRecords();
