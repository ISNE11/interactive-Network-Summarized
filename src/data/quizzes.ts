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

