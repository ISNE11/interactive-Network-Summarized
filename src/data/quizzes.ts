import { QuizQuestion } from '../components/Quiz'

export const quizBasics: QuizQuestion[] = [
  {
    id: 'stp-mode',
    question: 'What is the main purpose of Spanning Tree Protocol (STP)?',
    choices: [
      'Increase VLAN throughput by bonding links',
      'Prevent Layer 2 loops by blocking redundant paths',
      'Encrypt frames between switches',
      'Provide first-hop redundancy for gateways',
    ],
    answerIndex: 1,
    explanation: 'STP prevents switching loops by calculating a loop-free topology and blocking some redundant ports.'
  },
  {
    id: 'vlan-purpose',
    question: 'VLANs primarily provide which of the following?',
    choices: ['Layer 3 segmentation', 'Layer 2 segmentation', 'QoS tagging', 'Encryption'],
    answerIndex: 1,
    explanation: 'VLANs segment broadcast domains at Layer 2.'
  },
  {
    id: 'intervlan',
    question: 'Which device function enables communication between different VLANs?',
    choices: ['Layer 2 switch trunking', 'Port mirroring', 'Inter-VLAN routing (router-on-a-stick or MLS)', 'DHCP Snooping'],
    answerIndex: 2,
    explanation: 'Inter-VLAN routing is done by a router-on-a-stick or a multilayer switch (SVI).'
  },
  {
    id: 'vtp',
    question: 'VTP is used to:',
    choices: ['Distribute VLAN information across switches', 'Provide PoE over Ethernet', 'Monitor SNMP traps', 'Perform QoS policing'],
    answerIndex: 0,
    explanation: 'VLAN Trunking Protocol distributes VLAN database information among switches in a domain.'
  },
  {
    id: 'dhcp-snooping',
    question: 'DHCP Snooping primarily helps prevent:',
    choices: ['Rogue DHCP servers', 'Layer 3 routing loops', 'Broadcast storms', 'Ingress queue drops'],
    answerIndex: 0,
    explanation: 'DHCP Snooping allows DHCP only from trusted ports, preventing rogue DHCP servers from assigning IPs.'
  },
  {
    id: 'qos',
    question: 'QoS marking at Layer 2 commonly uses:',
    choices: ['DSCP', 'CoS (802.1p)', 'TOS', 'TTL'],
    answerIndex: 1,
    explanation: '802.1p CoS is the Layer 2 priority field in 802.1Q VLAN tags; DSCP is Layer 3.'
  },
]

export const quizAdvanced: QuizQuestion[] = [
  {
    id: 'fhrp',
    question: 'Which protocols provide first-hop redundancy? (select the best answer)',
    choices: ['HSRP/VRRP/GLBP', 'OSPF/EIGRP', 'RSTP/MST', 'SNMP/NetFlow'],
    answerIndex: 0,
    explanation: 'HSRP, VRRP, and GLBP are first-hop redundancy protocols to virtualize the default gateway.'
  },
  {
    id: 'mst',
    question: 'MST main advantage compared to PVST+ is:',
    choices: ['Per-VLAN instance for every VLAN by default', 'Faster convergence than RSTP', 'Mapping multiple VLANs to one instance to scale', 'No need for bridge IDs'],
    answerIndex: 2,
    explanation: 'MST lets you map many VLANs to a smaller number of instances for scale and simpler management.'
  },
]

export const quizIPv6: QuizQuestion[] = [
  {
    id: 'ipv6-linklocal',
    question: 'Which prefix denotes IPv6 link-local addresses?',
    choices: ['fc00::/7', 'fe80::/10', '2000::/3', 'ff00::/8'],
    answerIndex: 1,
    explanation: 'Link-local addresses use fe80::/10 and are not routable.'
  },
  {
    id: 'ipv6-default',
    question: 'What is the IPv6 default route?',
    choices: ['0.0.0.0/0', '::/0', 'ff00::/8', 'fe80::/10'],
    answerIndex: 1,
    explanation: 'The IPv6 default route is ::/0.'
  },
  {
    id: 'slaac',
    question: 'SLAAC provides which of the following by itself?',
    choices: [
      'IPv6 address via RA prefix and interface ID',
      'Stateful address assignment with DNS servers',
      '802.1X authentication',
      'CoS marking for frames'
    ],
    answerIndex: 0,
    explanation: 'SLAAC builds an address from RA prefix; DHCPv6 is used for stateful options like DNS.'
  },
  {
    id: 'ospfv3-intf',
    question: 'How do you enable OSPFv3 on an interface?',
    choices: [
      'router ospf 1\n network 2001:db8::/64 area 0',
      'ipv6 router ospf 1\n interface ...\n ipv6 ospf 1 area 0',
      'router ospf 1\n passive-interface default',
      'ip ospf 1 area 0'
    ],
    answerIndex: 1,
    explanation: 'OSPFv3 is enabled per-interface with ipv6 ospf <pid> area <n> after creating the OSPFv3 process.'
  },
  {
    id: 'hsrp6',
    question: 'Which command sets an IPv6 HSRP virtual address?',
    choices: [
      'standby 1 ip 2001:db8:10::1',
      'standby 1 ipv6 2001:db8:10::1',
      'glbp 1 ip 2001:db8:10::1',
      'vrrp 1 address-family ipv6 2001:db8:10::1'
    ],
    answerIndex: 1,
    explanation: 'For HSRPv2 with IPv6, use standby <grp> ipv6 <vip>.'
  },
]

