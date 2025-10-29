import { useMemo, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Mermaid from '../components/Mermaid'
import { topics } from '../content/topics'

export default function Learn() {
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => {
    if (!query.trim()) return topics
    const q = query.toLowerCase()
    return topics.filter(t => t.title.toLowerCase().includes(q) || t.summary.toLowerCase().includes(q) || t.markdown.toLowerCase().includes(q))
  }, [query])

  return (
    <div className="space-y-6">
      <header className="rounded-xl bg-brand-gradient p-6 text-white shadow">
        <h1 className="text-2xl font-bold">Learning Topics</h1>
        <p className="mt-1 text-white/90">Clear, concise explanations with diagrams and example commands.</p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search topics, commands, keywords..."
            className="w-full rounded-md bg-white/95 px-3 py-2 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-white/60"
          />
          <a href="/commands" className="inline-flex items-center justify-center rounded-md bg-white/10 px-4 py-2 text-white ring-1 ring-white/40 hover:bg-white/15">Commands</a>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((t) => (
          <article key={t.id} className="rounded-lg border bg-white p-4 shadow-sm">
            <h2 className="text-lg font-semibold">{t.title}</h2>
            <p className="mt-1 text-sm text-slate-600">{t.summary}</p>
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
          </article>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="rounded-md border bg-white p-4 text-slate-600">No topics match “{query}”. Try different keywords.</div>
      )}
    </div>
  )
}

function MarkdownWithMermaid({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ inline, className, children }) {
          const txt = String(children)
          const lang = (className || '').replace('language-', '')
          if (!inline && lang === 'mermaid') {
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
