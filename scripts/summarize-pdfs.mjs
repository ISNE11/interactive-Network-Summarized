import fs from 'fs/promises'
import path from 'path'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const { PDFParse } = require('pdf-parse')

const slidesDir = path.resolve('course_slides')
const outDir = path.resolve('content')
const outFile = path.join(outDir, 'summary.md')

async function listPdfFiles(dir) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true })
    return entries.filter(e => e.isFile() && e.name.toLowerCase().endsWith('.pdf')).map(e => path.join(dir, e.name))
  } catch (e) {
    console.error('Failed reading course_slides directory:', e.message)
    return []
  }
}

function roughSummarizeText(txt) {
  // Heuristic: keep lines that look like headings/bullets and drop long paragraphs
  const lines = txt.split(/\r?\n/)
  const picked = []
  for (const line of lines) {
    const l = line.trim()
    if (!l) continue
    const isHeading = /^(chapter|section|topic|objective|agenda|summary|overview)\b/i.test(l)
    const looksLikeBullet = /^[-•\u2022\u25CF\u2219\*]/.test(l)
    const likelyCommand = /^(show|ip|switchport|spanning-tree|vlan|interface|router|ping|traceroute|conf|no )/i.test(l)
    const shortLine = l.length <= 140
    if (isHeading || looksLikeBullet || likelyCommand || shortLine) picked.push(l)
  }
  // Collapse consecutive duplicates and trim
  const deDuped = picked.filter((l, i) => i === 0 || l !== picked[i - 1])
  return deDuped.join('\n')
}

async function main() {
  const files = await listPdfFiles(slidesDir)
  if (files.length === 0) {
    console.error('No PDF files found in course_slides')
    process.exit(1)
  }
  await fs.mkdir(outDir, { recursive: true })

  const parts = []
  parts.push('# Course Slides Summary\n')
  for (const file of files.sort()) {
    const name = path.basename(file)
    try {
      const buf = await fs.readFile(file)
      const parser = new PDFParse({ data: buf })
      const data = await parser.getText()
      await parser.destroy()
      const text = data.text || ''
      const summarized = roughSummarizeText(text)
      parts.push(`\n## ${name}\n`)
      parts.push(summarized || '_[No extractable text found]_')
    } catch (e) {
      parts.push(`\n## ${name}\n_[Error extracting text: ${e.message}]_`)
    }
  }

  const md = parts.join('\n')
  await fs.writeFile(outFile, md, 'utf8')
  console.log('Wrote', outFile)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
