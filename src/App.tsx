export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-6">
      <div className="mx-auto max-w-xl">
        <h1 className="text-3xl font-bold underline mb-4">Hello world!</h1>
        <p className="mb-2">If Tailwind is working, this text is styled.</p>
        <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
          Tailwind Button
        </button>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="h-16 rounded bg-gradient-to-r from-pink-500 to-rose-500"></div>
          <div className="h-16 rounded bg-gradient-to-r from-teal-500 to-emerald-500"></div>
        </div>
      </div>
    </div>
  )
}

