import Quiz from '../components/Quiz'
import { quizBasics } from '../data/quizzes'

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="overflow-hidden rounded-2xl bg-brand-gradient p-8 text-white shadow">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
          <div className="flex-1">
            <h1 className="text-3xl font-bold">Network Study Hub</h1>
            <p className="mt-2 max-w-2xl text-white/90">
              Learn faster with clean summaries, interactive diagrams, hands-on labs, and quick quizzes — all aligned to your coursework.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href="/learn" className="rounded-md bg-white px-4 py-2 font-medium text-slate-900 hover:bg-white/90">Start Learning</a>
              <a href="/quiz" className="rounded-md bg-white/10 px-4 py-2 font-medium text-white ring-1 ring-white/40 hover:bg-white/15">Take a Quiz</a>
              <a href="/labs" className="rounded-md bg-white/10 px-4 py-2 font-medium text-white ring-1 ring-white/40 hover:bg-white/15">Practice Labs</a>
              <a href="/commands" className="rounded-md bg-white/10 px-4 py-2 font-medium text-white ring-1 ring-white/40 hover:bg-white/15">Command Cheatsheet</a>
            </div>
          </div>
          <div className="flex-1">
            <div className="rounded-xl bg-white/10 p-4 ring-1 ring-white/30">
              <div className="text-sm text-white/80">Quick Tips</div>
              <ul className="mt-2 list-disc pl-6 text-white/90">
                <li>Use Learn for curated, visual explanations.</li>
                <li>Hit Labs to type real configs and get feedback.</li>
                <li>Review Commands for fast recall before labs.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="grid gap-4 sm:grid-cols-3">
        <a href="/learn" className="rounded-xl border bg-white p-5 shadow-sm hover:shadow">
          <div className="text-lg font-semibold">Learn</div>
          <p className="mt-1 text-sm text-slate-600">Concise topics with Mermaid diagrams and key commands.</p>
        </a>
        <a href="/quiz" className="rounded-xl border bg-white p-5 shadow-sm hover:shadow">
          <div className="text-lg font-semibold">Quiz</div>
          <p className="mt-1 text-sm text-slate-600">Core and advanced questions to test understanding.</p>
        </a>
        <a href="/labs" className="rounded-xl border bg-white p-5 shadow-sm hover:shadow">
          <div className="text-lg font-semibold">Labs</div>
          <p className="mt-1 text-sm text-slate-600">Type configs for VLANs, STP, DHCP, HSRP, OSPF, and more.</p>
        </a>
      </section>

      {/* Inline quiz teaser */}
      <section className="rounded-2xl border bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Quick Quiz</h2>
          <a href="/quiz" className="text-sm font-medium text-indigo-700 hover:underline">See all</a>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <p className="text-slate-600">Answer a few core questions right here to warm up.</p>
            <p className="mt-2 text-sm text-slate-500">Covers VLANs, STP, Inter-VLAN routing, DHCP Snooping, QoS.</p>
          </div>
          <div className="rounded-lg border p-4">
            <Quiz questions={quizBasics.slice(0, 3)} />
          </div>
        </div>
      </section>
    </div>
  )
}
