// 家计本的交卷程序（Node 22+，只用标准库）。
//
// 仓库里是静态网站本身：app/ 下 6 个页面加配套的 JS 和 CSS，
// screenshots/ 下 4 张本站在浏览器里的实拍图。
// 这个程序把这两样原样抄到 /output（本地用 MAKEFUN_OUTPUT_DIR 代替），
// 再用 kit 自带的 vendor/makefun-frontend.ts 里的 buildDossier
// 写出 /output/dossier.json——评委读到的就是这份摘要。
// vendor/makefun-frontend.ts 是 kit 的原文件，一个字也没改；
// 评分器会用自己的同一份库重算一遍 dossier，必须逐字节相同。
//
// 本地跑法：mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) {
  cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });
}

// 评分器自己的上限（见 RULES.txt 的 gate）：截图最多 4 张、
// 每张不超 256 KiB；app/ 最多 993 个文件和目录、总共不超 16 MiB；
// dossier 正文不超 160 KiB。下面这组数就是按这些上限传的。
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);
