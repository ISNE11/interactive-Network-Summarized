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
  A[Access Switch] -- "VLAN 10/20" --> D[Distribution]
  B[Access Switch] -- "VLAN 10/20" --> D
  D -- "802.1Q trunk" --> C[Core]
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
    id: 'osi-layers',
    title: 'OSI Layers (1–7)',
    summary: 'Overview of functions, typical devices, and examples from Physical up to Application.',
    markdown: `
### Stack Overview

| Layer | Name         | Key Functions                              | Examples / Devices |
|-----: |--------------|---------------------------------------------|--------------------|
| 7     | Application  | User-facing protocols, app services         | HTTP, DNS, SSH     |
| 6     | Presentation | Encoding, compression, encryption           | TLS, JPEG, JSON    |
| 5     | Session      | Sessions, dialogs, checkpoints              | RPC, NetBIOS       |
| 4     | Transport    | End-to-end transport, reliability, flow     | TCP, UDP           |
| 3     | Network      | Logical addressing, routing, fragmentation  | IP, OSPF, EIGRP    |
| 2     | Data Link    | Framing, MAC, switching, VLAN, STP          | Ethernet, 802.1Q   |
| 1     | Physical     | Bits on the wire, signaling, media          | Fiber, UTP, 1000BASE-T |

### Notes
- Layer 2 handles MAC addressing, switching, VLAN tagging, and loop prevention (STP/RSTP/MST).
- Layer 3 provides IP addressing and routing between subnets/VLANs (SVIs, router-on-a-stick, OSPF/OSPFv3).
- Layer 4 uses TCP/UDP; QoS often matches traffic to transport characteristics.
- Layers 5–7 are often collapsed in modern stacks but are useful for troubleshooting.

### Visual
\`\`\`mermaid
flowchart TB
  L7[7 Application] --> L6[6 Presentation]
  L6 --> L5[5 Session]
  L5 --> L4[4 Transport]
  L4 --> L3[3 Network]
  L3 --> L2[2 Data Link]
  L2 --> L1[1 Physical]
  classDef app fill:#e8eaff,stroke:#6366f1,color:#0f172a;
  classDef net fill:#e0f2fe,stroke:#0284c7,color:#0f172a;
  class L7,L6,L5 app;
  class L4,L3,L2,L1 net;
\`\`\`
`,
  },
  {
    id: 'ipv4-subnet',
    title: 'IPv4 Classes and Subnetting',
    summary: 'Classful address overview (A/B/C/D/E), private ranges, CIDR, and quick subnet math.',
    markdown: `
### Classful Ranges (historical)

| Class | First Octet | Default Mask | Networks | Hosts/Net |
|------:|-------------:|--------------|---------:|----------:|
| A     | 1–126        | 255.0.0.0    |   126    | 16,777,214 |
| B     | 128–191      | 255.255.0.0  | 16,384   |     65,534 |
| C     | 192–223      | 255.255.255.0| 2,097,152|        254 |
| D     | 224–239      | N/A (Multicast) | —    | — |
| E     | 240–255      | Reserved     | —        | — |

Private ranges:
- Class A: 10.0.0.0/8
- Class B: 172.16.0.0/12
- Class C: 192.168.0.0/16

### CIDR and Subnetting
- CIDR uses prefix length instead of classes (e.g., 192.168.10.0/24)
- Subnet mask ↔ prefix: /24 = 255.255.255.0, /25 = 255.255.255.128, /26 = 255.255.255.192, /30 = 255.255.255.252
- Hosts per subnet ≈ 2^(host\_bits) − 2 (network/broadcast)
- Wildcard mask for ACL/OSPF: invert the subnet mask (e.g., 255.255.255.0 → 0.0.0.255)
- VLSM: choose different prefix lengths per subnet to reduce waste

### Quick Examples
- 10.0.0.0/16 → 255.255.0.0, hosts: 2^(16)−2 = 65,534
- 192.168.1.0/26 → 255.255.255.192, block size 64, subnets: .0, .64, .128, .192
- OSPF wildcard for /24 on 192.168.10.0 is 0.0.0.255 → \`network 192.168.10.0 0.0.0.255 area 0\`

### Visual
\`\`\`mermaid
flowchart LR
  A[Class A\n1–126]:::a -->|/8| H1[Host bits 24]
  B[Class B\n128–191]:::b -->|/16| H2[Host bits 16]
  C[Class C\n192–223]:::c -->|/24| H3[Host bits 8]
  classDef a fill:#dbeafe,stroke:#1d4ed8,color:#0f172a;
  classDef b fill:#e0f2fe,stroke:#0284c7,color:#0f172a;
  classDef c fill:#dcfce7,stroke:#16a34a,color:#0f172a;
\`\`\`
`,
  },
  {
    id: 'ha-chassis',
    title: 'High Availability (HA) and Chassis',
    summary: 'Reduce single points of failure using redundancy, stacks, and supervisor switchover modes.',
    markdown: `
### Basics of HA
- Each layer (Access/Distribution/Core) should have ≥2 devices
- Use redundant links to protect from single link failures
- Some platforms form a logical switch from two chassis (system sees 1)

### Technologies
- StackWise/StackWise Plus (Access): stack multiple switches with special cables; single control plane (same IP)
- VSS (Distribution/Core): two chassis act as one switch using virtual links; one active supervisor, one standby

### Chassis Elements
- Supervisor Engine (Route Processor), Line Cards, PSU, Cooling, Backplane/Midplane, Fabric Module, Redundant components, Rack

### Supervisor Redundancy Modes
- RPR: Standby initializes after fail — convergence in tens of seconds
- RPR+: Faster than RPR — some state preserved
- SSO: Stateful Switchover — sub‑second switchover; with NSF, routing adjacencies survive

### NSF (Nonstop Forwarding)
- Works with SSO to keep forwarding during control‑plane failover
- Routing protocols (BGP, EIGRP, OSPF, IS‑IS) re‑learn control state without dropping data plane
`,
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
  A[Switch A] -- "LACP bundle (Po1)" --- B[Switch B]
  %% Members (conceptual)
  A -- gi0/1 --- B
  A -- gi0/2 --- B
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

### NTP
- Synchronize device clocks; pick the lowest stratum source available

### SNMPv3 Security Levels
- noAuthNoPriv: no authentication or encryption
- authNoPriv: authentication only
- authPriv: authentication and encryption

### Traffic Monitoring
- SPAN: local port mirroring within a switch
- RSPAN: remote mirroring via a special VLAN across multiple switches
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
### Modes of WLAN
- Ad‑Hoc (IBSS): peer‑to‑peer without AP
- Infrastructure (BSS): AP is central
- ESS: multiple APs on LAN providing extended service set
*Association* is the process of a client joining an AP.

### AP Operation
- Bridge wired to wireless; map SSIDs to VLANs (e.g., SSID "Corp" → VLAN 60)
- Plan AP cells with slight overlap for roaming (honeycomb pattern works well)

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

### WLAN Structure
- Autonomous: standalone APs, simpler but limited scale
- CUWN (Unified/WLC): lightweight APs (LAPs) controlled by WLC

### CUWN Principles
- LAP forwards control/data to WLC; roles split (L1‑2 association on LAP, L3+/security/config on WLC)
- Control plane uses CAPWAP; WLC and LAP authenticate (e.g., X.509)
- WLC can auto manage: channel/power, load balance, roaming aids, intrusion/rogue AP detection, RF monitoring

### Roaming
- Autonomous: client tears down and reassociates to new AP
- CUWN: intra‑controller roaming under one WLC; inter‑controller roaming across WLCs
- L2 roaming: same VLAN/subnet; L3 roaming: new VLAN/subnet with tunneling to preserve IP
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
  S -- "SVI V10/V20" --> R((L3))
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

### Protocols
- HSRP (Cisco), VRRP (IETF RFC5798), GLBP (Cisco load‑balancing)

### HSRP Behavior
- One Active and one Standby; hosts use Virtual IP and MAC
- On failover, Standby takes Active role; hosts learn via gratuitous ARP

### Choosing Active
- Highest priority wins (default 100). If equal, highest router IP.
- Enable preempt so a higher‑priority router can take over when it returns
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
### What DHCP Provides
- IP address
- Subnet mask
- Default gateway
- DNS server(s)

### Operation (DORA)
- Discover: client broadcasts to find a DHCP server
- Offer: server proposes an address/lease to the client
- Request: client requests the offered address
- Ack: server confirms and records the lease

\`\`\`mermaid
sequenceDiagram
  participant C as Client
  participant S as DHCP Server
  C-->>S: Discover (broadcast)
  S-->>C: Offer (IP proposal)
  C-->>S: Request (accept)
  S-->>C: Ack (approve)
\`\`\`

### DHCP Relay (IP Helper Address)
- When the DHCP server lives in another VLAN/subnet, configure \`ip helper-address\` on the SVI to forward requests.
- For multiple servers, add multiple helper addresses.

### IPv6 and SLAAC
- SLAAC can assign IPv6 addresses from Router Advertisements (no DHCPv6 required).
- DHCPv6 can still provide addressing and options when needed.

### Configure (example IPv4)
- Exclude static range
  - \`ip dhcp excluded-address 192.168.1.1 192.168.1.2\`
- Create a pool
  - \`ip dhcp pool ISNEPoolVlan\`
  - \`network 192.168.1.0 255.255.255.0\`
  - \`default-router 192.168.1.1\`
- Verify leases: \`show ip dhcp binding\`
- Relay on SVI
  - \`interface vlan 10\`
  - \`ip address 10.10.10.1 255.255.255.0\`
  - \`ip helper-address 10.10.20.2\`

### Snooping
- Trust only uplinks; untrusted access ports blocked for rogue offers
`,
    keyCommands: [
      'ip dhcp excluded-address 192.168.1.1 192.168.1.2',
      'ip dhcp pool ISNEPoolVlan',
      'network 192.168.1.0 255.255.255.0',
      'default-router 192.168.1.1',
      'show ip dhcp binding',
      'interface vlan 10\n ip helper-address 10.10.20.2',
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
### Goals
- Reduce delay, jitter, and packet loss for critical apps

### Models
- Best Effort: FIFO, no guarantees
- IntServ: hard QoS with reserved flows
- DiffServ: soft QoS, class‑based (widely used)

### Class of Service (CoS)
- Layer 2 802.1Q tag has 3‑bit PCP (0–7) to indicate priority

### ToS / DSCP
- ToS (IPv4) replaced by DSCP (top 6 bits, values 0–63) used in DiffServ

### Assured Forwarding (AF)
- AFxy classes with drop precedence (y). Example: AF31/AF32/AF33

### Principles
1) Classification & Marking — set DSCP/CoS
2) Shaping & Policing — shape smooths; police cuts excess
3) Congestion Mgmt — FIFO, WRR, PQ, CQ
4) Congestion Avoidance — Tail‑Drop, WRED

### Marking at the Edge
- Access edge marks based on app/port/ACL
- Trust at trunk boundaries when appropriate
`,
    keyCommands: [
      'mls qos',
      'mls qos trust cos',
    ],
  },
]
