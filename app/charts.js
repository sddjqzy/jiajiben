// 家计本：纯 SVG 图表，不依赖任何图表库。
// 图表直接画进页面，数字全部来自 data.js 的汇总。

// 横向条形图：每类一根预算底条（浅色）+ 一根实际支出条（分类色），
// 超支的类别在条尾标红字。返回一段 SVG 字符串。
function barChart(rows, maxValue) {
  const rowH = 34;
  const labelW = 86;
  const valueW = 150;
  const width = 700;
  const barW = width - labelW - valueW;
  const height = rows.length * rowH + 8;
  let s = '<svg viewBox="0 0 ' + width + ' ' + height + '" role="img" aria-label="分类支出条形图" class="chart">';
  rows.forEach((r, i) => {
    const y = 8 + i * rowH;
    const bw = Math.max(2, Math.round((r.budget / maxValue) * barW));
    const aw = Math.max(2, Math.round((r.actual / maxValue) * barW));
    const over = r.actual > r.budget;
    s += '<text x="0" y="' + (y + 15) + '" class="chart-label">' + r.name + '</text>';
    s += '<rect x="' + labelW + '" y="' + y + '" width="' + bw + '" height="12" rx="3" class="chart-budget-bar"/>';
    s += '<rect x="' + labelW + '" y="' + (y + 14) + '" width="' + aw + '" height="12" rx="3" fill="' + r.color + '"/>';
    s += '<text x="' + (labelW + barW + 8) + '" y="' + (y + 15) + '" class="chart-value' + (over ? ' over' : '') + '">'
      + money(r.actual) + '/' + money(r.budget) + (over ? ' 超支' : '') + '</text>';
  });
  return s + '</svg>';
}

// 环形图：支出结构占比，中间写总支出。返回一段 SVG 字符串。
function donutChart(rows, total) {
  const size = 220;
  const cx = size / 2;
  const cy = size / 2;
  const r = 78;
  const hole = 52;
  let s = '<svg viewBox="0 0 ' + size + ' ' + size + '" role="img" aria-label="支出结构环形图" class="donut">';
  let angle = -Math.PI / 2;
  for (const row of rows) {
    if (row.actual <= 0) continue;
    const frac = row.actual / total;
    const a0 = angle;
    const a1 = angle + frac * Math.PI * 2;
    const large = frac > 0.5 ? 1 : 0;
    const x0 = cx + r * Math.cos(a0);
    const y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    const ix1 = cx + hole * Math.cos(a1);
    const iy1 = cy + hole * Math.sin(a1);
    const ix0 = cx + hole * Math.cos(a0);
    const iy0 = cy + hole * Math.sin(a0);
    s += '<path d="M ' + x0.toFixed(1) + ' ' + y0.toFixed(1) + ' A ' + r + ' ' + r + ' 0 ' + large + ' 1 '
      + x1.toFixed(1) + ' ' + y1.toFixed(1) + ' L ' + ix1.toFixed(1) + ' ' + iy1.toFixed(1)
      + ' A ' + hole + ' ' + hole + ' 0 ' + large + ' 0 ' + ix0.toFixed(1) + ' ' + iy0.toFixed(1) + ' Z" fill="' + row.color + '"/>';
    angle = a1;
  }
  s += '<text x="' + cx + '" y="' + (cy - 4) + '" text-anchor="middle" class="donut-total">' + money(total) + '</text>';
  s += '<text x="' + cx + '" y="' + (cy + 18) + '" text-anchor="middle" class="donut-label">本月总支出</text>';
  return s + '</svg>';
}
