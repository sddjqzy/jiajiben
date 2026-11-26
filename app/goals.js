// 储蓄目标页：每个目标的进度 + 存入一笔钱；追加的存款存在本机。
function renderGoals() {
  const totalSaved = GOALS.reduce((t, g) => t + g.saved + goalExtra(g.id), 0);
  const totalTarget = GOALS.reduce((t, g) => t + g.target, 0);
  document.getElementById('sumLine').textContent =
    '4 个目标共需 ' + money(totalTarget) + '，已存 ' + money(totalSaved)
    + '，整体完成 ' + Math.round((totalSaved / totalTarget) * 100) + '%。';

  document.getElementById('goalList').innerHTML = GOALS.map((g) => {
    const saved = g.saved + goalExtra(g.id);
    const pct = Math.min(100, Math.round((saved / g.target) * 100));
    const left = Math.max(0, g.target - saved);
    return '<section class="card"><div class="goal-head"><b>' + g.name + '</b>'
      + '<span class="goal-amt"><b>' + money(saved) + '</b> / ' + money(g.target) + '</span></div>'
      + '<p class="hint">' + g.note + '</p>'
      + '<div class="bar"><i class="' + (pct >= 100 ? '' : pct >= 60 ? 'warn' : '') + '" style="width:' + pct + '%"></i></div>'
      + '<p>' + pct + '% · ' + (left > 0 ? '还差 ' + money(left) : '目标达成，可以开始下一个目标了。') + '</p>'
      + '<div class="deposit"><button class="small" data-goal="' + g.id + '" data-amount="100">存 ¥100</button>'
      + '<button class="small" data-goal="' + g.id + '" data-amount="500">存 ¥500</button>'
      + '<button class="small" data-goal="' + g.id + '" data-amount="1000">存 ¥1,000</button>'
      + '<input type="number" min="1" step="1" placeholder="其他金额" aria-label="存入' + g.name + '的金额" data-custom="' + g.id + '">'
      + '<button class="small ghost" data-goal-custom="' + g.id + '">存入</button></div></section>';
  }).join('');

  document.querySelectorAll('#goalList [data-amount]').forEach((btn) => {
    btn.addEventListener('click', () => {
      addToGoal(btn.dataset.goal, Number(btn.dataset.amount));
      renderGoals();
    });
  });
  document.querySelectorAll('#goalList [data-goal-custom]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const input = document.querySelector('[data-custom="' + btn.dataset.goalCustom + '"]');
      const amount = Math.round(Number(input.value));
      if (!amount || amount <= 0) return;
      addToGoal(btn.dataset.goalCustom, amount);
      renderGoals();
    });
  });
}

document.getElementById('resetGoals').addEventListener('click', () => {
  resetStore();
  renderGoals();
});

renderGoals();