export const quizWLAN: QuizQuestion[] = [
  {
    id: 'bss-ess',
    question: 'In WLAN, an ESS is best described as:',
    choices: [
      'A single AP network without controller',
      'Multiple APs connected via LAN providing extended coverage',
      'A client-to-client network without AP',
      'A proprietary roaming protocol'
    ],
    answerIndex: 1,
    explanation: 'ESS connects multiple APs over LAN to extend the service set.'
  },
  {
    id: 'capwap',
    question: 'CAPWAP primarily provides:',
    choices: ['Encryption for client data only', 'Control/management channel between LAP and WLC', 'QoS tagging for SSIDs', 'DHCP relay to WLC'],
    answerIndex: 1,
    explanation: 'CAPWAP is the control/management plane between lightweight APs and the controller.'
  },
  {
    id: 'roaming',
    question: 'L3 roaming typically implies:',
    choices: ['Same VLAN/subnet with no IP change', 'New VLAN/subnet with tunneling or readdressing', 'Only works with autonomous APs', 'Requires WRED enabled'],
    answerIndex: 1,
    explanation: 'L3 roaming moves between subnets; solutions tunnel or readdress to preserve sessions.'
  },
  {
    id: 'ssid-vlan',
    question: 'Mapping SSIDs to VLANs is usually configured on:',
    choices: ['End hosts', 'Distribution switch only', 'AP switch ports (trunk) and controller/WLC', 'Core routers'],
    answerIndex: 2,
    explanation: 'AP ports are typically trunks; SSID→VLAN mapping is handled on the controller or AP config.'
  },
]

export const quizQoS: QuizQuestion[] = [
  {
    id: 'dscp-bits',
    question: 'DSCP uses how many bits of the IP header?',
    choices: ['3', '6', '8', '16'],
    answerIndex: 1,
    explanation: 'DSCP uses the upper 6 bits of the ToS/DS field.'
  },
  {
    id: 'cos-bits',
    question: '802.1p CoS field is how many bits?',
    choices: ['2', '3', '6', '8'],
    answerIndex: 1,
    explanation: 'CoS/PCP is a 3-bit field in the 802.1Q tag.'
  },
  {
    id: 'shape-vs-police',
    question: 'Shaping vs policing — which statement is correct?',
    choices: ['Shaping drops immediately; policing buffers', 'Shaping buffers to smooth; policing drops or marks excess', 'Both only mark packets', 'Both are queue schedulers'],
    answerIndex: 1,
    explanation: 'Shaping smooths by buffering; policing enforces a hard rate by dropping/marking excess.'
  },
  {
    id: 'wred',
    question: 'WRED is used for:',
    choices: ['Strict priority for voice', 'Early drop to avoid global synchronization', 'Encrypt traffic in queues', 'Guarantee minimum bandwidth'],
    answerIndex: 1,
    explanation: 'WRED randomly drops earlier to prevent buffer overfill and TCP lockstep.'
  },
]

export const quizMonitoring: QuizQuestion[] = [
  {
    id: 'syslog-levels',
    question: 'In Syslog, lower numeric levels indicate:',
    choices: ['Lower severity', 'Higher severity', 'Debug output only', 'Vendor-specific levels'],
    answerIndex: 1,
    explanation: 'Level 0 is Emerg; 7 is Debug — lower number is more severe.'
  },
  {
    id: 'snmpv3',
    question: 'SNMPv3 security level with auth and encryption is:',
    choices: ['noAuthNoPriv', 'authNoPriv', 'authPriv', 'privOnly'],
    answerIndex: 2,
    explanation: 'authPriv provides authentication and privacy (encryption).'
  },
  {
    id: 'rspan',
    question: 'RSPAN differs from SPAN because it:',
    choices: ['Mirrors only Layer 3 packets', 'Uses a special VLAN to mirror across switches', 'Requires NetFlow', 'Encrypts mirrored traffic'],
    answerIndex: 1,
    explanation: 'RSPAN uses an RSPAN VLAN to mirror traffic over multiple switches.'
  },
]

export const quizDesign: QuizQuestion[] = [
  {
    id: 'collapsed-core',
    question: 'A collapsed core design:',
    choices: [
      'Separates Core and Distribution roles on different devices',
      'Combines Core and Distribution on the same devices for smaller sites',
      'Removes redundancy at the access layer',
      'Eliminates routing at distribution'
    ],
    answerIndex: 1,
    explanation: 'Collapsed core merges roles on the same boxes for small/medium campuses.'
  },
  {
    id: 'stackwise-vss',
    question: 'StackWise vs VSS — best pairing is:',
    choices: ['StackWise for access, VSS for distribution/core', 'VSS for access, StackWise for core', 'Both only for core', 'Both only for access'],
    answerIndex: 0,
    explanation: 'Common pattern: StackWise at access, VSS at distribution/core.'
  },
]

export const quizSubnetOSI: QuizQuestion[] = [
  {
    id: 'private-range',
    question: 'Which is NOT a private IPv4 range?',
    choices: ['10.0.0.0/8', '172.16.0.0/12', '192.168.0.0/16', '169.254.0.0/16'],
    answerIndex: 3,
    explanation: '169.254.0.0/16 is APIPA (link-local), not RFC1918 private.'
  },
  {
    id: 'wildcard',
    question: 'Wildcard mask for 192.168.10.0/24 is:',
    choices: ['0.0.0.255', '255.255.255.0', '0.0.255.255', '255.255.0.0'],
    answerIndex: 0,
    explanation: 'Wildcard is the inverse mask; /24 → 0.0.0.255.'
  },
  {
    id: 'osi-layer',
    question: 'At which OSI layer does STP primarily operate?',
    choices: ['Layer 3', 'Layer 2', 'Layer 4', 'Layer 7'],
    answerIndex: 1,
    explanation: 'STP is a Layer 2 control protocol.'
  },
]
