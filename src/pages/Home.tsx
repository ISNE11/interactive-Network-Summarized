export default function Home() {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl font-bold">Welcome to Network Study Hub</h1>
        <p className="mt-2 text-slate-700 max-w-2xl">
          A single place to learn core concepts, practice exam-style labs, and review
          command summaries for your semester courses. Content is generated from your
          course_slides and organized for quick study.
        </p>
      </section>
      <section className="grid gap-4 sm:grid-cols-3">
        <a href="/learn" className="rounded-lg border p-4 hover:shadow">
          <div className="text-lg font-semibold">Learn</div>
          <p className="text-sm text-slate-600">Readable summaries from your slides.</p>
        </a>
        <a href="/labs" className="rounded-lg border p-4 hover:shadow">
          <div className="text-lg font-semibold">Labs</div>
          <p className="text-sm text-slate-600">Test your understanding with quizzes.</p>
        </a>
        <a href="/commands" className="rounded-lg border p-4 hover:shadow">
          <div className="text-lg font-semibold">Commands</div>
          <p className="text-sm text-slate-600">Key commands and use-cases.</p>
        </a>
      </section>
    </div>
  )
}

