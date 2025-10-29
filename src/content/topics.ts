export type Topic = {
  id: string
  title: string
  summary: string
  markdown: string // may include ```mermaid blocks
  keyCommands?: string[]
}

export const topics: Topic[] = [
  {
    id: 'vlans',
    title: 'VLANs and Trunking',
    summary: 'Segment Layer 2 domains for isolation and scalability; use trunks to carry multiple VLANs between switches.',
    markdown: `
### Why VLANs?
- Reduce broadcast domains and improve security/containment
- Map org units to VLANs (e.g., Users, Servers, Voice)

### Trunking
- 802.1Q tagging carries multiple VLANs on a single link
- Native VLAN is untagged (keep consistent across links)

### Typical Topology
\`\`\`mermaid
flowchart LR
  A[Access Switch] -- VLAN 10/20 --> D[Distribution]
  B[Access Switch] -- VLAN 10/20 --> D
  D -- 802.1Q trunk --> C[Core]
\`\`\`

### Pitfalls
- Mismatched native VLANs
- Trunk allowed lists not aligned
`,
    keyCommands: [
      'vlan 10',
      'interface gi0/1',
      'switchport mode trunk',
      'switchport trunk allowed vlan 10,20',
    ],
  },
  {
    id: 'intervlan',
    title: 'Inter-VLAN Routing',
    summary: 'Route between VLANs via router-on-a-stick or multilayer switches (SVIs).',
    markdown: `
### Options
- Router-on-a-stick: single physical link, subinterfaces per VLAN
- Multilayer switch: SVI per VLAN + \`ip routing\`

\`\`\`mermaid
flowchart LR
  A[Host VLAN 10] --> S((SW))
  B[Host VLAN 20] --> S
  S -- SVI V10/V20 --> R((L3))
  R --> Internet
\`\`\`

### Key Checks
- SVIs up/up (VLAN exists + some active port in VLAN)
- Default gateway = SVI IP
`,
    keyCommands: [
      'interface vlan 10',
      'ip address 192.168.10.1 255.255.255.0',
      'no shutdown',
      'ip routing',
    ],
  },
  {
    id: 'stp',
    title: 'Spanning Tree (STP/RSTP/MST)',
    summary: 'Prevent Layer 2 loops; RSTP converges quickly; MST scales by mapping VLANs to instances.',
    markdown: `
### Purpose
Avoid bridging loops and broadcast storms by blocking redundant links.

\`\`\`mermaid
flowchart LR
  R((Root Bridge)) --- A((SW-A))
  R --- B((SW-B))
  A --- B
  style A fill:#eef
  style B fill:#eef
  %% One of A<->B is blocked by STP
\`\`\`

### Quick Wins
- \`spanning-tree mode rapid-pvst\`
- Lower bridge priority on desired root
- Edge ports: \`portfast\` + \`bpduguard\`
`,
    keyCommands: [
      'spanning-tree mode rapid-pvst',
      'spanning-tree vlan 10 priority 4096',
      'spanning-tree portfast',
      'spanning-tree bpduguard enable',
    ],
  },
  {
    id: 'fhrp',
    title: 'First-Hop Redundancy (HSRP/VRRP/GLBP)',
    summary: 'Virtual default gateway with one active and one standby (or load-balanced with GLBP).',
    markdown: `
### Concept
Hosts point to a virtual IP; routers share that virtual IP and fail over.

\`\`\`mermaid
sequenceDiagram
  participant H as Host
  participant A as R1 (Active)
  participant S as R2 (Standby)
  H->>A: ARP for Virtual IP
  Note over A,S: Hello/hold timers decide active/standby
  A-->>H: MAC of virtual gateway
\`\`\`

### Tunables
- Preempt, priority, authentication
`,
    keyCommands: [
      'interface vlan 10',
      'standby 1 ip 192.168.10.1',
      'standby 1 priority 110',
      'standby 1 preempt',
    ],
  },
  {
    id: 'dhcp',
    title: 'DHCP and Snooping',
    summary: 'Central IP assignment and protection from rogue servers.',
    markdown: `
### DHCP Pool
- Gateway, DNS, lease timers
### Snooping
- Trust only uplinks; untrusted access ports blocked for rogue offers
`,
    keyCommands: [
      'ip dhcp pool VLAN10',
      'default-router 192.168.10.1',
      'ip dhcp snooping',
      'ip dhcp snooping vlan 10',
      'interface gi0/1\n ip dhcp snooping trust',
    ],
  },
  {
    id: 'qos',
    title: 'QoS Basics',
    summary: 'Prioritize important traffic; mark at Layer 2 (CoS) or Layer 3 (DSCP).',
    markdown: `
### Marking
- Access edge marks based on app/port/ACL
- Trust at trunk boundaries when needed
`,
    keyCommands: [
      'mls qos',
      'mls qos trust cos',
    ],
  },
]
