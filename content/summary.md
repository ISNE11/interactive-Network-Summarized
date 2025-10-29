# Course Slides Summary


## BackboneFast.pdf

BackboneFast
261434
1
-- 1 of 12 --
Overview
• 	BackboneFast is used for the case of 	indirect failure.
• 	It eliminates the MaxAge timeout.
• 	However, there are still delay because of Learning and
Listening delays.
• 	When a switch loses its connection to root bridge, it will
try to be come a new root bridge by sending BPDU
announcing that it is a new root. This BPDU is called
inferior BPDU.
2
-- 2 of 12 --
Example of Indirect Failure Without BackboneFast
3
A 	B
e2 e5e3	e1
C
e4
XDP RP DP
1 2 3BPDU
Root Bridge
Wait for MaxAge
B sends BPDU
announcing it is
a root bridge.
Link indirectly fails
-- 3 of 12 --
Processes Without BackboneFast
1. 	Indirect failure occurs at link A-B. A does not notice;
therefore, it does not send TC.
2. 	B notices fails and lose connection to root bridge.
Therefore, it announces that it becomes a new root
bridge. The inferior BPDU is out from port e3 to port e4.
3. 	C will not do anything with this inferior BPDU until it does
not receives the previous BPDU from A for 20 seconds
(MaxAge). Then, the port e4 is changed states to
listening state and the spanning-tree is formed again.
4
-- 4 of 12 --
Example of Indirect Failure with BackboneFast
5
A 	B
e2 e5e3	e1
C
e4
XDP RP DP
1 2
3
BPDU
Root Bridge
B sends BPDU
announcing it is
a root bridge.
Link indirectly fails
4
5
C sends RLQ out.
C receives RLQ R.
C changes e4 to listening states.
-- 5 of 12 --
Processes with BackboneFast
1. 	Indirect failure occurs at link A-B. A does not notice;
therefore, it does not send TC.
2. 	B notices fails and lose connection to root bridge.
Therefore, it announces that it becomes a new root
bridge. The inferior BPDU is out from port e3 to port e4.
3. 	Once 	C 	receives the inferior BPDU from the blocked port,
it sends RLQ out from the port e5.
4. 	If it receives RLQ replies from upstream, 	C 	can confirm
that it can still reach to root bridge.
5. 	C 	changes port e4 to listening state in order that the new
spanning-tree can be formed. 	It does not have to wait
for 20 seconds.
6
-- 6 of 12 --
The Example of BackboneFast
7
A
B 	C
D
e1
e2
e3 	e4
e5
e7
e8	e9
Root Bridge
DP
X
RP
e6
DP
DP 	RP
BP
RP
DP
1. Indirect failures occurs at e2 of B. B loses connectivity with the root bridge.
-- 7 of 12 --
8
A
B 	C
D
e1
e2
e3 	e4
e5
e7
e8	e9
Root Bridge
DP
X
RP
e6
DP
DP 	RP
BP
RP
DP
2. B announces that it is the new root bridge by sending the Inferior BPDU
to all its unblocked port (except port with failure).
Inferior BPDU
-- 8 of 12 --
9
A
B 	C
D
e1
e2
e3 	e4
e5
e7
e8	e9
Root Bridge
DP
X
RP
e6
DP
DP 	RP
BP
RP
DP
3. C receives the inferior BPDU from port e4 which is blocked port.
The current root port and blocked ports can be alternative for a new root port.
C sends RLQ (Root Link Query) with all alternative ports (e5 and e6)
RLQ
-- 9 of 12 --
• 	How another switch that receives RLQ responds to RLQ.
• 	If it not a root bridge, it forwards to the root bridge.
• 	If it is a root bridge, it sends respond back (RLQ R)
along the way of the spanning tree.
• 	If it also loses the connection to the root bridge, it
sends the responds back to the port.
• 	How a switch that sends RLQ responds to the RLQ R.
• 	If it receives on the root port, the spanning-tree on itself
is not changed. It moves the port that receives inferior
PBDU to listening state.
• 	If it receives on the blocked port, the blocked port
might be an alternative path for a new root port. It
moves the blocked port and the port that receives
inferior BPDU to listening states. This blocked port
might finally become a new root port or maybe not.
10
-- 10 of 12 --
11
A
B 	C
D
e1
e2
e3 	e4
e5
e7
e8	e9
Root Bridge
DP
X
RP
e6
DP
DP 	RP
BP
RP
DP
4. C receives the RLQ R from D (which comes from A). It can confirms that it can
still reach to the root bridge. The RP does not have to be changed.
It move e4 the listening states.
RLQ R
Listening
-- 11 of 12 --
Further Reading and References
• 	Understand and Configure Backbone Fast on Catalyst
Switches, 	https://www.cisco.com/c/en/us/support/docs/
lan-switching/spanning-tree-protocol/12014-18.html
• 	Improving STP Convergence, 	https://
thenetworkseal.wordpress.com/improving-stp-
convergence/
• 	David Hucaby, “CCNP Routing and Switching SWITCH
300-115 Official Cert Guild,” Cisco Press, 2015.
• 	Richard Froom and Erum Frahim, “Implementing Cisco IP
Switched Networks (SWITCH) Foundation Learning
Guide,” Cisco Press, 2015.
12
-- 12 of 12 --

## CPE434FirstHopRedundancy.pdf

Network Design and
Management
First Hop Redundancy
1
-- 1 of 17 --
Agenda
• 	Overview
• 	FHRP
• 	HSRP
2
-- 2 of 17 --
Overview
• 	Having one WAN link or gateway can cause the problem
of single point of failure, e.g. Fig 1.
• 	In Fig. 1, even there are many links at R1, but there is still
a problem of single point of failure.
• 	High availability should be improved.
• 	Adding more router, e.g. Fig. 2.
3
Fig. 1. R1 can as a single point of failure.
-- 3 of 17 --
• 	In Fig. 2, there are two routers for redundancy.
• 	However, they have different IP Address.
• 	Configuring default gateway on hosts might be
troublesome.
• 	To solve the problem, all default gateway routers use the
virtual IP address besides their physical interfaces’ IP
addresses. Normally, only one router is active.
• 	This is called 	First-Hop Redundancy Protocol (FHRP).
4
Fig. 2. Adding R2 to remove the problem of single point of failure.
-- 4 of 17 --
FHRP
• 	Currently, there are 3 protocols implementing FHRP.
5
Acronym 	Full Name 	Origin
HSRP Hot Standby Router
Protocol Cisco Active/
Standby Per subnet
VRRP Virtual Router Redundancy
Protocol RFC5798 Active/
Standby Per subnet
GLBP Gateway Load Balancing
Protocol Cisco Active/
Active Per host
-- 5 of 17 --
HSRP
Hot Standby Router Protocol
6
-- 6 of 17 --
Concepts
• 	HRRP operates in
• 	Active model: active
• 	Passive model: standby
• 	Two or more routers can operate.
• 	One router is active at a time.
• 	HSRP implements (Fig.3)
• 	Virtual IP address
• 	Virtual MAC address
7
Fig. 3. HSRP using R1 as the active router. All traffic leaving subnet 10.1.1.0/24 are
sent to R1.
-- 7 of 17 --
HSRP Failover
• 	When the active router fails,
• 	Active router stops using virtual IP address and virtual
MAC address,
• 	New active router uses virtual IP address and virtual
MAC address.
• 	The example is shown in Fig. 4.
8
Fig. 3. HSRP failover. R2 become active when R1 fails. Traffic are sent through R2.
-- 8 of 17 --
• 	Hosts
• 	Still use the same IP address the default gateway.
• 	Do not change their ARP tables of IP address of default
gateway.
• 	Switches connecting to routers
• 	Change MAC address table entries
• 	New active router broadcasts ethernet frame (ARP Reply)
with Virtual MAC address as source.
• 	This makes switches update their MAC address table.
• 	This ARP Reply is called a gratuitous ARP.
• 	The ARP Reply is sent from the router without any ARP Request.
9
-- 9 of 17 --
Versions
• 	Cisco support HSRP version 1 and 2.
10
-- 10 of 17 --
Selecting Active Role
• 	Rules for selecting the router to be the active router as in
the following orders.
• 	If there is no other routers in the subnet, the local router
is the active router.
• 	If there is still no active router and there are more than
one router with HSRP.
• 	Router with highest priority is the active router.
• 	If all routers have the same priority (100 by default), the
router with the highest IP address from the interface
configured for HSRP will become the active router.
• 	If there is an active router.
• 	If preemption 	is not 	configured, the active router is not
changed.
• 	If the preemption is configured, the router with highest
priority is an active routers.
11
-- 11 of 17 --
Configurations
• 	The commands are configured under the interface
submode.
• 	The 	group-number 	must be matched on all HSRP routers.
12
interface 	interface
[standby version 	{1|2}]
standby 	group-number 	ip 	virtual-ip-Iaddress
[standby 	group-number 	priority 	priority]
[standby 	group-number 	preempt]
standby 	group-number 	name 	group-name
!
-- 12 of 17 --
Verification
• 	This command shows
• 	The current state of the router.
• 	The IP address of the interface of the active router.
• 	The IP address of the interface of the standby router(s).
• 	Local means the router itself.
13
router# show standby 	[brief]
-- 13 of 17 --
Example
• 	The topology on Fig. 3 and Fig 4.
14
-- 14 of 17 --
15
-- 15 of 17 --
16
-- 16 of 17 --
Reference
• 	Odom, W., and Hogg, S., 	CCNA Routing and Switching
ICND2 200-105 Official Cert Guide, Cisco Press, 2017.
17
-- 17 of 17 --

## CPE434Slide01Intro.pdf

