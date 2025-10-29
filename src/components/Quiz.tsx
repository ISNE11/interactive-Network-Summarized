import { useMemo, useState } from 'react'

export type QuizQuestion = {
  id: string
  question: string
  choices: string[]
  answerIndex: number
  explanation?: string
}

export default function Quiz({ questions }: { questions: QuizQuestion[] }) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const current = questions[index]
  const total = questions.length

  const progress = useMemo(() => Math.round(((index) / total) * 100), [index, total])

  const submit = () => {
    if (selected === null) return
    if (selected === current.answerIndex) setScore(s => s + 1)
    setIndex(i => Math.min(i + 1, total))
    setSelected(null)
  }

  if (!questions.length) return <div>No questions available.</div>
  if (index >= total) {
    return (
      <div className="space-y-4">
        <div className="text-xl font-semibold">Your score</div>
        <div className="text-3xl">{score} / {total}</div>
        <button className="rounded bg-slate-900 px-4 py-2 text-white" onClick={() => { setIndex(0); setScore(0); }}>
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="h-2 w-full rounded bg-slate-200">
        <div className="h-2 rounded bg-indigo-600" style={{ width: `${progress}%` }} />
      </div>
      <div className="text-sm text-slate-600">Question {index + 1} of {total}</div>
      <div className="text-lg font-medium">{current.question}</div>
      <div className="space-y-2">
        {current.choices.map((c, i) => (
          <label key={i} className={`flex cursor-pointer items-center gap-2 rounded border p-3 ${selected === i ? 'border-indigo-600 bg-indigo-50' : 'hover:bg-slate-50'}`}>
            <input type="radio" name={`q-${current.id}`} checked={selected === i} onChange={() => setSelected(i)} />
            <span>{c}</span>
          </label>
        ))}
      </div>
      <div className="flex gap-2">
        <button className="rounded bg-slate-900 px-4 py-2 text-white disabled:opacity-50" disabled={selected === null} onClick={submit}>
          {index === total - 1 ? 'Finish' : 'Submit'}
        </button>
        {selected !== null && (
          <span className={`self-center text-sm ${selected === current.answerIndex ? 'text-emerald-700' : 'text-rose-700'}`}>
            {selected === current.answerIndex ? 'Correct!' : 'Try next time.'}
          </span>
        )}
      </div>
      {current.explanation && selected !== null && (
        <div className="rounded border bg-white p-3 text-sm text-slate-700">
          {current.explanation}
        </div>
      )}
    </div>
  )
}

