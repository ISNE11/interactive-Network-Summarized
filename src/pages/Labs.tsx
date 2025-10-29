import { useMemo, useState } from 'react'

type Scenario = {
  id: string
  title: string
  description: string
  prompt: string
  expected: RegExp[] // commands to match (case-insensitive)
  hint?: string
  sampleSolution: string
}

const scenarios: Scenario[] = [
  {
    id: 'vlan-trunk',
    title: 'Create VLANs and Trunk',
    description: 'Create VLAN 10 and 20, set Gi0/1 as trunk allowing 10,20.',
    prompt: 'Switch config mode. Provide commands to create VLANs and configure trunk on Gi0/1.',
    expected: [
      /^vlan\s+10$/i,
      /^vlan\s+20$/i,
      /^interface\s+g(?:i|igabitethernet)?0\/1$/i,
      /^switchport\s+mode\s+trunk$/i,
      /^switchport\s+trunk\s+allowed\s+vlan\s+.*(10).*$/i,
      /^switchport\s+trunk\s+allowed\s+vlan\s+.*(20).*$/i,
    ],
    sampleSolution: 'vlan 10\nvlan 20\ninterface gi0/1\nswitchport mode trunk\nswitchport trunk allowed vlan 10,20',
  },
  {
    id: 'intervlan-svi',
    title: 'Inter-VLAN Routing (SVI)',
    description: 'Create SVI for VLAN 10 and enable L3 routing.',
    prompt: 'Provide commands to create SVI VLAN10 with 192.168.10.1/24 and enable routing.',
    expected: [
      /^interface\s+vlan\s+10$/i,
      /^ip\s+address\s+192\.168\.10\.1\s+255\.255\.255\.0$/i,
      /^no\s+shutdown$/i,
      /^ip\s+routing$/i,
    ],
    sampleSolution: 'interface vlan 10\nip address 192.168.10.1 255.255.255.0\nno shutdown\nip routing',
  },
  {
    id: 'stp-root',
    title: 'RSTP Root for VLAN 10',
    description: 'Enable Rapid-PVST and make this switch root for VLAN 10.',
    prompt: 'Provide commands to enable RSTP and set low priority for VLAN10.',
    expected: [
      /^spanning-tree\s+mode\s+rapid-pvst$/i,
      /^spanning-tree\s+vlan\s+10\s+priority\s+\d+$/i,
    ],
    sampleSolution: 'spanning-tree mode rapid-pvst\nspanning-tree vlan 10 priority 4096',
  },
  {
    id: 'dhcp-snooping',
    title: 'DHCP Snooping',
    description: 'Enable snooping globally and trust the uplink Gi0/1 for VLANs 10,20.',
    prompt: 'Provide commands to enable DHCP Snooping for VLANs and trust uplink.',
    expected: [
      /^ip\s+dhcp\s+snooping$/i,
      /^ip\s+dhcp\s+snooping\s+vlan\s+10(?:,|\s+)?20$/i,
      /^interface\s+g(?:i|igabitethernet)?0\/1$/i,
      /^ip\s+dhcp\s+snooping\s+trust$/i,
    ],
    sampleSolution: 'ip dhcp snooping\nip dhcp snooping vlan 10,20\ninterface gi0/1\n ip dhcp snooping trust',
  },
  {
    id: 'fhrp-hsrp',
    title: 'HSRP Gateway',
    description: 'Configure HSRP group 1 on VLAN 10, virtual IP 192.168.10.1.',
    prompt: 'Provide commands under SVI to set HSRP with preempt.',
    expected: [
      /^interface\s+vlan\s+10$/i,
      /^standby\s+1\s+ip\s+192\.168\.10\.1$/i,
      /^standby\s+1\s+priority\s+\d+$/i,
      /^standby\s+1\s+preempt$/i,
    ],
    sampleSolution: 'interface vlan 10\n standby 1 ip 192.168.10.1\n standby 1 priority 110\n standby 1 preempt',
  },
  {
    id: 'ospf-basic',
    title: 'OSPF Single Area',
    description: 'Enable OSPF area 0 on interfaces in 10.0.0.0/24 and 172.16.0.0/24.',
    prompt: 'Provide OSPF process 1 with matching network statements.',
    expected: [
      /^router\s+ospf\s+1$/i,
      /^network\s+10\.0\.0\.0\s+0\.0\.0\.255\s+area\s+0$/i,
      /^network\s+172\.16\.0\.0\s+0\.0\.0\.255\s+area\s+0$/i,
    ],
    sampleSolution: 'router ospf 1\n network 10.0.0.0 0.0.0.255 area 0\n network 172.16.0.0 0.0.0.255 area 0',
  },
]

export default function Labs() {
  const [active, setActive] = useState<Scenario>(scenarios[0])
  const [input, setInput] = useState('')

  const results = useMemo(() => {
    const lines = input.split(/\r?\n/).map(l => l.trim()).filter(Boolean)
    const matched = active.expected.map(re => lines.some(l => re.test(l)))
    const score = matched.filter(Boolean).length
    return { matched, score, total: active.expected.length }
  }, [input, active])

  return (
    <div className="space-y-6">
      <header className="rounded-xl bg-brand-gradient p-6 text-white shadow">
        <h1 className="text-2xl font-bold">CLI Labs</h1>
        <p className="mt-1 text-white/90">Practice typing real configs. We check for required lines using regex patterns.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <aside className="space-y-2 md:col-span-1">
          {scenarios.map(s => (
            <button
              key={s.id}
              className={`w-full rounded border px-3 py-2 text-left hover:bg-slate-50 ${active.id === s.id ? 'border-slate-900' : ''}`}
              onClick={() => { setActive(s); setInput('') }}
            >
              <div className="font-medium">{s.title}</div>
              <div className="text-xs text-slate-600">{s.description}</div>
            </button>
          ))}
        </aside>

        <section className="md:col-span-2">
          <div className="rounded-lg border bg-white p-4">
            <div className="mb-2 text-lg font-semibold">{active.title}</div>
            <p className="text-slate-600">{active.prompt}</p>

            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type each command on a new line..."
              className="mt-4 h-44 w-full rounded border bg-slate-50 p-2 font-mono text-sm"
            />

            <div className="mt-4 flex items-center gap-3 text-sm">
              <span className="rounded bg-slate-900 px-2 py-1 font-medium text-white">Score {results.score}/{results.total}</span>
              <button className="rounded border px-2 py-1 hover:bg-slate-50" onClick={() => setInput(active.sampleSolution)}>
                Fill Sample
              </button>
              <button className="rounded border px-2 py-1 hover:bg-slate-50" onClick={() => setInput('')}>
                Clear
              </button>
            </div>

            <ul className="mt-3 space-y-1 text-sm">
              {active.expected.map((re, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className={`inline-block h-2 w-2 rounded-full ${results.matched[i] ? 'bg-emerald-600' : 'bg-slate-300'}`} />
                  <code className="text-slate-700">{re.toString()}</code>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}

