// 预算方法页：50 / 30 / 20 分配计算器，数字按陈家 11 月收入 ¥18,500 现算。
function calc() {
  const income = Math.round(Number(document.getElementById('calcIncome').value) || 0);
  const box = document.getElementById('calcResult');
  if (!income || income <= 0) {
    box.innerHTML = '<p>先输入月收入，再点“算一算”。</p>';
    return;
  }
  const need = Math.round(income * 0.5);
  const want = Math.round(income * 0.3);
  const save = income - need - want;
  box.innerHTML = '<div class="rule-box">'
    + '<div><div class="pct">50%</div><b>必要开销 ' + money(need) + '</b><p>房贷、水电、吃饭、交通、孩子学费——不花不行的钱。</p></div>'
    + '<div><div class="pct">30%</div><b>想要的生活 ' + money(want) + '</b><p>电影、游乐场、奶茶、换季新衣——让日子有滋味的钱。</p></div>'
    + '<div><div class="pct">20%</div><b>先存起来 ' + money(save) + '</b><p>应急金、教育金、换车基金——发工资当天先转走。</p></div>'
    + '</div><p class="hint">陈家 11 月收入 ¥18,500：必要 ¥9,250，想要 ¥5,550，储蓄 ¥3,700；'
    + '实际结余 ¥4,653，比 20% 的线多存了 ¥953。</p>';
}

document.getElementById('calcBtn').addEventListener('click', calc);
calc();
