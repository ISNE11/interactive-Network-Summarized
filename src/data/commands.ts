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
    title: 'IPv6 Basics',
    items: [
      { cmd: 'ipv6 unicast-routing', description: 'Enable IPv6 forwarding (global)' },
      { cmd: 'interface vlan 10', description: 'Enter SVI for VLAN 10' },
      { cmd: 'ipv6 address 2001:db8:10::1/64', description: 'Assign IPv6 address to SVI' },
      { cmd: 'ipv6 nd ra suppress', description: 'Optional: suppress RAs on certain interfaces' },
    ],
  },
  {
    title: 'OSPFv3 (IPv6)',
    items: [
      { cmd: 'ipv6 router ospf 1', description: 'Create OSPFv3 process 1' },
      { cmd: 'router-id 1.1.1.1', description: 'Set router ID (required)' },
      { cmd: 'interface vlan 10', description: 'Enter participating interface' },
      { cmd: 'ipv6 ospf 1 area 0', description: 'Enable OSPFv3 on interface, area 0' },
    ],
  },
  {
    title: 'HSRP (IPv6)',
    items: [
      { cmd: 'interface vlan 10', description: 'Work under the SVI' },
      { cmd: 'standby 1 ipv6 2001:db8:10::1', description: 'Virtual IPv6 gateway address' },
      { cmd: 'standby 1 priority 110', description: 'Prefer this router' },
      { cmd: 'standby 1 preempt', description: 'Allow higher priority to take over' },
    ],
  },
  {
    title: 'IPv6 ACLs',
    items: [
      { cmd: 'ipv6 access-list V6-MGMT', description: 'Create IPv6 ACL' },
      { cmd: ' permit tcp 2001:db8:10::/64 any eq 22', description: 'Example permit rule' },
      { cmd: ' deny ipv6 any any', description: 'Deny everything else' },
      { cmd: 'interface vlan 10', description: 'Apply on interface' },
      { cmd: ' ipv6 traffic-filter V6-MGMT in', description: 'Ingress filter' },
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
