import fs from 'fs/promises'
import path from 'path'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const { PDFParse } = require('pdf-parse')

const src = path.resolve('course_slides/summarized/Net Design Finale.pdf')
const outDir = path.resolve('content')
const out = path.join(outDir, 'finale.md')

function heuristicsToMarkdown(text) {
  const lines = text.split(/\r?\n/)
  const out = []
  for (let raw of lines) {
    const l = raw.trim()
    if (!l) continue
    if (/^\d+\s*[-–]\s*\d+\s*of\s*\d+/i.test(l)) continue // page headers
    if (/^(agenda|overview|summary|objectives)\b/i.test(l)) out.push(`\n### ${l.replace(/\s*[:–-]\s*$/,'')}`)
    else if (/^[•\-\u2022]/.test(l)) out.push(`- ${l.replace(/^[•\-\u2022]\s?/, '')}`)
    else out.push(l)
  }
  return `# Final Notes\n\n` + out.join('\n') + '\n'
}

async function main() {
  const buf = await fs.readFile(src)
  const parser = new PDFParse({ data: buf })
  const data = await parser.getText()
  await parser.destroy()
  const md = heuristicsToMarkdown(data.text || '')
  await fs.mkdir(outDir, { recursive: true })
  await fs.writeFile(out, md, 'utf8')
  console.log('Wrote', out)
}

main().catch((e)=>{ console.error(e); process.exit(1) })