Computer Network
Design and
Management
Slide 01
261434
1
-- 1 of 14 --
Agenda
• 	Course outline
• 	Software
• 	Grading
• 	References
2
-- 2 of 14 --
Course Outline
• 	Switching (Layer 2)
• 	VLAN
• 	Inter VLAN
• 	VTP
• 	Spanning Tree
• 	Port Aggregation
• 	etc
• 	Enterprise Network Campus Design
• 	Basic QoS
• 	Basic HA
• 	Basic wireless network design
3
-- 3 of 14 --
Cisco 3 Layer Hierarchical Model
Core Layer
Distribution Layer
Access Layer
4
-- 4 of 14 --
What you need to know before enrolling this course
• 	7-OSI network layer
• 	TCP/IP stack
• 	Basic router/switch configuration
• 	Class C subnetting
• 	The contents in slides are guideline. You have to study by
yourself.
• 	The lab 	files are in your computer, so learn from them by
yourself. Do not expect that every output from show
commands or configurations will be on slide.
• 	There is no TA in the lab. You are on your own.
• 	Lab is in-class lab with deadline. If you 	finish lab, you can
leave. If you cannot 	finish within time deadline, you miss
the scores.
5
-- 5 of 14 --
Software
• 	Cisco Packet Tracer
• 	Available for Windows, Linux, MacOS, 	iOS, Android
• 	To download
• 	Create Cisco Network Academy Account (if you do
not have one).
• 	Enroll the class from the token provided in the group.
• 	Download packet tracer from
• 	My NedAcad
• 	Resources
• 	Download PacketTracer
• 	(You might need to enroll the course introduction to pa
6
-- 6 of 14 --
• 	Cisco Packet Tracer version 8.2.2 (Windows/MacOS/
Linux) from Cisco Network Academy (https://
www.netacad.com).
• 	Login required.
7
-- 7 of 14 --
• 	Addition configuration of the program
• 	From Preference >Interfaces
• 	Check 	☑
• 	Always Shows Port Labels in Logical Workspace
• 	Disable CLI Text to Speed
8
-- 8 of 14 --
Software
• 	GNS3 	with related Cisco IOS Image
• 	Version 2.x.x (exact version will be given later)
• 	Windows/Linux/MAC (Apple Silicon?)
• 	For MAC Mx, it might be a bit tricky (see 	https://
www.youtube.com/watch?v=bdqkPzRbNew)
• 	VirtualBox with image (download the same version of
GNS3 VM from 	GNS3 website)
• 	Routers and Switches in GNS3 with IOU have more
commands than ones in Packet Tracer.
• 	Packet Tracer for CCNA
9
-- 9 of 14 --
• 	Download from 	https://www.gns3.com
• 	Account is required. (Free account registration)
• 	Latest version (as the lab will require.)
• 	Also VM of the same version is required (same page)
• 	Follow the instruction in the download page.
• 	Install the VM in Virtual Box.
• 	Use Host-Only adapter mode in Virtual Box.
• 	Take a note of the IP address of VM. (Static IP address is
preferable)
• 	Then, then IOU devices will be used in this class.
• 	See how go generate IOU license from
• 	https://www.youtube.com/watch?v=tDsFnXpP7pY
• 	Only 2 labs require GNS3.
10
-- 10 of 14 --
11
-- 11 of 14 --
12
-- 12 of 14 --
Grading
• 	Assignment 	20%
• 	Design Project 15%
• 	Midterm 	35%
• 	Final 	30%
• 	Grading: Criterion referenced and norm referenced
evaluation Note: Grading score might be changed
depending on situations.
13
-- 13 of 14 --
Reference Books
• 	R.Froom, B.Sivasubramanian, and E.Frahim, “Implement
Cisco Switched Networks (SWITCH) Foundation Learning
Guide, Cisco Press, 2015.
Hucaby, D. “CCNP Routing and Switching SWITCH
300-115 Official Cert Guide,” Cisco Press, 2015.
• 	Froom R., Sivasubramanian, B., and Frahim, E.,
“Implementing Cisco Switched Networks (SWITCH)
Foundation Learning Guide,” Cisco Press, 2010.
• 	Teare, D. “Implementing Cisco IP Routing (ROUTE)
Foundation Learning Guide,” Cisco Press, 2012.
• 	Odom, W., “CCNA 200-301, Volume 1 Official Cert
Guide ,” Cisco Press, 2020.
• 	Odom, W., “CCNA 200-302, Volume 1 Official Cert
Guide ,” Cisco Press, 2020.
14
-- 14 of 14 --

## CPE434Slide02IPv6.pdf

Computer Network
Design and
Management
261434
02
Review
IPv6
1
-- 1 of 40 --
Outline
• 	IPv6 Overview
• 	Global and Local Addresses
• 	Implementing IPv6 on Routers
• 	Implementing IPv6 on Hosts
• 	Configuring IPv6 on Interface
• 	Additional Reference
2
-- 2 of 40 --
IPv6 Overview
3
IPv4
IPv6
IPv4
IPv6
2010’s 	2020’s ? 	2030’s ???
IPv6 deployment progression
-- 3 of 40 --
4
https://www.google.com/intl/en/ipv6/statistics.html#tab=ipv6-adoption
-- 4 of 40 --
5
https://www.google.com/intl/en/ipv6/statistics.html#tab=per-country-ipv6-adoption
-- 5 of 40 --
IPv6 Overview
• 	IPv6 Addresses
• 	128 	- bit address represented in 8 sets of four
hex digit set (quartets)
• 	e.g. 	2001:DEAD:CAFE:0000:0000:0000:0007:0088
• 	In each quartet, the left 0s can be removed and
an all 0s quartet can be presented by only a 0
• 	e.g. 	2001:DEAD:CAFE:0:0:0:7:88
• 	For all quartets of all 0s, they can be replaced by
:: but it can used only once
• 	e.g. 	2001:DEAD:CAFE::7:88
6
-- 6 of 40 --
• 	IPv6 uses “prefix length”, similar to IPv4 subnet
mask.
• 	e.g. 2222:1111:0:1:A:B:C:D/64
• 	IPv6 prefix (subnet ID), all host bits are 0
• 	e.g.
• 	IP Address 2001:1234:5678:9ABC:1234:5678:9ABC:1111/64
• 	Prefix 2001:1234:5678:9ABC:0000:0000:0000:0000/64
• 	or Prefix 2001:1234:5678:9ABC::/64
7
-- 7 of 40 --
IPv4 Header
8
ver length
32 bits
data
(variable length,
typically a TCP
or UDP segment)
16-bit identifier
header
checksum
time to
live
32 bit source IP address
head.
len
type of
service
flgs fragment
offset
upper
layer
32 bit destination IP address
options (if any)
IP protocol version
Number (version 4)
header length
(bytes)
upper layer protocol
to deliver payload to
total packet
length (bytes)
type of data for
fragmentation/
reassemblymax number
remaining hops
(decremented at
each router)
e.g. timestamp,
record route
taken, specify
list of routers
to visit.
Figure from: J.F. Kurose and K.W. Ross, Supplements: Powerpoint Slides
Computer Networking: A Top-Down Approach 6th ed.
http://www-net.cs.umass.edu/kurose-ross-ppt-6e/
-- 8 of 40 --
IPv6 Header
9
data
destination address
(128 bits)
source address
(128 bits)
payload len 	next hdr 	hop limit
flow label	pri	ver
32 bits
priority: 	identify priority among datagrams in flow
flow Label: 	identify datagrams in same 	flow.
(concept offlow 	not well defined).
next header: 	identify upper layer protocol for data
Figure from: J.F. Kurose and K.W. Ross, Supplements: Powerpoint Slides
Computer Networking: A Top-Down Approach 6th ed.
http://www-net.cs.umass.edu/kurose-ross-ppt-6e/
-- 9 of 40 --
Global and Local Addresses
• 	IPv6 global unicast address - like global IPv4 addr
• 	IPv6 local unicast address - like private IPv4 addr
10
Address Type 	First Hex Digits
Global Unicast 	All unreserved digits
Unique Local 	FD
Multicast 	FF
Link-Local 	FE80
-- 10 of 40 --
Local Scope Multicast Addresses
11
Short Name Multicast
Address Meaning 	IPv4 Equivalent
All-nodes 	FF02::1 All-nodes (All interfaces use
IPv6 that are on the link)
A subnet broadcast
address
All-routers 	FF02::2 All-routers (all IPv6 router
interfaces on the link) none
-- 11 of 40 --
Structure of subnetted IPv6 Global Unicast
Addresses
• 	Global prefixes are set by IANA, RIR, or ISP
• 	e.g. Global routing prefix 2001:0DB8:1111::/48
• 	subnet 2001:0DB8:1111:1::/64
• 	subnet 2001:0DB8:1111:2::/64
• 	…
12
Global Routing Prefix 	Subnet 	Interface ID
P bits 	S bits 	I bits
Prefix
subnet ID
-- 12 of 40 --
13
Example: subnets with prefix 2001:0DB8:1111::/48
ISP
2001:0DB8:1111:0004::/64
2001:0DB8:1111:0001::/64
2001:0DB8:1111:0002::/64
2001:0DB8:1111:0003::/64
-- 13 of 40 --
Structure of subnetted IPv6 Unique Local
Unicast Addresses
• 	Global ID can be chosen manually or randomly
• 	e.g. Prefix FD00:1:1::/48
• 	subnet FD00:1:1:0001::/64
• 	subnet FD00:1:1:0002::/64
• 	…
14
Global ID
(random) Subnet 	Interface ID
8 bits 	16 bits 	64bits
Prefix
subnet ID
FD
40 bits
-- 14 of 40 --
15
Example: subnets with unique local address
ISP
FD00:1:1:0004::/64
FD00:1:1:0001::/64
FD00:1:1:0002::/64
FD00:1:1:0003::/64
-- 15 of 40 --
Implementing IPv6 on Routers
• 	Static IPv6 address on routers’ interfaces can be
assigned by
• 	Manually configuration
• 	Administrators manually configure IPv6
address to interfaces as in IPv4
• 	EUI-64
• 	Routers automatically generates IPv6
addresses to interfaces using rules called
EUI-64 (Extended Unique Identifiers)
• 	Using with 64 bits prefix
16
-- 16 of 40 --
• 	Rules EUI-64
1. 	Split 6 bytes of MAC address into two halves
2. 	Insert FFFE between the two
3. 	Invert the 7th bit of interface ID (from left) 0 to 1
and 1 to 0
17
FFFE 2nd Half
MAC
1st Half
MAC
Subnet Prefix
Invert 7th bit
(from left)
-- 17 of 40 --
• 	e.g. MAC 0013.1234.ABCD
1. 	001312 34ABCD
2. 	0013:12FF:FE34:ABCD
3. 	0213:12FF:FE34:ABCD -> Interface ID in IPv6
Address
• 	e.g. MAC 0200.0101.0101
• 	?
18
-- 18 of 40 --
• 	Dynamic Unicast Address can also be assigned to
router interfaces by
• 	Stateful DHCP
• 	Stateless Address Autoconfiguration (SLAAC)
19
-- 19 of 40 --
Link-Local Addresses
• 	Addresses used within a subnet
• 	Automatically generated addresses
• 	Link-Local Address
• 	FE80::/64
• 	Interface ID: Cisco routers use EUI-64
• 	e.g. MAC 0200.0101.0101
• 	Link-Local Address FE80::1FF:FE01:101
20
-- 20 of 40 --
Implementing IPv6 on Hosts
• 	Hosts using IPv6 can be automatically assigned
IPv6 addresses using
• 	DHCPv6 (Stateful DHCPv6)
• 	SLAAC
21
IPv6 Unicast Address
Prefix Length Default router
IPv6 address
DNS Server
IPv6 Address(es)
-- 21 of 40 --
Stateless Address AutoConfiguration
• 	SLAAC (Stateless Address AutoConfiguration)
• 	Not require servers
• 	Hosts learn prefix from others and choose its own
IP Address
1. 	Learn IPv6 subnet ID used on the link using
NDP
2. 	Choose its own IPv6 address (Interface ID)
• 	Random
• 	EUI-64
3. 	Check that no other hosts using the same
address
22
-- 22 of 40 --
Stateless Address AutoConfiguration
• 	SLAAC is a part of NDP (Network Discovery Protocol)
• 	Devices can have
• 	Prefix ID
• 	Subnet mask
• 	Interface ID
• 	Default gateway
• 	Device doesn't have
• 	DNS
• 	Use stateless DHCPv6
• 	Stateless DHCP does not have to remember what
MAC address is binding to which IP address.
• 	Use RDNSS (Recursive DNS Server) configured with
NDP. 23
-- 23 of 40 --
24
Unicast
Address
SLAAC
Prefix
NDP
Prefix
Length
Default
Router
Stateless DHCPv6
DNS
Server
-- 24 of 40 --
Configuring IPv6 on Interface
25
ipv6 	unicast-routing
!
interface 	interface
ipv6 	address 	IPv6Address/mask
!
interface 	FastEthernet0/1
ipv6 	address 	2001:DB8:1111:1::1/64
!
Configuration
Example
interface 	interface
ipv6 	address 	fe80::xxxx 	link-local
!
Link-local address (optional)
-- 25 of 40 --
Configuring IPv6 on Interface
26
router#show 	ipv6 	interface 	[interface] 	[brief]
R1#sh 	ipv6 	int 	FastEthernet0/0
FastEthernet0/0 	is 	up, 	line 	protocol 	is 	up
IPv6 	is 	enabled, 	link-local 	address 	is
FE80::CE00:AFF:FEAE:0
Global 	unicast 	address(es):
2001:DB8:1111:1::1, 	subnet 	is 	2001:DB8:1111:1::/64
Joined 	group 	address(es):
FF02::1
FF02::2
FF02::1:FF00:1
FF02::1:FFAE:0
MTU 	is 	1500 	bytes
ICMP 	error 	messages 	limited 	to 	one 	every 	100 	milliseconds
ICMP 	redirects 	are 	enabled
ND 	DAD 	is 	enabled, 	number 	of 	DAD 	attempts: 	1
ND 	reachable 	time 	is 	30000 	milliseconds
Verification
Example
-- 26 of 40 --
Configuring IPv6 on Interface
27
R1#sh 	ipv6 	interface 	br
FastEthernet0/0 	[up/up]
FE80::CE00:AFF:FEAE:0
2001:DB8:1111:1::1
FastEthernet0/1 	[administratively 	down/down]
R1#show 	interface 	fastEthernet 	0/0
FastEthernet0/0 	is 	up, 	line 	protocol 	is 	up
Hardware 	is 	AmdFE, 	address 	is 	cc00.0aae.0000 	(bia 	cc00.0aae.0000)
MTU 	1500 	bytes, 	BW 	100000 	Kbit, 	DLY 	100 	usec,
<ตัดออก>
MAC Address and Link-local address
-- 27 of 40 --
Configuring IPv6 on Interface
28
R1#ping 	ipv6 	2001:DB8:1111:1::1
Type 	escape 	sequence 	to 	abort.
Sending 	5, 	100-byte 	ICMP 	Echos 	to 	2001:DB8:1111:1::1, 	timeout 	is 	2
seconds:
!!!!!
Success 	rate 	is 	100 	percent 	(5/5), 	round-trip 	min/avg/max 	= 	0/0/4 	ms
Ping with IPv6 Address
-- 28 of 40 --
Routing Protocol for IPv6
• 	Static Route
• 	RIPng (RIP Next Generation)
• 	OSPFv3 (OSPF Version 3)
• 	EIGRPv6 (EIGRP IPv6)
• 	MP BGP-4
29
-- 29 of 40 --
Static Route
• 	Configuration
ipv6 	route 	IPv6Prefix/mask 	{next-hop-address|
outgoingInterface}
30
-- 30 of 40 --
RIPng
• 	RIP Next Generation: RIP for IPv6
• 	RFC 2080
• 	Work the same way as RIP for IPv4
• 	UDP for 521
• 	Next hop address uses 	link local address
31
-- 31 of 40 --
RIPng
• 	Configuration
ipv6 	router 	rip 	processname
interface 	interface
ipv6 	rip 	processname 	enable
!
• 	Verification
#show 	ipv6 	route 	[rip]
#ping 	ipv6 	ipv6address
32
-- 32 of 40 --
OSPFv3
• 	OSPF version 3 for IPv6 (OSPFv2 for IPv4)
• 	RFC 2740
• 	Many things are similar with OSPFv2
33
-- 33 of 40 --
OSPFv3
• 	Configuration
ipv6 	router 	ospf 	processNumber
[router-id 	32bit-routerID]
!
interface 	interface
ipv6 	ospf 	processNumber 	area 	areaID
!
• 	Verification
#show 	ipv6 	route 	[ospf]
#ping 	ipv6 	IPv6Address
A router id is required if router cannot choose one. (It does not have any IPv4
address.)
34
-- 34 of 40 --
• 	Note:
• 	There are changes in commands from IOS
version 15.1(3)
35
router 	ospfv3 	processNumber
[router-id 	32bit-routerID]
[address-family 	ipv6 	unicast 	vrf 	vrf]
!
interface 	interface
ospfv3 	processNumber 	ipv6 	area 	areaID
!
-- 35 of 40 --
`
• 	Example
36
R1
Loopback0
AAAA::1/128
R1
Loopback0
AAAA::2/128
2001:DB8:1111:1::1/64 	2001:DB8:1111:1::2/64
hostname 	R1
!
ipv6 	unicast-routing
!
interface 	Loopback0
no 	ip 	address
ipv6 	address 	AAAA::1/128
ipv6 	ospf 	1 	area 	0
!
interface 	FastEthernet0/0
no 	ip 	address
duplex 	auto
speed 	auto
ipv6 	address 	2001:DB8:1111:1::1/64
ipv6 	ospf 	1 	area 	0
!
ipv6 	router 	ospf 	1
router-id 	1.1.1.1
log-adjacency-changes
!
hostname 	R2
!
ipv6 	unicast-routing
!
interface 	Loopback0
no 	ip 	address
ipv6 	address 	AAAA::2/128
ipv6 	ospf 	1 	area 	0
!
interface 	FastEthernet0/0
no 	ip 	address
duplex 	auto
speed 	auto
ipv6 	address 	2001:DB8:1111:1::2/64
ipv6 	ospf 	1 	area 	0
!
ipv6 	router 	ospf 	1
router-id 	2.2.2.2
log-adjacency-changes
!
-- 36 of 40 --
OSPFv3
37
R1#sh 	ipv6 	route
IPv6 	Routing 	Table 	- 	7 	entries
Codes: 	C 	- 	Connected, 	L 	- 	Local, 	S 	- 	Static, 	R 	- 	RIP, 	B 	- 	BGP
U 	- 	Per-user 	Static 	route
I1 	- 	ISIS 	L1, 	I2 	- 	ISIS 	L2, 	IA 	- 	ISIS 	interarea, 	IS 	- 	ISIS 	summary
O 	- 	OSPF 	intra, 	OI 	- 	OSPF 	inter, 	OE1 	- 	OSPF 	ext 	1, 	OE2 	- 	OSPF 	ext 	2
ON1 	- 	OSPF 	NSSA 	ext 	1, 	ON2 	- 	OSPF 	NSSA 	ext 	2
O 	2001:DB8:1111::/64 	[110/1]
via 	::, 	FastEthernet0/0
C 	2001:DB8:1111:1::/64 	[0/0]
via 	::, 	FastEthernet0/0
L 	2001:DB8:1111:1::1/128 	[0/0]
via 	::, 	FastEthernet0/0
LC 	AAAA::1/128 	[0/0]
via 	::, 	Loopback0
O 	AAAA::2/128 	[110/1]
via 	FE80::CE01:AFF:FEAE:0, 	FastEthernet0/0
L 	FE80::/10 	[0/0]
via 	::, 	Null0
L 	FF00::/8 	[0/0]
via 	::, 	Null0
Routing Table
-- 37 of 40 --
OSPFv3
38
R2#show 	ipv6 	route
IPv6 	Routing 	Table 	- 	7 	entries
Codes: 	C 	- 	Connected, 	L 	- 	Local, 	S 	- 	Static, 	R 	- 	RIP, 	B 	- 	BGP
U 	- 	Per-user 	Static 	route
I1 	- 	ISIS 	L1, 	I2 	- 	ISIS 	L2, 	IA 	- 	ISIS 	interarea, 	IS 	- 	ISIS 	summary
O 	- 	OSPF 	intra, 	OI 	- 	OSPF 	inter, 	OE1 	- 	OSPF 	ext 	1, 	OE2 	- 	OSPF 	ext 	2
ON1 	- 	OSPF 	NSSA 	ext 	1, 	ON2 	- 	OSPF 	NSSA 	ext 	2
C 	2001:DB8:1111::/64 	[0/0]
via 	::, 	FastEthernet0/0
L 	2001:DB8:1111::2/128 	[0/0]
via 	::, 	FastEthernet0/0
O 	2001:DB8:1111:1::/64 	[110/1]
via 	::, 	FastEthernet0/0
O 	AAAA::1/128 	[110/1]
via 	FE80::CE00:AFF:FEAE:0, 	FastEthernet0/0
LC 	AAAA::2/128 	[0/0]
via 	::, 	Loopback0
L 	FE80::/10 	[0/0]
via 	::, 	Null0
L 	FF00::/8 	[0/0]
via 	::, 	Null0
Routing Table
-- 38 of 40 --
OSPFv3
39
R1#ping 	ipv6 	AAAA::2
Type 	escape 	sequence 	to 	abort.
Sending 	5, 	100-byte 	ICMP 	Echos 	to 	AAAA::2, 	timeout 	is 	2 	seconds:
!!!!!
Success 	rate 	is 	100 	percent 	(5/5), 	round-trip 	min/avg/max 	= 	20/24/28 	ms
Ping IPv6
-- 39 of 40 --
Reference
• 	Wendell Odom, “Cisco CCENT/CCNA ICND1 100-101
Official Cert Guide Academic Edition”, Cisco Press,
2013.
40
-- 40 of 40 --

## CPE434Slide03BasicSwitch.pdf

Computer Network
Design and Management
03
261434
Switch and Basic Configuration
1
-- 1 of 21 --
Agenda
• 	Switch Overview
• 	Basic Switch Configuration
2
-- 2 of 21 --
Switch Overview
• 	Network Equipments
• 	Hub: Layer 1
• 	multiport repeater (Fig.1)
• 	Switch: Layer 2
• 	connecting multiple collision domains (Fig. 2)
• 	Router: Layer 3
• 	connecting multiple broadcast domains (Fig. 3)
Fig. 1 Hub
Fig 2. Switch
Fig 3. Router
3
-- 3 of 21 --
• 	In Ethernet LAN, MAC
addresses are used.
• 	Switches use MAC Table to
forward frames to
destinations. (Fig. 4)
• 	In Cisco Catalyst Switch,
MAC Table is called
Content-Addressable
Memory (CAM)
• 	Cisco also uses Ternary
Content-Addressable
Memory (TCAM) for ACL
purpose.
• 	Age out every 300
seconds
Fig 4. MAC Table when Fred sending Ethernet frame
to 0200.3333.3333
4
-- 4 of 21 --
• 	Cisco Switch
• 	Catalyst 6500 Family*
• 	Catalyst 4500 Family*
• 	Catalyst 4948G, 3750, and 3560 Family*
• 	Catalyst 2000 Family**
• 	Nexus 7000 Family
• 	Nexus 5000 and 2000 Family
• 	Catalyst uses IOS and Nexus uses Nexus OS
* support Layer 2 and Layer 3
** support layer 2 with some layer 3 features
5
-- 5 of 21 --
Basic Switch Configuration
• 	Configure hostname and related passwords
hostname 	hostname
!
enable secret 	priviledge_passwd
!
line console 0
password 	console_passwd
login
!
6
-- 6 of 21 --
Basic Switch Configuration
• 	Telnet: you can create local account for telnet
• 	You can have more than one account
• 	If you don’t want to use account name, use configurations
• 	m n 	: The number of users that can login at the same
time from m to n (total number = n - m + 1)
username 	username 	secret 	password
line vty 	m n
login local
!
7
line vty 	m n
password 	telnet_passwd
login
!
-- 7 of 21 --
Basic Switch Configuration
• 	Enable SSH
• 	VTY login must be enabled.
• 	Domain-name is required.
• 	RSA (or EC) key must be generated.
• 	Username with password is required.
• 	SSH version 2 can be used.
• 	SSH configuration can be verified by
ip domain-name 	domain-name
crypto key generate rsa
<then enter the number bits for key: recommend 2048>
[ip ssh version 2]
8
# show ip ssh
-- 8 of 21 --
Basic Switch Configuration
• 	Choose connection to be ssh only or both telnet and
ssh.
• 	Verify ssh is enabled by command
line 	vty 	x y
login 	local
transport 	input 	{all|none|ssh|telnet}
!
9
# show ip ssh
-- 9 of 21 --
Basic Switch Configuration
• 	ssh to other switch from the switch/router
10
# ssh -l 	username ip_addr
-- 10 of 21 --
Basic Switch Configuration
• 	Passwords of console and telnet are stored in plain text.
To encrypt them, use password encryption configuration.
• 	By this configuration, passwords stored in configuration
filed will be encrypted.However, 	removing “service
password-encryption” configuration later will not decrypt
the stored encrypted password in configuration 	file.
service password-encryption
11
-- 11 of 21 --
Basic Switch Configuration
• 	Assign IP address to VLAN interface.
• 	e.g. currently, VLAN 1 is used.
• 	Configure interface
• 	normally, interfaces are not shutdown; therefore, no
more configuration is required. However, interface
description, and duplex can be configured.
interface vlan 1
ip address 	ipaddress subnetmask
no shutdown
!
ip default-gateway 	ipaddr_def_gw
interface 	type portnumber
description 	description
!
interface range 	type port_range
description 	description
!
12
-- 12 of 21 --
• 	Note, it should be noted that for security reason, the
management interface should not be VLAN 1 interface.
You will study about VLAN in next slide.
13
-- 13 of 21 --
Basic Switch Configuration
• 	(optional) configure duplex configuration. Default is auto-
duplex
14
interface 	type portnumber
duplex 	{ 	auto|full|half}
!
-- 14 of 21 --
Basic Switch Configuration
• 	Verifying command
• 	Interface
• 	MAC table
#show ip interface 	[br]
#show interface status
#show mac address-table
15
-- 15 of 21 --
Port Security
• 	To enhance the security, it is possible to specify the MAC
addresses of devices connecting to the port.
• 	This feature is called 	Port Security.
• 	Only devices with specified MAC addresses can connect to the
port.
• 	Option for using Port Security
• 	Static: manually specify the MAC addresses.
• 	Dynamic: dynamically specify the MAC address as the
new devices connect.
• 	Sticky: the same behavior as dynamic but the MAC
addresses will be saved to “running-config”
• 	Maximum: specify the maximum number of MAC
addresses that can connect to the port. It is used
together with dynamic and sticky. Default maximum is 1.
• 	The examples are shown in Fig. 5.
16
-- 16 of 21 --
17
Fig. 5. Example of using Port Security.
-- 17 of 21 --
Configure Port Security
• 	Use the following configuration commands.
18
interface 	interface
switchport port-security 	[ 	mac-address 	[mac-address]
[sticky] [maximum 	n]]
!
Verifying Port Security
switch# show port-security interface 	interface
-- 18 of 21 --
• 	The example of configuration of 	figure 5.
19
-- 19 of 21 --
References
• 	Contents and 	figures are from
• 	Odom, W., “Cisco CCENT/CCNA ICDN1 100-105
Official Cert Guide,” Cisco Press, 2016.
• 	Odom, W., “Cisco CCNA Routing and Switching ICDN2
200-101 Official Cert Guide,” Cisco Press, 2013.
• 	Hucaby, D. “CCNP SWITCH 642-813 Official
Certification Guide,” Cisco Press, 2010.
• 	Froom R., Sivasubramanian, B., and Frahim, E.,
“Implementing Cisco Switched Networks (SWITCH)
Foundation Learning Guide,” Cisco Press, 2010.
• 	Cisco CCNA2 R&S, online material from
www.netacad.com
20
-- 20 of 21 --
For GNS3 with IOU and VCS
21
• 	Switch
• 	Saving config
• 	# 	copy running-config 	unix:initial-config.cfg
(in real switch/router or GNS3 with hypermips,
“#copy running-config startup-config” is used)
• 	VPCS
• 	Saving config
• 	> 	save
• 	Configure IP Address
• 	> 	ip 	IPAddress Mask Gateway
• 	Show IP address and MAC Address
• 	> 	show ip
-- 21 of 21 --

## CPE434Slide04VLAN.pdf

Computer Network
Design and
Management
04
261434
VLAN
1
-- 1 of 18 --
Agenda
• 	VLAN
• 	Trunking
• 	VLAN Configurations
• 	Verifying VLAN
• 	Extra
2
-- 2 of 18 --
VLAN
• 	A LAN: all devices in a same broadcast domain.
• 	A Switch: all interfaces are in the same broadcast
domain.
• 	Creating different broadcast domains
• 	Using more than one switch (Fig. 1)
• 	Using VLAN
• 	Virtual LAN: Creating multiple broadcast domains with a
single switch (Fig. 2)
Fig. 1 Creating 2 LANs with
2 switches
Fig. 2 Creating 2 LANs with
1 switch using VLAN
3
-- 3 of 18 --
• 	Benefits of VLAN
• 	Reducing CPU overhead by reducing number of
devices receiving broadcast frame.
• 	Reducing security risks by reducing number of hosts
receiving switches 	flood
• 	Improving security of hosts by separating LAN
• 	Easier troubleshooting because a failure domain is in
the same broadcast domain
• 	Reducing workload for Spanning Tree Protocol (STP)
4
-- 4 of 18 --
Trunking
• 	To connect multiple switches using VLAN
• 	Use each link connecting each VLAN (Fig. 3)
• 	Using only one link with Trunking connecting all VLAN
(Fig. 4)
Fig. 3 Connecting VLAN between switches without Trunking
Fig. 4 Connecting VLAN between switches with Trunking
5
-- 5 of 18 --
• 	Trunking adds VLAN tagging into frames (except 	Native
VLAN). (Fig. 5)
• 	Trunking Protocol
• 	IEEE802.1Q: Currently used
• 	ISL (Inter Switch Link)
Fig. 5 VLAN tagging is added into a frame when
a frame is sent out through trunk link.
6
-- 6 of 18 --
• 	IEEE802.1Q Header
• 	EtherType(TPID) 2 Bytes: 0x8100
• 	PRI: 3 bits: priority 	field
• 	Flag or CFI (Canonical Format Identifiers): 0 for
Ethernet, 1 for Token-ring or DEI (Drop Eligible
Indicator) for congestion
• 	VLAN ID: 12 Bits: VLAN ID
7
Fig. 802.1Q Frame
-- 7 of 18 --
• 	VLAN Ranges
8
Range 	Range 	Usage Propagated
in VTP?
0, 4095 	Reserved System use only
cannot be used, seen -
1 	Normal Default VLAN
cannot be deleted Yes
2-1001 	Normal Ethernet VLAN
can be created, deleted, used Yes
1002-1005 	Normal Default for FDDI, Token Ring
cannot be deleted Yes
1006-1024 	Reserved System use only
cannot be used, seen -
1025-4094 	Extended 	Ethernet VLAN
Yes (version 3)
used with VTP
transparent mode
-- 8 of 18 --
VLAN Configurations
• 	Creating VLAN
• 	if VLAN name is not configured, VLAN name is
VLANZZZZ, ZZZZ 	is 4-digit VLAN ID
9
vlan 	vlan-id
[name 	name]
!
-- 9 of 18 --
• 	VLAN Segmentation Model
• 	End-to-end VLANs (Fig. 6)
• 	Users are assigned to VLAN regardless to their physical
location.
• 	Traffic patterns: 80/20 rules (local/remote)
10
Fig. 6 End-to-end VLANs
-- 10 of 18 --
• 	Local VLANs (Fig. 7)
• 	VLANs are designed based on geographic boundaries.
• 	Traffic patterns: 20/80 rules (local/remote)
11
Fig. 7 Local VLANs
-- 11 of 18 --
• 	Assigning interface to VLAN
• 	(Optional) To disable trunk mode of interface
12
interface 	type portnumber
switchport access vlan 	vlan-id
!
interface 	type portnumber
switchport mode access
!
interface range 	type port-range
switchport access vlan 	vlan-id
!
-- 12 of 18 --
• 	Assigning Trunk interface
• 	(Optional) controlling VLAN supported in trunk
13
interface 	interface
switchport trunk encapsulation dot1q
switchport mode trunk
!
interface 	interface
switchport trunk allowed vlan 	{ 	vlan-list | 	all 	|
none 	[{add|except|remove} 	vlan-list}] }
-- 13 of 18 --
Verifying VLAN
• 	Status of all VLANs
• 	Status of specific VLAN
• 	State of specified interface
• 	Show trunk interface
14
#show vlan briefs
#show vlan id 	vlan-id
#show interface 	type portnumber 	switchport
#show interface trunk
-- 14 of 18 --
Extra
• 	Cisco trunk mode can use Dynamic Trunking Protocol (DTP) to
negotiate whether trunking should be used guided by
administrative mode.
• 	administrative mode: whether to use trunk or not, or
negotiate.
• 	Administrative mode using “switchport mode” 	configuration
under interface submode.
• 	default mode is "dynamic auto"
• 	HW: What mode will it be if you connect two switches using this
default mode?
• 	GNS3 IOU currently does not support DTP
• 	No dynamic {auto|desirable} in IOU.
15
interface 	interface
switchport mode 	{access|trunk|dynamic 	{auto|desirable} 	}
!
-- 15 of 18 --
• 	switchport mode 	commands
16
Command 	Description
access 	Always acts as an access port
trunk 	Always acts as a trunk port
dynamic desirable 	Initiates negotiation and responds to negotiation
dynamic auto 	Passively waits to receives negotiation
-- 16 of 18 --
• 	Expected trunking operation mode
17
Mode 	access dynamic
auto trunk dynamic
desirable
access 	Access 	Access 	Do Not Use 	Access
dynamic
auto Access 	Access 	Trunk 	Trunk
trunk 	Do Not Use 	Trunk 	Trunk 	Trunk
dynamic
desirable Access 	Trunk 	Trunk 	Trunk
-- 17 of 18 --
References
• 	Contents and 	figures are from
• 	Odom, W., “Cisco CCENT/CCNA ICDN1 100-101
Official Cert Guide,” Cisco Press, 2013.
• 	Odom, W., “Cisco CCNA Routing and Switching ICDN2
200-101 Official Cert Guide,” Cisco Press, 2013.
• 	Hucaby, D. “CCNP SWITCH 642-813 Official
Certification Guide,” Cisco Press, 2010.
• 	Froom R., Sivasubramanian, B., and Frahim, E.,
“Implementing Cisco Switched Networks (SWITCH)
Foundation Learning Guide,” Cisco Press, 2010.
18
-- 18 of 18 --

## CPE434Slide05VTP.pdf

Computer Network
Design and
Management
261434
05
VTP
1
-- 1 of 15 --
Agenda
• 	VTP Overview
• 	VTP Domains
• 	VTP Modes of Operation
• 	VTP Pruning
• 	VTP Version
• 	VTP Authentication
• 	VTP Configuration
• 	VTP Verification
• 	Note
2
-- 2 of 15 --
VTP Overview
• 	When there are multiple switches, how to make them have
all VLAN databases?
• 	Configure all VLANs in each switch manually.
• 	Use VTP.
• 	VLAN Trunking Protocol (VTP)
• 	VTP uses layer 2 trunk frames to communicate VLAN
information (Fig. 1)
• 	VTP Management: addition, deletion, and renaming.
Fig 1. VTP
3
-- 3 of 15 --
VTP Domains
• 	VTP is organized into management domains or area with
common VLAN requirements.
• 	A domain is a switch or several interconnected switches.
• 	One switch can belong to only one domain.
• 	By default, a switch is in no-management-domain.
• 	VTP advertisements cannot be sent across the router.
4
-- 4 of 15 --
VTP Modes of Operation
Mode 	Feature
Client
A VTP client behaves like a VTP server and transmits and receives VTP
updates on its trunks, but you cannot create, change, or delete VLANs on a
VTP client. VLANs are configured on another switch in the domain that is in
server mode.
Server
The default VTP mode is server mode, but VLANs are not propagated over
the network until a management domain name is specified or learned. When
you make a change to the VLAN configuration on a VTP server, the change
is propagated to all switches in the VTP domain. VTP messages are
transmitted out of all the trunk connections.
Transparent
When you make a change to the VLAN configuration in VTP trans- parent
mode, the change affects only the local switch. The change does not
propagate to other switches in the VTP domain. VTP transparent mode does
forward VTP advertisements that it receives within the domain.
.
5
-- 5 of 15 --
Fig 2. VTP advertisements and operations of each mode
6
-- 6 of 15 --
VTP Pruning
• 	By default, a trunk link transports traffic from all VLANs
(Fig. 3) except one removed from the trunk.
Fig 3. Without VTP Pruning. Broadcast frames of
VLAN3 for switch C are forwarded to switch B
7
-- 7 of 15 --
• 	With VTP pruning enable, broadcast and unknown unicast
frames are forwarded over a trunk link only if the switch
has ports in that VLAN (Fig. 4).
Fig 4. With VTP Pruning. Broadcast frames of
VLAN3 for switch C are not forwarded to switch B
8
-- 8 of 15 --
VTP Version
• 	Cisco supports VTP version 1, 2, and 3.
• 	Version 1 and 2. Version 2 added more support on VTP.
• 	Token Rink support
• 	Unrecognized TLV support
• 	Version independent transparent support
• 	Consistency check
• 	Version 3. It does not directly handle VLANs. It is
responsible for distributing a list of databases over an
administrative domain.
• 	CCNP SWITCH focuses on version 2.
9
-- 9 of 15 --
VTP Authentication
• 	VTP password feature can be used.
• 	All switches in the same domain must use the same
password and domain name.
• 	Password: 8 to 64 characters and case sensitive.
• 	MD5 is used to encrypt password to 128 bits.
10
-- 10 of 15 --
VTP Configuration
• 	Configure VTP on a switch
1.Configure VTP mode
2.Configure VTP domain name
3.(Optional)Configure VTP version
4.(Optional) configure VTP password
5.(optional) configure VTP pruning
vtp mode 	{server|client|transparent}
vtp domain 	domain_name
vtp version 1|2
vtp password 	password_string
vtp pruning
11
Question: What is a default mode for VTP?
-- 11 of 15 --
VTP Verification
• 	Display VTP status
• 	Display VTP statistics
#show vtp status
#show vtp counters
12
-- 12 of 15 --
Note
• 	VLAN information is usually stored in flash memory (flash:/
vlan.dat). In order to remove all VLANs information, the
file vlan.dat should be removed.
• 	There are some differences in IOU and real switch.
• 	in IOU, it is stored in VM (folder unix:)
• 	The startup-config and running-config are stored in
nvram:/
• 	You can also delete the startup-config in nvram:/
13
-- 13 of 15 --
• 	vlan.dat is stored in flash:
• 	To remove it:
• 	# delete vlan.dat
• 	startup-config is stored in nvram:
• 	To remove it
• 	# erase startup-config
• 	# delete nvram:/startup-config
14
-- 14 of 15 --
References
• 	Contents and figures are from
• 	Odom, W., “Cisco CCENT/CCNA ICDN1 100-101
Official Cert Guide,” Cisco Press, 2013.
• 	Odom, W., “Cisco CCNA Routing and Switching ICDN2
200-101 Official Cert Guide,” Cisco Press, 2013.
• 	Hucaby, D. “CCNP SWITCH 642-813 Official
Certification Guide,” Cisco Press, 2010.
• 	Froom R., Sivasubramanian, B., and Frahim, E.,
“Implementing Cisco IP Switched Networks (SWITCH),”
Cisco Press, 2015.
15
-- 15 of 15 --

## CPE434Slide06LinkAggregation.pdf

Computer Network
Design and
Management
261434
06
Link Aggregation
1
-- 1 of 21 --
Agenda
• 	Link Aggregation
• 	EtherChannel
• 	PAgP Modes
• 	LACP Modes
• 	Configuration
• 	Configuration Example
• 	Verification Example
2
-- 2 of 21 --
Link Aggregation
• 	Some links might be heavily used and do not have
enough bandwidth. Solutions-
• 	Upgrade to port with faster speed.
• 	Aggregate links or bundle links.
• 	Create logical links from several physical links.
(Channel) (Fig. 1 and Fig.2)
• 	In Cisco, it is called 	EtherChannel.
3
-- 3 of 21 --
EtherChannel
Fig. 1 Physical view of link aggregation
Fig. 2 Logical view of link aggregation
4
-- 4 of 21 --
• 	What happen if links are just connected in parallel
to switches without EtherChannel?
• 	To prevent loops, spanning tree protocol will
block ports and allow only one port to be used
(Fig. 3)
some ports are blocked
x
Fig. 3 Ethernet without EtherChannel. Some ports are blocked to
prevent loops.
5
-- 5 of 21 --
EtherChannel
• 	Benefits
• 	No need to upgrade ports/switch to more
expensive one.
• 	Configuration can be done under EtherChannel
interface.
• 	It provides redundancy. Loss one physical link
will not change topology because spanning-tree
recalculation will not take place.
• 	Load balancing between links of the same
EtherChannel.
6
-- 6 of 21 --
• 	Protocols creating EtherChannel
• 	The Port Aggregation Protocol (PAgP)
• 	Cisco proprietary protocol.
• 	Link Aggregation Control Protocol (LACP)
• 	IEEE specification (IEEE802.3ad)
7
-- 7 of 21 --
PAgP Modes
Mode 	Purpose
Auto Put interface into passive mode. Do not initiate PAgP
negotiation. (Default)
Desirable 	Put interface into active negotiation state.
On Force interface to channel without PAgP. Do not exchange
PAgP packet.
Non-silent
If a switch is connected to a partner that is PAgP-capable, configure the switch interface for non-silent
operation. The non-silent keyword is always used with the auto or desirable mode. If you do not
specify non-silent with the auto or desirable mode, silent is assumed. The silent setting is for
connections to file servers or packet analyzers; this setting enables PAgP to operate, to attach the
interface to a channel group, and to use the interface for transmission.
8
-- 8 of 21 --
Fig 4. PAgP modes setting
9
-- 9 of 21 --
LACP Modes
Mode 	Purpose
Passive Passive negotiating state. Do not initiate LACP packet
negotiation. (default)
Active 	Active negotiation state. Send LACP packets
On 	Force interface to channel without PAgP or LACP.
10
-- 10 of 21 --
Fig. 5 LACP modes setting
11
-- 11 of 21 --
Configuration
• 	Specify a group of interfaces to use EtherChannel
✴ 	You can also configure on an individual interface.
• 	Specify a channeling protocol.
• 	Create a port channel interface.
• 	Specify a port channel interface.
✴ 	interface parameters such as trunk, access
(config)# 	interface range 	interface_range
(config-if-range)# 	channel-protocol 	{pagp 	| 	lacp}
(config-if-range)# 	channel-group 	number 	mode 	{active 	| 	on 	|
auto 	| 	diserable 	| 	passive}
(config)# 	interface port-channel 	number
(config-if)# 	interface_parameters
12
-- 12 of 21 --
• 	Note
• 	By default, trunk protocol on a physical interface
is
• 	auto encapsulation
• 	dynamic trunk mode
• 	When configure a mode on EtherChannel
interface, make sure that it has the same trunk
configuration with physical interfaces.
13
-- 13 of 21 --
Verification
• 	Check if an interface is part of EtherChannel
• 	Check information of an EtherChannel interface
• 	Display summary information of
• 	Check EtherChannel Information
#show interfaces 	interface 	etherchannel
#show etherchannel 	number 	port-channel
#show etherchannel summary
#show interfaces etherchannel
14
-- 14 of 21 --
Configuration Example
SW1 	SW2
Fig. Example of an EtherChannel Configuration
SW1 uses channel 10
SW2 uses channel 20
e0/0
e0/1
e1/0
e1/1
15
-- 15 of 21 --
SW1(config)#vlan 	10
SW1(config-vlan)#end
SW1#
SW1(config)#interface 	range 	e 	0/0-1
SW1(config-if-range)#switchport 	trunk 	encapsulation 	dot1q
SW1(config-if-range)#switchport 	mode 	trunk
SW1(config-if-range)#exit
SW1(config)#interface 	range 	e 	0/0-1
SW1(config-if-range)#channel-protocol 	lacp
SW1(config-if-range)#channel-group 	10 	mode 	active
Creating 	a 	port-channel 	interface 	Port-channel 	10
SW1(config-if-range)#exit
*Jun 	23 	13:03:13.197: 	%EC-5-L3DONTBNDL2: 	Et0/1 	suspended: 	LACP 	currently 	not 	enabled 	on 	the 	remote 	port.
*Jun 	23 	13:03:13.503: 	%EC-5-L3DONTBNDL2: 	Et0/0 	suspended: 	LACP 	currently 	not 	enabled 	on 	the 	remote 	port.
SW1(config)#interface 	port-channel 	10
SW1(config-if)#switchport 	trunk 	encapsulation 	dot1q
SW1(config-if)#switchport 	mode 	trunk
SW1(config-if)#end
SW1#
16
-- 16 of 21 --
SW2(config)#vlan 	10
SW2(config-vlan)#exit
SW2(config)#interface 	range 	e 	1/0-1
SW2(config-if-range)#switchport 	trunk 	encapsulation 	dot1q
SW2(config-if-range)#switchport 	mode 	trunk
SW2(config-if-range)#exit
SW2(config)#interface 	range 	e 	1/0-1
SW2(config-if-range)#channel-protocol 	lacp
SW2(config-if-range)#channel-group 	20 	mode 	active
Creating 	a 	port-channel 	interface 	Port-channel 	20
SW2(config-if-range)#exit
*Jun 	23 	13:05:03.254: 	%LINEPROTO-5-UPDOWN: 	Line 	protocol 	on 	Interface 	Port-channel20, 	changed 	state 	to 	up
SW2(config)#interface 	port-channel 	20
SW2(config-if)#switchport 	trunk 	encapsulation 	dot1q
SW2(config-if)#switchport 	mode 	trunk
SW2(config-if)#end
SW2#
17
-- 17 of 21 --
Example of Verification
SW1#show 	interfaces 	ethernet 	0/0 	etherchannel
Port 	state 	= 	Up 	Mstr 	Assoc 	In-Bndl
Channel 	group 	= 	10 	Mode 	= 	Active 	Gcchange 	= 	-
Port-channel 	= 	Po10 	GC 	= 	- 	Pseudo 	port-channel 	= 	Po10
Port 	index 	= 	0 	Load 	= 	0x00 	Protocol 	= 	LACP
Flags: 	S 	- 	Device 	is 	sending 	Slow 	LACPDUs 	F 	- 	Device 	is 	sending 	fast 	LACPDUs.
A 	- 	Device 	is 	in 	active 	mode. 	P 	- 	Device 	is 	in 	passive 	mode.
Local 	information:
LACP 	port 	Admin 	Oper 	Port 	Port
Port 	Flags 	State 	Priority 	Key 	Key 	Number 	State
Et0/0 	SA 	bndl 	32768 	0xA 	0xA 	0x1 	0x3D
Partner's 	information:
LACP 	port 	Admin 	Oper 	Port 	Port
Port 	Flags 	Priority 	Dev 	ID 	Age 	key 	Key 	Number 	State
Et0/0 	SA 	32768 	aabb.cc00.0100 	19s 	0x0 	0x14 	0x101 	0x3D
Age 	of 	the 	port 	in 	the 	current 	state: 	0d:00h:28m:24s
SW1#
18
-- 18 of 21 --
SW1#show 	etherchannel 	10 	port-channel
Port-channels 	in 	the 	group:
---------------------------
Port-channel: 	Po10 	(Primary 	Aggregator)
------------
Age 	of 	the 	Port-channel 	= 	0d:00h:32m:33s
Logical 	slot/port 	= 	16/0 	Number 	of 	ports 	= 	2
HotStandBy 	port 	= 	null
Port 	state 	= 	Port-channel 	Ag-Inuse
Protocol 	= 	LACP
Port 	security 	= 	Disabled
Ports 	in 	the 	Port-channel:
Index 	Load 	Port 	EC 	state 	No 	of 	bits
------+------+------+------------------+-----------
0 	00 	Et0/0 	Active 	0
0 	00 	Et0/1 	Active 	0
Time 	since 	last 	port 	bundled: 	0d:00h:30m:38s 	Et0/0
SW1#
19
-- 19 of 21 --
SW1#show 	etherchannel 	summary
Flags: 	D 	- 	down 	P 	- 	bundled 	in 	port-channel
I 	- 	stand-alone 	s 	- 	suspended
H 	- 	Hot-standby 	(LACP 	only)
R 	- 	Layer3 	S 	- 	Layer2
U 	- 	in 	use 	f 	- 	failed 	to 	allocate 	aggregator
M 	- 	not 	in 	use, 	minimum 	links 	not 	met
u 	- 	unsuitable 	for 	bundling
w 	- 	waiting 	to 	be 	aggregated
d 	- 	default 	port
Number 	of 	channel-groups 	in 	use: 	1
Number 	of 	aggregators: 	1
Group 	Port-channel 	Protocol 	Ports
------+-------------+-----------+-----------------------------------------------
10 	Po10(SU) 	LACP 	Et0/0(P) 	Et0/1(P)
SW1#
20
-- 20 of 21 --
References
• 	Contents and figures are from
• 	Odom, W., “Cisco CCENT/CCNA ICDN1 100-101
Official Cert Guide,” Cisco Press, 2013.
• 	Odom, W., “Cisco CCNA Routing and Switching ICDN2
200-101 Official Cert Guide,” Cisco Press, 2013.
• 	Hucaby, D. “CCNP SWITCH 642-813 Official
Certification Guide,” Cisco Press, 2010.
• 	Froom R., Sivasubramanian, B., and Frahim, E.,
“Implementing Cisco Switched Networks (SWITCH)
Foundation Learning Guide,” Cisco Press, 2010.
• 	Spanning-Tree Protocol Operation, 	http://
ciscoiseasy.blogspot.com/2010/10/lesson-20-spanning-
tree-protocol.html
21
-- 21 of 21 --

## CPE434Slide07MultilayerSwitch.pdf

Computer Network
Design and
Management
07
261434
Multilayer Switch
1
-- 1 of 8 --
Agenda
• 	Multilayer Switch
• 	Configuration Layer 2 and Layer 3
2
-- 2 of 8 --
Multilayer Switch
• 	With the multilayer switch, different types of
interface modes can be used as example in Fig. 1
3
Fig 1. Multilayer switch with various types of ports
-- 3 of 8 --
Configuration Layer 2 and Layer 3
• 	To configure port to be layer 2, use configuration
command
• 	To verify, use command
• 	e.g.
4
sw(config)# 	interface 	interface
sw(config-if)# 	switchport
sw# 	show interface 	interface 	switchport
sw# 	show interface gigabitethernet 0/1 switchport
Name: Gi0/1
Switchport: Enabled
-- 4 of 8 --
• 	To configure port to be layer 3 with IP Address, use
configuration command
• 	To verify, use command
5
sw(config)# 	interface 	interface
sw(config-if)# 	no switchport
sw(config-if)# 	ip address 	ip-address mask
sw# 	show interface 	interface 	switchport
-- 5 of 8 --
• 	To configure Switched Virtual Interface (SVI) of the
vlan interface after the VLAN is created, use the
configuration command
6
sw(config)# 	interface vlan 	vlan-id
sw(config-if)# 	ip address 	ip-address mask
-- 6 of 8 --
• 	To enable L3 switch to be able to run routing
protocol, use the config
7
sw(config)# 	ip routing
-- 7 of 8 --
References
• 	Contents and figures are from
• 	Odom, W., “Cisco CCENT/CCNA ICDN1 100-101
Official Cert Guide,” Cisco Press, 2013.
• 	Odom, W., “Cisco CCNA Routing and Switching ICDN2
200-101 Official Cert Guide,” Cisco Press, 2013.
• 	Hucaby, D. “CCNP SWITCH 642-813 Official
Certification Guide,” Cisco Press, 2010.
• 	Froom R., Sivasubramanian, B., and Frahim, E.,
“Implementing Cisco Switched Networks (SWITCH)
Foundation Learning Guide,” Cisco Press, 2010.
• 	Spanning-Tree Protocol Operation, 	http://
ciscoiseasy.blogspot.com/2010/10/lesson-20-spanning-
tree-protocol.html
8
-- 8 of 8 --

## CPE434Slide08InterVLAN.pdf

Computer Network
Design and
Management
08
261434
Inter VLAN
1
-- 1 of 10 --
Agenda
• 	Forwarding Data between VLANs
• 	Configuration
• 	Router-on-a-Stick
• 	Layer 3 switch
2
-- 2 of 10 --
Forwarding Data between VLAN
• 	Devices in same VLAN must be in same subnet.
• 	Devices in different VLAN must be in different
subnet.
• 	Routing between VLANs is routing between different
subnets.
• 	Switches operate at layer 2.
• 	Routing between different subnet cannot be done.
• 	Routing between different VLAN can be done at
Layer 3.
• 	Router
• 	Multilayer switch or layer 3 switch.
• 	Router’s interfaces must be assigned with IP
Address of the connected subnet.
3
-- 3 of 10 --
• 	Different VLAN links can connect to router for routing
between VLANs. (Fig. 1)
4
Fig. 1 Routing between VLANs using multiple physical interfaces
-- 4 of 10 --
• 	Trunk interface of switch and subinterfaces of router can
be used. This is called Router-on-a-stick. (Fig. 2)
5
Fig. 2 Routing between VLANs using trunking and logical interfaces
-- 5 of 10 --
Configuration
• 	Using router with subinterfaces and switch with trunk
interface
• 	On a switch, configure trunk port on a link connecting
to a router.
• 	On a router, each subinterface with trunk encapsulation
must be configured for each subnet.
6
-- 6 of 10 --
Router-on-a-Stick (Router)
• 	Configure subinterface with trunk encapsulation
• 	No shutdown interface
• 	Configure subinterface. Its IP Address is used as
default gateway (default route) for hosts in this subnet.
7
interface 	type portnumber
no shutdown
!
interface 	type portnumber.n
[description 	description]
encapsulation dot1q 	vlan-id
ip address 	ipaddress subnetmask
!
-- 7 of 10 --
Layer 3 Switch
• 	A layer 3 switch can do layer 3 routing and many
switches nowadays have layer 3 functions.
• 	There is no need to use an extra router. (Fig. 3)
8
VLAN 10
Subnet 10
VLAN 20
Subnet 20
Fig. 3 Routing between VLANs using Layer 3 switch
-- 8 of 10 --
• 	Layer 3 switch can do routing within itself. Only IP
Address for each VLAN is required. This IP address is
used as default gateway (default route) for hosts in the
subnet.
• 	Note
• 	If the switch does not enable L3 routing, you can enable it by
configuration command “ip routing”.
• 	In Packet Tracer, the multi-layer switch does not enable
this function by default.
9
interface vlan 	vlan-id
ip address 	ipaddress subnetmask
no shutdown
!
-- 9 of 10 --
References
• 	Contents and figures are from
• 	Odom, W., “Cisco CCENT/CCNA ICDN1 100-101
Official Cert Guide,” Cisco Press, 2013.
• 	Odom, W., “Cisco CCNA Routing and Switching ICDN2
200-101 Official Cert Guide,” Cisco Press, 2013.
• 	Hucaby, D. “CCNP SWITCH 642-813 Official
Certification Guide,” Cisco Press, 2010.
• 	Froom R., Sivasubramanian, B., and Frahim, E.,
“Implementing Cisco Switched Networks (SWITCH)
Foundation Learning Guide,” Cisco Press, 2010.
10
-- 10 of 10 --

## CPE434Slide09PrivateVLAN.pdf

Computer Network
Design and
Management
261434
09
Private VLANs
1
-- 1 of 19 --
Agenda
• 	Private VLAN Overview
• 	Private VLANs and Port Types
• 	Example of Private VLANs
• 	Configuration of Private VLANs
• 	Verifying Private VLAN
• 	Configuration Example
• 	Note
2
-- 2 of 19 --
Private VLANs Overview
• 	Normally, all hosts in the same VLAN receive broadcast
packet.
• 	To be able to separate broadcast traffic in a VLAN
• 	VLAN access list (VACL)
• 	Private VLANs (Fig. 1)
• 	Partition VLAN into subdomains.
• 	e.g. hosts can communicate with router or gateway but not
other hosts.
Fig. 1 PrivateVLAN Subdomain
-- 3 of 19 --
• 	To separate VLAN
• 	Separating each VLAN per customer requires a high
number of layer interfaces.
• 	Spanning Tree becomes more complicated.
• 	Network address space must be divided into many
subnets, which wastes space and increase
management complexity.
• 	Multiple ACL applications are required to maintain
security on multiple VLANs, this increases
management complexity.
4
-- 4 of 19 --
Private VLANs and Port Types
• 	A port in Private VLANs can be one of the following
• 	Isolated: 	Complete separation with other port in the
same VLAN except promiscuous port.
• 	Promiscuous: It can communicate with all ports within
the same private VLAN. It is generally a router port,
backup or shared server or VLAN interfaces.
• 	Community: It can communicate among themselves
and with their promiscuous port.
5
-- 5 of 19 --
• 	Private VLAN uses VLANs in the following ways.
• 	A primary Private VLAN: The high-level VLAN. A
primary VLAN can compose of many secondary private
VLANs.
• 	A secondary Private VLAN: Every secondary Private
VLAN is a child to a primary Private VLAN and is
mapped to one primary Private VLAN. End devices
connect to secondary VLANs.
• 	There are 2 types of a secondary Private VLAN.
• 	Community Private VLAN
• 	Isolated Private VLAN
• 	Examples are shown in Fig. 2 - 4
6
-- 6 of 19 --
Fig. 2 Private VLAN Port types
from http://www.cisco.com/c/en/us/td/docs/switches/datacenter/nexus5000/sw/configuration/guide/cli/CLIConfigurationGuide/PrivateVLANs.html
7
-- 7 of 19 --
Fig 3. Example of Private VLAN Port types and VLANs
Isolated Private VLAN: PC5 and PC6 belong to the same Private VLAN
Promiscuous Private VLAN: router Port and shared server port
Community Private VLAN: PC1 and PC2 belongs to community VLAN A ports
PC3 and PC4 belongs to community VLAN B ports
8
-- 8 of 19 --
Example of Private VLAN
Fig 4. Example of Private VLANs with a single switch
VLAN 100 is primary Private VLAN.
VLAN 201, 202 are secondary Private VLANs.
9
-- 9 of 19 --
Configuration of Private VLANs
• 	It is recommended to use VTP in transparent mode.
• 	Define all secondary Private VLANs
• 	Define primary VLAN
• 	More secondary VLANs can be added or removed later
by command (under VLAN submode)
vlan 	vlan-id
private-vlan 	{isolated 	| 	community}
vlan 	vlan-id
private-vlan 	primary
private-vlan association 	secondary-vlan-list
The secondary-vlan-list is separated by comma.
For example: 201, 202
private-vlan association add 	secondary-vlan-list
private-vlan association remove 	secondary-vlan-list
10
-- 10 of 19 --
• 	Configure port to associate with Private VLAN
• 	Port connected to router, firewall, or gateway use
promiscuous mode.
• 	add 	and 	remove 	commands can be used.
• 	Port connected to host, use host mode
interface 	type portnumber
switchport mode private-vlan promiscuous
switchport private-vlan mapping 	primary-vlan-id secondary-vlan-list
interface 	type portnumber
switchport mode private-vlan host
switchport private-vlan host-association 	primary-vlan-id
secondary-vlan-id
11
-- 11 of 19 --
• 	For Switched Virtual Interface (SVI) which is interface vlan
(for example, interface vlan 100), to allow layer 3 switch
switching coming secondary VLAN, use the configuration
12
interface vlan 	vlan-id
private-vlan mapping 	{secondary-vlan-list | 	add
secondary-vlan-list 	| 	remove 	secondary-vlan-list}
-- 12 of 19 --
• 	VTP does not support Private VLANs, the private VLANs
must be configured manually on each switch.
13
-- 13 of 19 --
Verifying Private VLAN
#show interface 	interface 	switchport
#show vlan private-vlan
14
-- 14 of 19 --
Configuration Example
Fig. Example of Private VLANs configuration.
VLAN 100 is a primary private VLAN.
VLAN 10, 20, 30 are secondary VLANs.
15
-- 15 of 19 --
16
-- 16 of 19 --
Configure Private VLAN on Trunk
Fig. Example of Private VLANs across switches
VLAN 100 is primary Private VLAN.
VLAN 201, 202 are secondary Private VLANs.
17
-- 17 of 19 --
Note
• 	Private VLAN is not supported with IOU.
• 	Private Vlans, inline-power, ISSU, SSO, NSF, and RPR+
aren't supported by IOU/vIOS-L2. (https://
community.gns3.com/thread/7976)
18
-- 18 of 19 --
References
• 	Contents and figures are from
• 	Odom, W., “Cisco CCENT/CCNA ICDN1 100-101
Official Cert Guide,” Cisco Press, 2013.
• 	Odom, W., “Cisco CCNA Routing and Switching ICDN2
200-101 Official Cert Guide,” Cisco Press, 2013.
• 	Hucaby, D. “CCNP Routing and Switching SWITCH
300-115 Official Cert Guide,” Cisco Press, 2015.
• 	Froom R., Sivasubramanian, B., and Frahim, E.,
“Implementing Cisco Switched Networks (SWITCH)
Foundation Learning Guide,” Cisco Press, 2010.
• 	Spanning-Tree Protocol Operation, 	http://
ciscoiseasy.blogspot.com/2010/10/lesson-20-
spanning-tree-protocol.html
19
-- 19 of 19 --

## CPE434Slide10SpanningTree.pdf

Computer Network
Design and
Management
261434
10
Spanning Tree
1
-- 1 of 42 --
Agenda
• 	Bridging Loops
• 	Spanning Tree Protocol
• 	Bridge Protocol Data Unit
• 	STP Operation
• 	Electing a Root Bridge
• 	Electing Root Ports
• 	Electing Designated Ports
• 	STP States
• 	Timer in STP
• 	Topology Changes
• 	Types of STP
2
-- 2 of 42 --
Bridging Loops
• 	Ethernet switch operations
• 	Listen to frames coming to ports. It adds MAC address of
source MAC address into its MAC table.
• 	Update MAC table on detecting the presence of new
MAC address or detecting a MAC address has changed
location.
• 	Broadcast/flood a frame with the broadcast address as a
destination address. It forwards a frame out all ports
except the port that the frame received.
• 	Flood the a frame with a destination that is not in its MAC
table (unknown unicast). It forwards to all ports except
that the frame received.
• 	Do not modify the frame.
• 	It is called transparent bridge.
3
-- 3 of 42 --
• 	Example of bridging with a switch.
• 	There is no redundancy links or paths.
• 	If gi 1/0/1 or gig 1/0/2 is down, two segments will be
isolated.
• 	Solution: add more switches.
Fig. Bridging with one switch.
4
-- 4 of 42 --
• 	Example of bridging with two switches.
• 	However, this can cause the problem of bridging
loops.
• 	e.g. PC1 sends a frame to PC4.
Fig. Redundant bridging with two switches.
5
-- 5 of 42 --
6
-- 6 of 42 --
• 	Process when PC1 sends a frame from segment A to PC4. Switch
does not know anything about MAC addresses of both PCs yet.
1. 	A and B receives the frame on gi 1/0/1 ports.They put MAC
address of PC1 with 1/0/1 port in their MAC tables.
2.Both switches decide to 	flood the frame.
3.Each switch 	floods the 	flame to its gi 1/0/2 port on segment B.
PC-4 receives two new frames. On segment B, switch A also
hears a new frame from switch B, and switch B hears a new
frame from switch A.
4.Both switches relearn that the source of MAC address of PC-A is
on their gi 1/0/2 ports. They update their MAC table.
5.Both switches still do not learn about location of MAC address
of PC-4. Each switch 	floods the frame to its gi 1/0/1 port.
6.Both switches relearn the MAC address again and the entire
process repeats.
7
-- 7 of 42 --
• 	Example of bridging loops
Fig. Example of bridging loop when Bob
sends a frame.
8
-- 8 of 42 --
Spanning Tree Protocol
• 	Bridging loops from because of parallel switches
are unaware of each other.
• 	Spanning Tree Protocol (STP) is developed to solve
this problem.
• 	STP enables switches to be aware of each other.
• 	Loops are discovered and prevented before.
• 	Redundant link is shutdown and made available
in case of a link failure.
• 	STP Bridge ID (BID): 8 Bytes
• 	2 Bytes: Priority 	field
• 	6 Bytes: System ID used MAC Address of a switch
9
-- 9 of 42 --
• 	Example
Fig. STP blocks a port to prevent loops.
10
-- 10 of 42 --
Bridge Protocol Data Units
• 	STP operates as switches communicating one
another.
• 	Data messages are exchanged by 	Bridge
Protocol Data Units (BPDU).
• 	Source address: MAC address of switch
• 	Destination: STP Multicast Address 01-80-c2-00-00-00
• 	Types of BPDU
• 	Configuration BPDU: Computes spanning tree
• 	If it is the BPDU with TCN 	flag set sent from root, the
TCN bit is in the 	flags 	field.
• 	Topology Change Notification (TCN) BPDU:
Announce changes
• 	By default, BPDU is sent out every 	2 	seconds.
11
-- 11 of 42 --
Field Description 	Bytes
Protocol ID (always 0) 	2
Version (always 0) 	1
Message Type (Configuration or TCN) 	1
Flags (bit 7 TCA, bit 0 TC) 	1
Root Bridge ID 	8
Root Path Cost 	4
Sender Bridge ID 	8
Configuration BPDU Message Content
12
-- 12 of 42 --
Field Description 	Bytes
Port ID 	2
Message Age (in 256th of seconds) 	2
Maximum Age (in 256th of seconds) 	2
Hello Time (in 256th of seconds) 	2
Forward Delay (in 256th of seconds) 	2
Configuration BPDU Message Content (cont.)
13
-- 13 of 42 --
STP Operation
1.Elects one root bridge. (one root bridge per VLAN*)
• 	All ports act as designated ports
2.Selects the root port on all 	nonroot bridges.
(one root port per one nonroot-switch)
•Root port forwards traffic to the root bridge
3.Selects the designated port on each segment.
(one designated port per one network segment)
Fig. STP Operation
14
* When per vlan STP
is used. By default, one VLAN has
its own VTP.
-- 14 of 42 --
Electing a Root Bridge
• 	When a switch is turned on, it assumes that it is a
root bridge. Then, every switch start sending BPDU
with a root bridge with with its BID.
• 	Switches select a root bridge.
• 	A bridge with lowest priority is a root bridge.
• 	If ties,a bridge with lowest MAC address is a root
bridge.
• 	A new switch can preempt a current root bridge.
15
-- 15 of 42 --
• 	Example
Fig. Beginning of a bridge root electing
16
-- 16 of 42 --
• 	Example
Fig. SW1 is a root bridge
17
-- 17 of 42 --
Elect Root Ports
• 	Selecting a root port involves the 	root path cost.
• 	Cumulative costs of all links to the root bridge.
• 	root path cost is carried in BPDU.
Link Bandwidth 	New STP Cost
4 Mbps 	250
10 Mbps 	100
16 Mbps 	62
45 Mbps 	39
100 Mbps 	19
155 Mbps 	14
622 Mbps 	6
1 Gbps 	4
10 Gbps 	2
Table. STP path cost in a link
18
-- 18 of 42 --
• 	New IEEE standards 2004 use the new port cost as
shown in the table. Cisco uses the old one of IEEE
1998. However, the switch can be configured to
use the new one by configuration command
• 	spanning-tree pathcost method long
19
Table: Port cost based on new and old IEEE standard.
-- 19 of 42 --
• 	Root port selection, decision sequence
1.Select a port to a root bridge with the lowest cost
path.
2.Select BPDU sender with lowest BID
3.Selects lowest neighbor port priority. (Default
128)
4.Select lowest port neighbor internal port number.
• 	Note: Port ID is
• 	configurable priority + port number
20
-- 20 of 42 --
• 	Example
Fig. Example of how human calculating root path costs.
* cost here is not from the previous table.
root port
21
-- 21 of 42 --
• 	How STP calculates root path costs
1.Root bridge sends a BDPU with a root path cost 0.
2.Next-close neighbor receives BPDU, it adds cost of
its own port where BPDU arrives.
3.The neighbor sends out BPDUs with new cumulative
cost.
★ 	Note: incrementing the root path, calculates from a
port that the BPDUs come in.
22
-- 22 of 42 --
• 	Example
Fig. Example of how STP calculating root path costs.
* cost here is not from the previous table.
root port
23
-- 23 of 42 --
Electing Designated Ports
• 	STP selects one designated port per one segment.
• 	Root port cannot be assigned to be designated
port.
• 	Decision sequence
1.Select a port to a root bridge with the lowest cost
path.
2.Select BPDU sender with lowest BID
3.Selects lowest neighbor port priority. (Default
128)
4.Select lowest neighbor internal port number.
24
-- 24 of 42 --
• 	Example
Fig. Example of designated ports
root port
designated port
blocked port
X
designated port
25
-- 25 of 42 --
Port Roles
26
-- 26 of 42 --
• 	Example of STP
Fig. Example of STP
27
-- 27 of 42 --
• 	Example of STP
Fig. Example of STP. Root bridge election.
28
-- 28 of 42 --
• 	Example of STP
Fig. Example of STP. Root ports election
29
-- 29 of 42 --
• 	Example of STP
Fig. Example of designated port election.
30
-- 30 of 42 --
STP States
STP State 	Port can 	Port cannot 	Duration
Disabled 	N/A 	Send or receive data 	N/A
Blocking 	Receive BPDUs
Send or receive data
or learn MAC
adresses
Indefinite if loop has
been detected
Listening Send and receive
BPDUs
Send or receive data
or learn MAC
addresses
Forward Delay timer
(15 seconds)
Learning
Send and receive
BPDUs and learn
MAC addresses
Send or receive data Forward Delay timer
(15 seconds)
Forwarding
Send and receive
BPDUs, learn MAC
addresses, and send
and receive data
Indefinite as long as
port is up and loop is
not detected
31
-- 31 of 42 --
32
Timer 	Function Default
(seconds)
Hello 	Interval between configuration BPDUs. 	2
Forward
Delay
Time spent in Listening and Learning
States before transition to Forwarding
States
15
Max Age
Max of time that BPDU can be stored
without receiving an update. Timer
expiration signals an indirect failure with
designated or root bridge.
20
-- 32 of 42 --
Topology Changes
• 	Direct topology changes
• 	Changes that can be detected on a switch
interface.
• 	Indirect topology changes
• 	Link status on each switch is up, but something
between them has failed. No data and BPDU can
pass between switches.
• 	Insignificant topology changes
• 	Change is mostly cosmetic, e.g. link goes up and
down as users reboots their machines. No actual
topology changes.
33
-- 33 of 42 --
Direct Topology Changes
Fig. Effects on a direct topology changes. Link between switch A and C fails.
34
-- 34 of 42 --
• 	Events
1.A detects link down on port 1/2. C detects link
down on port 1/1
2.C removes previous “best” BPDU from the root over
port 1/1. It tries to send TCN out its root port but it
cannot. A should try to send TCN out its root port
but it is a root bridge so it does not need to.
3.A sends BPDU with TCN set out of port 1/1. Each
switch receives and relays it.
4.B and C receives BPUD TCN set.They shorten their
bridging table aging time to Forward Delay time so
that bridge table will be aged out (i.e. 	300 seconds
to 15 seconds).
35
-- 35 of 42 --
5.C waits to hear from root bridge. TCN is received
on port 1/2 which was previously in blocking state.
This BPDU becomes the “best” one. C change port
1/2 from blocking > listening >learning>forwarding.
➡Total times users on C lost connectivity
➡2 times of Forward Delay = 30 seconds
36
-- 36 of 42 --
Indirect Topology Changes
37
Fig. Effects on an indirect topology changes. Something between A and C fails.
-- 37 of 42 --
• 	Events
1.A and C show a link up condition. data begins to be
filtered elsewhere in the link.
2.No link failure is detected so no TCN is sent.
3.C stores best BPDU from root port over port 1/1 but it does
not receive BPDU. After Max Age expires, it is 	flushed. C
waits to hear from the Root again.
4.C hear Configuration BPDU from port 1/2. It is the new
“best” entry, and port 1/2 becomes root port. The port
becomes Blocking > Listening > Learning > Forwarding.
➡Total times users on C lost connectivity
➡time until Max Age expiring + time until next BPDU
received + time for Listening + time for Learning = 20 +
2 + 15 + 15 = 52 seconds
38
-- 38 of 42 --
Insignificant Topology Changes
39
Fig. Effects on an insignificant topology changes. PC on access layer switch C
fails.
-- 39 of 42 --
• 	Event
1.PC on port 2/12 of C is turned off. C detects a link status is
down.
2.C sends TCN to the root over its root port (port 1/1).
3.The root sends a TCN acknowledgement back to C. The root
also send a Configuration BPDU and TCN set to all
downstream switches.
4.B and C receives TCN and shorten their bridge table aging
time. Idles entries are 	flushed, and only actively transmitting
stations are left in the table.
•Only cosmetic change causes all switches to age out entries
from the bridge table.
•Using a PortFast feature can solve this problem.
40
-- 40 of 42 --
Types of STP
• 	802.1D STP
• 	802.1W RSTP (Rapid STP)
• 	Cisco
• 	PVST+ : 802.1D (pvst 	in configuration)
• 	PVRST+ or RPVST+: 802.1W (rapid-pvst 	in
configuration)
• 	MST
41
-- 41 of 42 --
References
• 	Contents and 	figures are from
• 	Odom, W., “Cisco CCENT/CCNA ICDN1 100-101
Official Cert Guide,” Cisco Press, 2013.
• 	Odom, W., “Cisco CCNA Routing and Switching ICDN2
200-101 Official Cert Guide,” Cisco Press, 2013.
• 	Hucaby, D. “CCNP SWITCH 642-813 Official
Certification Guide,” Cisco Press, 2015.
• 	Froom R., Sivasubramanian, B., and Frahim, E.,
“Implementing Cisco Switched Networks (SWITCH)
Foundation Learning Guide,” Cisco Press, 2010.
• 	Spanning-Tree Protocol Operation, 	http://
ciscoiseasy.blogspot.com/2010/10/lesson-20-spanning-
tree-protocol.html
42
-- 42 of 42 --

## CPE434Slide11ImpSTP1-1.pdf

Computer Network
Design and
Management
261434
11
Implementing Spanning Tree 1
1
-- 1 of 45 --
Agenda
• 	Verifying Spanning Tree
• 	STP Root Bridge
• 	Spanning Tree Customization
• 	Redundant Link Convergence
• 	PortFast
• 	UplinkFast
• 	BackboneFast
• 	Spanning-Tree Enhancement
• 	BPDU Guard
• 	BPDU Filter
• 	Root Guard
2
-- 2 of 45 --
Verifying Spanning Tree
• 	To display spanning tree information
• 	To display spanning tree information on active
interfaces only
• 	To display brief information of spanning tree
• 	To display spanning tree information details
#show spanning-tree 	[vlan 	vlan-id]
#show spanning-tree active
#show spanning-tree brief
3
#show spanning-tree detail
-- 3 of 45 --
Verifying Spanning Tree
• 	To display spanning-tree information on interface
• 	To list root bridge
• 	To display bridge ID in component part
#show spanning-tree interface 	interface
4
#show spanning-tree root
#show spanning-tree 	[vlan 	vlan-id] 	bridge
-- 4 of 45 --
STP Root Bridge
• 	Root bridge placement
• 	STP automatically selects the root bridge.
• 	However, poor choice/unexpected topology
could happen, e.g.
• 	Slowest switch becomes the root.
• 	Redundancy problem might occur.
5
-- 5 of 45 --
Fig 1. Typical configuration choice. Making distribution switch
to be root.
6
-- 6 of 45 --
• 	In Fig. 2-1 to Fig. 2-3 show examples of inefficient
root bridge selection.
• 	Switch A cannot take an advantage of 1Gbps links.
• 	Workstations on switch B in order to reach server
farm:
• 	Cross into core layer (switch D), back to access layer
(switch A), and back to core layer (switch C) again
7
-- 7 of 45 --
Fig 2-1. Example of inefficient root bridge election.
All switches have the same priority.
Switch A has the lowest MAC address.
8
-- 8 of 45 --
Fig 2-2. STP converged.
9
-- 9 of 45 --
Fig 2-3. Final spanning-tree structure
10
-- 10 of 45 --
Root Bridge Configuration
• 	To manually select the root bridge. Two methods :
• 	Configure BID of switch to be root bridge to have
lowest priority.
• 	Configure switch to be root bridge to choose its own
priority using the command.
11
-- 11 of 45 --
• 	Configure BID of switch to use as root bridge to
have lowest priority
• 	vlan-list: a list of vlan e.g.
• 	vlan 	20
• 	vlan 	20-100
• 	bridge-priority: 	priority must be number in the range
of 0 - 61440 in increment of 4096. For example, 0,
4096, 8192, 12288,… . The default value is 32768.
spanning-tree vlan 	vlan-list 	priority 	bridge-priority
12
-- 12 of 45 --
• 	Extended system ID is enable by default.
• 	The actual priority = priority + VLAN ID
• 	e.g. configured priority = 4096:
• 	VLAN 1 priority = 4097
• 	VLAN 10 priority = 4106
• 	VLAN 50 = ???
• 	Configuration of extended system ID. (to remove,
use configuration with “no”)
• 	The header of extended system ID is shown in Fig.
3.
spanning-tree extend system-id
13
-- 13 of 45 --
• 	Configure switch to be root bridge to choose its own
priority using the command.
• 	The switch will choose its own priority based on other
switches in the network.
• 	The value priority is modified only one time, when the
command is used.
• 	If all other switches have extended system ID higher
than 24576, the switch reset priority to 24576. If any
other switches has priority not higher than 24576, the
priority will be set to be 4096 less than lowest priority.
spanning-tree vlan 	vlan-id 	root 	{primary 	| 	secondary}
14
-- 14 of 45 --
• 	Bridge ID with extended system ID
Fig 3. BID with extended system ID
15
-- 15 of 45 --
Display Spanning Tree Bridge Priority
• 	Use the command
• 	This command will show BID of the switch and
BID of the root bridge.
#show spanning-tree 	[vlan 	vlan-id]
16
-- 16 of 45 --
Spanning Tree Customization
• 	The criterial of STP to choose path are
• 	Lowest root path cost
• 	Lowest sender BID
• 	Lowest sender port ID
• 	They can be customized.
• 	Changing bridge ID is previously explained.
17
-- 17 of 45 --
Tuning the Root Path Cost
• 	By default, the port cost or port path cost is
inversely proportional to the port’s bandwidth.
• 	To change the port path cost, use the following
configuration.
• 	To check the port cost, use the following command.
interface 	interface
spanning-tree 	[vlan 	vlan-id] 	cost 	cost
#show spanning-tree interface 	interface 	[cost]
18
-- 18 of 45 --
Tuning the Port ID
• 	Port ID is 16 bit number.
• 	8 bits: port priority
• 	Value range is 0 - 255. Default value is 128.
• 	8 bits: port number
• 	Value begins from 1 as port 0/1 and increases
across each module.
• 	To change port priority, use the following
configuration.
• 	To see the port ID, use the command
interface 	interface
spanning-tree 	[vlan 	vlan-list] 	port-priority 	port-priority
#show spanning-tree interface 	interface
19
-- 19 of 45 --
Example
Fig 4. Example of spanning-tree
20
-- 20 of 45 --
21
-- 21 of 45 --
22
-- 22 of 45 --
23
-- 23 of 45 --
24
-- 24 of 45 --
Redundant Link Convergence
• 	Additional features to allow faster STP
• 	PortFast
• 	Fast connectivity on acess-layer switch ports to
workstations
• 	UpLinkFast
• 	Fast-uplink failover on access-layer switch when
dual links are connected into distribution layer
• 	BackboneFast
• 	Fast convergence in the network backbone or core
layer when spanning-tree topology change occurs
25
-- 25 of 45 --
PortFast:Access-Layer Nodes
• 	End users connect to switch port in the access
layer.
• 	When workstation is powered off and then turned
on,
• 	the switch will sense that the port has gone
down.
• 	Port will not be usable until STP cycles from
Blocking state to Forwarding state.
• 	At least 30 seconds by default timer.
• 	If Port Aggregation Protocol (PAgP) is used,
additional 20 second delay may occur.
• 	Loop should not occur with port connecting to
workstations.
• 	Loop might occur, if the workstations have additional
connection back into network and it were bridging to itself.
26
-- 26 of 45 --
• 	PortFast feature shortens Listening and Learning
states to negligible amount of time.
• 	When workstation come up, it moves to
forwarding state immediately.
• 	If spanning-tree loop is detected, it moves to
blocking state.
• 	By default, PortFast is 	disabled.
27
-- 27 of 45 --
• 	To enable all ports (except trunk port) to use
PortFast, use configuration
• 	To enable or disable PortFast on specific port,
use configuration
• 	Note: there is a macro configuration command
on interface. “switchport host”
• 	Port will be set to
• 	access
• 	PortFast enabled
• 	PAgP disabled
spanning-tree portfast default
interface 	interface
[no] 	spanning-tree portfast
28
-- 28 of 45 --
• 	To check the status of PortFast of the interface, use
command
#show spanning-tree interface 	interface 	portfast
29
-- 29 of 45 --
UplinkFast: Access-Layer Uplinks
• 	Access-layer switch with redundant uplink to other
distribution-layer switches,
• 	One uplink would be in Forwarding State.
• 	The other(s) would be in Blocking State.
• 	When primary uplink went down, up to 50 seconds
could be elapse before redundant link could be
used.
• 	UplinkFast feature enables leaf-node switches or
switches at the end nodes of spanning-tree
branches to
• 	have a functioning root port,
• 	keep one more redundant port in blocking
modes
30
-- 30 of 45 --
• 	When primary root port fails,
• 	another blocked link can be brought up for use.
• 	To enable UplinkFast feature, use configuration
• 	Note: This configuration command is 	not allowed
on the 	root bridge switch.
• 	The configuration also makes some modifications
to make sure that switch will not become root
bridge.
• 	Switch priority is raised to 49152.
• 	Port cost of all local ports is incremented by 3000.
spanning-tree uplinkfast
31
-- 31 of 45 --
• 	The check the status of STP UnlinkFast, use
command
#show spanning-tree uplinkfast
32
-- 32 of 45 --
BackboneFast:Redundant Backbone Paths
• 	BackboneFast is used to shorten STP
convergence.
• 	It determines whether an alternate paths exist to
root bridge, in case of 	indirect link failure.
• 	Switch detects link failure when it receives 	inferior
BPDU*.
• 	Normally, switch has to wait until Max Age timer
expired before responding to inferior BPDU.
* Inferior BPDU: BPDU with root bridge information that is
worse that current root bridge stored in the switch
or BPUD with longer distance to root bridge.
ref: http://www.networkpcworld.com/what-are-inferior-and-superior-bpdus-of-stp/
33
-- 33 of 45 --
• 	With BackboneFast, switch determine whether
alternate paths exist depending on port receiving
inferior BPDU
port receiving
inferior BPDU action
port in Blocking
State
root port and other blocked port to be
alternative paths to root bridge
root port all blocked port to be alternative paths to root
bridge
root port and no
ports are blocked switch become new root bridge
34
-- 34 of 45 --
• 	To enable BackboneFast, use the configuration
command
• 	To verify current BackboneFast state, use
command
spanning-tree backbonefast
#show spanning-tree backbonefast
35
-- 35 of 45 --
Spanning-Tree Enhancement
• 	BPDU Guard: Prevent connecting switch to
PortFast enabled port.
• 	BPDU Filtering: Prevent switch from sending
BPDU out on PortFast enabled port.
36
Fig 5. Enabling BPDU Guard/Filter on access port.
-- 36 of 45 --
• 	RootGuard: 	Prevent new switch connecting to
RootGuard configured port to become a new root
bridge.
37
Fig 6. Spanning-Tree with RootGuard disabled.
-- 37 of 45 --
BPDU Guard
• 	By default, BPDU Guard is disabled.
• 	To enable or disable BPDU Guard on switch, use
configuration command
• 	To verify configuration, use command
38
[no] 	spanning-tree portfast edge bpduguard default
#show spanning-tree summary total
-- 38 of 45 --
• 	The STP BPDU Guard shuts down PortFast-
configured interfaces that receive BPDUs.
• 	Example, when PortFast port with BPDU guard
receives BPDU
39
SPANTREE-2-RX_PORTFAST: 	Received 	BPDU 	on 	PortFast 	enable 	port.
Disabling 	2/1
PAGP-5-PORTFROMSTP: 	Port 	2/1 	left 	bridge 	port 	2/1
-- 39 of 45 --
BPDU Filter
• 	By default BPDU Filter is disabled.
• 	To enable or disable BPDU Filter on switch, use
configuration command
• 	To enable or disable on specific interface, use
configuration command
• 	To verify configuration, use command
40
[no] 	spanning-tree portfast bpdufilter default
#show spanning-tree summary
interface 	interface
spanning-tree bpdufilter 	{enable 	| 	disable}
#show spanning-tree interface 	interface 	detail
-- 40 of 45 --
• 	IF BPDU filtering is enabled globally
• 	If BPDUs are seen, the port loses its PortFast
status, BPDU filtering is disabled, and the STP
sends and receives BPDUs on the port as it
would with any other STP port on the switch.
• 	If BDLU filtering is enabled on the individual port.
• 	It ignores BPDU and sends no BPDU
• 	If you enable BPDU Guard on the same interface
as BPDU filtering, BPDU Guard has no effect
because BPDU filtering takes precedence over
BPDU Guard.
41
-- 41 of 45 --
RootGuard
• 	By default RootGuard is disabled.
• 	To enable or disable RootGuard on specific
interface, use configuration command
• 	To verify configuration, use command
42
interface 	interface
[no] 	spanning-tree guard root
#show running-config interface 	interface
-- 42 of 45 --
• 	When 	superior BPDU** 	received on the port, the
port will be kept in 	root-inconsistent state.
• 	Root-inconsistent state can be check by command
43
** Superior BPDU: BPDU with lower BID than the current root bridge.
ref: http://www.networkpcworld.com/what-are-inferior-and-superior-bpdus-of-stp/
#show spanning-tree inconsistentports
-- 43 of 45 --
• 	Example, when Root-Guard-enabled port receives
a superior BPDU
44
SPANTREE-2-ROOTGUARDBLOCK: 	Port 	1/1 	tried 	to 	become 	non-
designated 	in 	VLAN 	77. 	Move 	to 	root-inconsistent 	state.
-- 44 of 45 --
References
• 	Contents and figures are from
• 	Odom, W., “Cisco CCENT/CCNA ICDN1 100-101
Official Cert Guide,” Cisco Press, 2013.
• 	Odom, W., “Cisco CCNA Routing and Switching ICDN2
200-101 Official Cert Guide,” Cisco Press, 2013.
• 	Hucaby, D. “CCNP SWITCH 642-813 Official
Certification Guide,” Cisco Press, 2010.
• 	Froom R., Sivasubramanian, B., and Frahim, E.,
“Implementing Cisco Switched Networks (SWITCH)
Foundation Learning Guide,” Cisco Press, 2010.
45
-- 45 of 45 --

## CPE434Slide12ImpSTP2-1.pdf

Computer Network
Design and
Management
261434
12
Implementing Spanning Tree 2
1
-- 1 of 26 --
Outline
• 	Protecting Against Sudden Loss BDPUs
• 	Loop Guard
• 	UDLD
• 	Flex Links
2
-- 2 of 26 --
• 	After STP converges and becomes loop free, switch ports
are assigned the following roles:
• 	Root port:The one port on switch that is closest the the
root bridge.
• 	Designated port: The port on a LAN segment that is
closer to the root.
• 	Blocking port: Port are neither root nor designated
ports.
• 	Alternate port: Ports that are candidate root ports but
are in the blocking state. They are identified for quick
use by the STP UplinkFast.
• 	Forwarding port: Ports where no STP activity is
detected or expected. These are ports with normal end
users connection.
3
-- 3 of 26 --
Protecting Against Sudden Loss of BPDUs
• 	BPDUs are used as probed to learn about network
topology.
• 	BPDUs must be sent from root bridge and must be
relayed by every other switch in STP domain.
• 	If a switch does not received BPUDs in timely
manner.
• 	Topology must have changed.
• 	Blocked port can be unblocked.
• 	However, it might be a mistakes that BPUDs are
not being received.
• 	Bridging loop can be formed.
• 	To detect or prevent unexpected loss of BPDUs
• 	Loop Guard
• 	Unidirectional Link Detection (UDLD)
4
-- 4 of 26 --
Loop Guard
• 	Suppose a switch port is receiving BPDUs and it is
in a 	blocked state.
• 	If the flow of BPDUs stop for some reason, after
MAX Age expires,
• 	The last received BPDU is flushed.
• 	The port is moved through STP states until it
starts to forward the traffic and forms a bridging
loop.
• 	The port becomes a designated port and send
BPDUs downstream even it should be receiving
BPUDs from upstream.
5
-- 5 of 26 --
• 	Example
• 	Unidirectional link failure between switch B and
Switch C. C cannot receive BPDUs from B (Fig.1)
6
Fig. 1. Unidirectional link without loop guard
-- 6 of 26 --
• 	The port moves into the forwarding state, a
bridge loop occurs (Fig.2)
7
Fig. 2. Bridging loop without loop guard
-- 7 of 26 --
• 	With Loop Guard feature (works in only Layer2),
• 	If switches stop receiving BUPDs on non
designated port with Loop Guard enable,
• 	it places the port into the STOP 	loop-inconsistent
blocking state.
• 	The switch logs the following message.
• 	If the port later received BPDU when it is in loop
inconsistent state, it transits to STP states.
8
SPANTREE-2-LOOPGUARDBLOCK: 	No 	BPDUs 	were 	received 	on 	port 	3/2 	in 	vlan 	3.
Moved 	to 	loop-inconsistent 	state.
SPANTREE-2-LOOPGUARDUNBLOCK: 	port 	3/2 	restored 	in 	vlan 	3.
-- 8 of 26 --
• 	Example, when the Loop Guard is used on Fig. 1.
(Fig.3)
9
Fig. 3. Unidirectional Link with Loop Guard
-- 9 of 26 --
• 	You can enable Loop Guard on all switch ports,
regardless to their functions. The switch figures out
which ports are nondesignated port and monitors
BPDU activity to keep them nondesignated.
• 	Nondesignated ports are generally the alternative
root ports and ports that are normally are blocking.
10
-- 10 of 26 --
• 	By default Loop Guard is disabled on all switch
ports.
• 	To enable as global default, use configuration
command
• 	To enable/disable on specific port, use
configuration command
• 	To verify status on an interface, use command
11
switch(config)# spanning-tree loopguard default
switch(config-if)# 	[no] 	spanning-tree guard loop
#show spanning-tree interface 	interface 	detail
#show spanning-tree summary
-- 11 of 26 --
UDLD (UniDirectional Link Detection)
• 	In campus network, switches are connected by
bidirectional links.
• 	If just one side of the links fails (receive or transmit), :
fiber-optic port: SFP modules, GBIC modules
• 	Switches still see bidirectional link but traffic would be
delivered only one direction.
• 	This is known as 	unidirectional link.
• 	Port in blocking state will be forwarding traffic and
cause a bridging loop.
• 	UDLD STP feature can be used. It is a the Cisco
proprietary.
• 	UDLD interactively monitors a port to see if it is a truly
bidirectional.
• 	Switch sends Layer 2 UDLD frames identifying its
switch port at regular intervals.
12
-- 12 of 26 --
• 	UDLD expected far end switch to echo those
frames back across the same link with the far
end switch port’s identification added.
• 	If a UDLD frame is received in returned and both
neighboring ports are identified in the frame,
• 	the link is bidirectional.
• 	Both end switches must be configured UDLD.
• 	By default, UDLD are sent out every 7s (Catalyst
3550) or 15 s (Catalyst 4500 and 6500).
• 	It can detects unidirectional link after three times
the UDLD message interval (45 seconds)
13
-- 13 of 26 --
• 	UDLD has two modes of operation.
• 	Normal mode: 	When a unidirectional link is
detected, the port allowed to continue its
operation. It just marks the ports as having an
undetermined state and generates a syslog
message.
• 	Aggressive mode: When a unidirectional link is
detected, the switch takes action to reestablish
the link. UDLD messages are sent out one a
second for 8 seconds. If none of messages are
echoed back, the port is placed in the
Erridisable state and it cannot be used.
14
-- 14 of 26 --
• 	Example
• 	In Fig. 4, A is root bridge. Link between B and C
is in the blocking state.
15
Fig. 4. Steady STP behavior in the topology.
-- 15 of 26 --
• 	In Fig. 5, when link between B and C becomes
unidirectional. B can receive traffic to C but C
cannot receive traffic to B. Switch C will have max-
age timer expire.
• 	C will move to listening>learning>forwarding =
bridging loop.
• 	If UDLD is running on B and C, the port will be
blocked
16
Fig. 5. Unidirectional condition in the topology.
-- 16 of 26 --
• 	By default UDLD is disabled on all fiber-optic
switch ports.
• 	To enable as global default for , use configuration
command
• 	To enable/disable on specific port, use
configuration command
• 	To verify status on an interface, use command
17
switch(config)#udld 	{enable 	| 	aggressive 	}
switch(config-if)# udld 	{ 	enable 	| 	aggressive 	| 	disable 	}
#show udld 	[interface]
-- 17 of 26 --
• 	You can enable UDLD on all ports. The switch only
globally enables UDLD only on ports that use fiber-
optic media.
• 	Both side of switches must enable UDLD.
• 	If the other side does not have UDLD enable, the
link will not be disabled.
• 	If using with EtherChannel, UDLD will send
messages on each link within EtherChannel
independently.
• 	It will disable only a link that has a problem, not
all links in the EtherChannel.
18
-- 18 of 26 --
Comparison
• 	Comparison between Aggressive Mode UDLD and
Loop Guard
19
-- 19 of 26 --
• 	Aggressive UDLD cannot detect failures cause by
problems in software in the designated switch not
sending BPUDs.
• 	However, software problem is less common that
hardware problem.
• 	Aggressive UDLD is more robust in its capability to
detect unidirectional links on EtherChannel.
• 	Loop Guard blocks all interfaces of the
EtherChannel by putting the EtherChannel into
loop-inconsistent state.
• 	UDLD disables the single port.
• 	UDLD is not dependent on STP, it supports
Layer3.
20
-- 20 of 26 --
• 	It is recommended to enable both Loop Guard and
UDLD for the highest level of protection.
21
-- 21 of 26 --
Flex Links
• 	Flex Links is a solution providing alternative of STP.
• 	Users can turn off STP and provide the basic link
redundancy. Convergence time is less than 50 ms.
• 	Flex Links is based on defining an active/standby
link pair on a common access switch.
22
Fig. 6. Configure Flex Links in the network.
-- 22 of 26 --
• 	When one link is up and forwarding traffic, the other
is in the standby mode.
• 	Flex Links are supported only on Layer 2 port and
port channel, 	not 	on VLANs or on Layer 3 port.
• 	An interface can be backup link for only one active
interface.
• 	Neither of the links can be a port of EtherChannel.
However, you can configure two port channel
(EtherChannel logical interface) as Flex Links, and
you can also configure a physical interface and
port channel a Flex Links.
• 	STP is disabled on Flex Links port.
23
-- 23 of 26 --
• 	To configure Flex Links on interface, use
configuration command
• 	To disable STP on interface, use the configuration
command
• 	To verify uses command
24
switch(config-if)# switchport backup interface 	interface
#show interface switchport backup
switch(config-if)# no spanning-tree vlan 	vlanrange
-- 24 of 26 --
• 	Example of Flex Links configuration.
25
-- 25 of 26 --
References
• 	Contents and figures are from
• 	Odom, W., “Cisco CCENT/CCNA ICDN1 100-101
Official Cert Guide,” Cisco Press, 2013.
• 	Odom, W., “Cisco CCNA Routing and Switching ICDN2
200-101 Official Cert Guide,” Cisco Press, 2013.
• 	Hucaby, D. “CCNP SWITCH 642-813 Official
Certification Guide,” Cisco Press, 2010.
• 	Froom R., Sivasubramanian, B., and Frahim, E.,
“Implementing Cisco Switched Networks (SWITCH)
Foundation Learning Guide,” Cisco Press, 2010.
26
-- 26 of 26 --

## CPE434Slide14RapidSTP2-1.pdf

Computer Network
Design and Management
261434
14
Rapid Spanning Tree 2
1
-- 1 of 14 --
Agenda
• 	Example of Port Roles
• 	Topology Changes
2
-- 2 of 14 --
Example Port Roles
3
Fig. 1. Example of port roles
R: Root port
D: Designated port
A: Alternate port
B: Backup port
-- 3 of 14 --
Topology Changes
• 	Topology change mechanism in RSTP
4
Fig. 2. Topology change mechanism in RSTP.
Time used in RSTP is only time for BPDU to travels down the tree.
-- 4 of 14 --
• 	When an RSTP bridge detects a topology change as in
Fig 3.
1. 	RSTP bridge starts the 	TC While timer 	(2 times of
hello interval) for all its nonedge designated port and
its root port, if necessary. TC While timer is the time
that RSTP bridge actively informs the topology
change to the rest of the bridges in the network.
2. 	RSTP bridge flushes the MAC address associated
with nonedge port.
3. 	As long asa the TC While timer is running on a port,
the BPDUs sent out of that port have the TC bit set.
While the timer is active, the bridge sends BPDUs
even on the root port.
5
-- 5 of 14 --
• 	When a bridge receives a BPDU with TC bit set from a
neighbor, it performs these actions.
1. 	The bridge clears the MAC addresses on all its ports,
except the one that received the topology change.
2. 	The bridge start the TC While timer and ends BPDUs
with TC bit set on all its designated ports and root
port.
• 	The topology change propagation is now a one-step process.
The initiator of the of the topology change is flooding this
information throughout the network, as opposed to with 802.1D,
where 	only the root 	sends TC. This mechanism is much faster
than the 802.1D equivalent. In RSTP implementation, there is no
need to wait for the root bridge.
6
-- 6 of 14 --
7
Fig. 3. 	Initial Topology
• 	Example of topology change when link between a root
bridge and switch A is added later. 	Fig. 3 shows the initial
topology.
-- 7 of 14 --
8
Fig. 4. Topology change initiates in 802.1D
• 	Fig. 4 Shows the topology change when the link is added
between the Root and switch A. The link is first in blocked
state. Then, it changes to listening and learning states.
(Listening state can sends the BPDU out. This enables
BPDUs can be sent through the whole network to
calculate STP)
-- 8 of 14 --
9
Fig. 5. Converged topology in 802.1D
-- 9 of 14 --
• 	When a new link is added, the port between the root
bridge and switch A is in the listening state.
• 	Switch A also forwards this superior BPDUs to switch B
and C.
• 	Switch D later receives this superior BPDU.
• 	Switch D blocks port P1.
• 	The result is shown in Fig. 4.
• 	It should be noted that it takes 30 seconds for port
between the root bridge and switch A changes to
forwarding states (Listening + Learning States).
10
-- 10 of 14 --
11
Fig. 7. Changes with RSTP when the link between Root and switch A is added.
• 	Fig. 	7 shows how RSTP works. When the link is added
between Root and switch A. When switch A starts to
sync, switch A blocks port to switch B and C. The new
link is blocked until the root receives agreement from
switch A
-- 11 of 14 --
12
Fig. 8. Switch A start to sync with the root bridge. Then, switch A starts to sync with
switch B and C.
• 	Fig. 	8 shows when switch A starts to sync with switch B
and C. Switch B and C blocks its downstream ports. The
link between switch A and B will be unblocked once
syncing finishes. This is the same with link between
switch A and C
-- 12 of 14 --
13
Fig. 9. Converged topology in RSTP.
• 	Fig. 	9 shows the converged topology of RSTP. In this
case, switch D does not accept the proposal from switch
C; therefore, the link is blocked.
-- 13 of 14 --
Reference
• 	Richard Froom, Balaji SIvasubramanian, and Erum
Frahim, “Implement Cisco Switched Networks (SWITCH),
Foundation Learning Guide, Cisco Press, 2010.
14
-- 14 of 14 --

## CPE434Slide15MST-1.pdf

Computer Network
Design and
Management
261434
15
Multiple Spanning Tree
MST
1
-- 1 of 19 --
Outlines
• 	Multiple Spanning Tree Protocol
• 	MST Overview
• 	MST Region
• 	Configuring MST
2
-- 2 of 19 --
Multiple Spanning Tree (MST) Protocol
• 	Common Spanning Tree (CST)
• 	A single instance of STP for all VLANs.
• 	Network might not balance the loads.
• 	PVST+
• 	One instance of STP for one active VLAN.
• 	Different VLANs can have different topologies.
The network can balance the loads.
• 	However, this consumes too many resources.
• 	There might be only s small number of possible
topologies. e.g. Fig 1.
• 	Running 1 instance per 1 VLAN might be
wasteful.
3
-- 3 of 19 --
4
Fig. 1. Possible STP topologies.
-- 4 of 19 --
• 	To use only a small group of topologies. One
topology for multiple VLANs,
• 	Multiple Spanning Tree (MST) protocol was
developed.
• 	IEEE 802.1s standard.
5
-- 5 of 19 --
MST Overview
• 	MST concept is to map one or more VLANs to a
single STP instance.
• 	Multiple of STP instances can be used, with each
different group of VLANs.
• 	Example, in Fig. 1., two instances of STP can be
used.
• 	To implement MST, the followings have to be
determined.
• 	The number of STP instances needed.
• 	Whether to map a set of VLANs to each instance.
6
-- 6 of 19 --
• 	For example, two instances of STP for 1000 VLANs
(Fig. 2 - 3)
7
Fig. 2. VLAN Load Balancing
-- 7 of 19 --
8
Fig. 3. MST
-- 8 of 19 --
• 	The system ID of MST is
• 	Priority = configure priority + Instance Number
• 	MAC Address of switch
• 	For example, with the default configured priority,
MST 10 will have priority of 32768 + 10 = 32778
9
-- 9 of 19 --
MST Region
• 	If a switch is configure MST, it must figure out which
of its neighbor are using which types of STP.
• 	Configure switch in MST region.
• 	Normally, a single region of MST is sufficient.
• 	Each switch runs in MST has a single MST
configuration with three attributes,
• 	MST configuration name (32 characters)
• 	MST configuration revision number (0-65535)
• 	MST instance-to-VLAN mapping table (4096
entries)
• 	If two switches have the same attributes, they are in
the same region.
10
-- 10 of 19 --
• 	A port is at the boundary of a region if the
designated bridge on its segment is in a different
region or receives legacy 802.11D BPDUs.
• 	Example in Fig 4,
• 	port on B1 is a boundary of region A
• 	ports on B2 and B3 are internal to region B.
11
Fig. 4. Switches in different MST Regions
-- 11 of 19 --
Configuring MST
• 	Enable MST on switch
• 	Enter the MST configuration submode
• 	(Optional) Display the current MST configuration
• 	Configure the name of MST
• 	Set the MST revision number
• 	Maps VLANs to an MST Instance
12
(config)# 	spanning-tree mst configuration
(config-mst)# 	show current
(config-mst)# 	name 	name
(config-mst)# 	revision 	revision_number
(config-mst)# 	instance 	instance_number 	vlan 	vlan_range
(config)# 	spanning-tree mode mst
-- 12 of 19 --
• 	(Optional) Display new MST configuration to be
applied
• 	Apply configuration
• 	After the configuration on all switches are done.
Assign root bridge of MST instance on the switch
that should be rooted for the instance.
13
(config-mst)# 	show pending
(config-mst)# 	end
SWtoBeRoot(config)# 	spanning-tree mst 	instance_number 	root
primary 	| 	secondary
-- 13 of 19 --
• 	Example: Configuration 2 instances (Fig. 5)
• 	Instance 1: VLAN 11, 21, 31
• 	Instance 2: VLAN 12, 22, 32
14
Fig. 5. MST configuration example.
-- 14 of 19 --
• 	Topology after MTP is configured (Fig. 6)
15
Fig. 6. Topology with MST Configured
-- 15 of 19 --
• 	Configuration on all switches
• 	Configure switch A to be a root bridge of instance 1
• 	Configure switch B to be a root bridge of instance 2
16
(config)# 	spanning-tree mode mst
(config)# 	spanning-tree mst configuration
(config-mst)# 	name XYZ
(config-mst)# 	revision 1
(config-mst)# 	instance 1 vlan 11, 21, 31
(config-mst)# 	instance 2 vlan 12, 22, 32
(config-mst)# 	end
A(config)# 	spanning-tree mst 1 root primary
B(config)# 	spanning-tree mst 2 root primary
-- 16 of 19 --
Verifying
• 	Display MST protocol information
• 	Display MST protocol information of instance
• 	Display MST protocol information on specific
interface
• 	Display MST protocol information details
17
#show spanning-tree mst
#show spanning-tree mst 	mst_instance_list
#show spanning-tree mst interface 	interface
#show spanning-tree mst 	mst_instance_list 	detail
-- 17 of 19 --
Verifying
• 	Show summary information
• 	Check configuration including mapping
18
#show spanning-tree summary
#show spanning-tree mst configuration
-- 18 of 19 --
References
• 	Contents and figures are from
• 	Odom, W., “Cisco CCENT/CCNA ICDN1 100-101
Official Cert Guide,” Cisco Press, 2013.
• 	Odom, W., “Cisco CCNA Routing and Switching ICDN2
200-101 Official Cert Guide,” Cisco Press, 2013.
• 	Hucaby, D. “CCNP SWITCH 642-813 Official
Certification Guide,” Cisco Press, 2010.
• 	Froom R., Sivasubramanian, B., and Frahim, E.,
“Implementing Cisco Switched Networks (SWITCH)
Foundation Learning Guide,” Cisco Press, 2010.
• 	Spanning-Tree Protocol Operation, 	http://
ciscoiseasy.blogspot.com/2010/10/lesson-20-spanning-
tree-protocol.html
19
-- 19 of 19 --

## CPE434Slide16DHCP.pdf

Network Design and
Management
16
261434
IPv4 DHCP
1
-- 1 of 14 --
Agenda
• 	DHCP
• 	Configure DHCP
2
-- 2 of 14 --
DHCP
• 	Dynamic Host Configuration Protocol (DHCP)
• 	Assign an IP Address to host includes
• 	Subnet Mask
• 	Gateway
• 	DNS
• 	etc
• 	DHCP works in a broadcast domain, the server
must be located in the same broadcast domain.
3
-- 3 of 14 --
DHCP Steps
4
DHCP
Client DHCP
ServerDHCP Discover
DHCP Offer
DHCP Request
DHCP ACK
*messages are sent by broadcast
source IP:0.0.0.0, source port:68, dest IP:255.255.255.255, dest port:67
source IP:serverIP, source port:67, dest IP:255.255.255.255, dest port:68
source IP:0.0.0.0, source port:68, dest IP:255.255.255.255, dest port:67
source IP:serverIP, source port 67, dest IP:255.255.255.255, dest port:68
-- 4 of 14 --
• 	DHCP Offer offers configuration parameters.
• 	Client might receives more than one DHCP Offer
message.
• 	Normally, it accepts the 	first one.
5
-- 5 of 14 --
Configure DHCP
• 	To configure DHCP on a switch, 	first layer 3
address must be configured. The switch intercepts
DHCP broadcast packets within the VLAN.
• 	To configure, use the following commands in the
following sequences.
• 	* commands in blue color are optional
6
switch(config)# 	ip dhcp exclude-address 	start-ip 	[end-ip]
switch(config)# 	ip dhcp pool 	pool-name
switch(config-dhcp)# 	network 	subnetID subnet-mask
switch(config-dhcp)# 	default-router 	ip-address
switch(config-dhcp)# 	dns-server 	dns-address 	[dns-address2] …
switch(config-dhcp)# 	lease 	{infinite 	| {days 	[hours 	[minutes]]}}
switch(config-dhcp)# 	exit
-- 6 of 14 --
• 	If there are any IP addresses that should be
excluded or reserved, use command 	ip dchp
excluded-address.
• 	The command 	ip dhcp pool 	use a text-string pool-
name.
• 	The command 	default-router 	is used to assign a
default router or default gateway to hosts.
• 	The command 	dns-server 	is used to assign DNS
to hosts.
• 	The command 	lease 	is used to set IP Address
lease duration, by default 1 day limit.
7
-- 7 of 14 --
• 	In case, there are multiple VLANs using different
subnets, configure multiple pools for each VLAN.
• 	The DHCP server will automatically assign IP
address with the pool that is corresponding to IP
address on interface VLAN.
• 	If DHCP server is configured on the router for
router-on-stick, the same configuration can be
used, and the DHCP server will automatically
assign IP Address that is corresponding to IP
Address of sub-interface of the router.
8
-- 8 of 14 --
• 	To verify DHCP configuration, use command
9
switch# 	show ip dhcp binding
-- 9 of 14 --
Configure DHCP Relay
• 	If a DHCP server is centrally located in the network,
you can configure a multilayer switch to relay
DHCP messages between clients and the servers
even they are in a different subnets or VLANs as
shown in example in Fig.1
10
Fig 1. Configuration of IP Helper address
20.5.5.5vlan10
10.1.10.1
-- 10 of 14 --
• 	To configure DHCP relay, use the following
commands
• 	For example, in Fig1.
11
switch(config)# 	interface vlan 	vlanID
switch(config-if)# 	ip helper-address 	ip-address-of-dhcpserver
(config)# 	interface vlan10
(config-if)# 	ip address 10.1.10.1 255.255.255.0
(config-if)# 	ip helper-address 20.5.5.5
-- 11 of 14 --
IPv6 SLAAC
• 	IPv6 can use SLAAC (StateLess Address Auto
Configuration) without DHCPv6.
• 	If the interface of L3 device has IPv6 unicast
address, the devices connecting to this
interfaces can use autoconfig to obtain IPv6
address in the same subnet.
• 	However, you requires additional configuration to
enable IPv6 and ensure that hosts do not use
stateful autoconfiguration to obtain addresses
(no ipv6 nd managed-config-flag) and do not
use stateful autoconfiguration to obtain non-
address options from DHCP (no ipv6 nd other-
config-flag)
12
-- 12 of 14 --
Additional Configuration for SLAAC
• 	Configure the following commands on L3 interfaces
related with IPv6 address
13
switch(config)# 	interface 	interface
switch(config-if)#ipv6 enable
switch(config-if)#no ipv6 nd managed-config-flag
switch(config-if)#no ipv6 nd other-config-flag
-- 13 of 14 --
References
• 	Contents and 	figures are from
• 	Configure IPv6 Client IP Address Learning, https://
www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9400/
software/release/16-8/configuration_guide/ipv6/
b_168_ipv6_9400_cg/b_168_ipv6_9400_cg_chapter_011.pdf
• 	Odom, W., “Cisco CCENT/CCNA ICDN1 100-101 Official Cert
Guide,” Cisco Press, 2013.
• 	Odom, W., “Cisco CCNA Routing and Switching ICDN2
200-101 Official Cert Guide,” Cisco Press, 2013.
• 	Hucaby, D. “CCNP SWITCH 642-813 Official Certification
Guide,” Cisco Press, 2010.
• 	Froom R., Sivasubramanian, B., and Frahim, E., “Implementing
Cisco Switched Networks (SWITCH) Foundation Learning
Guide,” Cisco Press, 2010.
• 	Spanning-Tree Protocol Operation, 	http://
ciscoiseasy.blogspot.com/2010/10/lesson-20-spanning-tree-
protocol.html
14
-- 14 of 14 --

## CPE434Slide17EnterpriseCampusNetworkDesign.pdf

Network Design and
Management
261434
17
Enterprise Campus Network Design
1
-- 1 of 43 --
Outlines
• 	Hierarchical network design
• 	Modular Network Design
2
-- 2 of 43 --
Hierarchical Network Design
• 	The simple network. Every devices are connected to the
same network segment.
• 	They share available bandwidth.
• 	They are in the same broadcast and collision domain.
• 	Example in Fig.1
3
Fig.1. Simple shared ethernet network
-- 3 of 43 --
• 	You can provide segmentation at Layer 3 by using a
router or multilayer switch.
• 	Layer 3 devices do not propagate collision condition
from one segment to another and it will not forward
broadcasts between segments.
• 	Example in Fig 2 with 2 segments or 2 VLANs using
switch A.
4
Fig.2. Example of network segmentation
-- 4 of 43 --
• 	A network might continue to grow as more users and
devices are added. New switches can be added.
• 	Example in Fig 3.
• 	Switch B aggregates VLAN 1
• 	Switch C aggregates VLAN 2
5
Fig.3. Expanding a segmented network
-- 5 of 43 --
• 	More VLANs can be added to support additional
applications or users.
• 	Example in Fig. 4. Two VoIP networks have been added.
6
Fig.4. Network Growth Through New VLANs
-- 6 of 43 --
Predictable Network Model
• 	Network should be designed in a predictable behavior.
• 	e.g. Campus network needs to recover from failures
and topology changes quickly in predetermined
manner.
• 	You should scale network for future expansion and
upgrade.
• 	Network should be capable of efficiency connecting
users with the resources they needed, regardless of
location.
• 	Design network around the traffic flows. All end users
should be located consistent distance from the resources
they need to use.
7
-- 7 of 43 --
• 	Cisco refine a hierarchical approach to network design.
• 	Fig. 5. shows two layers. Distribution and Access layers
8
Fig.5. Two-Layer Network Hierarchy
-- 8 of 43 --
• 	As the number of network grows, the number of access
switches grows. Consequently, the number of distribution
switches increase.
• 	The distribution switches are aggregated by the core
layer as Fig. 6
9
Fig.5. Core layer
-- 9 of 43 --
• 	Traffic flows in a campus network can be classified into 3
types
10
Service
Type
Location of
Service
Extent of
Traffic Flow
Local Same segment/VLAN as
user Access layer only
Remote Different segment/VLAN
as user
Access to distribution
layers
Enterprise Central to all campus
users
Access to distribution to
core layers
-- 10 of 43 --
• 	Traffic flow types between PC and servers among
different layers are shown in Fig. 6.
11
Fig.6. Traffic flow paths through a network hierarchy
-- 11 of 43 --
Access Layer
• 	End users connects to the network at access layer.
• 	Provides Layer2 (VLAN) connectivity to end users.
• 	Devices are sometimes called 	building access
switches.
• 	Devices should have the following capabilities:
Low cost per switch
High port density
Scalable uplinks to higher layers
User access function such as VLAN membership,
traffic and protocol filtering, and QoS
Resiliency through multiple uplinks
12
-- 12 of 43 --
Distribution Layer
• 	Provides interconnection between campus network’s
access and core layers.
• 	Devices are sometimes called 	building distribution
switches.
• 	Devices should have the following capabilities:
Aggregation of multiple access-layer devices
High Layer 3 throughput for packet handling
Security and policy-based connectivity functions
through access lists or packet filters
QoS features
Scalable and resilient high-speed links to the core and
access layers
13
-- 13 of 43 --
• 	Switches must be capable of processing the total volume
of traffic from all connected devices.
• 	Switches should have a high port density of high-speed
links to support the collection of access-layer switches.
• 	Distribution layer usually is a 	layer 3 boundary, where
routing meets the VLANs of the access layer.
14
-- 14 of 43 --
Core Layer
• 	Provides connectivity of all distribution-layer devices.
• 	The core is sometimes referred as a backbone.
• 	The core must be capable of switch traffic as efficiently as
possible.
• 	Devices are sometimes called 	campus backbone
switches.
• 	Devices should have the following capabilities:
Very high throughput at Layer 3
No costly or unnecessary packet manipulations
(access lists, packet filtering)
Redundancy and resilience for high availability
Advanced QoS functions
15
-- 15 of 43 --
• 	Devices should be optimized for high performance
switching.
• 	It should be designed with simplicity and efficiency
because it must handle large amount of campuswide
data
16
-- 16 of 43 --
• 	Hierarchy can be collapse or simplified in a certain cases.
• 	For example, small or medium size campus network
might not have the size, multilayer switching, or volume
requirements that would required the function of all three
layers.
• 	Distribution and core layers can be combined for
simplicity and cost savings.
• 	Collapse core: distribution and core layers are combined
into a single layer.
17
-- 17 of 43 --
Modular Network Design
• 	Consider the hierarchical in Fig.
7.
• 	Each layer is connected to the
adjacency layer by a single
link.
• 	If a link fails, a significant
portion of the network will
become isolated.
18
Fig. 7. Hierarchical network with
a single link between each layer.
-- 18 of 43 --
• 	To migrate a potential
distribution switch
failures, a second,
redundant distribution
switches and redundant
links can be added. E.g.
Fig. 8
19
Fig. 8. Hierarchical network with
redundancy.
-- 19 of 43 --
• 	However, the weakness
in Fig.8 is that there is
one core switch.
• 	To migrate this
problem, the secondary
core switch can be
added with redundant
links as Fig.9.
20
Fig. 9. Fully redundant hierarchical
network design
-- 20 of 43 --
• 	When redundant switches and redundant links are added,
network growth can become confusing. For example, Fig.
10.
21
Fig. 10 Network growth in a disorganized fashion
-- 21 of 43 --
• 	In Fig. 10, it might be difficult to figure out
• 	where VLANs are trunked,
• 	what spanning-tree topologies look like,
• 	which link should have layer 3 connectivity,
• 	etc.
• 	Users might have connectivity through this network, but
might not be clear how they are actually working or what
has gone wrong if they are not working.
22
-- 22 of 43 --
• 	A 	modular approach 	can be used.
• 	Each layer or the hierarchical network model can be
broken into basic functional 	units or modules.
• 	The modules can be sized appropriately and
connected.
• 	Enterprise network can be divided into the following basic
elements.
✦ 	Switch block 	- A group of acess-layer switches with
their distribution switches. (Dashed rectangles in Fig.4
- Fig.10.)
✦ 	Core 	- The campus network’s backbone.
23
-- 23 of 43 --
Switch Block
• 	Switch block contains device from the access and distribution
layers.
• 	All switch blocks connect into the core block.
• 	It contain a balance mix of Layer 2 and Layer 3.
• 	Layer 2 switches connect to end users.
• 	Upstream, each access-layer connects to devices in the
distribution layer.
• 	Layer 3 provides routing and other networking services.
Therefore, distribution layer device should be a multilayer
switch.
• 	Distribution layer shields switch block from certain failures or
condition of other parts of network, e.g. broadcast not
propagated from switch block into the core and other switch
blocks.
• 	STP is confined to each switch block.
24
-- 24 of 43 --
• 	Distribution layer should be a boundary of VLANs,
subnets, and broadcast.
• 	VLAN should not be extended beyond distribution
switch.
25
-- 25 of 43 --
Sizing a Switch Block
• 	Access layer
• 	switch selection is based on port density or the number
of connected users.
• 	Distribution layer
• 	It must be sized according to the number of access-layer
switches that are collapse or brought into a distribution
device. Consider the following factors:
• 	Traffic types and patterns
• 	Amount of layer 3 switching capability at the distribution
layer
• 	Number of users connected to the access-layer switches
• 	Geographic boundaries of subnets or VLANs
• 	Size of spanning-tree domains
26
-- 26 of 43 --
• 	Usually, no more than 2000 users should be placed within
a single block.
• 	Switch block size should be based primarily on the
followings:
• 	Traffic type and behavior
• 	Size and number of common workgroup
• 	When the size become too large or the number of users/
applications grow overtime, a provision to break up or
downsize a switch block is necessary.
27
-- 27 of 43 --
• 	The switch block is too large with the following conditions.
• 	The routers (multilayer switches) at the distribution
layers become traffic bottlenecks.
• 	This might be because of interVLAN traffic, intensive CPU
processing or switching time required by policy or security
function.
• 	Broadcast/multicast traffic slows the switches in the
switch block.
• 	Generally, there should be two distributions switch in each
switch block
• 	Access switch connects to two distribution switches for
redundancy.
• 	Each layer 3 distribution switch can load balance traffic
over its redundant links into core layer (layer 3)
28
-- 28 of 43 --
• 	Fig. 11 shows a typical switch block design.
29
Fig. 11. Typical switch block design
-- 29 of 43 --
• 	As network grows, more access layer switches can be
added to the block as in Fig. 12
30
Fig. 12. Network growth by adding access layer switches to
a switch block.
-- 30 of 43 --
• 	New switch blocks can be added as in Fig. 13.
31
Fig. 13. Network growth by adding new switch blocks
-- 31 of 43 --
Switch Block Redundancy
• 	A switch block consists
of two distribution
switches that aggregate
one or more access
layer switches.
• 	Each access layer
switch should have a
pair of uplinks.
• 	For example, in Fig. 14.
• 	Shading shows how
the VLAN spans
across every switch
and links.
32
Fig. 14. Redundant switch block design
VLAN A	VLAN A
-- 32 of 43 --
• 	Design in Fig. 14 works but it is not optimal.
• 	VLAN A must be carried over every possible link within
the block to span both access switches.
• 	Both distribution switches must also support VLAN A
because the provide layer 3 router function for all hosts
on VLAN.
33
-- 33 of 43 --
• 	A better design is
shown in Fig. 15.
• 	VLAN are not
permitted to span
across multiple
access switches.
34
Fig. 15. Best practice loop-free switch block
topology
-- 34 of 43 --
• 	It is also possible to
push the layer 3
boundary from
distribution layer down
into the access layer
as in Fig. 16
• 	Network stability is
offered through the
fast convergence of
routing protocols.
• 	Load balancing can
also be done across
upload links.
35
Fig. 16. Complete routed switch block
-- 35 of 43 --
• 	Best practices
Design each layer with the pair of switches
Connect each switch to the next higher layer with two
links for redundancy
Connect each pair of distribution switches with a link,
but do not connect the access layer switches to each
other (except access layer switches support some
other means to work as one logical stack or chassis)
Do not extend VLANs beyond distribution switches.
The distribution layer should be the boundary of
VLANs, subnets, and broadcasts.
36
-- 36 of 43 --
Core
• 	A core layer connect two or more switch blocks.
• 	It carries much more traffic than any other switch blocks.
• 	It must be as efficient and resilient as possible.
• 	Links between core should be of sufficient to carry the
aggregated amount of traffic into core.
• 	A core should consist of two multilayer switches than
connect two or more switch blocks for redundancy.
• 	A redundant core is sometimes called a 	dual core.
• 	The example of the core is in Fig. 17.
• 	Note: The core appears as an independent module
and not merged into other block or layer.
37
-- 37 of 43 --
38
Fig. 17. A redundant core layer
-- 38 of 43 --
• 	Each distribution switch has two equal-cost paths into the
core.
• 	Both path remains active as the layer 3 properties.
• 	If the campus network continuing growing, the core layer
can be replicated as Fig. 18.
• 	This is known as a 	multinode core.
• 	Each witch is connected to other core switches to form
a fully meshed core layer.
• 	It should be noted that even they are fully meshed, the
campus network is still divided across the two pairs of
core switch.
• 	Each switch block has redundant connections to only one
core pair - not to all of the core switches.
39
-- 39 of 43 --
40
Fig. 18. Using a multi-node core in very large campus network
-- 40 of 43 --
Collapse Core
• 	In a smaller campus network, a separated core might not
be necessary.
• 	A 	collapse core block
• 	The core layer collapse into the distribution layer.
• 	Both distribution and core functions are provided within
the same switch devices.
• 	The example is shown in Fig. 19.
• 	Each access layer switch has a redundant link to each
distribution layer switch.
• 	All layer 3 subnets present in the access layer terminate
at the distribution switch’s layer 3 ports.
41
-- 41 of 43 --
42
Fig. 19. A collapse core network design
-- 42 of 43 --
References
• 	Contents and figures are from
• 	Hucaby, D. “CCNP SWITCH 642-813 Official
Certification Guide,” Cisco Press, 2010.
• 	Hucaby, D. “CCNP Routing and Switching SWITCH
300-115 Official Cert Guide,” Cisco Press, 2015.
43
-- 43 of 43 --

## CPE434Slide18IntegratingWLAN.pdf

Network Design and
Management
261434
18
Integrating Wireless LAN
1
-- 1 of 61 --
Outlines
• 	Wireless LAN Overview
• 	WLAN Building Blocks
• 	Access Point Operation
• 	Wireless LAN Cells
• 	WLAN Architecture
• 	Autonomous WLAN Architecture
• 	Unified Wireless Architecture
• 	Roaming with Autonomous APs
• 	Roaming in CUWN
• 	Mobility Group
2
-- 2 of 61 --
Wireless LAN Overview
• 	Wireless LAN is defined by IEEE802.11 Standards.
• 	What IEEE802.11 	standards are being used at this
moment?
• 	IEEE802.11 	half-duplex.
• 	Why does it not use full-duplex?
• 	It uses CSMA/CA to avoid collisions.
• 	When a station needs to send a frame, one of two
conditions occurs
• 	No other device is transmitting
• 	Another device is already transmitting a frame
• 	Station requires to wait for a short amount of time
before transmitting called 	DCF Interframe Space
(DIFS).
• 	In addition, before transmitting a frame, it must select a
random backoff timer to wait.
3
-- 3 of 61 --
• 	Example is shown in Fig 1.
4
Fig.1. Avoiding collision with DCF and backoff timer
-- 4 of 61 --
• 	A determines that no users are transmitting. A transmits
frames and advertises the frame duration.
• 	B and C want to transmit frame. They wait until A’s frame
is completed and DIFS period to be expire.
• 	B and C wait a random backoff time.
• 	C timer is shorter so C transmits a frame and advertises
the frame duration.
• 	B has to wait until C’s frame is completed and DIFS
duration to be expired again.
• 	B also has to wait for random backoff time until it can
transmit the frame.
5
-- 5 of 61 --
• 	However,
• 	It is possible that two stations choose the same random
backoff time,
• 	A collision occurs -> Error over the wireless network
• 	A station waits for random backoff time expires, and
send a frame but finds that other station is transmitting
a frame,
• 	It must stop sending and wait to transmit a frame again
6
-- 6 of 61 --
WLAN Building Blocks
• 	802.11 standards allow two or more wireless network
connections as shown in Fig 2.
• 	Station directly communicates with each other. This is
called Ad Hoc Network or Independent basic service
set (IBSS)
• 	Basic service set (BSS) centralizes access and control
over a group by access point (AP)
7
Fig. 2 Wireless Service Sets
-- 7 of 61 --
• 	An AP can also uplink into an Ethernet Network. This is
called 802.11 extended service set (ESS) as shown in
Fig 3.
8
Fig. 3 Wireless Service Sets
-- 8 of 61 --
• 	Membership of the AP is called an 	association.
• 	AP can require any of the following criterial before
allowing a client to join:
• 	A matching SSID
• 	A compatible wireless data rate
• 	Authentication credentials
• 	When associated, all communications to and from client
must pass through the AP. Clients cannot communicate
directly with each other as in an ad hoc network or IBSS.
9
-- 9 of 61 --
Access Point Operation
• 	AP function is to bridge wireless data from the air to a
normal wired network.
• 	AP can also bridge wireless traffic from AP to AP in a
daisy-chain function.
• 	APs act as the central of access, controlling client access
to the wireless LAN.
• 	AP can control many aspects of its WLAN by requiring
conditions to be met before client can associate.
10
-- 10 of 61 --
• 	AP is in charge of mapping a VLAN to an SSID as shown
in Fig. 4.
• 	In addition, multiple VLANs can be mapped to multiple
SSIDs by using trunk link as shown in Fig. 4.
11
Fig. 4 Mapping VLANs to SSIDs
-- 11 of 61 --
Wireless LAN Cells
• 	AP can provide WLAN connectivity to only clients within
its range.
• 	AP’s location must be carefully planned so that its range
matches up with the coverage area.
• 	AP’s coverage area is called a cell as shown in Fig. 5.
12
Fig. 5 Wireless clients in an AP cell
-- 12 of 61 --
• 	AP’s location is fixed but wireless clients change location
quite frequently.
• 	To expand the overall WLAN coverage area, other cells
can be placed in surrounding areas by distributing other
APs throughout the area.
• 	Clients can do roaming. Moving from one AP to another
is called roaming.
• 	Cell areas should overlap each other by small
percentage as shown in Fig 6. for seamless coverage.
13
Fig. 6 AP cells arranged for
seamless coverage.
-- 13 of 61 --
• 	However, in arrangement, the hole of signal should be
consider as shown in Fig. 7
14
Fig. 7 Hole in a channel pattern
-- 14 of 61 --
• 	A better arrangement is called honeycomb as shown in
Fig.8.
15
Fig. 8 An alternate channel pattern
-- 15 of 61 --
• 	Channel overlapping and reusing in a large area should
be carefully considered as shown in Fig. 9 and Fig.10 	.
16
Fig. 9 Channel reuse
-- 16 of 61 --
17
Fig. 10 Channel 	arrangement in 3D
-- 17 of 61 --
• 	When roaming
• 	If clients maintain its same IP Address: Layer 2
roaming.
• 	If clients roam in different IP subnets: Layer 3 roaming.
• 	Range of an AP depends of its power
• 	Maximum power makes AP covers most of its range.
• 	Number of APs can be reduced.
• 	However, AP cell is half-duplex, and clients share
• 	It could be overcrowded.
• 	Reducing power of cell site so that AP can associate
with the number of clients at any given time.
• 	Reduced cell sites are called microcells.
• 	Cells with minimized power are called picocells.
18
-- 18 of 61 --
WLAN Architecture
• 	There are two wireless architectures.
• 	Traditional WLAN Architecture or Autonomous mode AP
• 	Each AP serves as the central of its own BSS.
• 	Unified Wireless Network Architecture or Centralized
Architecture
• 	The APs are centralized.
19
-- 19 of 61 --
Autonomous WLAN Architecture
• 	Each AP serves as the central hub of its own BSS, where
clients located with the AP cell gain an association.
• 	Each AP is isolated, configured individually.
• 	Traffic to and from each client has to pass through the AP
to reach any other part of the network.
• 	Managing RF (Radio Frequency) of many autonomous
APs can be quite difficult.
• 	AP can be considered as a translation bridge of layer 2.
AP is in charge of mapping a SSID to a VLAN or in 802.11
terms, mapping a BSS to Distribution System (DS) as in
shown in Fig. 11.
20
Fig. 11 Bridging and SSID to VLAN
-- 20 of 61 --
• 	In addition, multiple SSIDs can be supported in AP.
VLANs are extended to an AP using trunk link as shown in
Fig. 12.
21
Fig. 12 Bridging 2 SSIDs to 2 VLANs
-- 21 of 61 --
• 	An SSID can be also extended to multiple AP using trunk
links as shown in Fig. 13.
22
Fig. 13 Extent of an SSID and its VLAN to multiple autonomous APs
-- 22 of 61 --
• 	For client to be able to roam everywhere in the area, SSID
and its VLAN would have to be extended to everywhere
that the user could possible roam.
• 	This looks like end-to-end VLAN.
23
-- 23 of 61 --
Unified Wireless Network Architecture
• 	APs are centrally managed.
• 	In cisco, it is called 	Cisco Unified Wireless Network
(CUWN)
• 	AP is called light weight AP.
• 	What about other vendors?
• 	Many of functions in Autonomous APs are shifted to central
location.
• 	In Fig. 14, most of activities performed by an autonomous AP are
broken into two groups.
• 	Real-time processes on the left
• 	Management processes on the right
24
-- 24 of 61 --
25
Fig. 14. Autonomous vs Lightweight access point
-- 25 of 61 --
• 	Real-time processes
• 	sending, receiving 802.11 frames, beacons and probe
messages
• 	data encryption
• 	AP interact with clients on low level known as media
access control (MAC) layer
• 	Real-time processes performed on Lightweight 	Access
Point (LAP)
• 	Management processes
• 	as shown in Fig. 14
• 	Management processes performed on 	Wireless LAN
controller (WLC).
26
-- 26 of 61 --
• 	LAP is left with duties of layer 1 and 2 (frames move in/out
of the RF domain).
• 	Other WLAN functions are totally dependent of WLC such
as
• 	Authentication
• 	Managing security policies
• 	RF channel selecting
• 	Output power selecting
• 	Note that a lightweight cannot normally operate on its
own, it is very dependent upon a WLC
27
-- 27 of 61 --
Split-MAC Architecture
• 	LAP-WLC devision is known as 	split-MAC 	architecture.
• 	LAP and WLC use a tunneling protocol between them to
carry 802.11-related messages and client data.
• 	It is called 	Control and Provisioning of Wireless
Access Points (CAPWAP) 	tunneling protocol. It has
two tunnels as shown in Fig. 15.
• 	CAPWAP control messages
• 	They are used to configure LAP and manage its operation
• 	Messages are authenticated and encrypted.
• 	CAPWAP data
• 	Used for packet traveling to/from clients with LAPs.
• 	Data are not encrypted by default.
• 	Encryption can be enabled by Datagram Transport Layer
Security (DTLS)
28
-- 28 of 61 --
• 	Note CAPWAP is defined in RFCs 5415 - 5418. It is based on the Lightweight
Access Point Protocol (LWAPP) which was a legacy Cisco proprietary.
29
Fig. 15. Linking an LAP and WLC with CAPWAP
-- 29 of 61 --
• 	Every LAP and WLC must also authenticate each other
with digital certificates using X.509 certificate.
• 	Ensure that no rogue LAP and WCL can be introduced
to the network.
• 	CAPWAP tunneling allows the LAP and WLC to be
separated geographically and logically.
• 	For example in Fig. 16. VLAN 100 exists at the WLC and
in the air as SSID 100 near the wireless clients but not in
the between LAP and WLC.
• 	Traffic is encapsulated inside CAPWAP data tunnel.
• 	No trunk links are needed.
• 	WLC can builds more CAPWAP tunnels to reach more
APs as shown in Fig. 17.
30
-- 30 of 61 --
31
Fig. 16. The extent of VLAN 100 in CUWN
-- 31 of 61 --
32
Fig. 17. Using CAPWAP tunnels to connect LAPs to one central WLC.
-- 32 of 61 --
• 	It should be noted that trunk is still required for
connecting WLC with switch as shown in Fig. 18
33
Fig. 18. Connecting WLC connecting switch using a trunk link.
-- 33 of 61 --
• 	With CAPWAP, WLC can do the following activities
• 	Dynamic channel assignment
• 	Transmit power optimization
• 	Self-healing wireless coverage
• 	Flexible client roaming
• 	Dynamic client load balancing
• 	RF monitoring
• 	Security management
• 	Wireless intrusion protection systems
34
-- 34 of 61 --
LAP Operation• 	LAP is designed to be a “zero-touch” configuration.
• 	LAP must find a WLC and obtain all of its configuration
parameters.
• 	The process step that an AP must complete before become
active:
1. 	LAP obtains an IP address from a DHCP server
2. 	LAP learns the IP address of any available WLCs
3. 	LAP sends join request to the first WLC in its list. If failed, the
it tries the next WLC. If WLC accepts, it sends a join reply
back to the LAP.
4. 	WLC compares LAP’s mode image release to the code
release stored locally. If they differ, the LAP downloads the
code image stored on WLC and reboots.
5. 	WLC and LAP build a secure CAPWAP tunnel.
• 	If WLC fails after LAP has joined, LAP reboots and begins the
process of searching for live WLCs again. The associated clients
will be dropped.
35
-- 35 of 61 --
Traffic Patterns in CUWN
• 	Traffic in Autonomous AP as shown in Fig. 19.
• 	Traffic from a client to another part of the network
passes through AP which is bridged onto switched
network.
• 	Traffic between clients travels thought the AP.
36
Fig. 19. Traffic patterns though an Autonomous AP
-- 36 of 61 --
• 	Traffic in CUWN
• 	Traffic to other part of network travels through LAP,
through the CAPWAP data tunnel to the WLC, and then
out onto the switched campus network as shown in Fig.
20.
37
Fig. 20. CUWN traffic patters between wireless and wired networks.
In the example, show traffic from client B to another network.
-- 37 of 61 --
• 	However, traffic between clients travels through CAPAN
tunnel and passes through the WLC before making a
return trip back to the other client as shown in Fig. 21.
• 	Exception:
• 	Clients may use DLS to communicate directly without
passing through the AP and controllers.
• 	LAPs can also be configured in FlexConnect mode, so
traffic can be forwarded locally at the AP if needed.
38
Fig. 21. CUWN traffic pattern between wireless clients.
-- 38 of 61 --
Roaming with Autonomous AP
• 	Clients can change association with AP.
• 	Each AP is work autonomously, so each AP maintain a
table of its own associated clients.
• 	Fig 22 and 23. shows an example of client-1 roaming from
AP-1 to AP-2.
• 	Both APs update their list of association before and
after roaming.
• 	If AP-1 has any leftover frames for the client after the
roam, it forwards them to AP-2 over the wire
infrastructure.
• 	Roaming can be done with multiple APs as shown in Fig.
24.
39
-- 39 of 61 --
40
Fig. 22. Before roaming between Autonomous APs.
-- 40 of 61 --
41
Fig. 23. After roaming between Autonomous APs.
-- 41 of 61 --
42
Fig. 24. Successive Roams of a mobile client.
-- 42 of 61 --
Roaming in CUWN
• 	Wireless clients negotiate with LAPs as 802.11.
• 	However, LAP pass the association request to the WLC.
• 	Wireless clients negotiate with the WLC directly.
• 	This is important for two reasons
• 	All client associations can be managed in a central
location.
• 	Client roaming becomes faster and easier.
• 	CUWN supports both
• 	Intracontroller roaming
• 	Intercontroller roaming
43
-- 43 of 61 --
Intracontroller Roaming
• 	Intracontroller roaming is clients move to another LAP
using the same WLC.
• 	Controller maintain client associations and other
database.
• 	Roaming occurs entirely within the controller.
• 	The controller updates its association table so it knows
witch CAPWAP tunnel to use to reach the client.
• 	It is claimed by Cisco that intracontroller roam takes time
less than 10 ms.
• 	Fig. 24 - 25 shows the example.
• 	Client-1 roams from AP-1 to AP-2.
44
-- 44 of 61 --
45
Fig. 25. A CUWN before an intracontroller roam
-- 45 of 61 --
46
Fig. 26. A CUWN after an intracontroller roam
-- 46 of 61 --
• 	Along with client reassociation, a couple of other process
can occur
• 	DHCP
• 	Client authentication
• 	In authentication, there are some issues because of the
dialog between a controller and a RADIUS server, and
cryptography key exchanges. They requires some
amount of time
• 	Cisco controllers offer three techniques to reduce time.
Clients must have a supplicant or driver softer that is
compatible.
• 	Cisco Centralized Key Management (CCKM): One
controller maintain a database of clients key on behalf of its
AP and can provide to other controller if needed. CCKM
requires Cisco Compatibility Extensions (CCX) support from
clients.
47
-- 47 of 61 --
• 	Proactive Key Caching (PKC): Each client maintains a list
of keys used prior AP associations and presents them as it
roams. The destination AP must be in the list, which is
limited up to 8 AP-key entries.
• 	802.11r: A client can cache a portion of authentication
server’s key and present the the future APs as it roams.
48
-- 48 of 61 --
Intercontroller Roaming
• 	As a wireless network grows, one controller might not be
enough. More WLCs have to be used.
• 	Clients can roam from AP to another AP with different
controller.
• 	There are two possible types of intercontroller roaming
• 	Layer 2 Roaming
• 	Layer 3 Roaming
49
-- 49 of 61 --
Layer 2 Roaming
• 	When the client roams to a different AP, it can try to
continue using its existing IP address.
• 	It is commonly called 	local-to-local roam.
• 	Benefits
• 	A client can keep its same IP address.
• 	The roam is faster (Cisco claimed that it is less than
20ms)
• 	Fig. 27 - 28 show an example of a layer 2 roaming.
• 	Client-1 roams from AP-1 to AP-2.
• 	Both APs use WLAN staff with bound to the same VLAN
100 and 192.168.1.0/24 subnet.
50
-- 50 of 61 --
51
Fig. 27. After a Layer 2 intercontroller roam.
-- 51 of 61 --
52
Fig. 27. After a Layer 2 intercontroller roam.
-- 52 of 61 --
Layer 3 Roaming
• 	Wireless network can grows very large. Each controller
might be assigned with different VLANs and subnets.
• 	Clients will be aware AP roam but they will not usually be
able to detect that they have changed subnet.
• 	DHCP processes should be avoid.
• 	In CUWN, two controllers can compare the VLAN number.
• 	If the VLAN IDs are the same, it becomes a layer 2
roam.
• 	If the VLAN IDs are different, the controllers arrange a
layer 3 roam known as 	local-to-foreign roam.
• 	This allows the clients to keep using their IP address.
• 	An extra tunnel is is built between controllers. It is
called 	Ethernet over IP (EoIP) 	Tunnel
53
-- 53 of 61 --
• 	Fig. 28 - 29 show an example of layer 3 roaming.
• 	Two APs offer different IP subnets in their BSSs.
• 	AP-1 uses 192.168.100.0/24 and a client-1 associates
with AP-1 using 192.168.100.199/24.
• 	AP-2 uses 192.168.200.0/24
• 	When client-1 roams from AP-1 to AP-2
• 	AP-1 is called anchor controller
• 	AP-2 is called foreign controller
• 	The EoIP tunnel carries data to and from the client as it
is still associated with the original controller and IP
subnet.
54
-- 54 of 61 --
55
Fig. 28. Before a Layer 3 intercontroller roam.
VLAN 200
-- 55 of 61 --
56
Fig. 28. After a Layer 3 intercontroller roam.
-- 56 of 61 --
• 	The EoIP tunnel tethers the clients to its original anchor
contoller (and original IP subnet), regarded to its location
or how many controller it roams. e.g. Fig. 29.
57
Fig. 28. Layer 3 roaming across multiple controllers
-- 57 of 61 --
• 	Anchor and foreign controllers are normally determined
automatically.
• 	The first AP and controller that a client first associate
becomes its anchor controller.
• 	In addition, you can configure on controller to be static
anchor a WLAN to force guest clients to associate with
the specific controller.
58
-- 58 of 61 --
Mobility Group
• 	Cisco controllers can be organized into mobility groups to
facilitate intercontroller roaming.
• 	With the two controllers in the same mobility group, Layer 2 and
Layer 3 roaming are both supported, along with CCKM, PKC and
802.11r. Client can also roam quickly between them.
• 	If the two controllers are in the different mobility groups, clients
can still roam between them but not very efficient.
• 	Mobility group have an implied hierarchy as shown in Fig. 29.
• 	Each controller maintains a mobility list contains its own MAC
address and the MAC addresses of other controllers.
• 	Each controller in the list is assigned a mobility group name.
Controller knows and only trusts other controllers cnifugre in the
list.
59
-- 59 of 61 --
60
Fig. 29. Mobility group hierarchy
-- 60 of 61 --
References
• 	Contents and figures are from
• 	Hucaby, D. “CCNA Wireless 640-722," Cisco Press,
2014.
• 	Hucaby, D. “CCNP SWITCH 642-813 Official
Certification Guide,” Cisco Press, 2010.
61
-- 61 of 61 --

## CPE434Slide19HA.pdf

Network Design and
Management
261434
19
High Availability
1
-- 1 of 24 --
Agenda
• 	High Availability
• 	Leveraging Logical Switches
• 	Supervisor and Route Processor Redundancy
2
-- 2 of 24 --
High Availability
• 	High Availability (HA)
• 	High availability 	refers to a system or component that is
continuously operational for a desirably long length of
time. 	Availability 	can be measured relative to "100%
operational" or "never failing.”
3
1 high availability (HA) definition: http://searchdatacenter.techtarget.com/definition/high-availability
1
-- 3 of 24 --
Leveraging Logical Switches
• 	Switches at each network layer should be implemented in
pairs for redundancy.
• 	Link between switches layers should be arranged in pairs
to avoid failure.
• 	The example is shown in Fig. 1.
4
Fig.1 Typical redundant network design
-- 4 of 24 --
• 	However, a pair of access switches as in Fig1. does not
provide redundancy for each other.
• 	To improve the situation, the two redundant physical
switches should be made into one logical switch.
• 	The single of logical switch can group the redundant
links into an EtherChannel as shown in Fig.2.
5
Fig.2 Improving availability by
creating one logical switch
from two
-- 5 of 24 --
• 	A logical switch in Fig.2 has two uplinks, each to one
distribution switch.
• 	One of link (EtherChannel) might be blocked by STP.
• 	Further improvement can be done by create one logical
distribution layer switch from two physical distribution
switches as shown in Fig. 3.
6
Fig.3. Using a logical distribution
switch and connecting two logical
switches with an EtherChannel
-- 6 of 24 --
• 	Fig. 4 and Fig. 5 compares the two redundant
architectures.
7
Fig.4. Traditional redundant switched network architecture
-- 7 of 24 --
8
Fig.5. Enhanced logical switched network architecture
-- 8 of 24 --
StackWise
• 	Normally, access layer switch is independent physical
devices.
• 	If multiple switches in one location is need, links between
them has to be configured.
• 	Cisco has 	StackWise 	and 	StackWisePlus 	technologies
to make separate physical switches act as a single logical
switch.
• 	Switches must be connected by links with special
purpose stacking cables connecting in a daisy-chain
fashion to create the loop as shown in Fig. 6
9
Fig.6. Creating a logical switch with
StackWise
* 	Examples of Cisco switch model with StackWise
are Catalyst 3750-E, 3750-X and 3850.
*
-- 9 of 24 --
• 	More than two switches can also be created logical
stack with daisy-chain scheme as shown in Fig. 7.
• 	The StackWise allows up to 9 physical switches.
10
Fig.6. Extending StackWise to include multiple physical switches
-- 10 of 24 --
• 	With StackWise, one switch becomes a stack mater and
performs all of the management functions.
• 	The whole stack can be managed with only one IP
address.
11
-- 11 of 24 --
Virtual Switching System
• 	There are switches based on a chassis with slots that can
contain multiple switching modules.
• 	The chassis must contain a supervisor module that
handles all the switch management functions.
• 	e.g. routing update and forwarding table
• 	The chassis can also contain a redundant supervisor
module in case the current supervisor modules.
• 	Two identical chassis can also configured to work as one
logical switch. This is known as 	Virtual Switching
System (VSS), often called a VS pair.
• 	One supervisor in one chassis controls the operation of
the logical switch. The other is used for redundant.
12
* 	Examples of Cisco switch model with VSS are Catalyst 5400R, 6500, and 8500
-- 12 of 24 --
• 	Fig 7. shows two switch chassis operating as a VSS pair.
13
Fig. 7 Configuring two identical chassis to work
as one logical switch via VSS
-- 13 of 24 --
Supervisor Engine
• 	The Cisco 	Supervisor Engine 	is the brain of many of
Cisco's switches. The Supervisor Engine has evolved
several times. While it is the management segment of
many routers, the power of the switch is often much
greater than that of the Supervisor Engine because one of
the features of many switches is that dozens of the
functions are accelerated by ASIC chips.
14
* 	Cisco Supervisor Engine: https://en.wikipedia.org/wiki/Supervisor_Engine_(Cisco)
*
-- 14 of 24 --
Supervisor and Route Processor Redundancy
• 	Some switches provide the redundancy for the supervisor
engine.
• 	Having another supervisor engine place within the
switch chassis that is ready to take over during a
failure.
• 	The switch power should also be considered as a part of
HA.
• 	A switch with 2 power supplies and power chord,
• 	One is active and the other is standby
15
*
* 	Example of switch models supporting two supervisors such as
Catalyst 4500R, 6500 and 6800
-- 15 of 24 --
Redundant Switch Supervisors
• 	With two supervisor module
• 	The first module successfully boot becomes an active
supervisor.
• 	The other remain in a standby, waiting the active
module to fail.
• 	Redundancy modes
• 	Route processor redundancy (RPR)
• 	Route processor redundancy plus (PRP+)
• 	Stateful switchover (SSO)
16
-- 16 of 24 --
• 	PRP
• 	The redundant supervisor is only partial booted and
initialized. When the active module fails, the standby
module must reload every other module in the Switch
and then initialized all the supervisor functions
• 	PRP+
• 	The redundant supervisor is booted, allowing the
supervisor and route engine to initialize. No Layer 2 or
Layer 3 functions are started, however. When the
active module fails, the standby module finishes
initializing without reloading other switch modules. This
allows switch ports to retain their state.
17
-- 17 of 24 --
• 	SSO
• 	The redundant supervisor is fully booted and initialized.
Both the startup and running configuration contents are
synchronized between the supervisor modules. Layer 2
information is maintained on both supervisors so that
hardware switching can continue during a failover. The
state of the switch interfaces is also maintained on both
supervisors so that links do not flap during a failover.
18
-- 18 of 24 --
• 	Fig. 8 shows the comparison of each redundancy mode
with respect to the functions they perform.
• 	The shaded functions are performed as the standby
supervisor initialized and waits the active to fail.
19
-- 19 of 24 --
20
Fig. 8 Standby supervisor readiness as a function of redundancy mode
-- 20 of 24 --
• 	The Comparison failover 	time in each mode is shown in
Table 1.
21
Table 1. Redundancy mode and failover time
*Failover is a backup operational mode in which the functions of a system component (such as a processor, server,
network, or database, for example) are assumed by secondary system components when the primary component
becomes unavailable through either failure or scheduled down time.
http://searchstorage.techtarget.com/definition/failover
*
-- 21 of 24 --
Nonstop Forwarding
• 	There is 	nonstop forwarding (NSF) 	feature with SSO.
• 	It is an interactive method focusing on quickly rebuilding
the 	Routing Information Base (RIB) 	table after a
supervisor switch over.
• 	RIB is used to generate the 	Forwarding Information
Base (FIB) 	table for Cisco Express Forwarding (CEF) .
• 	With NFS the router do not need to rebuild the FIB after
switchover.
• 	The router uses NFS to get assistance from other NFS-
aware neighbor.
• 	The neighbor can provide routing information to the
standby supervisor, allowing the routing tables to be
assembled quickly.
• 	Routing protocol supporting NFS: BGP, EIRP, OSPF and
IS-IS.
22
-- 22 of 24 --
Question
• 	What is RIB and FIB?
23
-- 23 of 24 --
Reference
• 	All contents are figures are from
• 	David Hucaby, “CCNP Routing and Switching SWITCH
300-115 Official Cert Guide”, Cisco Press, 2015
24
-- 24 of 24 --

## CPE434Slide20QoS.pdf

Computer Network
Design Management
261434
20
Introduction to Quality of Service
1
-- 1 of 52 --
Agenda
• 	Design Requirement in the Campus Network
• 	Understanding QoS
• 	QoS Service Model
• 	Traffic Classification and Marking
• 	Traffic Shaping and Policing
• 	Congestion Management
• 	Congestion Avoidance
• 	Auto QoS
2
-- 2 of 52 --
Design Requirements in the Campus Network
• 	Table 1 details the requirement for planing voice,
data, and video applications.
3
Table 1. Design requirements
-- 3 of 52 --
• 	Jitter is a variation of time delay
• 	Aceptable jitter
• 	VoIP: <30 ms
• 	Video Conferencing: <30-50 ms
• 	Online Gaming: <30 ms
• 	Streaming Media: <100 ms
• 	General Data Transfer: <100 ms or higher
4
from 	Network Jitter - Common Causes and Best Solutions
-- 4 of 52 --
• 	Fig. 1 shows different types of traffic requires
different QoS
5
Fig 1. QoS of different types of traffic
From Implement Quality of Service (QoS) in Microsoft Teams
-- 5 of 52 --
• 	Fig.2 shows the traffic comparison
6
Fig 2. Comparing Different Types of Traffic
from Network Management Systems Help Businesses Accurately Monitor Important
Application Performance, Infrastructure Metrics, Bandwidth, SLA Breaches, Delay,
Jitter And More
-- 6 of 52 --
Understanding QoS
• 	Quality of Service (QoS):
• 	The overall method used in a network to protect
and prioritize time-critical or important traffic.
• 	The role of QoS provide the following
characteristics:
• 	Control over resources
• 	Which network resources will be used. E.g. preventing low
priority traffic from monopolizing link bandwidth and
affecting high-priority bandwidth.
• 	More efficient use of network resources
• 	By using network analysis management and accounting
tools, traffic can be determined how it will be handled or
which traffic experiences delivery issues.
7
-- 7 of 52 --
• 	Tailored services
• 	Providers can tailored grades of service depending on
their customers, e.g. ordering website having 3000-4000
hits per day 	vs 	a HR website having 200-300 hits per day.
• 	Coexistence of mission-critical applications
• 	Mission-critical applications can receive the most efficient
us of the network.
• 	QoS provides solutions for its defined roles by
managing network congestion.
• 	However, congestion is not the only problem.
• 	Other availability and stability problems:
• 	Delay (or latency)
• 	Delay variation (or jitter)
• 	Packet Loss
8
-- 8 of 52 --
QoS Service Models
• 	The three basic levels for QoS
• 	Best-effort service
• 	No guarantee.
• 	FIFO queues
• 	Integrated services (IntServ)
• 	Hard QoS
• 	Reservation of service. Traffic 	flows are reserved
explicitly by all intermediate systems and resources.
• 	Differentiated services (DiffServ)
• 	Soft QoS. No hard guarantee.
• 	Class-based traffic
• 	Some classes of traffic receive preferential over other
traffic class.
9
-- 9 of 52 --
• 	DiffServ is a method that is used, because most
switches support DiffServ.
• 	Fig. 3. shows the queuing components of a Cisco
Switch.
10
Fig 2. Cisco QoS Model
-- 10 of 52 --
• 	Ingress packets are classified.
• 	Then, a switch determines whether to place the
packet into a queue or drop the packets.
• 	If there is no congestion avoidance, queuing
mechanism will drop the packets when the queue
is full.
11
-- 11 of 52 --
• 	QoS Components
• 	Traffic classification and marking
• 	Traffic shaping and policing
• 	Cogestion management
• 	Congestion avoidance
12
-- 12 of 52 --
Traffic Classification and Marking
• 	Determine the QoS applied to a frame/packet.
• 	There are QoS bits in both Layer 2 and Layer 3
applications.
• 	Layer 2 uses 	Class of Service (CoS) 	bits of a
frame.
• 	Layer 3 uses 	IP Precedence 	and 	Differentiated
Service Code Point (DSCP) 	bits of a packet.
• 	DSCP is the leading method in all enterprise
switching networks.
• 	Fig 3. shows bits in ethernet packet for
classifications.
13
-- 13 of 52 --
14
Fig 3. Bits used in Ethernet packets for Classification
-- 14 of 52 --
DSCP, ToS, and CoS
• 	Layer 2
• 	CoS 	uses 3 bits for 802.1Q frames
• 	8 distinct values (levels or services) : 0 - 7
• 	Layer 3
• 	DSCP 	uses 6 most significants bits in ToS
• 	64 distinct values (levels or services): 0 - 63
• 	The last 2 bits of DSCP presents the Early
Congestion Notification (ECN) bits.
• 	IP Precedence 	uses 3 most significants bits in ToS
• 	IP Precedence can be mapped to DSCP by padding
lower-order bits with 0
• 	Fig 4. shows DiffServ Field in IP Header
15
-- 15 of 52 --
• 	ToS uses P2 - P0
• 	DSCP uses DS5 - DS0
16
Fig 4. DiffServ Field in IP Header
-- 16 of 52 --
• 	For example, interpreting between DSCP and IP
Precedence. Cisco IP Phones marks
• 	DSCP: 46 (101110)
• 	IP Precedence: 5 (101)
• 	CoS: 5
17
-- 17 of 52 --
Classification
• 	Classification distinguishes a frame/packet with a
specific priority or predetermined criteria.
• 	Switch/router uses internal DSCP value for QoS
handling including policing and scheduling.
• 	The 	first task of QoS policy is identify traffic
requiring classification.
• 	Default classification for ingress frames is a
DSCP with value 0.
• 	Terminology for interface configured for treating
all ingress frame with DSCP of 0 is 	untrusted.
18
-- 18 of 52 --
• 	Methods of packet classification
• 	Per-interface trust modes
• 	Per-interface manual classification using specific
DSCP, IP Precedences, or CoS values
• 	Per-packet based on access lists
• 	Network-Based Application Recognition (NBAR)
• 	When planing to deploy QoS,
• 	apply QoS classification as close to the edge as
possible => end-to-end QoS with ease of
management
• 	Preferred in access layer
19
-- 19 of 52 --
Trust Boundaries and Configurations
• 	Trust configurations quantify how a frame is
handled when it arrives at the switch.
• 	E.g. a switch is configured for “trusting DSCP”
• 	When it receives a packet with DSCP value of 46, it
accept the ingress DSCP of the frame and uses
DSCP value of 46 for internal DSCP.
• 	Cisco switch support trusting via DSCP, IP
Precedence, or Cos value on ingress frames.
• 	Cisco switches map an ingress CoS or IP
Precedence to an internal DSCP value as shown in
Table 2 and Table 3.
• 	Internal DSCP presents how the packet is handled
in the switch.
20
-- 20 of 52 --
21
Table 2. Default CoS to DSCP Mapping
Table 3. Default IP Precedence to DSCP Mapping
-- 21 of 52 --
• 	Fig. 5 shows switch QoS trust concept using port
trusting.
• 	When switch trust CoS on ingress packets on a
port basis, it map ingress value to DSCP value.
• 	When switch configuration is untrusted, it uses 0
for the internal DSCL value for all ingress
packets.
22
Fig 5. QoS trust concept
-- 22 of 52 --
Marking
• 	Marking refers to changing DSCP, CoS, or IP
Precedence bits on ingress frames.
• 	It is configurable on a per-interface basic or via a
policy map.
• 	For example, marking is configured a policy map to
mark all frames from a video server on a per-
interface basis to a DSCP value of 40, resulting in
an internal DSCP value of 40.
23
-- 23 of 52 --
• 	Homework: 	what are
• 	Default PHB (Per hop behavior)
• 	Expedited Forwarding (EF) PHB
• 	Assured Forwarding (AF) PHB
• 	Class Selector PHBs
24
-- 24 of 52 --
25
From: Wendell Odom, CCNA 200-301, Volume 2 Official Cert Guide, Cisco Press, 2020.
lower drop prob. 	higher drop prob.
-- 25 of 52 --
How to represent DSCP code for AF
6 digits binary
b5 b4 b3 	b2 b1 	b0
b5 b4 b3: class
b2 b1: Drop priority
b0: always 0
How to represent
1. AF convert 	b5 b4 b3 to dec 	and 	b2 b1 to dec
e.g. 	011100 => AF32
2. DSCP convert all 6 digits to dec
e.g. 	011100 => DSCP28
26
-- 26 of 52 --
Traffic Shaping and Policing
• 	Both traffic shaping and policing mechanisms
control the rate at which traffic 	flows through a
switch.
• 	They both use classification to differentiable traffic.
• 	However, there is a fundamental and significant
difference.
27
-- 27 of 52 --
Shaping
• 	Shaping meters traffic rates and delays (buffers)
excess traffic so that the traffic stay within a desired
rate limit.
• 	It smoothes excessive bursts to produce a steady
flow of data.
• 	Reducing bursts decreases congestion in
downstream routers and switches => reduces the
number of framed dropped.
• 	However, shaping delays traffic
• 	Not good for: delay-sensitive traffic 	flows such as
voice, video
• 	Good for: bursty TCP traffic 	flows
• 	Example of shaping is shown in Fig. 6.
28
-- 28 of 52 --
29
Fig 6. TCP shaping as applied to TCP traffic
-- 29 of 52 --
Policing
• 	Policing takes a specific action for out-of-profile
traffic above the specified rate.
• 	It does not delay or buffer traffic.
• 	The traffic that is exceeds a specified rate is
dropped.
• 	Switch switch uses the leaky token bucket
algorithm which allows for burst of traffic
compared to rate limiting. It is effective for handling
both TCP and UDP.
• 	Fig. 7 shows the leaky token bucket algorithm
30
-- 30 of 52 --
31
Fig 7. Leaky token bucket
-- 31 of 52 --
• 	The switch place a number of tokens proportional
to the incoming traffic sizes into a token bucket
which the number of tokens equals the size of
packets.
• 	At a regular interval, the switch removed a defined
number of tokens, determined by the configured
rate, from the bucket.
• 	If the bucket is full, the switch determines that the
packet is out of profile. It drops or marks of-out-
profile packets according to the configure policy.
• 	The number of packets leaving the queue is
proportional to the number of tokens in the bucket
32
-- 32 of 52 --
• 	Policing vs Shaping
33
From 	Policing and Shaping
-- 33 of 52 --
Congestion Management
• 	Switch uses multiple egress queues for application
of the congestion-management and congestion
avoidance QoS feature.
• 	It is a per-queue feature. Each might have its own
configuration.
• 	Congestion management makes classification and
marking more meaningful.
• 	Mechanisms used in congestion management
• 	FIFO queuing
• 	Weight round robin (WRR) queuing
• 	Priority queuing
• 	Custom queuing
34
-- 34 of 52 --
FIFO Queuing
• 	FIFO queuing is a default method for queuing
frames. It is not QoS enable.
• 	It does not use classification. All frames are placed
in the same queue as shown in Fig.8.
35
Fig 8. FIFO queuing
-- 35 of 52 --
Weighted Round Robin Queuing
• 	WRR is popular and simple method of DiffServ among
traffic classes.
• 	The switch uses a configured weight value for each
egress queue.
• 	The higher the weight value, the higher priority that
switch applies to the egress queue.
• 	The weight value determines the implied bandwidth of
each queue.
• 	For example, configured a switch with 4 egress queues.
• 	Queues 1 weights 50 => 50% of bandwidth utilization
• 	Queues 2 weights 10 => 10% of bandwidth utilization
• 	Queues 3 weights 25 => 25% of bandwidth utilization
• 	Queues 4 weights 15 => 15% of bandwidth utilization
36
-- 36 of 52 --
`
• 	Fig. 9 shows an example of WRR with 8 queues
37
Fig 8. Weighted Round Robin
-- 37 of 52 --
• 	The transmit queue ratio determines the way that
the buffers are split among the different queues.
• 	If you have multiple queue with a priority queues,
the configuration requires the same weight on the
high-priority WRR queues and for strict-priority
queues.
• 	Generally, high-priority and strict-priority queues do
not require a large amount of memory for queuing.
• 	For traffic that is delay-sensitive and often low
volume.
• 	Low-priority queue uses more memory space.
• 	For traffic that is not sensitive to queuing delays.
38
-- 38 of 52 --
• 	Strict-priority queue :
• 	Low-latency queuing (LLQ) is a feature
developed by Cisco to bring 	strict priority
queuing (PQ) 	to class-based weighted fair
queuing (CBWFQ). LLQ allows delay-sensitive
data (such as voice) to be given preferential
treatment over other traffic by letting the data to
be dequeued and sent 	first.
• 	Strict PQ allows delay-sensitive data such as
voice to be dequeued and sent before packets in
other queues are dequeued.
39
1 LLQ:https://en.wikipedia.org/wiki/Low-latency_queuing
1
2
2 LLQ:https://en.wikipedia.org/wiki/Low-latency_queuing
-- 39 of 52 --
Priority Queuing
• 	Priority queuing is to prioritize and schedule frames
from 	egress queues.
• 	Cisco switches ignore WRR scheduling weights for
queues configures as priority queues.
• 	Normally, cisco switches support a single egress
queue as a priority queue.
• 	The remaining queues are subject to WRR.
• 	Priority queuing is useful for voice applications.
40
-- 40 of 52 --
Custom Queuing
• 	CQ is used in WAN interfaces of the switches.
• 	It reserves a percentage of available bandwidth
for an interface for each selected traffic type.
• 	If the particular type of traffic is not using the
reserved bandwidth, other queues and types
traffic might use the remaining bandwidth.
• 	It is statically configured and does not provide any
automatic adaptation for changing network
condition.
• 	It is not recommended on high-speed WAN
interfaces.
41
-- 41 of 52 --
Congestion Avoidance
• 	Congestion avoidance techniques monitor network
traffic loads to anticipate and avoid congestion.
• 	Complex algorithms (compared to 	simple tail-drop
algorithm) are used.
• 	WAN interfaces are commonly used congestion
avoidance (compared to Ethernet interface)
because of the limited bandwidth.
• 	However, congestion avoidance is also useful for
Ethernet interfaces.
• 	Weighted Random Early Detection (WRED)
mechanism can be used.
42
-- 42 of 52 --
Tail Drop
• 	Tail drop is a default behavior in a cisco switch.
• 	When switch/router cannot transmit a packet
immediately because of congestion, it queues that
packet. It eventually transmits packet from the
queue.
• 	If the arrival rate of packets for transmission on an
interface exceeds the router’s/switch’s capability to
buffer the traffic, it drops the packets.
• 	This is called 	Tail Drop.
• 	All packet for transmission attempting to enter an
egress queue are dropped until there is space in the
queue for another packet.
43
-- 43 of 52 --
• 	Tail drop is not the best approach for dropping frames.
• 	Tail drop is not good for TCP 	flows because
• 	The dropping of frames affects ongoing TCP sessions.
• 	Aggressive TCP 	flows might seize all space in output
over normal TCP 	flow.
• 	Excessing queuing of packets in the output queues a
the point of congestion results in delay ad jitter.
• 	No differentiate drop mechanism exits; premium traffic
is dropped in the same manner as best-effort traffic.
• 	Even with a single TCP stream, other non-TCP traffic
might congest the interface.
44
-- 44 of 52 --
Weighted Random Early Detection
• 	WRED is a congestion-avoidance mechanism.
• 	It is useful for backbone speeds.
• 	It randomly drops packet with a certain
classification when output buffers reach a specific
threshold.
• 	Random Early Detection (RED) is also used.
• 	Fig 9. shows behavior of TCP with without and with
RED.
• 	RED smoothes TCP sessions because it r
windows.
45
-- 45 of 52 --
46
Fig 9. Link utilization optimization with congestion avoidance using RED
-- 46 of 52 --
• 	RED randomly drops packets at configured
threshold values of output buffers.
• 	The probability of dropping packets rises as the
queue growing above the threshold.
• 	RED works only when the output queue is not full.
• 	When the output queue is full, the tail-drops is
used for additional packets.
• 	RED works for only TCP.
• 	WRED is similar to RED but it takes into account
classification of frames.
47
-- 47 of 52 --
• 	e.g., a single output queue with WRED threshold
• 	50% for best-effort traffic for DSCP values up to 20
• 	80% for all traffic for DSCP value between 20 and 31
• 	=> If queue is 50%, it drops packets in output queue
with DSCP value 0-20
• 	=> If queue is up to 80%, it also drops existing
packets with DSCP value above 20.
• 	If output queue is full, it uses trail drop for
additional packet that attempt to occupy the output
queue.
• 	Fig. 10 shows WRED algorithm.
48
-- 48 of 52 --
49
Fig 10. Weighted Random Early Detection
-- 49 of 52 --
• 	In most Cisco switches, WRED is configurable per
queue.
• 	WRED should be used on highly congested
interfaces, esp. WAN interfaces interconnecting
data centers.
• 	It is possible to use WRR and WRED together.
• 	Best practice
• 	Designate a strict-priority queue for high priority
traffic using WRR
• 	Use WRED on congestion avoidance with the
remaining queues designated for data traffic.
50
-- 50 of 52 --
AutoQoS
• 	Cisco AutoQoS enables users to deploy QoS features for
converged IP telephony and data network much more
quickly and efficiently.
• 	AutoQoS generates traffic classes and policy map CLI
templates.
• 	AutoQoS simplifies the definition of traffic classes and
creating and configuration of traffic policies.
• 	AutoQoS simplify the followings
• 	Application classification
• 	Policy generation
• 	Configuration
• 	Monitoring and reporting
• 	Consistency
51
-- 51 of 52 --
References
• 	Contents and 	figures are from
• 	Froom R., Sivasubramanian, B., and Frahim, E.,
“Implementing Cisco Switched Networks (SWITCH)
Foundation Learning Guide,” Cisco Press, 2010.
• 	Hucaby, D. “CCNP SWITCH 642-813 Official
Certification Guide,” Cisco Press, 2010.
52
-- 52 of 52 --

## CPE434Slide21Monitoring.pdf

Computer Network
Design and
Management
261434
21
Monitoring
1
-- 1 of 54 --
Agenda
• 	Syslog Messages
• 	Managing Switches with SNMP
• 	Using Port Mirroring to Monitor Traffic
2
-- 2 of 54 --
Syslog Messages
• 	Like in Unix/Linux, switches can be configured to
generate the log of events. The log is called 	system
message log (syslog).
• 	The message format contains the following fields
• 	Timestamp: The date and time.
• 	Facility Code: Categories of the modules/functions
generating the message.
• 	Severity: A number 0 - 7 showing severity. The lower
number means the higher severity.
• 	Mnemonic: A short text string that categorizes the
event within code.
• 	Message Text: A description of the event or conditions.
3
-- 3 of 54 --
• 	Fig 1. shows the syslog message format.
4
Fig. 1. Format of the syslog message.
-- 4 of 54 --
• 	Fig 2. shows the severity of syslog.
5
Fig. 2. Syslog severity levels
-- 5 of 54 --
Logging to the Switch Console
• 	By default, system messages are sent the switch console
port at the debugging level.
• 	They can be seen only when you connect to the console
port.
• 	The console severity can be changed by the following
configuration.
• 	severity: 0 - 7 or name of severity
6
sw(config)# 	logging console 	severity
-- 6 of 54 --
Logging to the Internal Buffer
• 	Switch can also buffer the syslog messages in its buffer.
• 	The log messages can be collected over time.
• 	By default, the internal logging buffer is disabled.
• 	To enable it and begin sending the messages, use the
configuration command
• 	The size of buffer can be configured by the configuration
command
• 	size: 4096 - 2147483647 in unit of Bytes
7
sw(config)# 	logging buffered 	severity
sw(config)# 	logging buffered 	size
-- 7 of 54 --
• 	To show the internal logging buffer, use the command
8
sw# 	show logging
-- 8 of 54 --
Configuring Time Stamps to Syslog Messages
• 	Timestamp in clock time can be configured by
configuration command
• 	localtime: use local time zone instead of UTC
• 	show-timezone: show timezone name
• 	msec: add millisecond to timestamp
• 	year: add year to timestamp
• 	However, it can be configured to use uptime including the
number of days and weeks (e.g. 2w5d) by configuration
command
9
sw(config)# 	service timestamps log datetime 	[localtime]
[show-timezone] [msec] [year]
sw(config)# 	service timestamps log uptime
-- 9 of 54 --
• 	For example, time stamp in clock time
• 	For example, time stamp in uptime
10
Nov 	10 	13:54:58: 	%SYS-5-CONFIG_I: 	Configured 	from 	console 	by 	console
Nov 	10 	13:55:24: 	%SYS-5-CONFIG_I: 	Configured 	from 	console 	by 	console
Nov 	10 	13:55:24: 	%LINEPROTO-5-UPDOWN: 	Line 	protocol 	on 	Interface
Ethernet1/1, 	changed 	state 	to 	down
00:17:03: 	%SYS-5-CONFIG_I: 	Configured 	from 	console 	by 	console
00:17:58: 	%AMDP2_FE-6-EXCESSCOLL: 	Ethernet3/3 	TDR=0, 	TRC=0
00:19:53: 	%AMDP2_FE-6-EXCESSCOLL: 	Ethernet3/3 	TDR=0, 	TRC=0
00:20:53: 	%AMDP2_FE-6-EXCESSCOLL: 	Ethernet3/3 	TDR=0, 	TRC=0
-- 10 of 54 --
Setting the Internal System Clock
• 	In order that the timestamp clock can be shown correctly,
the switch has to be set to the correct time.
• 	The clock in switch can be shown by using command
• 	By default, the when the switch is booted, the clock is set
to March 1, 1993.
• 	The clock can be set by using the command
• 	hh: hour
• 	mm: minutes
• 	ss: seconds
• 	day: 1-31
• 	MONTH: January, February, …
• 	year: 1993 - 2035
11
sw# 	show clock
sw# 	clock set 	hh:mm:ss day MONTH year
-- 11 of 54 --
• 	In addition, the timezone can be configured by the
configuration command
• 	name: name of time zone
• 	offset-hours: 	hours offset from UTC -23 - 23
• 	offset-minutes: minutes offset from UTC 0 - 59
12
sw(config)# 	clock timezone 	name offset-hours 	[offset-minutes]
-- 12 of 54 --
Using NTP
• 	To synchronize the clock for multiple switches, Network
Time Protocol (NTP) can be used as in the Linux/Unix
machine.
• 	The switch can be configured to synchronize to the NTP
time server using configuration commands
• 	ntp-server-ip-address: an IP address of NTP server
• 	prefer: define which server is preferred over others
• 	version: version of NTP, by default version 3 is used.
version 4 has the IPv6 capability.
• 	more than one NTP servers can be configured
13
sw(config)# 	ntp server 	ntp-server-ip-address 	[prefer]
[version 	{ 	3 	| 	4 	}]
-- 13 of 54 --
• 	To verify if the switch is synchronized, use the command
• 	To see a summary of NTP relationship, use the command
14
sw# 	show ntp status
sw# 	show ntp associations
-- 14 of 54 --
15
IOU3#sh 	run 	| 	sec 	ntp
ntp 	server 	200.1.1.240
ntp 	server 	200.1.1.10 	prefer
IOU3#show 	ntp 	status
Clock 	is 	synchronized, 	stratum 	4, 	reference 	is 	200.1.1.10
nominal 	freq 	is 	250.0000 	Hz, 	actual 	freq 	is 	250.0000 	Hz, 	precision 	is 	2**10
ntp 	uptime 	is 	55800 	(1/100 	of 	seconds), 	resolution 	is 	4000
reference 	time 	is 	D9EC7777.DB645C78 	(14:02:31.857 	UTC 	Tue 	Nov 	10 	2015)
clock 	offset 	is 	0.5000 	msec, 	root 	delay 	is 	1.00 	msec
root 	dispersion 	is 	6.67 	msec, 	peer 	dispersion 	is 	2.53 	msec
loopfilter 	state 	is 	'CTRL' 	(Normal 	Controlled 	Loop), 	drift 	is 	0.000000000 	s/s
system 	poll 	interval 	is 	128, 	last 	update 	was 	22 	sec 	ago.
IOU3#show 	ntp 	associations
address 	ref 	clock 	st 	when 	poll 	reach 	delay 	offset 	disp
+~200.1.1.240 	127.127.1.1 	5 	90 	128 	377 	0.000 	0.000 	2.850
*~200.1.1.10 	127.127.1.1 	3 	25 	128 	377 	1.000 	0.500 	2.537
* 	sys.peer, 	# 	selected, 	+ 	candidate, 	- 	outlyer, 	x 	falseticker, 	~ 	configured
IOU3#
for example
-- 15 of 54 --
Homework
• 	Find out !!!
• 	What does “stratum” mean?
• 	What is the meaning of “*” and “+” symbols from the
output of “show ntp associations”
16
-- 16 of 54 --
Managing Switches with SNMP
• 	The 	Simple Network Management Protocol (SNMP)
enabled network device to share information about itself
and its activities.
• 	SNMP system consists of
• 	SNMP manager: A network management system that
uses SNMP to poll and receive data from network
devices. It is usually an application running in a central
location.
• 	SNMP agent: A process running on the network device
being monitored.
17
-- 17 of 54 --
• 	Switches collect data and store them a 	Management
Information Base (MIB) 	database in memory and
updated in real time.
• 	MIB is organized in a tree structure.
• 	More granular MIBs form branches of the tree.
• 	Each MIB is based on 	Abstract Syntax Notation 1
(ASN.1).
• 	Each variable of MIB is referenced by an 	object
identifier (OID).
• 	e.g. a counter of the number of inbound bytes on an
interface is OID 1.3.6.1.2.1.2.2.1.10 in the IF (interface) MIB.
• 	The example of OID tree is shown in Fig.
18
-- 18 of 54 --
19
Fig. 	3 OID Tree Example
Figure from: http://www.networkmanagementsoftware.com/snmp-tutorial-part-2-rounding-out-th
basics
-- 19 of 54 --
• 	SNMP manager and agent need to interpret MIBs.
• 	OID meaning/interpreting can be navigated from vendors’
or makers’ homepage, e.g.
• 	Cisco: 	http://tools.cisco.com/Support/SNMP/do/
BrowseOID.do
• 	Juniper: 	http://contentapps.juniper.net/mib-explorer/
• 	To see MIB data, an SNMP manager need to send 	SNMP poll 	or
query to the equipment.
• 	Query contains OID that agent on the equipment knows what
information to return.
20
-- 20 of 54 --
• 	SNMP manager can use the following mechanism to
communicate with SNMP agent all over 	UDP port 161.
• 	Get request: get value of one specific MIB variable.
• 	Get next request: get the next or subsequence value
following the get request
• 	Get bulk request: get whole table or lists in a MIB
variable
• 	Set request: set a value to a specific MIB variable
21
-- 21 of 54 --
• 	SNMP agents can add unsolicited alerts to the SNMP
manager of real-time even using following mechanisms
over 	UDP port 162
• 	SNMP trap: News of an event is sent without
acknowledgement that the trap has been received.
• 	Inform request: News of an an event is sent to an
SNMP manager, and manager is needed to
acknowledge by echoing the request back to the
agent.
22
-- 22 of 54 --
• 	SNMP was released for 3 major versions
• 	SNMPv1 (RFC 1157)
• 	Using simple one variable GET and SET with simple trap
• 	Authentication using simple “community” text string
• 	SNMPv2C (RFC 1901)
• 	Addressing some efficiency and security
• 	Using 64 bits counter instead of 32 bits counter as in
SNMPv1.
• 	Offering Bulk request
• 	SNMPv3 (RFCs 3410 - 3415)
• 	Addressing security.Username can be used in
authentication. They can be organized into group names.
• 	MIB variable trees can be configured “view” defining with
trees can be read or written.
23
-- 23 of 54 --
• 	authentication level in SNMPv3. (Auth=Authentication,
Priv=Privacy)
• 	noAuthNoPriv:SNMP packets are neither authenticated nor
encrypted.
• 	authNoPriv: SNMP packets are authenticated but not
encrypted.
• 	authPriv: SNMP packets are authenticated and encrypted.
• 	Best practice:
• 	use SNMPv3
• 	if SNMPv1 has to be used, it should be limited to read-
only.
• 	The comparison of SNMP versions and features are
summarized in Table 1.
24
-- 24 of 54 --
25
Table 1. 	Comparison of SNMP versions and features
-- 25 of 54 --
Configuration of SNMP
• 	Version1
• 	(Optional) Config ACL
• 	access-list-number: 1-99
• 	Configure community string
• 	ro: read-only
• 	rw: read-write
• 	(For trap) Configure host IP address that traps will be
sent
• 	trap-type: 	to see trap-type use “?” in configuration
command. or see from 	http://www.cisco.com/c/en/us/td/
docs/ios/netmgmt/command/reference/nm_book/
26
sw(config)# 	access-list 	access-list-number 	permit 	ip-addr
sw(config)# 	snmp-server community 	community-string
[ro 	| 	rw] [access-list-number]
sw(config)# 	snmp-server host 	host-address community-string
[trap-type]
-- 26 of 54 --
• 	Version 2. Configuration is same with version 1 except trap.
• 	(Optional) Config ACL
• 	access-list-number: 1-99
• 	Configure community string
• 	ro: read-only
• 	rw: read-write
• 	(For trap) Configure host IP address that traps will be
sent
• 	informs: by default, regular SNMP traps are sent, to use
inform requests add 	informs 	keyword
27
sw(config)# 	access-list 	access-list-number 	permit 	ip-addr
sw(config)# 	snmp-server community 	community-string
[ro 	| 	rw] [access-list-number]
sw(config)# 	snmp-server host 	[informs] 	version 2c
host-address community-string
-- 27 of 54 --
• 	version 3
• 	(optional) configure ACL. Named or numbered IP
access list can be used.
• 	(optional) you can use 	snmp-server view 	command to
define a specific view for users. Only MIB variables
under given as 	oid-tree 	will be visible to view. The
command can be repeated to add additional OID
names. If not view is configured, all MIB variable are
visible to users.
28
sw(config)# 	snmp-server view 	view-name oid-tree
{include 	| 	exclude}
-- 28 of 54 --
• 	oid-tree:Object identifier of the ASN.1 subtree to be included
or excluded from the view. To identify the subtree, specify a
text string consisting of numbers, such as 1.3.6.2.4, or a
word, such as system. Replace a single subidentifier with
the asterisk 	(*) 	wildcard to specify a subtree family; for
example 	1.3.*.4.
• 	include: 	Configures the OID (and subtree OIDs) specified in
oid-tree 	argument to be included in the SNMP view
• 	exclude: 	Configures the OID (and subtree OIDs) specified
in 	oid-tree 	argument to be excluded in the SNMP view
29
-- 29 of 54 --
• 	Configure a group name that will set the security level
policies for SNMP users that are assigned to the group.
• 	auth: group using the authNoPriv Security Level
• 	noauth: group using the noAuthNoPriv Security Level
• 	priv: group using SNMPv3 authPriv security level
• 	read: specify a read view for the group
• 	write: specify a write view for the group
• 	notify: 	specify a notify view for the group
30
sw(config)# 	snmp-server group 	group-name 	v3
{noauth 	| 	auth 	| 	priv} [read 	read-view] [write 	write-view]
[notify 	notify-view] [access 	access-list]
-- 30 of 54 --
• 	Define a username that associates with group-name
• 	(Optional) You can identify the SNMP manager that will
receive either traps or informs.
31
sw(config)# 	snmp-server user 	user-name group-name 	v3
[auth 	{md5 	| 	sha} 	auth-password]
[priv 	{des 	| 	3des 	| 	aes 	{128 	| 	192 	| 	256} 	priv-password]
[access-list-number]
sw(config)# 	snmp-server host 	host-address 	[informs]
version 3 	{noauth 	| 	auth 	| 	priv} 	username 	[trap-type]
-- 31 of 54 --
• 	For example, a switch is configured for SNMPv3.
• 	Access list 10 permits only stations at 192.168.3.99
and 192.168.100.4 with SNMP access.
• 	SNMPv3 access is defined for a group name NetOps
using 	priv 	security level.
• 	A user named 	mymonitor 	is defined
• 	The username use SHA packet authentication with
password 	s3cr3tauth
• 	The username use AES-128 encryption with password
s3cr3tpr1v
• 	SNMPv3 informs will send alert to station 192.168.3.99
using 	priv 	security level with username 	mymonitor
32
-- 32 of 54 --
33
-- 33 of 54 --
SNMP Manager
• 	Example of SNMP Manager programs
• 	Cacti: 	http://www.cacti.net
34
Figure from http://cacti.cmu.ac.th/graph.php?rra_id=all&local_graph_id=5632 retrieved 15 Nov 2015 3:28 PM
-- 34 of 54 --
• 	Munin: 	http://munin-monitoring.org
35
Figure from https://hostedmunin.com/faq
-- 35 of 54 --
Let’s Study
• 	See comparison of monitor systems from Wikipedia
• 	“https://en.wikipedia.org/wiki/
Comparison_of_network_monitoring_systems”
• 	See some tutorials for installing network monitoring
system from Digital Ocean website:
• 	https://www.digitalocean.com/community/tags/
monitoring?type=tutorials
36
-- 36 of 54 --
Using Port Mirroring to Monitor Traffic
• 	Cisco switch has a feature to minor traffic one one source
switch port or VLAN to a destination port.
• 	It is called 	Switched Port Analyzer (SPAN).
• 	This allows a network analyzer or sniffer to capture the
traffic.
• 	There are two SPAN modes
• 	Local SPAN: Both SPAN source and destination are on
the same local switch.
• 	Remote SPAN (RSPAN): SPAN source and destination
are on different switches. A special-purpose VLAN
must be used with trunk to mirror the traffic.
37
-- 37 of 54 --
Local SPAN
• 	A local SPAN session exists on only one switch or one
logical switch.
• 	One or more source interfaces and a destination interface
must be identified.
• 	Traffic passing with one or more VLANs can be also
monitor.
• 	The example is shown in Fig. 4. for monitoring received
traffic and Fig. 5. for transmitted traffic.
• 	Note:
• 	If the bandwidth of SPAN source exceeds the
bandwidth of SPAN destination port, some mirrored
traffic might be dropped and not be seen.
38
-- 38 of 54 --
39
Fig. 	4 Using local SPAN to monitor received traffic
-- 39 of 54 --
40
Fig. 	5 Using local SPAN to monitor transmitted traffic
-- 40 of 54 --
Configuration Local SPAN Configuration
• 	Define the source of SPAN session, using configuration
command
• 	rx: received traffic
• 	tx: transmitted traffic
• 	both: received and transmitted traffic. It is a default
mode.
• 	Define the SPAN destination, using configuration
command
41
sw(config)# 	monitor session 	session-number 	source
{interface 	interface 	| 	vlan 	vlan-id} {rx 	| 	tx 	| 	both}
sw(config)# 	monitor session 	session-number 	destination
interface 	interface 	[encapsulation replicate]
-- 41 of 54 --
• 	SPAN normally copies packets to the destination without any
VLAN trunk tags. As well, SPAN does not normally copy Layer 2
protocols that are sent by the switch itself. Examples include
Spanning Tree Protocol (STP) bridge protocol data units (BPDUs),
Cisco Discovery Protocol (CDP), Virtual Trunking Protocol (VTP),
Dynamic Trunking Protocol (DTP), and Page Aggregation Protocol
(PAgP). If you want to capture any VLAN tagging information or
the Layer 2 protocol packets, you can add the 	encapsulate
replicate 	keywords.
• 	Note:
• 	When local SPAN is enabled, STP is disabled on the
destination port.
• 	Therefore, NEVER cannot a SPAN session’s destination port
back into an active network.
• 	If mirrored traffic is needed to be sent to another switch, use
RSPAN.
42
-- 42 of 54 --
• 	Example of configuration for Fig. 4
43
-- 43 of 54 --
Remote SPAN
• 	It might not always convenient to take a network analyzer
with the same switch e.g. the network is large and
geographically separated.
• 	RSPAN destination is defined on another switch.
• 	Special purpose VLAN is used to carry mirrored traffic
across trunk links.
• 	Fig. 6 shows an example of RSPAN mirroring traffic from
source on switch A to destination on switch C.
• 	RSPAN VLAN is different from a regular VLAN
• 	MAC address learning is disabled on RSPAN VLAN to
prevent intermediate switch from forwarding mirrored
packets to the real destinations.
• 	Its purpose is to mirror frames not forward them
normally.
44
-- 44 of 54 --
45
Fig. 	6 Using RSPAN to mirror traffic across multiple switches
switch-A
-- 45 of 54 --
• 	RSPAN-capable switch also floods the RSPAN packets
out all its port belonging to RSPAN VLAN.
• 	Intermediate switches do not know about RSPAN source/
destination. They know only RSPAN VLAN.
• 	Therefore, RSPAN VLAN should be allowed only trunks
between switches, but should not assigned to any
switch ports along the path.
46
-- 46 of 54 --
Remote SPAN Configuration
• 	RSPAN VLAN is used; therefore, VTP can be used to
assure that RSPAN VLAN is configured on all intermediate
switches.
• 	In addition, VTP pruning can be used in order to prune
RSPAN VLAN from unnecessary trunks.
• 	To configure, RSPAN
• 	Create the RSPAN VLAN and make sure that normal hosts
do not join this VLAN.
• 	All intermediate switches must have this VLAN.
47
sw(config)# 	vlan 	rspan-vlan-id
sw(config-vlan)# 	remote-span
-- 47 of 54 --
• 	At the source switch, configure RSPAN source and
destination
48
sw(config)# 	monitor session 	session-number 	source
{interface 	interface 	| 	vlan 	vlan-id} [rx 	| 	tx 	| 	both]
sw(config-vlan)# 	monitor session 	session-number
destination remote vlan 	rspan-vlan-id
-- 48 of 54 --
• 	At the destination switch, configure RSPAN source and
destination
• 	encapsulation replicate
• 	Packets are sent on the destination port with the
same encapsulation—untagged, Inter-Switch Link
(ISL), or IEEE 802.1Q—that they had on the source
port.
• 	Packets of all types, including BPDU and Layer 2
protocol packets, are monitored.
49
sw(config)# 	monitor session 	session-number 	source remote
vlan 	rspan-vlan-id
sw(config-vlan)# 	monitor session 	session-number 	destination
interface 	interface 	[encapsulation replicate]
-- 49 of 54 --
Remove SPAN
• 	To delete the monitor session, use configuration
command
• 	local: remove local SPAN sessions
• 	all: remove all sessions (local or remote)
50
sw(config)# 	no monitor session 	{ 	session-number 	|
range 	session-range 	| 	local 	| 	all}
-- 50 of 54 --
• 	Example of the configuration on Fig 6. using VLAN 99
51
Switch-A
Switch-B
Switch-C
-- 51 of 54 --
Managing SPAN Sessions
• 	To verify the SPAN configuration use command
• 	For example,
52
sw# 	show running-config 	| 	include monitor
-- 52 of 54 --
• 	To see information about active SPAN session, use
command
• 	e.g.
53
sw# 	show monitor 	[session 	{session-number 	| 	all 	| 	local
range 	range-id 	| 	remote} [detail]
-- 53 of 54 --
References
• 	Contents and Figures are from
• 	Hucaby, D. “CCNP Routing and Switching SWITCH
300-115 Official Cert Guide,” Cisco Press, 2015.
• 	Cisco IOS Network Management Command Reference,
snmp-server engineID local through snmp trap link-
status, “http://www.cisco.com/c/en/us/td/docs/ios/
netmgmt/command/reference/nm_book/
nm_20.html#wp1082627”
• 	Configure SPAN and RSPAN “http://www.cisco.com/c/
en/us/td/docs/switches/lan/catalyst3750x_3560x/
software/release/12-2_55_se/configuration/guide/
3750xscg/swspan.html"
54
-- 54 of 54 --

