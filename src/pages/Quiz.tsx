import Quiz from '../components/Quiz'
import { quizBasics, quizAdvanced } from '../data/quizzes'

export default function QuizPage() {
  return (
    <div className="space-y-8">
      <header className="rounded-xl bg-brand-gradient p-6 text-white shadow">
        <h1 className="text-2xl font-bold">Quizzes</h1>
        <p className="mt-1 text-white/90">Check your understanding across core and advanced topics.</p>
      </header>

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

