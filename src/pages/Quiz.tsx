import Quiz from '../components/Quiz'
import { quizBasics, quizAdvanced, quizIPv6, quizWLAN, quizQoS, quizMonitoring, quizDesign, quizSubnetOSI } from '../data/quizzes'

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
        <div className="rounded-lg border bg-white p-4">
          <div className="mb-2 text-lg font-semibold">IPv6</div>
          <Quiz questions={quizIPv6} />
        </div>
        <div className="rounded-lg border bg-white p-4">
          <div className="mb-2 text-lg font-semibold">Wireless (WLAN)</div>
          <Quiz questions={quizWLAN} />
        </div>
        <div className="rounded-lg border bg-white p-4">
          <div className="mb-2 text-lg font-semibold">QoS</div>
          <Quiz questions={quizQoS} />
        </div>
        <div className="rounded-lg border bg-white p-4">
          <div className="mb-2 text-lg font-semibold">Monitoring</div>
          <Quiz questions={quizMonitoring} />
        </div>
        <div className="rounded-lg border bg-white p-4">
          <div className="mb-2 text-lg font-semibold">Design & HA</div>
          <Quiz questions={quizDesign} />
        </div>
        <div className="rounded-lg border bg-white p-4">
          <div className="mb-2 text-lg font-semibold">Subnetting & OSI</div>
          <Quiz questions={quizSubnetOSI} />
        </div>
      </section>
    </div>
  )
}
