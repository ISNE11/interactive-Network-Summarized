import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Home from './pages/Home'
import Learn from './pages/Learn'
import QuizPage from './pages/Quiz'
import Labs from './pages/Labs'
import Commands from './pages/Commands'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div className="min-h-screen bg-sky-50 text-slate-900">
        <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <div className="text-lg font-semibold text-sky-700">Network Study Hub</div>
            <nav className="flex gap-4 text-sm">
              <NavLink to="/" end className={({isActive})=>`px-2 py-1 rounded ${isActive? 'bg-sky-700 text-white':'text-slate-700 hover:bg-sky-100'}`}>Home</NavLink>
              <NavLink to="/learn" className={({isActive})=>`px-2 py-1 rounded ${isActive? 'bg-sky-700 text-white':'text-slate-700 hover:bg-sky-100'}`}>Learn</NavLink>
              <NavLink to="/quiz" className={({isActive})=>`px-2 py-1 rounded ${isActive? 'bg-sky-700 text-white':'text-slate-700 hover:bg-sky-100'}`}>Quiz</NavLink>
              <NavLink to="/labs" className={({isActive})=>`px-2 py-1 rounded ${isActive? 'bg-sky-700 text-white':'text-slate-700 hover:bg-sky-100'}`}>Labs</NavLink>
              <NavLink to="/commands" className={({isActive})=>`px-2 py-1 rounded ${isActive? 'bg-sky-700 text-white':'text-slate-700 hover:bg-sky-100'}`}>Commands</NavLink>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/labs" element={<Labs />} />
            <Route path="/commands" element={<Commands />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
