import { useEffect, useId, useRef, useState } from 'react'
import mermaid from 'mermaid'

mermaid.initialize({ startOnLoad: false, theme: 'neutral' })

export default function Mermaid({ chart }: { chart: string }) {
  const id = useId().replace(/:/g, '')
  const containerRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    async function render() {
      try {
        const { svg } = await mermaid.render(`m-${id}`, chart)
        if (!active) return
        if (containerRef.current) containerRef.current.innerHTML = svg
        setError(null)
      } catch (e: any) {
        setError(e?.message || 'Failed to render diagram')
      }
    }
    render()
    return () => { active = false }
  }, [chart, id])

  if (error) {
    return <pre className="rounded border bg-rose-50 p-3 text-rose-700">Mermaid error: {error}</pre>
  }
  return <div ref={containerRef} className="overflow-auto" />
}

