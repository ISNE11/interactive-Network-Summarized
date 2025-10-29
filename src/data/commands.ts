export type Command = { cmd: string; description: string }
export type CommandGroup = { title: string; items: Command[] }

export const commands: CommandGroup[] = [
  {
    title: 'VLAN & Trunking',
    items: [
      { cmd: 'vlan 10', description: 'Create VLAN 10' },
      { cmd: 'name Accounting', description: 'Name the current VLAN' },
      { cmd: 'interface gi0/1', description: 'Enter interface configuration' },
      { cmd: 'switchport mode access', description: 'Set port as access' },
      { cmd: 'switchport access vlan 10', description: 'Assign access VLAN' },
      { cmd: 'switchport mode trunk', description: 'Set trunk mode' },
      { cmd: 'switchport trunk allowed vlan 10,20', description: 'Allow VLAN list on trunk' },
    ],
  },
  {
    title: 'Inter-VLAN Routing (MLS)',
    items: [
      { cmd: 'interface vlan 10', description: 'Create SVI for VLAN 10' },
      { cmd: 'ip address 192.168.10.1 255.255.255.0', description: 'Assign IP for SVI' },
      { cmd: 'no shutdown', description: 'Enable SVI' },
      { cmd: 'ip routing', description: 'Enable L3 routing on MLS' },
    ],
  },
  {
    title: 'Spanning Tree (STP/RSTP/MST)',
    items: [
      { cmd: 'spanning-tree mode rapid-pvst', description: 'Enable RSTP per-VLAN' },
      { cmd: 'spanning-tree vlan 10 priority 4096', description: 'Set STP priority' },
      { cmd: 'spanning-tree portfast', description: 'Enable PortFast (edge)' },
      { cmd: 'spanning-tree bpduguard enable', description: 'Protect from rogue BPDUs' },
      { cmd: 'spanning-tree mst configuration', description: 'Enter MST config mode' },
      { cmd: 'instance 1 vlan 10-20', description: 'Map VLANs to MST instance' },
    ],
  },
  {
    title: 'DHCP',
    items: [
      { cmd: 'ip dhcp pool VLAN10', description: 'Create DHCP pool' },
      { cmd: 'network 192.168.10.0 255.255.255.0', description: 'Set network' },
      { cmd: 'default-router 192.168.10.1', description: 'Set gateway' },
      { cmd: 'dns-server 8.8.8.8', description: 'Set DNS server' },
      { cmd: 'ip dhcp snooping', description: 'Enable DHCP Snooping (global)' },
      { cmd: 'ip dhcp snooping vlan 10,20', description: 'Enable snooping for VLANs' },
      { cmd: 'interface gi0/1\n ip dhcp snooping trust', description: 'Trust uplink/trunk port' },
    ],
  },
  {
    title: 'QoS',
    items: [
      { cmd: 'mls qos', description: 'Enable QoS (older IOS)' },
      { cmd: 'priority-queue out', description: 'Enable priority queue (if supported)' },
      { cmd: 'mls qos trust cos', description: 'Trust incoming CoS on trunk' },
    ],
  },
  {
    title: 'Monitoring',
    items: [
      { cmd: 'show interfaces status', description: 'View interface status' },
      { cmd: 'show vlan brief', description: 'List VLANs' },
      { cmd: 'show spanning-tree', description: 'STP state' },
      { cmd: 'show ip dhcp binding', description: 'DHCP leases' },
      { cmd: 'show mls qos interface', description: 'QoS on interface' },
    ],
  },
  {
    title: 'Security Basics',
    items: [
      { cmd: 'switchport port-security', description: 'Enable Port Security' },
      { cmd: 'switchport port-security maximum 2', description: 'Limit MAC count' },
      { cmd: 'switchport port-security violation restrict', description: 'Action on violation' },
      { cmd: 'ip access-list standard MGMT', description: 'Create ACL' },
      { cmd: 'access-class MGMT in', description: 'Apply ACL to vty' },
    ],
  },
]

