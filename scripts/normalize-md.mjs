#!/usr/bin/env node
/** 规范化 admonition / details 前后的空行，避免 MDX 解析异常。 */
import fs from 'node:fs';
import path from 'node:path';

function walk(dir) {
  return fs.readdirSync(dir, {withFileTypes: true}).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

let changed = 0;
for (const file of walk('docs').filter((f) => /\.mdx?$/.test(f))) {
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  const out = [];
  let fence = false;
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (/^```/.test(line)) fence = !fence;
    if (!fence) {
      // 关闭的 ::: 之后补空行
      if (/^:::\s*$/.test(line)) {
        while (out.length && out[out.length - 1] === '') out.pop();
        // 保留 admonition 体后的空行
        const prev = out[out.length - 1] || '';
        if (prev !== '') out.push('');
        out.push(line);
        const next = lines[i + 1];
        if (next !== undefined && next.trim() !== '') out.push('');
        continue;
      }
      // 打开的 ::: 之前补空行
      if (/^:::[a-z]+/.test(line)) {
        while (out.length && out[out.length - 1] === '') out.pop();
        if (out.length && out[out.length - 1].trim() !== '') out.push('');
        out.push(line);
        continue;
      }
      if (line === '</details>') {
        while (out.length && out[out.length - 1] === '') out.pop();
        out.push('');
        out.push(line);
        if (lines[i + 1] !== undefined && lines[i + 1].trim() !== '') out.push('');
        continue;
      }
      if (line === '<details>') {
        while (out.length && out[out.length - 1] === '') out.pop();
        if (out.length && out[out.length - 1].trim() !== '') out.push('');
        out.push(line);
        continue;
      }
    }
    out.push(line);
  }
  const text = out.join('\n');
  if (text !== fs.readFileSync(file, 'utf8')) {
    fs.writeFileSync(file, text);
    changed++;
  }
}
console.log(`normalized ${changed} files`);
