import Quiz from '../components/Quiz'
import { quizBasics, quizAdvanced } from '../data/quizzes'

export default function Labs() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl font-bold">Practice Labs</h1>
        <p className="text-slate-600">Quick quizzes to test your understanding. More coming as we parse slides.</p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border bg-white p-4">
          <div className="mb-2 text-lg font-semibold">Core Concepts</div>
          <Quiz questions={quizBasics} />
        </div>
        <div className="rounded-lg border bg-white p-4">
          <div className="mb-2 text-lg font-semibold">Advanced Topics</div>
          <Quiz questions={quizAdvanced} />
        </div>
      </section>
    </div>
  )
}

