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
    id: 'enterprise-design',
    title: 'Enterprise Campus Design',
    summary: 'Core–Distribution–Access layered model for scale, performance and fault domain isolation.',
    markdown: `
### Layers
- Core: fast transport, no policy; redundant and highly available
- Distribution: L3 between access blocks; policy, ACLs, summarization
- Access: edge connectivity; VLANs, QoS, Port Security

### Modular Blocks
- Group access switches + distribution pair into a switch block
- Failure isolation: one block failure shouldn’t impact others

### Example
\`\`\`mermaid
flowchart TB
  subgraph Core
    C1((Core 1)) --- C2((Core 2))
  end
  subgraph Dist_A[Switch Block A]
    D1((Dist-1)) --- D2((Dist-2))
    A1[Access Stack]:::acc
    A2[Access Stack]:::acc
    A1 --- D1
    A1 --- D2
    A2 --- D1
    A2 --- D2
  end
  C1 --- D1
  C2 --- D2
  classDef acc fill:#eef;
\`\`\`
`,
    keyCommands: [
      'ip routing',
      'summary-address (on distribution where applicable)',
    ],
  },
  {
    id: 'lacp',
    title: 'Link Aggregation (LACP)',
    summary: 'Combine parallel links for resiliency and higher bandwidth while appearing as one logical port.',
    markdown: `
### Why LACP?
- Increases throughput and provides fast failover
- Load shares flows while avoiding L2 loops

### Config Outline
- Place member links in the same channel-group
- Use active/active (preferred) or passive/active

### Diagram
\`\`\`mermaid
flowchart LR
  A[Switch A] == LACP bundle == B[Switch B]
  A -. member gi0/1, gi0/2 .- B
\`\`\`
`,
    keyCommands: [
      'interface range gi0/1-2',
      'channel-group 1 mode active',
      'interface port-channel 1',
      'switchport mode trunk',
    ],
  },
  {
    id: 'private-vlan',
    title: 'Private VLAN (PVLAN)',
    summary: 'Isolate hosts at Layer 2 within the same VLAN using primary and secondary VLANs.',
    markdown: `
### Types
- Primary VLAN: carries traffic to promiscuous ports
- Secondary VLANs:
  - Isolated: cannot talk to other isolated or community hosts
  - Community: can talk within the same community

### Use Cases
- DMZ segmentation for servers on the same subnet
`,
    keyCommands: [
      'vlan 100\n private-vlan primary',
      'vlan 101\n private-vlan community',
      'vlan 102\n private-vlan isolated',
      'vlan 100\n private-vlan association 101,102',
      'interface gi0/10\n switchport mode private-vlan host\n switchport private-vlan host-association 100 102',
    ],
  },
  {
    id: 'monitoring',
    title: 'Monitoring and Telemetry',
    summary: 'Observe and troubleshoot with Syslog, SNMP, and NetFlow/sFlow.',
    markdown: `
### Building Blocks
- Syslog: event logs to a collector (levels 0–7)
- SNMP: state/metrics via polling and traps
- NetFlow/sFlow: flow-level traffic visibility

### Typical Config
- Set logging host and severity
- Configure SNMP community or v3 users
- Export flows to a collector
`,
    keyCommands: [
      'logging host 10.10.10.10',
      'logging trap warnings',
      'snmp-server community MONITOR RO',
      'ip flow-export destination 10.10.10.20 2055',
    ],
  },
  {
    id: 'wlan',
    title: 'WLAN Integration',
    summary: 'Centralized WLAN controllers with APs, VLAN anchoring, and QoS for voice/data SSIDs.',
    markdown: `
### Modes
- Local mode APs tunnel to WLC
- FlexConnect for branch survivability

### VLAN/SSID
- Map SSIDs to VLANs; trunk to AP switch ports

### Diagram
\`\`\`mermaid
flowchart LR
  AP1((AP)) -- CAPWAP --> WLC((Controller))
  WLC --> SW((Campus Network))
  subgraph SSIDs
    V10[VLAN 10 - Corp]
    V20[VLAN 20 - Guest]
  end
\`\`\`
`,
    keyCommands: [
      'mls qos trust cos (AP trunk)',
      'switchport trunk allowed vlan add <corp,guest>',
    ],
  },
  {
    id: 'security-basics',
    title: 'Security Basics (Campus Edge)',
    summary: 'Harden access layer with Port Security, DHCP Snooping, and DAI.',
    markdown: `
### Controls
- Port Security: limit MAC count and action on violation
- DHCP Snooping: block rogue servers; trust uplinks
- Dynamic ARP Inspection: prevent ARP spoofing (needs Snooping bindings)
`,
    keyCommands: [
      'switchport port-security',
      'switchport port-security maximum 2',
      'switchport port-security violation restrict',
      'ip dhcp snooping',
      'ip arp inspection vlan 10',
    ],
  },
  {
    id: 'ipv6-fundamentals',
    title: 'IPv6 Fundamentals',
    summary: 'Addressing model, SLAAC vs DHCPv6, and core routing/first‑hop features.',
    markdown: `
### Addressing
- Global Unicast (2000::/3), Link‑Local (fe80::/10), ULA (fc00::/7)
- EUI‑64 or stable privacy interface IDs

### Host Addressing
- SLAAC via Router Advertisements
- DHCPv6 for stateful options (DNS, address)

### Diagram
\`\`\`mermaid
sequenceDiagram
  participant H as Host
  participant R as L3 Interface
  R-->>H: RA (prefix 2001:db8:10::/64)
  H-->>R: (optional) RS
  Note over H: Generates address via SLAAC
\`\`\`
`,
    keyCommands: [
      'ipv6 unicast-routing',
      'interface vlan 10\n ipv6 address 2001:db8:10::1/64',
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
