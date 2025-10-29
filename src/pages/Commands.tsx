import { commands } from '../data/commands'

export default function Commands() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Command Summaries</h1>
      <p className="text-slate-600">Common commands and typical use cases from your coursework.</p>
      <div className="space-y-4">
        {commands.map((group) => (
          <section key={group.title} className="rounded-lg border bg-white p-4">
            <h2 className="text-lg font-semibold">{group.title}</h2>
            <ul className="mt-2 space-y-1">
              {group.items.map((it, idx) => (
                <li key={idx} className="grid gap-2 md:grid-cols-2 md:items-start">
                  <code className="rounded bg-slate-100 px-2 py-1">{it.cmd}</code>
                  <span className="text-slate-700">{it.description}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}