## CPE434Slide22BasicSecurity.pdf

Network Design and
Management
22
Basic Security
1
-- 1 of 14 --
Agenda
• 	Basic Security Fundamental
• 	Firewall
• 	DMZ
• 	IPS
• 	Next generation Firewall
• 	Next Generation IPS
2
-- 2 of 14 --
Basic Security Fundamental
3
• 	Availability
• 	Data can be accessed reliably and
timely.
• 	Integrity
• 	Only authorized individuals/systems
can change data.
• 	Confidentiality
• 	Only authorized individuals/systems
can access data. AIC Triad
or
CIA Triad
Availability 	Integrity
Confidentiality
-- 3 of 14 --
Firewall
• 	Firewall
• 	It is placed in the forwarding path of packet to the
external network. (Fig. 1)
4
Fig. 1. Firewall is located inline in the path to external network.
-- 4 of 14 --
• 	It can choose which packets to discard or allow though
the internal network.
• 	Filter from sources and destinations.
• 	Filter from port number of transport layer.
• 	Filter from text in URI of HTTP request.
• 	Filter from connection status of TCP (stateful firewall)
5
-- 5 of 14 --
DMZ
• 	Demilitarized Zone (DMZ)
• 	DMZ is less secured than internal network.
• 	Servers or machines that are permitted to be accessed
from outside should be placed in DMZ (Fig 2.).
6
Fig. 2. Public servers are located in DMZ.
-- 6 of 14 --
IPS
• 	Intrusion Protection System (IPS)
• 	Normally, firewall filter packets by user-configuring
rules.
• 	IPS filter packets with different logic.
• 	It considers from attack signatures that have to be updated.
e.g
• 	DoS
• 	DDoS
• 	Viruses and worms
• 	Signatures should be kept update.
• 	IPS can also redirect packet to another security
application.
• 	It is also placed between the path of external network
and internal network (Fig. 3)
7
-- 7 of 14 --
8
Fig. 1. IDS is also located inline in the path to external network.
-- 8 of 14 --
Next Generation Firewall
• 	Next Generation Firewall (NGFW) has more advanced
functions than traditional firewall. e.g.
• 	Function of traditional firewall
• 	Application Visibility and Control (AVC). It examines into
the application data.
• 	Advanced malware protection.
• 	URL filtering.
• 	NGIPS capability.
• 	See example products in Fig. 4.
9
-- 9 of 14 --
10
Fig. 4. Examples of Cisco’s NGFW
-- 10 of 14 --
Next Generation IPS
• 	Next Generation IPS (NGIPS) has more advanced
functions than traditional IPS. e.g.
• 	Functions of traditional IPS
• 	AVC
• 	Contextual awareness. It gathers information from hosts
to check vulnerabilities.
• 	Reputation-based filtering. It create the group of known
malicious URLs, IP addresses, etc.
• 	Event impact level.
• 	See example products in Fig. 5.
11
-- 11 of 14 --
12
Fig. 5. Examples of Cisco’s NGIPS
-- 12 of 14 --
Reference
Wendell Odom, “CCNA 200-301, Volume 2, Official Cert
Guide,” Cisco Press 2020
13
-- 13 of 14 --
Figure References
Fig 1. Wendell Odom, “CCNA 200-301, Volume 2, Official
Cert Guide,” Cisco Press 2020, page 96.
Fig 2. Wendell Odom, “CCNA 200-301, Volume 2, Official
Cert Guide,” Cisco Press 2020, page 99.
Fig 3. Wendell Odom, “CCNA 200-301, Volume 2, Official
Cert Guide,” Cisco Press 2020, page 100.
Fig 4. Cisco Next-Generation Firewalls, 	https://
www.cisco.com/c/en_il/products/security/firewalls/
index.html, (accessed 18 October 2020)
Fig 5. Cisco Next-Ge 	https://www.cisco.com/c/en/us/
products/security/ngips/index.htm, (accessed 18 October
2020)
14
-- 14 of 14 --

