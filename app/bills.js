// 账单页：勾选已付 / 取消已付、新增一笔账单；已付状态存在本机。
// 今天按 11 月 26 日算：28 日的重疾险和 30 日的英语班学费还没到日子。
function renderBills() {
  const paid = BILLS.filter((b) => billPaid(b.id));
  const unpaid = BILLS.filter((b) => !billPaid(b.id));
  const paidSum = paid.reduce((t, b) => t + b.amount, 0);
  const unpaidSum = unpaid.reduce((t, b) => t + b.amount, 0);
  document.getElementById('sumLine').textContent =
    '11 月账单共 ' + BILLS.length + ' 笔 ' + money(paidSum + unpaidSum)
    + ' · 已付 ' + paid.length + ' 笔 ' + money(paidSum)
    + ' · 待付 ' + unpaid.length + ' 笔 ' + money(unpaidSum);

  document.getElementById('billRows').innerHTML = BILLS.map((b) => {
    const isPaid = billPaid(b.id);
    const soon = !isPaid && b.day - 26 <= 4;
    return '<tr><td><input type="checkbox" data-bill="' + b.id + '"'
      + (isPaid ? ' checked' : '') + ' aria-label="标记' + b.name + '已付"></td>'
      + '<td>' + b.name + '</td><td class="num">' + money(b.amount) + '</td>'
      + '<td>每月 ' + b.day + ' 日' + (soon ? ' <span class="pill unpaid">快到期</span>' : '') + '</td>'
      + '<td class="hide-mobile">' + b.note + '</td>'
      + '<td><span class="pill ' + (isPaid ? 'paid' : 'unpaid') + '">' + (isPaid ? '已付' : '待付') + '</span></td></tr>';
  }).join('');

  document.querySelectorAll('#billRows input[type="checkbox"]').forEach((box) => {
    box.addEventListener('change', () => {
      setBillPaid(box.dataset.bill, box.checked);
      renderBills();
    });
  });
}

document.getElementById('addBillForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('bName').value.trim();
  const amount = Math.round(Number(document.getElementById('bAmount').value));
  const day = Math.round(Number(document.getElementById('bDay').value));
  if (!name || !amount || amount <= 0 || !day || day < 1 || day > 31) {
    document.getElementById('billMsg').textContent = '名称、金额和扣款日都要填对：金额大于 0，扣款日在 1–31 日之间。';
    return;
  }
  BILLS.push({ id: 'custom-' + Date.now(), name, amount, day, note: '自己加的账单', paid: false });
  document.getElementById('billMsg').textContent = '已加上账单「' + name + '」，每月 ' + day + ' 日付 ' + money(amount) + '。';
  e.target.reset();
  renderBills();
});

renderBills();
