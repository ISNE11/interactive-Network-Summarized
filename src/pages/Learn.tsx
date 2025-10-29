import { useMemo, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Mermaid from '../components/Mermaid'
import { topics } from '../content/topics'
import { Link } from 'react-router-dom'
// @ts-ignore - Vite raw import for external markdown
import finaleMd from '../../content/finale.md?raw'

export default function Learn() {
  const [tab, setTab] = useState<'topics' | 'final'>('topics')
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => {
    if (!query.trim()) return topics
    const q = query.toLowerCase()
    return topics.filter(t => t.title.toLowerCase().includes(q) || t.summary.toLowerCase().includes(q) || t.markdown.toLowerCase().includes(q))
  }, [query])

  return (
    <div className="space-y-6">
      <header className="rounded-xl bg-brand-gradient p-6 text-white shadow">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Learning</h1>
            <p className="mt-1 text-white/90">Curated topics with diagrams or your full “Final Notes”.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setTab('topics')} className={`rounded-md px-3 py-1.5 text-sm ${tab==='topics' ? 'bg-white/90 text-slate-900' : 'bg-white/10 text-white ring-1 ring-white/40 hover:bg-white/15'}`}>Topics</button>
            <button onClick={() => setTab('final')} className={`rounded-md px-3 py-1.5 text-sm ${tab==='final' ? 'bg-white/90 text-slate-900' : 'bg-white/10 text-white ring-1 ring-white/40 hover:bg-white/15'}`}>Final Notes</button>
          </div>
        </div>
        {tab==='topics' && (
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search topics, commands, keywords..."
              className="w-full rounded-md bg-white/95 px-3 py-2 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-white/60"
            />
            <Link to="/commands" className="inline-flex items-center justify-center rounded-md bg-white/10 px-4 py-2 text-white ring-1 ring-white/40 hover:bg-white/15">Commands</Link>
          </div>
        )}
      </header>

      {tab==='topics' ? (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            {filtered.map((t) => (
              <details key={t.id} className="group rounded-lg border bg-white p-4 shadow-sm open:shadow" open={Boolean(query)}>
                <summary className="flex cursor-pointer list-none items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">{t.title}</h2>
                    <p className="mt-1 text-sm text-slate-600">{t.summary}</p>
                  </div>
                  <span className="mt-1 select-none rounded bg-sky-50 px-2 py-1 text-xs text-sky-700 ring-1 ring-sky-200 group-open:hidden">Expand</span>
                  <span className="mt-1 hidden select-none rounded bg-sky-50 px-2 py-1 text-xs text-sky-700 ring-1 ring-sky-200 group-open:inline">Collapse</span>
                </summary>
                <div className="prose prose-slate mt-3 max-w-none">
                  <MarkdownWithMermaid content={t.markdown} />
                </div>
                {t.keyCommands && (
                  <div className="mt-3">
                    <div className="text-sm font-medium text-slate-700">Key commands</div>
                    <div className="mt-2 grid gap-2 sm:grid-cols-2">
                      {t.keyCommands.map((c, i) => (
                        <code key={i} className="block rounded bg-slate-100 px-2 py-1 text-sm">{c}</code>
                      ))}
                    </div>
                  </div>
                )}
              </details>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="rounded-md border bg-white p-4 text-slate-600">No topics match “{query}”. Try different keywords.</div>
          )}
        </>
      ) : (
        <section className="prose prose-slate max-w-none">
          <p className="not-prose mb-3 rounded bg-sky-100 px-3 py-2 text-slate-700">
            Source: <code>course_slides/summarized/Net Design Finale.pdf</code>. Update the file and run <code>npm run extract:finale</code> to refresh this page.
          </p>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{finaleMd || '# Missing finale.md. Run npm run extract:finale'}</ReactMarkdown>
        </section>
      )}
    </div>
  )
}

function MarkdownWithMermaid({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code(props) {
          const { className, children } = props as any
          const txt = String(children)
          const lang = (className || '').replace('language-', '')
          const isBlock = !!className
          if (isBlock && lang === 'mermaid') {
            return <Mermaid chart={txt} />
          }
          return <code className={className}>{children}</code>
        },
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
