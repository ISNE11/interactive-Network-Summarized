import { useEffect, useId, useRef, useState } from 'react'
import mermaid from 'mermaid'

// Light blue theme for better readability
mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    fontFamily: 'ui-sans-serif, system-ui, sans-serif',
    background: '#F0F9FF', /* sky-50 */
    primaryColor: '#E0F2FE', /* sky-100 */
    primaryBorderColor: '#0284C7', /* sky-600 */
    primaryTextColor: '#0F172A', /* slate-900 */
    secondaryColor: '#DBEAFE', /* indigo-100 */
    secondaryBorderColor: '#2563EB', /* indigo-600 */
    tertiaryColor: '#F1F5F9', /* slate-100 */
    lineColor: '#0284C7',
    textColor: '#0F172A',
    actorLineColor: '#0284C7',
    actorTextColor: '#0F172A',
    noteBkgColor: '#EFF6FF',
    noteTextColor: '#0F172A',
    signalColor: '#0369A1',
    signalTextColor: '#0F172A',
  },
})

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
  return (
    <div className="rounded-lg border bg-sky-50 p-3">
      <div ref={containerRef} className="overflow-auto" />
    </div>
  )
}
