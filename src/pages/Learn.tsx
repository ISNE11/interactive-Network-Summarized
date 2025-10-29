import { useMemo, useState } from 'react'
import ReactMarkdown from 'react-markdown'
// Import generated summary as raw text (run: npm run summarize)
// @ts-ignore - Vite raw import
import summaryMd from '../../content/summary.md?raw'

type Section = { title: string; body: string }

function splitSections(md: string): Section[] {
  const parts = md.split(/\n##\s+/).map((s, idx) => (idx === 0 ? s : '## ' + s))
  const sections: Section[] = []
  for (const chunk of parts) {
    if (!chunk.trim()) continue
    const m = /^##\s+(.+?)\s*$/m.exec(chunk)
    if (m) {
      const title = m[1].trim()
      const body = chunk.replace(/^##\s+.+?\n/, '')
      sections.push({ title, body })
    }
  }
  return sections
}

export default function Learn() {
  const [query, setQuery] = useState('')
  const sections = useMemo(() => splitSections(summaryMd || ''), [])
  const filtered = useMemo(() => {
    if (!query.trim()) return sections
    const q = query.toLowerCase()
    return sections.filter(s => s.title.toLowerCase().includes(q) || s.body.toLowerCase().includes(q))
  }, [query, sections])

  return (
    <div className="space-y-6">
      <header className="rounded-xl bg-brand-gradient p-6 text-white shadow">
        <h1 className="text-2xl font-bold">Learning Summary</h1>
        <p className="mt-1 text-white/90">
          Auto-generated from PDFs in <code className="px-1">course_slides</code>. Update slides and run <code className="px-1">npm run summarize</code>.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search topics, commands, keywords..."
            className="w-full rounded-md bg-white/95 px-3 py-2 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-white/60"
          />
          <a href="/commands" className="inline-flex items-center justify-center rounded-md bg-white/10 px-4 py-2 text-white ring-1 ring-white/40 hover:bg-white/15">
            View Commands
          </a>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((s) => (
          <details key={s.title} className="group rounded-lg border bg-white p-4 open:shadow">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-2">
              <div className="truncate font-semibold text-slate-900">{s.title}</div>
              <div className="text-xs text-slate-500 group-open:hidden">Expand</div>
              <div className="hidden text-xs text-slate-500 group-open:block">Collapse</div>
            </summary>
            <div className="prose prose-slate mt-3 max-w-none">
              <ReactMarkdown>{s.body}</ReactMarkdown>
            </div>
            <div className="mt-3 flex gap-2">
              <button
                className="rounded border px-3 py-1 text-sm hover:bg-slate-50"
                onClick={() => navigator.clipboard.writeText(`# ${s.title}\n\n${s.body}`)}
              >
                Copy Section
              </button>
              <button
                className="rounded border px-3 py-1 text-sm hover:bg-slate-50"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Back to Top
              </button>
            </div>
          </details>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="rounded-md border bg-white p-4 text-slate-600">No sections match “{query}”. Try different keywords.</div>
      )}
    </div>
  )
}