## CPE434Slide23NetworkProjectkey.pdf

Network Design and
Management
261434
23
Network Project
1
-- 1 of 9 --
Agenda
• 	Network Project Cycle
• 	Network Design
2
-- 2 of 9 --
Network Project Life Cycle
• 	Planning and design
• 	Physical topology
• 	Logical topology
• 	Technology and protocol
• 	Device selection
• 	Deployment and implementation
• 	Device installation
• 	Testing and commissioning
• 	Network migration and integration
• 	Network OAM
• 	Monitoring with Network Management System (NMS)
• 	Routine maintenance
• 	Software/configuration backup
• 	Software update
• 	Network optimization
• 	UX improvement
• 	Security improvement
3
-- 3 of 9 --
Network Design
1. 	Network solution design
• 	Physical topology
• 	Device selection
2. 	Network design
• 	Basic service
• 	WLAN
• 	Reliability
3. 	Security design
• 	Egress security
• 	Intranet security
4. 	Network OAM and management design
• 	Network management
• 	OAM
4
-- 4 of 9 --
Network Solution Design
• 	Topology is designed based on requirements and
budgets
• 	Hierarchical model vs Leaf and Spine Model
• 	Data center and location must be also considered
5
-- 5 of 9 --
Service Design
• 	VLAN design and planning
• 	IP address design and planning including allocation
• 	Topology
• 	L2 Loop prevention
• 	L3 Routing design
• 	WLAN design
• 	Coverage
• 	Capacity
• 	AP deployment
• 	Reliability design
• 	Port level
• 	Device level
• 	Power source
• 	Egress NAT design
6
-- 6 of 9 --
Security Design
• 	Network level
• 	Host and service level
7
-- 7 of 9 --
Network OAM and Management
• 	Network Management System for monitoring and
troubleshooting
• 	SNMP
• 	Other proprietary features of vendor
• 	Remote maintenance
8
-- 8 of 9 --
Reference
• 	Huawei HCIA Data Communication Network Basis
Training materials, 	https://e.huawei.com/en/talent
9
-- 9 of 9 --